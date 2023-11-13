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
  ListItemIcon,
  ListItemText,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import { LegendToggle } from '@mui/icons-material';
import { AnyKeys } from 'mongoose';
import { Rock_3D } from 'next/font/google';

// import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function App() {
  //const { data, error, isLoading } = useSWR('/api/dishes', fetcher);
  const [user, setUser] = useState('izzy');
  const [dish, setDish] = useState('Simple Quesadilla');
  const [flag, setFlag] = useState(true); //true is food, false is drink
  const [options, setOptions] = useState(false); //true is in (options/customization mode) false is normal menu

  const dict: any = {
    1: { id: 1, name: 'Simple Quesadilla' },
    2: { id: 2, name: 'Loaded Quesadilla!' },
    3: { id: 3, name: 'Avo-Goat-O' },
    4: { id: 4, name: 'Avocado Toast' },
    5: { id: 5, name: 'Grilled Cheese' },
    6: { id: 6, name: 'Caprese' },
    7: { id: 7, name: 'Chips and Guac' },
    8: { id: 8, name: 'Chips and Salsa' },
    9: { id: 9, name: 'Cheese Fries' },
    10: { id: 10, name: 'Pancakes' },
    11: { id: 11, name: 'French Toast' },
    12: { id: 12, name: 'Nachos' },
    13: { id: 13, name: 'Dumplings' },
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

  const addItems = (item: any) => {
    let rt = runningTotal;
    let temp = drinks;
    items[item - 1].qty += 1;
    rt += items[item - 1].price;
    setRunningTotal(rt);
    setItems([...items]);
    //console.log(items[item - 1].name);
    setDish(items[item - 1].name);
    setOptions(true);
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

  const removeItem = (item: any) => {
    let rt = runningTotal;

    for (const thing of items) {
      if (thing.name == item.name && thing.qty - 1 >= 0) {
        thing.qty -= 1;
        rt -= thing.price;
        if (thing.qty == 0) {
          setOptions(false);
        }
      }
    }

    setRunningTotal(rt);
    setItems([...items]);
  };

  const showOptions = (item: any) => {
    setDish(item.name);
    if (item.qty == 0) {
      setOptions(false);
    } else {
      setOptions(true);
    }
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
    console.log("order canceled");
    for (const thing of items) {
        thing.qty = 0;
    }
    for (const thing of drinks){
        thing.qty = 0;
    }
    console.log(runningTotal);
    setRunningTotal(0);
    console.log(runningTotal);
  }

  const confirmOrder = () => {
    console.log("order confirmed!");
  }

  // const renderFoodButtons = () => {
  //   //console.log(data);
  //   let buttons = [];
  //   for (var prop in dict) {
  //     let currentDish = prop;
  //     buttons.push(
  //       <Grid item xs={4}>
  //         <Button
  //           sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
  //           size="large"
  //           onClick={() => addItems(currentDish)}
  //         >
  //           {dict[prop].name}
  //         </Button>
  //       </Grid>,
  //     );
  //     //console.log(dict[prop].name);
  //   }
  //   return buttons;
  // };

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
  const renderOptions = () => {
    //Call to API/DB to pull options for current menu Item
    var qty = 0;
    for (const prop of items) {
      if (prop.name == dish) {
        qty = prop.qty;
      }
    }

    var currentDishNum = '0';
    var currentDish = {};
    for (var prop in dict) {
      if (dict[prop].name == dish) {
        currentDishNum = prop;
        currentDish = dict[prop];
      }
    }

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
                {dish}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={5}>
          <Card
            sx={{ borderRadius: '10px', display: 'flex', flexDirection: 'column', height: '30%' }}
          >
            <CardContent>
              <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                <Button onClick={() => removeItem(currentDish)} sx={{ fontSize: '200%' }}>
                  -
                </Button>
                <Typography variant="h4">{qty}</Typography>
                <Button onClick={() => addItems(currentDishNum)} sx={{ fontSize: '200%' }}>
                  +
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item>
          <Typography variant="h2" sx={{ marginLeft: '5%' }}>
            Options will be rendered here
          </Typography>
        </Grid>
      </Grid>
    );
  };

  // const DrinkButtonComponent = () => {
  //   return <React.Fragment>{renderDrinkButtons()}</React.Fragment>;
  // };

  const DrinkButtonComponent = () => {
    const buttons = [];
    for (const prop of drinks) {
      const currentDrink = prop;
      buttons.push(
        <Grid item xs={4}>
          <Button
            sx={{ m: 1, width: '100%', height: '100%', fontSize: '120%', fontWeight: 'bold' }}
            size="large"
            onClick={() => addDrinks(currentDrink)}
          >
            {currentDrink.name}
          </Button>
        </Grid>,
      );
    }
      //console.log(dict[prop].name);
    return (
      <>
      {buttons}
      </>
    );
  };

  // const FoodButtonComponent = () => {
  //   return <React.Fragment>{renderFoodButtons()}</React.Fragment>;
  // };

  const FoodButtonComponent = () => {
    //console.log(data);
    let buttons = [];
    for (var prop in dict) {
      let currentDish = prop;
      buttons.push(
        <Grid item xs={4}>
          <Button
            sx={{ m: 1, width: '100%', height: '100%', fontWeight: 'bold' }}
            size="large"
            onClick={() => addItems(currentDish)}
          >
            {dict[prop].name}
          </Button>
        </Grid>,
      );
      //console.log(dict[prop].name);
    }
    return (
      <>
      {buttons}
      </>
    );
  };

  //RENDER ITEMS CONDITIONALLY based on selection of Food or Drink
  //Customization Tab (Extra ingredients/ notes etc)
  const OrderComponent = () => {
    if (options) {
      return <React.Fragment>{renderOptions()}</React.Fragment>;
    } else {
      if (foodOdrink == 'food') {
        return <React.Fragment>{FoodButtonComponent()}</React.Fragment>;
      } else if (foodOdrink == 'drink') {
        return <React.Fragment>{DrinkButtonComponent()}</React.Fragment>;
      }
    }
    return <React.Fragment>{FoodButtonComponent()}</React.Fragment>;
  };

  const ToggleComponent = () => {
    if (!options) {
      return (
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
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  const renderCancelOrderComponent = () => {
    return (
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
    );
  };

  const CancelOrderComponent = () => {
    return <React.Fragment>{renderCancelOrderComponent()}</React.Fragment>;
  };

  const renderConfirmOrderComponent = () => {
    return (
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
    );
  };

  const ConfirmOrderComponent = () => {
    return <React.Fragment>{renderConfirmOrderComponent()}</React.Fragment>;
  };

  /*
  renderDeleteConfirmCustomComponent

  Three buttons names describe function
  
  */
  const renderDeleteConfirmCustomComponent = () => {
    if (options) {
      return (
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
            onClick={() => setOptions(false)}
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
      );
    }
  };

  const DeleteConfirmCustomComponent = () => {
    return <React.Fragment>{renderDeleteConfirmCustomComponent()}</React.Fragment>;
  };

  //adds to current order side
  const CurrentOrderItemsComponent = () => {
    return <React.Fragment>{renderCurrentItems()}</React.Fragment>;
  };

  //Render Current Selected food on left List
  const renderCurrentItems = () => {
    let selectedItems = [];

    for (const prop of items) {
      if (prop.qty > 0) {
        selectedItems.push(prop);
      }
    }

    return selectedItems.map((item: any) => (
      <>
        <ListItemButton onClick={() => showOptions(item)} key={item.name}>
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
                  ${Number.parseFloat(item.price).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </ListItemText>
          <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item)}>
            <DeleteIcon />
          </IconButton>
        </ListItemButton>
        <hr />
      </>
    ));
  };

  //Same as above but for drinks
  const CurrentOrderDrinksComponent = () => {
    return <React.Fragment>{renderCurrentDrinks()}</React.Fragment>;
  };

  const renderCurrentDrinks = () => {
    let selectedItems = [];

    for (const prop of drinks) {
      if (prop.qty > 0) {
        selectedItems.push(prop);
      }
    }

    return selectedItems.map((item: any) => (
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
                  ${Number.parseFloat(item.price).toFixed(2)}
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
  };

  useEffect(() => {
    //runs after first and every render
    console.log('page loaded');
    logUser();
    logDish();
  }, []);

  async function logUser() {
    const response = await fetch('http://localhost:3000/api/hello');
    const users = await response.json();
    console.log(user);
    console.log('username ' + users.name);
    setUser(users.name);
    console.log(user);
  }

  async function logDish() {
    //const response = await fetch("http://localhost:3000/api/dishes/[[...params]]");
    //const dishes = await response.json();
    //console.log(dish);
    //console.log('dish ' + dish);
    //setUser(dishes);
    //console.log(dishes);
  }

  return (
    <Container sx={{}}>
      <Box>
        <Grid container spacing={12} rowSpacing={10} columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
          <Grid item sm={6}>
            <Grid container direction="row" alignContent="center" justifyContent="space-between">
              <Typography variant="h6" textAlign="left">
                Item
              </Typography>
              <Typography variant="h6" textAlign="center">
                Qty
              </Typography>
              <Typography variant="h6" textAlign="right">
                Price
              </Typography>
            </Grid>
            <List sx={{ overflow: 'auto', height: '60vh' }}>
              <CurrentOrderItemsComponent></CurrentOrderItemsComponent>
              <CurrentOrderDrinksComponent></CurrentOrderDrinksComponent>
            </List>
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
