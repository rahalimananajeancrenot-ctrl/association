import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    CheckCircle,
    XCircle,
    UserRound,
    Wallet,
    CalendarDays,
    BadgeCheck,
    AlertTriangle,
    Mail,
    Phone,
} from 'lucide-react';

export default function Infos({ membre, droitAnnuel, paiement }) {
    const formatMoney = (value) => {
        return `${Number(value || 0).toLocaleString('fr-FR')} Ar`;
    };

    const formatDate = (date) => {
        if (!date) return 'Non renseignée';

        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Mes informations
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Suivi de mon statut de paiement du droit annuel
                    </p>
                </div>
            }
        >
            <Head title="Mes informations" />

            <div className="min-h-screen bg-gray-100 py-10 dark:bg-black">
                <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">

                    {/* HERO */}
                    <div
                        className={`overflow-hidden rounded-3xl p-6 text-white shadow-xl md:p-8 ${
                            paiement.a_paye
                                ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500'
                                : 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-500'
                        }`}
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                    {paiement.a_paye ? (
                                        <CheckCircle className="h-4 w-4" />
                                    ) : (
                                        <AlertTriangle className="h-4 w-4" />
                                    )}

                                    <span className="text-sm font-semibold">
                                        Statut du droit annuel
                                    </span>
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Bonjour, {membre.name}
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                    Cette page vous permet de vérifier si votre droit annuel
                                    a déjà été enregistré par la trésorerie.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        {paiement.a_paye ? (
                                            <CheckCircle className="h-10 w-10" />
                                        ) : (
                                            <XCircle className="h-10 w-10" />
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Paiement
                                        </p>

                                        <p className="text-3xl font-black">
                                            {paiement.a_paye ? 'Payé' : 'Non payé'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROFIL + STATUT */}
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* CARTE MEMBRE */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="flex flex-col items-center text-center">
                                {membre.image ? (
                                    <img
                                        src={membre.image}
                                        alt={membre.name}
                                        className="h-28 w-28 rounded-full object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                        <UserRound className="h-14 w-14" />
                                    </div>
                                )}

                                <h3 className="mt-4 text-xl font-black text-gray-900 dark:text-white">
                                    {membre.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Membre SAVA-U
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-zinc-900">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {membre.email || 'Email non renseigné'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-zinc-900">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {membre.contact || 'Contact non renseigné'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CARTE DROIT ANNUEL */}
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                                    <Wallet className="h-6 w-6" />
                                </div>

                                <div>
                                    <h3 className="font-black text-gray-900 dark:text-white">
                                        Droit annuel
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Ressource à payer
                                    </p>
                                </div>
                            </div>

                            {droitAnnuel.existe ? (
                                <div className="space-y-4">
                                    <InfoLine
                                        label="Ressource"
                                        value={droitAnnuel.ressource}
                                    />

                                    <InfoLine
                                        label="Montant"
                                        value={formatMoney(droitAnnuel.montant)}
                                    />

                                    <InfoLine
                                        label="Année"
                                        value={droitAnnuel.annee || 'Non renseignée'}
                                    />
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                    Le droit annuel n’est pas encore configuré par la trésorerie.
                                </div>
                            )}
                        </div>

                        {/* CARTE STATUT */}
                        <div
                            className={`rounded-3xl border p-6 shadow-sm ${
                                paiement.a_paye
                                    ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30'
                                    : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30'
                            }`}
                        >
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                        paiement.a_paye
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                    }`}
                                >
                                    {paiement.a_paye ? (
                                        <BadgeCheck className="h-6 w-6" />
                                    ) : (
                                        <XCircle className="h-6 w-6" />
                                    )}
                                </div>

                                <div>
                                    <h3
                                        className={`font-black ${
                                            paiement.a_paye
                                                ? 'text-green-800 dark:text-green-300'
                                                : 'text-red-800 dark:text-red-300'
                                        }`}
                                    >
                                        {paiement.a_paye
                                            ? 'Paiement confirmé'
                                            : 'Paiement non confirmé'}
                                    </h3>

                                    <p
                                        className={`text-sm ${
                                            paiement.a_paye
                                                ? 'text-green-700 dark:text-green-400'
                                                : 'text-red-700 dark:text-red-400'
                                        }`}
                                    >
                                        Statut actuel
                                    </p>
                                </div>
                            </div>

                            {paiement.a_paye ? (
                                <div className="space-y-4">
                                    <InfoLine
                                        label="Ressource payée"
                                        value={paiement.ressource}
                                    />

                                    <InfoLine
                                        label="Montant payé"
                                        value={formatMoney(paiement.montant)}
                                    />

                                    <InfoLine
                                        label="Date de paiement"
                                        value={formatDate(paiement.date_operation)}
                                    />

                                    <InfoLine
                                        label="Description"
                                        value={paiement.description || 'Aucune description'}
                                    />
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-white/70 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                                    Aucun paiement du droit annuel n’a encore été enregistré
                                    pour votre compte. Veuillez contacter la trésorerie si vous
                                    pensez avoir déjà payé.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MESSAGE BAS */}
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                <CalendarDays className="h-6 w-6" />
                            </div>

                            <div>
                                <h3 className="font-black text-gray-900 dark:text-white">
                                    Information importante
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                    Cette page affiche uniquement le statut du paiement du droit annuel.
                                    Les autres informations ou annonces seront ajoutées plus tard,
                                    lorsque la page secrétaire sera prête.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoLine({ label, value }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p className="mt-1 font-bold text-gray-900 dark:text-white">
                {value || 'Non renseigné'}
            </p>
        </div>
    );
}