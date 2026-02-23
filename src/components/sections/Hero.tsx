import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  useEffect(() => {
    // GSAP animations for headline
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-char',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'expo.out',
          delay: 0.3,
        }
      );
      
      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'expo.out',
          delay: 1,
        }
      );
      
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 1.2,
        }
      );
      
      gsap.fromTo(
        '.hero-image',
        { opacity: 0, rotateY: 45, z: -200 },
        {
          opacity: 1,
          rotateY: 0,
          z: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.4,
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const headline1 = "Hi, Rizal Here!";
  const headline2 = "Machine Learning";
  const headline3 = "& Data Enthusiast";
  
  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,234,0,0.3) 0%, transparent 70%)',
            left: mousePosition.x * 0.05,
            top: mousePosition.y * 0.05,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(0,68,255,0.3) 0%, transparent 70%)',
            right: -mousePosition.x * 0.03,
            bottom: -mousePosition.y * 0.03,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-display-1 text-white mb-4">
              <div className="overflow-hidden">
                {headline1.split('').map((char, i) => (
                  <span key={i} className="hero-char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden">
                {headline2.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`hero-char inline-block ${
                      char === 'L' || char === 'e' || char === 'a' || char === 'r' || char === 'n' || char === 'i' || char === 'n' || char === 'g'
                        ? 'text-gradient-yellow'
                        : ''
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden">
                {headline3.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`hero-char inline-block ${
                      char === 'D' || char === 'a' || char === 't' || char === 'a'
                        ? 'text-gradient-blue'
                        : ''
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </h1>
            
            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Turning complex data into intelligent solutions.
              <span className="inline-flex items-center ml-2">
                <Sparkles className="w-5 h-5 text-yellow animate-pulse" />
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="hero-cta btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore My Work
                <ArrowDown className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="hero-cta btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '3+', label: 'Years Learning' },
                { value: '15+', label: 'Projects' },
                { value: '5+', label: 'Certifications' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-yellow">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* 3D Image */}
          <div className="order-1 lg:order-2 flex justify-center perspective-1200">
            <motion.div
              ref={imageRef}
              className="hero-image relative preserve-3d"
              style={{
                rotateX,
                rotateY,
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 blur-3xl opacity-50">
                <div className="w-full h-full bg-gradient-radial from-yellow/30 via-blue/20 to-transparent rounded-full" />
              </div>
              
              <img
                src="/images/hero-robot.png"
                alt="AI Robot"
                className="relative w-64 sm:w-80 lg:w-[450px] h-auto drop-shadow-2xl"
              />
              
              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-yellow/50 rounded-lg"
                animate={{
                  rotate: [0, 90, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-12 h-12 bg-blue/20 rounded-full"
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-yellow rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
