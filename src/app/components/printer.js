function ThermalPrinter(item) {
  const printerIPAddress = '192.168.192.168';
  const printerPort = '8008';

  const STATUS_CONNECTED = 'Connected';

  let ePosDev = new window.epson.ePOSDevice();
  ePosDevice.current = ePosDev;

  ePosDev.connect('192.168.192.168', '8008', (data) => {
    if (data === 'OK') {
      ePosDev.createDevice(
        'local_printer',
        ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: true, buffer: false },
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
            printer.current = devobj;

            const prn = printer.current;

            prn.addText('          CRUMB CAFE\n           Sale ticket');

            prn.addFeedLine(3);

            prn.addText(item.dish + ' .................... $' + item.price.toFixed(2) + '\n');
            prn.addFeedLine(15);
            prn.addText('          ' + item.customerName);
            prn.addCut(prn.CUT_NO_FEED);
            prn.addFeedLine(5);
            prn.send();

            return 1;
          } else {
            throw retcode;
          }
        },
      );
    } else {
      throw data;
    }
  });
}

export default ThermalPrinter;
