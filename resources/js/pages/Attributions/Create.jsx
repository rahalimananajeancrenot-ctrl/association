import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    Users,
    Home,
    Plus,
    Trash2,
    Save,
    ClipboardList,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

export default function Create({ etudiants = [], logements = [] }) {
    const { data, setData, post, processing } = useForm({
        attributions: [],
    });

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedLogement, setSelectedLogement] = useState('');

    const usedStudents = data.attributions.flatMap((a) => a.user_ids);

    const toggleStudent = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const addAttribution = () => {
        if (!selectedLogement || selectedStudents.length === 0) {
            alert('Sélectionne des étudiants et un logement avant !');
            return;
        }

        setData('attributions', [
            ...data.attributions,
            {
                logement_id: selectedLogement,
                user_ids: selectedStudents,
            },
        ]);

        setSelectedStudents([]);
        setSelectedLogement('');
    };

    const removeAttribution = (index) => {
        const newData = [...data.attributions];
        newData.splice(index, 1);
        setData('attributions', newData);
    };

    const getLogementName = (id) => {
        const logement = logements.find((l) => String(l.id) === String(id));
        return logement ? logement.name : `Logement #${id}`;
    };

    const getStudentNames = (ids) => {
        return etudiants
            .filter((e) => ids.includes(e.id))
            .map((e) => e.name)
            .join(', ');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.attributions.length === 0) {
            alert('Ajoute au moins une attribution !');
            return;
        }

        post(route('attributions.store'));
    };

    return (
        <AppLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Attribution avancée
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Attribuez plusieurs étudiants à différents logements
                    </p>
                </div>
            }
        >
            <Head title="Attribution des logements" />

            <form
                onSubmit={handleSubmit}
                className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black"
            >
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* HERO */}
                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                                    <ClipboardList className="h-4 w-4" />
                                    Nouvelle attribution
                                </div>

                                <h1 className="text-3xl font-black md:text-4xl">
                                    Créer des attributions
                                </h1>

                                <p className="mt-2 max-w-2xl text-white/85">
                                    Sélectionnez les étudiants, choisissez un logement,
                                    puis créez un groupe d’attribution.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white/15 px-6 py-5 backdrop-blur">
                                <p className="text-sm text-white/80">
                                    Groupes créés
                                </p>
                                <p className="text-4xl font-black">
                                    {data.attributions.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* STUDENTS */}
                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                        Étudiants
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {selectedStudents.length} sélectionné(s)
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                    <Users className="h-6 w-6" />
                                </div>
                            </div>

                            <div className="max-h-[520px] space-y-2 overflow-y-auto pr-2">
                                {etudiants.length > 0 ? (
                                    etudiants.map((u) => {
                                        const isUsed = usedStudents.includes(u.id);
                                        const isSelected = selectedStudents.includes(u.id);

                                        return (
                                            <button
                                                type="button"
                                                key={u.id}
                                                disabled={isUsed}
                                                onClick={() => toggleStudent(u.id)}
                                                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                                                    isUsed
                                                        ? 'cursor-not-allowed border-gray-200 bg-gray-100 opacity-50 dark:border-zinc-800 dark:bg-zinc-800'
                                                        : isSelected
                                                            ? 'border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10'
                                                            : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-blue-500/10'
                                                }`}
                                            >
                                                <span className="font-semibold text-gray-800 dark:text-gray-100">
                                                    {u.name}
                                                </span>

                                                {isUsed ? (
                                                    <span className="text-xs font-bold text-gray-500">
                                                        Déjà utilisé
                                                    </span>
                                                ) : isSelected ? (
                                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <span className="h-5 w-5 rounded-full border border-gray-300 dark:border-zinc-600" />
                                                )}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <EmptyState
                                        icon={<Users />}
                                        title="Aucun étudiant"
                                        text="Aucun étudiant disponible."
                                    />
                                )}
                            </div>
                        </div>

                        {/* ACTION */}
                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                        Logement
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Choisissez un logement cible
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                                    <Home className="h-6 w-6" />
                                </div>
                            </div>

                            <select
                                value={selectedLogement}
                                onChange={(e) => setSelectedLogement(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 font-semibold text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            >
                                <option value="">Sélectionner un logement</option>
                                {logements.map((l) => (
                                    <option key={l.id} value={l.id}>
                                        {l.name} — {l.nbrPlace} place(s)
                                    </option>
                                ))}
                            </select>

                            <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                <div className="mb-2 flex items-center gap-2 font-bold">
                                    <AlertCircle className="h-4 w-4" />
                                    Comment faire ?
                                </div>
                                Sélectionnez d’abord un ou plusieurs étudiants,
                                puis choisissez un logement et cliquez sur ajouter.
                            </div>

                            <button
                                type="button"
                                onClick={addAttribution}
                                disabled={!selectedLogement || selectedStudents.length === 0}
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Plus className="h-5 w-5" />
                                Ajouter au groupe
                            </button>
                        </div>

                        {/* GROUPS */}
                        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                        Groupes créés
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {data.attributions.length} attribution(s)
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300">
                                    <ClipboardList className="h-6 w-6" />
                                </div>
                            </div>

                            <div className="max-h-[520px] space-y-3 overflow-y-auto pr-2">
                                {data.attributions.length > 0 ? (
                                    data.attributions.map((attr, index) => (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
                                        >
                                            <div className="mb-3 flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="font-black text-gray-900 dark:text-white">
                                                        {getLogementName(attr.logement_id)}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {attr.user_ids.length} étudiant(s)
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeAttribution(index)}
                                                    className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {getStudentNames(attr.user_ids)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <EmptyState
                                        icon={<ClipboardList />}
                                        title="Aucun groupe"
                                        text="Les attributions ajoutées apparaîtront ici."
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="sticky bottom-4 rounded-[2rem] border border-gray-200 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
                        <button
                            type="submit"
                            disabled={processing || data.attributions.length === 0}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            {processing
                                ? 'Enregistrement en cours...'
                                : 'Enregistrer toutes les attributions'}
                        </button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}

function EmptyState({ icon, title, text }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-zinc-700">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-zinc-800">
                {icon}
            </div>

            <p className="font-bold text-gray-700 dark:text-gray-200">
                {title}
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {text}
            </p>
        </div>
    );
}