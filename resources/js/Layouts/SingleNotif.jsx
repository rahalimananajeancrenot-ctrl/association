import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BellRing,
    CalendarDays,
    ImageIcon,
    Megaphone,
    UserRound,
    CheckCircle,
} from 'lucide-react';

export default function SingleNotif({ notification, evenement }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Détail de la notification
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Information publiée par l’association
                    </p>
                </div>
            }
        >
            <Head title="Notification" />

            <div className="min-h-screen bg-gray-100 py-10 dark:bg-black">
                <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">

                    <Link
                        href={route('membre.evenements.index')}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-zinc-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux événements
                    </Link>

                    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 p-6 text-white shadow-xl md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                    <BellRing className="h-4 w-4" />
                                    <span className="text-sm font-semibold">
                                        Notification
                                    </span>
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    {notification?.data?.title || 'Nouvelle information'}
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                    Cette notification a été ouverte et marquée comme lue automatiquement.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <CheckCircle className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Statut
                                        </p>

                                        <p className="text-2xl font-black">
                                            Lu
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {evenement ? (
                        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="h-72 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-zinc-800 dark:to-zinc-950">
                                {evenement.image ? (
                                    <img
                                        src={evenement.image}
                                        alt={evenement.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <div className="rounded-3xl bg-white p-6 text-indigo-600 shadow-lg dark:bg-zinc-800 dark:text-indigo-300">
                                            <ImageIcon className="h-16 w-16" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6 p-6 md:p-8">
                                <div>
                                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                                        <Megaphone className="h-4 w-4" />
                                        Événement / Information
                                    </div>

                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                                        {evenement.title}
                                    </h2>

                                    <p className="mt-4 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-300">
                                        {evenement.description}
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-zinc-900">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                            <UserRound className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Partagé par
                                            </p>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {evenement.shared_by || 'Non renseigné'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-zinc-900">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                                            <CalendarDays className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                Date de publication
                                            </p>
                                            <p className="font-bold text-gray-900 dark:text-white">
                                                {evenement.created_at}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-950">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-300">
                                <BellRing className="h-8 w-8" />
                            </div>

                            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                Événement introuvable
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                L’événement lié à cette notification a peut-être été supprimé.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}