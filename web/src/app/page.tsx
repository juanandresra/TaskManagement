import Projects from "@/components/Projects";
// import { useSession } from "next-auth/react";

export default function HomePage() {
    // const { data: session, status } = useSession();
    return (
        <div className="flex flex-col gap-4">
            <h1>Proyectos</h1>
            <Projects></Projects>
        </div>
    )
}