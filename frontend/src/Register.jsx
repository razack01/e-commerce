import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const onRegister = async (e) => {
    console.log("triggered");
    e.preventDefault();
  
    if (email && !emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/register',
        { name, email, password }
      );
  
      console.log('Response:', response.data);
       toast.success('Registeration successful!', );
  
      // Navigate to login page after successful registration
      // For example, using React Router:
      navigate('/');
  
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
      setErrorMsg(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };
  
    
  

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow" style={{ width: '400px' }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Register</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name"
                value={name} onChange={(e) => setName(e.target.value)} />
              </div>
      
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
                <div className="form-text">We'll never share your email with anyone else.</div>
              </div>
      
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
              </div>
      
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="check" />
                <label className="form-check-label" htmlFor="check">Check me out</label>
              </div>
      
              <button type="button" onClick ={onRegister} className="btn btn-primary w-100">Submit</button>
            </form>

            {errorMsg && (
            <div className="text-danger text-center mt-3">
              {errorMsg}
            </div>
          )}

            <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link to="/" className="text-primary" style={{ textDecoration: 'none' }}>
          Login
          </Link>
          </div>
            
          </div>
        </div>
      </div>
      
    
  
    );
  }
  
  export default Register;