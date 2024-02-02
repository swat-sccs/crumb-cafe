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
  Fab,
  FormControl,
  OutlinedInput,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  ListItemAvatar,
  CircularProgress,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import { Folder, Delete, Add } from '@mui/icons-material';

import LabelAvatar from '../../components/labelAvatar';

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

  const DOTW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setSelectedItem({
      ...SelectedItem,
      dotw: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const update = async () => {
    const url = '/api/dishes/' + SelectedItem._id;
    console.log(SelectedItem);

    await axios.put(url, SelectedItem).then((response) => {
      console.log(response);
      if (response.status == 200) {
        handleClose();
        console.log(response.data);
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
              <CardContent sx={{ mt: '-5%' }}>
                <List key={option._id}>
                  <OptionsComponent options={option.options} sx={{ ml: '2%' }} />
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
                    //handleOptionsUpdate(event.target.value, subOption._id);
                    //console.log(event);

                    console.log(
                      SelectedItem.options.map((options: any) => ({
                        ...options,
                        options: options.options.map((thing: any) => {
                          if (thing._id == subOption._id) {
                            return {
                              ...thing,
                              friendlyName: event.target.value,
                            };
                          }
                        }),
                      })),
                    );
                  }}

                  /*

                          ...thing,
                          friendlyName: event.target.value,

                  */
                />
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={subOption.extraPrice.toFixed(2)}
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
        <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Add />
        </Fab>
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
              minHeight: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardHeader title="Edit Item"></CardHeader>
            <Divider variant="middle" />

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: '2%' }}
            >
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                xs={5}
              >
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    sx={{ width: '22ch' }}
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
                    variant="outlined"
                    fullWidth
                    sx={{ width: '22ch' }}
                    value={SelectedItem.basePrice}
                    onChange={(event) => {
                      setSelectedItem({ ...SelectedItem, basePrice: event.target.value });
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={5} justifyContent="center" alignItems="center">
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid container item justifyContent="center" alignItems="center">
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Days</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={SelectedItem.dotw}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {DOTW.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <CardContent>
              <Container sx={{ mt: '5%', maxHeight: '50vh', overflowY: 'scroll' }}>
                <EditOptionsComponent options={SelectedItem.options}></EditOptionsComponent>
              </Container>

              <Typography variant="body1" color="text.secondary" sx={{ mt: '5%' }}></Typography>

              <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: '5%' }}>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
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
