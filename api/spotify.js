export default async function handler(request, response) {
  // 1. Get keys from server-side environment variables
  const USERNAME = process.env.VITE_LASTFM_USERNAME;
  const API_KEY = process.env.VITE_LASTFM_API_KEY;

  // 2. Security Check
  if (!USERNAME || !API_KEY) {
    return response.status(500).json({ error: "Missing Server Configuration" });
  }

  try {
    // 3. Call Last.fm API (Server-to-Server)
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();

    // 4. Return only the data the frontend needs
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch music data" });
  }
}