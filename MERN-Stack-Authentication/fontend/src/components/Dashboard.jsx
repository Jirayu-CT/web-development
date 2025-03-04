import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard(){
    const [ data, setData ] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        
    }, []);

    return(
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h3>Dashboard</h3>
                        </div>
                        <div className='card-body'>
                            <p>
                                Welcome to your dashboard! This id a protected route. Only logged in users can access this page.
                            </p>
                            <button onClick={handleLogout} className='btn btn-danger w-100'>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;