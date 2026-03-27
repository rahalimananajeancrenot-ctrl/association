import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ logements = [], types = [] }) {
    const [filterType, setFilterType] = useState(null);

    const deleteLogement = (id) => {
        if (confirm('Supprimer ?')) {
            Inertia.delete(`/logements/${id}`);
        }
    };

    const filteredLogements = filterType
        ? logements.filter(l => l.type_logement_id === filterType)
        : logements;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold dark:text-white">Logements</h2>}>
            <Head title="Logements" />

            <div className="p-6 bg-gray-100 dark:bg-black min-h-screen space-y-4">

                {/* FILTRE ET AJOUTER */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilterType(null)}
                            className={`btn btn-sm px-3 ${!filterType ? 'btn-primary bg-blue-700' : 'btn-outline'}`}
                        >
                            Tous
                        </button>
                        {types.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setFilterType(t.id)}
                                className={`btn btn-sm px-3 ${filterType === t.id ? 'btn-primary bg-blue-700' : 'btn-outline'}`}
                            >
                                {t.type}
                            </button>
                        ))}
                    </div>
                    <Link href="/logements/create" className="btn btn-primary">
                        Ajouter
                    </Link>
                </div>

                {/* TABLEAU */}
                <div className="p-4 rounded shadow bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700">
                    <table className="table w-full text-left border-collapse">
                        <thead className="bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white">
                            <tr>
                                <th className="p-2 border-b border-gray-300 dark:border-gray-600">Nom</th>
                                <th className="p-2 border-b border-gray-300 dark:border-gray-600">Places</th>
                                <th className="p-2 border-b border-gray-300 dark:border-gray-600">Type</th>
                                <th className="p-2 border-b border-gray-300 dark:border-gray-600">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLogements.length > 0 ? (
                                filteredLogements.map(l => (
                                    <tr key={l.id} className="hover:bg-gray-100 dark:hover:bg-zinc-800">
                                        <td className="p-2 border-b border-gray-200 dark:border-gray-700">{l.name}</td>
                                        <td className="p-2 border-b border-gray-200 dark:border-gray-700">{l.nbrPlace}</td>
                                        <td className="p-2 border-b border-gray-200 dark:border-gray-700">{l.type_logement?.type}</td>
                                        <td className="p-2 border-b border-gray-200 dark:border-gray-700 flex gap-2">
                                            <Link href={`/logements/${l.id}/edit`} className="btn btn-warning btn-sm">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteLogement(l.id)}
                                                className="btn btn-error btn-sm bg-red-700 px-3"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        Aucun logement trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}