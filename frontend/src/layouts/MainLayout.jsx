import { Link } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token');

const user = token
    ? jwtDecode(token)
    : null;


function MainLayout({ children }) {

    const handleLogout = () => {

        localStorage.removeItem('token');

        window.location.href = '/';
    };

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-blue-700 text-white p-6">

                <h1 className="text-2xl font-bold mb-8">

                    KCCA IMMUNIZATION

                </h1>

                <nav className="space-y-4">

                    <Link
                        to="/dashboard"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Dashboard
                    </Link>

                    {[2,3,4].includes(user?.role_id) && (

                     <Link
                        to="/register-child"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                         Register Child
                    </Link>

)}

                    <Link
                        to="/search-child"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Child Management
                    </Link>
                    
                    <Link
                        to="/defaulters"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Defaulters
                    </Link>

                    <Link
                        to="/reports"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Reports & Analytics
                    </Link>

                    <Link
                        to="/stock"
                        className="block p-3 hover:bg-blue-700 rounded"
                    >
                        Vaccine Stock
                    </Link>


                    <Link
                        to="/stock-history"
                        className="block p-3 hover:bg-blue-700 rounded"
                    >
                        Stock History
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left bg-red-500 hover:bg-red-600 p-3 rounded mt-8"
                    >
                        Logout

                        
                    </button>

                </nav>

            </div>

            {/* Main Content */}

            <div className="flex-1 p-8">

                {children}


        <footer className="bg-white border-t mt-8 py-4 text-center text-gray-500 text-sm">

    KCCA Infant Immunization Record Management System
    | Version 1.0 | 2026

        </footer>

            </div>

        </div>
    );
}

export default MainLayout;