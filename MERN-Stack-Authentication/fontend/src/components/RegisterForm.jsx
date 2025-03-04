import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert('Registration successful. Please login to continue.');
            navigate('/login');
        }catch(error){
            console.error(error);
            setError(error);
        }
    }

    return(
        <div className=' constainer mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h2>Register</h2>
                        </div>
                        <div className='card-body'>
                            {error && <div className='alert alert-danger'>{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className='form-group mb-3'>
                                    <label htmlFor='username'>Username</label>
                                    <input type='text' name='username' onChange={handleChange} value={formData.username} className='form-control' placeholder='Enter your username' required />
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' name='email' onChange={handleChange} value={formData.email} className='form-control' placeholder='Enter your email' required />
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' name='password' onChange={handleChange} value={formData.password} className='form-control' placeholder='Enter your password' required />
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;