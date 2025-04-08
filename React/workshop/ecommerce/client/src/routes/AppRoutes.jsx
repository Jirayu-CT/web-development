import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import History from "../pages/History"
import Checkout from "../pages/Checkout"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Layout from "../layouts/Layout"
import LayoutAdmin from "../layouts/LayoutAdmin"
import Dashboard from "../pages/admin/Dashboard"
import Category from "../pages/admin/Category"
import Product from "../pages/admin/Product"
import Manage from "../pages/admin/Manage"
import LayoutUser from "../layouts/LayoutUser"
import HomeUser from "../pages/user/HomeUser"
import ProtectRouteUser from "./ProtectRouteUser"
import ProtectRouteAdmin from "./ProtectRouteAdmin"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> }, //path เดียวกับ '/' จะใช้ index: true
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'history', element: <History /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={ <LayoutAdmin /> } /> ,
        children: [
            { index: true, element: <Dashboard /> }, //path เดียวกับ '/' จะใช้ index: true
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'manage', element: <Manage /> },
        ]
    },
    {
        path: '/user',
        // element: <LayoutUser />,
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> }
        ]
    }
])

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default AppRoutes