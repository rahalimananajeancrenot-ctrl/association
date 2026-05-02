import AppLayout from '@/Layouts/AppLayout';
import { Head, router, Link } from '@inertiajs/react';
import { Trash2, RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Index({
    membres,
    filters,
    niveaux,
    logements,
    classes,
    etablissements,
    typeLogements,
    entites
}) {

    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');

    // ✅ Ref pour éviter le déclenchement du useEffect au premier render
    const isFirstRender = useRef(true);

    // 🔥 SYNC SEARCH + FILTERS
    const syncFilters = (newFilters) => {
        // ✅ Nettoie les valeurs vides pour ne pas polluer l'URL
        const cleaned = Object.fromEntries(
            Object.entries(newFilters).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
        );

        router.get(route('president.membres.index'), cleaned, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    // 🔍 SEARCH debounce — ne se déclenche pas au montage
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delay = setTimeout(() => {
            syncFilters({
                ...filters,
                search
            });
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    // 🎯 FILTER
    const updateFilter = (key, value) => {
        syncFilters({
            ...filters,
            search,
            [key]: value,
        });
    };

    // 🔄 RESET
    const resetFilters = () => {
        setSearch('');
        router.get(route('president.membres.index'), {}, {
            preserveState: false,
            replace: true
        });
    };

    // 🗑 DELETE
    const confirmDelete = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const deleteMember = () => {
        router.delete(route('president.membres.destroy', deleteId), {
            preserveScroll: true,
            onSuccess: () => {
                // ✅ Inertia recharge automatiquement — pas besoin de router.reload()
                setModalOpen(false);
                setDeleteId(null);
            },
            onError: () => {
                setModalOpen(false);
                setDeleteId(null);
            }
        });
    };

    return (
        <AppLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        Gestion des membres
                    </h2>
                    <Link href={route('register')} className="btn btn-primary">
                        Ajouter un membre
                    </Link>
                </div>
            }
        >
            <Head title="Membres" />

            <div className="p-6 space-y-6 bg-gray-100 dark:bg-black min-h-screen">

                {/* SEARCH */}
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-700"
                        placeholder="Rechercher un membre..."
                    />

                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <RefreshCw size={18} />
                        Réinitialiser
                    </button>
                </div>

                {/* FILTERS */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

                    <select
                        onChange={e => updateFilter('entite', e.target.value)}
                        value={filters.entite || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Toutes les entités</option>
                        {entites.map(e => (
                            <option key={e.id} value={e.id}>{e.entite}</option>
                        ))}
                    </select>

                    <select
                        onChange={e => updateFilter('logement', e.target.value)}
                        value={filters.logement || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Tous les logements</option>
                        {logements.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>

                    <select
                        onChange={e => updateFilter('type_logement', e.target.value)}
                        value={filters.type_logement || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Tous les types</option>
                        {typeLogements.map(t => (
                            <option key={t.id} value={t.id}>{t.type}</option>
                        ))}
                    </select>

                    <select
                        onChange={e => updateFilter('etablissement', e.target.value)}
                        value={filters.etablissement || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Tous les établissements</option>
                        {etablissements.map(e => (
                            <option key={e.id} value={e.id}>{e.etablissement}</option>
                        ))}
                    </select>

                    <select
                        onChange={e => updateFilter('niveau', e.target.value)}
                        value={filters.niveau || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Tous les niveaux</option>
                        {niveaux.map(n => (
                            <option key={n.id} value={n.id}>{n.niveau}</option>
                        ))}
                    </select>

                    <select
                        onChange={e => updateFilter('classe', e.target.value)}
                        value={filters.classe || ''}
                        className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
                    >
                        <option value="">Toutes les classes</option>
                        {classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                </div>

                {/* TABLE */}
                <div className="p-5 rounded-2xl shadow bg-white dark:bg-zinc-900">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Entité</th>
                                <th>Établissement</th>
                                <th>Niveau</th>
                                <th>Classe</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {membres.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-6 text-gray-400">
                                        Aucun membre trouvé.
                                    </td>
                                </tr>
                            ) : (
                                membres.data.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.entite?.entite}</td>
                                        <td>{user.etablissement?.etablissement}</td>
                                        <td>{user.niveau?.niveau}</td>
                                        <td>{user.classe?.name}</td>
                                        <td>
                                            <button
                                                onClick={() => confirmDelete(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* MODAL SUPPRESSION */}
            {modalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    onClick={() => setModalOpen(false)} // ✅ Ferme en cliquant dehors
                >
                    <div
                        className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg w-80"
                        onClick={e => e.stopPropagation()} // ✅ Empêche la fermeture en cliquant dans la modal
                    >
                        <h3 className="text-lg font-bold">Confirmation</h3>
                        <p className="py-4">Voulez-vous supprimer ce membre ?</p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={deleteMember}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}