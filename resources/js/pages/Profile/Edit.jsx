import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import {
    Camera,
    Mail,
    MapPin,
    Phone,
    Home,
    User,
    Save,
    Shield,
    CheckCircle
} from 'lucide-react';

import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const fileInput = useRef();

    const { data, setData, post, processing } = useForm({
        image: null,
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const submitImage = () => {
        post('/profile/photo', {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Mon compte
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gérez vos informations personnelles et votre sécurité
                    </p>
                </div>
            }
        >
            <Head title="Mon compte" />

            <div className="min-h-screen bg-gray-100 px-4 py-10 dark:bg-black">
                <div className="mx-auto max-w-6xl space-y-8">

                    {/* BANNER */}
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
                        <div className="absolute -bottom-20 left-20 h-56 w-56 rounded-full bg-white/10" />

                        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <CheckCircle className="h-4 w-4" />
                                    Profil utilisateur
                                </p>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Bonjour, {user.name}
                                </h1>

                                <p className="mt-2 max-w-xl text-white/85">
                                    Mettez à jour votre photo, vos informations personnelles
                                    et votre mot de passe depuis cet espace.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                                <p className="text-sm text-white/80">Email du compte</p>
                                <p className="font-bold">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* PROFILE CARD */}
                    <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

                            {/* PHOTO */}
                            <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-gray-50 p-6 dark:bg-zinc-950">
                                <div className="relative">
                                    {user.image ? (
                                        <img
                                            src={`/storage/${user.image}`}
                                            alt={user.name}
                                            className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-xl dark:border-zinc-800"
                                        />
                                    ) : (
                                        <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-cyan-500 text-5xl font-black text-white shadow-xl dark:border-zinc-800">
                                            {user.name?.charAt(0)?.toUpperCase() || <User />}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => fileInput.current.click()}
                                        className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
                                    >
                                        <Camera className="h-5 w-5" />
                                    </button>

                                    <input
                                        type="file"
                                        ref={fileInput}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <h3 className="mt-5 text-xl font-black text-gray-900 dark:text-white">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Membre SAVA-U
                                </p>

                                {data.image && (
                                    <button
                                        type="button"
                                        onClick={submitImage}
                                        disabled={processing}
                                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Save className="h-5 w-5" />
                                        {processing ? 'Enregistrement...' : 'Enregistrer la photo'}
                                    </button>
                                )}
                            </div>

                            {/* INFOS */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                        Informations du compte
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Aperçu rapide de vos informations enregistrées.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <InfoCard
                                        icon={<User />}
                                        label="Nom"
                                        value={user.name || 'Non renseigné'}
                                    />

                                    <InfoCard
                                        icon={<Mail />}
                                        label="Email"
                                        value={user.email || 'Non renseigné'}
                                    />

                                    <InfoCard
                                        icon={<Phone />}
                                        label="Contact"
                                        value={user.contact || 'Non renseigné'}
                                    />

                                    <InfoCard
                                        icon={<MapPin />}
                                        label="Adresse"
                                        value={user.adresse || 'Non renseignée'}
                                    />

                                    <InfoCard
                                        icon={<Home />}
                                        label="Logement"
                                        value={user.logement ? user.logement.name : 'Non attribué'}
                                    />

                                    <InfoCard
                                        icon={<Shield />}
                                        label="Sécurité"
                                        value="Compte protégé"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FORMS */}
                    <div className="grid gap-8 lg:grid-cols-2">

                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-6">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                    Modifier mes informations
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Mettez à jour votre nom, email ou autres informations.
                                </p>
                            </div>

                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-6">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                    Mot de passe
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Modifiez votre mot de passe pour sécuriser votre compte.
                                </p>
                            </div>

                            <UpdatePasswordForm />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoCard({ icon, label, value }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {icon}
                </div>

                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {label}
                </span>
            </div>

            <p className="break-words font-bold text-gray-900 dark:text-white">
                {value}
            </p>
        </div>
    );
}