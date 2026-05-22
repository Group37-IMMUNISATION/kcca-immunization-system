import { useState } from 'react';
import API from '../services/api';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {

        e.preventDefault();

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

            alert('Login failed');
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    KCCA Immunization Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;