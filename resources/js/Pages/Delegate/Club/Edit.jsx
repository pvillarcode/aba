import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, club }) {
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [editingCoach, setEditingCoach] = useState(null);

    const { data: clubData, setData: setClubData, put: updateClub, processing: clubProcessing } = useForm({
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
        updateClub(route('delegate.club.update'));
    };

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        if (editingPlayer) {
            updatePlayer(route('delegate.players.update', editingPlayer), {
                onSuccess: () => { setEditingPlayer(null); resetPlayer(); }
            });
        } else {
            storePlayer(route('delegate.players.store'), {
                onSuccess: () => resetPlayer()
            });
        }
    };

    const handleCoachSubmit = (e) => {
        e.preventDefault();
        if (editingCoach) {
            updateCoach(route('delegate.coaches.update', editingCoach), {
                onSuccess: () => { setEditingCoach(null); resetCoach(); }
            });
        } else {
            storeCoach(route('delegate.coaches.store'), {
                onSuccess: () => resetCoach()
            });
        }
    };

    const handleTrophySubmit = (e) => {
        e.preventDefault();
        storeTrophy(route('delegate.trophies.store'), {
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
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight">Gestionar Mi Club</h2>}
        >
            <Head title={`Gestionar - ${club.name}`} />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 pb-20">
                    
                    {/* Club Info Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Identidad del Club</h3>
                            <p className="text-sm text-slate-500 font-medium">Configura la información general.</p>
                        </div>
                        <form onSubmit={handleClubSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase">Nombre</label>
                                    <input type="text" className="w-full rounded-xl border-slate-200 font-bold" value={clubData.name} onChange={e => setClubData('name', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase">URL Logo</label>
                                    <input type="text" className="w-full rounded-xl border-slate-200 font-bold" value={clubData.logo} onChange={e => setClubData('logo', e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-black text-slate-400 uppercase">Descripción</label>
                                <textarea className="w-full rounded-xl border-slate-200 font-medium h-20" value={clubData.description} onChange={e => setClubData('description', e.target.value)} required />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" disabled={clubProcessing} className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10">GUARDAR CAMBIOS</button>
                            </div>
                        </form>
                    </div>

                    {/* Trophy Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-orange-50/30">
                            <h3 className="text-xl font-black text-orange-600 uppercase tracking-tighter flex items-center gap-3">
                                <span className="text-2xl">🏆</span> Salón de Trofeos
                            </h3>
                            <p className="text-sm text-orange-800 font-medium opacity-70">Asigna logros por liga y categoría.</p>
                        </div>
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 border-r border-slate-100 pr-8">
                                <form onSubmit={handleTrophySubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Categoría</label>
                                            <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.category} onChange={e => setTrophyData('category', e.target.value)}>
                                                <option value="U11">U11</option><option value="U13">U13</option><option value="U15">U15</option><option value="U17">U17</option><option value="U19">U19</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Liga</label>
                                            <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.gender} onChange={e => setTrophyData('gender', e.target.value)}>
                                                <option value="Varones">Varones</option><option value="Damas">Damas</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Año</label>
                                            <input type="number" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.year} onChange={e => setTrophyData('year', e.target.value)} min="2025" max={new Date().getFullYear()} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Posición</label>
                                            <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={trophyData.position} onChange={e => {
                                                const pos = parseInt(e.target.value);
                                                setTrophyData(d => ({...d, position: pos, type: pos === 1 ? 'cup' : 'medal'}));
                                            }}>
                                                <option value="1">1º (Campeón)</option>
                                                <option value="2">2º (Subcampeón)</option>
                                                <option value="3">3º Lugar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" disabled={trophyProcessing} className="w-full py-3 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-600/20 active:scale-95 transition-all">ASIGNAR PREMIO</button>
                                </form>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                                {club.trophies && club.trophies.map(trophy => (
                                    <div key={trophy.id} className="relative group bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                                        <button 
                                            onClick={() => { if(confirm('Eliminar logro?')) destroyTrophy(route('delegate.trophies.destroy', trophy.id)) }}
                                            className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-bold"
                                        >
                                            ×
                                        </button>
                                        <div className="text-3xl mb-1">{Number(trophy.position) === 1 ? '🏆' : '🏅'}</div>
                                        <div className="text-[10px] font-black text-slate-900 uppercase tracking-tighter leading-tight">
                                            {Number(trophy.position) === 1 ? 'Campeón' : Number(trophy.position) === 2 ? 'Sub-campeón' : '3º Lugar'}
                                        </div>
                                        <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{trophy.year} • {trophy.category}</div>
                                        <div className={`mt-1 text-[8px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${trophy.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{trophy.gender || 'Varones'}</div>
                                    </div>
                                ))}
                                {(!club.trophies || club.trophies.length === 0) && (
                                    <div className="col-span-full py-12 text-center text-slate-300 font-black uppercase text-[10px] tracking-[0.3em] border border-dashed border-slate-200 rounded-2xl">
                                        No hay trofeos registrados
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Coaches Management Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Cuerpo Técnico</h3>
                            <p className="text-sm text-slate-500 font-medium">Asigna personal por liga y categoría.</p>
                        </div>
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 border-r border-slate-100 pr-8">
                                <form onSubmit={handleCoachSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase">Nombre</label>
                                        <input type="text" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={coachData.name} onChange={e => setCoachData('name', e.target.value)} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Rol</label>
                                            <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={coachData.role} onChange={e => setCoachData('role', e.target.value)}>
                                                <option value="Coach">Coach</option>
                                                <option value="Asistente">Asistente</option>
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
                                    <button type="submit" disabled={coachProcessing} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">{editingCoach ? 'ACTUALIZAR' : 'AGREGAR STAFF'}</button>
                                </form>
                            </div>
                            <div className="lg:col-span-2 space-y-3">
                                {club.coaches && club.coaches.map(coach => (
                                    <div key={coach.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-slate-300 text-xs border border-slate-100 italic">{coach.role[0]}</div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{coach.name} <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ml-2 ${coach.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{coach.gender || 'Varones'}</span></p>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                                    {coach.role} • {Array.isArray(coach.category) ? coach.category.join(', ') : coach.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => handleEditCoach(coach)} className="p-2 text-slate-400 hover:text-indigo-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5"></path></svg></button>
                                            <button onClick={() => { if(confirm('Eliminar?')) destroyCoach(route('delegate.coaches.destroy', coach.id)) }} className="p-2 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"></path></svg></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Players Management Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Plantilla de Jugadores</h3>
                            <p className="text-sm text-slate-500 font-medium">Gestión integral del roster por liga y categoría.</p>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1 border-r border-slate-100 pr-8">
                                <form onSubmit={handlePlayerSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase">Nombre</label>
                                        <input type="text" className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.name} onChange={e => setPlayerData('name', e.target.value)} required />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-black text-slate-400 uppercase">Cat</label>
                                            <select className="w-full rounded-xl border-slate-200 text-sm font-bold" value={playerData.category} onChange={e => setPlayerData('category', e.target.value)} required>
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
                                    <div className="space-y-1">
                                        <label className="text-xs font-black text-slate-400 uppercase">Posición</label>
                                        <input type="text" className="w-full rounded-xl border-slate-200 text-sm font-bold" placeholder="Base, Escolta..." value={playerData.position} onChange={e => setPlayerData('position', e.target.value)} />
                                    </div>
                                    <button type="submit" disabled={playerProcessing} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest">{editingPlayer ? 'ACTUALIZAR' : 'AGREGAR JUGADOR'}</button>
                                </form>
                            </div>

                            <div className="lg:col-span-2 space-y-3">
                                {club.players && club.players.map(player => (
                                    <div key={player.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 group shadow-sm hover:border-orange-200 transition-all">
                                        <div className="flex items-center gap-4">
                                            <span className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center font-black text-xs italic shadow-lg shadow-slate-900/10">#{player.number}</span>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{player.name} <span className="ml-2 text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase font-black tracking-widest">{player.category}</span> <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ml-1 ${player.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{player.gender || 'Varones'}</span></p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{player.position || '-'}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => handleEditPlayer(player)} className="p-2 text-slate-400 hover:text-indigo-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2.5"></path></svg></button>
                                            <button onClick={() => { if(confirm('Eliminar?')) destroyPlayer(route('delegate.players.destroy', player.id)) }} className="p-2 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2.5"></path></svg></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
