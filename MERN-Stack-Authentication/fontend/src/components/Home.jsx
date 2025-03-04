import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home(){
    return(
        <div className='container mt-5'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header text-center'>
                        <h2>Welcome to the MERN Stack Authentication Project</h2>
                    </div>
                    <div className='card-body'>
                        <p className='card-text'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat maiores deserunt cupiditate nemo molestias voluptates cum commodi repellat, numquam harum! Esse velit modi rem recusandae consectetur blanditiis nisi unde quibusdam?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;