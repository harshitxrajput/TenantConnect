import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/useAuthStore.js';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, LogIn, Plus } from "lucide-react";
import { IoIosChatbubbles } from "react-icons/io";
import { IoNotifications, IoSearch } from "react-icons/io5";
import { logoutUser } from "../lib/Api.js";
import { useEffect, useState } from 'react';
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryClient = useQueryClient();
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
    const authUser = useAuthStore((state) => state.authUser);
    const { mutate:logoutMutation } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logout successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            setAuthUser(null);
            navigate("/signup", { replace: true });
        }
    });

    useEffect(() => {
        if (authUser === null) {
            navigate("/signup", { replace: true });
        }
    }, [authUser, navigate]);

    const [query, setQuery] = useState("");

    return (
        <div className='fixed top-0 w-full'>
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
                <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer select-none">
                    <img className="w-10 rounded-lg" src="/DemoLogo.jpeg" alt="" />
                    <span className="font-bold text-xl">TenantConnect</span>
                </div>

                {/* Search Bar */}
                {location === '/' ? (
                    <div className="w-3xl mx-auto">
                        <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
                            <Search className="text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for valuable and affordable properties"
                                className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700"
                            />
                        </div>
                    </div>
                    ) : (
                    <div className="w-3xl mx-auto">
                    <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 px-4 py-2">
                        <Search className="text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for valuable and affordable properties"
                            className="flex-1 px-3 py-2 outline-none bg-transparent text-gray-700"
                        />
                    </div>
                </div>
                )}

                <div className="flex items-center gap-3">
                    {authUser && (
                        <div className="flex items-center gap-4">
                            {/* Search Button */}
                            <button
                                onClick={() => navigate('/search')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoSearch className="text-3xl" />
                            </button>

                            {/* Chat Button */}
                            <button
                                onClick={() => navigate('/chat')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoIosChatbubbles className="text-3xl" />
                            </button>

                            {/* Notification Button */}
                            <button
                                onClick={() => navigate('/notifications')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <IoNotifications className="text-3xl" />
                            </button>
                    
                            {/* Profile Button */}
                            <button
                                onClick={() => navigate('/profile')}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <img className="w-12 rounded-full" src="/DemoLogo.jpeg" alt="profile" />
                            </button>
                            
                            {/* Logout Button */}
                            <button
                                onClick={() => logoutMutation()}
                                className="flex cursor-pointer gap-1 items-center text-gray-700 hover:text-green-600 transition text-lg font-semibold"
                            >
                                <TbLogout className="text-3xl" />
                            </button>
                        </div>
                    )}

                    {!authUser && (
                        <div className="flex gap-5">
                            <button
                                onClick={() => navigate('/login')}
                                className="flex bg-gray-100 px-3 rounded-lg cursor-pointer gap-1 items-center text-gray-700 hover:bg-gray-300 transition text-lg font-semibold"
                            >
                                <LogIn size={20} /> Log in
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="flex cursor-pointer gap-1 items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                            >
                                <Plus size={20} /> Sign up
                            </button>
                        </div>
                    )}
                </div>
            </header>
        </div>
  )
}

export default Navbar
