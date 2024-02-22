//https://stackoverflow.com/questions/11463787/javascript-receipt-printing-using-pos-printer
//https://reference.epson-biz.com/modules/ref_epos_sdk_js_en/index.php?content_id=3
var printer = null;
var ePosDev = null;

function InitMyPrinter() {
  console.log('Init Printer');

  var printerPort = 8008;
  var printerAddress = '192.168.198.168';
  if (isSSL) {
    printerPort = 8043;
  }
  ePosDev = new epson.ePOSDevice();
  ePosDev.connect(printerAddress, printerPort, cbConnect);
}

//Printing
function cbConnect(data) {
  if (data == 'OK' || data == 'SSL_CONNECT_OK') {
    ePosDev.createDevice(
      'local_printer',
      ePosDev.DEVICE_TYPE_PRINTER,
      { crypto: false, buffer: false },
      cbCreateDevice_printer,
    );
  } else {
    console.log(data);
  }
}

function cbCreateDevice_printer(devobj, retcode) {
  if (retcode == 'OK') {
    printer = devobj;
    printer.timeout = 60000;
    printer.onreceive = function (res) {
      //alert(res.success);
      console.log('Printer Object Created');
    };
    printer.oncoveropen = function () {
      //alert('coveropen');
      console.log('Printer Cover Open');
    };
  } else {
    console.log(retcode);
    isRegPrintConnected = false;
  }
}

function print(salePrintObj) {
  debugger;
  if (isRegPrintConnected == false || printer == null) {
    return;
  }
  console.log('Printing Started');

  printer.addLayout(printer.LAYOUT_RECEIPT, 800, 0, 0, 0, 35, 0);
  printer.addTextAlign(printer.ALIGN_CENTER);
  printer.addTextSmooth(true);
  printer.addText('\n');
  printer.addText('\n');

  printer.addTextDouble(true, true);
  printer.addText(CompanyName + '\n');

  printer.addTextDouble(false, false);
  printer.addText(CompanyHeader + '\n');
  printer.addText('\n');

  printer.addTextAlign(printer.ALIGN_LEFT);
  printer.addText('DATE: ' + currentDate + '\t\t');

  printer.addTextAlign(printer.ALIGN_RIGHT);
  printer.addText('TIME: ' + currentTime + '\n');

  printer.addTextAlign(printer.ALIGN_LEFT);

  printer.addTextAlign(printer.ALIGN_RIGHT);
  printer.addText('REGISTER: ' + RegisterName + '\n');
  printer.addTextAlign(printer.ALIGN_LEFT);
  printer.addText('SALE # ' + SaleNumber + '\n');

  printer.addTextAlign(printer.ALIGN_CENTER);
  printer.addTextStyle(false, false, true, printer.COLOR_1);
  printer.addTextStyle(false, false, false, printer.COLOR_1);
  printer.addTextDouble(false, true);
  printer.addText('* SALE RECEIPT *\n');
  printer.addTextDouble(false, false);
}
