import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, clubs, myClub, seasons, activeSeasonId }) {
    const { data, setData, post, processing, errors } = useForm({
        home_club_id: myClub.id,
        away_club_id: clubs[0]?.id || '',
        date: '',
        category: 'U19',
        gender: 'Varones',
        season_id: activeSeasonId || (seasons[0]?.id || ''),
        condition: 'local', // local o visita respecto a miClub
    });

    const handleConditionChange = (value) => {
        setData('condition', value);
        // Recalcular home/away manteniendo el rival seleccionado
        if (!data.away_club_id && clubs.length > 0) {
            setData('away_club_id', clubs[0].id);
        }
        if (value === 'local') {
            setData({
                ...data,
                condition: value,
                home_club_id: myClub.id,
                away_club_id: data.away_club_id || clubs[0]?.id || '',
            });
        } else {
            setData({
                ...data,
                condition: value,
                home_club_id: data.away_club_id || clubs[0]?.id || '',
                away_club_id: myClub.id,
            });
        }
    };

    const handleOpponentChange = (clubId) => {
        if (data.condition === 'local') {
            setData({
                ...data,
                away_club_id: clubId,
            });
        } else {
            setData({
                ...data,
                home_club_id: clubId,
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('delegate.games.store'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-2xl text-slate-800 leading-tight uppercase tracking-tighter italic">
                        Agendar Próximo Encuentro
                    </h2>
                    <Link
                        href={route('delegate.games.index')}
                        className="text-sm font-bold text-slate-400 hover:text-orange-600 transition-colors uppercase tracking-[0.2em]"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head title="Agendar Encuentro" />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="bg-white overflow-hidden shadow-2xl sm:rounded-[3rem] border border-slate-200 p-12 space-y-10"
                    >
                        {/* Club y rival */}
                        <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                                Participantes
                            </h3>
                            <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1 text-center">
                                    <p className="text-[10px] uppercase font-black text-slate-400 mb-1">
                                        Tu Club
                                    </p>
                                    <h3 className="text-2xl font-black uppercase tracking-tight italic">
                                        {myClub.name}
                                    </h3>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
                                        Condición
                                    </span>
                                    <div className="flex gap-2 bg-white/10 rounded-full p-1">
                                        <button
                                            type="button"
                                            onClick={() => handleConditionChange('local')}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                data.condition === 'local'
                                                    ? 'bg-white text-slate-900'
                                                    : 'text-slate-200'
                                            }`}
                                        >
                                            Local
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleConditionChange('visita')}
                                            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                data.condition === 'visita'
                                                    ? 'bg-white text-slate-900'
                                                    : 'text-slate-200'
                                            }`}
                                        >
                                            Visita
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 text-center">
                                    <label className="text-[10px] uppercase font-black text-slate-400 mb-1 block">
                                        Rival
                                    </label>
                                    <select
                                        className="w-full rounded-2xl bg-white text-slate-900 text-sm font-bold uppercase tracking-tight px-4 py-2"
                                        value={
                                            data.condition === 'local'
                                                ? data.away_club_id
                                                : data.home_club_id
                                        }
                                        onChange={(e) => handleOpponentChange(e.target.value)}
                                    >
                                        {clubs.map((club) => (
                                            <option key={club.id} value={club.id}>
                                                {club.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.away_club_id && (
                                        <p className="mt-1 text-xs text-red-500 font-medium">
                                            {errors.away_club_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detalles generales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
                                    Fecha y hora
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.date}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
                                    Campeonato
                                </label>
                                <select
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700 uppercase tracking-tight focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    value={data.season_id}
                                    onChange={(e) => setData('season_id', e.target.value)}
                                >
                                    {seasons.map((season) => (
                                        <option key={season.id} value={season.id}>
                                            {season.name}
                                            {season.id === activeSeasonId ? ' (Activo)' : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.season_id && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">
                                        {errors.season_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
                                    Categoría
                                </label>
                                <select
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-700 uppercase tracking-tight focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                >
                                    {['U11', 'U13', 'U15', 'U17', 'U19'].map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">
                                    Rama
                                </label>
                                <div className="flex gap-2 bg-slate-100 rounded-2xl p-1">
                                    {['Varones', 'Damas'].map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setData('gender', g)}
                                            className={`flex-1 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.16em] ${
                                                data.gender === g
                                                    ? 'bg-slate-900 text-white'
                                                    : 'text-slate-500'
                                            }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                                {errors.gender && (
                                    <p className="mt-1 text-xs text-red-500 font-medium">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-60"
                            >
                                Guardar Encuentro
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

