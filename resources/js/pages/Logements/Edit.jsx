import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Edit({ logement, types }) {

    const { data, setData, put } = useForm({
        name: logement.name,
        nbrPlace: logement.nbrPlace,
        type_logement_id: logement.type_logement_id
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/logements/${logement.id}`);
    };

    return (
        <AuthenticatedLayout header={<h2 className="dark:text-white">Modifier</h2>}>
            <Head title="Modifier" />

            <div className="p-6 bg-gray-100 dark:bg-black min-h-screen">
                <form 
                    onSubmit={submit} 
                    className="p-6 space-y-4 bg-white dark:bg-zinc-900 shadow sm:rounded-lg sm:p-8 border border-gray-200 dark:border-gray-700"
                >

                    <input
                        value={data.name}
                        className="input input-bordered w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        onChange={e => setData('name', e.target.value)}
                        placeholder="Nom"
                    />

                    <input
                        type="number"
                        value={data.nbrPlace}
                        className="input input-bordered w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        onChange={e => setData('nbrPlace', e.target.value)}
                        placeholder="Nombre de places"
                    />

                    <select
                        value={data.type_logement_id}
                        className="select select-bordered w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                        onChange={e => setData('type_logement_id', e.target.value)}
                    >
                        <option value="">Type</option>
                        {types.map(t => (
                            <option key={t.id} value={t.id}>{t.type}</option>
                        ))}
                    </select>

                    <button className="btn btn-warning px-3">Modifier</button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}