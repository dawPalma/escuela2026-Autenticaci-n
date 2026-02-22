import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] grid place-items-center bg-gray-50">
      <div className="text-center space-y-8">
        <h1 className="p-8 px-16 text-5xl font-black text-indigo-900 bg-white rounded-3xl shadow-xl border border-indigo-100 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
          Escuela 2026
        </h1>

        <p className="text-gray-500 max-w-md mx-auto text-lg">
          Transformando la educación con tecnología. Gestiona grupos, asignaturas y estudiantes de forma eficiente.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-8">
          <Link href="/grupos" className="group p-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 group-hover:shadow-xl group-hover:border-indigo-300 transition-all text-center min-w-[160px]">
              <div className="text-4xl mb-2">👥</div>
              <div className="font-bold text-gray-900">GRUPOS</div>
            </div>
          </Link>
          <Link href="/asignaturas" className="group p-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 group-hover:shadow-xl group-hover:border-emerald-300 transition-all text-center min-w-[160px]">
              <div className="text-4xl mb-2">📚</div>
              <div className="font-bold text-gray-900">ASIGNATURAS</div>
            </div>
          </Link>
          <Link href="/estudiantes" className="group p-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 group-hover:shadow-xl group-hover:border-amber-300 transition-all text-center min-w-[160px]">
              <div className="text-4xl mb-2">🎓</div>
              <div className="font-bold text-gray-900">ESTUDIANTES</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
