import Project from "@/components/Project";

function ProjectPage({ params }: { params: { projectId: string } }) {
    return (
        <div>
            <h1>Project Page</h1>
            <Project projectId={params.projectId}></Project>
        </div>
    );
}

export default ProjectPage;
