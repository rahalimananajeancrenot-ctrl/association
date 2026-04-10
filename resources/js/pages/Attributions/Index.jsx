import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Index({ attributions = [] }) {
    return (
        
        <AppLayout 
            header={
                <div className="flex justify-between items-center">
                    <h2 className="dark:text-white text-xl font-semibold">
                        Les attributions
                    </h2>

                    <Link
                        href={route('attributions.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        + Nouvelle attribution
                    </Link>
                </div>
            }
        >
            
            <div className="p-6 bg-white dark:bg-zinc-900 rounded shadow border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4">Attributions</h2>

                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white">
                        <tr>
                            <th className="p-2 border">Étudiants</th>
                            <th className="p-2 border">Logement</th>
                            <th className="p-2 border">PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributions.length > 0 ? (
                            attributions.map(a => (
                                <tr key={a.id} className="hover:bg-gray-100 dark:hover:bg-zinc-800">
                                    <td className="p-2 border">{a.etudiants.map(e => e.name).join(', ')}</td>
                                    <td className="p-2 border">{a.logement.name}</td>
                                    <td className="p-2 border">
                                        <a href={`/storage/${a.pdf_path}`} target="_blank" className="text-blue-500">
                                            Voir PDF
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">
                                    Aucune attribution
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}