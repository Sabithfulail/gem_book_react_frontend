import axios from 'axios';
import React, { useRef,useState , useEffect} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
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

export const ItemForm = () => {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setSelectedFileName(file.name);
    }
  };

  const baseURL = 'https://gem-node-backend.onrender.com/api/items';
  const [formData, setFormData] = useState({
    itemId: '',
    itemName: '',
    itemUnitPrice : '',
    itemPackSize: '',
    itemQuantityOnHand: '',
  });
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSaveUpdate = () => {
    if(isExistingItem){
 
       axios
       .put(`${baseURL}/updateItem/${formData.itemId}`, formData)
       .then((response) => {
         Swal.fire({
           position: "center",
           icon: "success",
           title: response.data.success,
           showConfirmButton: false,
           timer: 1500,
         });
        
         setFormData({
          itemId: '',
          itemName: '',
          itemUnitPrice : '',
          itemPackSize: '',
          itemQuantityOnHand: '',
         });
         setIsExistingItem(false);
         loadAllItems(); 
       })
       .catch((error) => {
         console.error("Error updating customer:", error);
         alert("Error updating customer");
       });
 
    }else{
     axios
     .post(baseURL + '/saveItem', formData)
     .then((response) => {
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: response.data,
         showConfirmButton: false,
         timer: 1500,
       });
 
       loadAllItems();
       setFormData({
        itemId: '',
        itemName: '',
        itemUnitPrice : '',
        itemPackSize: '',
        itemQuantityOnHand: '',
       });
     })
     .catch((error) => {
       alert('Error saving data:', error);
     });
    }
   };
  const checkItemExist= (itemId) => {
    axios 
      .get(`${baseURL}/getItemById/${itemId}`)
      .then((response) => {
        
        setIsExistingItem(response.data != null);
        console.log(response.data != null);
        console.log(response.data);
      })
      .catch((error) => {
        setIsExistingItem(false);
      });
  };

  const [isExistingItem, setIsExistingItem] = useState(false);

  useEffect(() => {
    if (formData.itemId) {
      checkItemExist(formData.itemId);
    }
  }, [formData.itemId]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    loadAllItems();
  }, []);

  function loadAllItems() {
    axios
      .get(baseURL + '/')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  } 
  const setFieldsForUpdate = (itemId) => {
    const selectedRow = rows.find((row) => row.itemId === itemId);
    setFormData({
      itemId: selectedRow.itemId,
      itemName: selectedRow.itemName,
      itemPackSize: selectedRow.itemPackSize,
      itemUnitPrice: selectedRow.itemUnitPrice,
      itemQuantityOnHand: selectedRow.itemQuantityOnHand,
    });
  };

  const handleDelete = (itemId) => {
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
        console.log(itemId);
        axios
          .delete(`${baseURL}/deleteItem/${itemId}`)
          .then((response) => {
           // loadAllCustomers();
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
          });
      }
    });
  };
  return (
    <div>
      <Container sx={{ mt: 3 }}>
        <h1>Item Management</h1>
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          
        <TextField sx={{ width: 250 }} 
          id="outlined-basic" 
          name='itemId'
          label="Item Id" 
          variant="outlined"  
          size="small" 
          value={formData.itemId}
          onChange={handleChange}
          /> 
          <TextField 
          sx={{ width: 250 }} 
          id="outlined-basic" 
          name='itemName'
          label="Item Name" 
          variant="outlined"  
          size="small"
          value={formData.itemName}
          onChange={handleChange}
          />
          <TextField 
          sx={{ width: 250 }} 
          id="outlined-basic" 
          name='itemPackSize'
          label="Item Pack Size" 
          variant="outlined"  
          size="small"
          value={formData.itemPackSize}
          onChange={handleChange}
          />
          <TextField 
          sx={{ width: 250 }} 
          id="outlined-basic" 
          name='itemUnitPrice'
          label="Item Unit Price" 
          variant="outlined"  
          size="small"
          value={formData.itemUnitPrice}
          onChange={handleChange}
          />
          <TextField 
          sx={{ width: 250 }} 
          id="outlined-basic" 
          name='itemQuantityOnHand'
          label="Item Quantity of Hand" 
          variant="outlined"  
          size="small"
          value={formData.itemQuantityOnHand}
          onChange={handleChange}
          />

          <TextField
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            id="file-input"
          />
          <label htmlFor="file-input" >
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              onClick={handleButtonClick}
            >
              Upload Image
            </Button>
          </label>
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: 8 }}>
            Selected file: {selectedFileName}
          </Typography>
          <Button variant="contained" color="success" onClick={handleSaveUpdate}>
                {isExistingItem ? 'Update' : 'Save'}
          </Button>
       
        </Stack>
      </Container>

      <Container sx={{ mt: 5 }}>
        
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >Item Id</StyledTableCell>
                <StyledTableCell align="right">Item Name</StyledTableCell>
                <StyledTableCell align="right">Item Pack Size</StyledTableCell>
                <StyledTableCell align="right">Item Unit Price</StyledTableCell>
                <StyledTableCell align="right">Item Quantity of Hand</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.itemId}>
                  <StyledTableCell component="th" scope="row">
                    {row.itemId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.itemName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.itemPackSize}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.itemUnitPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.itemQuantityOnHand}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => setFieldsForUpdate(row.itemId)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDelete(row.itemId)}
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
