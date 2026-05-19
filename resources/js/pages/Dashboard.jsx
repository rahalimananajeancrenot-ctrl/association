import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Search,
    Users,
    Building2,
    Mail,
    Phone,
    MapPin,
    Eye,
    UserRound,
} from 'lucide-react';

export default function Dashboard({ members, entitesStats = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('dashboard'),
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

    const totalMembers = entitesStats.reduce(
        (total, entite) => total + Number(entite.members_count || 0),
        0
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-white">
                        Membres SAVA-U
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Liste des membres de l’association par entité
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Membres" />

            <div className="min-h-screen bg-gray-100 py-10 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">

                    {/* HEADER STAT TOTAL */}
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 p-8 shadow-xl">
                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-100">
                                    SAVA-U Association
                                </p>
                                <h1 className="text-3xl font-black text-white md:text-4xl">
                                    Tableau des membres
                                </h1>
                                <p className="mt-3 max-w-2xl text-sm text-emerald-50 md:text-base">
                                    Consultez les membres enregistrés, recherchez un utilisateur
                                    par son nom et visualisez les membres regroupés par entité.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/15 p-5 text-white backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-emerald-50">Total membres</p>
                                        <p className="text-4xl font-black">{totalMembers}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATS PAR ENTITÉ */}
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Membres par entité
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Calculé avec la colonne entite_id des utilisateurs
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {entitesStats.length > 0 ? (
                                entitesStats.map((entite) => (
                                    <div
                                        key={entite.id}
                                        className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                                <Building2 size={24} />
                                            </div>
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                                                Entité
                                            </span>
                                        </div>

                                        <h4 className="line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                                            {entite.name}
                                        </h4>

                                        <p className="mt-3 text-4xl font-black text-emerald-600 dark:text-emerald-400">
                                            {entite.members_count}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            membre{entite.members_count > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-400">
                                    Aucune entité trouvée.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RECHERCHE */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un membre par son nom..."
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    {/* LISTE DES MEMBRES */}
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Liste des membres
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {members?.total || 0} membre{members?.total > 1 ? 's' : ''} trouvé{members?.total > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {members?.data?.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {members.data.map((member) => (
                                    <div
                                        key={member.id}
                                        className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-lime-100 dark:from-zinc-800 dark:to-zinc-950">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <div className="rounded-full bg-white p-6 text-emerald-600 shadow-lg dark:bg-zinc-800 dark:text-emerald-400">
                                                        <UserRound size={54} />
                                                    </div>
                                                </div>
                                            )}

                                            {member.entite && (
                                                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow backdrop-blur dark:bg-zinc-950/80 dark:text-emerald-300">
                                                    {member.entite.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div className="space-y-4 p-5">
                                            <div>
                                                <h4 className="line-clamp-1 text-lg font-black text-gray-900 dark:text-white">
                                                    {member.name}
                                                </h4>

                                                <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {member.adresse
                                                        ? member.adresse
                                                        : 'Aucune adresse renseignée pour ce membre.'}
                                                </p>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                {member.email && (
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                        <Mail size={16} className="text-emerald-500" />
                                                        <span className="line-clamp-1">{member.email}</span>
                                                    </div>
                                                )}

                                                {member.contact && (
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                        <Phone size={16} className="text-emerald-500" />
                                                        <span>{member.contact}</span>
                                                    </div>
                                                )}

                                                {member.adresse && (
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                        <MapPin size={16} className="text-emerald-500" />
                                                        <span className="line-clamp-1">{member.adresse}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Link
                                                href={route('members.show', member.id)}
                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                                            >
                                                <Eye size={17} />
                                                Voir plus
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-zinc-800">
                                    <Users size={32} />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Aucun membre trouvé
                                </h4>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Essayez de modifier votre recherche.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {members?.links?.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {members.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                        link.active
                                            ? 'bg-emerald-600 text-white'
                                            : link.url
                                                ? 'bg-white text-gray-700 hover:bg-emerald-50 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-zinc-800'
                                                : 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-600'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}