import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();

function AdminContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const getAllDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/admin/get-doctors');
            setData(response.data.doctors || []);
            console.log(response.data.doctors || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch doctor data');
            setLoading(false);
        }
    };

   
    const value = {
        token,
        setToken,
       
        getAllDoctors,
        data,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAppAdmin = () => {
    return useContext(AdminContext);
};

export default AdminContextProvider;