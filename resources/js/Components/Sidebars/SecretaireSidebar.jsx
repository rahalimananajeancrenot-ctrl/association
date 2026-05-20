import { Link } from '@inertiajs/react';
import {
    Home,
    Megaphone,
    FileText,
    PenLine,
} from 'lucide-react';

export default function SecretaireSidebar() {
    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white shadow-lg shadow-blue-600/20'
            : 'flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-500/10 dark:hover:text-blue-300';

    return (
        <div className="flex h-full flex-col p-4">
            <div className="mb-8 flex items-center gap-3 rounded-3xl bg-blue-50 p-4 dark:bg-blue-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <PenLine size={24} />
                </div>

                <div>
                    <h2 className="font-black text-gray-900 dark:text-white">
                        Secrétaire
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Informations & événements
                    </p>
                </div>
            </div>

            <ul className="flex-1 space-y-2">
                <li>
                    <Link
                        href={route('secretaire.evenements.index')}
                        className={linkClass(isActive('secretaire.evenements.*'))}
                    >
                        <Megaphone size={20} />
                        Événements / Infos
                    </Link>
                </li>

                {/* <li>
                    <Link
                        href={route('dashboard')}
                        className={linkClass(isActive('dashboard'))}
                    >
                        <Home size={20} />
                        Dashboard général
                    </Link>
                </li> */}
            </ul>

            <div className="border-t border-gray-200 pt-4 text-center text-sm font-semibold text-gray-500 dark:border-zinc-800 dark:text-gray-400">
                SAVA-U
            </div>
        </div>
    );
}