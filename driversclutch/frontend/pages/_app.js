// import React from "react";

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />;
// }

// export default MyApp;

import React from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../src/app/components/ProtectedRoute';
//import '../styles/globals.css'; // Assuming you have global styles

const noAuthRequired = ['/', '/login'];

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
            ) : (
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            )}
        </>
    );
}

export default MyApp;
