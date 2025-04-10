import React, { useEffect } from 'react';
import './doctorlist.css';
import { useAppAdmin } from '../../../context/Admincontext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function DoctorList() {
  const { getAllDoctors, data, loading, error } = useAppAdmin();

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  const changeAvailability = async (docId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/doctor/change-availability",
        { docId }
      );

      if (response.data.success) {
        toast.success("تم تحديث توفر الطبيب بنجاح ✅");
        getAllDoctors();
      } else {
        toast.error(response.data.message || "حدث خطأ غير متوقع ❌");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث التوفر ❌");
    }
  };

  return (
    <div className="doctor-list-container">
      <h1 className="title">قائمة الأطباء 🏥</h1>

      {loading ? (
        <p className="loading">جارِ تحميل البيانات...</p>
      ) : error ? (
        <p className="error-message">⚠️ خطأ: {error.message}</p>
      ) : data.length > 0 ? (
        <div className="doctor-list">
          {data.map((item) => (
            <div key={item._id} className="doctor-card">
              {/* ✅ تقييم الطبيب */}
              <div className="rating">
                ⭐ {item.rating ? item.rating.toFixed(1) : "4.5"}
              </div>

              {/* صورة الطبيب */}
              <img src={item.image} alt={` ${item.name}`} className="doctor-image" />

              {/* معلومات الطبيب */}
              <h2 className="doctor-name">{item.name}</h2>
              <p className="doctor-speciality">{item.speciality}</p>
              <p className="doctor-address">{item.address}</p>

              {/* ✅ توفر الطبيب والخبرة */}
              <div className="info-experience">
                <label className="availability">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(item._id)}
                    checked={!!item.available}
                  />
                  {item.available?  <span>غير متاح</span>:  <span> متاح</span>}
                </label>
                <p className="doctor-experience">🩺 {item.experience} سنوات خبرة</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-doctors">🚨 لا يوجد أطباء متاحين حاليًا</p>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default DoctorList;