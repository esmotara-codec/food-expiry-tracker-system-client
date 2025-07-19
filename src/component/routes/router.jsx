import { createBrowserRouter } from "react-router";
import App from "../../App";
import Home from "../Home/Home";
import ErrorElement from "../ErrorPage/ErrorElement";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "./PrivateRoutes";
import MyListing from "../pages/MyListing";
import AddFoodItems from "../pages/AddFoodItems";
import DetailsPage from "../pages/DetailsPage/DetailsPage";
import FridgePage from "../pages/Fridge/FridgePage";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                loader: () => fetch('https://food-expiry-server-lime.vercel.app/get-foodItems'),
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
				element:<DetailsPage /> ,
			
			},
             {
				path: 'fridge',
				element:<FridgePage /> ,
                loader:( )=> fetch('https://food-expiry-server-lime.vercel.app/get-foodItems'),
			
			},

        ]
    }
]);
export default router;

