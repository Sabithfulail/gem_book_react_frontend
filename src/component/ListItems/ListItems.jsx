import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';
import './ListItems.css'
export const mainListItems = (
  <React.Fragment>
      
    


    <NavLink to={'/dashboard/customerForm'} className="nav">
        <ListItemButton type='button'>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
      </ListItemButton>
      </NavLink>

      <NavLink to={'/dashboard/itemForm'} className="nav">
        <ListItemButton   type='button'>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
      </NavLink>

      <NavLink to={'/dashboard/orderForm'} className="nav">
        <ListItemButton type='button'>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      </NavLink>
  </React.Fragment>
);

