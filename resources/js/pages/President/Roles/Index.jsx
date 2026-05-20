import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Search,
    ShieldCheck,
    UserRound,
    Mail,
    Save,
    Users,
    BadgeCheck,
    Crown,
} from 'lucide-react';

export default function Index({ users, roles = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('president.roles.index'),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Gestion des rôles
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Attribuer ou modifier les rôles des utilisateurs de SAVA-U
                    </p>
                </div>
            }
        >
            <Head title="Gestion des rôles" />

            <div className="space-y-6 p-4 md:p-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-xl md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                <ShieldCheck className="h-4 w-4" />
                                <span className="text-sm font-semibold">
                                    Administration
                                </span>
                            </div>

                            <h1 className="text-3xl font-black md:text-4xl">
                                Rôles utilisateurs
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                Gérez les accès des utilisateurs : Président, Trésorier,
                                Logement ou simple membre.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                            <div className="flex items-center gap-4">
                                <div className="rounded-2xl bg-white/20 p-4">
                                    <Users className="h-8 w-8" />
                                </div>

                                <div>
                                    <p className="text-sm text-white/80">
                                        Utilisateurs affichés
                                    </p>

                                    <p className="text-4xl font-black">
                                        {users?.total || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid gap-5 md:grid-cols-3">
                    <StatCard
                        title="Utilisateurs"
                        value={users?.total || 0}
                        icon={<Users className="h-8 w-8" />}
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                    />

                    <StatCard
                        title="Rôles disponibles"
                        value={roles.length}
                        icon={<BadgeCheck className="h-8 w-8" />}
                        className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    />

                    <StatCard
                        title="Gestion admin"
                        value="Spatie"
                        icon={<Crown className="h-8 w-8" />}
                        className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    />
                </div>

                {/* SEARCH */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom ou email..."
                            className="w-full rounded-2xl border border-gray-300 bg-gray-50 p-4 pl-12 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* TABLE */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-5">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            Liste des utilisateurs
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sélectionnez un rôle puis cliquez sur enregistrer.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-sm text-gray-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300">
                                    <th className="rounded-l-2xl p-4">Utilisateur</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Rôle actuel</th>
                                    <th className="rounded-r-2xl p-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users?.data?.length > 0 ? (
                                    users.data.map((user) => (
                                        <RoleRow
                                            key={user.id}
                                            user={user}
                                            roles={roles}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="py-12 text-center">
                                                <Users className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-zinc-700" />

                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    Aucun utilisateur trouvé
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Aucun résultat ne correspond à votre recherche.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {users?.links?.length > 3 && (
                        <div className="mt-5 flex flex-wrap justify-center gap-2">
                            {users.links.map((link, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : link.url
                                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                                                : 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-zinc-900 dark:text-gray-600'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function RoleRow({ user, roles }) {
    const { data, setData, patch, processing } = useForm({
        role: user.current_role || '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('president.roles.update', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <tr className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <td className="p-4">
                <div className="flex items-center gap-3">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                            <UserRound className="h-5 w-5" />
                        </div>
                    )}

                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                            {user.name}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID #{user.id}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {user.email}
                </div>
            </td>

            <td className="p-4">
                <select
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                >
                    <option value="">Aucun rôle</option>

                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </td>

            <td className="p-4 text-right">
                <form onSubmit={submit}>
                    <button
                        type="submit"
                        disabled={processing || !data.role}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save className="h-4 w-4" />
                        Enregistrer
                    </button>
                </form>
            </td>
        </tr>
    );
}

function StatCard({ title, value, icon, className }) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {title}
                    </p>

                    <h3 className="mt-1 text-3xl font-black text-gray-900 dark:text-white">
                        {value}
                    </h3>
                </div>

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${className}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}