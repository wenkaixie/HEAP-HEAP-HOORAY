"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('userToken');
            const userRole = localStorage.getItem('userRole');
            if (!token) {
                router.push('/login'); // Redirect to login if token is missing
            } else if (!allowedRoles.includes(userRole)) {
                setAccessDenied(true); // Show access denied popup if role is not allowed
            } else {
                setAccessDenied(false);
            }
            setLoading(false); // Set loading to false after checking auth status
        };

        checkAuth();
    }, [router, allowedRoles]);

    const handleClosePopup = () => {
        setAccessDenied(false);
        router.back(); // Go back to the previous route
    };

    if (loading) {
        return null; // Do not render anything while checking auth status
    }

    return (
        <>
            {accessDenied && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Access Denied</h2>
                        <p>You do not have permission to view this page.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
            {!accessDenied && children}
        </>
    );
};

export default ProtectedRoute;



