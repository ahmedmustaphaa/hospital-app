import React, { useState } from 'react';
import { assets } from '../../../assets_admin/assets.js';
import './doctor.css';
import axios from 'axios';
import { UseproviderContext } from '../../../context/Appcontext.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDoctor() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [speciality, setSpeciality] = useState('General');
  const [available, setAvailable] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');
  const [degree, setDegree] = useState('');
  const [image, setImage] = useState(null);

  const { atoken } = UseproviderContext();

  if (!atoken) {
    console.log('Authentication token:', atoken);
    toast.error("Invalid authentication token");
    return;
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify required fields
    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (!experience) {
      toast.error("Experience is required");
      return;
    }
    if (!fees) {
      toast.error("Fees are required");
      return;
    }
    if (!speciality) {
      toast.error("Speciality is required");
      return;
    }
    if (!available) {
      toast.error("Availability is required");
      return;
    }
    if (!address) {
      toast.error("Address is required");
      return;
    }
    if (!about) {
      toast.error("About the doctor is required");
      return;
    }
    if (!degree) {
      toast.error("Degree is required");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    const experienceNumber = parseInt(experience.split(' ')[0]);
    formData.append('experience', experienceNumber);
    formData.append('fees', fees);
    formData.append('speciality', speciality);
    formData.append('available', available);
    formData.append('address', address);
    formData.append('about', about);
    formData.append('degree', degree);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/add-doctor',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${atoken}`,
          },
        }
      );
      toast.success('Doctor added successfully');
    } catch (error) {
      console.error('Error adding doctor:', error.response ? error.response.data : error.message);
      toast.error(`Failed to add doctor: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="add-doctor-form">
      <h1>Add Doctor</h1>

      <div className="form-group">
        <label htmlFor="upload-picture" className="upload-label">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Doctor's Image"
              className="upload-image"
            />
          ) : (
            <img
              src={assets.upload_area}
              alt="Upload Area"
              className="upload-image"
            />
          )}
          <p>Upload Doctor's Picture</p>
        </label>
        <input type="file" id="upload-picture" hidden onChange={handleImageUpload} />
      </div>

      <form className="doctor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        </div>

        <div className="form-group">
          <label>Doctor's Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>

        <div className="form-group">
          <label>Doctor's Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>

        <div className="form-group">
          <label>Experience</label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            {['1 Year', '2 Year', '3', '4 Year', '5 Year', '6 Year', '7 Year', '8 Year', '9 Year', '10 Year'].map((exp, idx) => (
              <option key={idx} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fees</label>
          <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="Fees" required />
        </div>

        <div className="form-group">
          <label>Speciality</label>
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
            {['General', 'Obstetrics and Gynecology', 'Dermatology', 'Pediatrics', 'Neurology', 'Gastroenterology'].map((spec, idx) => (
              <option key={idx} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Availability</label>
          <input type="text" value={available} onChange={(e) => setAvailable(e.target.value)} placeholder="Availability" />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        </div>

        <div className="form-group">
          <label>About the Doctor</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About the Doctor" rows="4"></textarea>
        </div>

        <div className="form-group">
          <label>Doctor's Degree</label>
          <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Degree" />
        </div>

        <div className="form-group submit-button">
          <button type="submit">Add Doctor</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AddDoctor;