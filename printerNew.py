#pip install python-escpos fastapi uvicorn 
#0a281ecc
from escpos.printer import Network
from datetime import datetime
from flask import Flask
from flask import request, jsonify, abort, redirect
from flask_cors import CORS
import subprocess
import time
from concurrent.futures import ProcessPoolExecutor

#Testing only
#log = logging.getLogger('werkzeug')
#log.disabled = True

print("Running Version 2.0")
printerServer = ProcessPoolExecutor(2)
tabletServer = ProcessPoolExecutor(1)


def tablet(thing):
    connected = subprocess.run(['adb', 'devices'], capture_output=True, text=True, shell=False).stdout.split()[-1]
    if thing['payment'] == 'swipe':
        try:
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "726", "250"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "500", "500"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "keyboard", "text", thing['oc']])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "125", "630"])
            time.sleep(0.2)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "745", "1752"])
            time.sleep(0.1)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "745", "1752"])
        except subprocess.CalledProcessError as e:
            print (e.output)
            return

    elif thing['payment'] == 'dining':
        try:
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "400", "250"])
            time.sleep(0.05)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "590", "720"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "480", "1120"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "500", "500"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "keyboard", "text", thing['oc']])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "125", "630"])
            time.sleep(0.1)
            subprocess.run(["adb", "shell", "input", "keyboard", "text", str(float(thing['total'])*100)])
            #time.sleep(0.2)
            #subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "184", "1169"])
            #time.sleep(0.2)
            #subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "745", "1752"])

        except subprocess.CalledProcessError as e:
            print (e.output)
            return
   


def PRINT(thing):
    current_time = datetime.now().strftime("%H:%M:%S")

    #Local ether network
    kitchen = Network("192.168.192.168",profile="TM-T88V") 
    #Printer IP Address, dont forget the profile!
    kitchen.set(align="center",custom_size=True ,height=2, width=2)
    kitchen.textln("CrumbCafe")
    kitchen.set(align="center",custom_size=True ,height=1, width=1)
    kitchen.textln(thing['type'] + " Sale Ticket\n")

    kitchen.textln("------------------------------------------")
    kitchen.textln(current_time)
    kitchen.textln("------------------------------------------")
    kitchen.print_and_feed(n=1)

    kitchen.set(align="center",custom_size=True ,height=1, width=1)

    for item in thing['dishes']:
        print(item)
        kitchen.textln(item["friendlyName"][0:15] + ' ................... $' + str(item["price"]) )
        for option in item["options"]:
            kitchen.textln('\t + ' + option["friendlyName"])
            

    kitchen.set(align="center",custom_size=True ,height=2, width=2)
    kitchen.print_and_feed(n=3)
    kitchen.textln(thing["customerName"])
    kitchen.print_and_feed(n=2)
    kitchen.barcode(code=str(item['id']), bc="EAN13")
    kitchen.cut()
    kitchen.close()


app = Flask(__name__)
CORS(app)



trusted = ['130.58.218.21', '127.0.0.1']
@app.before_request
def limit_remote_addr():
    if request.remote_addr not in trusted:
        abort(403)


@app.route('/', methods =['POST'])
def test():
    print("hello")
    data = request.json
    
    # If recipt true, split into food and drinks and print if their lists are greater than 0
    if(data['receipt'] == True):
        food=[]
        drink=[]

        print(data['dishes'])
        for i, val in enumerate(data['dishes']):
            if(val['tag'] == 'food'):
                food.append(val)
            if(val['tag'] == 'drink'):
                drink.append(val)
        
        if(len(food)>0):
            copy = data.copy()
            copy['dishes'] = food
            copy['type']= "Food"
            future = printerServer.submit(PRINT, copy)
        if(len(drink)>0):
            copy2 = data.copy()
            copy2['type']= "Drink"
            copy2['dishes'] = drink
            future = printerServer.submit(PRINT, copy2)

    future = tabletServer.submit(tablet, data)

    return "200"
 
  
    
if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5001, threaded=True)








''' TABLET COORDINATES
    text 500,500
    clear 1048, 628
    enter 125, 630
    mealswipe 726, 250
    svc 400, 250
    cancel 980, 1169
    pay 183, 1169

    Choose swat dining or garnet cash 590 720
    dining 480 1120
'''




