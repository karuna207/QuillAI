import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, settoken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState('');

    const value = { axios, navigate, token, settoken, blogs, setBlogs, input, setInput };

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        fetchBlogs(); 
        const token=localStorage.getItem('token');
        if(token){
            settoken(token);
            axios.defaults.headers.common['Authorization']=`${token}`;
        }
    }
        , []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}