import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setAuth }){
    const [formData, setFormData] = useState({
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
                const response = await axios.post('http://localhost:5000/api/auth/login', formData);
                localStorage.setItem('token', response.data.token);
                setAuth(true);
                navigate('/dashboard');
            }catch(error){
                setError('Invalid email or password');
                console.error(error);
            }
        }

    return(
        <div className=' constainer mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h2>Login</h2>
                        </div>
                        <div className='card-body'>
                            {error && <div className='alert alert-danger'>{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className='form-group mb-3'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' name='email' onChange={handleChange} value={formData.email} className='form-control' placeholder='Enter your email' required />
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' name='password' onChange={handleChange} value={formData.password} className='form-control' placeholder='Enter your password' required />
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;