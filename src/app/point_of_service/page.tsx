'use client' // dont know why this is here, to catch error:
//You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
//Learn more: https://nextjs.org/docs/getting-started/react-essentials


import { Box, Card, CardHeader, Container, Typography, Button, Grid, AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';

export default function App() {
    const [user, setUser] = useState('izzy');
    const [dish, setDish] = useState(["loaded quesadilla"]);
    const [flag, setFlag] = useState(true); //true is food, false is drink

    var dict: any = {
        1: { "id": 1, "name": "Simple Quesadilla"},
        2: { "id": 2, "name": "Loaded Quesadilla!"},
        3: { "id": 3, "name": "Avo-Goat-O" },
        4: { "id": 4, "name": "Avocado Toast" },
        5: { "id": 5, "name": "Grilled Cheese" },
        6: { "id": 6, "name": "Caprese" },
        7: { "id": 7, "name": "Chips and Guac" },
        8: { "id": 8, "name": "Chips and Salsa" },
        9: { "id": 9, "name": "Cheese Fries" },
        10: { "id": 10, "name": "Pancakes" },
        11: { "id": 11, "name": "French Toast" },
        12: { "id": 12, "name": "Nachos" },
        13: { "id": 13, "name": "Dumplings" },
    };

    const renderFoodButtons = () => {
        let buttons = [];

        for (var prop in dict) {
            buttons.push(<Button sx={{ m: 1 }} size="large" >{dict[prop].name}</Button>);
            //console.log(dict[prop].name);
        }
        return buttons;
    };

    const FoodButtonComponent = () => {
        return (
            <React.Fragment>
                {renderFoodButtons()}
            </React.Fragment>
        )
    }

    const renderCancelOrderComponent = () => {
        return (<Button sx={{ 
            m: 1,
            width: '47%',
            height: 60,
            lineHeight: 1.4,
        }} size="large" >CANCEL<br />ORDER</Button>)
    }

    const CancelOrderComponent = () => {
        return (
            <React.Fragment>
                {renderCancelOrderComponent()}
            </React.Fragment>
        )
    }

    const renderConfirmOrderComponent = () => {
        return (<Button sx={{ 
            m: 1,
            width: '47%',
            height: 60,
            lineHeight: 1.4,
        }} size="large" >CONFIRM<br />ORDER</Button>)
    }

    const ConfirmOrderComponent = () => {
        return (
            <React.Fragment>
                {renderConfirmOrderComponent()}
            </React.Fragment>
        )
    }

    const renderDeleteItemComponent = () => {
        return (<Button sx={{ 
            m: 1,
            width: '30%',
            height: 60,
            fontSize: 12,
        }} size="large" >Delete This Item</Button>)
    }

    const DeleteItemComponent = () => {
        return (
            <React.Fragment>
                {renderDeleteItemComponent()}
            </React.Fragment>
        )
    }

    const renderCustomItemComponent = () => {
        return (<Button sx={{ 
            m: 1,
            width: '30%',
            fontSize: 12,
            height: 60,
        }} size="large" >Custom Item</Button>)
    }

    const CustomItemComponent = () => {
        return (
            <React.Fragment>
                {renderCustomItemComponent()}
            </React.Fragment>
        )
    }
    const renderConfirmItemComponent = () => {
        return (<Button sx={{ 
            m: 1,
            width: '30%',
            fontSize: 12,
            height: 60,

        }} size="large" >Confirm This Item</Button>)
    }

    const ConfirmItemComponent = () => {
        return (
            <React.Fragment>
                {renderConfirmItemComponent()}
            </React.Fragment>
        )
    }
    //dont do this
    const theme = createTheme({
        palette: {
            primary: orange,
            secondary: cyan,
            info: blueGrey,
        },
    });


    useEffect(() => { //runs after first and every render
        console.log("page loaded");
        logUser();
        logDish();
    }, []);

    // function buttonHandler = useCallback(() => {
    //     console.log("button clicked");
    //     setDish("vanilla milkshake");
    //     console.log(dish);
    // }, [dish]);

    // const buttonHandler = () => {
    //     console.log("button clicked");
    //     if (dish == "loaded quesadilla"){
    //         setDish("vanilla milkshake");
    //     } else {
    //         setDish("loaded quesadilla");
    //     }
    //     setFlag(!flag);

    // }


    async function logUser() {
        const response = await fetch("http://localhost:3000/api/hello");
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
        <>
            <Container>
                
                {/* <Box>
                    <Card elevation={6} sx={{ m: 2, p: 4 }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2">Hello {user} ~</Typography>
                            <Typography variant="body1">Here&apos;s a screen for the Point of Service.</Typography>
                            <Button sx={{ m: 0 }} size="large" color="info" onClick=buttonHandler () => { }>Reload</Button>
                            <Button sx={{ m: 1.5 }} size="large" variant='contained' color={flag ? "primary" : "secondary"}>{dish}</Button>
                        </ThemeProvider>
                    </Card>
                </Box> */}

                <Box>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Order 021
                        </Typography>
                        <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={12} rowSpacing={10} columnSpacing={{ xs: 5, sm: 2, md: 2 }}>
                        <Grid item xs={6}>
                            <Card sx={{ m: 1, p: 1 }}>
                                <CardHeader 
                                    subheader="item qty price"
                                />
                                calculator
                                subtotal
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Card sx={{ m: 1, p: 1 }}>
                                        <Typography variant="h6" textAlign="center">FOOD</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6}>
                                    <Card sx={{ m: 1, p: 1 }}>
                                        <Typography variant="h6" textAlign="center">DRINK</Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                            <FoodButtonComponent></FoodButtonComponent>
                        </Grid>
                        
                    </Grid>
                </Box>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <CancelOrderComponent></CancelOrderComponent>
                            <ConfirmOrderComponent></ConfirmOrderComponent>
                            {/*<Grid item xs={6}>
                            <Grid container spacing={1}>
                                
                                
                                    
                                    <Card sx={{ m: 2, p: 1 }}>
                                        <Typography variant="h6" textAlign="center">Cancel Order</Typography>
                                    </Card>
                                </Grid>*/}
                                
                                {/*
                                <Grid item xs={6}>
                                    <Card sx={{ m: 2, p: 1 }}>
                                        <Typography variant="h6" textAlign="center">Confirm Order</Typography>
                                    </Card>
                                </Grid>
                            </Grid>*/}
                        </Grid>
                        <Grid item xs={6}>
                            <DeleteItemComponent></DeleteItemComponent>
                            <CustomItemComponent></CustomItemComponent>
                            <ConfirmItemComponent></ConfirmItemComponent>
                            {/*<<Grid container spacing={1}>
                                
                                Grid item xs={4}>
                                    <Card sx={{ m: 2, p: 1 }}>
                                        <Typography textAlign="center">Delete This Item</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ m: 2, p: 1 }}>
                                        <Typography textAlign="center">Custom Item</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ m: 2, p: 1 }}>
                                        <Typography textAlign="center">Confirm This Item</Typography>                                    </Card>
                                </Grid>
                            
                            </Grid>*/}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}