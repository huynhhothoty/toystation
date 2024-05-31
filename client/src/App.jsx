import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Toy from './pages/Toy';
import OrderPage from './pages/OrderPage';
import Cart from './pages/Cart';
import AppLayout from './ui/AppLayout';
import ToyDetail from './pages/ToyDetail';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { useDarkMode } from './context/DarkModeContext';
import PageNotFound from './pages/PageNotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Account from './pages/Account';
import ProtectRoute from './ui/ProtectRoute';
import Order from './features/order/Order';
import AppLayoutAdmin from './ui/AppLayoutAdmin';
import DashBoard from './pages/admin/DashBoard';
import OrderManage from './pages/admin/OrderManage';
import ProductManage from './pages/admin/ProductManage';
import AccountManage from './pages/admin/AccountManage';
import OrderDetail from './features/admin/order/OrderDetail';
import ProtectAdminRoute from './ui/ProtectAdminRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    const { isDarkMode } = useDarkMode();
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <AntdApp>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/forget' element={<ForgetPassword />} />
                            <Route element={<AppLayout />}>
                                <Route path='/' element={<Home />} />
                                <Route path='/toys' element={<Toy />} />
                                <Route path='/toys/:toyId' element={<ToyDetail />} />
                                <Route element={<ProtectRoute />}>
                                    <Route path='/account' element={<Account />} />
                                    <Route path='/cart' element={<Cart />} />
                                    <Route path='/order' element={<OrderPage />} />
                                    <Route path='/ordertracking' element={<Order />} />
                                </Route>
                            </Route>
                            <Route
                                path='/admin'
                                element={
                                    <ProtectAdminRoute>
                                        <AppLayoutAdmin />
                                    </ProtectAdminRoute>
                                }
                            >
                                <Route index element={<Navigate replace to='dashboard' />} />
                                <Route path='dashboard' element={<DashBoard />} />
                                <Route path='order' element={<OrderManage />} />
                                <Route path='order/:orderId' element={<OrderDetail />} />
                                <Route path='product' element={<ProductManage />} />
                                <Route path='account' element={<AccountManage />} />
                            </Route>
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </AntdApp>
        </ConfigProvider>
    );
}

export default App;
