'use client';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Button,
  Grid,
  List,
  ListItemButton,
  CircularProgress,
  ListItemText,
  Divider,
  ListItem,
  Tabs,
  Tab,
  IconButton,
  Alert,
  InputBase,
  TextField,
  Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect, useRef } from 'react';
import {
  BreakfastDiningOutlined,
  FmdGoodSharp,
  LegendToggle,
  NoFoodSharp,
} from '@mui/icons-material';
import { AnyKeys, ConnectionStates } from 'mongoose';
import { Rock_3D } from 'next/font/google';
import axios from 'axios';
import useSWR from 'swr';
import moment from 'moment';
import { Dictionary } from '@fullcalendar/core/internal';
import Printer from '@/app/components/printer';
import { setIPCookie, getIPCookie } from './action';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const [index, setIndex] = React.useState(0);
  //Name PopUp Open and Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Success, setSuccess] = React.useState(false);
  const handleSuccess = () => setSuccess(false);
  const [Failure, setFailure] = React.useState(false);
  const handleFailure = () => setFailure(false);
  const [name, setName] = React.useState('');
  const scrollRef = useRef<any>(null);

  //Printer Things
  const ePosDevice = useRef();
  const printer = useRef<any>();
  const printerPort = '8008';

  const [PRINTER_IP, Set_PRINTERIP] = React.useState('192.168.192.168');
  const [STATUS_CONNECTED, setConnectionStatus] = React.useState('Not Connected');

  const [editing, setEditing] = React.useState(false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const scrollToElement = (id: any) => {
    const current = document.getElementById(id);
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIpEdit = (event: any) => {
    Set_PRINTERIP(event.target.value);
  };

  function handleNameChange(e: any) {
    setName(e.target.value);
  }

  const connect = async () => {
    //const ip = await getIPCookie();
    // Set_PRINTERIP(ip);
    setConnectionStatus('Connecting ...');
    let ePosDev = new window.epson.ePOSDevice();

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
              //setIPCookie(PRINTER_IP);
            } else {
              setConnectionStatus('Connection Failed');
            }
          },
        );
      } else {
        setConnectionStatus('Connection Failed');
      }
    });
    //setIPCookie(PRINTER_IP);
    //setIPCookie(PRINTER_IP);
  };
  React.useEffect(() => {
    //
    connect();
    //console.log(window.epson.ePOSDevice());
  }, []);

  async function PRINT2(item: any) {
    //console.log('PRINTING', item);
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

  const [currentDish, setCurrentDish] = useState<any>(null); //when selected CurrentDish is updated to display correct options.

  /* item Schema
  {
    _id: '',
    friendlyName: '',
    dotw: ['Monday'],
    basePrice: 5,
    tags: ['food'],
    categories: ['food'],
    isOrderable: true,
    isArchived: false,
    selectedOptions: [],
    options: [
      {
        _id: '',
        friendlyName: '',
        extraPrice: 0,
        allowQuantity: true,
        dependencies: [],
      },
    ],
    dependencies: [],
    __v: 0,
  }*/

  const [flag, setFlag] = useState(true); //true is food, false is drink

  //NEEDS TO BE CHANGED to; showOptions or something similar
  const [options, setOptions] = useState(false); //true is in (options/customization mode) false is normal menu

  const [currentOrder, setCurrentOrder] = React.useState<any>([]); //Keeps Track of current running order
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [currentOrder]);

  const [runningTotal, setRunningTotal] = useState(0);
  //const [foodOdrink, setfoodOdrink] = useState('food');
  const [foodOdrink, setfoodOdrink] = React.useState<string | null>('food');

  const handleAlignment = (event: React.SyntheticEvent, newAlignment: string | null) => {
    //setfoodOdrink(newAlignment);
    if (newAlignment !== null) {
      setfoodOdrink(newAlignment);
    }
  };

  const addItems = () => {
    setOptions(false);
    //console.log(currentOrder);
  };

  const calcTotal = () => {
    let rt = 0;

    for (const item of currentOrder) {
      rt += item.price;
      for (const option of item.options) {
        rt += option.extraPrice;
      }
    }

    setRunningTotal(rt);
  };
  useEffect(() => {
    calcTotal();
    //do operation on state change
  }, [currentOrder]);

  const handleOpenOptions = (item: any) => {
    /* 
    customerName: 'customer1',
    customerNumber: 1,
    status: 'completed',
    hidden: 'true', //for display purposes kinda redundant but do I really want to remove and reformat everything that uses it?
    total: 5,
    dishes: [
      {
        _id: 'italian-soda',
        friendlyName: 'Italian Soda',
        tag: 'food',
        price: 5,
        options: [
          {
            _id: 'lychee',
            friendlyName: 'Lychee',
            extraPrice: 0,
            allowQuantity: false,
          },
        ],
      },
    ],
    __v: 0,
  }, */
    //let temp = Object.assign({}, item);
    let temp = {
      _uuid: index,
      _id: item._id,
      friendlyName: item.friendlyName,
      tag: item.tags[0],
      price: item.basePrice,
      options: [],
    };
    //temp['_uuid'] = index;

    setIndex(index + 1);

    let editedOrder = Array.from(currentOrder);
    editedOrder.push(temp);
    //console.log('EDITED ORDER', editedOrder);
    setCurrentOrder(editedOrder);
    setCurrentDish(temp);
    setOptions(true);
    scrollToElement(temp._id);
    //console.log(currentOrder);
  };

  const removeItem = async (props: any) => {
    //setOptions(false);
    //console.log('props to follow');
    //console.log(props);
    let temp = Object.assign([], currentOrder);
    //this finds the first match, but we want it to delete current item!
    //fix later by making sure ALL fields match
    for (const thing of currentOrder) {
      if (thing == props) {
        let index = temp.indexOf(thing);
        temp.splice(index, 1);
        //setOptions(false);
        //console.log('options set to false');
        break;
      }
    }

    setCurrentOrder(temp);
    setOptions(false);
  };

  const removeOption = async (itemToRemoveFrom: any, optionToRemove: any) => {
    let temp = Object.assign([], currentOrder);
    const index = currentOrder.findIndex((item: any) => item._uuid == itemToRemoveFrom._uuid);

    let optionIndex = currentOrder[index].options.findIndex(
      (item: any) => item._id == optionToRemove._id,
    );

    temp[index].options.splice(optionIndex, 1);
    setCurrentOrder(temp);
  };

  const showOptions = (item: any) => {
    setCurrentDish(item);
    // if (item.qty == 0) {
    //   setOptions(false);
    // } else {
    //   setOptions(true);
    // }
    // setCurrentDish(item);
    setOptions(true);
  };

  const cancelOrder = () => {
    setCurrentOrder([]);
    Printer();

    //console.log(runningTotal);
    setRunningTotal(0);
    //console.log(runningTotal);
  };

  const confirmOrder = async (name: string) => {
    //handleClose();
    //Current order should just be a mirror of the dishes array You will attach below each order is simply a dish object.

    let thing1 = {
      customerName: name,
      total: runningTotal,
      hidden: false,
      notes: '',
      dishes: currentOrder,
    };

    //break food and drinks into seperate lists so that they can each be on their own recipts.

    let foodies = {
      customerName: name,
      total: runningTotal,
      hidden: false,
      notes: '',
      dishes: currentOrder.filter((item: any) => item.tag == 'food'),
    };
    let drinkies = {
      customerName: name,
      total: runningTotal,
      hidden: false,
      notes: '',
      dishes: currentOrder.filter((item: any) => item.tag == 'drink'),
    };

    //console.log(thing1);

    await axios.post('/api/orders', thing1).then((response) => {
      //console.log(response.status, response.data.token);
      if (response.status == 200) {
        console.log('order confirmed!: ' + name);
        handleClose();
        setSuccess(true);
        setTimeout(handleSuccess, 3000);
        setCurrentOrder([]);
        setName('');
        setRunningTotal(0);
        setOptions(false);
        if (foodies.dishes.length > 0) {
          PRINT2(foodies);
        }
        if (drinkies.dishes.length > 0) {
          PRINT2(drinkies);
        }
      } else {
        console.log('failed');
        handleClose();
        setFailure(true);
        setTimeout(handleFailure, 3000);
      }
    });
  };
  /*
  RenderOptions

  When a {dish} is added or selected from list a new set of options will appear. 
  These options replace the menu items and give the user the oppourtunity to make additions
  or add and subtract the number of items being added. 
  */
  const RenderOptions = () => {
    //console.log(currentDish);
    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        sx={{ height: '69vh' /*hah*/ }}
      >
        <Grid item container xs={2} sx={{ mt: '5%' }}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={12}>
              <Card
                style={{
                  background: 'rgba(0,0,0,0.37)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '10px 10px 10px rgba(30,30,30,0.5)',
                  WebkitBackdropFilter: 'blur(6.8px)',
                }}
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                }}
              >
                <CardContent>
                  <Typography variant="h3" textAlign="center">
                    {currentDish.friendlyName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: '4%' }}
          >
            <OptionsComponent
              friendlyName={currentDish.friendlyName}
              _uuid={currentDish._uuid}
            ></OptionsComponent>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const OptionsComponent = (props: any) => {
    const specific = [];

    let item = data.dishes.filter((item: any) => item.friendlyName == props.friendlyName);

    for (const option of item) {
      let temp: any = option.options;

      for (const subOption of temp) {
        const multi = subOption.allowQuantity;
        specific.push(
          <>
            <Grid item sx={{ m: 1 }} key={props._uuid}>
              <Button onClick={() => addOption(subOption, multi, props._uuid)} size="large">
                {subOption.friendlyName}
              </Button>
            </Grid>
          </>,
        );
      }
    }

    return <>{specific}</>;
  };

  const addOption = (option: any, multi: boolean, _uuid: any) => {
    const index = currentOrder.findIndex((item: any) => item._uuid == _uuid);
    setCurrentDish(currentOrder[index]);

    let theOptions: any = Array.from(currentOrder[index].options);
    theOptions.push(option);
    let editedOrder: any = Array.from(currentOrder);
    editedOrder[index].options = theOptions;
    //editedOrder[currentOrder.length - 1] = editedDish;
    setCurrentOrder(editedOrder);
  };

  const NamePopUp = () => {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '30vw',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    if (open) {
      return (
        <>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: '1',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '30vw',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="transition-modal-title" variant="h3" align="center">
                Order Name
              </Typography>
              <InputComponent />
            </Box>
          </Box>
        </>
      );
    }
    return <></>;
  };
  const InputComponent = () => {
    return (
      <>
        <Grid container direction="column" justifyContent="space-evenly">
          <Grid container direction="row" justifyContent="center" sx={{ marginTop: '7%' }}>
            <Box
              sx={{
                borderRadius: 10,
                width: '20vw',
                height: '10vh',
                outlineColor: 'white',
                outlineStyle: 'solid',
              }}
            >
              {' '}
              <InputBase
                autoFocus
                autoComplete="off"
                inputProps={{ style: { textAlign: 'center' } }}
                id="filled-basic"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                sx={{ fontSize: '250%', padding: 1, ml: 1, flex: 1 }}
              />
            </Box>
          </Grid>
          <Button sx={{ marginTop: 2 }} onClick={() => confirmOrder(name)}>
            Submit
          </Button>
          <Button sx={{ marginTop: 2 }} onClick={handleClose} color="secondary">
            {' '}
            close
          </Button>
        </Grid>
      </>
    );
  };

  const DrinkButtonComponent = () => {
    if (isLoading) {
      return (
        <Grid container justifyContent="center">
          <CircularProgress color="primary" />
        </Grid>
      );
    }
    if (error) {
      return (
        <Grid container justifyContent="center">
          <div>Something went wrong: {error}</div>
        </Grid>
      );
    } else {
      const drinks = data.dishes.filter(
        (drink: any) =>
          drink.dotw.includes(moment().format('dddd').toString()) &&
          drink.isOrderable == true &&
          drink.tags.includes('drink'),
      );

      return drinks.map((item: any) => (
        <>
          <Grid item xs={4}>
            <Button
              //DRINKBUTTONS
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold', boxShadow: 10 }}
              color="primary"
              size="large"
              onClick={() => handleOpenOptions(item)}
            >
              <Typography variant="body1" textTransform="uppercase" fontWeight="bold">
                {item.friendlyName}
              </Typography>
            </Button>
          </Grid>
        </>
      ));
    }
  };

  // const FoodButtonComponent = () => {
  //   return <React.Fragment>{renderFoodButtons()}</React.Fragment>;
  // };

  /*
  const FoodButtonComponent = () => {
    //console.log(data);
    if (isLoading) {
      return (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      );
    } else {
      let buttons = [];
      for (var prop in foodItems) {
        let currentDish = prop;
        buttons.push(
          <Grid item xs={4}>
            <Button
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
              size="large"
              onClick={() => addItems(currentDish)}
            >
              {foodItems[prop].name}
            </Button>
          </Grid>,
        );
      }
      return <>{buttons}</>;
    }
  };

  */

  const FoodButtonComponent = () => {
    if (isLoading) {
      return (
        <Grid container justifyContent="center">
          <CircularProgress color="secondary" />
        </Grid>
      );
    }
    if (error) {
      return (
        <Grid container justifyContent="center">
          <div>Something went wrong: {error}</div>
        </Grid>
      );
    } else {
      const food = data.dishes.filter(
        (dish: any) =>
          dish.isOrderable == true &&
          dish.tags.includes('food') &&
          dish.dotw.includes(moment().format('dddd').toString()),
      );
      //(food);

      return food.map((item: any) => (
        <>
          <Grid item xs={4} key={item.id}>
            <Button
              color="secondary"
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
              size="large"
              onClick={() => handleOpenOptions(item)}
            >
              <Typography variant="body1" textTransform="uppercase" fontWeight="bold">
                {item.friendlyName}
              </Typography>
            </Button>
          </Grid>
        </>
      ));
    }
  };

  //RENDER ITEMS CONDITIONALLY based on selection of Food or Drink
  //Customization Tab (Extra ingredients/ notes etc)
  const OrderComponent = () => {
    if (options) {
      return <>{RenderOptions()}</>;
    } else {
      if (foodOdrink == 'food') {
        return <>{FoodButtonComponent()}</>;
      } else if (foodOdrink == 'drink') {
        return <>{DrinkButtonComponent()}</>;
      }
    }
    return <></>;
  };

  const ToggleComponent = () => {
    if (!options) {
      return (
        <>
          <Tabs
            value={foodOdrink}
            //exclusive

            textColor={foodOdrink == 'drink' ? 'primary' : 'secondary'}
            indicatorColor={foodOdrink == 'drink' ? 'primary' : 'secondary'}
            aria-label="text alignment"
            sx={{ marginBottom: '10%' }}
            onChange={handleAlignment}
            variant="fullWidth"
          >
            <Tab value="food" aria-label="left aligned" label="Food" />
            <Tab value="drink" aria-label="centered" label="Drink" />
          </Tabs>
        </>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };
  /*
  const ToggleComponent = () => {
    if (!options) {
      return (
        <>
          <ToggleButtonGroup
            value={foodOdrink}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{ marginBottom: '10%' }}
            fullWidth
          >
            <ToggleButton value="food" aria-label="left aligned">
              FOOD
            </ToggleButton>
            <ToggleButton value="drink" aria-label="centered">
              DRINK
            </ToggleButton>
          </ToggleButtonGroup>
        </>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };
*/
  const AlertComponent = () => {
    if (Success) {
      return (
        <Alert sx={{ display: 'flex', width: '50%' }} severity="success" variant="outlined">
          Success — Order Confirmed!
        </Alert>
      );
    }
    if (Failure) {
      return (
        <Alert sx={{ display: 'flex', width: '50%' }} severity="error" variant="outlined">
          Error — Something went wrong!
        </Alert>
      );
    } else {
      return <></>;
    }
  };
  const CancelOrderComponent = () => {
    return (
      <>
        <Button
          fullWidth
          sx={{
            m: 1,
            height: 60,
            lineHeight: 1.4,
          }}
          size="large"
          onClick={() => cancelOrder()}
        >
          <Typography variant="body1">CANCEL ORDER</Typography>
        </Button>
      </>
    );
  };

  const ConfirmOrderComponent = () => {
    return (
      <>
        <Button
          fullWidth
          sx={{
            m: 1,
            height: 60,
            lineHeight: 1.4,
          }}
          color="success"
          size="large"
          onClick={() => handleOpen()}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="body1"> CONFIRM</Typography>
            </Grid>

            {/*
            <Grid item xs={6}>
              <Typography>(${Number.parseFloat(runningTotal.toString()).toFixed(2)})</Typography>
            </Grid>
             */}
          </Grid>
        </Button>
      </>
    );
  };

  const OrderTotalComponent = () => {
    return (
      <>
        <Grid container justifyContent="space-between">
          <Grid item ml="10%">
            <Typography variant="h5">Total</Typography>
          </Grid>

          <Grid item mr="10%">
            <Typography variant="h5">
              (${Number.parseFloat(runningTotal.toString()).toFixed(2)})
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  };
  /*
  renderDeleteConfirmCustomComponent

  Three buttons names describe function
  
  */
  const DeleteConfirmCustomComponent = () => {
    if (options) {
      return (
        <>
          <Grid item container justifyContent="space-evenly">
            {' '}
            <Button
              sx={{
                m: 1,
                width: '30%',
                height: 60,
                fontSize: 12,
              }}
              size="large"
              //come back here IZZY
              onClick={() => removeItem(currentDish)}
            >
              <Typography variant="body1">Delete Item</Typography>
            </Button>
            <Button
              sx={{
                m: 1,
                width: '30%',
                fontSize: 12,
                height: 60,
              }}
              size="large"
              onClick={() => addItems()}
            >
              <Typography variant="body1">Confirm </Typography>
            </Button>
          </Grid>
        </>
      );
    }
    return <></>;
  };

  const RenderSelectedOptions = (props: any) => {
    return props.selectedOptions.map((option: any) => (
      <>
        <ListItem id={props.item._id}>
          <ListItemButton sx={{ pl: 2 }} onClick={() => removeOption(props.item, option)}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item>
                <ListItemText sx={{ overflowX: 'auto' }}>{option.friendlyName}</ListItemText>
              </Grid>
              <Grid item>
                {option.extraPrice > 0 ? (
                  <ListItemText>+ {option.extraPrice.toFixed(2)}</ListItemText>
                ) : null}
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
      </>
    ));
  };
  //Render Current Selected food on left List
  const CurrentOrderItemsComponent = () => {
    //(currentOrder);

    return currentOrder.map((item: any) => (
      <>
        <ListItem
          ref={scrollRef}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item)}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton key={item.friendlyName} onClick={() => showOptions(item)}>
            <ListItemText style={{ textAlign: 'left' }}>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item sm={9}>
                  <Typography variant="h5">{item.friendlyName}</Typography>
                </Grid>

                <Grid item sm={3}>
                  <Typography textAlign="right" variant="h5">
                    ${Number.parseFloat(item.price).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <RenderSelectedOptions selectedOptions={item.options} item={item}></RenderSelectedOptions>

        <Divider></Divider>
      </>
    ));
  };

  /*
  async function logUser() {
    const response = await fetch('http://localhost:3000/api/hello');
    const users = await response.json();
    console.log(user);
    console.log('username ' + users.name);
    setUser(users.name);
    console.log(user);
  }
  */

  return (
    <Box>
      <TextField
        value={PRINTER_IP}
        label="IP Addr..."
        variant="outlined"
        size="small"
        onChange={handleIpEdit}
        sx={{ position: 'absolute', top: 15, right: 0, mr: '28%' }}
      />
      <Button
        color="secondary"
        disabled={STATUS_CONNECTED == 'CONNECTED'}
        sx={{ position: 'absolute', top: 2, right: 40, mt: '1%', mr: '10%' }}
        onClick={() => connect()}
      >
        {STATUS_CONNECTED}
      </Button>
      <NamePopUp></NamePopUp>
      <Box
        sx={{ position: 'absolute', bottom: '0', right: '0', mb: '5%', mr: '-5%', width: '35%' }}
      >
        <Fade in={true}>
          {
            <div>
              <AlertComponent />
            </div>
          }
        </Fade>
      </Box>
      <Container sx={{ backgroundColor: 'white', height: '100%', mt: '2%' }}>
        <Grid container spacing={10} direction="row">
          <Grid item sm={6} md={6}>
            <Card
              style={{
                background: 'rgba(0,0,0,0.37)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
              sx={{ height: '82vh', boxShadow: 10 }}
            >
              <Grid
                container
                direction="row"
                alignContent="center"
                justifyContent="space-between"
                sx={{ p: 2 }}
              >
                <Typography variant="h6" textAlign="left">
                  Item
                </Typography>

                <Typography variant="h6" textAlign="right">
                  Price
                </Typography>
              </Grid>

              <Grid item container direction="column">
                <Grid item>
                  <List sx={{ overflow: 'auto', height: '59vh' }}>
                    <CurrentOrderItemsComponent></CurrentOrderItemsComponent>
                  </List>
                </Grid>
                <Grid item>
                  <Card
                    sx={{ height: '15vh' }}
                    style={{
                      background: 'rgba(231, 255, 255,0.3)',
                    }}
                  >
                    <Grid container item alignContent="center" justifyContent="center" mt="2%">
                      <OrderTotalComponent></OrderTotalComponent>
                    </Grid>
                    <Grid
                      container
                      item
                      spacing={3}
                      alignContent="center"
                      justifyContent="center"
                      sx={{}}
                    >
                      <Grid item md={5} lg={5}>
                        <CancelOrderComponent></CancelOrderComponent>
                      </Grid>
                      <Grid item md={5} lg={5}>
                        <ConfirmOrderComponent></ConfirmOrderComponent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item container xs={6} md={6} lg={6} alignContent="flex-start" direction="column">
            <Grid item container spacing={1} alignContent="space-around" justifyContent="center">
              <ToggleComponent></ToggleComponent>
            </Grid>

            <Grid item container sx={{ maxHeight: '70vh' }}>
              <Grid item container xs={12} spacing={2}>
                <OrderComponent></OrderComponent>
                <DeleteConfirmCustomComponent></DeleteConfirmCustomComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
