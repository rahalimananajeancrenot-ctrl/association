import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Plus,
    Pencil,
    Trash2,
    Home,
    Users,
    Building2,
    Filter,
    AlertTriangle,
    X
} from 'lucide-react';

export default function Index({ logements = [], types = [] }) {
    const [filterType, setFilterType] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLogement, setSelectedLogement] = useState(null);

    const filteredLogements = filterType
        ? logements.filter((l) => l.type_logement_id === filterType)
        : logements;

    const confirmDelete = (logement) => {
        setSelectedLogement(logement);
        setOpenModal(true);
    };

    const deleteLogement = () => {
        if (selectedLogement) {
            router.delete(`/logements/${selectedLogement.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenModal(false);
                    setSelectedLogement(null);
                },
            });
        }
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Logements
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gestion des logements et des places disponibles
                    </p>
                </div>
            }
        >
            <Head title="Logements" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* HERO */}
                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <Building2 className="h-4 w-4" />
                                    Module logements
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Liste des logements
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Consultez, filtrez, modifiez ou supprimez les logements enregistrés.
                                </p>
                            </div>

                            <Link
                                href="/logements/create"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                            >
                                <Plus className="h-5 w-5" />
                                Ajouter un logement
                            </Link>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid gap-5 md:grid-cols-3">
                        <StatCard
                            icon={<Home />}
                            label="Total logements"
                            value={logements.length}
                        />

                        <StatCard
                            icon={<Users />}
                            label="Total places"
                            value={logements.reduce((total, l) => total + Number(l.nbrPlace || 0), 0)}
                        />

                        <StatCard
                            icon={<Filter />}
                            label="Types"
                            value={types.length}
                        />
                    </div>

                    {/* FILTERS */}
                    <div className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-4 flex items-center gap-2">
                            <Filter className="h-5 w-5 text-blue-600" />
                            <h3 className="font-black text-gray-900 dark:text-white">
                                Filtrer par type
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilterType(null)}
                                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                                    !filterType
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
                                }`}
                            >
                                Tous
                            </button>

                            {types.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setFilterType(t.id)}
                                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                                        filterType === t.id
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
                                    }`}
                                >
                                    {t.type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="border-b border-gray-200 p-5 dark:border-zinc-800">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                Logements enregistrés
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {filteredLogements.length} résultat(s) trouvé(s)
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-zinc-950 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Nom</th>
                                        <th className="px-6 py-4">Places</th>
                                        <th className="px-6 py-4">Departement</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {filteredLogements.length > 0 ? (
                                        filteredLogements.map((l) => (
                                            <tr
                                                key={l.id}
                                                className="transition hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                                            <Home className="h-5 w-5" />
                                                        </div>

                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white">
                                                                {l.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                ID #{l.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                                        {l.nbrPlace} place(s)
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                                                        {l.type_logement?.type || 'Non défini'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/logements/${l.id}/edit`}
                                                            className="inline-flex items-center gap-2 rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-700 transition hover:bg-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            Modifier
                                                        </Link>

                                                        <button
                                                            onClick={() => confirmDelete(l)}
                                                            className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-14 text-center">
                                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800">
                                                    <Home className="h-8 w-8" />
                                                </div>

                                                <p className="font-bold text-gray-700 dark:text-gray-200">
                                                    Aucun logement trouvé
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Essayez de changer le filtre ou ajoutez un nouveau logement.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* DELETE MODAL */}
                    {openModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                            <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setOpenModal(false)}
                            />

                            <div className="relative w-full max-w-md rounded-[2rem] border border-gray-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800 dark:hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                                    <AlertTriangle className="h-7 w-7" />
                                </div>

                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                    Supprimer ce logement ?
                                </h3>

                                <p className="mt-3 text-gray-600 dark:text-gray-300">
                                    Cette action supprimera définitivement le logement
                                    <span className="font-bold"> {selectedLogement?.name}</span>.
                                </p>

                                <div className="mt-7 flex justify-end gap-3">
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        className="rounded-2xl bg-gray-100 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        onClick={deleteLogement}
                                        className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                {icon}
            </div>

            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {label}
            </p>

            <h3 className="mt-1 text-3xl font-black text-gray-900 dark:text-white">
                {value}
            </h3>
        </div>
    );
}