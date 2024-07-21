"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { IoIosArrowBack } from "react-icons/io";

async function createTask(task: { title: string; description: string; dueDate: string }, projectId: string) {

    task.dueDate = new Date(task.dueDate).toISOString();
    const session: any = await getSession();
    const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ ...task, projectId })
    });
    const { data } = await res.json();
    return data;
}

async function getProject(projectId: string) {
    const session: any = await getSession();
    const res = await fetch(`http://localhost:4000/projects/${projectId}`, {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    })
    const { data } = await res.json()
    return data
}

const Project = ({ projectId }: { projectId: string }) => {

    const [project, setProject] = useState<any>();

    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

    useEffect(() => {
        const fetchProject = async () => {
            const projectData: any = await getProject(projectId);
            setProject(projectData);
        };
        fetchProject();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTask(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const createdTask = await createTask(newTask, projectId);
        setNewTask({ title: '', description: '', dueDate: '' });
        const projectData: any = await getProject(projectId);
        setProject(projectData);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
                <Link href={'/'}>
                    <IoIosArrowBack />
                </Link>
                <h1>Proyecto | {project?.name} </h1>
            </div>
            <div className="grid grid-cols-3 gap-4">

                <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
                    <form className="flex flex-col text-sm" onSubmit={handleCreateProject}>
                        <input
                            className="border rounded p-2 mb-2"
                            type="text"
                            name="title"
                            placeholder="Nombre de la tarea"
                            value={newTask.title}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            className="border rounded p-2 mb-2"
                            name="description"
                            placeholder="Descripción de la tarea"
                            value={newTask.description}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            className="border rounded p-2 mb-2"
                            type="datetime-local"
                            name="dueDate"
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="bg-blue-500 text-white rounded p-2" type="submit">Crear Tarea</button>
                    </form>
                </div>
                {project?.tasks.map((task: any) => (
                    <Link className="bg-white shadow rounded p-4 flex flex-col gap-2" key={task.id} href={"/task/" + task.id}>
                        <h2 className="font-semibold">{task.title}</h2>
                        <p className="text-sm">{task.description}</p>
                        {
                            task.assignedTo != null ?
                                <p className="text-sm">Usuario: {task.assignedTo.firstName} {task.assignedTo.lastName}</p>
                                : task.team != null ? <p className="text-sm">Equipo: {task.team.name}</p>
                                    : <p className="text-sm">Tarea no asignada</p>
                        }
                        <p className="text-sm">Limite: {new Date(task.dueDate).toLocaleString()}</p>
                        <p className="text-sm text-gray-700">Creado: {new Date(task.createdAt).toLocaleString()}</p>
                        <p className={`p-1 rounded text-xs ${task.status == 'IN_PROGRESS' ? 'bg-amber-700' : task.status == 'TODO' ? 'bg-slate-700' : 'bg-green-700'} text-white`}>{task.status == 'IN_PROGRESS' ? 'En progreso' : task.status == 'TODO' ? 'Por hacer' : 'Completada'}</p>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default Project;