import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowLeft, Send, ShieldCheck } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                        <ShieldCheck className="h-8 w-8" />
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                        Mot de passe oublié ?
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        Entrez votre adresse email. Nous vous enverrons un lien
                        pour réinitialiser votre mot de passe.
                    </p>
                </div>

                {status && (
                    <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 dark:border-green-700/40 dark:bg-green-900/20 dark:text-green-300">
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Send className="h-5 w-5" />
                        {processing
                            ? 'Envoi en cours...'
                            : 'Envoyer le lien de réinitialisation'}
                    </button>

                    <div className="mt-5 text-center">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour à la connexion
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}