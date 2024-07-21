import Project from "@/components/Project";

function ProjectPage({ params }: { params: { projectId: string } }) {
    return (        
        <Project projectId={params.projectId}></Project>
    );
}

export default ProjectPage;
