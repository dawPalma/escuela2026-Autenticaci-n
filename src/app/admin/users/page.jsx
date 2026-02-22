import { auth } from "@/auth";
import { getAllUsers, deleteUser, updateUserRole } from "@/lib/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, User, Trash2, Edit2, LayoutDashboard, ArrowLeft } from "lucide-react";

export default async function AdminUsersPage() {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const users = await getAllUsers();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Shield className="h-6 w-6 text-blue-600 mr-2" />
                        <h1 className="text-xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Gestión de Usuarios</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {users.length} Usuarios Registrados
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {u.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-3">
                                                {u.id !== session.user.id ? (
                                                    <>
                                                        <Link
                                                            href={`/admin/users/${u.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-lg transition-colors"
                                                            title="Editar Usuario"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                        <form action={async () => {
                                                            "use server";
                                                            await deleteUser(u.id);
                                                        }}>
                                                            <button
                                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg transition-colors"
                                                                title="Eliminar Usuario"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </form>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Eres tú</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
