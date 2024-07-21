import Task from "@/components/Task";

function TaskPage({ params }: { params: { taskId: string } }) {
    return (
        <Task taskId={params.taskId}></Task>
    );
}

export default TaskPage;
