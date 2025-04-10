import { createContext, useContext, useState } from "react";

// إنشاء سياق جديد
const DoctorContext = createContext();

// مكون موفر السياق
function DoctorContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const value = {
        token,
        setToken, // يمكن استخدام هذه الدالة لتحديث التوكن
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
}

// استخدام السياق
export const useAppDoctor = () => {
    return useContext(DoctorContext);
};

export default DoctorContextProvider;