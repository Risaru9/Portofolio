import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Github, Cpu, Brain, Eye } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  icon: React.ReactNode;
  accentColor: string;
}

const projects: Project[] = [
  {
    title: 'RiceTech - Rice Quality Computer Vision',
    description: 'RiceTech adalah aplikasi web yang dibangun sebagai capstone project untuk mengklasifikasikan kualitas beras. Aplikasi ini menggunakan model Deep Learning (YOLOv8) yang telah dilatih untuk mengidentifikasi dan menghitung objek beras, seperti beras utuh dan beras patah. Berdasarkan hasil deteksi, aplikasi akan menghitung rasio, memberikan penilaian kualitas (misalnya "Kualitas: C (Kurang Baik)"), dan memberikan ringkasan yang dapat diunduh oleh pengguna.',
    tech: ['Python', 'YOLO', 'HTML', 'CSS', 'JavaScript', 'Flask'],
    image: '/images/image.png',
    github: 'https://github.com/Risaru9/Capstone_Projek_prediksi_kualitas_beras',
    demo: 'https://demo.com',
    icon: <Brain className="w-6 h-6" />,
    accentColor: '#FFEA00',
  },
  {
    title: 'E-Commerce Analytics Dashboard',
    description: 'Proyek ini bertujuan untuk melakukan analisis data pada E-Commerce Public Dataset guna memahami performa bisnis, perilaku pelanggan, preferensi pembayaran, kualitas layanan, serta distribusi geografis pelanggan. Hasil analisis disajikan dalam bentuk dashboard interaktif menggunakan Streamlit sebagai media visualisasi dan penyampaian insight bisnis. Proyek ini dikembangkan sebagai bagian dari submission analisis data dan menerapkan proses analisis end-to-end, mulai dari pengolahan data mentah, analisis eksploratif, analisis lanjutan, hingga penyajian hasil dalam dashboard.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Streamlit'],
    image: '/images/streamlit.png',
    github: 'https://github.com/Risaru9/Submission_data_analyst',
    demo: 'https://submissiondataanalyst.streamlit.app/',
    icon: <Cpu className="w-6 h-6" />,
    accentColor: '#0044FF',
  },
  {
    title: 'Dompetku - Personal Finance Manager',
    description: 'Dompetku adalah aplikasi web yang dirancang untuk membantu pengguna mengelola keuangan pribadi mereka. Aplikasi ini memungkinkan pengguna untuk mencatat pengeluaran dan pemasukan, melihat riwayat transaksi, serta menganalisis pola keuangan mereka. Dengan antarmuka yang intuitif dan mudah digunakan, Dompetku membantu pengguna membuat keputusan keuangan yang lebih baik.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    image: '/images/website_dompetku.png',
    github: 'https://github.com/Risaru9/Website-Dompetku',
    demo: 'https://website-dompetku.vercel.app/',
    icon: <Eye className="w-6 h-6" />,
    accentColor: '#FF0000',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="perspective-1200"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group"
      >
        <div
          className="relative overflow-hidden rounded-2xl border transition-all duration-500"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: isHovered ? `${project.accentColor}50` : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered
              ? `0 25px 50px -12px ${project.accentColor}30`
              : '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 opacity-60 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${project.accentColor}40, transparent)`,
                opacity: isHovered ? 0.8 : 0.4,
              }}
            />
            
            {/* Icon badge */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
              }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.icon}
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3
              className="text-xl font-display font-bold mb-3 transition-colors duration-300"
              style={{ color: isHovered ? project.accentColor : 'white' }}
            >
              {project.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full border transition-all duration-300"
                  style={{
                    borderColor: `${project.accentColor}30`,
                    backgroundColor: `${project.accentColor}10`,
                    color: project.accentColor,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: project.accentColor }}
                  whileHover={{ x: 5 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? `inset 0 0 30px ${project.accentColor}20`
                : 'inset 0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-red" />
            <span className="text-sm font-medium text-red uppercase tracking-wider">
              Portfolio
            </span>
            <div className="w-12 h-0.5 bg-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-display-3 text-white mb-4">
            Featured <span className="text-gradient-multi">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A selection of my recent work in AI, Machine Learning, and Data Science.
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/Risaru9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-lg text-white hover:border-yellow hover:text-yellow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
