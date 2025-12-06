import React, { useState, Suspense } from 'react'; // Added Suspense
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from '../ui/Preloader';
import Navbar from './Navbar';
import SocialSidebar from './SocialSidebar';
import Footer from './Footer';
import Spotlight from '../ui/Spotlight';

// LAZY LOAD HEAVY COMPONENTS
const Background = React.lazy(() => import('../3d/Background'));
const ChatWidget = React.lazy(() => import('../chat/ChatWidget'));

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-slate-300">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
         <motion.div 
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
         >
            {/* Wrap Background in Suspense so it doesn't block the UI */}
            <Suspense fallback={null}>
               <Background />
            </Suspense>
            <Spotlight />
            <div className="bg-grain"></div>
         </motion.div>
      )}

      {!loading && (
        <>
          <Navbar />
          <SocialSidebar />
          
          <motion.main 
            className="relative z-10 flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {children}
          </motion.main>

          <Footer />
          
          {/* Lazy load ChatWidget so it downloads last */}
          <Suspense fallback={null}>
            <ChatWidget />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Layout;