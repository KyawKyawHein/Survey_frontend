import React from 'react'
import { useStateContext } from '../context/StateContext'
import { Navigate, Outlet } from 'react-router-dom';

const PageComponent = ({title,children,button=""}) => {
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                    {button}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
        </>
    )
}

export default PageComponent
