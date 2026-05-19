import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    UserRound,
    Mail,
    Phone,
    MapPin,
    Building2,
    GraduationCap,
    Home,
    School,
} from 'lucide-react';

export default function Show({ member }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-white">
                        Détails du membre
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Informations complètes du membre sélectionné
                    </p>
                </div>
            }
        >
            <Head title={`Membre - ${member.name}`} />

            <div className="min-h-screen bg-gray-100 py-10 dark:bg-black">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    <Link
                        href={route('dashboard')}
                        className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-zinc-800"
                    >
                        <ArrowLeft size={18} />
                        Retour au dashboard
                    </Link>

                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

                        <div className="relative h-64 bg-gradient-to-r from-emerald-600 to-lime-600">
                            <div className="absolute inset-0 bg-black/10"></div>

                            <div className="absolute -bottom-16 left-8">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-32 w-32 rounded-3xl border-4 border-white object-cover shadow-xl dark:border-zinc-900"
                                    />
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-gray-100 text-emerald-600 shadow-xl dark:border-zinc-900 dark:bg-zinc-800">
                                        <UserRound size={60} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-20">
                            <div className="mb-8">
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                                    {member.name}
                                </h1>

                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    {member.entite?.name || 'Aucune entité renseignée'}
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <InfoCard
                                    icon={<Mail size={22} />}
                                    label="Email"
                                    value={member.email}
                                />

                                <InfoCard
                                    icon={<Phone size={22} />}
                                    label="Contact"
                                    value={member.contact}
                                />

                                <InfoCard
                                    icon={<MapPin size={22} />}
                                    label="Adresse"
                                    value={member.adresse}
                                />

                                <InfoCard
                                    icon={<Building2 size={22} />}
                                    label="Entité"
                                    value={member.entite?.name}
                                />

                                <InfoCard
                                    icon={<School size={22} />}
                                    label="Établissement"
                                    value={member.etablissement?.name}
                                />

                                <InfoCard
                                    icon={<GraduationCap size={22} />}
                                    label="Classe"
                                    value={member.classe?.name}
                                />

                                <InfoCard
                                    icon={<GraduationCap size={22} />}
                                    label="Niveau"
                                    value={member.niveau?.name}
                                />

                                <InfoCard
                                    icon={<Home size={22} />}
                                    label="Logement"
                                    value={member.logement?.name}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {icon}
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {label}
                </p>
            </div>

            <p className="text-base font-semibold text-gray-900 dark:text-white">
                {value || 'Non renseigné'}
            </p>
        </div>
    );
}