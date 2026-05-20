import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import {
    Megaphone,
    PlusCircle,
    ImagePlus,
    FileText,
    Trash2,
    UserRound,
    CalendarDays,
    X,
    Send,
    Newspaper,
} from 'lucide-react';

export default function Index({ evenements = [] }) {
    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        image: null,
    });

    const closeModal = () => {
        setOpenModal(false);
        setPreview(null);
        reset();

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setData('image', null);
            setPreview(null);
            return;
        }

        setData('image', file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('secretaire.evenements.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const destroy = (id) => {
        if (!confirm('Voulez-vous vraiment supprimer cette information ?')) {
            return;
        }

        router.delete(route('secretaire.evenements.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Événements & informations
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Partage des informations importantes avec les membres
                    </p>
                </div>
            }
        >
            <Head title="Événements Secrétaire" />

            <div className="space-y-6 p-4 md:p-6">

                {/* HERO */}
                <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 p-6 text-white shadow-xl md:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                                <Megaphone className="h-4 w-4" />
                                <span className="text-sm font-semibold">
                                    Espace Secrétaire
                                </span>
                            </div>

                            <h1 className="text-3xl font-black md:text-4xl">
                                Publier une information
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm text-white/85 md:text-base">
                                Créez des événements, annonces ou informations importantes.
                                Tous les utilisateurs recevront une notification.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="rounded-3xl bg-white/15 p-5 backdrop-blur">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-2xl bg-white/20 p-4">
                                        <Newspaper className="h-8 w-8" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white/80">
                                            Publications
                                        </p>

                                        <p className="text-4xl font-black">
                                            {evenements.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpenModal(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-4 text-sm font-black text-blue-700 shadow-lg transition hover:bg-blue-50"
                            >
                                <PlusCircle className="h-5 w-5" />
                                Nouvelle info
                            </button>
                        </div>
                    </div>
                </div>

                {/* LISTE */}
                <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-5">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            Informations publiées
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Historique des événements et informations partagés
                        </p>
                    </div>

                    {evenements.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {evenements.map((evenement) => (
                                <div
                                    key={evenement.id}
                                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-zinc-800 dark:to-zinc-950">
                                        {evenement.image ? (
                                            <img
                                                src={evenement.image}
                                                alt={evenement.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <div className="rounded-3xl bg-white p-5 text-blue-600 shadow-lg dark:bg-zinc-800 dark:text-blue-300">
                                                    <Megaphone className="h-14 w-14" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div>
                                            <h4 className="line-clamp-2 text-lg font-black text-gray-900 dark:text-white">
                                                {evenement.title}
                                            </h4>

                                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                {evenement.description}
                                            </p>
                                        </div>

                                        <div className="space-y-2 rounded-2xl bg-gray-50 p-3 text-sm dark:bg-zinc-950">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                <UserRound className="h-4 w-4 text-blue-500" />
                                                <span>
                                                    Partagé par :{' '}
                                                    <strong>{evenement.shared_by || 'Non renseigné'}</strong>
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                                <CalendarDays className="h-4 w-4 text-blue-500" />
                                                <span>{evenement.created_at}</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => destroy(evenement.id)}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 p-10 text-center dark:border-zinc-700">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                                <Megaphone className="h-8 w-8" />
                            </div>

                            <h4 className="text-lg font-black text-gray-900 dark:text-white">
                                Aucune information publiée
                            </h4>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Cliquez sur “Nouvelle info” pour partager une information.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL CREATE */}
            {openModal && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 p-4 pt-10 pb-10 backdrop-blur-sm">
                    <div className="relative mx-auto my-8 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-950">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-red-100 hover:text-red-600 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-red-950 dark:hover:text-red-300"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-6 pr-10">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                <PlusCircle className="h-6 w-6" />
                            </div>

                            <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                Nouvelle information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Cette information sera publiée et notifiée à tous les utilisateurs.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Titre
                                </label>

                                <div className="relative">
                                    <Megaphone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Ex : Réunion générale"
                                        className="w-full rounded-2xl border border-gray-300 bg-white p-3 pl-11 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    />
                                </div>

                                {errors.title && (
                                    <p className="mt-1 text-sm font-semibold text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Description
                                </label>

                                <div className="relative">
                                    <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Écrivez les détails de l'information..."
                                        rows="5"
                                        className="w-full rounded-2xl border border-gray-300 bg-white p-3 pl-11 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                    />
                                </div>

                                {errors.description && (
                                    <p className="mt-1 text-sm font-semibold text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Image facultative
                                </label>

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-blue-950/30">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Aperçu"
                                            className="mb-4 h-48 w-full rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                                            <ImagePlus className="h-7 w-7" />
                                        </div>
                                    )}

                                    <p className="text-sm font-bold text-gray-800 dark:text-white">
                                        Cliquez pour choisir une image
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        JPG, PNG, WEBP — max 2 Mo
                                    </p>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>

                                {errors.image && (
                                    <p className="mt-1 text-sm font-semibold text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-2xl bg-gray-100 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Send className="h-4 w-4" />
                                    Publier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}