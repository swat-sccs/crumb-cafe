
#pip install python-escpos fastapi uvicorn pydantic
from escpos.printer import Network
from datetime import datetime
from pydantic import BaseModel
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import subprocess
import concurrent.futures
import time

executor = concurrent.futures.ThreadPoolExecutor(max_workers=4)
try:
    subprocess.run(['adb', 'start-server'])
except subprocess.CalledProcessError as e:
    print("no tablet!")
'''
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

def tablet(thing):
    print("tablet run")
    if thing['payment'] == 'swipe':
        try:
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "726", "250"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "500", "500"])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "keyboard", "text", thing['oc']])
            time.sleep(0.025)
            subprocess.run(["adb", "shell", "input", "touchscreen", "tap", "125", "630"])
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
            subprocess.run(["adb", "shell", "input", "keyboard", "text", str(int(thing['total'])*100)])
        except subprocess.CalledProcessError as e:
            print (e.output)
            return





def PRINT(thing):
    current_time = datetime.now().strftime("%H:%M:%S")

    kitchen = Network("192.168.192.168",profile="TM-T88V") #Printer IP Address
    kitchen.set(align="center",custom_size=True ,height=2, width=2)
    kitchen.textln("CrumbCafe")
    kitchen.set(align="center",custom_size=True ,height=1, width=1)
    kitchen.textln(thing['type'] + " Sale Ticket\n")

    kitchen.textln("------------------------------------------")
    kitchen.textln(current_time)
    kitchen.textln("------------------------------------------")
    kitchen.print_and_feed(n=1)

    #for something in something
    kitchen.set(align="center",custom_size=True ,height=1, width=1)
    for item in thing['dishes']:
        print(item)
        kitchen.textln(item["friendlyName"][0:15] + ' ................... $' + str(item["price"]) )
        for option in item["options"]:
            kitchen.textln('\t + ' + option["friendlyName"])
            

    kitchen.set(align="center",custom_size=True ,height=2, width=2)
    kitchen.print_and_feed(n=3)
    kitchen.textln(thing["customerName"])
    kitchen.cut()
    kitchen.close()
    




app = Flask(__name__)
CORS(app)


@app.route('/', methods =['POST'])
def test():
    data = request.json
    

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
            executor.submit(PRINT,copy)
        if(len(drink)>0):
            copy2 = data.copy()
            copy2['type']= "Drink"
            copy2['dishes'] = drink
            executor.submit(PRINT,copy2)

    executor.submit(tablet, data)

    return "200"

 
  
    
if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5001)
