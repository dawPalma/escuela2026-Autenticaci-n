import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { LayoutDashboard, LogOut, LogIn, UserPlus, GraduationCap } from "lucide-react";

export default async function Navbar() {
    const session = await auth();
    const user = session?.user;

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <GraduationCap className="h-8 w-8 text-indigo-600 mr-2" />
                            <span className="text-xl font-bold text-gray-900 hidden md:block">Escuela 2026</span>
                        </Link>

                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link href="/grupos" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Grupos</Link>
                            <Link href="/asignaturas" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Asignaturas</Link>
                            <Link href="/estudiantes" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Estudiantes</Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                                    title="Ir al Dashboard"
                                >
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 ring-2 ring-transparent hover:ring-indigo-300 transition-all">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                        ) : (
                                            <span className="text-xs font-bold text-indigo-700">{user.name?.charAt(0).toUpperCase()}</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium hidden sm:inline-block">Hola, {user.name?.split(' ')[0]}</span>
                                </Link>

                                <form action={logout}>
                                    <button className="flex items-center text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        <LogOut className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Salir</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/auth/login"
                                    className="flex items-center text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Entrar
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="flex items-center bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm"
                                >
                                    <UserPlus className="h-4 w-4 mr-1" />
                                    Registro
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
