"use client";
import Image from 'next/image';
import { Inter } from "next/font/google";
import styles from '../page.module.css';
// import { Box, Container } from '@mui/system';
import { AppBar, Card } from '@mui/material';
import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { AcceptsDiscriminator } from 'mongoose';



const inter = Inter({ subsets: ['latin'] });

const stuffs : { name: string, id: string, 
  status: string, available: boolean, avatar?: string}[] = [
  {  name: "Alice Abdul",
     id: "19260817",
     status: "admin",
     available: false},
  {  name: "Bob Bui",
     id: "19260909",
     status: "Stuff",
     available: true},
  {  name: "Carl Choi",
     id: "11451419",
     status: "Stuff",
     available: true},
  {  name: "Dylan Davidson",
     id: "12345678",
     status: "Stuff",
     available: false},
  {  name: "Ex El",
     id: "19191145",
     status: "Stuff",
     available: true},
  {  name: "Rick Addison",
     id: "11489319",
     status: "Stuff",
     available: true}
]

const filterData = (query:string) => {
  if (!query) {
    return stuffs
  } else {
    return stuffs.filter((d) => ( 
      d.id.toLowerCase().includes(query) || 
      d.name.toLowerCase().includes(query) || 
      d.status.toLowerCase().includes(query) ))
  }
}
const SearchBar = ({setSearchQuery} : {setSearchQuery : React.Dispatch<React.SetStateAction<string>>}) => (
  <form>
    <TextField
      fullWidth
      margin='normal'
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery((e.target as HTMLInputElement).value);
      }}
      label="Search by name or ID here"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    {/* <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton> */}
  </form>
);

function StuffCard({name, id, status, available, avatar} : 
  {name : string, id : string, status: string, available: boolean, avatar?:string}) {

  return (  
  <Card variant="outlined" sx={{ maxWidth: 250 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <CardMedia
        component="img"
        image= {typeof avatar !== 'undefined'? avatar : ""}
      />
      <Typography variant="body2">
        Status: {status}
        <br/>
        Availability: {available? "✅" : "❌"}
        <br/>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Change Work Days</Button>
    </CardActions>
    <CardActions>
      <Button size="small">Change Status</Button>
    </CardActions>
    <CardActions>
      <Button size="small">Remote Access</Button>
    </CardActions>
    <CardActions>
      <Button size="small">Update Attendance</Button>
    </CardActions>
  </Card>
  )
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const dataFiltered = filterData(searchQuery)
  return (
    <Container>
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
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Manage Menu
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data Analytics
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Manage Access
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <TextField fullWidth label="Search by name or ID here" 
        id="searchField" margin='normal'/> */}
      <SearchBar setSearchQuery={setSearchQuery}/>
      <Grid container spacing={2}>
        {dataFiltered.map((stuff) => <Grid xs={3}>
          <StuffCard name = {stuff.name} id = {stuff.id} 
          status= {stuff.status} available= {stuff.available} avatar={stuff.avatar}></StuffCard>
        </Grid>)}
      </Grid>

    </Container>
  );
}
