"use client"
import React from 'react';
import ProtectedRoute from './ProtectedRoute'; // Adjust the path as necessary

const StudentRoute = ({ children }) => {
    return <ProtectedRoute allowedRoles={['student']}>{children}</ProtectedRoute>;
};

export default StudentRoute;

