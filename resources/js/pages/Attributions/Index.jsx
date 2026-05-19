import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Plus,
    Users,
    Home,
    FileText,
    ExternalLink,
    ClipboardList
} from 'lucide-react';

export default function Index({ attributions = [] }) {
    const getPdfUrl = (path) => {
        if (!path) return '#';

        return `/storage/${path}?inline=1`;
    };

    return (
        <AppLayout
            header={
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Les attributions
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Liste des étudiants attribués aux logements
                    </p>
                </div>
            }
        >
            <Head title="Voir les attributions" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-8">

                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <ClipboardList className="h-4 w-4" />
                                    Module attributions
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Gestion des attributions
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Consultez les logements attribués aux étudiants et ouvrez
                                    les documents PDF associés.
                                </p>
                            </div>

                            <Link
                                href={route('attributions.create')}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                            >
                                <Plus className="h-5 w-5" />
                                Nouvelle attribution
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <StatCard
                            icon={<ClipboardList />}
                            label="Attributions"
                            value={attributions.length}
                        />

                        <StatCard
                            icon={<Users />}
                            label="Étudiants attribués"
                            value={attributions.reduce(
                                (total, a) => total + (a.etudiants?.length || 0),
                                0
                            )}
                        />

                        <StatCard
                            icon={<Home />}
                            label="Logements utilisés"
                            value={
                                new Set(
                                    attributions
                                        .map((a) => a.logement?.id)
                                        .filter(Boolean)
                                ).size
                            }
                        />
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="border-b border-gray-200 p-6 dark:border-zinc-800">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                Liste des attributions
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {attributions.length} attribution(s) enregistrée(s)
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-zinc-950 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Étudiants</th>
                                        <th className="px-6 py-4">Logement</th>
                                        <th className="px-6 py-4 text-right">PDF</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {attributions.length > 0 ? (
                                        attributions.map((a) => (
                                            <tr
                                                key={a.id}
                                                className="transition hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                                            <Users className="h-5 w-5" />
                                                        </div>

                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white">
                                                                {a.etudiants?.length > 0
                                                                    ? a.etudiants.map((e) => e.name).join(', ')
                                                                    : 'Aucun étudiant'}
                                                            </p>

                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                Attribution #{a.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                                                        <Home className="h-4 w-4" />
                                                        {a.logement?.name || 'Non défini'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    {a.pdf_path ? (
                                                        <a
                                                            href={getPdfUrl(a.pdf_path)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                            Voir PDF
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">
                                                            Aucun PDF
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-14 text-center">
                                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800">
                                                    <ClipboardList className="h-8 w-8" />
                                                </div>

                                                <p className="font-bold text-gray-700 dark:text-gray-200">
                                                    Aucune attribution
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Créez une nouvelle attribution pour commencer.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

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