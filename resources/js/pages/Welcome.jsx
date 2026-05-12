import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Sun,
    Moon,
    ArrowRight,
    Users,
    CalendarDays,
    GraduationCap,
    HeartHandshake,
    Sparkles,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

export default function Welcome({ auth }) {
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
        <>
            <Head title="SAVA-U | Accueil" />

            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-white overflow-hidden">

                {/* NAVBAR */}
                <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black shadow-lg">
                                S
                            </div>

                            <div>
                                <h1 className="text-xl font-black tracking-tight">
                                    SAVA-U
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Association étudiante
                                </p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-3">
                            <button
                                onClick={toggleDarkMode}
                                className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </button>

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-600/20 transition"
                                >
                                    Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-600/20 transition"
                                >
                                    Connexion
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                {/* HERO */}
                <section className="relative pt-36 pb-24 px-6">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300 font-semibold text-sm mb-6">
                                <Sparkles className="w-4 h-4" />
                                Plateforme officielle de SAVA-U
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                                Ensemble pour une association plus organisée,
                                active et solidaire.
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
                                SAVA-U accompagne ses membres dans la gestion des activités,
                                la communication, l’entraide et le suivi de la vie associative.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-7 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-xl shadow-red-600/20 transition"
                                    >
                                        Accéder au dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-7 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 shadow-xl shadow-red-600/20 transition"
                                    >
                                        Se connecter
                                    </Link>
                                )}

                                <a
                                    href="#missions"
                                    className="px-7 py-3 rounded-full border border-slate-300 dark:border-zinc-700 font-bold hover:bg-white dark:hover:bg-zinc-900 transition"
                                >
                                    Découvrir SAVA-U
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card icon={<Users />} title="Membres" value="Gestion" />
                                    <Card icon={<CalendarDays />} title="Activités" value="Suivi" />
                                    <Card icon={<GraduationCap />} title="Éducation" value="Soutien" />
                                    <Card icon={<HeartHandshake />} title="Solidarité" value="Entraide" />
                                </div>

                                <div className="mt-6 p-5 rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 text-white">
                                    <h3 className="text-xl font-black mb-2">
                                        Une communauté engagée
                                    </h3>
                                    <p className="text-white/90">
                                        Organisation, collaboration et réussite des étudiants.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                        <Stat number="100+" label="Membres accompagnés" />
                        <Stat number="20+" label="Activités organisées" />
                        <Stat number="1" label="Communauté unie" />
                    </div>
                </section>

                {/* MISSIONS */}
                <section id="missions" className="px-6 py-20 bg-white dark:bg-zinc-900">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <h3 className="text-3xl md:text-4xl font-black mb-4">
                                Nos missions
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                SAVA-U agit pour renforcer la réussite, la solidarité et
                                l’engagement de ses membres.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <Mission
                                icon={<GraduationCap />}
                                title="Éducation"
                                text="Soutenir les étudiants dans leur parcours académique."
                            />

                            <Mission
                                icon={<HeartHandshake />}
                                title="Solidarité"
                                text="Favoriser l’entraide, le partage et la cohésion."
                            />

                            <Mission
                                icon={<CalendarDays />}
                                title="Activités"
                                text="Organiser des événements, formations et rencontres."
                            />
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-r from-red-600 to-orange-500 text-white p-8 md:p-12">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black mb-4">
                                    Rejoindre ou contacter SAVA-U
                                </h3>
                                <p className="text-white/90">
                                    Pour toute information, contactez l’association ou connectez-vous
                                    à la plateforme.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <ContactItem icon={<Mail />} text="contact@sava-u.org" />
                                <ContactItem icon={<Phone />} text="+261 XX XXX XX" />
                                <ContactItem icon={<MapPin />} text="Madagascar" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="px-6 py-8 border-t border-slate-200 dark:border-zinc-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} SAVA-U — Tous droits réservés.
                </footer>
            </div>
        </>
    );
}

function Card({ icon, title, value }) {
    return (
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700">
            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300 flex items-center justify-center mb-4">
                {icon}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {title}
            </p>
            <h4 className="text-xl font-black">
                {value}
            </h4>
        </div>
    );
}

function Stat({ number, label }) {
    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-center">
            <h4 className="text-4xl font-black text-red-600 mb-2">
                {number}
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
                {label}
            </p>
        </div>
    );
}

function Mission({ icon, title, text }) {
    return (
        <div className="p-7 rounded-3xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:-translate-y-1 transition">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-5">
                {icon}
            </div>
            <h4 className="text-xl font-black mb-3">
                {title}
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
                {text}
            </p>
        </div>
    );
}

function ContactItem({ icon, text }) {
    return (
        <div className="flex items-center gap-3 bg-white/15 rounded-2xl px-5 py-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                {icon}
            </div>
            <span className="font-semibold">{text}</span>
        </div>
    );
}