import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { roleSidebarMap } from '@/Components/Sidebars/RoleSidebarMap';

export default function AppLayout({ children, header = null }) {
    const { auth } = usePage().props;

    const roleName = auth?.user?.roles?.[0]?.name;
    const SidebarComponent = roleSidebarMap[roleName];

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100 dark:bg-black">

                {/* MOBILE OVERLAY */}
                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    />
                )}

                {/* SIDEBAR DESKTOP */}
                {SidebarComponent && (
                    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:block">
                        <SidebarComponent />
                    </aside>
                )}

                {/* SIDEBAR MOBILE */}
                {SidebarComponent && (
                    <aside
                        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden ${
                            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <div className="flex items-center justify-end border-b border-gray-200 p-4 dark:border-zinc-800">
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <SidebarComponent />
                    </aside>
                )}

                {/* CONTENT */}
                <div className={SidebarComponent ? 'lg:pl-72' : ''}>
                    <div className="flex min-h-screen flex-col">

                        {/* HEADER */}
                        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 sm:px-6">
                            <div className="flex items-center gap-4">
                                {SidebarComponent && (
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800 lg:hidden"
                                    >
                                        <Menu size={24} />
                                    </button>
                                )}

                                <div className="min-w-0 flex-1">
                                    {header}
                                </div>
                            </div>
                        </header>

                        {/* MAIN */}
                        <main className="min-w-0 flex-1 overflow-x-hidden">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}