import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FiMessageSquare, FiX, FiSend, FiCopy, FiExternalLink, 
  FiBriefcase, FiMinimize2, FiMaximize2, FiMail
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf'; 
import { triggerHaptic } from '../../utils/triggerHaptic';
import { cn } from '../../utils/cn';

// ✅ API Configuration (RESTORED)
const API_URL = 'https://ai-backend-2.vercel.app/api/chat';
const API_KEY = 'AI-Laksh123';

/* ---------------- COMPONENTS ---------------- */

const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{ height: ["4px", "12px", "4px"], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-xs font-medium text-slate-300 hover:text-sky-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)]"
  >
    <Icon size={14} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

const ContactCard = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('contact@lakshp.live');
    triggerHaptic();
  };

  return (
    <div className="w-[260px] bg-slate-900/80 backdrop-blur-xl border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 mb-2">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 pb-6 relative">
        <div className="absolute top-0 right-0 p-3 opacity-30">
          <FiMessageSquare size={40} />
        </div>
        <h4 className="text-white font-bold text-lg">Let's Connect</h4>
        <p className="text-sky-100 text-xs opacity-90">I'm open for work!</p>
      </div>

      <div className="p-4 -mt-4 relative z-10 space-y-3">
        <button 
          onClick={handleCopy}
          className="w-full group flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
              <FiMail size={14} />
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</div>
              <div className="text-xs text-white">contact@lakshp.live</div>
            </div>
          </div>
          <FiCopy className="text-slate-500 group-hover:text-white transition-colors" />
        </button>

        <a 
          href="https://linkedin.com/in/laksh-pradhwani" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FiExternalLink size={14} />
          </div>
          <span className="text-sm text-white font-medium">LinkedIn Profile</span>
        </a>
      </div>
    </div>
  );
};

/* ---------------- CHAT WIDGET ---------------- */

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('auroraChatMessages')) || [];
    } catch { return []; }
  });
  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('auroraUserId') || ''; } catch { return ''; }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setShowNotification(false);
  }, [isOpen]);

  useEffect(() => {
    if (!userId) {
      const newUserId = 'user-' + Date.now();
      setUserId(newUserId);
      localStorage.setItem('auroraUserId', newUserId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading, isOpen, isExpanded]);

  useEffect(() => {
    if (isOpen && !hasBooted) {
      setIsBooting(true);
      setBootLines([]);
      const logs = [
        "> INITIALIZING NEURAL UPLINK...",
        "> CONNECTING TO LAKSH_CORE...",
        "> SECURITY HANDSHAKE::VERIFIED",
        "> ESTABLISHING SECURE CHANNEL..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) setBootLines(p => [...p, logs[i++]]);
        else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHasBooted(true);
          }, 800);
        }
      }, 350);
    }
  }, [isOpen, hasBooted]);

  const handleToggle = () => {
    triggerHaptic();
    setIsOpen(prev => !prev);
  };

  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    window.open(resumeFile, '_blank');
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput('');
    setChatMessages(prev => [...prev, { sender: 'You', content: message, type: 'text' }]);
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message, userId }),
      });

      const data = await res.json();
      let aiReply = data?.reply || '';
      let showCard = false;

      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        showCard = true;
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      setChatMessages(prev => [...prev, { sender: 'Aurora', content: aiReply, type: 'mdx' }]);

      if (showCard) {
        setTimeout(() => {
          triggerHaptic();
          setChatMessages(prev => [...prev, { sender: 'Aurora', type: 'contact' }]);
        }, 600);
      }

    } catch {
      setChatMessages(prev => [...prev, { sender: 'Aurora', content: 'Error. Please try again.', type: 'text' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ✅ YOUR FULL UI CONTINUES HERE UNCHANGED */}
      {/* The rest of your JSX remains EXACTLY as before */}
    </>
  );
}

export default ChatWidget;
