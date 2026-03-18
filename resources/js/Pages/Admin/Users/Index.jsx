import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, users, clubs }) {
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, put, processing, reset } = useForm({
        role: '',
        club_id: ''
    });

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setData({
            role: user.role,
            club_id: user.club_id || ''
        });
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', editingUser), {
            onSuccess: () => {
                setEditingUser(null);
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight">Gestión de Usuarios</h2>}
        >
            <Head title="Admin - Usuarios" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                        <div className="p-6 text-slate-900">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                        <th className="px-6 py-4 text-left">Usuario</th>
                                        <th className="px-6 py-4 text-left">Email</th>
                                        <th className="px-6 py-4 text-center">Rol</th>
                                        <th className="px-6 py-4 text-center">Club Asignado</th>
                                        <th className="px-6 py-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 text-sm">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {editingUser === user.id ? (
                                                    <select 
                                                        className="p-1 border rounded text-sm"
                                                        value={data.role}
                                                        onChange={e => setData('role', e.target.value)}
                                                    >
                                                        <option value="admin">Admin</option>
                                                        <option value="delegate">Delegado</option>
                                                        <option value="public">Público</option>
                                                    </select>
                                                ) : (
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                                                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                                                        user.role === 'delegate' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {editingUser === user.id ? (
                                                    <select 
                                                        className="p-1 border rounded text-sm w-full max-w-[150px]"
                                                        value={data.club_id}
                                                        onChange={e => setData('club_id', e.target.value)}
                                                    >
                                                        <option value="">Ninguno</option>
                                                        {clubs.map(club => (
                                                            <option key={club.id} value={club.id}>{club.name}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="text-sm font-medium text-slate-600">
                                                        {user.club?.name || '-'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {editingUser === user.id ? (
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={submit}
                                                            disabled={processing}
                                                            className="text-xs bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-700 font-bold"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button 
                                                            onClick={() => setEditingUser(null)}
                                                            className="text-xs bg-slate-200 text-slate-600 px-3 py-1 rounded hover:bg-slate-300 font-bold"
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleEdit(user)}
                                                        className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
