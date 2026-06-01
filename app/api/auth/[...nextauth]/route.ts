import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function toformdata(obj: Record<string, string | undefined>) {
  const formData = [];
  for (const property in obj) {
    const encodeKey = encodeURIComponent(property);
    const encodeValue = encodeURIComponent(obj[property] || "");
    formData.push(`${encodeKey}=${encodeValue}`)
  }
  return formData.join("&");
}

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),

    CredentialsProvider({
      credentials: {
        username: {
          label: "username",
          type: "text"
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const data = {
          username: credentials?.username,
          password: credentials?.password
        };
        const formData = toformdata(data);
        try {
          const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: formData,
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            }
          });
          const resData = await res.json();
          if (res.ok && resData && resData.data) {
            return resData.data;
          } else {
            console.error("Author failed", resData)
          }
        } catch (error) {
          console.error("Auth error", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any;
      return session
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions, toformdata }