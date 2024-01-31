'use client';
import {
  Grid,
  Avatar,
  Container,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Checkbox,
  ListItemText,
  ListItemIcon,
  FormControlLabel,
  List,
  ListItem,
  Divider,
  InputAdornment,
  Box,
  ListItemAvatar,
  CircularProgress,
  Button,
} from '@mui/material';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import { Folder, Delete } from '@mui/icons-material';

import LabelAvatar from '../../components/labelAvatar';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  gridClasses,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridEventListener,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import useSWR from 'swr';
import axios from 'axios';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { grey, red } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher, { refreshInterval: 2000 });
  const [SelectedItem, setSelectedItem]: any[] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = (item: any) => {
    setOpen(true);
    setSelectedItem(item);
  };
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  /*
  {
    "_id": "pancakes",
    "friendlyName": "Pancakes",
    "basePrice": 1,
    "tags": [
        "food"
    ],
    "categories": [
        "breakfast"
    ],
    "isOrderable": true,
    "isArchived": false,
    "options": [
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
        }
    ],
    "dependencies": [],
    "__v": 0
}

  */

  const update = async () => {
    const url = '/api/dishes/' + SelectedItem._id;
    console.log(SelectedItem);

    await axios.put(url, SelectedItem).then((response) => {
      console.log(response);
      if (response.status == 200) {
        handleClose();
      } else {
      }
    });
  };

  const RenderCards = () => {
    if (isLoading == false) {
      return data.dishes.map((option: any) => (
        <>
          <Grid item xs={3}>
            <Card sx={{ minWidth: '50%', minHeight: '20%' }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={() => handleOpen(option)}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={option.friendlyName}
                subheader={'$' + Number.parseFloat(option.basePrice).toFixed(2)}
              />
              <Divider variant="middle" />
              <CardContent>
                <List key={option._id}>
                  <OptionsComponent options={option.options} sx={{ ml: '5%' }} />
                </List>

                <Divider />
                <Typography variant="body1" color="text.secondary" sx={{ mt: '5%' }}>
                  <FormControlLabel
                    control={<Checkbox checked={option.isOrderable}></Checkbox>}
                    label="Orderable"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={option.isArchived}></Checkbox>}
                    label="Archived"
                  />
                </Typography>

                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      ));
    } else {
      return (
        <Container sx={{ ml: '40vw', width: '100%' }}>
          <CircularProgress></CircularProgress>
        </Container>
      );
    }
  };

  const OptionsComponent = (props: any) => {
    const options = [];
    const specific = [];

    for (const optionType of props.options) {
      for (const subOption of optionType.options) {
        specific.push(
          <>
            <ListItem key={subOption._id}>
              <ListItemIcon>
                <Avatar>{subOption.friendlyName.charAt(0)}</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={subOption.friendlyName}
                secondary={'$' + Number.parseFloat(subOption.extraPrice).toFixed(2)}
              />
            </ListItem>
          </>,
        );
      }
    }

    return <>{specific}</>;
  };

  const handleOptionsUpdate = (text: any, id: any) => {
    console.log(text, id);
    for (const optionType in SelectedItem.options) {
      for (const subOption in SelectedItem.options[optionType]) {
      }
    }
  };

  const EditOptionsComponent = (props: any) => {
    let theOptions = Object.assign([], props.options);
    const specific = [];

    for (const optionType of theOptions) {
      for (const subOption of optionType.options) {
        specific.push(
          <>
            <List key={subOption._id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>{subOption.friendlyName.charAt(0)}</Avatar>
                </ListItemAvatar>

                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={subOption.friendlyName}
                  onChange={(event) => {
                    handleOptionsUpdate(event.target.value, subOption._id);
                    //console.log(event);

                    subOption.friendlyName = event.target.value;
                    //console.log(subOption);
                    //setSelectedItem({ ...SelectedItem, friendlyName: event.target.value });
                  }}
                />
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={subOption.extraPrice}
                />
              </ListItem>
              <Divider variant="fullWidth"></Divider>
            </List>
          </>,
        );
      }
    }

    return <>{specific}</>;
  };

  return (
    <Container className={styles.topBar} sx={{ backgroundColor: '', width: '100vw' }}>
      <LabelAvatar title="Menu" />

      <Grid
        container
        direction="row"
        sx={{ height: '85vh', mt: '2%', overflowY: 'scroll' }}
        spacing={2}
      >
        <RenderCards></RenderCards>
      </Grid>

      {open ? (
        <>
          <Box
            onClick={() => handleClose()}
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: '0',

              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          ></Box>
          <Card
            sx={{
              width: '50%',
              height: '75%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardHeader title="Edit Item"></CardHeader>

            <Divider variant="middle" />
            <CardContent>
              <Grid
                container
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    variant="filled"
                    value={SelectedItem.friendlyName}
                    onChange={(event) => {
                      setSelectedItem({ ...SelectedItem, friendlyName: event.target.value });
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="price"
                    label="Price"
                    type="number"
                    variant="filled"
                    value={SelectedItem.basePrice.toString()}
                    onChange={(event) => {
                      setSelectedItem({ ...SelectedItem, basePrice: event.target.value });
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

              <Container sx={{ mt: '5%', maxHeight: '50vh', overflowY: 'scroll' }}>
                <Typography variant="h5">Options</Typography>
              </Container>

              <Typography variant="body1" color="text.secondary" sx={{ mt: '5%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={SelectedItem.isOrderable}
                      onChange={(event) => {
                        setSelectedItem({ ...SelectedItem, isOrderable: event.target.checked });
                      }}
                    ></Checkbox>
                  }
                  label="Orderable"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={SelectedItem.isArchived}
                      onChange={(event) => {
                        setSelectedItem({ ...SelectedItem, isArchived: event.target.checked });
                      }}
                    ></Checkbox>
                  }
                  label="Archived"
                />
              </Typography>
              <EditOptionsComponent options={SelectedItem.options}></EditOptionsComponent>

              <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: '5%' }}>
                <Grid item>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>

                <Grid item>
                  <Button variant="contained" onClick={update}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      ) : null}
    </Container>
  );
}
