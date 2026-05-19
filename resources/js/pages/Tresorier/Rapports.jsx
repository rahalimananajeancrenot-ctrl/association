import AppLayout from '@/Layouts/AppLayout';
import { Head, router } from '@inertiajs/react';

import {
    Users,
    CheckCircle,
    XCircle,
    Filter,
    Home,
    FileText,
    ShieldCheck,
    FileDown,
} from 'lucide-react';

export default function Rapports({
    membres = [],
    totalMembres = 0,
    filtre = 'tous',
}) {
    const changerFiltre = (valeur) => {
        router.get(
            route('tresorier.rapports.index'),
            { filtre: valeur },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const membresPayes = membres.filter((membre) => membre.paye).length;
    const membresNonPayes = membres.length - membresPayes;

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Rapport des Membres
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Suivi du paiement du droit annuel des membres
                    </p>
                </div>
            }
        >
            <Head title="Rapports" />

            <div className="space-y-6 p-4 md:p-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 p-6 text-white shadow-xl md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-sm font-semibold">
                                    Rapport annuel
                                </span>
                            </div>

                            <h1 className="text-3xl font-black md:text-4xl">
                                Droits annuels des membres
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                Consultez les membres ayant payé, les membres non payés,
                                leur logement attribué et le statut de paiement du droit annuel.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <ShieldCheck className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Membres affichés
                                        </p>

                                        <p className="text-4xl font-black">
                                            {membres.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={route('tresorier.rapports.pdf', { filtre })}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-4 text-sm font-black text-amber-700 shadow-lg transition hover:bg-amber-50"
                            >
                                <FileDown className="h-5 w-5" />
                                Exporter PDF
                            </a>
                        </div>

                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    <StatCard
                        title="Total membres"
                        value={totalMembres}
                        icon={<Users className="h-8 w-8" />}
                        className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    />

                    <StatCard
                        title="Payés"
                        value={membresPayes}
                        icon={<CheckCircle className="h-8 w-8" />}
                        className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    />

                    <StatCard
                        title="Non payés"
                        value={membresNonPayes}
                        icon={<XCircle className="h-8 w-8" />}
                        className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    />

                </div>

                {/* FILTRES */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <Filter className="h-5 w-5 text-amber-600" />

                                <h3 className="font-black text-gray-900 dark:text-white">
                                    Filtres
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => changerFiltre('tous')}
                                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                                        filtre === 'tous'
                                            ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                                            : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-amber-500/10 dark:hover:text-amber-300'
                                    }`}
                                >
                                    Tous
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changerFiltre('actifs')}
                                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                                        filtre === 'actifs'
                                            ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                            : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-green-500/10 dark:hover:text-green-300'
                                    }`}
                                >
                                    Payés
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changerFiltre('non_actifs')}
                                    className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                                        filtre === 'non_actifs'
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                                            : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-red-500/10 dark:hover:text-red-300'
                                    }`}
                                >
                                    Non payés
                                </button>
                            </div>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 dark:border-zinc-700 dark:text-gray-300">
                            <Users className="h-4 w-4" />
                            {membres.length} résultat(s)
                        </div>

                    </div>
                </div>

                {/* TABLEAU */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-5">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            Liste des membres
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Statut du paiement du droit annuel avec logement attribué
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-sm text-gray-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300">
                                    <th className="rounded-l-2xl p-4">Nom</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Logement / Adresse</th>
                                    <th className="rounded-r-2xl p-4">Statut</th>
                                </tr>
                            </thead>

                            <tbody>
                                {membres.length > 0 ? (
                                    membres.map((membre) => (
                                        <tr
                                            key={membre.id}
                                            className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                                        {membre.name?.charAt(0)?.toUpperCase() || 'M'}
                                                    </div>

                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white">
                                                            {membre.name}
                                                        </p>

                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            Membre SAVA-U
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                                {membre.email || 'Non renseigné'}
                                            </td>

                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Home className="h-4 w-4 text-gray-400" />

                                                    <span
                                                        className={
                                                            membre.adresse === 'Non attribué'
                                                                ? 'font-semibold text-red-600 dark:text-red-400'
                                                                : 'text-gray-600 dark:text-gray-300'
                                                        }
                                                    >
                                                        {membre.adresse || membre.logement || 'Non attribué'}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
                                                        membre.paye
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                                    }`}
                                                >
                                                    {membre.paye ? (
                                                        <CheckCircle className="h-4 w-4" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4" />
                                                    )}

                                                    {membre.paye ? 'Payé' : 'Non payé'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="py-12 text-center">
                                                <Users className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-zinc-700" />

                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    Aucun membre trouvé
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Aucun résultat ne correspond au filtre sélectionné.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AppLayout>
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