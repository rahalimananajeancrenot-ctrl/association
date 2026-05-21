import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import {
    Sun,
    Moon,
    Menu,
    X,
    LayoutDashboard,
    UserCircle,
    LogOut,
    ChevronRight,
    Info,
    Bell,
    BellRing,
    CheckCheck,
    Inbox,
} from 'lucide-react';

export default function AuthenticatedLayout({
    header,
    children,
    layoutMode = 'default',
}) {
    const { auth, notifications } = usePage().props;
    const user = auth?.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationFilter, setNotificationFilter] = useState('all');

    const [darkMode, setDarkMode] = useState(false);

    const notificationItems = notifications?.items || [];
    const unreadCount = notifications?.unread_count || 0;

    const filteredNotifications = useMemo(() => {
        if (notificationFilter === 'unread') {
            return notificationItems.filter((item) => !item.is_read);
        }

        if (notificationFilter === 'read') {
            return notificationItems.filter((item) => item.is_read);
        }

        return notificationItems;
    }, [notificationItems, notificationFilter]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    const markAllAsRead = () => {
        router.patch(
            route('membre.notifications.readAll'),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />
            </div>
        );
    }

    /*
     |--------------------------------------------------------------------------
     | MODE SIDEBAR
     |--------------------------------------------------------------------------
     | Ce mode est utilisé par AppLayout.
     | Il ne doit PAS afficher la navbar, le header et le main ici,
     | parce que AppLayout gère déjà :
     | - la sidebar
     | - le header
     | - le contenu principal
     */
    if (layoutMode === 'sidebar') {
        return (
            <div className="min-h-screen bg-gray-100 text-gray-800 transition-all duration-500 dark:bg-black dark:text-white">
                {children}
            </div>
        );
    }

    /*
     |--------------------------------------------------------------------------
     | MODE DEFAULT
     |--------------------------------------------------------------------------
     | Ce mode garde l'ancien comportement pour les pages simples :
     | membre, profil, infos, événements, etc.
     */
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 text-gray-800 transition-all duration-500 dark:from-black dark:via-zinc-950 dark:to-zinc-900 dark:text-white">
            <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 shadow-lg backdrop-blur-xl dark:bg-zinc-900/70">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-10">
                            <Link
                                href="/"
                                className="group flex items-center gap-3"
                            >
                                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2 shadow-lg transition duration-300 group-hover:scale-110">
                                    <ApplicationLogo className="h-8 w-8 fill-white text-white" />
                                </div>

                                <div>
                                    <h1 className="text-lg font-bold tracking-wide">
                                        SAVA-U
                                    </h1>

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Association
                                    </p>
                                </div>
                            </Link>

                            <div className="hidden items-center gap-3 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route('membre.infos')}
                                    active={route().current('membre.infos')}
                                >
                                    <div className="flex items-center gap-2">
                                        <Info className="h-4 w-4" />
                                        Mes infos
                                    </div>
                                </NavLink>

                                <NavLink
                                    href={route('membre.evenements.index')}
                                    active={route().current('membre.evenements.*')}
                                >
                                    <div className="flex items-center gap-2">
                                        <BellRing className="h-4 w-4" />
                                        Événements
                                    </div>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden items-center gap-4 sm:flex">
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md transition duration-300 hover:scale-110 hover:shadow-xl dark:bg-zinc-800"
                                title="Changer le thème"
                            >
                                {darkMode ? (
                                    <Sun className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <Moon className="h-5 w-5 text-indigo-600" />
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNotifications(!showNotifications)
                                    }
                                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md transition duration-300 hover:scale-110 hover:shadow-xl dark:bg-zinc-800"
                                >
                                    <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />

                                    {unreadCount > 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-black text-white">
                                            {unreadCount > 9
                                                ? '9+'
                                                : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 top-14 z-[9999] w-96 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                                        <div className="border-b border-gray-200 p-4 dark:border-zinc-800">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <h3 className="font-black text-gray-900 dark:text-white">
                                                        Notifications
                                                    </h3>

                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {unreadCount} non lue(s)
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={markAllAsRead}
                                                    disabled={
                                                        unreadCount === 0
                                                    }
                                                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-950/40 dark:text-indigo-300"
                                                >
                                                    <CheckCheck className="h-4 w-4" />
                                                    Tout lu
                                                </button>
                                            </div>

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setNotificationFilter(
                                                            'all'
                                                        )
                                                    }
                                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                                        notificationFilter ===
                                                        'all'
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-gray-300'
                                                    }`}
                                                >
                                                    Toutes
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setNotificationFilter(
                                                            'unread'
                                                        )
                                                    }
                                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                                        notificationFilter ===
                                                        'unread'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-gray-300'
                                                    }`}
                                                >
                                                    Non lues
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setNotificationFilter(
                                                            'read'
                                                        )
                                                    }
                                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                                        notificationFilter ===
                                                        'read'
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-gray-300'
                                                    }`}
                                                >
                                                    Lues
                                                </button>
                                            </div>
                                        </div>

                                        <div className="max-h-96 overflow-y-auto">
                                            {filteredNotifications.length >
                                            0 ? (
                                                filteredNotifications.map(
                                                    (notification) => (
                                                        <Link
                                                            key={
                                                                notification.id
                                                            }
                                                            href={route(
                                                                'membre.notifications.show',
                                                                notification.id
                                                            )}
                                                            className={`block border-b border-gray-100 p-4 transition hover:bg-indigo-50 dark:border-zinc-800 dark:hover:bg-indigo-950/30 ${
                                                                notification.is_read
                                                                    ? 'bg-white dark:bg-zinc-950'
                                                                    : 'bg-indigo-50/70 dark:bg-indigo-950/20'
                                                            }`}
                                                        >
                                                            <div className="flex gap-3">
                                                                <div
                                                                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                                                                        notification.is_read
                                                                            ? 'bg-gray-100 text-gray-500 dark:bg-zinc-900 dark:text-gray-400'
                                                                            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                                                                    }`}
                                                                >
                                                                    <BellRing className="h-5 w-5" />
                                                                </div>

                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <p className="line-clamp-1 font-bold text-gray-900 dark:text-white">
                                                                            {notification
                                                                                .data
                                                                                ?.title ||
                                                                                'Nouvelle notification'}
                                                                        </p>

                                                                        {!notification.is_read && (
                                                                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-600" />
                                                                        )}
                                                                    </div>

                                                                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                                                                        {notification
                                                                            .data
                                                                            ?.description ||
                                                                            'Nouvelle information publiée.'}
                                                                    </p>

                                                                    <div className="mt-3 flex items-center justify-between gap-2">
                                                                        <span className="text-xs text-gray-400">
                                                                            {
                                                                                notification.created_at
                                                                            }
                                                                        </span>

                                                                        <span
                                                                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                                                notification.is_read
                                                                                    ? 'bg-gray-100 text-gray-500 dark:bg-zinc-900 dark:text-gray-400'
                                                                                    : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                                                                            }`}
                                                                        >
                                                                            {notification.is_read
                                                                                ? 'Lu'
                                                                                : 'Non lu'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                )
                                            ) : (
                                                <div className="p-8 text-center">
                                                    <Inbox className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-zinc-700" />

                                                    <p className="font-bold text-gray-900 dark:text-white">
                                                        Aucune notification
                                                    </p>

                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Rien à afficher pour ce
                                                        filtre.
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-gray-200 p-3 dark:border-zinc-800">
                                            <Link
                                                href={route(
                                                    'membre.evenements.index'
                                                )}
                                                className="flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                                            >
                                                Voir tous les événements
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-800"
                                        >
                                            {user.image ? (
                                                <img
                                                    src={`/storage/${user.image}`}
                                                    alt={user.name}
                                                    className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500"
                                                />
                                            ) : (
                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>
                                            )}

                                            <div className="text-left">
                                                <div className="text-sm font-semibold">
                                                    {user.name}
                                                </div>

                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {user.role ||
                                                        user.roles?.[0]?.name ||
                                                        'Utilisateur'}
                                                </div>
                                            </div>

                                            <svg
                                                className="h-4 w-4 text-gray-500"
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
                                            href={route('membre.infos')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Info className="h-4 w-4" />
                                                Mes informations
                                            </div>
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route(
                                                'membre.evenements.index'
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BellRing className="h-4 w-4" />
                                                Événements
                                            </div>
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            <div className="flex items-center gap-2">
                                                <UserCircle className="h-4 w-4" />
                                                Compte utilisateur
                                            </div>
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            <div className="flex items-center gap-2 text-red-600">
                                                <LogOut className="h-4 w-4" />
                                                Déconnexion
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex sm:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    )
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-zinc-800"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`${
                        showingNavigationDropdown ? 'block' : 'hidden'
                    } border-t border-white/10 bg-white/80 backdrop-blur-xl dark:bg-zinc-900/80 sm:hidden`}
                >
                    <div className="space-y-3 p-4">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutDashboard className="h-5 w-5" />
                                Dashboard
                            </div>
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('membre.infos')}
                            active={route().current('membre.infos')}
                        >
                            <div className="flex items-center gap-3">
                                <Info className="h-5 w-5" />
                                Mes infos
                            </div>
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('membre.evenements.index')}
                            active={route().current('membre.evenements.*')}
                        >
                            <div className="flex items-center gap-3">
                                <BellRing className="h-5 w-5" />
                                Événements
                            </div>
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 p-4 dark:border-zinc-700">
                        <div className="flex items-center gap-3">
                            {user.image ? (
                                <img
                                    src={`/storage/${user.image}`}
                                    alt={user.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 font-bold text-white">
                                    {user.name?.charAt(0)?.toUpperCase()}
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

                        <div className="mt-5 space-y-3">
                            <ResponsiveNavLink href={route('membre.infos')}>
                                <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 shadow-sm transition-all duration-300 hover:bg-emerald-100 hover:shadow-md dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">
                                            <Info className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                                Mes informations
                                            </p>

                                            <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                                Suivre mon droit annuel
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="h-4 w-4 text-emerald-500" />
                                </div>
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                href={route('membre.evenements.index')}
                            >
                                <div className="flex items-center justify-between rounded-2xl bg-indigo-50 px-4 py-3 shadow-sm transition-all duration-300 hover:bg-indigo-100 hover:shadow-md dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">
                                            <BellRing className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                                                Événements
                                            </p>

                                            <p className="text-xs text-indigo-600 dark:text-indigo-400">
                                                Infos de l'association
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="h-4 w-4 text-indigo-500" />
                                </div>
                            </ResponsiveNavLink>

                            <ResponsiveNavLink href={route('profile.edit')}>
                                <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:bg-blue-50 hover:shadow-md dark:bg-zinc-800 dark:hover:bg-zinc-700">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                                            <UserCircle className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                                Mon Profil
                                            </p>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Modifier mes informations
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                <div className="flex items-center justify-between rounded-2xl bg-red-50 px-4 py-3 shadow-sm transition-all duration-300 hover:bg-red-100 hover:shadow-md dark:bg-red-950/40 dark:hover:bg-red-900/50">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300">
                                            <LogOut className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                                                Déconnexion
                                            </p>

                                            <p className="text-xs text-red-500 dark:text-red-400">
                                                Quitter la session
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="h-4 w-4 text-red-400" />
                                </div>
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:bg-zinc-900/70">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main className="pb-10">{children}</main>
        </div>
    );
}