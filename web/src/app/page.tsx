import Projects from "@/components/Projects";
// import { useSession } from "next-auth/react";

export default function HomePage() {
    // const { data: session, status } = useSession();
    return (
        <div>
            {/* <pre>
                {JSON.stringify(session)}
            </pre> */}
            {/* <pre>
                {JSON.stringify(status)}
            </pre> */}
            <Projects></Projects>
        </div>
    )
}