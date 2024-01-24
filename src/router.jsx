import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import Surveys from "./views/Surveys";
import GuestLayout from "./components/layout/GuestLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import SurveyView from "./views/SurveyView";

const router = createBrowserRouter([
    {
        path : "/",
        element : <DefaultLayout/>,
        children : [
            {
                path : "/dashboard",
                element :  <Navigate to={'/'} />
            },
            {
                path : "/",
                element : <Dashboard/>
            },
            {
                path : "/surveys",
                element : <Surveys/>
            },
            {
                path : "/surveys/:id",
                element: <SurveyView/>
            },
            {
                path : "/survey/create",
                element : <SurveyView/>
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
         
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    }
    
]);



export default router;
