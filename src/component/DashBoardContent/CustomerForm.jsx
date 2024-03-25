import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CustomerForm = () => {
  const baseURL = 'https://gem-node-backend.onrender.com/api/customers';
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerAddress: '',
    customerEmail: '',
    customerContactNumber: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveUpdate = () => {
    if (isExistingCustomer) {

      axios
        .put(`${baseURL}/updateCustomer/${formData.customerId}`, formData)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.success,
            showConfirmButton: false,
            timer: 1500,
          });

          setFormData({
            customerId: "",
            customerName: "",
            customerAddress: "",
            customerEmail: "",
            customerContactNumber: "",
          });
          setIsExistingCustomer(false);
          loadAllCustomers();
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
          alert("Error updating customer");
        });

    } else {
      axios
        .post(baseURL + '/saveCustomer', formData)
        .then((response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 1500,
          });

          loadAllCustomers();
          setFormData({
            customerId: '',
            customerName: '',
            customerAddress: '',
            customerEmail: '',
            customerContactNumber: '',
          });
        })
        .catch((error) => {
          alert('Error saving data:', error);
        });
    }
  };

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

  const setFieldsForUpdate = (customerId) => {
    const selectedRow = rows.find((row) => row.customerId === customerId);
    setFormData({
      customerId: selectedRow.customerId,
      customerName: selectedRow.customerName,
      customerAddress: selectedRow.customerAddress,
      customerEmail: selectedRow.customerEmail,
      customerContactNumber: selectedRow.customerContactNumber,
    });
  };

  const handleDelete = (customerId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(customerId);
        axios
          .delete(`${baseURL}/deleteCustomer/${customerId}`)
          .then((response) => {
            loadAllCustomers();
          })
          .catch((error) => {
            console.error('Error deleting customer:', error);
          });
      }
    });
  };


  const checkCustomerExistence = (customerId) => {
    axios
      .get(`${baseURL}/getCustomerById/${customerId}`)
      .then((response) => {

        setIsExistingCustomer(response.data != null);
        console.log(response.data != null);
        console.log(response.data);
      })
      .catch((error) => {
        setIsExistingCustomer(false);
      });
  };

  const [isExistingCustomer, setIsExistingCustomer] = useState(false);

  useEffect(() => {
    if (formData.customerId) {
      checkCustomerExistence(formData.customerId);
    }
  }, [formData.customerId]);

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        <h1>Customer Management Form</h1>

        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerId"
            label="User Id"
            variant="outlined"
            size="small"
            value={formData.customerId}
            onChange={handleChange}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerName"
            label="User Name"
            variant="outlined"
            size="small"
            value={formData.customerName}
            onChange={handleChange}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerAddress"
            label="User Address"
            variant="outlined"
            size="small"
            value={formData.customerAddress}
            onChange={handleChange}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerEmail"
            label="User Email"
            variant="outlined"
            size="small"
            value={formData.customerEmail}
            onChange={handleChange}
          />
          <TextField
            sx={{ width: 250 }}
            id="outlined-basic"
            name="customerContactNumber"
            label="User Contact Number"
            variant="outlined"
            size="small"
            value={formData.customerContactNumber}
            onChange={handleChange}
          />
          <Button variant="contained" color="success" onClick={handleSaveUpdate}>
            {isExistingCustomer ? 'Update' : 'Save'}
          </Button>
          {/* <ButtonGroup variant="contained" aria-label="outlined  button group">
            <Button color="success" onClick={handleSave}>
                {isExistingCustomer ? 'Update' : 'Save'}</Button>
           <Button color="secondary">Update</Button>
          </ButtonGroup> */}
        </Stack>
      </Container>

      <Container sx={{ mt: 5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User Id</StyledTableCell>
                <StyledTableCell align="right">User Name</StyledTableCell>
                <StyledTableCell align="right">User Address</StyledTableCell>
                <StyledTableCell align="right">User Email</StyledTableCell>
                <StyledTableCell align="right">
                User ContactNumber
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.customerId}>
                  <StyledTableCell component="th" scope="row">
                    {row.customerId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.customerName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.customerAddress}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.customerEmail}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.customerContactNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => setFieldsForUpdate(row.customerId)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(row.customerId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
