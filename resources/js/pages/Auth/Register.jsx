import InputError from '@/Components/InputError';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    UserPlus,
    User,
    Mail,
    MapPin,
    Phone,
    Image,
    GraduationCap,
    School,
    Building2,
    Home,
    Lock,
    Save
} from 'lucide-react';

export default function Register({ etablissements = [], entites = [], logements = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        adresse: '',
        contact: '',
        email: '',
        password: '',
        password_confirmation: '',
        etablissement_id: '',
        niveau_id: '',
        classe_id: '',
        entite_id: '',
        logement_id: '',
        image: null,
    });

    const classesByNiveauId = {
        1: [
            { id: 1, name: 'L1' },
            { id: 2, name: 'L2' },
            { id: 3, name: 'L3' },
        ],
        2: [
            { id: 4, name: 'M1' },
            { id: 5, name: 'M2' },
        ],
    };

    const currentClasses = data.niveau_id
        ? classesByNiveauId[data.niveau_id] || []
        : [];

    const submit = (e) => {
        e.preventDefault();

        post(route('president.membres.registered'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Ajouter un membre
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Création d’un nouveau membre dans l’association
                    </p>
                </div>
            }
        >
            <Head title="Ajouter un membre" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black">
                <div className="mx-auto max-w-7xl space-y-8">

                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <UserPlus className="h-4 w-4" />
                                    Nouveau membre
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Enregistrer un nouveau membre
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Remplissez les informations personnelles, académiques
                                    et le logement du membre.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={submit}
                        className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <SectionTitle
                            title="Informations personnelles"
                            text="Identité et contacts du membre."
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field icon={<User />} label="Nom complet" value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} required />
                            <Field icon={<Mail />} label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} required />
                            <Field icon={<MapPin />} label="Adresse" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} error={errors.adresse} required />
                            <Field icon={<Phone />} label="Contact" value={data.contact} onChange={(e) => setData('contact', e.target.value)} error={errors.contact} required />
                            <FileField icon={<Image />} label="Image optionnelle" onChange={(e) => setData('image', e.target.files[0])} error={errors.image} />
                        </div>

                        <div className="my-8 border-t border-gray-200 dark:border-zinc-800" />

                        <SectionTitle
                            title="Informations académiques"
                            text="Niveau, classe, établissement et entité."
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <SelectField icon={<GraduationCap />} label="Niveau" value={data.niveau_id} onChange={(e) => {
                                setData('niveau_id', e.target.value);
                                setData('classe_id', '');
                            }} error={errors.niveau_id} required>
                                <option value="">Choisir un niveau</option>
                                <option value={1}>Licence</option>
                                <option value={2}>Master</option>
                            </SelectField>

                            <SelectField icon={<GraduationCap />} label="Classe" value={data.classe_id} onChange={(e) => setData('classe_id', e.target.value)} error={errors.classe_id} disabled={!data.niveau_id} required>
                                <option value="">Choisir une classe</option>
                                {currentClasses.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </SelectField>

                            <SelectField icon={<School />} label="Établissement" value={data.etablissement_id} onChange={(e) => setData('etablissement_id', e.target.value)} error={errors.etablissement_id} required>
                                <option value="">Choisir un établissement</option>
                                {etablissements.map((etab) => (
                                    <option key={etab.id} value={etab.id}>
                                        {etab.etablissement}
                                    </option>
                                ))}
                            </SelectField>

                            <SelectField icon={<Building2 />} label="Entité" value={data.entite_id} onChange={(e) => setData('entite_id', e.target.value)} error={errors.entite_id} required>
                                <option value="">Choisir une sous-entité</option>
                                {entites.map((entite) => (
                                    <option key={entite.id} value={entite.id}>
                                        {entite.entite}
                                    </option>
                                ))}
                            </SelectField>

                            <SelectField icon={<Home />} label="Logement" value={data.logement_id} onChange={(e) => setData('logement_id', e.target.value)} error={errors.logement_id} required>
                                <option value="">Choisir un logement</option>
                                {logements.map((logement) => (
                                    <option key={logement.id} value={logement.id}>
                                        {logement.name}
                                    </option>
                                ))}
                            </SelectField>
                        </div>

                        <div className="my-8 border-t border-gray-200 dark:border-zinc-800" />

                        <SectionTitle
                            title="Sécurité du compte"
                            text="Mot de passe utilisé pour accéder à l’espace membre."
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field icon={<Lock />} label="Mot de passe" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} required />
                            <Field icon={<Lock />} label="Confirmer le mot de passe" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} required />
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Enregistrement...' : 'Enregistrer le membre'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

function SectionTitle({ title, text }) {
    return (
        <div className="mb-5">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {text}
            </p>
        </div>
    );
}

function Field({ icon, label, error, type = 'text', ...props }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>

                <input
                    type={type}
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    {...props}
                />
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
}

function SelectField({ icon, label, error, children, ...props }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="relative">
                <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>

                <select
                    className="w-full appearance-none rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    {...props}
                >
                    {children}
                </select>
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
}

function FileField({ icon, label, error, ...props }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {label}
            </label>

            <div className="relative">
                <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-emerald-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    {...props}
                />
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
}