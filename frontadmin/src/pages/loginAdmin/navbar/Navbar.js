import React from 'react';
import { UseproviderContext } from '../../../context/Appcontext';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
function Navbar({handleToggle,toggle}) {
    const { atoken, setToken } = UseproviderContext();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        setToken(''); // Clear token in context
    };

    return (
        <div className="navbar">
              <div>
              <button className="toggle-button" style={{left :!toggle?'5%' :'20%'}}  onClick={handleToggle} >
                            {toggle ? <FaBars /> : <FaBars />} 
                        </button>
              </div>
           <div>
           {atoken && (
            <button 
                onClick={handleLogout}
                className="logout-button"
            >
                Logout
            </button>
        )}
           </div>
        </div>
    );
}

export default Navbar;