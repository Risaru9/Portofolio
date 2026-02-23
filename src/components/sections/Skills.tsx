import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Globe, 
  Brain, 
  LineChart, 
  Layers,
  Cpu,
  GitBranch
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  accentColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: <Code2 className="w-6 h-6" />,
    accentColor: '#FFEA00',
    skills: [
      { name: 'Python', icon: <Code2 className="w-4 h-4" />, level: 90, color: '#FFEA00' },
      { name: 'JavaScript', icon: <Code2 className="w-4 h-4" />, level: 85, color: '#FFEA00' },
      { name: 'SQL', icon: <Database className="w-4 h-4" />, level: 80, color: '#FFEA00' },
      { name: 'R', icon: <LineChart className="w-4 h-4" />, level: 70, color: '#FFEA00' },
    ],
  },
  {
    title: 'Machine Learning & Data',
    icon: <Brain className="w-6 h-6" />,
    accentColor: '#0044FF',
    skills: [
      { name: 'TensorFlow', icon: <Brain className="w-4 h-4" />, level: 85, color: '#0044FF' },
      { name: 'Scikit-Learn', icon: <Cpu className="w-4 h-4" />, level: 88, color: '#0044FF' },
      { name: 'Pandas', icon: <Database className="w-4 h-4" />, level: 90, color: '#0044FF' },
      { name: 'NumPy', icon: <Layers className="w-4 h-4" />, level: 85, color: '#0044FF' },
      { name: 'PyTorch', icon: <Brain className="w-4 h-4" />, level: 75, color: '#0044FF' },
      { name: 'YOLO', icon: <Brain className="w-4 h-4" />, level: 80, color: '#0044FF' },
    ],
  },
  {
    title: 'Web & Other Tech',
    icon: <Globe className="w-6 h-6" />,
    accentColor: '#FF0000',
    skills: [
      { name: 'Next.js', icon: <Globe className="w-4 h-4" />, level: 80, color: '#FF0000' },
      { name: 'Node.js', icon: <Code2 className="w-4 h-4" />, level: 75, color: '#FF0000' },
      { name: 'React', icon: <Layers className="w-4 h-4" />, level: 85, color: '#FF0000' },
      { name: 'Git', icon: <GitBranch className="w-4 h-4" />, level: 82, color: '#FF0000' },
      { name: 'Docker', icon: <Layers className="w-4 h-4" />, level: 70, color: '#FF0000' },
      { name: 'PostgreSQL', icon: <Database className="w-4 h-4" />, level: 75, color: '#FF0000' },
      { name: 'MySql', icon: <Database className="w-4 h-4" />, level: 80, color: '#FF0000' },
    ],
  },
];

function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
      whileHover={{ scale: 1.15, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-full border transition-all duration-300"
        style={{
          backgroundColor: `${skill.color}10`,
          borderColor: isHovered ? skill.color : `${skill.color}30`,
          boxShadow: isHovered ? `0 0 20px ${skill.color}40` : 'none',
        }}
      >
        <span style={{ color: skill.color }}>{skill.icon}</span>
        <span className="text-sm font-medium text-white">{skill.name}</span>
      </div>
      
      {/* Level indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div className="flex items-center gap-2 px-3 py-1 bg-black/80 rounded-full text-xs">
          <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
            />
          </div>
          <span className="text-white/70">{skill.level}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Category headers animation
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-yellow/20 rounded-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 border border-blue/20 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-blue" />
            <span className="text-sm font-medium text-blue uppercase tracking-wider">
              My Arsenal
            </span>
            <div className="w-12 h-0.5 bg-blue" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-display-3 text-white mb-4">
            Tools & <span className="text-gradient-blue">Technologies</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life. Always learning and exploring new tools.
          </p>
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.2, duration: 0.6 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${category.accentColor}20`,
                    color: category.accentColor,
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skillIndex}
                    skill={skill}
                    index={catIndex * 5 + skillIndex}
                  />
                ))}
              </div>
              
              {/* Connection line */}
              {catIndex < skillCategories.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-px h-32 bg-white/10 -translate-y-1/2 translate-x-6" />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { label: 'Languages', value: '4+' },
            { label: 'ML Frameworks', value: '5+' },
            { label: 'Web Technologies', value: '8+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-display font-bold text-gradient-multi">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
