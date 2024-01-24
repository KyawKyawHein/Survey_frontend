import React, { useEffect } from 'react'
import PageComponent from '../components/PageComponent'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/StateContext'

const Dashboard = () => {
    const {setUser,user} = useStateContext()
    return (
        <>
           <PageComponent title="Dashboard">
                <h1>hello</h1>{user&&user.name}
           </PageComponent>
        </>
    )
}

export default Dashboard