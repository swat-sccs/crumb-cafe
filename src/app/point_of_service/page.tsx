'use client'; // dont know why this is here, to catch error:
//You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
//Learn more: https://nextjs.org/docs/getting-started/react-essentials

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
  Toolbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import { BreakfastDiningOutlined, LegendToggle } from '@mui/icons-material';
import { AnyKeys } from 'mongoose';
import { Rock_3D } from 'next/font/google';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const [user, setUser] = useState('izzy');
  const [currentDish, setCurrentDish] = useState(); //when selected CurrentDish is updated to display correct options.
  const [flag, setFlag] = useState(true); //true is food, false is drink

  //NEEDS TO BE CHANGED to; showOptions or something similar
  const [options, setOptions] = useState(false); //true is in (options/customization mode) false is normal menu

  const [currentOrder, setCurrentOrder]: any[] = useState([]); //Keeps Track of current running order

  const foodItems: any = {
    1: { name: 'Simple Quesadilla', price: 5.25 },
    2: { name: 'Loaded Quesadilla!', price: 5.0 },
    3: { name: 'Avo-Goat-O', price: 5.0 },
    4: { name: 'Avocado Toast', price: 5.0 },
    5: { name: 'Grilled Cheese', price: 5.0 },
    6: { name: 'Caprese', price: 5.0 },
    7: { name: 'Chips and Guac', price: 5.0 },
    8: { name: 'Chips and Salsa', price: 5.0 },
    9: { name: 'Cheese Fries', price: 5.0 },
    10: { name: 'Pancakes', price: 5.0 },
    11: { name: 'French Toast', price: 5.0 },
    12: { name: 'Nachos', price: 5.0 },
    13: { name: 'Dumplings', price: 5.0 },
  };

  const [runningTotal, setRunningTotal] = useState(0);
  //const [foodOdrink, setfoodOdrink] = useState('food');
  const [foodOdrink, setfoodOdrink] = React.useState<string | null>('food');

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    //setfoodOdrink(newAlignment);
    if (newAlignment !== null) {
      setfoodOdrink(newAlignment);
    }
  };

  //const [items, setItems] = useState([data]);

  /*
  const [items, setItems] = useState([
    { name: 'Simple Quesadilla', qty: 0, price: 5.25 },
    { name: 'Loaded Quesadilla!', qty: 0, price: 5.0 },
    { name: 'Avo-Goat-O', qty: 0, price: 5.0 },
    { name: 'Avocado Toast', qty: 0, price: 5.0 },
    { name: 'Grilled Cheese', qty: 0, price: 5.0 },
    { name: 'Caprese', qty: 0, price: 5.0 },
    { name: 'Chips and Guac', qty: 0, price: 5.0 },
    { name: 'Chips and Salsa', qty: 0, price: 5.0 },
    { name: 'Cheese Fries', qty: 0, price: 5.0 },
    { name: 'Pancakes', qty: 0, price: 5.0 },
    { name: 'French Toast', qty: 0, price: 5.0 },
    { name: 'Nachos', qty: 0, price: 5.0 },
    { name: 'Dumplings', qty: 0, price: 5.0 },
  ]);
  */

  //setItems(data);

  const [drinks, setDrinks] = useState([
    { name: 'Sprite', qty: 0, price: 1.25 },
    { name: 'Pepsi', qty: 0, price: 1.0 },
    { name: 'Coke', qty: 0, price: 1.0 },
    { name: 'Fanta', qty: 0, price: 1.0 },
    { name: 'Root Beer', qty: 0, price: 1.0 },
    { name: 'Mountain Dew', qty: 0, price: 1.0 },
    { name: 'Lemonade', qty: 0, price: 1.0 },
    { name: 'WATER', qty: 0, price: 1.0 },
    { name: 'Chocky Milk', qty: 0, price: 1.0 },
  ]);

  // const addItems = (item: any) => {
  //   console.log(item);
  //   let rt = runningTotal;
  //   let temp = drinks;
  //   items[item - 1].qty += 1;
  //   rt += items[item - 1].price;
  //   setRunningTotal(rt);
  //   setItems([...items]);
  //   //console.log(items[item - 1].name);
  //   setDish(items[item - 1].name);
  //   setOptions(true);
  // };

  //pass button as props to this func
  //Each item passed in is a full Dish{}
  const addItems = (item: any) => {
    let rt = runningTotal;
    setCurrentDish(item);
    // console.log(currentDish);
    setCurrentOrder([...currentOrder, item]);
    rt += item.basePrice;
    setRunningTotal(rt);
    setOptions(true);
    console.log(currentOrder);
  };

  const addDrinks = (item: any) => {
    let rt = runningTotal;
    for (const thing of drinks) {
      if (thing.name == item.name) {
        thing.qty += 1;
      }
    }
    rt += item.price;
    setRunningTotal(rt);
    setDrinks([...drinks]);
  };

  const removeItem = (props: any) => {
    setOptions(false);
    console.log('props to follow');
    console.log(props);
    let rt = runningTotal;
    let temp = currentOrder;
    //this finds the first match, but we want it to delete current item!
    //fix later by making sure ALL fields match

    for (const thing of currentOrder) {
      if (thing.friendlyName == props.friendlyName) {
        rt -= thing.basePrice;
        let index = temp.indexOf(thing);
        temp.splice(index, 1);
        setOptions(false);
        console.log('options set to false');
      }
    }
    setRunningTotal(rt);
    setCurrentOrder(temp);
  };

  const showOptions = (item: any) => {
    console.log('selecting from list');
    setCurrentDish(item);
    // if (item.qty == 0) {
    //   setOptions(false);
    // } else {
    //   setOptions(true);
    // }
    // setCurrentDish(item);
    setOptions(true);
  };

  const removeDrink = (item: any) => {
    let rt = runningTotal;
    for (const thing of drinks) {
      if (thing.name == item.name) {
        thing.qty -= 1;
        rt -= thing.price;
      }
    }
    setRunningTotal(rt);
    setDrinks([...drinks]);
  };

  const cancelOrder = () => {
    setCurrentOrder([]);
    for (const thing of drinks) {
      thing.qty = 0;
    }
    console.log(runningTotal);
    setRunningTotal(0);
    console.log(runningTotal);
  };

  const confirmOrder = async () => {
    console.log('order confirmed!');

    for (const order of currentOrder) {
      console.log(order);

      const thing1 = {
        customerName: 'Test Customer',
        dish: order._id,
        options: { 'flavor-shots': ['apple', 'lychee'] },
        notes: 'Once apon a time',
        customDishOptions: {
          friendlyName: order.friendlyName,
          description: 'It is soda',
          price: order.basePrice,
        },
      };

      ///console.log(data);

      await axios.post('/api/orders', thing1).then((response) => {
        console.log(response.status, response.data.token);
        if (response.status == 200) {
          setCurrentOrder([]);
          setRunningTotal(0);
          setOptions(false);
        }
      });
    }
  };

  // const renderDrinkButtons = () => {
  //   const buttons = [];
  //   for (const prop of drinks) {
  //     const currentDrink = prop;
  //     buttons.push(
  //       <Grid item xs={4}>
  //         <Button
  //           sx={{ m: 1, width: '100%', height: '100%', fontSize: '120%', fontWeight: 'bold' }}
  //           size="large"
  //           onClick={() => addDrinks(currentDrink)}
  //         >
  //           {currentDrink.name}
  //         </Button>
  //       </Grid>,
  //     );
  //     //console.log(dict[prop].name);
  //   }
  //   return buttons;
  // };

  /*
  RenderOptions

  When a {dish} is added or selected from list a new set of options will appear. 
  These options replace the menu items and give the user the oppourtunity to make additions
  or add and subtract the number of items being added. 
  */
  const RenderOptions = () => {
    //console.log(currentDish);
    return (
      <Grid container direction="row" justifyContent="space-evenly" sx={{ height: '90vh' }}>
        <Grid item xs={6}>
          <Card
            sx={{
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              height: '30%',
            }}
          >
            <CardContent sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <Typography fontSize="180%" textAlign="center">
                {currentDish.friendlyName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container>
          <Card
            sx={{ borderRadius: '10px', display: 'flex', flexDirection: 'column', height: '30%' }}
          >
            <CardContent>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <SubOptions></SubOptions>
                {currentDish.options[0].friendlyName}
              </Grid>
            </CardContent>
          </Card>
          <Card
            sx={{ borderRadius: '10px', display: 'flex', flexDirection: 'column', height: '30%' }}
          >
            <CardContent>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                {''}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const SubOptions = () => {
    /*
    {
    "_id": "toppings",
    "friendlyName": "toppings",
    "allowMultipleSelections": true,
    "allowNoSelection": true,
    "options": [
        {
            "_id": "syrup",
            "friendlyName": "maple syrup",
            "extraPrice": 0,
            "allowQuantity": false,
            "dependencies": []
        },
        {
            "_id": "berries",
            "friendlyName": "berries",
            "extraPrice": 1,
            "allowQuantity": false,
            "dependencies": []
        }
    ],
    "dependencies": []
}*/

    return <></>;
  };

  // const DrinkButtonComponent = () => {
  //   return <React.Fragment>{renderDrinkButtons()}</React.Fragment>;
  // };

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
              onClick={() => addItems(item)}
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
        (dish: any) => dish.isOrderable == true && dish.tags.includes('food'),
      );

      return food.map((item: any) => (
        <>
          <Grid item xs={4}>
            <Button
              sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
              size="large"
              onClick={() => addItems(item)}
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
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{ marginBottom: '10%' }}
            fullWidth
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
          CANCEL
          <br />
          ORDER
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
          onClick={() => confirmOrder()}
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
          <Grid>
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
            >
              Custom Item
            </Button>
            <Button
              sx={{
                m: 1,
                width: '30%',
                fontSize: 12,
                height: 60,
              }}
              size="large"
              onClick={() => setOptions(false)}
            >
              Confirm This Item
            </Button>
          </Grid>
        </>
      );
    }
    return <></>;
  };

  //Render Current Selected food on left List
  const CurrentOrderItemsComponent = () => {
    const listItems = currentOrder.map((item: any) => (
      <>
        <ListItem
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
        <Divider></Divider>
      </>
    ));
    return <>{listItems}</>;
  };

  const CurrentOrderDrinksComponent = () => {
    let selectedItems = [];
    for (const prop of drinks) {
      if (prop.qty > 0) {
        selectedItems.push(prop);
      }
    }
    const listItems = selectedItems.map((item) => (
      <>
        <ListItemButton>
          <ListItemText style={{ textAlign: 'left' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item sm={4}>
                <Typography variant="h5">{item.name}</Typography>
              </Grid>
              <Grid item sm={5}>
                <Typography textAlign="center" variant="h5">
                  {item.qty}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography textAlign="right" variant="h5">
                  ${Number.parseFloat(item.price.toString()).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </ListItemText>
          <IconButton edge="end" aria-label="delete" onClick={() => removeDrink(item)}>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <hr />
      </>
    ));
    return <>{listItems}</>;
  };

  useEffect(() => {
    //runs after first and every render
    console.log('page loaded');
    //logUser();
    logDish();
  }, []);

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

  async function logDish() {
    // const response = await fetch("http://localhost:3000/api/dishes");
    // const dishes = await response.json();
    // console.log(dishes);
    // console.log('dish ' + dish);
    //setUser(dishes);
    //console.log(dishes);
  }

  return (
    <Container sx={{}}>
      <Box>
        <Grid container spacing={12} rowSpacing={10} columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
          <Grid item sm={6}>
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
            <Grid item>
              <List sx={{ overflow: 'auto', height: '60vh' }}>
                <CurrentOrderItemsComponent></CurrentOrderItemsComponent>
                <CurrentOrderDrinksComponent></CurrentOrderDrinksComponent>
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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CancelOrderComponent></CancelOrderComponent>
            <ConfirmOrderComponent></ConfirmOrderComponent>
          </Grid>
          <Grid item xs={6}>
            <DeleteConfirmCustomComponent></DeleteConfirmCustomComponent>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
