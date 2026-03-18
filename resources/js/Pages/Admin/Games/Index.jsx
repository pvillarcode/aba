import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, games, clubs, seasons, activeSeasonId }) {
    const [editingGame, setEditingGame] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [showQuarters, setShowQuarters] = useState(false);

    const { data, setData, put, post, processing, reset, errors } = useForm({
        home_club_id: '',
        away_club_id: '',
        home_score: 0,
        away_score: 0,
        status: 'scheduled',
        // Fecha y hora (para controlar la hora que se muestra en Próximos Juegos)
        date: new Date().toISOString().slice(0, 16), // formato compatible con datetime-local
        category: 'U19',
        gender: 'Varones',
        home_q1: '', home_q2: '', home_q3: '', home_q4: '',
        away_q1: '', away_q2: '', away_q3: '', away_q4: '',
        delegate_comments: '',
        stage: 'regular',
        season_id: activeSeasonId || ''
    });

    const handleEdit = (game) => {
        setIsCreating(false);
        setEditingGame(game.id);
        setShowQuarters(!!game.home_q1);
        setData({
            home_club_id: game.home_club_id,
            away_club_id: game.away_club_id,
            home_score: game.home_score || 0,
            away_score: game.away_score || 0,
            status: game.status,
            // preservar fecha y hora existentes
            date: new Date(game.date).toISOString().slice(0, 16),
            category: game.category || 'U19',
            gender: game.gender || 'Varones',
            home_q1: game.home_q1 || '',
            home_q2: game.home_q2 || '',
            home_q3: game.home_q3 || '',
            home_q4: game.home_q4 || '',
            away_q1: game.away_q1 || '',
            away_q2: game.away_q2 || '',
            away_q3: game.away_q3 || '',
            away_q4: game.away_q4 || '',
            delegate_comments: game.delegate_comments || '',
            stage: game.stage || 'regular',
            season_id: game.season_id || activeSeasonId || ''
        });
    };

    const handleCreate = () => {
        setEditingGame(null);
        setIsCreating(true);
        reset();
        setData({
            home_club_id: clubs[0]?.id || '',
            away_club_id: clubs[1]?.id || '',
            home_score: 0,
            away_score: 0,
            status: 'scheduled',
            date: new Date().toISOString().slice(0, 16),
            category: 'U19',
            gender: 'Varones',
            home_q1: '', home_q2: '', home_q3: '', home_q4: '',
            away_q1: '', away_q2: '', away_q3: '', away_q4: '',
            delegate_comments: '',
            stage: 'regular',
            season_id: activeSeasonId || ''
        });
    };

    const submit = (e) => {
        e.preventDefault();
        if (isCreating) {
            post(route('admin.games.store'), {
                onSuccess: () => { setIsCreating(false); reset(); }
            });
        } else {
            put(route('admin.games.update', editingGame), {
                onSuccess: () => { setEditingGame(null); reset(); }
            });
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-slate-800 leading-tight italic">Gestión de Encuentros</h2>
                    <div className="flex gap-4">
                        <Link href={route('admin.seasons.index')} className="bg-white text-slate-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all">Configurar Temporadas</Link>
                        <button 
                            onClick={handleCreate}
                            className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                            + Nuevo Encuentro
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Admin - Encuentros" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    
                    {/* Create or Edit Form Container */}
                    {(isCreating || editingGame) && (
                        <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-200 animate-in fade-in slide-in-from-top-4">
                            <h3 className="text-xl font-black text-slate-800 mb-8 uppercase tracking-tighter">
                                {isCreating ? 'CREAR ENCUENTRO' : `EDITANDO ENCUENTRO ${editingGame}`}
                            </h3>
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    {/* GENDER & PHASE SELECTION */}
                                    <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 flex gap-12">
                                        <div className="space-y-4 grow">
                                            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">Rama / Liga</label>
                                            <div className="flex gap-2">
                                                {['Varones', 'Damas'].map(g => (
                                                    <button 
                                                        key={g}
                                                        type="button"
                                                        onClick={() => setData('gender', g)}
                                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${data.gender === g ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-indigo-400 border border-indigo-100'}`}
                                                    >
                                                        {g}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4 grow">
                                            <label className="text-xs font-black text-indigo-400 uppercase tracking-widest block">Fase del Torneo</label>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    {id: 'regular', label: 'Regular'},
                                                    {id: 'quarter', label: 'Cuartos'},
                                                    {id: 'semi', label: 'Semi'},
                                                    {id: 'third', label: '3er Lugar'},
                                                    {id: 'final', label: 'Final'}
                                                ].map(s => (
                                                    <button 
                                                        key={s.id}
                                                        type="button"
                                                        onClick={() => setData('stage', s.id)}
                                                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${data.stage === s.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-indigo-400 border border-indigo-100 hover:bg-indigo-50'}`}
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEASON SELECTION */}
                                    <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100">
                                        <label className="text-xs font-black text-orange-400 uppercase tracking-widest block mb-4">Campeonato / Temporada</label>
                                        <select 
                                            className="w-full rounded-xl border-orange-200 text-sm font-bold bg-white"
                                            value={data.season_id}
                                            onChange={e => setData('season_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Seleccionar Campeonato...</option>
                                            {seasons.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} {s.active ? '(ACTIVA)' : ''}</option>
                                            ))}
                                        </select>
                                        {seasons.length === 0 && <p className="text-[10px] text-orange-600 font-bold mt-2 uppercase">⚠️ Debes crear una temporada primero</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase">Club Local</label>
                                        <select 
                                            className="w-full rounded-2xl border-slate-200 text-sm font-bold p-3"
                                            value={data.home_club_id}
                                            onChange={e => setData('home_club_id', e.target.value)}
                                            required
                                            disabled={!!editingGame}
                                        >
                                            {clubs.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2 text-center flex flex-col justify-end pb-4 font-black text-2xl italic text-slate-200">VS</div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase">Club Visitante</label>
                                        <select 
                                            className="w-full rounded-2xl border-slate-200 text-sm font-bold p-3"
                                            value={data.away_club_id}
                                            onChange={e => setData('away_club_id', e.target.value)}
                                            required
                                            disabled={!!editingGame}
                                        >
                                            {clubs.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
                                        </select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">FECHA Y HORA</label>
                                        <input
                                            type="datetime-local"
                                            className="w-full rounded-2xl border-slate-200 text-sm font-bold p-3"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">CATEGORÍA</label>
                                        <select className="w-full rounded-2xl border-slate-200 text-sm font-bold p-3" value={data.category} onChange={e => setData('category', e.target.value)} required>
                                            <option value="U11">U11</option><option value="U13">U13</option><option value="U15">U15</option><option value="U17">U17</option><option value="U19">U19</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ESTADO</label>
                                        <select className="w-full rounded-2xl border-slate-200 text-sm font-bold p-3" value={data.status} onChange={e => setData('status', e.target.value)} required>
                                            <option value="scheduled">Programado</option><option value="finished">Finalizado</option><option value="canceled">Cancelado</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Score Inputs (only if not scheduled) */}
                                {(data.status === 'finished' || editingGame) && (
                                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-sm font-black text-slate-800 uppercase italic">Resultado del Encuentro</h4>
                                            <button 
                                                type="button" 
                                                onClick={() => setShowQuarters(!showQuarters)}
                                                className={`text-[10px] font-black uppercase px-3 py-1 rounded-full transition-all ${showQuarters ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                                            >
                                                {showQuarters ? 'Omitir Cuartos' : 'Añadir Cuartos'}
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-12 justify-center">
                                            <div className="text-center">
                                                <label className="block text-[10px] uppercase font-black text-slate-400 mb-1">LOCAL</label>
                                                <input type="number" className="w-24 text-center text-3xl font-black rounded-2xl border-slate-200 p-4" value={data.home_score} onChange={e=>setData('home_score', e.target.value)} readOnly={showQuarters} />
                                            </div>
                                            <div className="font-black text-4xl text-slate-200">-</div>
                                            <div className="text-center">
                                                <label className="block text-[10px] uppercase font-black text-slate-400 mb-1">VISITA</label>
                                                <input type="number" className="w-24 text-center text-3xl font-black rounded-2xl border-slate-200 p-4" value={data.away_score} onChange={e=>setData('away_score', e.target.value)} readOnly={showQuarters} />
                                            </div>
                                        </div>

                                        {showQuarters && (
                                            <div className="grid grid-cols-4 gap-4 mt-6">
                                                {[1,2,3,4].map(q => (
                                                    <div key={q} className="bg-white p-4 rounded-2xl border border-slate-100">
                                                        <p className="text-center text-[8px] font-black text-slate-400 uppercase mb-2">{q}º Cuarto</p>
                                                        <div className="flex gap-2">
                                                            <input type="number" placeholder="L" className="w-full text-center border-slate-100 rounded-lg text-xs" value={data[`home_q${q}`]} onChange={e => {
                                                                const val = e.target.value;
                                                                setData(d => {
                                                                    const next = {...d};
                                                                    next[`home_q${q}`] = val;
                                                                    next.home_score = (parseInt(next.home_q1)||0)+(parseInt(next.home_q2)||0)+(parseInt(next.home_q3)||0)+(parseInt(next.home_q4)||0);
                                                                    return next;
                                                                });
                                                            }} />
                                                            <input type="number" placeholder="V" className="w-full text-center border-slate-100 rounded-lg text-xs" value={data[`away_q${q}`]} onChange={e => {
                                                                const val = e.target.value;
                                                                setData(d => {
                                                                    const next = {...d};
                                                                    next[`away_q${q}`] = val;
                                                                    next.away_score = (parseInt(next.away_q1)||0)+(parseInt(next.away_q2)||0)+(parseInt(next.away_q3)||0)+(parseInt(next.away_q4)||0);
                                                                    return next;
                                                                });
                                                            }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comentarios (Visibles solo para delegados y admin)</label>
                                    <textarea className="w-full rounded-2xl border-slate-200 text-sm font-medium h-24 mt-2" value={data.delegate_comments} onChange={e => setData('delegate_comments', e.target.value)} placeholder="Ej: Hubo problemas con el tablero electrónico..." />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsCreating(false); setEditingGame(null); }}
                                        className="px-8 py-3 bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                                    >
                                        CANCELAR
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all"
                                    >
                                        {isCreating ? 'CREAR ENCUENTRO' : 'GUARDAR CAMBIOS'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-[2rem] border border-slate-200">
                        <div className="p-0 overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                        <th className="px-8 py-6 text-left">Fecha</th>
                                        <th className="px-6 py-6 text-center">Rama</th>
                                        <th className="px-6 py-6 text-center">Encuentro</th>
                                        <th className="px-6 py-6 text-center">Score</th>
                                        <th className="px-6 py-6 text-center">Categoría</th>
                                        <th className="px-6 py-6 text-center">Camp.</th>
                                        <th className="px-6 py-6 text-center">Fase</th>
                                        <th className="px-8 py-6 text-right">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-50">
                                    {games.map((game) => (
                                        <tr key={game.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-400">
                                                {new Date(game.date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${game.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {game.gender || 'Varones'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <div className="flex items-center justify-center gap-4">
                                                    <span className="font-black text-slate-800 text-sm uppercase tracking-tighter">{game.home_club?.name}</span>
                                                    <span className="text-[10px] font-black text-slate-200 italic">VS</span>
                                                    <span className="font-black text-slate-800 text-sm uppercase tracking-tighter">{game.away_club?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl inline-flex items-center gap-2 font-black text-sm shadow-xl shadow-slate-900/10">
                                                    <span className={game.home_score > game.away_score ? 'text-orange-400' : ''}>{game.home_score ?? 0}</span>
                                                    <span className="text-slate-600">/</span>
                                                    <span className={game.away_score > game.home_score ? 'text-orange-400' : ''}>{game.away_score ?? 0}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg text-[10px] font-black italic uppercase">{game.category}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className="text-[9px] font-black uppercase text-slate-400">{game.season?.name || '-'}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${game.stage === 'regular' ? 'text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'}`}>
                                                    {game.stage === 'regular' ? 'Regular' : game.stage === 'quarter' ? 'Cuartos' : game.stage === 'semi' ? 'Semi' : game.stage === 'third' ? '3er Lugar' : 'Final'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button 
                                                    onClick={() => handleEdit(game)}
                                                    className="p-2 text-slate-300 hover:text-orange-600 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2.5"></path></svg>
                                                </button>
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
