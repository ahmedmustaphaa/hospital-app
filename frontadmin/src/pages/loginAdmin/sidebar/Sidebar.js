import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { RiDashboardFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { IoPersonAddSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import logo from '../../../assets/si.webp'; 
import sidebarImage from '../../../assets/photo.jpg';
import { IoClose } from "react-icons/io5";
function Sidebar({closeSide}) {
  return (
    <div className='sidebar'>
       <IoClose style={{fontSize:'25px',color:'red'}}  className='closeicon' onClick={closeSide}/>
      <h4 className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
        Health Care
      </h4>

      {/* الروابط */}
      <div className='links'>
        <Link className="link" to="/dashboard"><RiDashboardFill className="icon"/> Dashboard</Link>
        <Link className="link" to="/allAppointment"><TbBrandBooking className="icon"/> All Appointment</Link>  
        <Link className="link" to="/adddoctor"><IoPersonAddSharp className="icon"/> Add Doctor</Link> 
        <Link className="link" to="/doctor-list"><CiViewList className="icon"/> Doctor List</Link>  
      </div>

      {/* صورة جانبية */}
      <img src={sidebarImage} alt="Sidebar" className="sidebar-image" />
    </div>
  );
}

export default Sidebar;