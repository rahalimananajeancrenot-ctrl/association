import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowDownCircle,
    ArrowUpCircle,
    CreditCard,
    ListChecks,
    Wallet
} from 'lucide-react';

export default function Dashboard({ stats, operations = [] }) {
    const formatMoney = (value) => {
        return new Intl.NumberFormat('fr-FR').format(value ?? 0) + ' Ar';
    };

    const getTypeBadge = (type) => {
        if (type === 'entree') {
            return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300';
        }

        return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300';
    };

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tableau de bord - Trésorier
                </h2>
            }
        >
            <Head title="Dashboard Trésorier" />

            <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="flex items-center gap-4 rounded-xl bg-green-600 p-5 text-white shadow">
                        <ArrowDownCircle size={42} />
                        <div>
                            <p className="text-sm text-green-50">Total Entrées</p>
                            <h3 className="text-xl font-bold">
                                {formatMoney(stats?.totalEntrees)}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-red-600 p-5 text-white shadow">
                        <ArrowUpCircle size={42} />
                        <div>
                            <p className="text-sm text-red-50">Total Sorties</p>
                            <h3 className="text-xl font-bold">
                                {formatMoney(stats?.totalSorties)}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-blue-600 p-5 text-white shadow">
                        <CreditCard size={42} />
                        <div>
                            <p className="text-sm text-blue-50">Solde actuel</p>
                            <h3 className="text-xl font-bold">
                                {formatMoney(stats?.solde)}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-purple-600 p-5 text-white shadow">
                        <ListChecks size={42} />
                        <div>
                            <p className="text-sm text-purple-50">Opérations</p>
                            <h3 className="text-xl font-bold">
                                {stats?.totalOperations ?? 0}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-orange-600 p-5 text-white shadow">
                        <Wallet size={42} />
                        <div>
                            <p className="text-sm text-orange-50">Ressources</p>
                            <h3 className="text-xl font-bold">
                                {stats?.totalRessources ?? 0}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="border-b border-gray-200 p-4 dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Dernières opérations
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700 dark:bg-zinc-900 dark:text-gray-200">
                                <tr>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Type</th>
                                    <th className="p-3 text-left">Montant</th>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Utilisateur</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-700 dark:text-gray-300">
                                {operations.length > 0 ? (
                                    operations.map((operation) => (
                                        <tr
                                            key={operation.id}
                                            className="border-t border-gray-200 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                                        >
                                            <td className="p-3">
                                                {operation.date_operation}
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeBadge(operation.type)}`}
                                                >
                                                    {operation.type === 'entree'
                                                        ? 'Entrée'
                                                        : 'Sortie'}
                                                </span>
                                            </td>

                                            <td className="p-3 font-semibold">
                                                {formatMoney(operation.montant)}
                                            </td>

                                            <td className="p-3">
                                                {operation.description ?? '-'}
                                            </td>

                                            <td className="p-3">
                                                {operation.user?.name ?? '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-6 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            Aucune opération trouvée.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}