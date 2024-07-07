'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return children;
};

export default ProtectedRoute;
