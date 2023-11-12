import React from 'react';
import { Box, Card, CardHeader, Container, Typography, useTheme, Slide } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Drawer,
} from '@mui/material';
// import { NavigateBeforeIcon, NavigateNextIcon, } from '@mui/icons-material';
import CardContent from '@mui/material/CardContent';
import styles from '../page.module.css';

const stuffs = [{ order_number: '1', name: 'Tina' }];

const orders = [
  {
    name: 'J. Fox',
    items: [
      { item: 'Burger', qty: '1' },
      { item: 'Fries', qty: '1' },
      { item: 'Chicken Tenders', qty: '1' },
      { item: 'Coke', qty: '1' },
      { item: 'MilkShake', qty: '1' },
    ],
  },
  {
    name: 'M. Fox',
    items: [
      { item: 'Chips and Salsa', qty: '1' },
      { item: 'MilkShake', qty: '1' },
      { item: 'Chicken Tenders', qty: '1' },
      { item: 'Pepsi', qty: '1' },
    ],
  },
];

export default function Home() {
  const OrderCard = () => {
    return (
      <>
        {orders.map((order) => (
          <Card
            sx={{ borderRadius: '10px', borderColor: 'black', border: 1, width: 200, height: '' }}
            key={order.name}
          >
            <Typography
              variant="h5"
              bgcolor={'orange'}
              color={'white'}
              sx={{ width: '100%', borderStartEndRadius: '10px' }}
              textAlign={'center'}
            >
              {order.name}
            </Typography>
            <CardContent>
              <List>
                <OrderCardItems />
              </List>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const OrderCardItems = () => {
    return (
      <>
        {orders.map((o) => (
          <ListItem key={o.name}>{o.items.item}</ListItem>
        ))}
      </>
    );
  };

  return (
    <div>
      <Card elevation={2} sx={{ m: 1, p: 2, backgroundColor: '#31425f' }}>
        <Typography textAlign="center" variant="h5" color="white">
          Kitchen Portal
        </Typography>
      </Card>

      <Grid container direction="row" justifyContent="flex-start">
        <Grid item xs={1.5}>
          <Card sx={{ width: '10vw', m: 0, height: '90vh' }}>
            <Typography variant="h5" textAlign="left" sx={{ marginTop: '10%', m: 2 }}>
              Total:
            </Typography>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="body1" textAlign="left">
                    4 Tacos
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    3 Burgers
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    2 Fries
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    10 Pepsis
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Grid container direction="row" justifyContent="flex-start" columnGap={2}>
            <OrderCard></OrderCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
