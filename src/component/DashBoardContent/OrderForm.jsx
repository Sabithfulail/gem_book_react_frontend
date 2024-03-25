import axios from 'axios';
import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Cart from './Cart';
import CardComponent from '../card/CardComponent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {CartProvider} from "react-use-cart";
import {useCart} from 'react-use-cart';

import img1 from '../../assets/imgs/yellow_sapphire.jpg';
import img2 from '../../assets/imgs/blue_sapphire.jpg';
import img4 from '../../assets/imgs/red_sapphire.jpg';

import img5 from '../../assets/imgs/green_sapphire.jpg';

export const OrderForm = () => {
  const baseURL = 'https://gem-node-backend.onrender.com/api/customers';
  const [rows, setRows] = useState([]);


  useEffect(() => {
    loadAllCustomers();
  
    
  }, []);

  function loadAllCustomers() {
    axios
      .get(baseURL + '/')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const [cusId, setCusId] = React.useState('');
  const [oId, setOId] = React.useState('');
  const [date, setDate] = React.useState('');
  const handleChange = (event) => {
    setCusId(event.target.value);
   
  };
  const handleOChange = (event) => {
    setOId(event.target.value);
   
  };

  


  const temCarddata = [

    {
      id:1,
      img:img1,
      name: 'yellow sapphire',
      price: 450,
      packsize: '2l'
    },
    {
      id:2,
      img:img5,
      name: 'Green sahppire',
      price: 350,
      packsize: '1.25l'
    },
    {
      id:3,
      img:img4,
      name: 'red sappire',
      price: 350,
      packsize: '2l'
    },
    {
      id:3,
      img:img2,
      name: 'blue sapphire',
      price: 350,
      packsize: ''
    },
    
  ];

 
  return (
    <div >
      
      <CartProvider>
        <Grid container sx={{ mt: 3}}>
        
            <Grid xs={7}>

            <Container >


              <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>
              
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Item"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                
              
              </Paper>
            </Container>

            <Container style={{'height':'550px','overflowX':'auto'} } sx={{ mt: 1}}>

            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent="space-between">
              {temCarddata.map((item, index) => (
                <CardComponent 
              
                  name={item.name} 
                  price={item.price} 
                  packsize={item.packsize} 
                  imageSrc={item.img} 
                  item={item}
                  key={index} 
                
                />
              ))}
            </Stack>
              


            </Container>
            </Grid>
            <Grid  xs={5} >
            <Container style={{'height':'420px' }}>

            
                <FormControl style={{'width':'200px'}}>
                  
                    <InputLabel size="small"  >Customer Id</InputLabel>
                    <Select
                  
                      value={cusId}
                      label="Customer Id"
                      onChange={handleChange}

                      size="small" 
                      
                    >
                      {rows.map((row) => (
                        <MenuItem value={row.customerId}>{row.customerId}</MenuItem>
                      ))}
                    </Select>
                
                    
              </FormControl>
              <TextField
                      sx={{ width: 250 }}
                      id="outlined-basic"
                      name="orderId"
                      label="Order Id"
                      variant="outlined"
                      size="small"
                      value={oId}
                      onChange={handleOChange}
                    />
                    {/* <DatePicker
                    label="Controlled picker"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    /> */}
                    
              <Cart orderId={oId} customerId={cusId}/>
            

            </Container>



            </Grid>
          
           
            
          </Grid>

     
    


     
    
          </CartProvider>
    </div>
  )
}
