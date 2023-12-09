"use client"

import Link from "next/link";

export default function Home() {

    return (
        <div>
            <p>Home</p>
            <Link href="/dashboard/createmodel">
                <p>createmodel</p>
            </Link>
            <Link href="/dashboard/fetchmodels">
                <p>fetchmodel</p>
            </Link>
            <Link href="/dashboard/createcontent">
                <p>createcontent</p>
            </Link>
            <Link href="/notification">
                <p>push testing</p>
            </Link>
        </div>
    );
}
