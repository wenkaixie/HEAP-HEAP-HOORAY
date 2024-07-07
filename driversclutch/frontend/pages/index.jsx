// import Navbar from "../src/app/components/navbar/navbar";

// import Link from "next/link";
// import { FirestoreDB } from "../src/app/firebase/firebase_config";

// console.log("FirestoreDB", FirestoreDB);

// export default function Page() {
//   return (
//     <main>
//       <div>
//         landing page
//       </div>
//       <Link href="/login">login</Link>
//     </main>
//   );
// }


import React from 'react';
import Link from 'next/link';
import Navbar from "../src/app/components/navbar/navbar";
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
