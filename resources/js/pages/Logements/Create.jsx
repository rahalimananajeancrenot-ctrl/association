import AppLayout from '@/Layouts/AppLayout';
import { useForm, Head } from '@inertiajs/react';
import {
    Home,
    BedDouble,
    Layers,
    Save,
    Building2,
    ArrowLeft
} from 'lucide-react';

export default function Create({ types }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        nbrPlace: '',
        type_logement_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/logements');
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Créer un logement
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ajoutez un nouveau logement avec ses informations.
                    </p>
                </div>
            }
        >
            <Head title="Créer logement" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black">
                <div className="mx-auto max-w-5xl space-y-8">

                    {/* HERO */}
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
                        <div className="absolute -bottom-20 left-16 h-56 w-56 rounded-full bg-white/10" />

                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <Building2 className="h-4 w-4" />
                                    Nouveau logement
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Ajouter un logement
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Remplissez les informations ci-dessous pour enregistrer
                                    un nouveau logement dans le système.
                                </p>
                            </div>

                            <a
                                href="/logements"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                Retour
                            </a>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                                Informations du logement
                            </h3>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Complétez les champs nécessaires pour créer un logement.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            {/* NOM */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Nom du logement
                                </label>

                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Ex : Pavillon A"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                    />
                                </div>

                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* NOMBRE DE PLACES */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Nombre de places
                                </label>

                                <div className="relative">
                                    <BedDouble className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="number"
                                        placeholder="Ex : 20"
                                        value={data.nbrPlace}
                                        onChange={(e) =>
                                            setData('nbrPlace', e.target.value)
                                        }
                                        className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                    />
                                </div>

                                {errors.nbrPlace && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.nbrPlace}
                                    </p>
                                )}
                            </div>

                            {/* TYPE */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Type de logement
                                </label>

                                <div className="relative">
                                    <Layers className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                    <select
                                        value={data.type_logement_id}
                                        onChange={(e) =>
                                            setData(
                                                'type_logement_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full appearance-none rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                    >
                                        <option value="">
                                            Sélectionner un type
                                        </option>

                                        {types.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {errors.type_logement_id && (
                                    <p className="mt-2 text-sm text-red-500">
                                        {errors.type_logement_id}
                                    </p>
                                )}
                            </div>

                            {/* BUTTON */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save className="h-5 w-5" />

                                    {processing
                                        ? 'Création en cours...'
                                        : 'Créer le logement'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}