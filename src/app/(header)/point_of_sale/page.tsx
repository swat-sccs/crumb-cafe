'use client';
import Printer from '@/app/components/printer';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  ButtonGroup,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  TextField,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const [index, setIndex] = React.useState(0);
  //Name PopUp Open and Close
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [Success, setSuccess] = React.useState(false);
  const handleSuccess = () => setSuccess(false);
  const [Failure, setFailure] = React.useState(false);
  const handleFailure = () => setFailure(false);
  const [name, setName] = React.useState('');
  const [paymore, setPayMore] = React.useState(false);

  const [oneCard, setOneCard] = React.useState('');
  const [oneopen, setoneopen] = React.useState(false);
  const scrollRef = useRef<any>(null);

  const [numberOfItems, setNumberOfItems] = React.useState(1);

  //Printer Things
  const [PRINTERIP, SETPrinterIP] = React.useState(process.env.NEXT_PUBLIC_PRINTERIP);

  const scrollToElement = (id: any) => {
    const current = document.getElementById(id);
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleOneCardChange(e: any) {
    setOneCard(e.target.value);
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

  const addItems = (dish: any) => {
    setOptions(false);
    if (numberOfItems > 1) {
      let editedOrder = Array.from(currentOrder);
      let temp: any = Object.assign({}, dish);
      let tempIndex = index;
      for (let x = 1; x < numberOfItems; x++) {
        temp._uuid = tempIndex;
        //temp['_uuid'] = index;

        tempIndex += 1;
        editedOrder.push(temp);

        scrollToElement(temp._id);

        //editedOrder.push(duplicate);
        //console.log('EDITED ORDER', editedOrder);
        //setCurrentOrder(editedOrder);
        //scrollToElement(duplicate._id);
      }
      setNumberOfItems(1);
      setCurrentOrder(editedOrder);
      setIndex(tempIndex);
    }
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
    //console.log('CURRENT', currentOrder);
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
    const temp = {
      _uuid: index,
      _id: item._id,
      friendlyName: item.friendlyName,
      tag: item.tags[0],
      price: item.basePrice,
      options: [],
    };
    //temp['_uuid'] = index;

    setIndex(index + 1);

    const editedOrder = Array.from(currentOrder);
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
    const temp = Object.assign([], currentOrder);
    //this finds the first match, but we want it to delete current item!
    //fix later by making sure ALL fields match
    for (const thing of currentOrder) {
      if (thing == props) {
        const index = temp.indexOf(thing);
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
    const temp = Object.assign([], currentOrder);
    const index = currentOrder.findIndex((item: any) => item._uuid == itemToRemoveFrom._uuid);

    const optionIndex = currentOrder[index].options.findIndex(
      (item: any) => item._id == optionToRemove._id,
    );

    // console.log(temp[index]);
    temp[index].options.splice(optionIndex, 1);
    //console.log('NEWNEW', temp);
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

  const confirmOrder = async (name: string, paymentType: string) => {
    const thing1 = {
      customerName: name,
      total: runningTotal,
      hidden: false,
      notes: '',
      dishes: currentOrder,
    };

    const toPrintServer = {
      customerName: name,
      total: runningTotal,
      hidden: false,
      notes: '',
      oc: oneCard,
      payment: paymentType,
      ip: PRINTERIP,
      receipt: true,
      dishes: currentOrder,
    };

    /*
    text 500,500
    clear 1048, 628
    enter 125, 630
    mealswipe 726, 250
    svc 400, 250
    cancel 980, 1169
    pay 183, 1169
    */

    //Send order to db
    await axios.post('/api/orders', thing1).then((response) => {
      if (response.status == 200) {
        setSuccess(true);
        setTimeout(handleSuccess, 3000);
      } else {
        console.log('failed to send order to backend');
        setFailure(true);
        setTimeout(handleFailure, 3000);
      }
    });

    //Send order to print server/tablet
    // *ignore is the magic keyword
    if (name != '*ignore') {
      await axios.post('/api/print', toPrintServer).then((response) => {
        if (response.status == 200) {
          if (runningTotal - 7 > 0 && paymentType == 'swipe') {
            handleClose();
            setOpen(false);
            setPayMore(true);
          } else {
            handleClose();
            setSuccess(true);
            setTimeout(handleSuccess, 3000);
            setCurrentOrder([]);
            setName('');
            setRunningTotal(0);
            setOneCard('');
            setOptions(false);
          }
        } else {
          setFailure(true);
          setTimeout(handleFailure, 3000);
        }
      });
    }
    if (name == '*ignore') {
      if (runningTotal - 7 > 0 && paymentType == 'swipe') {
        handleClose();
        setOpen(false);
        setPayMore(true);
      } else {
        handleClose();
        setSuccess(true);
        setTimeout(handleSuccess, 3000);
        setCurrentOrder([]);
        setName('');
        setRunningTotal(0);
        setOneCard('');
        setOptions(false);
      }
    }
  };

  const pay2 = async (name: string, paymentType: string) => {
    const toPrintServer2 = {
      customerName: name,
      total: runningTotal - 7,
      hidden: false,
      notes: '',
      oc: oneCard,
      ip: PRINTERIP,
      payment: paymentType,
      receipt: false,
      dishes: currentOrder,
    };

    await axios.post('/api/print', toPrintServer2).then((response) => {
      if (response.status == 200) {
        handleClose();
        setPayMore(false);
        setSuccess(true);
        setTimeout(handleSuccess, 3000);
        setCurrentOrder([]);
        setName('');
        setRunningTotal(0);
        setOneCard('');
        setOptions(false);
      } else {
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
        sx={{ height: '67vh' /*hah*/ }}
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

    const item = data.dishes.filter((item: any) => item.friendlyName == props.friendlyName);

    for (const option of item) {
      const temp: any = option.options.sort((a: any, b: any) =>
        a.friendlyName.localeCompare(b.friendlyName),
      );

      for (const subOption of temp) {
        const multi = subOption.allowQuantity;
        specific.push(
          <>
            <Grid item sx={{ m: 1 }} key={props._uuid}>
              <Button onClick={() => addOption(subOption, multi, props._uuid)} size="large">
                <Typography variant="body1" textTransform="uppercase" fontWeight="bold">
                  {subOption.friendlyName}
                </Typography>
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

    const theOptions: any = Array.from(currentOrder[index].options);
    theOptions.push(option);
    const editedOrder: any = Array.from(currentOrder);
    editedOrder[index].options = theOptions;
    //editedOrder[currentOrder.length - 1] = editedDish;
    setCurrentOrder(editedOrder);
  };

  const OneCardPopUp = () => {
    return (
      <Dialog
        slotProps={{
          backdrop: {
            sx: {
              //Your style here....
              height: '100vh',
            },
          },
        }}
        fullWidth
        open={oneopen}
        onClose={() => setoneopen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const oneCard = formJson.oneCard;
            console.log(oneCard);
            setOneCard(oneCard);
            setoneopen(false);
            setOpen(true);
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h3">Scan OneCard</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="oneCard"
            name="oneCard"
            label="OneCard"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setoneopen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const OneCardInputComponent = () => {
    return (
      <>
        <Grid container direction="column" justifyContent="space-evenly">
          <Grid container direction="row" justifyContent="center" sx={{ marginTop: '7%' }}>
            <Box
              sx={{
                borderRadius: 10,
                width: '30vw',
                height: '10vh',
                outlineColor: 'white',
                outlineStyle: 'solid',
              }}
            >
              <InputBase
                autoFocus
                autoComplete="off"
                inputProps={{ style: { textAlign: 'center' } }}
                id="filled-basic"
                placeholder="One Card"
                value={oneCard}
                onChange={handleOneCardChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && oneCard.length > 3) {
                    setoneopen(false), setOpen(true);
                  }
                }}
                sx={{ fontSize: '250%', padding: 1, ml: 1, flex: 1 }}
              />
            </Box>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" direction="row">
            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => {
                  setoneopen(false), setOpen(true);
                }}
                size="large"
              >
                <Typography variant="h5">To Name</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  const MorePayPopUp = () => {
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

    if (paymore) {
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
            onClick={handleClose}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40vw',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              zIndex: '2',
              p: 4,
            }}
          >
            <Typography id="transition-modal-title" variant="h3" align="center">
              ${runningTotal - 7} Remaning
            </Typography>
            <MorePayPopUpInput />
          </Box>
        </>
      );
    }
    return <></>;
  };
  const MorePayPopUpInput = () => {
    return (
      <>
        <Grid container direction="column" justifyContent="space-evenly">
          <Grid container direction="row" justifyContent="center" sx={{ marginTop: '7%' }}>
            <Box
              sx={{
                borderRadius: 10,
                width: '30vw',
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
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <Grid item xs={8}>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => pay2(name, 'dining')}
                size="large"
              >
                <Typography variant="h5">Dining Dollars</Typography>
              </Button>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => pay2(name, 'swat')}
                size="large"
              >
                <Typography variant="h5">Swat Points</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={() => setPayMore(false)} color="secondary" size="large">
                <Typography variant="h5"> Close</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
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
            onClick={handleClose}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40vw',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              zIndex: '2',
              p: 4,
            }}
          >
            <Typography id="transition-modal-title" variant="h3" align="center">
              Order Name
            </Typography>
            <InputComponent />
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
                width: '30vw',
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
          <Grid container justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <Grid item xs={8}>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => confirmOrder(name, 'swipe')}
                size="large"
              >
                <Typography variant="h5">Meal Swipe</Typography>
              </Button>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => confirmOrder(name, 'dining')}
                size="large"
              >
                <Typography variant="h5">Dining Dollars</Typography>
              </Button>
              <Button
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={() => confirmOrder(name, 'swat')}
                size="large"
              >
                <Typography variant="h5">Swat Points</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth onClick={handleClose} color="secondary" size="large">
                <Typography variant="h5"> Close</Typography>
              </Button>
            </Grid>
          </Grid>
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
      const drinks = data.dishes
        .filter(
          (drink: any) =>
            drink.dotw.includes(moment().format('dddd').toString()) &&
            drink.isOrderable == true &&
            drink.tags.includes('drink'),
        )
        .sort((a: any, b: any) => a.friendlyName.localeCompare(b.friendlyName));

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
      const food = data.dishes
        .filter(
          (dish: any) =>
            dish.isOrderable == true &&
            dish.tags.includes('food') &&
            dish.dotw.includes(moment().format('dddd').toString()),
        )
        .sort((a: any, b: any) => a.friendlyName.localeCompare(b.friendlyName));
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
          onClick={() => setoneopen(true)}
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
          <Grid item container justifyContent="center">
            <Button
              variant="outlined"
              size="large"
              //come back here IZZY
              onClick={() => {
                if (numberOfItems - 1 >= 0) {
                  setNumberOfItems(numberOfItems - 1);
                }
              }}
            >
              <Typography variant="body1">-</Typography>
            </Button>
            <Typography sx={{ ml: 2, mr: 2 }} variant="h5">
              {numberOfItems}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              //come back here IZZY
              onClick={() => setNumberOfItems(numberOfItems + 1)}
            >
              <Typography variant="body1">+</Typography>
            </Button>
          </Grid>

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
              onClick={() => addItems(currentDish)}
            >
              <Typography variant="body1">Confirm</Typography>
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
        <ListItem key={props.item._id}>
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
    <Box sx={{ mt: 5 }}>
      <TextField
        sx={{ position: 'absolute', top: 10, right: 200 }}
        label="Printer IP"
        variant="outlined"
        value={PRINTERIP}
        onChange={(e: any) => SETPrinterIP(e.target.value)}
      ></TextField>
      <OneCardPopUp></OneCardPopUp>
      <NamePopUp></NamePopUp>
      <MorePayPopUp></MorePayPopUp>
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
      <Box>
        <Grid container spacing={10} direction="row">
          <Grid item sm={6} md={6}>
            <Card
              style={{
                background: 'rgba(0,0,0,0.37)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
              sx={{ boxShadow: 10 }}
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
                  <List
                    sx={{
                      overflow: 'scroll',
                      height: '59dvh',
                    }}
                  >
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

            <Grid item container>
              <Grid item container xs={12} spacing={2}>
                <OrderComponent></OrderComponent>

                <DeleteConfirmCustomComponent></DeleteConfirmCustomComponent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
