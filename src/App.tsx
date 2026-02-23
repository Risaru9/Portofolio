import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import sections
import Navigation from './components/sections/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

// Lazy load 3D background for performance
const NeuralNetwork = lazy(() => import('./components/3d/NeuralNetwork'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Loading fallback for 3D
function BackgroundFallback() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900" />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Neural Network Background */}
      <Suspense fallback={<BackgroundFallback />}>
        <NeuralNetwork />
      </Suspense>
      
      {/* Ambient background gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red/5 rounded-full blur-[200px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
      
      {/* Custom cursor effect (desktop only) */}
      <CustomCursor />
    </div>
  );
}

// Custom cursor component
function CustomCursor() {
  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 234, 0, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.1s ease, opacity 0.3s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursorDot.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: #FFEA00;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX - 3}px`;
      cursorDot.style.top = `${mouseY - 3}px`;
    };
    
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.left = `${cursorX - 10}px`;
      cursor.style.top = `${cursorY - 10}px`;
      requestAnimationFrame(animateCursor);
    };
    
    // Hover effects
    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.borderColor = 'rgba(255, 234, 0, 0.8)';
    };
    
    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.borderColor = 'rgba(255, 234, 0, 0.5)';
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animateCursor();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cursor.remove();
      cursorDot.remove();
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return null;
}

export default App;
