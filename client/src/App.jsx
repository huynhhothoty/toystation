import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Toy from './pages/Toy';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AppLayout from './ui/AppLayout';
import ToyDetail from './pages/ToyDetail';
import { ConfigProvider, theme } from 'antd';
import { useDarkMode } from './context/DarkModeContext';

function App() {
    const { isDarkMode } = useDarkMode();
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/product' element={<Toy />} />
                        <Route path='/product/:toyId' element={<ToyDetail />} />
                        <Route path='/order' element={<Order />} />
                        <Route path='/cart' element={<Cart />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
