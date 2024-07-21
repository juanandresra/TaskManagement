"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSession } from 'next-auth/react';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

const socketUrl = 'http://localhost:4000/comments';

interface Notification {
    id: string;
    message: string;
}

const Notification = () => {
    const { data: session, status } = useSession();
    const user: any = session?.user;
    const [socket, setSocket] = useState<any>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (status === 'authenticated' && user) {
            const socket = io(socketUrl);

            socket.on('connect', () => {
                const userId = user.id;
                socket.emit('join-user', { userId });
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from socket server');
            });

            socket.on('notification', (notification: any) => {
                const newNotification: Notification = { id: uuidv4(), message: notification.message };                
                setNotifications(prev => [...prev, newNotification]);
                setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
                }, 10000);
            });

            setSocket(socket);

            return () => {
                socket.disconnect();
            };
        }
    }, [status, session]);

    return (
        <div className="notification-container absolute right-0 bottom-0 p-4">
            {notifications.length > 0 && (
                <ul>
                    {notifications.map((notification) => (
                        <li className="bg-white p-4 rounded shadow mb-2" key={notification.id}>
                            {notification.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;
