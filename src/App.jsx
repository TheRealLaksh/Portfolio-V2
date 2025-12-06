import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About'; // Import About
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  return (
    <Layout>
      <Hero />
      <About /> {/* Add About here */}
      
      {/* Temp spacer for scrolling */}
      <div className="h-[500px]" />
    </Layout>
  );
}

export default App;