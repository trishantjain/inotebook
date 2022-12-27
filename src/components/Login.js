import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Login = (props) => {
    let history = useNavigate()

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    // Function send the auth token to login to user
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history('/');
            props.showAlert("Loggedin  successfully", "success")
    
        }
    
        else {
            props.showAlert("Invalid Credentials", "danger")
        }

        
    }    

    // Update the credentials.
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }    


    return (
        <div className={`container my-5 text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>

                {/* Email Input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} name='password' value={credentials.password} onChange={onChange} id="password" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
