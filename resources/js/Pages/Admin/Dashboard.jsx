import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, clubsCount, gamesCount, delegatesCount, statsCount }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-2xl text-slate-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 overflow-hidden shadow-xl sm:rounded-2xl border border-slate-700">
                        <div className="p-8 text-white relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-32 h-32 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Bienvenido, {auth.user.name}</h3>
                            <p className="text-slate-300 max-w-xl">Desde aquí puedes administrar todos los aspectos del torneo Abatalca, incluyendo clubes, delegados, encuentros y estadísticas.</p>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
                            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <span className="text-2xl font-bold text-slate-800">{clubsCount || 0}</span>
                            <span className="text-slate-500 font-medium">Clubes</span>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
                            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                            <span className="text-2xl font-bold text-slate-800">{gamesCount || 0}</span>
                            <span className="text-slate-500 font-medium">Encuentros</span>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
                            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            </div>
                            <span className="text-2xl font-bold text-slate-800">{delegatesCount || 0}</span>
                            <span className="text-slate-500 font-medium">Delegados</span>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all">
                            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                            </div>
                            <span className="text-2xl font-bold text-slate-800">{statsCount || 0}</span>
                            <span className="text-slate-500 font-medium">Estadísticas</span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
                        <div className="flex gap-4">
                            <Link 
                                href={route('admin.games.index')}
                                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium shadow-md shadow-slate-800/10"
                            >
                                Gestionar Encuentros
                            </Link>
                            <Link 
                                href={route('admin.clubs.index')}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                            >
                                Gestionar Clubes
                            </Link>
                            <Link 
                                href={route('admin.users.index')}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                            >
                                Gestionar Usuarios
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
