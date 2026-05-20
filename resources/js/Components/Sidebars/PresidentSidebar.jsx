import { Link } from '@inertiajs/react';
import { Home, User2, Crown, ShieldCheck } from 'lucide-react';

export default function PresidentSidebar() {
    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 rounded-2xl bg-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-600/20'
            : 'flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300';

    return (
        <div className="flex h-full flex-col p-4">
            <div className="mb-8 flex items-center gap-3 rounded-3xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                    <Crown size={24} />
                </div>

                <div>
                    <h2 className="font-black text-gray-900 dark:text-white">
                        Président
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Espace Président
                    </p>
                </div>
            </div>

            <ul className="flex-1 space-y-2">
                <li>
                    <Link
                        href={route('president.dashboard')}
                        className={linkClass(isActive('president.dashboard'))}
                    >
                        <Home size={20} />
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('president.membres.index')}
                        className={linkClass(isActive('president.membres.*'))}
                    >
                        <User2 size={20} />
                        Gestion des membres
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('president.roles.index')}
                        className={linkClass(isActive('president.roles.*'))}
                    >
                        <ShieldCheck size={20} />
                        Gestion des rôles
                    </Link>
                </li>
            </ul>

            <div className="border-t border-gray-200 pt-4 text-center text-sm font-semibold text-gray-500 dark:border-zinc-800 dark:text-gray-400">
                SAVA-U
            </div>
        </div>
    );
}