import Link from "next/link";

async function getProject(projectId: string) {
    const res = await fetch(`http://localhost:4000/projects/${projectId}`)
    const { data } = await res.json()
    return data
}

async function Project({ projectId }: { projectId: string}) {

    const project = await getProject(projectId);

    
    console.log(project);

    return (
        <div className="flex flex-col gap-4">
            <h1>Project</h1>
            <pre>{JSON.stringify(project)}</pre>

        </div>
    )
}

export default Project;