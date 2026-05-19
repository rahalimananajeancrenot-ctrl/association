import { useState, useMemo } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    X,
    Search,
    User,
    Wallet,
    FileText,
    PlusCircle,
    MinusCircle,
    Coins,
    Calendar,
} from 'lucide-react';

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

    const [userSearch, setUserSearch] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');

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

    const filteredUsers = useMemo(() => {
        if (!userSearch.trim()) return users;

        return users.filter((user) =>
            user.name?.toLowerCase().includes(userSearch.toLowerCase())
        );
    }, [users, userSearch]);

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

    const closeEntreeModal = () => {
        setOpenEntree(false);
        setUserSearch('');
        setSelectedUserName('');
        entreeForm.reset();
    };

    const closeSortieModal = () => {
        setOpenSortie(false);
        sortieForm.reset();
    };

    const closeRessourceModal = () => {
        setOpenRessource(false);
        ressourceForm.reset();
    };

    const handleSelectUser = (user) => {
        entreeForm.setData('user_id', user.id);
        setSelectedUserName(user.name);
        setUserSearch(user.name);
    };

    const handleSelectRessource = (ressourceId) => {
        const selectedRessource = ressources.find(
            (ressource) => String(ressource.id) === String(ressourceId)
        );

        entreeForm.setData({
            ...entreeForm.data,
            ressource_financiere_id: ressourceId,
            montant: selectedRessource ? selectedRessource.montant : '',
        });
    };

    const submitEntree = (e) => {
        e.preventDefault();

        entreeForm.post(route('tresorier.entres.store'), {
            onSuccess: () => {
                closeEntreeModal();
            },
        });
    };

    const submitSortie = (e) => {
        e.preventDefault();

        sortieForm.post(route('tresorier.sorties.store'), {
            onSuccess: () => {
                closeSortieModal();
            },
        });
    };

    const submitRessource = (e) => {
        e.preventDefault();

        ressourceForm.post(route('tresorier.ressources.store'), {
            onSuccess: () => {
                closeRessourceModal();
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
                                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                            >
                                <PlusCircle size={18} />
                                Entrée
                            </button>

                            <button
                                onClick={() => setOpenSortie(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                            >
                                <MinusCircle size={18} />
                                Sortie
                            </button>

                            <button
                                onClick={() => setOpenRessource(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700"
                            >
                                <Coins size={18} />
                                Ressource
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
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 p-4 pt-10 pb-10 backdrop-blur-sm">
                    <div className="relative mx-auto my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-950">
                        <button
                            type="button"
                            onClick={closeEntreeModal}
                            className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-red-950 dark:hover:text-red-300"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-5">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                <PlusCircle size={26} />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Ajouter une entrée
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Recherchez un membre, choisissez une ressource et le montant sera rempli automatiquement.
                            </p>
                        </div>

                        <form onSubmit={submitEntree} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Membre
                                </label>

                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Rechercher un membre par son nom..."
                                        className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                        value={userSearch}
                                        onChange={(e) => {
                                            setUserSearch(e.target.value);
                                            setSelectedUserName('');
                                            entreeForm.setData('user_id', '');
                                        }}
                                        required
                                    />
                                </div>

                                {userSearch && !selectedUserName && (
                                    <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user) => (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => handleSelectUser(user)}
                                                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-green-50 dark:hover:bg-zinc-800"
                                                >
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                                        <User size={18} />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                            {user.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {user.email ?? 'Aucun email'}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                Aucun utilisateur trouvé.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Ressource financière
                                </label>

                                <div className="relative">
                                    <Wallet
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <select
                                        className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                        value={entreeForm.data.ressource_financiere_id}
                                        onChange={(e) => handleSelectRessource(e.target.value)}
                                        required
                                    >
                                        <option value="">Choisir une ressource</option>
                                        {ressources.map((ressource) => (
                                            <option key={ressource.id} value={ressource.id}>
                                                {ressource.ressource} - {ressource.montant} Ar
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Montant
                                </label>

                                <div className="relative">
                                    <Coins
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Montant"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3 pl-10 font-semibold text-green-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-green-300"
                                        value={entreeForm.data.montant}
                                        onChange={(e) => entreeForm.setData('montant', e.target.value)}
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Description
                                </label>

                                <div className="relative">
                                    <FileText
                                        size={18}
                                        className="absolute left-3 top-3.5 text-gray-400"
                                    />

                                    <textarea
                                        placeholder="Description"
                                        rows="3"
                                        className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                        value={entreeForm.data.description}
                                        onChange={(e) => entreeForm.setData('description', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={closeEntreeModal}
                                    className="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={entreeForm.processing || !entreeForm.data.user_id}
                                    className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openSortie && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 p-4 pt-10 pb-10 backdrop-blur-sm">
                    <div className="relative mx-auto my-8 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-950">
                        <button
                            type="button"
                            onClick={closeSortieModal}
                            className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-red-950 dark:hover:text-red-300"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-5">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                <MinusCircle size={26} />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Ajouter une sortie
                            </h2>
                        </div>

                        <form onSubmit={submitSortie} className="space-y-4">
                            <div className="relative">
                                <Coins
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    placeholder="Montant"
                                    className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    value={sortieForm.data.montant}
                                    onChange={(e) => sortieForm.setData('montant', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <FileText
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    value={sortieForm.data.description}
                                    onChange={(e) => sortieForm.setData('description', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={closeSortieModal}
                                    className="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={sortieForm.processing}
                                    className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openRessource && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 p-4 pt-10 pb-10 backdrop-blur-sm">
                    <div className="relative mx-auto my-8 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-950">
                        <button
                            type="button"
                            onClick={closeRessourceModal}
                            className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-red-950 dark:hover:text-red-300"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-5">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                <Coins size={26} />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Ajouter une ressource
                            </h2>
                        </div>

                        <form onSubmit={submitRessource} className="space-y-4">
                            <div className="relative">
                                <Wallet
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Nom de la ressource"
                                    className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    value={ressourceForm.data.ressource}
                                    onChange={(e) => ressourceForm.setData('ressource', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Coins
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    placeholder="Montant"
                                    className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    value={ressourceForm.data.montant}
                                    onChange={(e) => ressourceForm.setData('montant', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    placeholder="Année"
                                    className="w-full rounded-xl border border-gray-300 bg-white p-3 pl-10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    value={ressourceForm.data.annee}
                                    onChange={(e) => ressourceForm.setData('annee', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={closeRessourceModal}
                                    className="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={ressourceForm.processing}
                                    className="rounded-xl bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
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