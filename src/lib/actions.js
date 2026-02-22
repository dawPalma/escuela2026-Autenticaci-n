"use server"

import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { signIn, signOut, auth } from "@/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function register(prevState, formData) {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    // Validaciones básicas
    if (!name || !email || !password) {
        return { error: "Todos los campos son obligatorios" }
    }

    // Comprobamos si el usuario ya está registrado
    const userExists = await prisma.user.findUnique({
        where: { email },
    })

    if (userExists) {
        return {
            error: "El email ya está registrado",
            fields: Object.fromEntries(formData.entries()),
        }
    }

    // Encriptamos password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos usuario en base datos (Rol USER por defecto)
    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER", // Forzamos USER para registros públicos
            },
        })
    } catch (error) {
        return { error: "Error al crear el usuario" }
    }

    redirect("/auth/login")
}

export async function login(prevState, formData) {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        return { error: "Email y contraseña son obligatorios" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })
    } catch (error) {
        if (error.type === "CredentialsSignin") {
            return { error: "Credenciales inválidas" }
        }
        throw error // Re-lanzar para que Next.js maneje redirecciones
    }
}

export async function logout() {
    await signOut({ redirectTo: "/" })
}

export async function updateProfile(formData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("No autorizado")

    const name = formData.get("name")
    const image = formData.get("image")

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name, image },
    })

    revalidatePath("/dashboard")
    return { success: "Perfil actualizado" }
}

// Acciones exclusivas de ADMIN
export async function getAllUsers() {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    return await prisma.user.findMany({
        orderBy: { name: "asc" },
    })
}

export async function deleteUser(id) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    // Evitar que un admin se borre a sí mismo
    if (id === session.user.id) throw new Error("No puedes borrarte a ti mismo")

    await prisma.user.delete({
        where: { id },
    })
}

export async function updateUserRole(id, role) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    await prisma.user.update({
        where: { id },
        data: { role },
    })
}

export async function getUserById(id) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    return await prisma.user.findUnique({
        where: { id },
    })
}

export async function adminUpdateUser(formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = formData.get("id")
    const name = formData.get("name")
    const email = formData.get("email")
    const role = formData.get("role")

    await prisma.user.update({
        where: { id },
        data: { name, email, role },
    })

    revalidatePath("/admin/users")
    redirect("/admin/users")
}

// --- ACCIONES DE GRUPOS ---

export async function insertarGrupo(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const nombre = formData.get("nombre")
    const tutor = formData.get("tutor")
    const aula = formData.get("aula")

    try {
        await prisma.grupo.create({
            data: { nombre, tutor, aula }
        })
        revalidatePath("/grupos")
        return { success: "Grupo creado correctamente" }
    } catch (error) {
        return { error: "Error al crear el grupo" }
    }
}

export async function modificarGrupo(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))
    const nombre = formData.get("nombre")
    const tutor = formData.get("tutor")
    const aula = formData.get("aula")

    try {
        await prisma.grupo.update({
            where: { id },
            data: { nombre, tutor, aula }
        })
        revalidatePath("/grupos")
        return { success: "Grupo actualizado correctamente" }
    } catch (error) {
        return { error: "Error al actualizar el grupo" }
    }
}

export async function eliminarGrupo(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))

    try {
        await prisma.grupo.delete({
            where: { id }
        })
        revalidatePath("/grupos")
        return { success: "Grupo eliminado correctamente" }
    } catch (error) {
        return { error: "Error al eliminar el grupo" }
    }
}


// --- ACCIONES DE ASIGNATURAS ---

export async function insertarAsignatura(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const nombre = formData.get("nombre")
    const profesor = formData.get("profesor")
    const horas_semana = Number(formData.get("horas_semana"))

    try {
        await prisma.asignatura.create({
            data: { nombre, profesor, horas_semana }
        })
        revalidatePath("/asignaturas")
        return { success: "Asignatura creada correctamente" }
    } catch (error) {
        return { error: "Error al crear la asignatura" }
    }
}

export async function modificarAsignatura(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))
    const nombre = formData.get("nombre")
    const profesor = formData.get("profesor")
    const horas_semana = Number(formData.get("horas_semana"))

    try {
        await prisma.asignatura.update({
            where: { id },
            data: { nombre, profesor, horas_semana }
        })
        revalidatePath("/asignaturas")
        return { success: "Asignatura actualizada correctamente" }
    } catch (error) {
        return { error: "Error al actualizar the asignatura" }
    }
}

export async function eliminarAsignatura(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))

    try {
        await prisma.asignatura.delete({
            where: { id }
        })
        revalidatePath("/asignaturas")
        return { success: "Asignatura eliminada correctamente" }
    } catch (error) {
        return { error: "Error al eliminar la asignatura" }
    }
}


// --- ACCIONES DE ESTUDIANTES ---

export async function insertarEstudiante(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const nombre = formData.get("nombre")
    const foto = formData.get("foto")
    const tutor_legal = formData.get("tutor_legal")
    const fecha_nacimiento = new Date(formData.get("fecha_nacimiento"))
    const grupoId = Number(formData.get("grupoId")) || null
    const asignaturas = formData.getAll("asignaturas")

    try {
        await prisma.estudiante.create({
            data: {
                nombre, foto, tutor_legal, fecha_nacimiento,
                grupoId,
                asignaturas: {
                    connect: asignaturas.map(id => ({ id: Number(id) }))
                }
            }
        })
        revalidatePath("/estudiantes")
        return { success: "Estudiante creado correctamente" }
    } catch (error) {
        return { error: "Error al crear el estudiante" }
    }
}

export async function modificarEstudiante(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))
    const nombre = formData.get("nombre")
    const foto = formData.get("foto")
    const tutor_legal = formData.get("tutor_legal")
    const fecha_nacimiento = new Date(formData.get("fecha_nacimiento"))
    const grupoId = Number(formData.get("grupoId")) || null
    const asignaturas = formData.getAll("asignaturas")

    try {
        await prisma.estudiante.update({
            where: { id },
            data: {
                nombre, foto, tutor_legal, fecha_nacimiento,
                grupoId,
                asignaturas: {
                    set: asignaturas.map(id => ({ id: Number(id) }))
                }
            }
        })
        revalidatePath("/estudiantes")
        return { success: "Estudiante actualizado correctamente" }
    } catch (error) {
        return { error: "Error al actualizar el estudiante" }
    }
}

export async function eliminarEstudiante(prevState, formData) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") throw new Error("No autorizado")

    const id = Number(formData.get("id"))

    try {
        await prisma.estudiante.delete({
            where: { id }
        })
        revalidatePath("/estudiantes")
        return { success: "Estudiante eliminado correctamente" }
    } catch (error) {
        return { error: "Error al eliminar el estudiante" }
    }
}
