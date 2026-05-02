import { Link } from '@inertiajs/react';
import { Home, Users } from 'lucide-react';

export default function PresidentSidebar() {

    const isActive = (name) => route().current(name);

    const linkClass = (active) =>
        active
            ? 'flex items-center gap-3 bg-primary text-primary-content px-3 py-2 rounded transition-colors duration-300'
            : 'flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-300 hover:text-base-content transition-colors duration-300';

    return (
        <div className="p-4 flex flex-col min-h-screen transition-colors duration-300">

            <h2 className="text-center font-bold mb-6">
                Président
            </h2>

            <ul className="space-y-2 flex-1">

                {/* Dashboard */}
                <li>
                    <Link
                        href={route('president.dashboard')}
                        className={linkClass(isActive('president.dashboard'))}
                    >
                        <Home size={18} />
                        Dashboard
                    </Link>
                </li>

                {/* Membres */}
                <li>
                    <Link
                        href={route('president.membres.index')}
                        className={linkClass(isActive('president.membres.index'))}
                    >
                        <Users size={18} />
                        Membres
                    </Link>
                </li>
                {/* <li>
                    <Link
                        href="#"
                        className={linkClass(isActive('users.*'))}
                    >
                        <Users size={18} />
                        Membres
                    </Link>
                </li> */}

            </ul>

            <div className="text-sm text-center border-t pt-3 
                border-gray-300 dark:border-gray-700 
                text-gray-700 dark:text-gray-200"
            >
                Espace Président
            </div>
        </div>
    );
}