import React from 'react'
import { useStateContext } from '../../context/StateContext'
import Nav from '../Nav';
import {Navigate, Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const {token} = useStateContext()
  if(!token){
    return  <Navigate to={'/login'} />
  }

  return (
    <div className="min-h-full">
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default DefaultLayout
