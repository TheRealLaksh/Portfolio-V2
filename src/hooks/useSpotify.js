import { useState, useEffect } from 'react';

const API_URL = '/api/spotify';

const useSpotify = () => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; 

    const fetchSong = async () => {
      try {
        // PERF FIX: Use native fetch instead of axios
        const res = await fetch(API_URL);
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        if (!isMounted) return;

        const track = data.recenttracks?.track?.[0];

        if (track) {
          setSong({
            name: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            // Fix: Safe access to image array
            image: (track.image && track.image.length > 2) ? track.image[2]['#text'] : null, 
            isPlaying: track['@attr']?.nowplaying === 'true',
            url: track.url
          });
        }
      } catch (error) {
        if (isMounted) console.error("Error fetching Music data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    
    fetchSong();
    
  
    const interval = setInterval(() => {
   
        if (!document.hidden && isMounted) {
            fetchSong();
        }
    }, 30000); 

    return () => {
        isMounted = false;
        clearInterval(interval);
    };
  }, []);

  return { song, loading };
};

export default useSpotify;