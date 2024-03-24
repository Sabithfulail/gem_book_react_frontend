import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useCart} from 'react-use-cart'

const  CardComponent=(props) =>{

const {addItem}=useCart();

  return (
    <Card sx={{ width: 200 }}>
      <div>
      <CardMedia
        sx={{ height: 198}}
        image={ props.imageSrc }
        
      />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.packsize+"  Rs : "+props.price}
        </Typography>
      </CardContent>
      <CardActions>
      <Button sx={{
           
            '&:hover': {
              backgroundColor: 'black',
              color:'white'
            },
          }} size="small"
          onClick={()=>addItem(props.item)}
          >Add To Cart</Button>
       
      </CardActions>
    </Card>
  );
}
export default CardComponent;