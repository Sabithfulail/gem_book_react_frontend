import axios from 'axios';
import React ,{useState}from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useCart} from 'react-use-cart';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import { Container } from '@mui/material'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
const Swal = require('sweetalert2');
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function Cart(props) {
  const baseURL = 'http://localhost:5000/api/orders';
  const [balance, setBalance] = useState(0);
  const [cash, setCash] = useState('');
  const handleCashChange = (event) => {
    const cashAmount = parseFloat(event.target.value);
    setCash(cashAmount);
    setBalance(cashAmount - cartTotal);
  };

  const placeorder = () => {
   
    const formData={
      OrderId: props.orderId,
      CustomerId:props.customerId,
      Total:cartTotal
    }
    console.log(formData)
    axios
    .post(baseURL + '/saveOrder', formData)
    .then((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.data,
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      alert('Error saving data:', error);
    });
   
   }
 
  const { isEmpty,
          totalUniqueItems,
          items,
          totalItems,
          cartTotal,
          updateItemQuantity,
          removeItem,
          emptyCart
          } =useCart();

  if(isEmpty){return <h1>Your Cart is Empty</h1>}


  return (
    <>
    <h5>Cart ({totalUniqueItems}) total items : ({totalItems})</h5>
      <TableContainer component={Paper}>
          <Table  aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">name</StyledTableCell>
                <StyledTableCell align="right">Size</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Qty</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item,index) => (
                <StyledTableRow >
          
                  <StyledTableCell align="left">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.packsize}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.quantity}
                  </StyledTableCell>
                  <StyledTableCell  style={{'display':'flex','flex-direction': 'row','flex-wrap': 'nowrap'}}>
                    
                      
                    <Button
                    onClick={()=>updateItemQuantity(item.id,item.quantity-1)}
                    >-</Button>
                    <Button
                    onClick={()=>updateItemQuantity(item.id,item.quantity+1)}

                    >+</Button>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={()=>removeItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
      <Container style={{ 'height':'193px'}}>

        <Stack direction="column" spacing={2}>
          <h5>Sub-Total :{cartTotal}</h5>
          <TextField  
          label="Cash" 
          variant="outlined"  
          size="small" 
          type='number'value={cash}
          onChange={handleCashChange}/>
          <h5>Balance : {balance}</h5>
          <Button variant="contained" endIcon={<SendIcon />} onClick={placeorder}>Place Order</Button>
        </Stack>
      </Container>
    </>
  
  );
}