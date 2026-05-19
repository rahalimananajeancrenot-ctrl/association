import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Sun,
    Moon,
    Menu,
    X,
    LayoutDashboard
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }

        setDarkMode(!darkMode);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 dark:from-black dark:via-zinc-950 dark:to-zinc-900 text-gray-800 dark:text-white transition-all duration-500">

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-white/20 shadow-lg">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-20 justify-between items-center">

                        {/* LEFT */}
                        <div className="flex items-center gap-10">

                            {/* LOGO */}
                            <Link
                                href="/"
                                className="flex items-center gap-3 group"
                            >
                                <div className="p-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition duration-300">
                                    <ApplicationLogo className="h-8 w-8 fill-white text-white" />
                                </div>

                                <div>
                                    <h1 className="font-bold text-lg tracking-wide">
                                        Résidence
                                    </h1>

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Administration
                                    </p>
                                </div>
                            </Link>

                            {/* MENU */}
                            {user.role !== 'membre' && (
                                <div className="hidden sm:flex items-center gap-3">

                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" />
                                            Dashboard
                                        </div>
                                    </NavLink>

                                </div>
                            )}
                        </div>

                        {/* RIGHT */}
                        <div className="hidden sm:flex items-center gap-4">

                            {/* DARK MODE */}
                            <button
                                onClick={toggleDarkMode}
                                className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-800 shadow-md hover:shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-600" />
                                )}
                            </button>

                            {/* USER */}
                            <div className="relative">

                                <Dropdown>

                                    <Dropdown.Trigger>

                                        <button
                                            type="button"
                                            className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white dark:bg-zinc-800 shadow-md hover:shadow-xl transition-all duration-300"
                                        >

                                            {user.image ? (
                                                <img
                                                    src={`/storage/${user.image}`}
                                                    alt={user.name}
                                                    className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500"
                                                />
                                            ) : (
                                                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}

                                            <div className="text-left">
                                                <div className="font-semibold text-sm">
                                                    {user.name}
                                                </div>

                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.role}
                                                </div>
                                            </div>

                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                        </button>

                                    </Dropdown.Trigger>

                                    <Dropdown.Content>

                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Compte utilisateur
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Déconnexion
                                        </Dropdown.Link>

                                    </Dropdown.Content>

                                </Dropdown>

                            </div>

                        </div>

                        {/* MOBILE BUTTON */}
                        <div className="flex sm:hidden">

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    )
                                }
                                className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>

                        </div>

                    </div>

                </div>

                {/* MOBILE MENU */}
                <div
                    className={`${showingNavigationDropdown ? 'block' : 'hidden'
                        } sm:hidden border-t border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl`}
                >

                    <div className="p-4 space-y-3">

                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                    </div>

                    <div className="border-t border-gray-200 dark:border-zinc-700 p-4">

                        <div className="flex items-center gap-3">

                            {user.image ? (
                                <img
                                    src={`/storage/${user.image}`}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                            )}

                            <div>
                                <div className="font-semibold">
                                    {user.name}
                                </div>

                                <div className="text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                        </div>

                        <div className="mt-5 space-y-2">

                            <ResponsiveNavLink href={route('profile.edit')}>
                                Mon Profil
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Déconnexion
                            </ResponsiveNavLink>

                        </div>

                    </div>

                </div>

            </nav>

            {/* HEADER */}
            {header && (
                <header className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        <div className="rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl border border-white/20 p-6">

                            {header}

                        </div>

                    </div>
                </header>
            )}

            {/* MAIN */}
            <main className="pb-10">
                {children}
            </main>

        </div>
    );
}