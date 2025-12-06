import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
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
      <About />
      <Experience />
      <Skills />
      
      {/* Temp spacer for scrolling until next phase */}
      <div className="h-[200px]" />
    </Layout>
  );
}

export default App;