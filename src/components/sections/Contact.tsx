import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MapPin, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'rizalmahardi109@gmail.com',
      href: 'mailto:rizalmahardi109@gmail.com',
      color: '#FFEA00',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/rizalmahardika',
      href: 'https://www.linkedin.com/in/rizalmahardika/',
      color: '#0044FF',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/Risaru9',
      href: 'https://github.com/Risaru9',
      color: '#FF0000',
    },
  ];
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-yellow via-blue to-red" />
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Get in Touch
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-red via-blue to-yellow" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-display-3 text-white mb-4">
            Let's <span className="text-gradient-yellow">Connect</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Tertarik untuk berkolaborasi atau berdiskusi seputar AI dan Data? 
            Jangan ragu untuk menghubungi saya.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              Contact Information
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your visions. Feel free to reach out!
            </p>
            
            {/* Contact Links */}
            <div className="space-y-4 mb-8">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: `${link.color}20`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-sm text-white/50">{link.label}</div>
                    <div className="text-white group-hover:text-white transition-colors">
                      {link.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-white/50"
            >
              <MapPin className="w-5 h-5" />
              <span>Nganjuk, Indonesia</span>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="glass-light p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Send Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-white/60">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'name' || formData.name
                          ? '-top-2 text-xs text-yellow bg-black px-2'
                          : 'top-4 text-white/50'
                      }`}
                    >
                      Your Name
                    </motion.label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white focus:border-yellow focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? '-top-2 text-xs text-yellow bg-black px-2'
                          : 'top-4 text-white/50'
                      }`}
                    >
                      Your Email
                    </motion.label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white focus:border-yellow focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  {/* Message Field */}
                  <div className="relative">
                    <motion.label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'message' || formData.message
                          ? '-top-2 text-xs text-yellow bg-black px-2'
                          : 'top-4 text-white/50'
                      }`}
                    >
                      Your Message
                    </motion.label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-lg text-white focus:border-yellow focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
