import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    let history = useNavigate()

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)

        if(json.success){
            localStorage.setItem('token', json.authToken);
            history('/');
            props.showAlert("Account created successfully", "success")

        }

        else{
            props.showAlert("Invalid Credentials", "danger")
        }

    }

    // Changing state of "Title" and "description" field in input field.
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className={`container my-5 text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>

                {/* Name Input */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="name" name='name' value={credentials.name} onChange={onChange}required minLength={6} aria-describedby="emailHelp" />
                    <pre className="">* atleast 6 characters</pre>

                </div>

                {/* Email Input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} name='password' value={credentials.password} onChange={onChange}required minLength={5} id="password" />
                    <pre className="">* atleast 5 characters</pre>
                </div>

                {/* Confirm Input */}
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} name='cpassword' value={credentials.cpassword} onChange={onChange} id="cpassword" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary" onSuspend={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
