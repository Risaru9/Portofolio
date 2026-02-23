import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  type: 'work' | 'education' | 'internship' | 'certification';
  title: string;
  organization: string;
  duration: string;
  location?: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    type: 'education',
    title: 'Universitas Negeri Surabaya',
    organization: 'University Student',
    duration: 'Agustus 2023 - Sekarang',
    location: 'Surabaya, Indonesia',
    description: 'Saat ini saya merupakan mahasiswa aktif di Universitas Negeri Surabaya dengan fokus pengembangan kompetensi di bidang teknologi dan data. Selama masa studi, saya secara aktif mempelajari dasar hingga lanjutan pemrograman, analisis data, serta konsep data science dan machine learning. Selain perkuliahan formal, saya juga terlibat dalam berbagai proyek akademik dan pengembangan mandiri untuk memperkuat kemampuan analitis, problem solving, serta pemahaman terhadap penerapan teknologi dalam konteks dunia nyata.',
  },
  {
    type: 'education',
    title: 'Graduate of Machine Learning Bootcamp',
    organization: 'Dicoding Indonesia',
    duration: 'Juli 2025 - November 2025',
    description: 'Saya merupakan lulusan program Machine Learning Bootcamp dari Dicoding Indonesia, sebuah program intensif selama lima bulan yang dirancang untuk membangun pemahaman komprehensif mengenai machine learning. Materi yang dipelajari mencakup supervised learning, unsupervised learning, reinforcement learning, hingga pengenalan dan penerapan deep learning. Sebagai tugas akhir, saya mengerjakan proyek computer vision berupa sistem pendeteksi kualitas beras berbasis citra digital, yang melibatkan proses pengolahan data, pelatihan model, evaluasi performa, serta interpretasi hasil untuk mendukung pengambilan keputusan berbasis data.',
  },
  {
    type: 'internship',
    title: 'Magang di Kominfo Nganjuk',
    organization: 'Kominfo Nganjuk',
    duration: 'januari 2026 - sekarang',
    description: 'Saya menjalani program magang di Dinas Komunikasi dan Informatika (Kominfo) Kabupaten Nganjuk pada bidang teknologi informasi dan komunikasi. Dalam peran ini, saya terlibat dalam kegiatan pendukung pengelolaan sistem informasi, teknologi digital, serta layanan berbasis TIK yang digunakan untuk menunjang operasional pemerintahan. Pengalaman ini memberikan pemahaman praktis mengenai penerapan teknologi informasi di sektor publik, serta meningkatkan kemampuan kerja profesional, kolaborasi tim, dan adaptasi terhadap lingkungan kerja instansi pemerintah.',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Timeline draw animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
      
      // Cards animation
      gsap.fromTo(
        '.experience-card',
        { opacity: 0, rotateY: -30, x: -50 },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-yellow" />
            <span className="text-sm font-medium text-yellow uppercase tracking-wider">
              My Journey
            </span>
            <div className="w-12 h-0.5 bg-yellow" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-display-3 text-white">
            Experience & <span className="text-gradient-yellow">Certifications</span>
          </h2>
        </motion.div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-white/10">
            <div
              className="timeline-line absolute inset-0 bg-gradient-to-b from-yellow via-blue to-red origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`experience-card relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline node */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      exp.type === 'work' ? 'bg-yellow' : 'bg-blue'
                    }`}
                    whileHover={{ scale: 1.3 }}
                    animate={{
                      boxShadow: [
                        `0 0 10px ${exp.type === 'work' ? 'rgba(255,234,0,0.5)' : 'rgba(0,68,255,0.5)'}`,
                        `0 0 20px ${exp.type === 'work' ? 'rgba(255,234,0,0.8)' : 'rgba(0,68,255,0.8)'}`,
                        `0 0 10px ${exp.type === 'work' ? 'rgba(255,234,0,0.5)' : 'rgba(0,68,255,0.5)'}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {exp.type === 'work' ? (
                      <Briefcase className="w-4 h-4 text-black" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                </div>
                
                {/* Content card */}
                <div
                  className={`ml-16 lg:ml-0 lg:w-[45%] ${
                    index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                  }`}
                >
                  <div className="glass-light p-6 rounded-2xl border border-white/10 hover:border-yellow/30 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-white group-hover:text-yellow transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-white/60">{exp.organization}</p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          exp.type === 'work'
                            ? 'bg-yellow/20 text-yellow'
                            : 'bg-blue/20 text-blue'
                        }`}
                      >
                        {exp.type === 'work' ? 'Work' : 'Certification'}
                      </span>
                    </div>
                    
                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/50">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-white/70 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
