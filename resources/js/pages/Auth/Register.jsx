import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ etablissements, entites, logements }) {
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

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const classesByNiveauId = {
        1: [ // Licence
            { id: 1, name: 'L1' },
            { id: 2, name: 'L2' },
            { id: 3, name: 'L3' },
        ],
        2: [ // Master
            { id: 4, name: 'M1' },
            { id: 5, name: 'M2' },
        ],
    };

    const currentClasses = data.niveau_id ? classesByNiveauId[data.niveau_id] || [] : [];

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Nom complet" />
                        <TextInput
                            id="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Adresse */}
                    <div>
                        <InputLabel htmlFor="adresse" value="Adresse" />
                        <TextInput
                            id="adresse"
                            value={data.adresse}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('adresse', e.target.value)}
                            required
                        />
                        <InputError message={errors.adresse} className="mt-2" />
                    </div>

                    {/* Contact */}
                    <div>
                        <InputLabel htmlFor="contact" value="Contact" />
                        <TextInput
                            id="contact"
                            value={data.contact}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('contact', e.target.value)}
                            required
                        />
                        <InputError message={errors.contact} className="mt-2" />
                    </div>

                    {/* Image */}
                    <div>
                        <InputLabel htmlFor="image" value="Image (optionnelle)" />
                        <input
                            id="image"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('image', e.target.files[0])}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Niveau */}
                    <div>
                        <InputLabel value="Niveau" />
                        <select
                            value={data.niveau_id}
                            onChange={(e) => {
                                setData('niveau_id', e.target.value);
                                setData('classe_id', ''); // reset classe
                            }}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            required
                        >
                            <option value="">-- Choisir un niveau --</option>
                            <option value={1}>Licence</option>
                            <option value={2}>Master</option>
                        </select>
                        <InputError message={errors.niveau_id} className="mt-2" />
                    </div>

                    {/* Classe dépendante */}
                    <div>
                        <InputLabel value="Classe" />
                        <select
                            value={data.classe_id}
                            onChange={(e) => setData('classe_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            required
                            disabled={!data.niveau_id}
                        >
                            <option value="">-- Choisir une classe --</option>
                            {currentClasses.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.classe_id} className="mt-2" />
                    </div>

                    {/* Etablissement */}
                    <div>
                        <InputLabel value="Etablissement" />
                        <select
                            value={data.etablissement_id}
                            onChange={(e) => setData('etablissement_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            required
                        >
                            <option value="">-- Choisir un établissement --</option>
                            {etablissements.map((etab) => (
                                <option key={etab.id} value={etab.id}>
                                    {etab.etablissement}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.etablissement_id} className="mt-2" />
                    </div>

                    {/* Entité */}
                    <div>
                        <InputLabel value="Entité" />
                        <select
                            value={data.entite_id}
                            onChange={(e) => setData('entite_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            required
                        >
                            <option value="">-- Choisir une entité --</option>
                            {entites.map((entite) => (
                                <option key={entite.id} value={entite.id}>
                                    {entite.entite}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.entite_id} className="mt-2" />
                    </div>

                    {/* Logement */}
                    <div>
                        <InputLabel value="Logement" />
                        <select
                            value={data.logement_id}
                            onChange={(e) => setData('logement_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            required
                        >
                            <option value="">-- Choisir un logement --</option>
                            {logements.map((logement) => (
                                <option key={logement.id} value={logement.id}>
                                    {logement.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.logement_id} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Mot de passe" />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline"
                    >
                        Déjà inscrit ?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enregistrer un nouveau membre
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}