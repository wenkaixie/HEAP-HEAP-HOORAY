// import React from "react";

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />;
// }

// export default MyApp;

// import React from 'react';
// import { useRouter } from 'next/router';
// import ProtectedRoute from '../src/app/components/ProtectedRoute';

// const noAuthRequired = ['/', '/login'];

// function MyApp({ Component, pageProps }) {
//     const router = useRouter();

//     return (
//         <>
//             {noAuthRequired.includes(router.pathname) ? (
//                 <Component {...pageProps} />
//             ) : (
//                 <ProtectedRoute>
//                     <Component {...pageProps} />
//                 </ProtectedRoute>
//             )}
//         </>
//     );
// }

// export default MyApp;

import React from 'react';
import { useRouter } from 'next/router';
import StudentRoute from '../src/app/components/StudentRoute'; // Adjust the path as necessary
import InstructorRoute from '../src/app/components/InstructorRoute'; // Adjust the path as necessary
import '../src/app/components/popup.css'; // Import the popup styles

const noAuthRequired = ['/', '/login']; // Define routes that don't require authentication
const instructorRoutes = ['/instructorHome', '/instructorProfile']; // Define instructor-specific routes
const studentRoutes = ['/home', '/profile', '/booking']; // Define student-specific routes

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    const getProtectedRoute = () => {
        if (noAuthRequired.includes(router.pathname)) {
            return <Component {...pageProps} />;
        } else if (instructorRoutes.includes(router.pathname)) {
            return (
                <InstructorRoute>
                    <Component {...pageProps} />
                </InstructorRoute>
            );
        } else if (studentRoutes.includes(router.pathname)) {
            return (
                <StudentRoute>
                    <Component {...pageProps} />
                </StudentRoute>
            );
        } else {
            // If the route is not specified, you can either redirect to a 404 page or show an access denied message
            return <div>Access Denied</div>;
        }
    };

    return <>{getProtectedRoute()}</>;
}

export default MyApp;



