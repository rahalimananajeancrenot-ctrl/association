import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Welcome({ auth }) {

    const [darkMode, setDarkMode] = useState(false);

    // Charger le thème au démarrage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    // Toggle mode
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
        <>
            <Head title="SAVA-U | Accueil" />

            <div className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white min-h-screen">

                {/* NAVBAR */}
                <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-900 shadow">
                    <h1 className="text-xl font-bold text-[#FF2D20]">
                        SAVA-U
                    </h1>

                    <nav className="flex items-center gap-4">

                        {/* ✅ BOUTON DARK MODE */}
                        <button
                            onClick={toggleDarkMode}
                            className="btn btn-ghost btn-circle"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        {/* AUTH */}
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 bg-[#FF2D20] text-white rounded-md"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 border rounded-md"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 bg-[#FF2D20] text-white rounded-md"
                                >
                                    Inscription
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO */}
                <section className="text-center py-20 px-6">
                    <h2 className="text-4xl font-bold mb-4">
                        Bienvenue sur SAVA-U
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        Plateforme de gestion associative dédiée à l'organisation,
                        la communication et le suivi des activités de l'association SAVA-U.
                    </p>
                </section>

                {/* A PROPOS */}
                <section className="py-16 px-6 max-w-6xl mx-auto">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                        À propos de l'association
                    </h3>

                    <p className="text-center text-gray-600 dark:text-gray-300">
                        SAVA-U est une association engagée dans le développement
                        académique, social et culturel des étudiants. Elle organise
                        des activités, événements et projets pour favoriser la
                        collaboration et la réussite de ses membres.
                    </p>
                </section>

                {/* MISSIONS */}
                <section className="bg-white dark:bg-zinc-900 py-16 px-6">
                    <h3 className="text-2xl font-semibold text-center mb-10">
                        Nos missions
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <div className="p-6 rounded-lg shadow">
                            <h4 className="font-bold mb-2">🎓 Éducation</h4>
                            <p>Encadrer et soutenir les étudiants.</p>
                        </div>

                        <div className="p-6 rounded-lg shadow">
                            <h4 className="font-bold mb-2">🤝 Solidarité</h4>
                            <p>Promouvoir l'entraide entre membres.</p>
                        </div>

                        <div className="p-6 rounded-lg shadow">
                            <h4 className="font-bold mb-2">🌍 Développement</h4>
                            <p>Participer au développement local.</p>
                        </div>
                    </div>
                </section>

                {/* ACTIVITES */}
                <section className="py-16 px-6 max-w-6xl mx-auto">
                    <h3 className="text-2xl font-semibold text-center mb-10">
                        Nos activités
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow">
                            📅 Conférences
                        </div>
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow">
                            🧑‍🏫 Formations
                        </div>
                        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow">
                            🎉 Événements
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section className="bg-gray-200 dark:bg-zinc-800 py-16 text-center">
                    <h3 className="text-2xl font-semibold mb-4">
                        Contactez-nous
                    </h3>
                    <p>Email : contact@sava-u.org</p>
                    <p>Téléphone : +261 XX XXX XX</p>
                </section>

                {/* FOOTER */}
                <footer className="text-center py-6 text-sm">
                    © {new Date().getFullYear()} SAVA-U - Tous droits réservés
                </footer>
            </div>
        </>
    );
}