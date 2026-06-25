import { useState } from 'react';
import API from '../services/api';

import loginBg from '../assets/images/login-bg.jpg';
import kccaLogo from '../assets/logos/kcca-logo.png';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError('');

    try {

        const response = await API.post('/auth/login', {

            email,
            password

        });

        localStorage.setItem(
            'token',
            response.data.token
        );

        window.location.href = '/dashboard';

    } catch (error) {

        setError(
            'Invalid email or password.'
        );

    } finally {

        setLoading(false);

    }
};

return (

<div className="min-h-screen grid lg:grid-cols-2">

    {/* LEFT SIDE */}

    <div
        className="hidden lg:flex relative bg-cover bg-center"
        style={{
            backgroundImage: `url(${loginBg})`
        }}
    >

        <div className="absolute inset-0 bg-blue-900/70"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">

            <img
                src={kccaLogo}
                alt="KCCA Logo"
                className="w-28 mb-8"
            />

            <h1 className="text-5xl font-bold leading-tight">

                KCCA Infant Immunization

                <br />

                Management System

            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-8">

                Digitizing infant vaccination records,

                improving continuity of care,

                and strengthening immunization services

                across all Kampala Capital City Authority

                health facilities.

            </p>

            <div className="mt-12 space-y-4 text-lg">

                <div>
                    ✔ Secure Digital Records
                </div>

                <div>
                    ✔ SMS Reminder Notifications
                </div>

                <div>
                    ✔ Real-Time Vaccine Tracking
                </div>

                <div>
                    ✔ Facility Performance Reports
                </div>

            </div>

        </div>

    </div>


    {/* RIGHT SIDE */}

    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-white p-10">

        <div className="w-full max-w-md">

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border">

                <div className="text-center mb-8">

                    <img

                        src={kccaLogo}

                        className="w-20 mx-auto mb-4"

                        alt="Logo"

                    />

                    <h2 className="text-3xl font-bold text-blue-900">

                        Welcome Back

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Sign in to continue

                    </p>

                </div>


                {error && (

                    <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-5">

                        {error}

                    </div>

                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-5">

                        <label className="block text-gray-700 mb-2">

                            Email Address

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            className="w-full rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 outline-none"

                            placeholder="Enter email"

                        />

                    </div>

                    <div className="mb-6">

                        <label className="block text-gray-700 mb-2">

                            Password

                        </label>

                        <div className="relative">

                            <input

                                type={showPassword ? "text":"password"}

                                value={password}

                                onChange={(e)=>setPassword(e.target.value)}

                                className="w-full rounded-xl border border-gray-300 p-4 pr-14 focus:ring-2 focus:ring-blue-500 outline-none"

                                placeholder="Enter password"

                            />

                            <button

                                type="button"

                                className="absolute right-4 top-4 text-gray-500"

                                onClick={()=>setShowPassword(!showPassword)}

                            >

                                {showPassword ? "Hide" : "Show"}

                            </button>

                        </div>

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 transition text-white rounded-xl py-4 font-semibold shadow-lg"

                    >

                        {

                            loading

                            ?

                            "Signing In..."

                            :

                            "Login"

                        }

                    </button>

                </form>

                <div className="mt-8 text-center text-gray-400 text-sm">

                    © 2026 Kampala Capital City Authority

                </div>

            </div>

        </div>

    </div>

</div>

);
}

export default Login;