"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Github, Chrome } from "lucide-react";

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, null);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
                        Iniciar sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿No tienes cuenta?{" "}
                        <Link
                            href="/auth/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

                <form action={action} className="mt-8 space-y-6">
                    {state?.error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <p className="text-sm text-red-700">{state.error}</p>
                        </div>
                    )}

                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                defaultValue={state?.fields?.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
                        >
                            {isPending ? "Iniciando sesión..." : "Entrar"}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">O continúa con</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <button
                            onClick={() => signIn("google")}
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <Chrome className="h-5 w-5 text-red-500" />
                        </button>
                        <button
                            onClick={() => signIn("github")}
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <Github className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => signIn("discord")}
                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.052-.102.001-.226-.106-.267a12.254 12.254 0 0 1-1.687-.806.084.084 0 0 1-.006-.139c.14-.105.281-.217.415-.332a.08.08 0 0 1 .082-.011 13.963 13.963 0 0 0 10.957 0 .08.08 0 0 1 .082.011c.134.115.275.227.415.332a.084.084 0 0 1-.006.139c-.524.323-1.096.59-1.687.806-.107.041-.158.165-.106.267.352.699.764 1.365 1.226 1.994a.078.078 0 0 0 .084.028 20.217 20.217 0 0 0 6.024-3.03.077.077 0 0 0 .031-.057c.5-5.177-.866-9.672-3.593-13.66a.061.061 0 0 0-.033-.027zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
