import { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = 'TheRealLaksh';
const REPO_NAMES = [
  'portfolio-react',
  'stranger-things',
  'Music-Player',
  'Callender-Events',
  'Portfolio-Website', // Note: Check if there is a trailing space in your original code 'Portfolio-Website '
  'Shopping-demo'
];

const CACHE_KEY = 'github_repos_data';
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour

const useGitHub = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      // 1. Check Cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setProjects(data);
          setLoading(false);
          return;
        }
      }

      // 2. Fetch if no cache
      try {
        const promises = REPO_NAMES.map(async (repoName) => {
          try {
            const { data: repo } = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName.trim()}`);
            const { data: langs } = await axios.get(repo.languages_url);
            
            let genre = 'code';
            const lowerName = repo.name.toLowerCase();
            if (lowerName.includes('music')) genre = 'music';
            else if (lowerName.includes('artist')) genre = 'art';
            else if (lowerName.includes('calendar') || lowerName.includes('callender')) genre = 'calendar';
            else if (lowerName.includes('shop')) genre = 'shop';
            else if (lowerName.includes('stranger')) genre = 'tv';

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              demo: repo.homepage,
              stars: repo.stargazers_count,
              languages: Object.keys(langs),
              genre: genre
            };
          } catch (err) {
            console.warn(`Failed to fetch ${repoName}`, err);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validData = results.filter(Boolean);

        if (validData.length > 0) {
          setProjects(validData);
          // Save to Cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: validData,
            timestamp: Date.now()
          }));
        } else {
          setError("API limit reached or no data.");
        }
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading, error };
};

export default useGitHub;