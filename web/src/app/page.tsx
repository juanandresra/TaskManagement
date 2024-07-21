"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
    const { data: session, status } = useSession();
    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(session)}
            </pre>
            <pre>
                {JSON.stringify(status)}
            </pre>
        </div>
    )
}