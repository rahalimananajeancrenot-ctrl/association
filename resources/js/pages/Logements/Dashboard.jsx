import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Users,
    Home,
    Layers,
    Plus,
    ListChecks,
    BedDouble,
    CheckCircle,
    XCircle,
    ArrowRight,
    Activity
} from 'lucide-react';

export default function Dashboard({ logements = [], types = [] }) {
    const totalLogements = logements.length;
    const totalPlaces = logements.reduce((sum, l) => sum + Number(l.nbrPlace || 0), 0);
    const totalTypes = types.length;

    const occupes = logements.reduce(
        (sum, l) => sum + (l.users?.length || 0),
        0
    );

    const disponibles = totalPlaces - occupes;
    const tauxOccupation = totalPlaces > 0
        ? Math.round((occupes / totalPlaces) * 100)
        : 0;

    const latestLogements = logements.slice(0, 5);

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Dashboard Logement
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Vue globale des logements, places et disponibilités
                    </p>
                </div>
            }
        >
            <Head title="Dashboard Logement" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* HERO */}
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
                        <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-white/10" />

                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <Activity className="h-4 w-4" />
                                    Gestion des logements
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Tableau de bord des logements
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Suivez les logements, les places occupées, les disponibilités
                                    et les derniers logements enregistrés.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <p className="text-sm text-white/80">Taux d’occupation</p>
                                <div className="mt-2 flex items-end gap-2">
                                    <span className="text-4xl font-black">
                                        {tauxOccupation}%
                                    </span>
                                    <span className="mb-1 text-white/80">
                                        occupé
                                    </span>
                                </div>

                                <div className="mt-4 h-3 w-56 overflow-hidden rounded-full bg-white/20">
                                    <div
                                        className="h-full rounded-full bg-white"
                                        style={{ width: `${tauxOccupation}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            icon={<Building2 />}
                            label="Logements"
                            value={totalLogements}
                            color="blue"
                        />

                        <StatCard
                            icon={<BedDouble />}
                            label="Places totales"
                            value={totalPlaces}
                            color="purple"
                        />

                        <StatCard
                            icon={<Layers />}
                            label="Types"
                            value={totalTypes}
                            color="orange"
                        />

                        <StatCard
                            icon={<CheckCircle />}
                            label="Disponibles"
                            value={disponibles}
                            color="green"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                        Actions rapides
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Accédez rapidement aux opérations principales.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Link
                                    href="/logements/create"
                                    className="group rounded-3xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-blue-500/10"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <Plus className="h-6 w-6" />
                                    </div>

                                    <h4 className="font-black text-gray-900 dark:text-white">
                                        Ajouter un logement
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Créer un nouveau logement avec son type et ses places.
                                    </p>

                                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                                        Commencer
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                <Link
                                    href="/logements"
                                    className="group rounded-3xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:bg-purple-50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-purple-500/10"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white">
                                        <ListChecks className="h-6 w-6" />
                                    </div>

                                    <h4 className="font-black text-gray-900 dark:text-white">
                                        Gérer les logements
                                    </h4>

                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Modifier, filtrer ou supprimer les logements existants.
                                    </p>

                                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-purple-600">
                                        Voir la liste
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* MINI SUMMARY */}
                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                Résumé
                            </h3>

                            <div className="mt-5 space-y-4">
                                <SummaryItem
                                    label="Places occupées"
                                    value={occupes}
                                    icon={<Users />}
                                />

                                <SummaryItem
                                    label="Places libres"
                                    value={disponibles}
                                    icon={<CheckCircle />}
                                />

                                <SummaryItem
                                    label="Places totales"
                                    value={totalPlaces}
                                    icon={<BedDouble />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* LATEST */}
                    <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 dark:border-zinc-800 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                    Derniers logements
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Les 5 derniers logements enregistrés.
                                </p>
                            </div>

                            <Link
                                href="/logements"
                                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                            >
                                Voir tout
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-zinc-950 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4">Nom</th>
                                        <th className="px-6 py-4">Places</th>
                                        <th className="px-6 py-4">Occupés</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Statut</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                                    {latestLogements.length > 0 ? (
                                        latestLogements.map((l) => {
                                            const occupesLogement = l.users?.length || 0;
                                            const isFull = occupesLogement >= Number(l.nbrPlace || 0);

                                            return (
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
                                                                    Logement #{l.id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">
                                                        {l.nbrPlace}
                                                    </td>

                                                    <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">
                                                        {occupesLogement}
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                                                            {l.type_logement?.type || 'Non défini'}
                                                        </span>
                                                    </td>

                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${
                                                                isFull
                                                                    ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                                                                    : 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300'
                                                            }`}
                                                        >
                                                            {isFull ? (
                                                                <XCircle className="h-4 w-4" />
                                                            ) : (
                                                                <CheckCircle className="h-4 w-4" />
                                                            )}

                                                            {isFull ? 'Complet' : 'Disponible'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-14 text-center">
                                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800">
                                                    <Building2 className="h-8 w-8" />
                                                </div>

                                                <p className="font-bold text-gray-700 dark:text-gray-200">
                                                    Aucun logement enregistré
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Ajoutez un logement pour commencer.
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

function StatCard({ icon, label, value, color = 'blue' }) {
    const colors = {
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300',
    };

    return (
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${colors[color]}`}>
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

function SummaryItem({ icon, label, value }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    {icon}
                </div>

                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {label}
                </span>
            </div>

            <span className="text-lg font-black text-gray-900 dark:text-white">
                {value}
            </span>
        </div>
    );
}