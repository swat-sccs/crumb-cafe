'use client' // dont know why this is here, to catch error:
//You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
//Learn more: https://nextjs.org/docs/getting-started/react-essentials


import { Box, Card, Container, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, cyan, blueGrey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';


export default function App() {
    const [user, setUser] = useState('izzy');
    const [dish, setDish] = useState(["loaded quesadilla"]);
    const [flag, setFlag] = useState(true); //true is food, false is drink

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
        console.log('dish ' + dish);
        //setUser(dishes);
        //console.log(dishes);
    }

    return (
        <>
            <Container>

                <Box>
                    <Card elevation={6} sx={{ m: 2, p: 4 }}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2">Hello {user} ~</Typography>
                            <Typography variant="body1">Here&apos;s a screen for the Point of Service.</Typography>
                            <Button sx={{ m: 0 }} size="large" color = "info" onClick={/*buttonHandler*/ () => {}}>Reload</Button>
                            <Button sx={{ m: 1.5 }} size="large" variant='contained' color={flag ? "primary" : "secondary"}>{dish}</Button>
                        </ThemeProvider>

                    </Card>
                </Box>
            </Container>
        </>
    );
}