import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Index({ auth, seasons, flash, errors }) {
    const { data, setData, post, processing, reset } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.seasons.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight italic text-orange-600 tracking-tighter uppercase">Configuración de Campeonatos</h2>}
        >
            <Head title="Admin - Temporadas" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    
                    {flash.error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-4">
                            <p className="text-sm text-red-700 font-bold uppercase tracking-tight">{flash.error}</p>
                        </div>
                    )}

                    {errors.error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-4">
                            <p className="text-sm text-red-700 font-bold uppercase tracking-tight">{errors.error}</p>
                        </div>
                    )}

                    {flash.message && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl mb-4">
                            <p className="text-sm text-green-700 font-bold uppercase tracking-tight">{flash.message}</p>
                        </div>
                    )}
                    
                    {/* Create Season Form */}
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-200">
                        <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter flex items-center gap-4">
                            <span className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center italic text-lg shadow-lg shadow-orange-600/20">+</span>
                            Nuevo Campeonato
                        </h3>
                        <form onSubmit={submit} className="flex gap-4">
                            <input 
                                type="text" 
                                placeholder="Ej: LIGA ABA 2025" 
                                className="grow rounded-2xl border-slate-200 text-sm font-bold p-4 focus:ring-orange-600 focus:border-orange-600" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                required 
                            />
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-slate-900 text-white px-10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95"
                            >
                                CREAR TEMPORADA
                            </button>
                        </form>
                    </div>

                    {/* Seasons List */}
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50">
                                <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                    <th className="px-8 py-5 text-left">Nombre del Campeonato</th>
                                    <th className="px-8 py-5 text-center">Estado</th>
                                    <th className="px-8 py-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {seasons.map(s => (
                                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className={`text-lg font-black uppercase tracking-tighter ${s.active ? 'text-orange-600' : 'text-slate-400'}`}>
                                                {s.name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {s.active ? (
                                                <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-green-100 italic flex items-center justify-center gap-2 mx-auto w-fit">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                                    Campeonato Activo
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-black text-slate-300 uppercase italic">Finalizado / Inactivo</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-2">
                                            {!s.active && (
                                                <button 
                                                    onClick={() => { if(confirm('Activar este campeonato como principal?')) router.post(route('admin.seasons.activate', s.id)) }}
                                                    className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    Activar
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => { if(confirm('Eliminar? Se borrarán todos los partidos asociados.')) router.delete(route('admin.seasons.destroy', s.id)) }}
                                                className="px-4 py-2 text-slate-300 hover:text-red-500 transition-colors text-xs"
                                            >
                                                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
