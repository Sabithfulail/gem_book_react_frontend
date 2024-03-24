import React from 'react'
import { Routes, Route } from "react-router-dom"
import SignIn from '../../pages/signin/SignIn'
import SignUp from '../../pages/signup/SignUp'
import DashBoard from '../DashBoard/DashBoard'

export const RouteHandler = () => {
  return (
    <div>
        
        <Routes>
            {/* <Route path="/" element={<DashBoard/>}/> */}
            {/* <Route path="/" element={<SignIn/>}/> */}
            {/* <Route path="signin" element={<SignIn/>}/> */}
            <Route path="dashboard/*" element={<DashBoard/>}/>
            <Route path="/" element={<SignUp/>}/>
            <Route path="signup" element={<SignUp/>}/>
       </Routes>

    </div>
  )
}
