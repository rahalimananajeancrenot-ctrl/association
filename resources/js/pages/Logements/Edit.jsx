import AppLayout from '@/Layouts/AppLayout';
import { useForm, Head } from '@inertiajs/react';
import { Home, Hash, Building2, Save } from 'lucide-react';

export default function Edit({ logement, types }) {
    const { data, setData, put, processing } = useForm({
        name: logement.name || '',
        nbrPlace: logement.nbrPlace || '',
        type_logement_id: logement.type_logement_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/logements/${logement.id}`);
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Modifier le logement
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Mettez à jour les informations du logement
                    </p>
                </div>
            }
        >
            <Head title="Modifier logement" />

            <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                        
                        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 dark:border-zinc-700">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                                    <Building2 size={26} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Formulaire de modification
                                    </h3>
                                    <p className="text-sm text-blue-100">
                                        Logement : {logement.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6 p-6 sm:p-8">
                            
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nom du logement
                                </label>

                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                                    <input
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ex : Bloc A, Chambre 12..."
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nombre de places
                                </label>

                                <div className="relative">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                                    <input
                                        type="number"
                                        value={data.nbrPlace}
                                        onChange={(e) => setData('nbrPlace', e.target.value)}
                                        placeholder="Ex : 4"
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type de logement
                                </label>

                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                                    <select
                                        value={data.type_logement_id}
                                        onChange={(e) => setData('type_logement_id', e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-blue-500"
                                    >
                                        <option value="">Sélectionner un type</option>
                                        {types.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={20} />
                                    {processing ? 'Modification...' : 'Modifier le logement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}