"use client";

import Link from "next/link";
import Comments from "./Comments";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

async function getTask(taskId: string) {
    const session: any = await getSession();
    const res = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data;
}

async function getUsers() {
    const session: any = await getSession();
    const res = await fetch(`http://localhost:4000/users`, {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data;
}

async function getTeams() {
    const session: any = await getSession();
    const res = await fetch(`http://localhost:4000/teams`, {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data;
}

async function assign(taskId: string, id: string, type: 'user' | 'team') {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/tasks/${taskId}/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            [type + 'Id']: id
        })
    });
}

async function unassign(taskId: string) {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/tasks/${taskId}/unassign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        }
    });
}

async function updateStatus(taskId: string, status: string) {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ status })
    });
}

const Task = ({ taskId }: { taskId: string }) => {
    const [task, setTask] = useState<any | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [assigning, setAssigning] = useState<'user' | 'team' | null>(null);
    const [selectedId, setSelectedId] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const taskData = await getTask(taskId);
            setTask(taskData);
            setStatus(taskData.status);

            const usersData = await getUsers();
            setUsers(usersData);

            const teamsData = await getTeams();
            setTeams(teamsData);
        };

        fetchData();
    }, [taskId]);

    const handleAssign = async () => {
        if (assigning && selectedId) {
            await assign(taskId, selectedId, assigning);
            const updatedTask = await getTask(taskId);
            setTask(updatedTask);
            setAssigning(null);
            setSelectedId('');
        }
    };

    const handleUnassign = async () => {
        await unassign(taskId);
        const updatedTask = await getTask(taskId);
        setTask(updatedTask);
    };

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        await updateStatus(taskId, newStatus);
        setStatus(newStatus);
    };

    if (!task) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                    <Link href={`/project/${task?.projectId}`}>
                        <IoIosArrowBack />
                    </Link>
                    <h1>Tarea | {task.title}</h1>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="p-1 rounded border border-gray-300"
                    >
                        <option value="TODO">Por hacer</option>
                        <option value="IN_PROGRESS">En progreso</option>
                        <option value="COMPLETED">Completada</option>
                    </select>
                    <p className={`p-1 font-normal w-fit rounded text-xs ${status === 'IN_PROGRESS' ? 'bg-amber-600' : status === 'TODO' ? 'bg-slate-700' : 'bg-green-700'} text-white`}>
                        {status === 'IN_PROGRESS' ? 'En progreso' : status === 'TODO' ? 'Por hacer' : 'Completada'}
                    </p>
                </div>
                <div className="bg-white p-2 shadow rounded">
                    <p>{task.description}</p>
                    <p>Fecha limite: {new Date(task.dueDate).toLocaleString()}</p>
                    {task.assignedTo || task.team ? (
                        <div className="flex flex-row gap-2 items-center">
                            <span>
                                Asignado:{" "}
                                {task.assignedTo
                                    ? task.assignedTo.firstName + " " + task.assignedTo.lastName + " (" + task.assignedTo.email + ")"
                                    : task.team.name}

                            </span>
                            {task.assignedTo || task.team ? (
                                <button onClick={handleUnassign} className="underline hover:text-red-500">
                                    Desasignar
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        <div>
                            <p>Tarea no asignada</p>
                            <div className="flex flex-col gap-2">
                                <h3>Asignar a Usuario:</h3>
                                <select onChange={(e) => { setAssigning('user'); setSelectedId(e.target.value); }}>
                                    <option value="">Selecciona un usuario</option>
                                    {users.map((user: any) => (
                                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                    ))}
                                </select>
                                <h3>Asignar a Equipo:</h3>
                                <select onChange={(e) => { setAssigning('team'); setSelectedId(e.target.value); }}>
                                    <option value="">Selecciona un equipo</option>
                                    {teams.map((team: any) => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                                <button className='bg-blue-600 text-white p-2 rounded' onClick={handleAssign} disabled={!assigning || !selectedId}>
                                    Asignar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <hr />
            <h1>Comments</h1>
            <Comments taskId={taskId} />
        </div>
    );
};

export default Task;
