"use client";

import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import Comment from "./Comment";


async function deleteComment(commentId: string) {
    const session: any = await getSession();
    await fetch(`http://localhost:4000/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${session?.user.token}` }

    });
}

const Comments = ({ taskId }: { taskId: string }) => {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function getComments(taskId: string) {
        const session: any = await getSession();
        const res = await fetch(`http://localhost:4000/tasks/${taskId}/comments`, {
            headers: { 'Authorization': `Bearer ${session?.user.token}` }
        });
        const { data } = await res.json();
        setComments(data);
    }

    useEffect(() => { getComments(taskId) }, [taskId]);

    async function handleAddComment(e: React.FormEvent<HTMLFormElement>) {
        const session: any = await getSession();
        e.preventDefault();
        if (newComment.trim() === "") return;
        setIsLoading(true);
        const commentData = { content: newComment, taskId: taskId };
        const res = await fetch('http://localhost:4000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user.token}`
            },
            body: JSON.stringify(commentData),
        });

        if (res.ok) {
            const newCommentFromServer = await res.json();
            getComments(taskId);
            setNewComment("");
        } else {
            console.error('Failed to add comment');
        }

        setIsLoading(false);
    }

    const handleCommentDeleted = (commentId: string) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const handleCommentUpdated = (commentId: string, content: string) => {
        const commentIndex = comments.findIndex(comment => comment.id === commentId);
        if (commentIndex === -1) return;
        const updatedComments = [...comments];
        updatedComments[commentIndex].content = content;
        setComments(updatedComments);
    };

    return (
        <div className='flex flex-col gap-4'>
            <form onSubmit={handleAddComment} className='flex flex-col gap-4'>
                <textarea
                    className='border-2 border-gray-300 rounded-md p-2'
                    placeholder="Nuevo comentario"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                />
                <button className='bg-blue-600 text-white p-2 rounded' type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar"}
                </button>
            </form>
            <div className="flex flex-col gap-4">
                {comments?.map((comment) => (
                    <Comment key={comment.id} comment={comment} onCommentDeleted={handleCommentDeleted} onCommentUpdated={handleCommentUpdated} />
                ))}
            </div>
        </div>
    );
}

export default Comments;
