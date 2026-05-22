import { Link } from 'react-router-dom';
function Dashboard() {

    const handleLogout = () => {

        localStorage.removeItem('token');

        window.location.href = '/';
    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Top Navbar */}

            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    KCCA Immunization System
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

            {/* Dashboard Content */}

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-6">
                    Dashboard
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<Link to="/register-child">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            Register Child
        </h3>

        <p className="text-gray-600">
            Register new infant records.
        </p>

    </div>

</Link>

<Link to="/search-child">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            Search Child
        </h3>

        <p className="text-gray-600">
            Retrieve child immunization history.
        </p>

    </div>

</Link>


                    <Link to="/immunization">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            Record Immunization
        </h3>

        <p className="text-gray-600">
            Record vaccines administered.
        </p>

    </div>

</Link>


<Link to="/immunization-history">

    <div className="bg-white p-6 rounded-lg shadow hover:bg-blue-50">

        <h3 className="text-xl font-bold mb-2">
            Immunization History
        </h3>

        <p className="text-gray-600">
            View child vaccination records.
        </p>

    </div>

</Link>


                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">
                            Due Vaccines
                        </h3>

                        <p className="text-gray-600">
                            View pending vaccines.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">
                            Defaulters
                        </h3>

                        <p className="text-gray-600">
                            Track overdue children.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;