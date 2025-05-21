import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const navigate = useNavigate();

  const OnLogin = async (e) => {
    console.log("triggered")
    e.preventDefault();
  

    if (email && !emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address");
      return;
    }
    const accessToken = localStorage.getItem('token');
  
    try {
      const response = await axios.post( 
        'http://localhost:4000/api/users/login',
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log('Response:', response.data);
  
      // Optional: Save token if login is successful
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

              // ✅ Show success toast
      toast.success('Login successful!', );
      navigate('/home')

      // TODO: Redirect to dashboard or homepage here if needed

      }
  
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="card shadow" style={{ width: '400px' }}>
    <div className="card-body">
      <h3 className="card-title text-center mb-4">Login</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email"  
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <div className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="check" />
          <label className="form-check-label" htmlFor="check">Check me out</label>
        </div>

        <button onClick={OnLogin} type="button" className="btn btn-primary w-100">Submit</button>
      </form>

      {errorMsg && (
            <div className="text-danger text-center mt-3">
              {errorMsg}
            </div>
          )}

      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-primary" style={{ textDecoration: 'none' }}>
          Register
        </Link>
      </div>
    </div>
  </div>
</div>


  );
}

export default Login;