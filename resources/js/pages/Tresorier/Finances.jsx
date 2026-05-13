import { useState, useMemo } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Finances({
    entrees = [],
    sorties = [],
    ressources = [],
    users = [],
}) {
    const [filter, setFilter] = useState('toutes');
    const [openEntree, setOpenEntree] = useState(false);
    const [openSortie, setOpenSortie] = useState(false);
    const [openRessource, setOpenRessource] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const entreeForm = useForm({
        montant: '',
        description: '',
        ressource_financiere_id: '',
        user_id: '',
    });

    const sortieForm = useForm({
        montant: '',
        description: '',
        user_id: '',
    });

    const ressourceForm = useForm({
        ressource: '',
        montant: '',
        annee: new Date().getFullYear(),
    });

    const operations = useMemo(() => {
        const all = [
            ...entrees.map((e) => ({
                ...e,
                type: 'Entrée',
            })),
            ...sorties.map((s) => ({
                ...s,
                type: 'Sortie',
            })),
        ];

        return all.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }, [entrees, sorties]);

    const solde = useMemo(() => {
        const totalEntrees = entrees.reduce(
            (sum, e) => sum + Number(e.montant || 0),
            0
        );

        const totalSorties = sorties.reduce(
            (sum, s) => sum + Number(s.montant || 0),
            0
        );

        return totalEntrees - totalSorties;
    }, [entrees, sorties]);

    const submitEntree = (e) => {
        e.preventDefault();

        entreeForm.post(route('tresorier.entres.store'), {
            onSuccess: () => {
                setOpenEntree(false);
                entreeForm.reset();
            },
        });
    };

    const submitSortie = (e) => {
        e.preventDefault();

        sortieForm.post(route('tresorier.sorties.store'), {
            onSuccess: () => {
                setOpenSortie(false);
                sortieForm.reset();
            },
        });
    };

    const submitRessource = (e) => {
        e.preventDefault();

        ressourceForm.post(route('tresorier.ressources.store'), {
            onSuccess: () => {
                setOpenRessource(false);
                ressourceForm.reset();
            },
        });
    };

    const filteredOperations = operations.filter((op) => {
        if (filter === 'toutes') return true;
        if (filter === 'entrees') return op.type === 'Entrée';
        return op.type === 'Sortie';
    });

    const paginatedOperations = filteredOperations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Finances
                    </h1>

                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Solde :
                        <span
                            className={`ml-2 ${
                                solde >= 0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                            {solde} Ar
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="Finances" />

            <div className="space-y-6 p-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        <div className="flex flex-wrap gap-2">
                            <button
                                className={`rounded-lg px-4 py-2 font-semibold ${
                                    filter === 'toutes'
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                                }`}
                                onClick={() => setFilter('toutes')}
                            >
                                Toutes
                            </button>

                            <button
                                className={`rounded-lg px-4 py-2 font-semibold ${
                                    filter === 'entrees'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                                }`}
                                onClick={() => setFilter('entrees')}
                            >
                                Entrées
                            </button>

                            <button
                                className={`rounded-lg px-4 py-2 font-semibold ${
                                    filter === 'sorties'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                                }`}
                                onClick={() => setFilter('sorties')}
                            >
                                Sorties
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setOpenEntree(true)}
                                className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                            >
                                + Entrée
                            </button>

                            <button
                                onClick={() => setOpenSortie(true)}
                                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                            >
                                + Sortie
                            </button>

                            <button
                                onClick={() => setOpenRessource(true)}
                                className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700"
                            >
                                + Ressource
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-zinc-800">
                        {paginatedOperations.length === 0 ? (
                            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
                                Aucune opération.
                            </p>
                        ) : (
                            <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                                {paginatedOperations.map((op) => (
                                    <li
                                        key={`${op.type}-${op.id}`}
                                        className="flex flex-col gap-3 p-4 hover:bg-gray-50 dark:hover:bg-zinc-900 lg:flex-row lg:items-center lg:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                    op.type === 'Entrée'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                                                }`}
                                            >
                                                {op.type}
                                            </span>

                                            <span className="text-gray-700 dark:text-gray-300">
                                                {op.type === 'Entrée'
                                                    ? `${op.ressource_financiere?.ressource ?? '-'} - ${op.caisse?.user?.name ?? '-'}`
                                                    : op.description ?? '-'}
                                            </span>
                                        </div>

                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(op.created_at).toLocaleString('fr-FR')}
                                        </span>

                                        <span
                                            className={`font-bold ${
                                                op.type === 'Entrée'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            {op.type === 'Entrée' ? '+' : '-'} {op.montant} Ar
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {openEntree && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-950">
                        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            Ajouter une entrée
                        </h2>

                        <form onSubmit={submitEntree} className="space-y-3">
                            <select
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={entreeForm.data.user_id}
                                onChange={(e) => entreeForm.setData('user_id', e.target.value)}
                                required
                            >
                                <option value="">Choisir un membre</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={entreeForm.data.ressource_financiere_id}
                                onChange={(e) =>
                                    entreeForm.setData('ressource_financiere_id', e.target.value)
                                }
                                required
                            >
                                <option value="">Choisir une ressource</option>
                                {ressources.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.ressource}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                placeholder="Montant"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={entreeForm.data.montant}
                                onChange={(e) => entreeForm.setData('montant', e.target.value)}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={entreeForm.data.description}
                                onChange={(e) => entreeForm.setData('description', e.target.value)}
                            />

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setOpenEntree(false)}
                                    className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={entreeForm.processing}
                                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openSortie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-950">
                        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            Ajouter une sortie
                        </h2>

                        <form onSubmit={submitSortie} className="space-y-3">
                            <input
                                type="number"
                                placeholder="Montant"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={sortieForm.data.montant}
                                onChange={(e) => sortieForm.setData('montant', e.target.value)}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={sortieForm.data.description}
                                onChange={(e) => sortieForm.setData('description', e.target.value)}
                                required
                            />

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setOpenSortie(false)}
                                    className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={sortieForm.processing}
                                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openRessource && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-950">
                        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            Ajouter une ressource
                        </h2>

                        <form onSubmit={submitRessource} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Nom de la ressource"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={ressourceForm.data.ressource}
                                onChange={(e) => ressourceForm.setData('ressource', e.target.value)}
                                required
                            />

                            <input
                                type="number"
                                placeholder="Montant"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={ressourceForm.data.montant}
                                onChange={(e) => ressourceForm.setData('montant', e.target.value)}
                                required
                            />

                            <input
                                type="number"
                                placeholder="Année"
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                value={ressourceForm.data.annee}
                                onChange={(e) => ressourceForm.setData('annee', e.target.value)}
                                required
                            />

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setOpenRessource(false)}
                                    className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={ressourceForm.processing}
                                    className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}