import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { roleSidebarMap } from '@/Components/Sidebars/RoleSidebarMap';

export default function AppLayout({ children, header = null }) {
    const { auth } = usePage().props;

    const roleName = auth?.user?.roles?.[0]?.name;

    const SidebarComponent = roleSidebarMap[roleName];

    return (
        <AuthenticatedLayout>
            <div className="flex min-h-screen">

                {/* SIDEBAR */}
                {SidebarComponent && (
                    <aside className="hidden md:block w-64 border-r">
                        <SidebarComponent />
                    </aside>
                )}

                {/* CONTENU */}
                <div className="flex-1 flex flex-col">

                    {header && (
                        <header className="border-b shadow px-6 py-4">
                            {header}
                        </header>
                    )}

                    <main className="flex-1 p-4">
                        {children}
                    </main>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}