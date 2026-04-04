import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {

    const { auth } = usePage().props;
    const user = auth.user;

    const fileInput = useRef();

    const { data, setData, post, processing } = useForm({
        image: null
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const submitImage = () => {
        post('/profile/photo');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Mon compte
                </h2>
            }
        >
            <Head title="Mon compte" />

            <div className="py-12 bg-gray-100 dark:bg-black min-h-screen">
                <div className="mx-auto max-w-4xl space-y-6">

                    {/* 🔥 SECTION PROFIL */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">

                        <div className="flex flex-col md:flex-row items-center gap-6">

                            {/* IMAGE */}
                            <div className="relative">

                                {user.image ? (
                                    <img
                                        src={`/storage/${user.image}`}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
                                        👤
                                    </div>
                                )}

                                {/* 📷 BOUTON CAMERA */}
                                <button
                                    onClick={() => fileInput.current.click()}
                                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
                                >
                                    📷
                                </button>

                                <input
                                    type="file"
                                    ref={fileInput}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* INFOS */}
                            <div className="flex-1 space-y-2 text-gray-700 dark:text-gray-300">
                                <p><strong>Nom :</strong> {user.name}</p>
                                <p><strong>Email :</strong> {user.email}</p>
                                <p><strong>Contact :</strong> {user.contact}</p>
                                <p><strong>Adresse :</strong> {user.adresse}</p>
                                <p><strong>Logement :</strong> {user.logement ? user.logement.name : 'Non attribué'}</p>
                            </div>

                        </div>

                        {/* BOUTON UPLOAD */}
                        {data.image && (
                            <div className="mt-4">
                                <button
                                    onClick={submitImage}
                                    disabled={processing}
                                    className="btn btn-primary px-2 bg-blue-500"
                                >
                                    Enregistrer la photo
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 🔹 MODIFICATION INFOS */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold">Modifier mes informations</h3>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {/* 🔹 MOT DE PASSE */}
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold">Mot de passe</h3>

                        <UpdatePasswordForm />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}