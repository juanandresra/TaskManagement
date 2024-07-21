"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface CommentProps {
    comment: {
        id: string;
        content: string;
        createdAt: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    };
    onCommentDeleted: (commentId: string) => void;
    onCommentUpdated: (commentId: string, content: string) => void;
}

const Comment = ({ comment, onCommentDeleted, onCommentUpdated }: CommentProps) => {
    const { data: session } = useSession();
    const user: any = session?.user;

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editContent, setEditContent] = useState<string>(comment.content);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditContent(comment.content);
    };

    const handleSaveClick = async () => {
        if (editContent.trim() === "") return;

        const updatedComment = { content: editContent };

        const res = await fetch(`http://localhost:4000/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`,
            },
            body: JSON.stringify(updatedComment),
        });

        if (res.ok) {
            setIsEditing(false);
            onCommentUpdated(comment.id, editContent)
        } else {
            console.error('Failed to update comment');
        }
    };

    const handleDeleteClick = async () => {
        if (confirm("Seguro que quieres borrar este comentario?")) {
            const res = await fetch(`http://localhost:4000/comments/${comment.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                },
            });

            if (res.ok) {
                onCommentDeleted(comment.id);
            } else {
                console.error('Failed to delete comment');
            }
        }
    };

    return (
        <div key={comment.id} className='w-full flex-col flex gap-2'>
            {isEditing ? (
                <textarea className='border-2 border-gray-300 rounded-md p-2' value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            ) : (
                <h3>{comment.content}</h3>
            )}
            <p className='text-sm'>Creado por {comment.user.firstName} {comment.user.lastName} - {new Date(comment.createdAt).toLocaleString()}</p>
            {user?.id === comment.user.id && (
                <div>
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveClick} className="bg-blue-600 text-white p-1 text-sm rounded mr-2">Guardar</button>
                            <button onClick={handleCancelClick} className="bg-gray-600 text-white p-1 text-sm  rounded">Cancelar</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEditClick} className="bg-yellow-500 text-white p-1 text-sm rounded mr-2">Editar</button>
                            <button onClick={handleDeleteClick} className="bg-red-600 text-white p-1 text-sm rounded">Eliminar</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Comment;
