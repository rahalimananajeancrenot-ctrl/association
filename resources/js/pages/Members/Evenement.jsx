import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Megaphone,
    CalendarDays,
    UserRound,
    Newspaper,
    ImageIcon,
} from 'lucide-react';

export default function Index({ evenements = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Événements & informations
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toutes les informations partagées par l’association
                    </p>
                </div>
            }
        >
            <Head title="Événements & informations" />

            <div className="min-h-screen bg-gray-100 py-10 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">

                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 p-6 text-white shadow-xl md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                    <Newspaper className="h-4 w-4" />
                                    <span className="text-sm font-semibold">
                                        Espace informations
                                    </span>
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Informations de SAVA-U
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                    Consultez ici les événements, annonces et informations importantes publiés par le secrétaire.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <Megaphone className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Publications
                                        </p>

                                        <p className="text-4xl font-black">
                                            {evenements.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {evenements.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {evenements.map((evenement) => (
                                <article
                                    key={evenement.id}
                                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                                >
                                    <div className="h-52 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-zinc-800 dark:to-zinc-950">
                                        {evenement.image ? (
                                            <img
                                                src={evenement.image}
                                                alt={evenement.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="rounded-3xl bg-white p-5 text-indigo-600 shadow-lg dark:bg-zinc-800 dark:text-indigo-300">
                                                    <ImageIcon className="h-14 w-14" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div>
                                            <h3 className="line-clamp-2 text-xl font-black text-gray-900 dark:text-white">
                                                {evenement.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                {evenement.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2 rounded-2xl bg-gray-50 p-3 text-sm dark:bg-zinc-900">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                <UserRound className="h-4 w-4 text-indigo-500" />
                                                <span>
                                                    Partagé par :{' '}
                                                    <strong>{evenement.shared_by || 'Non renseigné'}</strong>
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                <CalendarDays className="h-4 w-4 text-indigo-500" />
                                                <span>{evenement.created_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-950">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                                <Megaphone className="h-8 w-8" />
                            </div>

                            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                Aucune information disponible
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Les informations publiées par le secrétaire apparaîtront ici.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}