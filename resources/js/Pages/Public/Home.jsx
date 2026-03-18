import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

// Evitar desfase horario: formatear hora usando UTC tal como viene desde el backend,
// sin aplicar la zona horaria del navegador.
const formatGameTime = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default function Home({ auth, clubs, upcomingGames, recentGames, playoffGames, categories, standings, seasons, currentSeason, currentGender }) {
    const [selectedCategory, setSelectedCategory] = useState('U19');

    // Mostrar sección de playoffs por categoría solo si en la categoría seleccionada
    // hay al menos un partido de playoffs programado (scheduled)
    const hasPlayoffGamesForSelectedCategory =
        !!playoffGames &&
        !!playoffGames[selectedCategory] &&
        playoffGames[selectedCategory].some(g => g.status === 'scheduled');

    const handleFilterChange = (seasonId, gender) => {
        router.get(route('home'), { 
            season: seasonId || currentSeason?.id, 
            gender: gender || currentGender 
        }, { preserveState: true });
    };

    const renderTrophies = (trophies) => {
        if (!trophies || trophies.length === 0) return null;
        return (
            <div className="flex gap-1 mt-2">
                {trophies.map((t, i) => (
                    <div key={i} className="group/trophy relative">
                        {Number(t.position) === 1 ? (
                            <span className="text-xl">🏆</span>
                        ) : (
                            <span className="text-xl">🏅</span>
                        )}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/trophy:block bg-slate-900 text-white text-[8px] font-black px-2 py-1 rounded whitespace-nowrap z-10">
                            {Number(t.position) === 1 ? 'CAMPEÓN' : Number(t.position) === 2 ? 'SUB-CAMPEÓN' : '3ER LUGAR'} {t.year} ({t.category})
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
            <Head title="Abatalca - Torneo de Básquetbol" />

            {/* Premium Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="text-3xl font-black text-orange-600 tracking-tighter flex items-center group">
                            <span className="w-8 h-8 bg-orange-600 text-white flex items-center justify-center rounded-lg mr-2 rotate-3 group-hover:rotate-0 transition-transform">A</span>
                            ABATALCA
                        </Link>
                        <div className="hidden md:flex gap-8">
                            <Link href="/" className="text-sm font-bold uppercase tracking-widest text-orange-600 border-b-2 border-orange-600 pb-1">Resultados</Link>
                            <Link href="/" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors pb-1">Clubes</Link>
                            <Link href="/" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors pb-1">Posiciones</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user && (
                            <Link href={route('dashboard')} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-95">
                                PANEL CONTROL
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <header className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                        {/* Gender Switcher */}
                        <div className="bg-white p-1.5 rounded-2xl shadow-xl flex gap-1 border border-slate-100">
                            {['Varones', 'Damas'].map(g => (
                                <button
                                    key={g}
                                    onClick={() => handleFilterChange(null, g)}
                                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${currentGender === g ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>

                        {/* Season Selection */}
                        <div className="bg-white px-6 py-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Campeonato</span>
                            <select 
                                className="text-sm font-black uppercase tracking-tighter text-orange-600 border-none bg-transparent p-0 focus:ring-0 cursor-pointer"
                                value={currentSeason?.id || ''}
                                onChange={e => handleFilterChange(e.target.value, null)}
                            >
                                {seasons.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 relative">
                        LIGA DE <span className="text-orange-600 italic underline decoration-8 decoration-orange-600/10">{currentGender.toUpperCase()}</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">ABA TALCA • LA PASIÓN DEL MAULE</p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                
                {/* Category Picker */}
                <div className="mb-16 flex flex-wrap justify-center gap-2">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-2xl font-black text-sm tracking-widest transition-all ${
                                selectedCategory === cat 
                                ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/30 -translate-y-1' 
                                : 'bg-white text-slate-400 border border-slate-200 hover:border-orange-600 hover:text-orange-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Recent Results Section */}
                    <div className="space-y-10">
                        <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
                            <span className="w-2 h-10 bg-orange-600 rounded-full"></span>
                            Resultados <span className="text-orange-600">{selectedCategory}</span>
                        </h2>
                        
                        <div className="space-y-6">
                            {(recentGames[selectedCategory] || []).length > 0 ? (
                                recentGames[selectedCategory].map((game) => (
                                    <div key={game.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex-1 flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 mb-3 flex items-center justify-center text-slate-200 overflow-hidden shadow-inner border border-slate-100">
                                                    {game.home_club.logo ? (
                                                        <img src={game.home_club.logo} alt={game.home_club.name} className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <span className="text-xl font-black">{game.home_club.name[0]}</span>
                                                    )}
                                                </div>
                                                <Link href={route('public.club.show', game.home_club_id)} className="font-black text-center text-slate-800 hover:text-orange-600 transition-colors uppercase tracking-tighter text-sm">{game.home_club.name}</Link>
                                            </div>
                                            
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-6">
                                                    <span className={`text-4xl font-black ${game.home_score > game.away_score ? 'text-orange-600 scale-110' : 'text-slate-400'}`}>{game.home_score}</span>
                                                    <span className="text-slate-200 font-bold text-3xl">-</span>
                                                    <span className={`text-4xl font-black ${game.away_score > game.home_score ? 'text-orange-600 scale-110' : 'text-slate-400'}`}>{game.away_score}</span>
                                                </div>
                                                <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase italic">{game.status.toUpperCase()}</span>
                                                {game.stage !== 'regular' && <span className="text-[8px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{game.stage === 'quarter' ? 'Cuartos' : game.stage === 'semi' ? 'Semi' : 'Final'}</span>}
                                            </div>

                                            <div className="flex-1 flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-2xl bg-slate-50 mb-3 flex items-center justify-center text-slate-200 overflow-hidden shadow-inner border border-slate-100">
                                                    {game.away_club.logo ? (
                                                        <img src={game.away_club.logo} alt={game.away_club.name} className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <span className="text-xl font-black">{game.away_club.name[0]}</span>
                                                    )}
                                                </div>
                                                <Link href={route('public.club.show', game.away_club_id)} className="font-black text-center text-slate-800 hover:text-orange-600 transition-colors uppercase tracking-tighter text-sm">{game.away_club.name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-slate-100 rounded-[2rem] p-12 text-center text-slate-400 italic font-bold">Sin resultados registrados en {currentGender} ({selectedCategory}).</div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Matches Section */}
                    <div className="space-y-10">
                        <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
                            <span className="w-2 h-10 bg-slate-900 rounded-full"></span>
                            Próximos Juegos
                        </h2>
                        
                        <div className="space-y-6">
                            {(upcomingGames[selectedCategory] || []).length > 0 ? (
                                upcomingGames[selectedCategory].map((game) => (
                                    <div key={game.id} className="bg-slate-900 p-8 rounded-[2rem] text-white relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="bg-orange-600 p-2 rounded-xl text-xs font-black tracking-widest">{selectedCategory}</div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4">
                                            <div className="text-center bg-white/10 px-4 py-3 rounded-2xl">
                                                <span className="block text-3xl font-black">{new Date(game.date.split('T')[0] + 'T12:00:00').getDate()}</span>
                                                <span className="block text-[10px] uppercase font-bold text-orange-400">{new Date(game.date.split('T')[0] + 'T12:00:00').toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                            <div className="flex-1 w-full">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-base sm:text-xl font-bold tracking-tight">
                                                    <Link href={route('public.club.show', game.home_club_id)} className="hover:text-orange-400 transition-colors uppercase tracking-tighter break-words">
                                                        {game.home_club.name}
                                                    </Link>
                                                    <span className="text-white/20">vs</span>
                                                    <Link href={route('public.club.show', game.away_club_id)} className="hover:text-orange-400 transition-colors uppercase tracking-tighter break-words">
                                                        {game.away_club.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                                            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Inicia a las {formatGameTime(game.date)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-slate-100 rounded-[2rem] p-12 text-center text-slate-400 italic font-bold">No hay juegos programados.</div>
                            )}
                        </div>
                    </div>

                </div>

                {/* PLAYOFF SECTION (Fase Final) */}
                {hasPlayoffGamesForSelectedCategory && (
                    <div className="mt-40">
                        <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4">
                            <span className="w-2 h-10 bg-indigo-600 rounded-full"></span>
                            Fase Final (Playoffs) <span className="text-indigo-600 italic">Liga {currentGender}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {['quarter', 'semi', 'third', 'final'].map(stage => (
                                <div key={stage} className="space-y-6">
                                    <h3 className={`text-center py-3 rounded-2xl font-black text-xs uppercase tracking-widest border italic ${
                                        stage === 'third' 
                                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                    }`}>
                                        {stage === 'quarter' ? 'Cuartos' : stage === 'semi' ? 'Semi-Final' : stage === 'third' ? '3er Lugar 🥉' : 'Gran Final'}
                                    </h3>
                                    <div className="space-y-4">
                                        {(playoffGames[selectedCategory] || []).filter(g => g.stage === stage).map(game => (
                                            <div key={game.id} className="bg-white border text-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all group">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(game.date.split('T')[0] + 'T12:00:00').toLocaleDateString()}</span>
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${game.status === 'finished' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                                        {game.status === 'finished' ? 'FINAL' : 'PDTE'}
                                                    </span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className={`text-sm font-black uppercase tracking-tighter ${game.home_score > game.away_score ? 'text-slate-900' : 'text-slate-400'}`}>
                                                            {game.home_club.name}
                                                        </span>
                                                        <span className={`font-black text-lg ${game.home_score > game.away_score ? 'text-indigo-600' : 'text-slate-300'}`}>{game.home_score ?? 0}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className={`text-sm font-black uppercase tracking-tighter ${game.away_score > game.home_score ? 'text-slate-900' : 'text-slate-400'}`}>
                                                            {game.away_club.name}
                                                        </span>
                                                        <span className={`font-black text-lg ${game.away_score > game.home_score ? 'text-indigo-600' : 'text-slate-300'}`}>{game.away_score ?? 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {(playoffGames[selectedCategory] || []).filter(g => g.stage === stage).length === 0 && (
                                            <div className="text-center py-6 text-slate-300 text-[10px] font-black uppercase italic tracking-widest bg-slate-50/50 rounded-2xl border border-dashed">Próximamente...</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* Standings Table Section */}
                <div className="mt-40">
                    <h2 className="text-4xl font-black text-slate-900 mb-10 flex items-center gap-4">
                        <span className="w-2 h-10 bg-green-500 rounded-full"></span>
                        Tabla de Posiciones <span className="text-green-600">{currentGender} {selectedCategory}</span>
                    </h2>
                    
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 italic">
                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Pos</th>
                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Club</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">PJ</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">PG</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">PP</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">PF</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">PA</th>
                                        <th className="px-6 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">DIF</th>
                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-orange-600 text-center bg-orange-50/50">Pts</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {(standings[selectedCategory] || []).map((row, index) => (
                                        <tr key={row.name} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                                                    index === 0 ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 
                                                    index === 1 ? 'bg-slate-800 text-white' : 
                                                    index === 2 ? 'bg-slate-400 text-white' : 'text-slate-400'
                                                }`}>
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <Link href={route('public.club.show', row.id)} className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{row.name}</Link>
                                            </td>
                                            <td className="px-6 py-6 text-center font-bold text-slate-600">{row.played}</td>
                                            <td className="px-6 py-6 text-center font-bold text-green-600">{row.wins}</td>
                                            <td className="px-6 py-6 text-center font-bold text-red-400">{row.losses}</td>
                                            <td className="px-6 py-6 text-center font-medium text-slate-400">{row.pf}</td>
                                            <td className="px-6 py-6 text-center font-medium text-slate-400">{row.pa}</td>
                                            <td className={`px-6 py-6 text-center font-black ${row.diff >= 0 ? 'text-slate-400' : 'text-red-300'}`}>
                                                {row.diff > 0 ? `+${row.diff}` : row.diff}
                                            </td>
                                            <td className="px-8 py-6 text-center bg-orange-50/20">
                                                <span className="text-xl font-black text-orange-600">{row.points}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(standings[selectedCategory] || []).length === 0 && (
                                        <tr>
                                            <td colSpan="9" className="px-8 py-20 text-center text-slate-400 italic">No hay datos en esta categoría/liga.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Clubs Gallery */}
                <div className="mt-40">
                    <h2 className="text-center text-4xl font-black mb-16 italic tracking-tighter uppercase text-slate-900 underline decoration-orange-600 decoration-8 underline-offset-8">Clubes Participantes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {clubs.map(club => (
                            <Link key={club.id} href={route('public.club.show', { club: club.id, gender: currentGender })} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col items-center group hover:shadow-xl hover:shadow-slate-200 transition-all hover:-translate-y-2 relative overflow-hidden">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner flex items-center justify-center text-slate-200 overflow-hidden border border-slate-100">
                                    {club.logo ? (
                                        <img src={club.logo} alt={club.name} className="w-full h-full object-contain p-3" />
                                    ) : (
                                        <span className="text-2xl font-black">{club.name[0]}</span>
                                    )}
                                </div>
                                <span className="font-black text-center text-slate-800 uppercase tracking-tighter text-[10px]">{club.name}</span>
                                {renderTrophies(club.trophies)}
                            </Link>
                        ))}
                    </div>
                </div>

            </main>

            <footer className="bg-slate-900 py-24 text-center">
                <div className="text-6xl font-black text-white/5 mb-12 tracking-widest italic uppercase">
                    ABATALCA 2026
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-center gap-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Básquetbol</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Talca</span>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Maule</span>
                    </div>
                    {!auth.user && (
                        <div className="mt-4">
                            <Link
                                href={route('login')}
                                className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-orange-400 transition-colors"
                            >
                                Acceso Delegados
                            </Link>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
}
