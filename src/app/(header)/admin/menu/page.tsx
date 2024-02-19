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
import React, { useState, useEffect, useRef } from 'react';
import { Folder, Delete, Add } from '@mui/icons-material';
import LabelAvatar from '@/app/components/labelAvatar';
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
  const DOTW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const TAGS = ['food', 'drink'];
  const [windowTitle, setWindowTitle] = React.useState('Edit Item');
  const [personName, setPersonName] = React.useState<string[]>([]);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [SelectedItem.options]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (item: any) => {
    setOpen(true);
    setWindowTitle('Edit Item');
    setSelectedItem(item);
  };

  const deleteItem = async () => {
    const url = '/api/dishes/' + SelectedItem._id;
    await axios.delete(url, SelectedItem).then((response) => {
      if (response.status == 200) {
        handleClose();
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    });
  };

  const handleNewOpen = () => {
    setSelectedItem(blankDish);
    setOpen(true);
    setWindowTitle('New Item');
  };
  const handleClose = () => setOpen(false);

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

  const blankOption = {
    _id: 'blankOption',
    friendlyName: '',
    extraPrice: 0,
    allowQuantity: true,
    dependencies: [],
  };
  const blankDish = {
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
  };

  const update = async () => {
    if (windowTitle == 'Edit Item') {
      const url = '/api/dishes/' + SelectedItem._id;
      console.log(SelectedItem);
      await axios.put(url, SelectedItem).then((response) => {
        if (response.status == 200) {
          handleClose();
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      });
    } else if (windowTitle == 'New Item') {
      let temp = Object.assign({}, SelectedItem);
      temp._id = temp.friendlyName.replace(/\s+/g, '-').toLowerCase();

      await axios.post('/api/dishes', temp).then((response) => {
        if (response.status === 200) {
          handleClose();
        } else {
        }
      });
    }
  };

  const newOption = () => {
    let temp = Object.assign([], SelectedItem.options);

    temp.push(blankOption);

    setSelectedItem({ ...SelectedItem, options: temp });

    console.log(SelectedItem);
  };

  const RenderCards = () => {
    if (isLoading == false) {
      return data.dishes.map((option: any) => (
        <>
          <Grid item md={4} lg={3}>
            <Card sx={{ minWidth: '50%', height: '100%' }}>
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

    for (const subOption of props.options) {
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

    return <>{specific}</>;
  };

  const handleSpecificOptionUpdate = (option_id: any, value: any, text: any) => {
    let theItem = Object.assign({}, SelectedItem);
    let index = theItem.options.findIndex((option: any) => option._id == option_id);

    for (const option of theItem.options) {
      if (index != -1) {
        if (value == 'friendlyName') {
          theItem.options[index] = {
            ...theItem.options[index],
            [value]: text,
            _id: text.replace(/\s+/g, '-').toLowerCase(),
          };
        } else if (value == 'extraPrice') {
          theItem.options[index] = {
            ...theItem.options[index],
            [value]: Number(text),
          };
        }
      }
    }

    console.log(theItem);
    setSelectedItem(theItem);
  };

  const handleSpecificOptionDelete = (option_id: any) => {
    const theItem = Object.assign([], SelectedItem);

    const option_index = Object.values(theItem.options).findIndex(
      (option: any) => option._id == option_id,
    );

    theItem.options.splice(option_index, 1);

    setSelectedItem({ ...SelectedItem, theItem });
  };

  /*
  Object.entries(blankDish.options).map(([key, value]) => {
    console.log(value);
    // Pretty straightforward - use key for the key and value for the value.
    // Just to clarify: unlike object destructuring, the parameter names don't matter here.
  });
  */

  return (
    <Box>
      <Grid container direction="row" sx={{ height: '80vh', overflowY: 'scroll' }} spacing={2}>
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
              width: '80%',
              height: '60%',
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
              justifyContent="space-around"
              sx={{ mt: '2%' }}
            >
              <Grid container item md={5} lg={6} spacing={-10}>
                <Grid container direction="row" justifyContent="center">
                  <Grid
                    container
                    item
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    md={8}
                    lg={5}
                  >
                    <Grid item>
                      <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ width: '12vw' }}
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
                        variant="outlined"
                        type="number"
                        sx={{ width: '12vw' }}
                        fullWidth
                        value={SelectedItem.basePrice}
                        onChange={(event) => {
                          setSelectedItem({
                            ...SelectedItem,
                            basePrice: Number(event.target.value),
                          });
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>

                    <Grid
                      container
                      item
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={SelectedItem.isOrderable}
                              onChange={(event) => {
                                setSelectedItem({
                                  ...SelectedItem,
                                  isOrderable: event.target.checked,
                                });
                              }}
                            ></Checkbox>
                          }
                          label="Orderable"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Selections */}
                  <Grid
                    container
                    item
                    md={4}
                    lg={5}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <FormControl sx={{ width: '20ch' }}>
                        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                        <Select
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

                    <Grid item>
                      <FormControl sx={{ width: '20ch' }}>
                        <InputLabel id="demo-multiple-chip-label">Days</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={SelectedItem.dotw}
                          onChange={handleChange}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(', ')}
                        >
                          {DOTW.map((day) => (
                            <MenuItem key={day} value={day}>
                              <Checkbox checked={SelectedItem.dotw.indexOf(day) > -1} />
                              <ListItemText primary={day} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* Options */}
              <Grid item md={6} lg={6}>
                <Container sx={{ mt: '5%', height: '25vh', overflowY: 'scroll', width: '100%' }}>
                  {SelectedItem.options.map((subOption: any) => (
                    <List key="_id">
                      <ListItem
                        ref={scrollRef}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleSpecificOptionDelete(subOption._id)}
                          >
                            <Delete />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>{subOption.friendlyName.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <Grid container spacing={1}>
                          <Grid item>
                            {' '}
                            <TextField
                              id="name"
                              label="Name"
                              variant="outlined"
                              sx={{ width: '25ch' }}
                              size="small"
                              value={subOption.friendlyName}
                              onChange={(event) => {
                                handleSpecificOptionUpdate(
                                  subOption._id,
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
                              sx={{ width: '8ch' }}
                              value={subOption.extraPrice}
                              onChange={(event) => {
                                handleSpecificOptionUpdate(
                                  subOption._id,
                                  'extraPrice',
                                  event.target.value,
                                );
                              }}
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  ))}
                </Container>
                <Grid container justifyContent={'center'} alignItems="center">
                  <Grid item xs={10}>
                    <Button fullWidth variant="outlined" color="primary" onClick={newOption}>
                      +
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: '5%' }}>
                  <Grid item>
                    <Button variant="outlined" color="warning" onClick={deleteItem}>
                      Delete
                    </Button>
                  </Grid>

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
              </Grid>
            </Grid>

            <CardContent></CardContent>
          </Card>
        </>
      ) : null}
    </Box>
  );
}
