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
  const theme = useTheme();
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher, { refreshInterval: 1000 });
  const [SelectedItem, setSelectedItem]: any[] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = (item: any) => {
    setOpen(true);
    setWindowTitle('Edit Item');
    setSelectedItem(item);
  };

  const handleNewOpen = () => {
    setOpen(true);
    setWindowTitle('New Item');
    setSelectedItem(blankDish);
  };
  const handleClose = () => setOpen(false);

  const DOTW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const TAGS = ['food', 'drink'];
  const [windowTitle, setWindowTitle] = React.useState('Edit Item');
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

  const handleTagChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setSelectedItem({
      ...SelectedItem,
      tags: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const blankDish = {
    _id: '',
    friendlyName: '',
    basePrice: 1,
    tags: [],
    categories: ['breakfast'],
    dotw: [],
    isOrderable: true,
    isArchived: false,
    selectedOptions: {},
    options: [
      {
        _id: 'toppings',
        friendlyName: 'toppings',
        allowMultipleSelections: true,
        allowNoSelection: true,
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
      },
    ],
    dependencies: [],
    createdAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    updatedAt: {
      $date: '2023-09-18T24:05:50.607Z',
    },
    __v: 0,
  };

  const update = async () => {
    if (windowTitle == 'Edit Item') {
      const url = '/api/dishes/' + SelectedItem._id;

      await axios.put(url, SelectedItem).then((response) => {
        console.log(SelectedItem);
        console.log(response);
        if (response.status == 200) {
          handleClose();
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
    } else if (windowTitle == 'New Item') {
      const url = '/api/dishes/' + SelectedItem._id;

      await axios.post(url, SelectedItem).then((response) => {
        console.log(SelectedItem);
        console.log(response);
        if (response.status == 200) {
          handleClose();
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
    }
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

  const handleSpecificOptionUpdate = (option_id: any, type_id: any, value: any, text: any) => {
    let theItem = Object.assign([], SelectedItem);

    let type_index = theItem.options.findIndex((item: any) => item._id == type_id);

    if (type_index != -1) {
      for (const optionType of theItem.options) {
        let option_index = optionType.options.findIndex((option: any) => option._id == option_id);

        if (option_index != -1) {
          if (value == 'friendlyName') {
            theItem.options[type_index].options[option_index] = {
              ...theItem.options[type_index].options[option_index],
              [value]: text,
            };
          } else if (value == 'extraPrice') {
            theItem.options[type_index].options[option_index] = {
              ...theItem.options[type_index].options[option_index],
              [value]: Number(text),
            };
          }
        }
      }
    }

    setSelectedItem({ ...SelectedItem, theItem });
  };

  const handleSpecificOptionDelete = (option_id: any, type_id: any) => {
    let theItem = Object.assign([], SelectedItem);

    let type_index = theItem.options.findIndex((item: any) => item._id == type_id);

    if (type_index != -1) {
      for (const optionType of theItem.options) {
        let option_index = optionType.options.findIndex((option: any) => option._id == option_id);
        theItem.options[type_index].options.splice(option_index, 1);
      }
    }
    setSelectedItem({ ...SelectedItem, theItem });
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
        {!open ? (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'absolute', bottom: 20, right: 20 }}
            onClick={handleNewOpen}
          >
            <Add />
          </Fab>
        ) : null}
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
            <CardHeader
              style={{ backgroundColor: theme.palette.primary.main }}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold' }}
              title={windowTitle}
            ></CardHeader>

            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: '5%' }}
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
                  <FormControl sx={{ width: '25ch' }}>
                    <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={SelectedItem.tags}
                      onChange={handleTagChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {TAGS.map((day) => (
                        <MenuItem key={day} value={day}>
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid container item justifyContent="center" alignItems="center">
                  <FormControl sx={{ m: 1, width: '25ch' }}>
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
              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
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
              </Grid>
            </Grid>

            <CardContent>
              <Container sx={{ mt: '5%', maxHeight: '50vh', overflowY: 'scroll' }}>
                {SelectedItem.options.map((optionType: any) =>
                  optionType.options.map((subOption: any) => (
                    <List key={subOption._id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleSpecificOptionDelete(subOption._id, optionType._id)
                            }
                          >
                            <Delete />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>{subOption.friendlyName.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <Grid container spacing={2}>
                          <Grid item>
                            {' '}
                            <TextField
                              id="name"
                              label="Name"
                              variant="outlined"
                              size="small"
                              value={subOption.friendlyName}
                              onChange={(event) => {
                                handleSpecificOptionUpdate(
                                  subOption._id,
                                  optionType._id,
                                  'friendlyName',
                                  event.target.value,
                                );
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              id="price"
                              label="Price"
                              variant="outlined"
                              size="small"
                              type="number"
                              value={subOption.extraPrice}
                              onChange={(event) => {
                                handleSpecificOptionUpdate(
                                  subOption._id,
                                  optionType._id,
                                  'extraPrice',
                                  event.target.value,
                                );
                              }}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  )),
                )}
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
