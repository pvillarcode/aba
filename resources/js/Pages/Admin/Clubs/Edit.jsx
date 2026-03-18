import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, club }) {
    const isEditing = !!club.id;
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [editingCoach, setEditingCoach] = useState(null);

    const { data: clubData, setData: setClubData, put: updateClub, post: storeClub, processing: clubProcessing } = useForm({
        name: club.name || '',
        description: club.description || '',
        history: club.history || '',
        logo: club.logo || '',
        instagram_url: club.instagram_url || '',
        website_url: club.website_url || ''
    });

    const { data: playerData, setData: setPlayerData, post: storePlayer, put: updatePlayer, delete: destroyPlayer, processing: playerProcessing, reset: resetPlayer } = useForm({
        name: '',
        number: '',
        position: 'Jugador',
        category: 'U19',
        gender: 'Varones'
    });

    const { data: coachData, setData: setCoachData, post: storeCoach, put: updateCoach, delete: destroyCoach, processing: coachProcessing, reset: resetCoach } = useForm({
        name: '',
        role: 'Coach',
        category: [],
        gender: 'Varones'
    });

    const { data: trophyData, setData: setTrophyData, post: storeTrophy, delete: destroyTrophy, processing: trophyProcessing, reset: resetTrophy } = useForm({
        category: 'U19',
        year: new Date().getFullYear(),
        position: 1,
        type: 'cup',
        gender: 'Varones'
    });

    const handleClubSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateClub(route('admin.clubs.update', club.id));
        } else {
            storeClub(route('admin.clubs.store'));
        }
    };

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        if (editingPlayer) {
            updatePlayer(route('admin.clubs.players.update', [club.id, editingPlayer]), {
                onSuccess: () => { setEditingPlayer(null); resetPlayer(); }
            });
        } else {
            storePlayer(route('admin.clubs.players.store', club.id), {
                onSuccess: () => resetPlayer()
            });
        }
    };

    const handleCoachSubmit = (e) => {
        e.preventDefault();
        if (editingCoach) {
            updateCoach(route('admin.clubs.coaches.update', [club.id, editingCoach]), {
                onSuccess: () => { setEditingCoach(null); resetCoach(); }
            });
        } else {
            storeCoach(route('admin.clubs.coaches.store', club.id), {
                onSuccess: () => resetCoach()
            });
        }
    };

    const handleTrophySubmit = (e) => {
        e.preventDefault();
        storeTrophy(route('admin.clubs.trophies.store', club.id), {
            onSuccess: () => resetTrophy()
        });
    };

    const handleEditPlayer = (player) => {
        setEditingPlayer(player.id);
        setPlayerData({
            name: player.name,
            number: player.number,
            position: player.position || 'Jugador',
            category: player.category || 'U19',
            gender: player.gender || 'Varones'
        });
    };

    const handleEditCoach = (coach) => {
        setEditingCoach(coach.id);
        setCoachData({
            name: coach.name,
            role: coach.role,
            category: coach.category,
            gender: coach.gender || 'Varones'
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-slate-800 leading-tight">
                        {isEditing ? `Editando: ${club.name}` : 'Crear Nuevo Club'}
                    </h2>
                    <Link href={route('admin.clubs.index')} className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Volver al listado</Link>
                </div>
            }
        >
            <Head title={isEditing ? `Editar - ${club.name}` : 'Nuevo Club'} />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 pb-20">
                    
                    {/* Identidad Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Identidad del Club</h3>
                            <p className="text-sm text-slate-500 font-medium">Información básica y enlaces sociales.</p>
                        </div>
                        <form onSubmit={handleClubSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase">Nombre</label>
                                    <input type="text" className="w-full rounded-2xl border-slate-200 font-bold px-4 py-3" value={clubData.name} onChange={e => setClubData('name', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase">URL Logo</label>
                                    <input type="text" className="w-full rounded-2xl border-slate-200 font-bold px-4 py-3" value={clubData.logo} onChange={e => setClubData('logo', e.target.value)} placeholder="https://ejemplo.com/logo.png" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-pink-500 uppercase">Instagram URL</label>
                                    <input type="url" className="w-full rounded-2xl border-slate-200 font-bold px-4 py-3" value={clubData.instagram_url} onChange={e => setClubData('instagram_url', e.target.value)} placeholder="https://instagram.com/club" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-blue-500 uppercase">Sitio Web</label>
                                    <input type="url" className="w-full rounded-2xl border-slate-200 font-bold px-4 py-3" value={clubData.website_url} onChange={e => setClubData('website_url', e.target.value)} placeholder="https://club.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase">Descripción</label>
                                <textarea className="w-full rounded-2xl border-slate-200 font-medium h-24 px-4 py-3" value={clubData.description} onChange={e => setClubData('description', e.target.value)} required />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" disabled={clubProcessing} className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:bg-orange-600 transition-all active:scale-95">
                                    {isEditing ? 'GUARDAR CLUB' : 'CREAR CLUB'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {isEditing && (
                        <>
                            {/* Staff Section */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cuerpo Técnico</h3>
                                    <p className="text-sm text-slate-500 font-medium">Asigna personal por categorías y liga.</p>
                                </div>
                                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-1">
                                        <form onSubmit={handleCoachSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-black text-slate-400 uppercase">Nombre</label>
                                                <input type="text" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={coachData.name} onChange={e => setCoachData('name', e.target.value)} required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-black text-slate-400 uppercase">Rol</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={coachData.role} onChange={e => setCoachData('role', e.target.value)}>
                                                        <option value="Coach">Coach</option><option value="Asistente">Asistente</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-black text-slate-400 uppercase">Liga</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={coachData.gender} onChange={e => setCoachData('gender', e.target.value)}>
                                                        <option value="Varones">Varones</option><option value="Damas">Damas</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-black text-slate-400 uppercase">Categorías</label>
                                                <div className="grid grid-cols-3 gap-2 py-2">
                                                    {['U11', 'U13', 'U15', 'U17', 'U19'].map(cat => (
                                                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                                            <input 
                                                                type="checkbox" 
                                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                                                checked={coachData.category.includes(cat)}
                                                                onChange={e => {
                                                                    const newCats = e.target.checked 
                                                                        ? [...coachData.category, cat]
                                                                        : coachData.category.filter(c => c !== cat);
                                                                    setCoachData('category', newCats);
                                                                }}
                                                            />
                                                            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{cat}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <button type="submit" disabled={coachProcessing} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all">
                                                {editingCoach ? 'Actualizar Staff' : 'Agregar Staff'}
                                            </button>
                                        </form>
                                    </div>
                                    <div className="lg:col-span-2 space-y-3">
                                        {(club.coaches || []).map(coach => (
                                            <div key={coach.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black italic border border-indigo-100">{coach.role[0]}</div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{coach.name} <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ml-2 ${coach.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{coach.gender || 'Varones'}</span></p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{coach.role} • {Array.isArray(coach.category) ? coach.category.join(', ') : coach.category}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditCoach(coach)} className="p-2 text-slate-400 hover:text-indigo-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5"></path></svg></button>
                                                    <button onClick={() => { if(confirm('Eliminar staff?')) destroyCoach(route('admin.clubs.coaches.destroy', [club.id, coach.id])) }} className="p-2 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"></path></svg></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Trophy Section */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-8 border-b border-slate-100 bg-orange-50/30">
                                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-3">🏆 Palmarés y Logros</h3>
                                    <p className="text-sm text-slate-500 font-medium">Asigna logros por liga y categoría.</p>
                                </div>
                                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-1">
                                        <form onSubmit={handleTrophySubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Año</label>
                                                    <input type="number" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.year} onChange={e => setTrophyData('year', e.target.value)} min="2025" max={new Date().getFullYear()} required />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Liga</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.gender} onChange={e => setTrophyData('gender', e.target.value)}>
                                                        <option value="Varones">Varones</option><option value="Damas">Damas</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Posición</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.position} onChange={e => {
                                                        const p = parseInt(e.target.value);
                                                        setTrophyData(d => ({...d, position: p, type: p === 1 ? 'cup' : 'medal'}));
                                                    }}>
                                                        <option value="1">1º Campeón</option>
                                                        <option value="2">2º Sub-campeón</option>
                                                        <option value="3">3º Tercer Lugar</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cat</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.category} onChange={e => setTrophyData('category', e.target.value)}>
                                                        {['U11', 'U13', 'U15', 'U17', 'U19'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="submit" disabled={trophyProcessing} className="w-full py-3 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                                                ENTREGAR RECONOCIMIENTO
                                            </button>
                                        </form>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {club.trophies.map(trophy => (
                                                <div key={trophy.id} className="relative bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-center group">
                                                    <button 
                                                        onClick={() => { if(confirm('Eliminar trofeo?')) destroyTrophy(route('admin.clubs.trophies.destroy', [club.id, trophy.id])) }}
                                                        className="absolute top-2 right-2 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-black text-lg"
                                                    >×</button>
                                                    <div className="text-3xl mb-1">{Number(trophy.position) === 1 ? '🏆' : '🏅'}</div>
                                                    <div className="text-xs font-black text-slate-800 uppercase tracking-tighter">
                                                        {Number(trophy.position) === 1 ? 'Campeón' : Number(trophy.position) === 2 ? 'Sub-campeón' : '3º Lugar'}
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trophy.year} • {trophy.category}</div>
                                                    <div className={`mt-1 text-[8px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${trophy.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{trophy.gender || 'Varones'}</div>
                                                </div>
                                            ))}
                                            {club.trophies.length === 0 && (
                                                <div className="col-span-full py-10 text-center text-slate-300 italic text-sm font-bold uppercase">Sin reconocimientos registrados.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Roster Section */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden pb-10">
                                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Plantilla de Jugadores</h3>
                                    <p className="text-sm text-slate-500 font-medium">Gestión del roster integral.</p>
                                </div>
                                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-1">
                                        <form onSubmit={handlePlayerSubmit} className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-black text-slate-400 uppercase">Nombre</label>
                                                <input type="text" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.name} onChange={e => setPlayerData('name', e.target.value)} required />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-black text-slate-400 uppercase">CAT</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.category} onChange={e => setPlayerData('category', e.target.value)}>
                                                        <option value="U11">U11</option><option value="U13">U13</option><option value="U15">U15</option><option value="U17">U17</option><option value="U19">U19</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-black text-slate-400 uppercase">Liga</label>
                                                    <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.gender} onChange={e => setPlayerData('gender', e.target.value)}>
                                                        <option value="Varones">Varones</option><option value="Damas">Damas</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-black text-slate-400 uppercase">#</label>
                                                    <input type="number" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.number} onChange={e => setPlayerData('number', e.target.value)} required />
                                                </div>
                                            </div>
                                            <button type="submit" disabled={playerProcessing} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">
                                                {editingPlayer ? 'Actualizar Jugador' : 'Agregar Jugador'}
                                            </button>
                                        </form>
                                    </div>
                                    <div className="lg:col-span-2 space-y-3">
                                        {(club.players || []).map(player => (
                                            <div key={player.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm group">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs shadow-inner">#{player.number}</span>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm">{player.name} <span className="ml-2 text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-black">{player.category}</span> <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ml-1 ${player.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{player.gender || 'Varones'}</span></p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{player.position || 'Jugador'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button onClick={() => handleEditPlayer(player)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5"></path></svg></button>
                                                    <button onClick={() => { if(confirm('Eliminar jugador?')) destroyPlayer(route('admin.clubs.players.destroy', [club.id, player.id])) }} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"></path></svg></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
