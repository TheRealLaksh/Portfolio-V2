import { useState, useEffect } from 'react';
import { triggerHaptic } from '../utils/triggerHaptic';

// SECURITY FIX: Removed hardcoded fallback keys. 
// If the ENV variable is missing, it should fail rather than leak a key.
const API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://ai-backend-2.vercel.app/api/chat';
const API_KEY = import.meta.env.VITE_CHAT_API_KEY;

if (!API_KEY) {
  console.error("CRITICAL: VITE_CHAT_API_KEY is missing in environment variables.");
}

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('AI-LakshChatMessages');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('AI-LakshUserId') || ''; } catch { return ''; }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      const newId = 'user-' + Date.now();
      setUserId(newId);
      localStorage.setItem('AI-LakshUserId', newId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('AI-LakshChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addMessage = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // --- 1. KEYWORD DETECTION ENGINE ---
  const detectCardTrigger = (text) => {
    const lowerText = text.toLowerCase();
    
    // Project Triggers
    if (['project', 'work', 'build', 'built', 'github', 'repo', 'portfolio'].some(k => lowerText.includes(k))) return 'project';
    
    // Experience Triggers
    if (['experience', 'job', 'work', 'intern', 'company', 'career', 'role'].some(k => lowerText.includes(k))) return 'experience';
    
    // Tech Stack Triggers
    if (['stack', 'tech', 'skill', 'tool', 'language', 'framework', 'react', 'node'].some(k => lowerText.includes(k))) return 'stack';
    
    // Vibe/Spotify Triggers
    if (['music', 'song', 'vibe', 'listening', 'spotify', 'playing', 'sound', 'track', 'playlist', 'hear'].some(k => lowerText.includes(k))) return 'vibe';
    
    // Contact Triggers
    if (['contact', 'email', 'mail', 'hire', 'call', 'meet', 'reach'].some(k => lowerText.includes(k))) return 'contact';

    // Services / Packages Triggers (NEW)
    // FIX: Removed "money" from triggers to prevent false positives
    if (['service', 'package', 'price', 'pricing', 'cost', 'offer', 'sell', 'buy'].some(k => lowerText.includes(k))) return 'services';
    
    return null;
  };

  // --- 2. CUSTOM OVERRIDE RESPONSES ---
  const replyOverrides = {
    project: "I've pulled up Laksh's latest GitHub shipments for you. Swipe to explore!",
    experience: "Here is a timeline of Laksh's professional journey and internships.",
    stack: "These are the weapons in Laksh's technical arsenal:",
    vibe: "Connecting to Spotify... Here's what keeps Laksh in the zone right now! 🎧",
    contact: "I'd love to help you get in touch. Here is his contact card.",
    services: "Navigating you to the Services & Pricing section to explore the packages."
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    addMessage({ sender: 'You', content: messageText, type: 'text' });
    setIsLoading(true);

    const cardTrigger = detectCardTrigger(messageText);

    try {
      if (!API_KEY) throw new Error("Missing API Configuration");

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message: messageText, userId }),
      });

      if (!response.ok) throw new Error('Failed');
      const data = await response.json();

      let aiReply = data?.reply || '';
      let triggerCard = cardTrigger;

      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        triggerCard = 'contact';
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      if (triggerCard && replyOverrides[triggerCard]) {
        aiReply = replyOverrides[triggerCard];
      }

      addMessage({ sender: 'AI-Laksh', content: aiReply, type: 'mdx' });

      if (triggerCard) {
        setTimeout(() => {
          triggerHaptic();
          addMessage({ sender: 'AI-Laksh', type: triggerCard });
        }, 600);
      }

    } catch (error) {
      console.error(error);
      addMessage({ sender: 'AI-Laksh', content: "I'm having trouble connecting to the server. Please check your connection or try again later.", type: 'text' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem('AI-LakshChatMessages');
    try {
      if (API_KEY) {
        await fetch(API_URL, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
            body: JSON.stringify({ userId }),
        });
      }
    } catch (e) { console.error(e); }
  };

  return { chatMessages, isLoading, addMessage, sendMessage, clearChat };
};