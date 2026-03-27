import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function GuestLayout({ children, auth }) {

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
        <div className="bg-gray-100 dark:bg-black text-gray-800 dark:text-white min-h-screen">

            {/* ✅ NAVBAR */}
            <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-900 shadow">
                <Link href="/">
                    <ApplicationLogo className="text-2xl" />
                </Link>

                <nav className="flex items-center gap-4">

                    {/* DARK MODE */}
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
                    {auth?.user ? (
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

                            {/* <Link
                                href={route('register')}
                                className="px-4 py-2 bg-[#FF2D20] text-white rounded-md"
                            >
                                Inscription
                            </Link> */}
                        </>
                    )}
                </nav>
            </header>

            {/* CONTENU */}
            <div className="flex flex-col items-center pt-6">
                <div className="mt-6 mb-6 w-full max-w-4xl bg-white dark:bg-zinc-900 px-6 py-4 shadow-md rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}