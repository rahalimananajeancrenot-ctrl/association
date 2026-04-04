import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ logements = [], types = [] }) {

    const totalLogements = logements.length;
    const totalPlaces = logements.reduce((sum, l) => sum + l.nbrPlace, 0);
    const totalTypes = types.length;

    // 🔥 calcul réel avec users
    const occupes = logements.reduce((sum, l) => sum + (l.users?.length || 0), 0);
    const disponibles = totalPlaces - occupes;

    const latestLogements = logements.slice(0, 5);

    return (
        <AppLayout header={<h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Logement</h2>}>

            <Head title="Dashboard Logement" />

            <div className="p-6 space-y-6 bg-gray-100 dark:bg-black min-h-screen">

                {/* 🔹 STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                        <p className="text-gray-500">Logements</p>
                        <p className="text-2xl font-bold">{totalLogements}</p>
                    </div>

                    <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                        <p className="text-gray-500">Places</p>
                        <p className="text-2xl font-bold">{totalPlaces}</p>
                    </div>

                    <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                        <p className="text-gray-500">Types</p>
                        <p className="text-2xl font-bold">{totalTypes}</p>
                    </div>

                    <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                        <p className="text-gray-500">Disponibles</p>
                        <p className="text-2xl font-bold text-green-600">{disponibles}</p>
                    </div>

                </div>

                {/* 🔹 ACTIONS */}
                <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                    <h3 className="font-semibold mb-3">Actions rapides</h3>

                    <div className="flex gap-3 flex-wrap">
                        <Link href="/logements/create" className="btn btn-primary">
                            ➕ Ajouter
                        </Link>

                        <Link href="/logements" className="btn btn-outline">
                            📋 Gérer
                        </Link>
                    </div>
                </div>

                {/* 🔹 DERNIERS LOGEMENTS */}
                <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                    <h3 className="font-semibold mb-4">Derniers logements</h3>

                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Places</th>
                                <th>Occupés</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {latestLogements.length > 0 ? (
                                latestLogements.map(l => {

                                    const occupesLogement = l.users?.length || 0;
                                    const isFull = occupesLogement >= l.nbrPlace;

                                    return (
                                        <tr key={l.id}>
                                            <td>{l.name}</td>
                                            <td>{l.nbrPlace}</td>
                                            <td>{occupesLogement}</td>
                                            <td>{l.type_logement?.type}</td>
                                            <td>
                                                <span className={`badge ${isFull ? 'badge-error' : 'badge-success'}`}>
                                                    {isFull ? 'Complet' : 'Disponible'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        Aucun logement
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </AppLayout>
    );
}