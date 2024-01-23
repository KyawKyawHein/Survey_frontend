import React from 'react'
import { useStateContext } from '../../context/StateContext'
import { Navigate, Outlet } from 'react-router-dom';

const GuestLayout = () => {
  const {token} = useStateContext()
  if(token){
    return <Navigate to={'/dashboard'} />
  }
  return (
    <>
      <Outlet/>
    </>
  )
}

export default GuestLayout