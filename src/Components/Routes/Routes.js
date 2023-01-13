import AddInformation from "../AddInformation/AddInformation.js";
import Home from "../Home/Home.js";
import Main from "../Layout/Main";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <h1>404 not Found </h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/AddInfo',
                element: <AddInformation></AddInformation>
            }
        ]
}

])

export default router;