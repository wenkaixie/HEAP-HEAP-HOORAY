import React from 'react';
import Link from 'next/link';
import { FirestoreDB } from "../src/app/firebase/firebase_config";

console.log("FirestoreDB", FirestoreDB);

const HomePage = () => {
    return (
        <main>
            <div>
                Landing page
            </div>
            <Link href="/login">
                Login
            </Link>
        </main>
    );
}

export default HomePage;
