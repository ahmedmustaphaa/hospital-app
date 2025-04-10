import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/loginAdmin/Login';
import { UseproviderContext } from './context/Appcontext';
import Sidebar from './pages/loginAdmin/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom'; // Ensure you import from 'react-router-dom'
import Allappointment from './pages/loginAdmin/allappointment/Allappointment';
import Dashboard from './pages/loginAdmin/dashboard/Dashboard';
import Adddoctor from './pages/loginAdmin/adddoctor/Adddoctor';
import Doctorlist from './pages/loginAdmin/doctorlist/Doctorlist';
import Navbar from './pages/loginAdmin/navbar/Navbar';

function App() {  
    const [toggle, setToggle] = useState(true);
    const { atoken, setToken } = UseproviderContext();
    const [width, setWidth] = useState(window.innerWidth);

    // Handle window resizing
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
  
        window.addEventListener("resize", handleResize);
  
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Retrieve token from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, [setToken]);

    const handleToggle = () => {
        setToggle(prevToggle => !prevToggle);
    };

    const closeSide=()=>{
        setToggle(false)
    }

  
    return !atoken ? (
        <div>
            <Login />
        </div>
    ) : (
        <div>
            <Navbar toggle={toggle} handleToggle={handleToggle} />
            <div className='admin-dashboard'>
                <div className={toggle ? 'sidebar' : "sidebar-collapsed"} style={{ className: width <= 900 ? 'sidebar-collapsed' : 'sidebar' }}>
                    <Sidebar closeSide={closeSide}/>
                </div>
                <div className='right-side' style={{ marginLeft: toggle ? '20%' : '0%' }}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/allAppointment" element={<Allappointment />} />
                        <Route path="/adddoctor" element={<Adddoctor />} />
                        <Route path="/doctor-list" element={<Doctorlist />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;