/*
SO.... RE write the submit function to send over entire orders onSubmit()
THEN... In the backend change around the api to accept a list of the already format 'singular' orders
THEN... CRY
*/
'use client';
import React, { useRef } from 'react';
import { Box, Card, CardHeader, Container, Typography, useTheme } from '@mui/material';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  ButtonGroup,
  Button,
  Chip,
  Grid,
  Badge,
  Divider,
} from '@mui/material';
import { Print, Update } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import axios from 'axios';
import Script from 'next/script';
import moment from 'moment';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const theme = useTheme();
  const [windowSize, setWindowSize]: any[] = React.useState([]);
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 });
  //axios.get('/api/dishes').then((reponse) => console.log(reponse));
  const ePosDevice = useRef();
  const printer = useRef<any>();
  const printerIPAddress = process.env.NEXT_PUBLIC_PRINTERIP;
  const printerPort = '8008';
  const [PRINTERIP, SETPrinterIP] = React.useState('130.58.110.55');

  const [PRINTER_IP, Set_PRINTERIP] = React.useState('192.168.192.168');
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [deleteSwitch, setdeleteSwitch] = React.useState(false);
  const [SelectedOrder, setSelectedOrder] = React.useState<any>();
  const [deleteMe, setdeleteMe] = React.useState(false);
  const [STATUS_CONNECTED, setConnectionStatus] = React.useState('Not Connected');
  const handleIpEdit = (event: any) => {
    Set_PRINTERIP(event.target.value);
  };

  const handleCompleteSwitch = (event: any) => {
    //console.log(event.target.checked);
    setShowCompleted(event.target.checked);
  };

  const handleDeleteSwitch = (event: any) => {
    //console.log(event.target.checked);
    setdeleteSwitch(event.target.checked);
  };

  const connect = async () => {
    setConnectionStatus('Connecting ...');
    const ePosDev = new window.epson.ePOSDevice();

    ePosDevice.current = ePosDev;
    await ePosDev.connect(PRINTER_IP, printerPort, (data: any) => {
      if (data === 'OK') {
        ePosDev.createDevice(
          'local_printer',
          ePosDev.DEVICE_TYPE_PRINTER,
          { crypto: false, buffer: false },
          (devobj: any, retcode: any) => {
            if (retcode === 'OK') {
              printer.current = devobj;
              setConnectionStatus('CONNECTED');
            } else {
              setConnectionStatus('Connection Failed');
            }
          },
        );
      } else {
        setConnectionStatus('Connection Failed');
      }
    });
  };
  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  function queueDelete(item: any) {
    setSelectedOrder(item);
    setdeleteMe(true);
  }

  const OrderCard = () => {
    if (isLoading) {
      return <></>;
    } else {
      let filteredOrders = [];
      if (showCompleted) {
        filteredOrders = data.orders.sort((a: any, b: any) => a.hidden - b.hidden);
      } else {
        filteredOrders = data.orders.filter((dish: any) => dish.hidden == false);
      }
      const orders = [];
      filteredOrders = filteredOrders.sort((a: any, b: any) => {
        const a2 = moment(a.createdAt);
        const b2 = moment(b.createdAt);
        return b2.diff(a2);
      });

      filteredOrders = filteredOrders.filter((a: any) => {
        return moment().isSame(moment(a.createdAt), 'day');
      });

      for (const item of filteredOrders) {
        const status = item.status;
        let statusColor = 'grey';

        if (status == 'in_progress') {
          statusColor = '#FFA958';
        } else if (status == 'completed') {
          statusColor = '#799653';
        } else {
          statusColor = 'grey';
        }

        orders.push(
          <Grid item key={item._id}>
            <Badge badgeContent={item.dishes.length} color="primary">
              <Card
                style={{
                  background: 'rgba(0,0,0,0.37)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                  WebkitBackdropFilter: 'blur(6.8px)',
                }}
                sx={{
                  borderRadius: '10px',
                  borderColor: 'black',
                  //border: 1,
                }}
                key={item.customerName}
              >
                <Typography
                  variant="h5"
                  bgcolor={statusColor}
                  color={'white'}
                  sx={{ width: '100%', borderStartEndRadius: '10px', p: 0.5 }}
                  textAlign={'center'}
                >
                  {item.customerName}
                </Typography>

                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                  //sx={{ height: '100%' }}
                >
                  <Grid item>
                    <Grid container justifyContent="flex-start" direction="column">
                      <DishAndOptions dishes={item.dishes}></DishAndOptions>
                    </Grid>
                  </Grid>

                  <Grid item container direction="row" sx={{ mt: '15%' }}>
                    <ButtonGroup fullWidth variant="contained">
                      {deleteSwitch ? (
                        <Button fullWidth onClick={() => queueDelete(item)} color="inherit">
                          X
                        </Button>
                      ) : null}

                      <Button fullWidth onClick={() => updateOrder(item)}>
                        Change Status
                      </Button>
                      <Button fullWidth onClick={() => REPRINT(item)}>
                        <Print></Print>
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Card>
            </Badge>
          </Grid>,
        );
      }

      return <>{orders}</>;
    }
  };

  const DishAndOptions = (props: any) => {
    let options = [];
    const DishAndOptions = [];

    for (const item of props.dishes) {
      for (const option of item.options) {
        options.push(
          <>
            <Grid item sx={{ m: 1 }} key={option._id}>
              <Chip
                size="small"
                label={option.friendlyName}
                color="primary"
                sx={{
                  height: 'auto',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                  },
                }}
              ></Chip>
            </Grid>
          </>,
        );
      }
      DishAndOptions.push(
        <>
          <Box key={item._id} sx={{ width: '10vw' }}>
            <Typography variant="h6" textAlign="left" sx={{ mt: '10%' }}>
              {item.friendlyName}
            </Typography>
            {options}
            <Divider></Divider>
          </Box>
        </>,
      );
      options = [];
    }
    return <>{DishAndOptions}</>;
  };

  async function PRINT2(item: any) {
    const prn: any = printer.current;

    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextSmooth(true);
    prn.addTextDouble(true, true);
    prn.addText('CRUMB CAFE\n');
    prn.addTextDouble(false, false);
    prn.addText('Sale Ticket\n\n');

    prn.addText('------------------------------------------');
    prn.addText('ORDER ' + item.customerNumber + '       ' + moment().format('h:mm:ss a') + '\n');
    prn.addText('-----------------------------------------\n');

    prn.addTextAlign(prn.ALIGN_LEFT);
    for (const thing of item.dishes) {
      prn.addText(
        thing.friendlyName.substring(0, 15) +
          ' ................... $' +
          thing.price.toFixed(2) +
          '\n',
      );
      for (const item of thing.options) {
        prn.addText('\t + ' + item.friendlyName + '\n');
      }
    }

    prn.addFeedLine(3);
    prn.addTextAlign(prn.ALIGN_CENTER);
    prn.addTextStyle(false, true, true, prn.COLOR_2);
    prn.addTextDouble(true, true);
    prn.addText(item.customerName + '\n');

    prn.addCut(prn.CUT_FEED);
    prn.send();
  }

  const completeOrder = async (item: any) => {
    //PRINT2(item);
    const url = '/api/orders/' + item._id;
    const theitem = Object.assign({}, item);

    const foodies = Object.assign({}, theitem);
    const drinkies = Object.assign({}, theitem);
    foodies['dishes'] = theitem.dishes.filter((item: any) => item.tag == 'food');
    drinkies['dishes'] = theitem.dishes.filter((item: any) => item.tag == 'drink');
    //RePrintOrder(theitem);

    theitem['status'] = 'completed';
    //theitem['hidden'] = 'true';

    await axios.put(url, theitem).then((response) => {
      console.log(response);
    });
  };

  const REPRINT = async (item: any) => {
    const toPrintServer = {
      customerName: item.customerName,
      total: item.total,
      hidden: false,
      notes: '',
      payment: 'none',
      ip: PRINTERIP,
      receipt: true,
      dishes: item.dishes,
    };

    await axios.post('/api/print', toPrintServer).then((response) => {
      if (response.status == 200) {
        console.log('Reprinted!');
      }
    });
  };

  const deleteOrder = async (item: any) => {
    //PRINT2(item);

    const url = '/api/orders/' + SelectedOrder._id;
    const theitem = Object.assign({}, SelectedOrder);

    await axios.delete(url, theitem).then((response) => {
      console.log(response);
      setdeleteMe(false);
    });
  };

  const updateOrder = async (item: any) => {
    const url = '/api/orders/' + item._id;
    const theitem = Object.assign({}, item);

    if (theitem.status == 'new') {
      theitem.status = 'in_progress';
      await axios.put(url, theitem).then((response) => {
        console.log(response);
      });
    } else if (theitem.status == 'in_progress') {
      theitem.status = 'completed';
      await axios.put(url, theitem).then((response) => {
        console.log(response);
      });
    }
    /*
    
    else if (theitem['status'] == 'in_progress') {
      theitem['updates'].push({
        _id: theitem['_id'],
        newStatus: 'completed',
        user: 'admin',
      });
      theitem['status'] = 'completed';
      theitem['hidden'] = 'true';
    }*/
  };

  return (
    <Box sx={{ mt: '2%' }}>
      <Script src="./epos-2.27.0.js"></Script>
      {deleteMe ? (
        <>
          <Box
            onClick={() => setdeleteMe(false)}
            sx={{
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '10',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          ></Box>
          <Card
            sx={{
              width: '40%',
              height: '40%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: '11',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardHeader
              style={{ backgroundColor: theme.palette.error.light }}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', textAlign: 'center' }}
              title={'DELETE ITEM?'}
            ></CardHeader>
            <Container>
              <Typography variant="h6" textAlign="center" sx={{ mt: '10%' }}>
                Are you sure you want to delete <br></br> {SelectedOrder.customerName} ?
              </Typography>
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: '10%' }}>
                <Button variant="contained" color="error" onClick={deleteOrder} size="large">
                  CONFIRM DELTE
                </Button>
              </Grid>
            </Container>
          </Card>
        </>
      ) : null}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={<Switch value={showCompleted} onChange={handleCompleteSwitch} />}
              label="Show Completed"
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={<Switch value={deleteSwitch} onChange={handleDeleteSwitch} />}
              label="Show Delete"
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ mt: 2, width: '100%', overflowY: 'scroll', height: '82vh' }}
        justifyContent="space-evenly"
        spacing={1}
      >
        <OrderCard></OrderCard>
      </Grid>
    </Box>
  );
}
