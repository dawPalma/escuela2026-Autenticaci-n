import { auth } from "@/auth";
import { getUserById, adminUpdateUser } from "@/lib/actions";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, Save, User as UserIcon, Mail, Tag } from "lucide-react";

export default async function EditUserPage({ params }) {
    const session = await auth();
    const { id } = await params;

    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const user = await getUserById(id);

    if (!user) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Shield className="h-6 w-6 text-indigo-600 mr-2" />
                        <h1 className="text-xl font-bold text-gray-900">Editar Usuario</h1>
                    </div>
                    <Link href="/admin/users" className="flex items-center text-gray-600 hover:text-indigo-900 text-sm font-medium">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Volver a la lista
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-blue-600">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <UserIcon className="mr-2 h-6 w-6" />
                            Perfil de {user.name || 'Usuario'}
                        </h3>
                        <p className="text-indigo-100 text-sm mt-1">ID: {user.id}</p>
                    </div>

                    <form action={adminUpdateUser} className="p-8 space-y-8">
                        <input type="hidden" name="id" value={user.id} />

                        <div className="grid grid-cols-1 gap-y-8 gap-x-6">
                            <div>
                                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <UserIcon className="h-4 w-4 mr-2 text-indigo-500" />
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={user.name}
                                    className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border transition-all"
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="h-4 w-4 mr-2 text-indigo-500" />
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    defaultValue={user.email}
                                    className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border transition-all"
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                    <Tag className="h-4 w-4 mr-2 text-indigo-500" />
                                    Rol del Sistema
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    defaultValue={user.role}
                                    className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border transition-all"
                                >
                                    <option value="USER">USER - Lectura (Por defecto)</option>
                                    <option value="ADMIN">ADMIN - Control Total</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <Link href="/admin/users" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                Cancelar cambios
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
