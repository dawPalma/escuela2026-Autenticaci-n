import { auth } from "@/auth";
import { updateProfile, logout } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, Shield, LogOut, Settings, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/auth/login");
    }

    const user = session.user;

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    {/* Sidebar */}
                    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
                        <nav className="space-y-1">
                            <a href="#" className="bg-white text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md border border-blue-100 shadow-sm">
                                <User className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-blue-500" />
                                <span className="truncate">Mi Perfil</span>
                            </a>
                            {user.role === "ADMIN" && (
                                <Link href="/admin/users" className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
                                    <Shield className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                                    <span className="truncate">Gestión de Usuarios</span>
                                </Link>
                            )}
                        </nav>
                    </aside>

                    {/* Contenido Principal */}
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Información del Usuario</h3>
                                <p className="mt-1 text-sm text-gray-500">Aquí puedes ver y actualizar tus datos personales.</p>

                                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-6 border-b border-gray-100">
                                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
                                        ) : (
                                            user.name?.charAt(0).toUpperCase() || 'U'
                                        )}
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                        <p className="text-gray-500 flex items-center justify-center sm:justify-start">
                                            <Mail className="h-4 w-4 mr-1" /> {user.email}
                                        </p>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                                            Rol: {user.role}
                                        </span>
                                    </div>
                                </div>

                                <form action={updateProfile} className="mt-8 space-y-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={user.name}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL Avatar (Opcional)</label>
                                            <input
                                                type="text"
                                                name="image"
                                                id="image"
                                                defaultValue={user.image}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Guardar cambios
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
