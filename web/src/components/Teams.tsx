"use client";

import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

async function getTeams() {
    const res = await fetch('http://localhost:4000/teams');
    const { data } = await res.json();
    return data;
}

async function getUsers() {
    const session: any = await getSession();
    const res = await fetch('http://localhost:4000/users', {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data;
}

async function getTeamMembers(teamId: string) {
    const session: any = await getSession();
    const res = await fetch(`http://localhost:4000/teams/${teamId}`, {
        headers: { 'Authorization': `Bearer ${session?.user.token}` }
    });
    const { data } = await res.json();
    return data.members;
}

async function assignMember(teamId: string, userId: string) {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/teams/${teamId}/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ userId })
    });
}

async function unassignMember(teamId: string, userId: string) {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/teams/${teamId}/unassign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ userId })
    });
}

async function createTeam(name: string) {
    const session: any = await getSession();
    const res = await fetch('http://localhost:4000/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ name })
    });
    const { data } = await res.json();
    return data;
}

const Teams = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTeamName, setNewTeamName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const teamsData = await getTeams();
            const usersData = await getUsers();
            setUsers(usersData);
            const teamsWithMembersData = await Promise.all(
                teamsData.map(async (team: any) => {
                    const members = await getTeamMembers(team.id);
                    return { ...team, members };
                })
            );
            setTeams(teamsWithMembersData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleAssignMember = async (teamId: string, userId: string) => {
        await assignMember(teamId, userId);
        setTeams(prevTeams => prevTeams.map(team =>
            team.id === teamId ? { ...team, members: [...team.members, users.find(user => user.id === userId)] } : team
        ));
    };

    const handleUnassignMember = async (teamId: string, userId: string) => {
        await unassignMember(teamId, userId);
        setTeams(prevTeams => prevTeams.map(team =>
            team.id === teamId ? { ...team, members: team.members.filter((member: any) => member.id !== userId) } : team
        ));
    };

    const handleCreateTeam = async () => {
        const newTeam = await createTeam(newTeamName);
        setTeams([{ ...newTeam, members: [] }, ...teams]);
        setNewTeamName("");
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 shadow bg-white p-4 rounded'>
                <h2>Crear nuevo equipo</h2>
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Nombre del equipo"
                    className="p-2 border rounded"
                />
                <button onClick={handleCreateTeam} className="p-2 bg-blue-500 text-white rounded">Crear</button>
            </div>
            {teams.map((team: any) => {
                const availableUsers = users?.filter(user => !team.members?.some((member: any) => member.id === user.id)) || [];
                return (
                    <div key={team.id} className='flex flex-col gap-4 shadow bg-white p-4 rounded'>
                        <h2>{team.name}</h2>
                        {team.members.length > 0 ?
                            <div className='flex flex-col gap-2'>
                                <h3>Usuarios:</h3>
                                <ul>
                                    {team.members?.map((member: any) => (
                                        <li key={member.id}>
                                            <div className='flex flex-row gap-2'>
                                                <span>{member.firstName} {member.lastName} ({member.email})</span>
                                                <button onClick={() => handleUnassignMember(team.id, member.id)}>Desasignar</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            : <p>Sin usuarios asignados</p>
                        }
                        {
                            availableUsers.length > 0 &&
                            <div className='flex flex-col gap-2'>
                                <h3>Asignar nuevos usuarios:</h3>
                                <ul>
                                    {availableUsers.map((user: any) => (
                                        <li key={user.id}>
                                            <div className='flex flex-row gap-2'>
                                                <span>{user.firstName} {user.lastName} ({user.email})</span>
                                                <button onClick={() => handleAssignMember(team.id, user.id)}>Asignar</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default Teams;
