import React, { useRef, useState } from 'react';

const ThermalPrinter = (item) => {
  const printerIPAddress = 'https://192.168.192.168';
  const printerPort = '8008';
  const STATUS_CONNECTED = 'Connected';

  const ePosDevice = useRef();
  const printer = useRef();

  let ePosDev = new window.epson.ePOSDevice();
  ePosDevice.current = ePosDev;

  ePosDev.connect(printerIPAddress, printerPort, (data) => {
    if (data === 'OK') {
      ePosDev.createDevice(
        'local_printer',
        ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: true, buffer: true },
        (devobj, retcode) => {
          if (retcode === 'OK') {
            /*
              {
    "_id": "65d01e6ddd28d73ab23dcf26",
    "customerName": "tt",
    "customerNumber": 5,
    "price": 5,
    "status": "new",
    "hidden": false,
    "dish": "italian-soda",
    "options": [
        {
            "_id": "lychee",
            "friendlyName": "lychee",
            "extraPrice": 1,
            "allowQuantity": true,
            "dependencies": []
        }
    ],
    "notes": "A note",
    "updates": [
        {
            "_id": "65d01e6ddd28d73ab23dcf26",
            "newStatus": "in_progress",
            "user": "admin"
        }
    ],
    "createdAt": "2024-02-17T02:48:13.066Z",
    "updatedAt": "2024-02-17T02:48:13.066Z",
    "__v": 0
}


              */
            console.log('Connected! Printing!');
            printer.current = devobj;
            const prn = printer.current;

            prn.color(prn.COLOR_2);
            prn.addTextAlign(prn.ALIGN_CENTER);
            prn.addText('          CRUMB CAFE\n           Sale ticket');
            prn.addFeedLine(3);
            prn.color(prn.COLOR_1);
            //ITEM 5 .................... $5.00
            //6 chars
            // 33 characters
            prn.addText(
              item.dish.substring(0, 7) + ' ................... $' + item.price.toFixed(2) + '\n',
            );
            prn.addFeedLine(15);
            prn.addText('          ' + item.customerName + '\n');
            prn.addFeedLine(5);
            prn.addText("     ___                _     \n"); // prettier-ignore
            prn.addText("   / __|_ _ _  _ _ __ | |__   \n"); // prettier-ignore
            prn.addText("   | (__| '_| || | '  \| '_ \ \n"); // prettier-ignore
            prn.addText("   \___|_|  \_,_|_|_|_|_.__/  \n"); // prettier-ignore
            prn.addText("     ___       __             \n"); // prettier-ignore
            prn.addText("   / __|__ _ / _|___          \n"); // prettier-ignore
            prn.addText("   | (__/ _` |  _/ -_)        \n"); // prettier-ignore
            prn.addText("   \___\__,_|_| \___|         \n"); // prettier-ignore
            /*
           
                                                                      
            */
            prn.addCut(prn.CUT_FEED);
            prn.addFeedLine(5);
            prn.send();
            prn.disconnect();
          } else {
            throw retcode;
          }
        },
      );
    } else {
      throw data;
    }
  });

  return 1;
};

export default ThermalPrinter;
