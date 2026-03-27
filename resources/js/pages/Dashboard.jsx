import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gray-100 dark:bg-black min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="overflow-hidden bg-white dark:bg-zinc-900 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}