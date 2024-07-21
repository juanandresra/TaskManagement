"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

async function getProjects() {
    const session: any = await getSession();
    const res = await fetch('http://localhost:4000/projects', {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data;
}

async function createProject(project: { name: string; description: string }) {
    const session: any = await getSession();
    const res = await fetch('http://localhost:4000/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify(project)
    });
    const { data } = await res.json();
    return data;
}

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsData = await getProjects();
            setProjects(projectsData);
        };

        fetchProjects();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const createdProject = await createProject(newProject);
        setProjects(prevProjects => [createdProject, ...prevProjects]);
        setNewProject({ name: '', description: '' });
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
                    <form className="flex flex-col text-sm" onSubmit={handleCreateProject}>
                        <input
                            className="border rounded p-2 mb-2"
                            type="text"
                            name="name"
                            placeholder="Nombre del Proyecto"
                            value={newProject.name}
                            onChange={handleInputChange}
                        />
                        <textarea
                            className="border rounded p-2 mb-2"
                            name="description"
                            placeholder="Descripción del Proyecto"
                            value={newProject.description}
                            onChange={handleInputChange}
                        />
                        <button className="bg-blue-500 text-white rounded p-2" type="submit">Crear Proyecto</button>
                    </form>
                </div>
                {projects?.map((project: any) => (
                    <Link className="bg-white shadow rounded p-4 flex flex-col gap-2" key={project.id} href={"/project/" + project.id}>
                        <h2 className="font-semibold">{project.name}</h2>
                        <p className="text-sm">{project.description}</p>
                        <p className="text-sm text-gray-700">{project.createdAt}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Projects;
