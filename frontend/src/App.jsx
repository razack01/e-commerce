
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
import ViewDetails from './pages/ViewDetails';


// In your return:


function App() {
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
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ViewDetails/></PrivateRoute>} />
        <Route path="/search"  element={<PrivateRoute><Home /></PrivateRoute> }/>


      </Routes>
    </Router>
    
     </>
  );
}

export default App;

