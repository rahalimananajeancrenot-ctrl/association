import { Link } from '@inertiajs/react';
import { Home, Building2, CheckCircle } from 'lucide-react';

export default function LogementSidebar() {

    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 bg-primary text-primary-content px-3 py-2 rounded transition-colors duration-300'
            : 'flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-300 hover:text-base-content transition-colors duration-300';

    return (
        <div className="p-4 flex flex-col min-h-screen transition-colors duration-300">

            <h2 className="text-center font-bold mb-6 transition-colors duration-300">
                Commission Logement
            </h2>

            <ul className="space-y-2 flex-1">

                {/* Dashboard */}
                <li>
                    <Link
                        href={route('dashboard.logements')}
                        className={linkClass(isActive('dashboard.logements'))}
                    >
                        <Home size={18} />
                        Dashboard
                    </Link>
                </li>

                {/* Logements */}
                <li>
                    <Link
                        href={route('logements.index')}
                        className={linkClass(isActive('logements.*'))}
                    >
                        <Building2 size={18} />
                        Gérer logements
                    </Link>
                </li>

                {/* Attributions */}
                <li>
                    <Link
                        href={route('attributions.index')}
                        className={linkClass(
                            route().current('attributions.index') || route().current('attributions.create')
                        )}
                    >
                        <CheckCircle size={18} />
                        Gérer attributions
                    </Link>
                </li>
            </ul>

            <div className="text-sm text-center border-t pt-3 transition-colors duration-300 
                border-gray-300 dark:border-gray-700 
                text-gray-700 dark:text-gray-200"
            >
                Gestion des logements
            </div>
        </div>
    );
}