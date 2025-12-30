import { useState, useEffect } from 'react';
import axios from 'axios';

// SECURITY FIX: Removed hardcoded keys.
const LASTFM_USERNAME = import.meta.env.VITE_LASTFM_USERNAME;
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;

const API_URL = (LASTFM_USERNAME && LASTFM_API_KEY)
  ? `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  : null;

const useSpotify = () => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_URL) {
      setLoading(false);
      return;
    }

    let isMounted = true; // STABILITY FIX: Track mount status

    const fetchSong = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (!isMounted) return; // Prevent state update if unmounted

        const track = data.recenttracks.track[0];

        if (track) {
          setSong({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            image: (track.image && track.image.length > 2) ? track.image[2]['#text'] : null, 
            isPlaying: track['@attr']?.nowplaying === 'true',
            url: track.url
          });
        }
      } catch (error) {
        if (isMounted) console.error("Error fetching Last.fm data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSong();
    
    const interval = setInterval(() => {
        if (!document.hidden && isMounted) {
            fetchSong();
        }
    }, 10000); 

    return () => {
        isMounted = false; // Cleanup
        clearInterval(interval);
    };
  }, []);

  return { song, loading };
};

export default useSpotify;