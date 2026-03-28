import { Link } from '@inertiajs/react';
import { Home, Wallet, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function TresorierSidebar() {

    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 bg-primary text-white px-3 py-2 rounded'
            : 'flex items-center gap-3 px-3 py-2 hover:bg-base-300 rounded';

    return (
        <div className="p-4 flex flex-col min-h-screen">

            <h2 className="text-center font-bold mb-6">
                Trésorerie SAVA-U
            </h2>

            <ul className="space-y-2 flex-1">

                <li>
                    <Link href={route('tresorier.dashboard')} className={linkClass(isActive('tresorier.dashboard'))}>
                        <Home size={18} />
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link href={route('entres.index')} className={linkClass(isActive('entres.*'))}>
                        <ArrowDownCircle size={18} />
                        Entrées
                    </Link>
                </li>

                <li>
                    <Link href={route('sorties.index')} className={linkClass(isActive('sorties.*'))}>
                        <ArrowUpCircle size={18} />
                        Sorties
                    </Link>
                </li>

                <li>
                    <Link href={route('caisses.index')} className={linkClass(isActive('caisses.*'))}>
                        <Wallet size={18} />
                        Caisse
                    </Link>
                </li>

            </ul>

            <div className="text-sm text-center border-t pt-3">
                Gestion financière
            </div>
        </div>
    );
}