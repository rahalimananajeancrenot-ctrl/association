import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ etudiants = [], logements = [] }) {

    const { data, setData, post, processing } = useForm({
        attributions: []
    });

    const [selectedStudents, setSelectedStudents] = useState([]);

    // ✅ étudiants déjà utilisés dans les groupes
    const usedStudents = data.attributions.flatMap(a => a.user_ids);

    // ✅ cocher étudiant
    const toggleStudent = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    // ✅ ajouter un groupe attribution
    const addAttribution = (logement_id) => {
        if (!logement_id || selectedStudents.length === 0) {
            alert("Sélectionne des étudiants avant !");
            return;
        }

        setData('attributions', [
            ...data.attributions,
            {
                logement_id,
                user_ids: selectedStudents
            }
        ]);

        // reset sélection
        setSelectedStudents([]);
    };

    // ✅ supprimer groupe
    const removeAttribution = (index) => {
        const newData = [...data.attributions];
        newData.splice(index, 1);
        setData('attributions', newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.attributions.length === 0) {
            alert("Ajoute au moins une attribution !");
            return;
        }

        post(route('attributions.store'));
    };

    return (
        <AppLayout header={<h2 className="text-xl font-semibold dark:text-white">Attribution avancée</h2>}>
            <Head title="Attribution avancée" />
            <form onSubmit={handleSubmit} className="">
            <div className="p-6 grid grid-cols-3 gap-6">

                {/* 👈 LISTE ETUDIANTS */}
                <div className="col-span-1 bg-white dark:bg-zinc-900 p-4 rounded shadow">
                    <h3 className="font-bold mb-3 dark:text-white">Étudiants (salle d’étude)</h3>

                    <div className="max-h-[500px] overflow-y-auto space-y-2">
                        {etudiants.map(u => {
                            const isUsed = usedStudents.includes(u.id);

                            return (
                                <label
                                    key={u.id}
                                    className={`flex items-center space-x-2 ${isUsed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        disabled={isUsed}
                                        checked={selectedStudents.includes(u.id)}
                                        onChange={() => toggleStudent(u.id)}
                                    />
                                    <span className="dark:text-white">
                                        {u.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* 👉 ACTION */}
                <div className="col-span-1 bg-white dark:bg-zinc-900 p-4 rounded shadow">
                    <h3 className="font-bold mb-3 dark:text-white">Choisir logement</h3>

                    <select
                        onChange={(e) => addAttribution(e.target.value)}
                        className="w-full border p-2 rounded dark:bg-zinc-800 dark:text-white"
                    >
                        <option value="">Sélectionner un logement</option>
                        {logements.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name} ({l.nbrPlace})
                            </option>
                        ))}
                    </select>

                    <p className="text-sm mt-2 text-gray-500">
                        Sélectionne des étudiants puis un logement pour créer un groupe
                    </p>
                </div>

                {/* 👉 GROUPES CREES */}
                <div className="col-span-1 bg-white dark:bg-zinc-900 p-4 rounded shadow">
                    <h3 className="font-bold mb-3 dark:text-white">Attributions</h3>

                    {data.attributions.length > 0 ? (
                        data.attributions.map((attr, index) => (
                            <div key={index} className="border p-2 mb-2 rounded">
                                <p className="dark:text-white text-sm">
                                    Logement ID: {attr.logement_id}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {attr.user_ids.length} étudiant(s)
                                </p>

                                <button
                                    onClick={() => removeAttribution(index)}
                                    className="text-red-500 text-xs"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Aucun groupe créé
                        </p>
                    )}
                </div>
            </div>

            {/* SUBMIT */}
  
                <button
                    type="submit"
                    disabled={processing || data.attributions.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Enregistrer toutes les attributions
                </button>
            </form>

        </AppLayout>
    );
}