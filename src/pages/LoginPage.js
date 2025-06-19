
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import './AuthForm.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Login failed:', data);
        } else {
          localStorage.setItem('token', data.token);
          login(data.user); // ✅ update context
          navigate('/'); // ⬅️ Go to home page
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginPage;



//  import React, { useState } from 'react';
//  import { Link, useNavigate } from 'react-router-dom';
//  import './AuthForm.css'
//  function LoginPage() {
//    const navigate = useNavigate();
//    const [formData, setFormData] = useState({ email: '', password: '' });
//    const [errors, setErrors] = useState({});

//    const handleChange = (e) => {
//      const { name, value } = e.target;
//      setFormData({ ...formData, [name]: value });
//    };

//    const validate = () => {
//      const newErrors = {};
//      if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//      e.preventDefault();
//      const validationErrors = validate();
//      setErrors(validationErrors);
//      if (Object.keys(validationErrors).length === 0) {
//        try {
//          const response = await fetch('http://localhost:5000/api/users/login', {
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify(formData),
//          });

//          if (!response.ok) {
//            const data = await response.json();
//            console.error('Login failed:', data);
//          } else {
//            const data = await response.json();
//            localStorage.setItem('token', data.token);
//            // Redirect or update UI as needed
//            navigate('/'); // Replace with your desired route
//          }
//        } catch (error) {
//          console.error('Error:', error);
//        }
//      }
//    };

//    return (
//      <div className="form-container">
//        <h2>Login</h2>
//        <form onSubmit={handleSubmit} noValidate>
//          <div className="form-group">
//            <label>Email Address</label>
//            <input
//              type="email"
//              name="email"
//              value={formData.email}
//              onChange={handleChange}
//              placeholder="Enter your email"
//            />
//            {errors.email && <p className="error">{errors.email}</p>}
//          </div>
//          <div className="form-group">
//            <label>Password</label>
//            <input
//              type="password"
//              name="password"
//              value={formData.password}
//              onChange={handleChange}
//              placeholder="Enter your password"
//            />
//            {errors.password && <p className="error">{errors.password}</p>}
//          </div>
//          <button type="submit">Login</button>
//        </form>
//        <p>
//          Don't have an account? <Link to="/register">Register here</Link>
//        </p>
//      </div>
//    );
//  }

//  export default LoginPage;


