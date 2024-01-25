import React from 'react';
import { useStateContext } from '../context/StateContext';

const Toast = () => {
    const {toast} = useStateContext();
    return (
        <>
        {
            toast.show &&
                <div className="scale-up-center px-3 py-2 rounded text-white bg-emerald-500 fixed right-5 bottom-10">
                    {toast.message}
                </div>
        }
        </>
    )
}

export default Toast;