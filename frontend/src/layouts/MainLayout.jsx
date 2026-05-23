import { Link } from 'react-router-dom';

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

                    KCCA System

                </h1>

                <nav className="space-y-4">

                    <Link
                        to="/dashboard"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/register-child"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Register Child
                    </Link>

                    <Link
                        to="/search-child"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Search Child
                    </Link>

                    <Link
                        to="/immunization"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Record Immunization
                    </Link>

                    <Link
                        to="/due-vaccines"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Due Vaccines
                    </Link>

                    <Link
                        to="/defaulters"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Defaulters
                    </Link>

                    <Link
                        to="/immunization-history"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Immunization History
                    </Link>

                    <Link
                        to="/reports"
                        className="block hover:bg-blue-600 p-3 rounded"
                    >
                        Reports & Analytics
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

            </div>

        </div>
    );
}

export default MainLayout;