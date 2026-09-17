import axios from "axios";

/**
 * Called server-side (from the signup API route) to pre-load the user's
 * wallet into the Matcher Service's in-memory balance map.
 *
 * Uses INTERNAL_API_URL (the Docker-internal service name) when running
 * inside a container, falling back to NEXT_PUBLIC_REST_API_URL for local
 * dev outside Docker, and finally the hardcoded local default.
 *
 * NEXT_PUBLIC_REST_API_URL is a browser-facing URL (e.g. http://localhost:13001)
 * which is unreachable from inside Docker containers — hence the separate var.
 */
const INTERNAL_API_URL =
  process.env.INTERNAL_API_URL ??          // Docker-internal: http://api-gateway:3001/api/v1
  process.env.NEXT_PUBLIC_REST_API_URL ??   // Local dev outside Docker
  "http://localhost:13001/api/v1";

export async function pingApiNewUser(userId: string): Promise<void> {
  await axios.post(`${INTERNAL_API_URL}/user/init`, { userId });
}
