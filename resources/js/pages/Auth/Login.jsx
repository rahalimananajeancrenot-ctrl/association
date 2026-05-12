import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                        <LogIn className="h-8 w-8" />
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                        Connectez-vous
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Accédez à votre espace SAVA-U
                    </p>
                </div>

                {status && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {status}
                    </div>
                )}

                <form
                    onSubmit={submit}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Adresse email
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="exemple@email.com"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            />
                        </div>

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Mot de passe
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Votre mot de passe"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-12 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />

                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-300">
                                Se souvenir de moi
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <LogIn className="h-5 w-5" />
                        {processing ? 'Connexion...' : 'Connexion'}
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}