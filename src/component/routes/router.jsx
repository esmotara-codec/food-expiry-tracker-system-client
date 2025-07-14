import { createBrowserRouter } from "react-router";
import App from "../../App";
import Home from "../Home/Home";
import ErrorElement from "../ErrorPage/ErrorElement";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

import PrivateRoute from "./PrivateRoutes";
import MyListing from "../pages/MyListing";
import PostDetails from "../pages/PostDetailsPage/PostDetails";
import AddFoodItems from "../pages/AddFoodItems";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:5000/get-foodItems'),
                element: <Home />
            },
            {
                path: "login",
                element: <Login />

            },
            {
                path: "sign-up",
                element: <SignUp />

            },
            {
                path: "add-food-items",
                element: <PrivateRoute> <AddFoodItems /></PrivateRoute>
            },
            {
                path: "my-listing",
                element: <PrivateRoute> <MyListing /></PrivateRoute>,
              
            },

          
            {
				path: '/foodDetails/:id',
				element:<PrivateRoute><PostDetails /></PrivateRoute> ,
				loader: ({params}) => fetch(`http://localhost:5000/single-foodItems/${params._id}`),
			},




        ]
    }
]);
export default router;

