import { Navigate } from 'react-router-dom';

import { jwtDecode } from 'jwt-decode';

function RoleProtectedRoute({

    children,

    allowedRoles

}) {

    const token = localStorage.getItem('token');

    if (!token) {

        return <Navigate to="/" />;
    }

    try {

        const decoded = jwtDecode(token);

        if (
            !allowedRoles.includes(
                decoded.role_id
            )
        ) {

            return <Navigate to="/dashboard" />;
        }

        return children;

    } catch (error) {

        return <Navigate to="/" />;
    }
}

export default RoleProtectedRoute;