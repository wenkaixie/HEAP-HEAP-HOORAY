"use client"
import React from 'react';
import ProtectedRoute from './ProtectedRoute'; // Adjust the path as necessary

const InstructorRoute = ({ children }) => {
    return <ProtectedRoute allowedRoles={['instructor']}>{children}</ProtectedRoute>;
};

export default InstructorRoute;

