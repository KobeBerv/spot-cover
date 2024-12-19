import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

export const SPOTIFY_SCOPES = ["user-read-currently-playing"];

const spotify = SpotifyProvider({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authorization: {
    url: "https://accounts.spotify.com/authorize",
    params: {
      scope: SPOTIFY_SCOPES.join(" "),
    },
  },
});

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refresh_token) {
      throw new Error("No refresh token");
    }

    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token as string,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to refresh token");
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + (data.expires_in ?? 3600);

    return {
      ...token,
      access_token: data.access_token,
      token_type: data.token_type ?? token.token_type,
      expires_at: expiresAt,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token ?? token.refresh_token,
      error: undefined,
    };
  } catch (error) {
    console.error("Token refresh error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default spotify;
