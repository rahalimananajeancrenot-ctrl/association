import AppLayout from '@/Layouts/AppLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Create({ types }) {

    const { data, setData, post } = useForm({
        name: '',
        nbrPlace: '',
        type_logement_id: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/logements');
    };

    return (
        <AppLayout header={<h2 className="dark:text-white">Créer logement</h2>}>
            <Head title="Créer" />

            <form onSubmit={submit} className="p-6 space-y-4">

                {/* Nom */}
                <input
                    placeholder="Nom"
                    className="input input-bordered w-full 
                               bg-white dark:bg-zinc-900 
                               text-gray-900 dark:text-white 
                               border-gray-300 dark:border-gray-700"
                    onChange={e => setData('name', e.target.value)}
                    value={data.name}
                />

                {/* Nombre de places */}
                <input
                    type="number"
                    placeholder="Nombre de places"
                    className="input input-bordered w-full 
                               bg-white dark:bg-zinc-900 
                               text-gray-900 dark:text-white 
                               border-gray-300 dark:border-gray-700"
                    onChange={e => setData('nbrPlace', e.target.value)}
                    value={data.nbrPlace}
                />

                {/* Type de logement */}
                <select
                    className="select select-bordered w-full 
                               bg-white dark:bg-zinc-900 
                               text-gray-900 dark:text-white 
                               border-gray-300 dark:border-gray-700"
                    onChange={e => setData('type_logement_id', e.target.value)}
                    value={data.type_logement_id}
                >
                    <option value="">Type</option>
                    {types.map(t => (
                        <option key={t.id} value={t.id}>{t.type}</option>
                    ))}
                </select>

                <button className="btn btn-primary bg-blue-800 text-white w-full">Créer</button>

            </form>
        </AppLayout>
    );
}