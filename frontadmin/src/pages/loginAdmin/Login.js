import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { UseproviderContext } from '../../context/Appcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom'
import { ClipLoader } from 'react-spinners'; // مكتبة التحميل
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('admin');
    const { setToken } = UseproviderContext();

    

    const  navigate=useNavigate()
    const loginAdmin = async () => {
       
        try {
            const response = await axios.post('http://localhost:4000/api/admin/login', { email, password });
            const token = response.data.token;
            console.log(token)
            localStorage.setItem('token', token);
            setToken(token);

            toast.success('Login successful, welcome!', {
                position: "top-right",
                autoClose: 5000,
            });

           
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    
    return (
        <div>

        <div className='adminLogin'>
        <div className='login'>
            <div className='login-container'>
                <form onSubmit={(e) => { e.preventDefault(); loginAdmin(); }}>
                    <div className='form-content'>
                        <h1>{state === "admin" ? <span>Admin</span> : <span>Doctor</span>} Login</h1>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type='password' 
                            placeholder='Password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <div className="role-toggle">
                            <input 
                                type="checkbox" 
                                id="roleSwitch" 
                                onClick={() => setState(state === "admin" ? "doctor" : "admin")}
                            />
                            <label htmlFor="roleSwitch" style={{color:'green'}}>
                                Switch to {state === "admin" ? "Doctor" : "Admin"}
                            </label>
                        </div>
                        <p style={{color:'#fff'}}>If you have access to an administrator (or admin) account, you can sign in to the Google Admin console. The Admin console is where admins manage Google services for people in an organization.</p>
                        <button type="submit" className="submitloginbtn">Login</button>
                    </div>
                </form>
            </div>
           
            <ToastContainer />
        </div>
        </div>
        </div>
    );
}

export default Login;
