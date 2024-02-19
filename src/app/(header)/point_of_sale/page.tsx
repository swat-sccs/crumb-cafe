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
  Modal,
  Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect, useRef } from 'react';
import { BreakfastDiningOutlined, LegendToggle } from '@mui/icons-material';
import { AnyKeys } from 'mongoose';
import { Rock_3D } from 'next/font/google';
import axios from 'axios';
import useSWR from 'swr';
import moment from 'moment';
import { Dictionary } from '@fullcalendar/core/internal';

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

  const [editing, setEditing] = React.useState(false);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const scrollToElement = (id: any) => {
    const current = document.getElementById(id);
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleNameChange(e: any) {
    setName(e.target.value);
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
    //setCurrentDish(item);
    //console.log(currentDish);
    // console.log(currentDish);
    //setCurrentOrder([...currentOrder, currentDish]);
    setOptions(false);
    //console.log(currentOrder);
  };

  const calcTotal = () => {
    let rt = 0;

    for (const item of currentOrder) {
      rt += item.basePrice;
      for (const option of item.selectedOptions) {
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
    let temp = Object.assign({}, item);
    temp['_uuid'] = index;

    setIndex(index + 1);

    let editedOrder = Array.from(currentOrder);
    editedOrder.push(temp);
    console.log('EDITED ORDER', editedOrder);
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
    if (options == false) {
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
    }
  };

  const removeOption = async (itemToRemoveFrom: any, optionToRemove: any) => {
    //let rt = runningTotal;

    let temp = Object.assign([], currentOrder);
    //let rt = runningTotal;

    for (const thing of temp) {
      if (
        thing.friendlyName == itemToRemoveFrom.friendlyName &&
        thing.selectedOptions.indexOf(optionToRemove) > -1
      ) {
        let index = thing.selectedOptions.indexOf(optionToRemove);
        thing.selectedOptions.splice(index, 1);
        //thing.basePrice -= optionToRemove.extraPrice;
        //rt -= optionToRemove.extraPrice;
      }
    }

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

    //console.log(runningTotal);
    setRunningTotal(0);
    //console.log(runningTotal);
  };

  const confirmOrder = async (name: string) => {
    console.log('order confirmed!: ' + name);
    console.log(currentOrder);
    handleClose();

    for (const order of currentOrder) {
      // { 'flavor-shots': ['apple', 'lychee'] }
      //let options = { test: ['hello'], test2: ['things'] };
      let thing1 = {};
      if (order.selectedOptions) {
        thing1 = {
          customerName: name,
          dish: order._id,
          price: order.basePrice,
          options: order.selectedOptions,
          hidden: false,
          notes: 'A note',
        };
      } else {
        thing1 = {
          customerName: name,
          dish: order._id,
          price: order.basePrice,
          options: {},
          hidden: false,
          notes: 'A note',
        };
      }

      console.log(thing1);

      await axios.post('/api/orders', thing1).then((response) => {
        //console.log(response.status, response.data.token);
        if (response.status == 200) {
          setSuccess(true);
          setTimeout(handleSuccess, 3000);
          setCurrentOrder([]);
          setName('');
          setRunningTotal(0);
          setOptions(false);
        } else {
          console.log('failed');
          setFailure(true);
          setTimeout(handleFailure, 3000);
        }
      });
    }
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
      <Grid container direction="column" justifyContent="flex-start" sx={{ height: '90vh' }}>
        <Grid item xs={2} sx={{ mt: '5%' }}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={6}>
              <Card
                sx={{
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography fontSize="180%" textAlign="center">
                    {currentDish.friendlyName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <OptionsComponent
              options={currentDish.options}
              _uuid={currentDish._uuid}
            ></OptionsComponent>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const OptionsComponent = (props: any) => {
    const specific = [];

    for (const subOption of props.options) {
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

    return <>{specific}</>;
  };

  const addOption = (option: any, multi: boolean, _uuid: any) => {
    for (const item of currentOrder) {
      console.log(item.friendlyName, item._uuid);
    }
    const index = currentOrder.findIndex((item: any) => item._uuid == _uuid);

    setCurrentDish(currentOrder[index]);
    let theOptions: any = Array.from(currentOrder[index].selectedOptions);
    theOptions.push(option);
    let editedOrder: any = Array.from(currentOrder);
    editedOrder[index].selectedOptions = theOptions;
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
            onClick={handleClose}
            sx={{
              width: '100%',
              height: '100%',
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
        </Grid>
      </>
    );
  };

  const DrinkButtonComponent = () => {
    if (isLoading) {
      return (
        <Grid container justifyContent="center">
          <CircularProgress />
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
        (drink: any) => drink.isOrderable == true && drink.tags.includes('drink'),
      );
      return drinks.map((item: any) => (
        <>
          <Grid item xs={4}>
            <Button
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
              size="large"
              onClick={() => handleOpenOptions(item)}
            >
              {item.friendlyName}
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
          <CircularProgress />
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

      return food.map((item: any) => (
        <>
          <Grid item xs={4} key={item.id}>
            <Button
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
              size="large"
              onClick={() => handleOpenOptions(item)}
            >
              {item.friendlyName}
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
          sx={{
            m: 1,
            width: '47%',
            height: 60,
            lineHeight: 1.4,
          }}
          size="large"
          onClick={() => cancelOrder()}
        >
          CANCEL ORDER
        </Button>
      </>
    );
  };

  const ConfirmOrderComponent = () => {
    return (
      <>
        <Button
          sx={{
            m: 1,
            width: '47%',
            height: 60,
            lineHeight: 1.4,
          }}
          size="large"
          onClick={() => handleOpen()}
        >
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item xs={3}>
              CONFIRM
              <br />
              ORDER
            </Grid>

            <Grid item xs={5}>
              <Typography fontSize="200%">
                (${Number.parseFloat(runningTotal.toString()).toFixed(2)})
              </Typography>
            </Grid>
          </Grid>
        </Button>
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
          <Grid container justifyContent="space-evenly">
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
              Delete This Item
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
              Confirm This Item
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
                <Grid item sm={4}>
                  <Typography variant="h5">{item.friendlyName}</Typography>
                </Grid>

                <Grid item sm={3}>
                  <Typography textAlign="right" variant="h5">
                    ${Number.parseFloat(item.basePrice).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <RenderSelectedOptions
          selectedOptions={item.selectedOptions}
          item={item}
        ></RenderSelectedOptions>

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
    <Container sx={{}}>
      <NamePopUp></NamePopUp>
      <Box>
        <Grid container spacing={12} rowSpacing={10} columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
          <Grid item sm={6}>
            <Card>
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
            </Card>
            <Grid item>
              <List sx={{ overflow: 'auto', height: '60vh' }}>
                <CurrentOrderItemsComponent></CurrentOrderItemsComponent>
              </List>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={1} alignContent="space-around" justifyContent="center">
              <Grid item xs={6}>
                <ToggleComponent></ToggleComponent>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ maxHeight: '60vh' }}>
              <OrderComponent></OrderComponent>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid sx={{ marginTop: '5%', backgroundColor: '' }}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <CancelOrderComponent></CancelOrderComponent>
            <ConfirmOrderComponent></ConfirmOrderComponent>
          </Grid>

          <Grid item xs={6}>
            <Fade in={false}>{<AlertComponent />}</Fade>

            <DeleteConfirmCustomComponent></DeleteConfirmCustomComponent>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
