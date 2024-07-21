"use client";

import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

    const { data: session, status } = useSession();
    const user = session?.user;

    return (
        <nav className='bg-zinc-900 text-white p-4'>
            <div className='flex justify-between container mx-auto'>
                <Link href="/">
                    <h1 className="font-bold text-xl">Proyectos prueba</h1>
                </Link>
                <ul className='flex gap-x-2'>
                    {
                        session ? (
                            <>
                                <li className="px-3 py-1">
                                    <Link href="/">
                                        Proyectos
                                    </Link>
                                </li>
                                <li className="px-3 py-1">
                                    <Link href="/team">
                                        Equipos
                                    </Link>
                                </li>
                                <li onClick={() => signOut()} className="px-3 py-1 cursor-pointer">
                                    Cerrar sesión
                                </li>
                            </>

                        ) : (
                            <>
                                <li className="px-3 py-1">
                                    <Link href="/auth/signin">
                                        Inicio de sesión
                                    </Link>
                                </li>
                                <li className="px-3 py-1">
                                    <Link href="/auth/signup">
                                        Registro
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}