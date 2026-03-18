import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ auth, game }) {
    const [showQuarters, setShowQuarters] = useState(!!game.home_q1);

    const { data, setData, put, processing, errors } = useForm({
        home_score: game.home_score || 0,
        away_score: game.away_score || 0,
        status: game.status || 'finished',
        home_q1: game.home_q1 || '',
        home_q2: game.home_q2 || '',
        home_q3: game.home_q3 || '',
        home_q4: game.home_q4 || '',
        away_q1: game.away_q1 || '',
        away_q2: game.away_q2 || '',
        away_q3: game.away_q3 || '',
        away_q4: game.away_q4 || '',
        delegate_comments: game.delegate_comments || '',
    });

    useEffect(() => {
        if (showQuarters) {
            const hTotal = (parseInt(data.home_q1) || 0) + (parseInt(data.home_q2) || 0) + (parseInt(data.home_q3) || 0) + (parseInt(data.home_q4) || 0);
            const aTotal = (parseInt(data.away_q1) || 0) + (parseInt(data.away_q2) || 0) + (parseInt(data.away_q3) || 0) + (parseInt(data.away_q4) || 0);
            if (hTotal > 0 || aTotal > 0) {
                setData(d => ({...d, home_score: hTotal, away_score: aTotal}));
            }
        }
    }, [data.home_q1, data.home_q2, data.home_q3, data.home_q4, data.away_q1, data.away_q2, data.away_q3, data.away_q4]);

    const submit = (e) => {
        e.preventDefault();
        put(route('delegate.games.update', game.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-slate-800 leading-tight uppercase tracking-tighter italic">Cargar Resultado</h2>
                    <Link href={route('delegate.games.index')} className="text-sm font-bold text-slate-400 hover:text-orange-600 transition-colors uppercase tracking-[0.2em]">Volver</Link>
                </div>
            }
        >
            <Head title="Cargar Resultado" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white overflow-hidden shadow-2xl sm:rounded-[3rem] border border-slate-200 p-12">
                        
                        {/* Header Stats */}
                        <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex items-center justify-between mb-12 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
                            </div>
                            
                            <div className="flex-1 text-center">
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded mb-4 inline-block ${game.gender === 'Damas' ? 'bg-pink-100/20 text-pink-200' : 'bg-blue-100/20 text-blue-200'}`}>{game.gender || 'Varones'}</span>
                                <p className="text-xs uppercase font-black text-slate-400 mb-2">Local</p>
                                <h3 className="text-2xl font-black uppercase tracking-tight italic line-clamp-1">{game.home_club.name}</h3>
                            </div>
                            
                            <div className="px-8 text-center">
                                <div className="text-6xl font-black italic text-orange-500 transform -skew-x-12 mb-2">VS</div>
                                <span className="bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase px-3 py-1 rounded-full">{game.category}</span>
                            </div>
                            
                            <div className="flex-1 text-center">
                                <p className="text-xs uppercase font-black text-slate-400 mb-2">Visita</p>
                                <h3 className="text-2xl font-black uppercase tracking-tight italic line-clamp-1">{game.away_club.name}</h3>
                            </div>
                        </div>

                        {/* Main Score Inputs */}
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Puntos Local</label>
                                <input 
                                    type="number" 
                                    className="w-full text-center text-4xl font-black bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                                    value={data.home_score}
                                    onChange={e => setData('home_score', e.target.value)}
                                    readOnly={showQuarters}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-2 font-black">Puntos Visita</label>
                                <input 
                                    type="number" 
                                    className="w-full text-center text-4xl font-black bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all font-black"
                                    value={data.away_score}
                                    onChange={e => setData('away_score', e.target.value)}
                                    readOnly={showQuarters}
                                />
                            </div>
                        </div>

                        {/* Quarters Toggle */}
                        <div className="mb-8 border-t border-slate-100 pt-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Desglose por Cuartos <span className="text-xs font-bold text-slate-400 normal-case ml-2">(Opcional)</span></h3>
                                <button 
                                    type="button"
                                    onClick={() => setShowQuarters(!showQuarters)}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${showQuarters ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-slate-100 text-slate-400'}`}
                                >
                                    {showQuarters ? 'Habilitado' : 'Habilitar'}
                                </button>
                            </div>

                            {showQuarters && (
                                <div className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    {['1', '2', '3', '4'].map(q => (
                                        <div key={q} className="grid grid-cols-3 items-center gap-6">
                                            <input 
                                                type="number" 
                                                placeholder="Q local"
                                                className="w-full text-center font-bold rounded-xl border-slate-200 h-10 text-sm"
                                                value={data[`home_q${q}`]}
                                                onChange={e => setData(`home_q${q}`, e.target.value)}
                                            />
                                            <div className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{q}º Cuarto</div>
                                            <input 
                                                type="number" 
                                                placeholder="Q visita"
                                                className="w-full text-center font-bold rounded-xl border-slate-200 h-10 text-sm"
                                                value={data[`away_q${q}`]}
                                                onChange={e => setData(`away_q${q}`, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <p className="text-[10px] text-orange-600 font-bold italic text-center mt-4 uppercase">El puntaje total se calculará automáticamente</p>
                                </div>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="mb-12">
                            <label className="block text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 pl-2">Comentarios para Delegados y Admin <span className="text-slate-400 capitalize normal-case text-[10px] ml-1">(Privado)</span></label>
                            <textarea 
                                className="w-full rounded-[2rem] border-slate-200 bg-indigo-50/10 p-6 text-slate-700 font-medium italic min-h-[120px] focus:bg-white transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                placeholder="Escribe observaciones del encuentro, faltas técnicas, detalles del arbitraje, etc..."
                                value={data.delegate_comments}
                                onChange={e => setData('delegate_comments', e.target.value)}
                            />
                        </div>

                        {/* Status Toggle */}
                        <div className="mb-12 bg-slate-900/5 p-6 rounded-3xl flex items-center justify-between border border-slate-100">
                            <div>
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Estado del Encuentro</h4>
                                <p className="text-xs text-slate-500 font-medium">Al marcar como finalizado, el resultado será público.</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => setData('status', 'scheduled')}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.status === 'scheduled' ? 'bg-slate-300 text-white' : 'bg-slate-100 text-slate-400'}`}
                                >
                                    Agendado
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setData('status', 'finished')}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.status === 'finished' ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-slate-100 text-slate-400'}`}
                                >
                                    Finalizado
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-16 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95"
                            >
                                GUARDAR RESULTADO OFICIAL
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
