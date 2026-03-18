import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight">Panel de Delegado</h2>}
        >
            <Head title="Delegate Dashboard" />

            <div className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden shadow-xl shadow-orange-500/20 sm:rounded-2xl border border-red-500">
                        <div className="p-8 text-white relative">
                            <h3 className="text-3xl font-bold mb-2">Hola, {props.auth.user.name}</h3>
                            <p className="text-orange-50 max-w-xl">Bienvenido a tu panel de control. Aquí puedes gestionar los resultados y estadísticas de los próximos encuentros de tu club.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Club Identity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center col-span-1">
                            {props.auth.user.club ? (
                                <>
                                    <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-4 border-4 border-white shadow-xl overflow-hidden">
                                        {props.auth.user.club.logo ? (
                                            <img src={props.auth.user.club.logo} alt={props.auth.user.club.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-4xl font-black text-slate-200">{props.auth.user.club.name[0]}</span>
                                        )}
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{props.auth.user.club.name}</h4>
                                    <p className="text-slate-400 text-xs font-bold uppercase mt-1 tracking-widest">Mi Club</p>
                                    
                                    <Link 
                                        href={route('delegate.club.edit')}
                                        className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-orange-600 transition-all uppercase tracking-widest shadow-lg shadow-slate-900/10"
                                    >
                                        GESTIONAR CLUB
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-300 mb-4 border-4 border-white shadow-lg">?</div>
                                    <h4 className="text-2xl font-bold text-slate-800 uppercase tracking-tighter">SIN CLUB</h4>
                                    <p className="text-slate-500 text-sm mt-2">Pide al administrador que te asigne un club.</p>
                                </>
                            )}
                        </div>

                        {/* Recent Matches & Actions */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 col-span-1 lg:col-span-2 relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                            
                            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
                                Próximas Acciones
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link 
                                    href={route('delegate.club.edit')}
                                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-4 group/item"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600 group-hover/item:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-slate-800 text-sm uppercase">Gestionar Jugadores</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Roster de Mi Equipo</p>
                                    </div>
                                </Link>

                                <Link 
                                    href={route('delegate.games.index')}
                                    className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-4 group/item"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-600 group-hover/item:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-black text-slate-800 text-sm uppercase">Cargar Resultados</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase italic tracking-widest">Actas y Marcadores</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
