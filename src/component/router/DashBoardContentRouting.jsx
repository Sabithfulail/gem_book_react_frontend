import React from 'react'
import { Routes, Route } from "react-router-dom"

import { ItemForm } from '../DashBoardContent/ItemForm'
import { CustomerForm } from '../DashBoardContent/CustomerForm'
import { OrderForm } from '../DashBoardContent/OrderForm'

export const DashBoardContentRouting = () => {
  return (
    <div>

        <Routes>
            <Route path="/" element={<CustomerForm/>}/>  
            <Route path="itemForm" element={<ItemForm/>}/>
            <Route path="customerForm" element={<CustomerForm/>}/>
            <Route path="orderForm" element={<OrderForm/>}/>
       </Routes>

    </div>
  )
}
