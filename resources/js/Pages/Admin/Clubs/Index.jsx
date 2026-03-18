import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, clubs }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-slate-800 leading-tight">Clubes Afiliados</h2>
                    <Link href={route('admin.clubs.create')} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all">+ Nuevo Club</Link>
                </div>
            }
        >
            <Head title="Admin - Clubes" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clubs.map(club => (
                            <div key={club.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                                <div className="p-6 relative">
                                    {/* Trophy Badge in Index */}
                                    {club.trophies_count > 0 && (
                                        <div className="absolute top-4 right-4 bg-orange-50 text-orange-600 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-orange-100 animate-bounce-subtle">
                                            <span className="text-xs">🏆</span>
                                            <span className="text-[10px] font-black">{club.trophies_count}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100 overflow-hidden">
                                            {club.logo ? <img src={club.logo} alt={club.name} className="w-full h-full object-contain" /> : <span className="text-2xl font-black text-slate-200 uppercase">{club.name[0]}</span>}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">{club.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{club.players_count} JUGADORES REGISTRADOS</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium italic">"{club.description}"</p>
                                    <div className="flex items-center gap-2">
                                        <Link href={route('admin.clubs.edit', club.id)} className="grow text-center py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">GESTIONAR CLUB</Link>
                                        <Link href={route('public.clubs.show', club.id)} target="_blank" className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2.5"></path></svg></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
