import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allappointment.css';

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/admin/get-appointment');
        setAppointments(data.getAllappointment);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-container">
      <h1 className="appointments-title">All Appointments</h1>
      {appointments.length > 0 ? (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>User Name</th>
        
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Cancelled</th>
              <th>Doctor Name</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="appointment-row">
                <td>{appointment.userData ? appointment.userData.name : 'Unknown User'}</td>

                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                <td>${appointment.amount}</td>
                <td>{appointment.cancelled ? 'Yes' : 'No'}</td>
                <td>{appointment.docData?.name || 'Unknown Doctor'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-appointments">No appointments available.</p>
      )}
    </div>
  );
}

export default AllAppointment;
