import React from 'react';
import { Link } from 'react-router-dom';


function NavigationBar() {


    return (
        <div className="nav-bar">
            <div className='title'>All Passwords at one place 🔥🔥</div>

            <ul className="top-nav">
                <li>
                    <Link to='/'>⬅ Go to Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationBar    
