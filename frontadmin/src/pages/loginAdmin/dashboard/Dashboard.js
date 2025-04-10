import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/dashboard');
        setData(response.data.allData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className='dashboard-container'>
      <h1 className='dashboard-title'>Dashboard Overview</h1>
      <div className='dashboard-info'>
        <div className='dashboard-card'>
          <img src={require('../../../assets/dash2.jpg')} alt='Doctors' className='dashboard-icon' />
          <h2>{data.DoctorData}</h2>
          <p>Doctors</p>
        </div>
        <div className='dashboard-card'>
          <img src={require('../../../assets/dash3.jpg')} alt='Users' className='dashboard-icon' />
          <h2>{data.userData}</h2>
          <p>Users</p>
        </div>
        <div className='dashboard-card'>
          <img src={require('../../../assets/dash4.jpg')} alt='Appointments' className='dashboard-icon' />
          <h2>{data.appointmentData}</h2>
          <p>Appointments</p>
        </div>
      </div>

      <h2 className='latest-appointments-title'>Latest Appointments</h2>
      <div className='latest-appointments'>
        {data.latestappointmentData?.map((item, index) => (
          <div key={index} className='appointment-card'>
            <img src={item.docData.image} alt={item.docData.name} className='appointment-image' />
            <div className='appointment-details'>
              <p className='doctor-name'>{item.docData.name}</p>
              <p className='appointment-date'>{item.slotDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
