import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(){
    return(
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className="container">
                <Link className='navbar-brand' to='/'>MERNAuth</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/login'>Login</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/register'>Register</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                        </li>

                        <button className='btn btn-danger' onClick=''>Logout</button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;