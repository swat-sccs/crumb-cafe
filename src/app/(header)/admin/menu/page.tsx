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
  FormGroup,
  Switch,
  OutlinedInput,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  ListItemAvatar,
  CircularProgress,
  Button,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import styles from './page.module.css';
import React, { useState, useEffect, useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Folder, Delete, Add } from '@mui/icons-material';
import LabelAvatar from '@/app/components/labelAvatar';
import SearchIcon from '@mui/icons-material/Search';

import useSWR from 'swr';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Home() {
  const theme = useTheme();
  const { data, error, isLoading } = useSWR('/api/dishes', fetcher, { refreshInterval: 1000 });
  const [SelectedItem, setSelectedItem]: any[] = React.useState({});
  const DOTW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const TAGS = ['food', 'drink'];
  const [windowTitle, setWindowTitle] = React.useState('Edit Item');
  const [personName, setPersonName] = React.useState<string[]>([]);
  const scrollRef = useRef<any>(null);

  const [SwitchChecked, setSwitchChecked] = useState(false);

  const [DeleteState, setDelete] = useState(false);
  const [DeleteSuccess, setDeleteSuccess] = React.useState(false);
  const handleDeleteSuccess = () => setDeleteSuccess(false);
  const [Success, setSuccess] = React.useState(false);
  const handleSuccess = () => setSuccess(false);
  const [Failure, setFailure] = React.useState(false);
  const handleFailure = () => setFailure(false);
  const [search, setSearch] = useState('');
  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

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
        setDeleteSuccess(true);
        setDelete(false);
        handleClose();
        setTimeout(handleDeleteSuccess, 3000);
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
  const handleDelete = () => setDelete(true);

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
  let numDay = moment().day();
  let day = DOTW[numDay];
  const blankDish = {
    _id: '',
    friendlyName: '',
    dotw: [day],
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
  const columns: GridColDef[] = [];
  for (const key of Object.keys(blankDish)) {
    columns.push({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 150,
      headerClassName: 'super-app-theme--header',
      editable: key == '_id' ? false : true,
    });
  }

  const update = async () => {
    if (windowTitle == 'Edit Item') {
      const url = '/api/dishes/' + SelectedItem._id;
      console.log(SelectedItem);
      await axios.put(url, SelectedItem).then((response) => {
        if (response.status == 200) {
          setSuccess(true);
          setTimeout(handleSuccess, 3000);
          handleClose();
        } else {
          setFailure(true);
          setTimeout(handleFailure, 3000);
        }
      });
    } else if (windowTitle == 'New Item') {
      let temp = Object.assign({}, SelectedItem);
      temp._id = temp.friendlyName.replace(/\s+/g, '-').toLowerCase();

      await axios.post('/api/dishes', temp).then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setTimeout(handleSuccess, 3000);
          handleClose();
        } else {
          setFailure(true);
          setTimeout(handleFailure, 3000);
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

  const subHeader = (option: any) => {
    const days = [];
    for (const dotw of option.dotw) {
      days.push(
        <>
          {dotw == 'Thursday' ? (
            <Chip size="small" sx={{ ml: '2%', mt: '5%' }} label={'TH'} />
          ) : (
            <Chip size="small" sx={{ ml: '2%', mt: '5%' }} label={dotw.charAt(0).toUpperCase()} />
          )}
        </>,
      );
    }
    return (
      <>
        <Typography variant="body1">$ {Number.parseFloat(option.basePrice).toFixed(2)}</Typography>

        {days}
      </>
    );
  };

  const SaveOnServerFunction = React.useCallback(async (updatedRow: any, originalRow: any) => {
    const url = '/api/dishes/' + updatedRow._id;
    await axios.put(url, updatedRow).then((response) => {
      if (response.status == 200) {
        setSuccess(true);
        setTimeout(handleSuccess, 3000);
        handleClose();
      } else {
        setFailure(true);
        setTimeout(handleFailure, 3000);
        return originalRow;
      }
    });
    return updatedRow;
  }, []);
  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setFailure(true);
    setTimeout(handleFailure, 3000);
  }, []);

  const RenderCards = () => {
    if (isLoading == false) {
      let filteredData = [];
      if (search) {
        filteredData = data.dishes.filter((data: any) =>
          data.friendlyName.toLowerCase().includes(search.toLowerCase().trim()),
        );
      } else {
        filteredData = data.dishes;
      }

      if (SwitchChecked) {
        function getRowId(row: any) {
          return row._id;
        }
        return (
          <>
            <Box
              style={{ height: '75vh', width: '100%', marginTop: '2%' }}
              sx={{
                '& .super-app-theme--header': {
                  backgroundColor: 'rgba(73, 201, 230, .4)',
                },
              }}
            >
              <DataGrid
                editMode="row"
                onProcessRowUpdateError={handleProcessRowUpdateError}
                rows={data.dishes}
                columns={columns}
                getRowId={getRowId}
                processRowUpdate={(updatedRow, originalRow) =>
                  SaveOnServerFunction(updatedRow, originalRow)
                }
                style={{
                  background: 'rgba(0,0,0,0.37)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(6.8px)',
                }}
                sx={{
                  boxShadow: 2,
                }}
              />
            </Box>
          </>
        );
      }

      return filteredData.map((option: any) => (
        <>
          <Grid item md={4} lg={3}>
            <Card
              sx={{ minWidth: '50%', height: '100%', boxShadow: 2 }}
              style={{
                background: 'rgba(0,0,0,0.37)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={() => handleOpen(option)}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={option.friendlyName}
                subheader={subHeader(option)}
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
                  {/*
                  <FormControlLabel
                    control={<Checkbox checked={option.isArchived}></Checkbox>}
                    label="Archived"
                  />
                   */}
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

  const AlertComponent = () => {
    if (Success) {
      return (
        <Alert
          sx={{ display: 'flex', width: '75%', zIndex: '10' }}
          severity="success"
          variant="outlined"
        >
          Success — Item Saved!
        </Alert>
      );
    }
    if (DeleteSuccess) {
      return (
        <Alert sx={{ display: 'flex', width: '75%' }} severity="success" variant="outlined">
          Success — Item Deleted!
        </Alert>
      );
    }
    if (Failure) {
      return (
        <Alert sx={{ display: 'flex', width: '75%' }} severity="error" variant="outlined">
          Error — Something went wrong!
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  const DeleteConfirmComponent = () => {
    return (
      <>
        {DeleteState ? (
          <>
            <Box
              onClick={() => setDelete(false)}
              sx={{
                width: '100%',
                height: '100vh',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '10',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            ></Box>
            <Card
              sx={{
                width: '40%',
                height: '40%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: '11',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CardHeader
                style={{ backgroundColor: theme.palette.error.light }}
                titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', textAlign: 'center' }}
                title={'DELETE ITEM?'}
              ></CardHeader>
              <Container>
                <Typography variant="h6" textAlign="center" sx={{ mt: '10%' }}>
                  Are you sure you want to delete <br></br> {SelectedItem.friendlyName} ?
                </Typography>
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: '10%' }}>
                  <Button variant="contained" color="error" onClick={deleteItem} size="large">
                    CONFIRM DELTE
                  </Button>
                </Grid>
              </Container>
            </Card>
          </>
        ) : null}
      </>
    );
  };

  return (
    <Box>
      <Box sx={{ position: 'absolute', top: '0', right: '0', mt: ' 6%', mr: '15%', zIndex: '10' }}>
        <AlertComponent></AlertComponent>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: '2%' }}
      >
        <Grid item xs={1}>
          {''}
        </Grid>
        <Grid item>
          <TextField
            sx={{ width: '20vw' }}
            label="Search"
            value={search}
            onChange={(event) => handleSearch(event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={SwitchChecked} onChange={() => setSwitchChecked(!SwitchChecked)} />
              }
              label={SwitchChecked ? 'List' : 'Grid'}
            />
          </FormGroup>
        </Grid>
      </Grid>

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
      {/*Confirm Delete of Item*/}
      <DeleteConfirmComponent></DeleteConfirmComponent>
      {open ? (
        <>
          <Box
            onClick={() => handleClose()}
            sx={{
              width: '100%',
              height: '100vh',
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
              style={{
                //backgroundColor: theme.palette.primary.main,
                backgroundImage:
                  'linear-gradient(127deg, rgba(73, 201, 230, .7), rgba(73, 201, 230, 0) 131.51%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(6.8px)',
              }}
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
                    <Button variant="outlined" color="warning" onClick={handleDelete}>
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
