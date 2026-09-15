import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_URL ?? "http://localhost:3001/api/v1";

/**
 * Called after signup to pre-load the user's wallet into the Matcher
 * Service's in-memory balance map so they can place orders immediately.
 */
export async function pingApiNewUser(userId: string): Promise<void> {
  await axios.post(`${BASE_URL}/user/init`, { userId });
}
