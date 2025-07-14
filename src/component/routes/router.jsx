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
                loader: () => fetch(''),
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
                loader: () => fetch('https://rommate-server.vercel.app/get-roommate'),
            },

          
            {
				path: '/postDetails/:id',
				element:<PrivateRoute><PostDetails /></PrivateRoute> ,
				loader: ({params}) => fetch(`https://rommate-server.vercel.app/single-roommates/${params._id}`),
			},




        ]
    }
]);
export default router;

