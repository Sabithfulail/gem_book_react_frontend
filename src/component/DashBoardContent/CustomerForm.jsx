import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

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

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CustomerForm = () => {
  const baseURL = 'http://localhost:5000/api/customers';
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerEmail: '',
    customerContactNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [isExistingCustomer, setIsExistingCustomer] = useState(false); // Declaration of isExistingCustomer state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate fields as they change
    if (name === 'customerEmail') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Please enter a valid email address',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    } else if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'This field is required',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSaveUpdate = () => {
    // Validate fields before saving or updating
    for (const key in formData) {
      if (!formData[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: 'This field is required',
        }));
        return;
      }
    }

    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        customerEmail: 'Please enter a valid email address',
      }));
      return;
    }

    // Proceed with save/update logic
    // ...
  };

  // Rest of your code...

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        <h1>Customer Management Form</h1>

        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerId"
            label="Customer Id"
            variant="outlined"
            size="small"
            value={formData.customerId}
            onChange={handleChange}
            error={!!errors.customerId}
            helperText={errors.customerId}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerName"
            label="Customer Name"
            variant="outlined"
            size="small"
            value={formData.customerName}
            onChange={handleChange}
            error={!!errors.customerName}
            helperText={errors.customerName}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerAddress"
            label="Customer Address"
            variant="outlined"
            size="small"
            value={formData.customerAddress}
            onChange={handleChange}
            error={!!errors.customerAddress}
            helperText={errors.customerAddress}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerEmail"
            label="Customer Email"
            variant="outlined"
            size="small"
            value={formData.customerEmail}
            onChange={handleChange}
            error={!!errors.customerEmail}
            helperText={errors.customerEmail}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerContactNumber"
            label="Customer ContactNumber"
            variant="outlined"
            size="small"
            value={formData.customerContactNumber}
            onChange={handleChange}
            error={!!errors.customerContactNumber}
            helperText={errors.customerContactNumber}
          />
          <Button variant="contained" color="success" onClick={handleSaveUpdate}>
            {isExistingCustomer ? 'Update' : 'Save'}
          </Button>
        </Stack>
      </Container>

      {/* Rest of your code... */}
    </div>
  );
};