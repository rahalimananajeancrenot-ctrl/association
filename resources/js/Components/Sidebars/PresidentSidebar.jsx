import { Link } from '@inertiajs/react';
import { Home, Users } from 'lucide-react';

export default function PresidentSidebar() {
    return (
        <div className="p-4 min-h-screen flex flex-col">

            <h2 className="text-center font-bold mb-6">
                Président
            </h2>

            <Link href={route('president.dashboard')} className="block py-2">
                <Home size={18} /> Dashboard
            </Link>

            <Link href={route('users.index')} className="block py-2">
                <Users size={18} /> Membres
            </Link>

        </div>
    );
}