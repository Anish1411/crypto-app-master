import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        try {
            const response = await axios.post('http://localhost:9000/login', {
                name: username,
                password: password
            });
            console.log(response.data);
            // Redirect to home page upon successful login
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response.data);
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            {error && <div className="error">{error}</div>}
            <form className='loginForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className='loginInput' placeholder='Enter your username...' ref={usernameRef} />
                <label>Password</label>
                <input type="password" className='loginInput' placeholder='Enter your password...' ref={passwordRef} />
                <button className="loginButton" type="submit">Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">REGISTER</Link>
            </button>
        </div>
    );
};

export default Login;
