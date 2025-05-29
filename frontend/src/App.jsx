
import Login from './login'
 import '../src/App.css'
import Register from './Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import { useEffect, useState } from 'react';
import Cart from './pages/Cart';


// In your return:


function App() {
  
 const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem('cartItems');

  // console.log("savedCart",JSON.parse(savedCart))
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <>
    
    <Router>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <Header cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetails cartItems={cartItems} setCartItems = {setCartItems} /></PrivateRoute>} />
        <Route path="/search"  element={<PrivateRoute><Home /></PrivateRoute> }/>
        <Route path="/cart"  element={<PrivateRoute><Cart cartItems={cartItems} setCartItems = {setCartItems}/></PrivateRoute> }/>
      </Routes>
    </Router>
    
     </>
  );
}

export default App;

