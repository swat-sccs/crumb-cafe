'use server';

import { Any } from '@react-spring/web';
export const connect = async (ePosDev: any, ePosDevice: any, PRINTER_IP: any, printerPort: any) => {
  //setConnectionStatus('Connecting ...');
  console.log(ePosDev);

  ePosDevice.current = ePosDev;

  ePosDev.connect(PRINTER_IP, printerPort, (data: any) => {
    if (data === 'OK') {
      ePosDev.createDevice(
        'local_printer',
        ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: true, buffer: false },
        (devobj: any, retcode: any) => {
          if (retcode === 'OK') {
            //printer.current = devobj;
            //setConnectionStatus('CONNECTED');
            return devobj;
          } else {
            //setConnectionStatus('Connection Failed');
            throw retcode;
          }
        },
      );
    } else {
      //setConnectionStatus('Connection Failed');
      return 1;
      //throw data;
    }
  });
};
