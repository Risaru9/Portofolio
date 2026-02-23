import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 100% 0 0)', x: -50 },
        {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      
      // Content slide in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
      
      // Parallax effect
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const stats = [
    { value: '1+', label: 'Years Learning' },
    { value: '6+', label: 'Projects' },
    { value: '14+', label: 'Certifications' },
  ];
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-yellow/20 rounded-full opacity-50" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-blue/20 rotate-45 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-12 h-0.5 bg-yellow" />
          <span className="text-sm font-medium text-yellow uppercase tracking-wider">
            About Me
          </span>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/Photo.jpeg"
                alt="Profile"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Floating accent */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="absolute -bottom-4 -left-4 glass-light px-6 py-4 rounded-xl border border-white/10"
            >
              <div className="text-3xl font-display font-bold text-yellow">1+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div ref={contentRef} className="lg:pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-display-3 text-white mb-6"
            >
              Passionate about{' '}
              <span className="text-gradient-yellow">AI</span> &{' '}
              <span className="text-gradient-blue">Data</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4 text-white/70 leading-relaxed"
            >
              <p>
                Halo! Saya Rizal Mahardika Putra, seorang mahasiswa jurusan Sistem Informasi di Universitas Negeri Surabaya. 
                Saya memiliki minat mendalam di bidang Artificial Intelligence, Machine Learning, Deep learning, dan Data Science.
              </p>
              <p>
                Saya selalu antusias mengeksplorasi bagaimana data dapat diolah menjadi insight 
                berharga dan model AI yang mampu memecahkan masalah dunia nyata. Setiap proyek 
                adalah kesempatan baru untuk belajar dan berkembang.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-10"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-3xl lg:text-4xl font-display font-bold text-white group-hover:text-yellow transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.15, duration: 0.8 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Skills preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {['Python', 'TensorFlow', 'Pytorch', 'Data Science', 'Machine Learning', 'Deep Learning', 'Artificial Intelegence'].map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-white/70 hover:border-yellow/50 hover:text-yellow transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
