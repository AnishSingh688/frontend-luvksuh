import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email }
                });

                if (!admin) {
                    throw new Error("No user found");
                }

                const isValid = await verifyPassword(credentials.password, admin.password);

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
