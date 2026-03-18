import { Head, Link, router } from '@inertiajs/react';

export default function ClubDetails({ auth, club, upcomingGames, recentGames, currentGender }) {
    
    const handleGenderChange = (gender) => {
        router.get(route('public.club.show', club.id), { gender }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={`Abatalca - ${club.name}`} />

            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black text-orange-600 tracking-tighter hover:scale-105 transition-transform">ABATALCA</Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-slate-600 font-bold text-xs uppercase tracking-widest hover:text-orange-600 transition-colors">Inicio</Link>
                        {auth.user?.role === 'admin' && (
                            <Link href={route('admin.dashboard')} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest">Panel Admin</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Club Header Banner */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-slate-900 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10">
                    <div className="w-40 h-40 rounded-3xl bg-white flex items-center justify-center mb-8 shadow-2xl border-8 border-white/20 overflow-hidden transform group-hover:rotate-3 transition-transform">
                        {club.logo ? (
                            <img src={club.logo} alt={club.name} className="w-full h-full object-contain p-2" />
                        ) : (
                            <span className="text-6xl text-slate-200 font-black tracking-tighter italic">{club.name[0]}</span>
                        )}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-lg">{club.name}</h1>
                    <p className="text-orange-100 max-w-2xl text-xl font-medium mb-8 drop-shadow-md">{club.description}</p>
                    
                    {/* Gender Switcher */}
                    <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/10 mb-8">
                        {['Varones', 'Damas'].map(g => (
                            <button 
                                key={g}
                                onClick={() => handleGenderChange(g)}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                    currentGender === g 
                                    ? 'bg-white text-orange-600 shadow-xl' 
                                    : 'text-white/60 hover:text-white'
                                }`}
                            >
                                {g}
                            </button>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {club.instagram_url && (
                            <a href={club.instagram_url} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl text-white transition-all backdrop-blur-sm group">
                                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                        )}
                        {club.website_url && (
                            <a href={club.website_url} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl text-white transition-all backdrop-blur-sm font-black text-xs uppercase tracking-widest border border-white/10">
                                Visitar Sitio Web
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* Left Column: Info & Staff */}
                    <div className="lg:col-span-1 space-y-12">
                        {/* History */}
                        <section>
                            <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter flex items-center gap-3">
                                <span className="w-4 h-4 bg-orange-600 rounded-full"></span>
                                Nuestra Historia
                            </h2>
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group text-pretty">
                                <div className="absolute -right-4 -bottom-4 text-slate-50 font-black text-8xl group-hover:scale-110 transition-transform select-none uppercase">{club.name[0]}</div>
                                <p className="text-slate-600 leading-relax relative z-10 font-medium italic">
                                    {club.history || "Este club aún no ha compartido su historia."}
                                </p>
                            </div>
                        </section>

                        {/* Trophies Section - Always show all trophies? */}
                        <section>
                            <div className="flex flex-wrap gap-3">
                                {(club.trophies || []).length > 0 ? (
                                    club.trophies.map(trophy => (
                                        <div key={trophy.id} className="bg-white border border-slate-100 p-2 px-3 rounded-2xl shadow-sm text-center group hover:shadow-md transition-all border-b-2 border-b-orange-200">
                                            <div className="text-xl mb-0.5 group-hover:scale-110 transition-transform duration-500">
                                                {Number(trophy.position) === 1 ? '🏆' : '🏅'}
                                            </div>
                                            <div className="text-[8px] font-black text-slate-900 uppercase tracking-tighter leading-tight italic">
                                                {Number(trophy.position) === 1 ? 'Campeón' : Number(trophy.position) === 2 ? 'Sub' : '3º'}
                                            </div>
                                            <div className="text-[8px] font-bold text-orange-500 uppercase tracking-widest">{trophy.year}</div>
                                            <div className={`mt-0.5 text-[6px] font-black uppercase px-1 py-0.5 rounded-full inline-block ${trophy.gender === 'Damas' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>{trophy.gender || 'Varones'}</div>
                                        </div>
                                    ))
                                ) : null}
                            </div>
                        </section>

                        {/* Coaching Staff */}
                        <section>
                            <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter flex items-center gap-3">
                                <span className="w-4 h-4 bg-indigo-600 rounded-full"></span>
                                Staff League: {currentGender}
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {club.coaches && club.coaches.length > 0 ? (
                                    club.coaches.map(coach => (
                                        <div key={coach.id} className="bg-slate-900 text-white p-5 rounded-3xl shadow-lg border border-white/5 flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform italic">
                                                {coach.role[0]}
                                            </div>
                                            <div>
                                                <p className="font-black text-sm uppercase tracking-tight">{coach.name}</p>
                                                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                                                    {coach.role} • {Array.isArray(coach.category) ? coach.category.join(', ') : coach.category}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center bg-slate-100 rounded-3xl border border-dashed border-slate-200 text-slate-400 font-bold italic text-sm">
                                        Sin staff técnico registrado para {currentGender}.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Roster & Games */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Roster Section */}
                        <section>
                            <div className="flex justify-between items-end mb-8">
                                <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Plantilla <span className="text-orange-600">{currentGender}</span></h2>
                                <span className="text-[10px] bg-slate-200 px-3 py-1 rounded-full font-black text-slate-500 uppercase tracking-widest">Abatalca 2026</span>
                            </div>

                            {club.players && club.players.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {['U19', 'U17', 'U15', 'U13', 'U11'].map(category => {
                                        const players = club.players.filter(p => p.category === category);
                                        if (players.length === 0) return null;
                                        return (
                                            <div key={category} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-fit">
                                                <h3 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-6 border-b pb-2 flex justify-between">
                                                    <span>Categoría {category}</span>
                                                    <span className="text-slate-300 italic">#{players.length}</span>
                                                </h3>
                                                <div className="space-y-4">
                                                    {players.map(player => (
                                                        <div key={player.id} className="flex items-center gap-4 group">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-slate-400 border border-slate-100 transition-all group-hover:bg-slate-900 group-hover:text-white group-hover:scale-105">
                                                                #{player.number}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors uppercase tracking-tight">{player.name}</p>
                                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{player.position || 'Jugador'}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="bg-slate-100 rounded-3xl p-12 text-center text-slate-400 font-bold italic border border-dashed border-slate-200">
                                    No se ha registrado el roster de jugadores para {currentGender}.
                                </div>
                            )}
                        </section>

                        {/* Recent Games */}
                        <section>
                             <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tighter">Resultados - {currentGender}</h2>
                             <div className="space-y-4">
                                {recentGames.length > 0 ? (
                                    recentGames.map(game => (
                                        <div key={game.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                                            <div className="text-center w-16">
                                                <p className="text-[10px] font-black text-slate-300 uppercase block">{new Date(game.date).toLocaleDateString('es-CL', { month: 'short' })}</p>
                                                <p className="text-xl font-black text-slate-800">{new Date(game.date).getDate()}</p>
                                            </div>
                                            <div className="flex-1 flex items-center justify-between">
                                                <div className="flex-1 text-right pr-4">
                                                    <p className={`font-black uppercase tracking-tighter text-sm ${game.home_club_id === club.id ? (game.home_score > game.away_score ? 'text-orange-600' : 'text-slate-800') : 'text-slate-400'}`}>
                                                        {game.home_club.name}
                                                    </p>
                                                </div>
                                                <div className="bg-slate-900 text-white px-5 py-2 rounded-2xl flex items-center gap-3 font-black text-xl shadow-lg ring-4 ring-slate-50 group-hover:scale-110 transition-transform">
                                                    <span className={game.home_score > game.away_score ? 'text-orange-400' : ''}>{game.home_score}</span>
                                                    <span className="text-slate-600 text-[10px] italic">VS</span>
                                                    <span className={game.away_score > game.home_score ? 'text-orange-400' : ''}>{game.away_score}</span>
                                                </div>
                                                <div className="flex-1 text-left pl-4">
                                                    <p className={`font-black uppercase tracking-tighter text-sm ${game.away_club_id === club.id ? (game.away_score > game.home_score ? 'text-orange-600' : 'text-slate-800') : 'text-slate-400'}`}>
                                                        {game.away_club.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-lg uppercase tracking-widest italic">{game.category}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-8 text-center bg-slate-100 rounded-3xl text-slate-400 font-bold italic border border-dashed">Sin resultados registrados en {currentGender}.</p>
                                )}
                             </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-16 text-center text-slate-500 overflow-hidden relative mt-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <p className="text-xs uppercase font-black tracking-[0.3em] text-slate-700 mb-4">ESTADÍSTICAS OFICIALES ABATALCA</p>
                    <Link href="/" className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all">Regresar al portal principal</Link>
                </div>
            </footer>
        </div>
    );
}
