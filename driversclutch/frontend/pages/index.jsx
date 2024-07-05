import Navbar from "../src/app/components/navbar/navbar";

import Link from "next/link";
import { FirestoreDB } from "@/app/firebase/firebase_config";

export default function Page() {
  return (
    <main>
      <div>
        landing page
      </div>
      <Link href="/login">login</Link>
    </main>
  );
}
