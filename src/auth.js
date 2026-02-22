import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import authConfig from "./auth.config"
import bcrypt from "bcryptjs"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role
            }
            if (token.name && session.user) {
                session.user.name = token.name
            }
            if (token.picture && session.user) {
                session.user.image = token.picture
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const user = await prisma.user.findUnique({
                where: { id: token.sub },
            })

            if (!user) return token

            token.name = user.name
            token.role = user.role
            token.picture = user.image
            return token
        },
    },
    providers: [
        ...authConfig.providers,
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials

                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user || !user.password) return null

                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (passwordsMatch) return user

                return null
            },
        }),
    ],
})
