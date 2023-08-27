import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Welcome = (props) => {
    return (
        <div className='welcome'>
            <div className="page">
                <div className="left-content">
                    <h2>All your notes in <br /> one place</h2>
                </div>
                <div className="right-content">
                    <button className="learn-more">
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <Link to="/login"><button><span className={`button-text ${props.mode}-text`}>Login Now</span></button></Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome