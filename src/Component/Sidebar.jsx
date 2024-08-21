import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dashboard, Event, Report, Settings, Devices, Feedback, Logout, Mail } from '@mui/icons-material'; // Import the Mail icon for Messages
import logo from '../assets/react.svg';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
            <div className="sidebar-header text-center py-8">
                <img src={logo} alt="Company Logo" className="logo rounded-full w-16 h-16 mx-auto mb-2" />
                <h3 className="text-xl font-semibold">CDP India Pvt Ltd</h3>
                <p className="text-sm text-gray-400">cdpindia.com</p>
            </div>
            <ul className="flex-grow">
                <li className={`px-6 py-3 hover:bg-gray-700 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}>
                    <Link to="/" className="flex items-center">
                        <Dashboard className="mr-3" />
                        <span>Product</span>
                    </Link>
                </li>
                <li className={`px-6 py-3 hover:bg-gray-700 ${location.pathname === '/messages' ? 'bg-gray-700' : ''}`}>
                    <Link to="/messages" className="flex items-center">
                        <Mail className="mr-3" /> {/* You can use any icon you prefer */}
                        <span>Messages</span>
                    </Link>
                </li>
                {/* Other Links */}
            </ul>
            <div className="border-t border-gray-700">
                <button 
                    onClick={handleLogout} 
                    className="flex items-center px-6 py-3 w-full text-left hover:bg-red-600"
                >
                    <Logout className="mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
