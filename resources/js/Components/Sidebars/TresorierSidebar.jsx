import { Link } from '@inertiajs/react';
import {
    Home,
    Wallet,
    BarChart3,
    FileText
} from 'lucide-react';

export default function TresorierSidebar() {
    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 rounded-2xl bg-amber-600 px-4 py-3 font-bold text-white shadow-lg shadow-amber-600/20'
            : 'flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-amber-50 hover:text-amber-700 dark:text-gray-300 dark:hover:bg-amber-500/10 dark:hover:text-amber-300';

    return (
        <div className="flex h-full flex-col p-4">
            <div className="mb-8 rounded-3xl bg-amber-50 p-4 dark:bg-amber-500/10">
                <h2 className="font-black text-gray-900 dark:text-white">
                    Trésorerie
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Gestion financière
                </p>
            </div>

            <ul className="flex-1 space-y-2">
                <li>
                    <Link
                        href={route('tresorier.dashboard')}
                        className={linkClass(isActive('tresorier.dashboard'))}
                    >
                        <Home size={20} />
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('tresorier.finances.index')}
                        className={linkClass(isActive('tresorier.finances.*'))}
                    >
                        <Wallet size={20} />
                        Finances
                    </Link>
                </li>

                <li>
                    <Link
                        href={route('tresorier.rapports.index')}
                        className={linkClass(isActive('tresorier.rapports.*'))}
                    >
                        <FileText size={20} />
                        Droit annuel
                    </Link>
                </li>
            </ul>

            <div className="border-t border-gray-200 pt-4 text-center text-sm font-semibold text-gray-500 dark:border-zinc-800 dark:text-gray-400">
                SAVA-U
            </div>
        </div>
    );
}