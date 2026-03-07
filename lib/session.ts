import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-in-production"
)

export type SessionPayload = {
  userId: string
  email: string
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret)
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as SessionPayload
  } catch {
    return null
  }
}
