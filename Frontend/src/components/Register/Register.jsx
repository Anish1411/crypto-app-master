import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("http://localhost:9000/createUser", {
                username,
                email,
                password,
            });
            console.log(res);
            res.data && window.location.replace("/login");
        }
        catch (err) {
            setError(true);
        }

    }

    return (
        <div className="Register">
            <span className="RegisterTitle">Name</span>
            <form className='RegisterForm' onSubmit={handleSubmit}>

                <label>Name</label>
                <input type="text"
                    className='RegisterInput'
                    placeholder='Enter your Name...'
                    onChange={e => setUsername(e.target.value)}
                />

                <label>Email</label>
                <input type="email" className='RegisterInput' placeholder='Enter your email...'
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input type="password" className='RegisterInput' placeholder='Enter your password...'
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="RegisterButton" type="submit">Register</button>
            </form>
            <button className="RegisterLoginButton">
                <Link className="link" to="/login">LOGIN</Link>
            </button>

            {error && <span style={{ color: "red", marginTop: "10px" }}> Something went wrong!!cd </span>}
        </div>

    );
}

export default Register;
