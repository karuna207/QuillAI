import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const Login = () => { 
    const {axios,settoken}=useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try { 
            const {data}=await axios.post("/api/admin/login",{email,password}); 
            if(data.success){
                settoken(data.token);
                localStorage.setItem('token',data.token); 
                axios.defaults.headers.common['Authorization']=data.token;
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        <span className="text-blue-600">Admin</span> Login
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">Enter your credentials to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            required
                            placeholder="Mail Id"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
