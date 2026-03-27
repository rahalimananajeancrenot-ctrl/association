import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 bg-gray-100 dark:bg-black min-h-screen">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    {/* PROFILE INFO */}
                    <div className="bg-white dark:bg-zinc-900 p-4 shadow sm:rounded-lg sm:p-8 border border-gray-200 dark:border-gray-700">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="bg-white dark:bg-zinc-900 p-4 shadow sm:rounded-lg sm:p-8 border border-gray-200 dark:border-gray-700">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* DELETE ACCOUNT */}
                    <div className="bg-white dark:bg-zinc-900 p-4 shadow sm:rounded-lg sm:p-8 border border-gray-200 dark:border-gray-700">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}