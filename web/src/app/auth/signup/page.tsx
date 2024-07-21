'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUp() {

    const router = useRouter();

    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const resSignIn = await signIn('credentials', {
                identifier: formData.email,
                password: formData.password,
            })

            if(resSignIn?.ok) return router.push('/');

        } catch (error: any) { setError(error?.message || ''); }
    }

    return (
        <div className='bg-white p-8 rounded-lg min-w-96 m-4 shadow-md gap-4 flex flex-col'>
            {error && <p className='bg-red-400 text-white p-2'>{ error }</p>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label>Nombre</label>
                    <input
                        className='border-2 border-gray-300 rounded-md p-2'
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Apellido</label>
                    <input
                        className='border-2 border-gray-300 rounded-md p-2'
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Email</label>
                    <input
                        className='border-2 border-gray-300 rounded-md p-2'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label>Contraseña</label>
                    <input
                        className='border-2 border-gray-300 rounded-md p-2'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        
                    />
                </div>
                <button className='bg-blue-500 rounded p-2 text-white' type="submit">Guardar</button>
                <p className='text-center'>¿Ya tienes una cuenta? <a href="/auth/signin" className='text-blue-500'>Iniciar sesión</a></p>
            </form>
        </div>
    )
}
