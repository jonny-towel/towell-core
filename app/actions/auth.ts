"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { createSession } from "@/lib/session"

export async function login(email: string, password: string): Promise<{ error: string } | never> {
  const supabase = createServerClient()

  const { data, error } = await supabase.rpc("validate_login", {
    p_email: email,
    p_password: password,
  })

  if (error || !data || data.length === 0) {
    return { error: "Correo o contraseña incorrectos" }
  }

  const usuario = data[0]

  const token = await createSession({ userId: usuario.id, email: usuario.email })

  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 horas
    path: "/",
  })

  redirect("/dashboard")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
