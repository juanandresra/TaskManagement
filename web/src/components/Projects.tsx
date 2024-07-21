import Link from "next/link";

async function getProjects() {
    const res = await fetch('http://localhost:4000/projects')
    const { data } = await res.json()
    return data
}

async function Projects() {

    const projects = await getProjects();

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {projects.map((project: any) => (
                    <div className="bg-red-200 rounded p-4 flex flex-col gap-4" key={project.id}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <Link href={"/project/" + project.id} >Ver</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects;