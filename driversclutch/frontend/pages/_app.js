import React from "react";
import "../styles/globals.css"; // Adjust the path to your global CSS file if necessary

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default MyApp;
