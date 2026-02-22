'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const errorMessages = {
        Configuration: "Hay un problema con la configuración del servidor de autenticación. Verifica las variables de entorno (IDs y Secretos).",
        AccessDenied: "Acceso denegado. Es posible que no tengas permisos para entrar o hayas cancelado el acceso.",
        Verification: "El token de verificación ha expirado o ya ha sido usado.",
        Default: "Ha ocurrido un error inesperado al intentar iniciar sesión."
    }

    const message = errorMessages[error] || errorMessages.Default

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Error de Autenticación
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {error && <code className="bg-red-50 text-red-700 px-2 py-1 rounded">{error}</code>}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    <p className="text-gray-700 text-center mb-6">
                        {message}
                    </p>

                    <div className="mt-6">
                        <Link
                            href="/auth/login"
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
