import React, { useEffect } from 'react'
import { useStateContext } from '../../context/StateContext'
import Nav from '../Nav';
import {Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import axiosClient from '../../axios-client';
import Toast from '../Toast';

const DefaultLayout = () => {
  const {token,setUser,setToken} = useStateContext()
  const {useValidateToken} = useUser()
  // const { data: validateToken,isError } = useValidateToken();
  if(!token){
    return  <Navigate to={'/login'} />
  }

  useEffect(() => {
    axiosClient.get('/me').then(({data})=>setUser(data))
  }, [])

  return (
    <div className="min-h-full">
      <Nav/>
      <Outlet/>
      <Toast/>
    </div>
  )
}

export default DefaultLayout
