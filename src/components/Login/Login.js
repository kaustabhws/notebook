import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginSignup.css'

export default function LoginSignup(props) {

    const [creds, setCreds] = useState({
        email: "",
        password: ""
    })

    let history = useNavigate()

    const onChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const [showAlert, setShowAlert] = useState(false);

    const [showStat, setShowStat] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "https://notebook-backend-19jg.onrender.com/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: creds.email, password: creds.password }),
        });
        const json = await response.json()
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken)
            setShowStat(true)
            setTimeout(() => {
                setShowStat(false);
                history("/")
            }, 2000);
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return;
        }
    }

    const togglePass = () => {
        let input = document.getElementById('password')

        if(input.type === 'password') {
            input.setAttribute('type', 'text')
        } else {
            input.setAttribute('type', 'password')
        }
    }

    return (
        <main className={`main ${props.mode}-main`}>
            <div className="containers">
                <section className="wrapper">
                    <div className="heading">
                        <h1 className="text text-large">Sign In</h1>
                        <p className="text text-normal">
                            New user?{" "}
                            <span>
                                <Link to="/signup" className="text text-links">
                                    Create an account
                                </Link>
                            </span>
                        </p>
                    </div>
                    <form name="signin" className="form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden="true">
                                Email Address
                            </label>
                            <input
                                type="email"
                                onChange={onChange}
                                value={creds.email}
                                name="email"
                                id="email"
                                className="input-field"
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden="true">
                                Password
                            </label>
                            <input
                                type="password"
                                onChange={onChange}
                                value={creds.password}
                                name="password"
                                id="password"
                                className="input-field"
                                placeholder="Password"
                                required
                            />
                            {props.mode === 'light' ? <i class="fa-regular fa-eye" onClick={togglePass}></i> : <i class="fa-regular fa-eye" style={{color: '#ffffff'}} onClick={togglePass}></i>}
                        </div>
                        <div id="liveAlertPlaceholder">
                            {showStat && (
                                <div className="alert alert-success">Login success. Redirecting...</div>
                            )}
                        </div>
                        <div id="liveAlertPlaceholder">
                            {showAlert && (
                                <div className="alert alert-danger">Invalid login credentials</div>
                            )}
                        </div>
                        <div className="input-control">
                            <button
                                type="submit"
                                name="submit"
                                className="input-submit"
                            > Sign In </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}
