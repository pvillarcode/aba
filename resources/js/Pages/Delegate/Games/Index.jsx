import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, games }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight italic">Gestión de Resultados</h2>}
        >
            <Head title="Mis Encuentros" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-3xl border border-slate-200">
                        <div className="p-8">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Todos los encuentros de tu club</h3>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Rama</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Fase</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Categoría</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Encuentro</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Resultado</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
                                            <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {games.map(game => (
                                            <tr key={game.id} className="group hover:bg-slate-50 transition-colors">
                                                <td className="py-6 text-sm font-bold text-slate-600 whitespace-nowrap">
                                                    {new Date(game.date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                                                </td>
                                                <td className="py-6">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${game.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {game.gender || 'Varones'}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${game.stage === 'regular' ? 'text-slate-400 bg-slate-100' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'}`}>
                                                        {game.stage === 'regular' ? 'Regular' : game.stage === 'quarter' ? 'Cuartos' : game.stage === 'semi' ? 'Semi' : 'Final'}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase italic">{game.category}</span>
                                                </td>
                                                <td className="py-6">
                                                    <div className="flex items-center gap-3">
                                                        <span className={game.home_club_id == auth.user.club_id ? 'font-black text-slate-900 underline decoration-orange-500' : 'font-medium text-slate-500'}>
                                                            {game.home_club.name}
                                                        </span>
                                                        <span className="text-slate-300 italic text-xs">vs</span>
                                                        <span className={game.away_club_id == auth.user.club_id ? 'font-black text-slate-900 underline decoration-orange-500' : 'font-medium text-slate-500'}>
                                                            {game.away_club.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-6 text-center">
                                                    {game.status === 'finished' ? (
                                                        <div className="bg-slate-900 text-white inline-block px-4 py-1.5 rounded-full font-black tracking-widest text-lg shadow-lg">
                                                            {game.home_score} - {game.away_score}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-300 italic font-medium">Pendiente</span>
                                                    )}
                                                </td>
                                                <td className="py-6">
                                                    {game.status === 'finished' ? (
                                                        <span className="text-[10px] font-black uppercase text-green-500 bg-green-50 px-2 py-1 rounded">Finalizado</span>
                                                    ) : (
                                                        <span className="text-[10px] font-black uppercase text-orange-500 bg-orange-50 px-2 py-1 rounded">Agendado</span>
                                                    )}
                                                </td>
                                                <td className="py-6 text-right">
                                                    <Link 
                                                        href={route('delegate.games.edit', game.id)}
                                                        className="inline-flex items-center px-6 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Cargar Resultado
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
