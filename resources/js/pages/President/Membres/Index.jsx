import AppLayout from '@/Layouts/AppLayout';
import { Head, router, Link } from '@inertiajs/react';
import {
    Trash2,
    RefreshCw,
    Search,
    UserPlus,
    Users,
    Filter,
    Mail,
    School,
    GraduationCap,
    Building2,
    Home,
    AlertTriangle,
    X
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Index({
    membres,
    filters,
    niveaux = [],
    logements = [],
    classes = [],
    etablissements = [],
    typeLogements = [],
    entites = [],
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState(filters.search ?? '');

    const isFirstRender = useRef(true);

    const syncFilters = (newFilters) => {
        const cleaned = Object.fromEntries(
            Object.entries(newFilters).filter(
                ([_, v]) => v !== '' && v !== null && v !== undefined
            )
        );

        router.get(route('president.membres.index'), cleaned, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delay = setTimeout(() => {
            syncFilters({ ...filters, search });
        }, 400);

        return () => clearTimeout(delay);
    }, [search]);

    const updateFilter = (key, value) => {
        syncFilters({
            ...filters,
            search,
            [key]: value,
        });
    };

    const resetFilters = () => {
        setSearch('');

        router.get(route('president.membres.index'), {}, {
            preserveState: false,
            replace: true,
        });
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    };

    const deleteMember = () => {
        router.delete(route('president.membres.destroy', deleteId), {
            preserveScroll: true,
            onSuccess: () => {
                setModalOpen(false);
                setDeleteId(null);
            },
            onError: () => {
                setModalOpen(false);
                setDeleteId(null);
            },
        });
    };

    const totalMembres = membres?.data?.length || 0;

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                        Gestion des membres
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                        Recherche, filtrage et suppression des membres
                    </p>
                </div>
            }
        >
            <Head title="Membres" />

            <div className="min-h-screen overflow-x-hidden bg-gray-100 px-3 py-5 dark:bg-black sm:px-4 sm:py-8">
                <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">

                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 text-white shadow-xl sm:rounded-[2rem] sm:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="min-w-0">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold sm:px-4 sm:text-sm">
                                    <Users className="h-4 w-4" />
                                    Module membres
                                </div>

                                <h1 className="break-words text-2xl font-black sm:text-3xl md:text-4xl">
                                    Liste des membres
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                                    Consultez les membres, filtrez par logement,
                                    entité, établissement, niveau ou classe.
                                </p>
                            </div>

                            <Link
                                href={route('president.membres.register')}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50 sm:w-auto"
                            >
                                <UserPlus className="h-5 w-5" />
                                Ajouter un membre
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <StatCard icon={<Users />} label="Membres affichés" value={totalMembres} />
                        <StatCard icon={<Home />} label="Logements" value={logements.length} />
                        <StatCard icon={<Building2 />} label="Entités" value={entites.length} />
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2rem] sm:p-5">
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-base"
                                    placeholder="Rechercher un membre..."
                                />
                            </div>

                            <button
                                onClick={resetFilters}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700 sm:w-auto"
                            >
                                <RefreshCw className="h-5 w-5" />
                                Réinitialiser
                            </button>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2rem] sm:p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <Filter className="h-5 w-5 text-emerald-600" />
                            <h3 className="font-black text-gray-900 dark:text-white">
                                Filtres avancés
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            <SelectFilter value={filters.entite || ''} onChange={(e) => updateFilter('entite', e.target.value)}>
                                <option value="">Toutes les entités</option>
                                {entites.map((e) => <option key={e.id} value={e.id}>{e.entite}</option>)}
                            </SelectFilter>

                            <SelectFilter value={filters.logement || ''} onChange={(e) => updateFilter('logement', e.target.value)}>
                                <option value="">Tous les logements</option>
                                {logements.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </SelectFilter>

                            <SelectFilter value={filters.type_logement || ''} onChange={(e) => updateFilter('type_logement', e.target.value)}>
                                <option value="">Tous les types</option>
                                {typeLogements.map((t) => <option key={t.id} value={t.id}>{t.type}</option>)}
                            </SelectFilter>

                            <SelectFilter value={filters.etablissement || ''} onChange={(e) => updateFilter('etablissement', e.target.value)}>
                                <option value="">Tous les établissements</option>
                                {etablissements.map((e) => <option key={e.id} value={e.id}>{e.etablissement}</option>)}
                            </SelectFilter>

                            <SelectFilter value={filters.niveau || ''} onChange={(e) => updateFilter('niveau', e.target.value)}>
                                <option value="">Tous les niveaux</option>
                                {niveaux.map((n) => <option key={n.id} value={n.id}>{n.niveau}</option>)}
                            </SelectFilter>

                            <SelectFilter value={filters.classe || ''} onChange={(e) => updateFilter('classe', e.target.value)}>
                                <option value="">Toutes les classes</option>
                                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </SelectFilter>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2rem]">
                        <div className="border-b border-gray-200 p-5 dark:border-zinc-800 sm:p-6">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white sm:text-xl">
                                Membres enregistrés
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {totalMembres} membre(s) affiché(s)
                            </p>
                        </div>

                        {/* MOBILE / TABLET CARDS */}
                        <div className="grid gap-4 p-4 lg:hidden">
                            {membres.data.length === 0 ? (
                                <EmptyState />
                            ) : (
                                membres.data.map((user) => (
                                    <MemberCard
                                        key={user.id}
                                        user={user}
                                        onDelete={() => confirmDelete(user.id)}
                                    />
                                ))
                            )}
                        </div>

                        {/* DESKTOP TABLE */}
                        <div className="hidden lg:block">
                            <div className="overflow-x-auto">
                                <table className="min-w-[1050px] w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-zinc-950 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-4">Nom</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Entité</th>
                                            <th className="px-6 py-4">Établissement</th>
                                            <th className="px-6 py-4">Niveau</th>
                                            <th className="px-6 py-4">Classe</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                        {membres.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-14 text-center">
                                                    <EmptyState />
                                                </td>
                                            </tr>
                                        ) : (
                                            membres.data.map((user) => (
                                                <tr key={user.id} className="transition hover:bg-gray-50 dark:hover:bg-zinc-800/60">
                                                    <td className="px-6 py-4">
                                                        <UserIdentity user={user} />
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex max-w-[230px] items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-300">
                                                            <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                                                            <span className="truncate">{user.email}</span>
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4"><Badge icon={<Building2 />} text={user.entite?.entite || '—'} /></td>
                                                    <td className="px-6 py-4"><Badge icon={<School />} text={user.etablissement?.etablissement || '—'} /></td>
                                                    <td className="px-6 py-4"><Badge icon={<GraduationCap />} text={user.niveau?.niveau || '—'} /></td>
                                                    <td className="px-6 py-4"><Badge icon={<Users />} text={user.classe?.name || '—'} /></td>

                                                    <td className="px-6 py-4 text-right">
                                                        <DeleteButton onClick={() => confirmDelete(user.id)} />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setModalOpen(false)}
                    />

                    <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                            <AlertTriangle className="h-7 w-7" />
                        </div>

                        <h3 className="pr-10 text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                            Supprimer ce membre ?
                        </h3>

                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                            Cette action supprimera définitivement ce membre.
                        </p>

                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="rounded-2xl bg-gray-100 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
                            >
                                Annuler
                            </button>

                            <button
                                onClick={deleteMember}
                                className="rounded-2xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
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

function UserIdentity({ user }) {
    return (
        <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
                <img
                    src={`/storage/${user.image}`}
                    alt={user.name}
                    className="h-11 w-11 shrink-0 rounded-2xl object-cover"
                />
            ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
            )}

            <div className="min-w-0">
                <p className="truncate font-bold text-gray-900 dark:text-white">
                    {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    ID #{user.id}
                </p>
            </div>
        </div>
    );
}

function MemberCard({ user, onDelete }) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-3">
                <UserIdentity user={user} />
                <button
                    onClick={onDelete}
                    className="shrink-0 rounded-xl bg-red-100 p-2 text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-4 space-y-2">
                <InfoLine icon={<Mail />} text={user.email || '—'} />
                <InfoLine icon={<Building2 />} text={user.entite?.entite || '—'} />
                <InfoLine icon={<School />} text={user.etablissement?.etablissement || '—'} />
                <InfoLine icon={<GraduationCap />} text={user.niveau?.niveau || '—'} />
                <InfoLine icon={<Users />} text={user.classe?.name || '—'} />
            </div>
        </div>
    );
}

function InfoLine({ icon, text }) {
    return (
        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="shrink-0 text-gray-400">{icon}</span>
            <span className="truncate">{text}</span>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-gray-50 p-8 text-center dark:bg-zinc-950">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800">
                <Users className="h-8 w-8" />
            </div>
            <p className="font-bold text-gray-700 dark:text-gray-200">
                Aucun membre trouvé
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Essayez de modifier les filtres ou ajoutez un membre.
            </p>
        </div>
    );
}

function SelectFilter({ children, ...props }) {
    return (
        <select
            className="w-full min-w-0 rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-base"
            {...props}
        >
            {children}
        </select>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="min-w-0 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2rem] sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 sm:h-12 sm:w-12">
                {icon}
            </div>

            <p className="truncate text-sm font-semibold text-gray-500 dark:text-gray-400">
                {label}
            </p>

            <h3 className="mt-1 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {value}
            </h3>
        </div>
    );
}

function Badge({ icon, text }) {
    return (
        <span className="inline-flex max-w-[180px] items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
            <span className="shrink-0">{icon}</span>
            <span className="truncate">{text}</span>
        </span>
    );
}

function DeleteButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
        >
            <Trash2 className="h-4 w-4" />
            Supprimer
        </button>
    );
}