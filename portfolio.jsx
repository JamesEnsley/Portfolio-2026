import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Wrench, Mail, Linkedin, Github } from 'lucide-react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [waveOffset, setWaveOffset] = useState(0);
  const [amplitude, setAmplitude] = useState(30);
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const titles = [
    "Fluid Mechanics & Electromechanical Design Specialist",
    "Tesla Intern",
    "Enedym Intern",
    "Mechanical Engineering Student"
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Fast typing animation effect
  useEffect(() => {
    const currentTitle = titles[titleIndex];

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, titleIndex]);

  // Wave animation with varying amplitude
  useEffect(() => {
    let animationFrameId;
    let offset = 0;
    
    const animate = () => {
      offset += 0.2;
      setWaveOffset(offset);
      
      if (offset % 360 === 0) {
        setAmplitude(20 + Math.random() * 30);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const projects = [
    {
      title: "Centrifugal Pump Optimization",
      category: "Fluid Mechanics",
      description: "CFD analysis and redesign of industrial pump impeller geometry to improve efficiency by 18% and reduce cavitation issues.",
      tags: ["CFD", "ANSYS Fluent", "Pump Design"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
    },
    {
      title: "Electromechanical Actuator System",
      category: "Electromechanical",
      description: "Design and prototype of precision linear actuator with integrated force feedback for robotics applications.",
      tags: ["Servo Control", "SolidWorks", "PCB Design"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
    },
    {
      title: "Heat Exchanger Network",
      category: "Fluid Mechanics",
      description: "Thermal-fluid analysis and optimization of industrial heat recovery system achieving 35% energy savings.",
      tags: ["Heat Transfer", "Flow Simulation", "Energy Analysis"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
    },
    {
      title: "Smart Valve Controller",
      category: "Electromechanical",
      description: "IoT-enabled proportional valve control system with real-time monitoring and predictive maintenance algorithms.",
      tags: ["Embedded Systems", "Motor Control", "Sensors"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
    }
  ];

  const skills = {
    "Fluid Mechanics": [
      "Computational Fluid Dynamics (CFD)",
      "Pipe Network Analysis",
      "Turbomachinery Design",
      "Heat Transfer & Thermodynamics",
      "Flow Measurement & Instrumentation"
    ],
    "Electromechanical": [
      "Motor Selection & Control",
      "Sensor Integration",
      "Actuator Design",
      "PLC Programming",
      "Power Electronics"
    ],
    "Software & Tools": [
      "ANSYS (Fluent, CFX)",
      "SolidWorks & CAD",
      "MATLAB/Simulink",
      "Python & C++",
      "LabVIEW"
    ]
  };

  return (
    <div className="min-h-screen text-white" style={{ background: '#1a202c' }}>
      <style>{`
        @keyframes waveText {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .wave-text {
          position: relative;
          color: white;
        }

        .wave-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          clip-path: url(#wave-clip);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(10px, -10px) scale(1.05);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 45% 60% 40%;
            transform: translate(-10px, 10px) scale(0.95);
          }
          75% {
            border-radius: 70% 30% 50% 50% / 30% 55% 70% 45%;
            transform: translate(5px, 5px) scale(1.02);
          }
        }

        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>

      {/* Navigation - Side bar */}
      <nav className="group/nav fixed left-6 top-1/2 transform -translate-y-1/2 bg-slate-900/95 backdrop-blur-md z-50 border border-blue-500/20 rounded-2xl overflow-visible hover:w-44 w-16 transition-all duration-300">
        <div className="p-4 border-b border-blue-500/20 flex items-center justify-center group-hover/nav:justify-start space-x-3">
          <Wrench className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <span className="text-sm font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 overflow-hidden w-0 group-hover/nav:w-auto">
            James Ensley
          </span>
        </div>
        
        <div className="flex flex-col py-2">
          {[
            { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
            { id: 'about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'About' },
            { id: 'projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', label: 'Portfolio' },
            { id: 'experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Experience' },
            { id: 'skills', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', label: 'Skills' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center p-4 transition-all ${
                activeSection === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0 group-hover/nav:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 absolute group-hover/nav:relative group-hover/nav:ml-0">
                {item.label}
              </span>
            </button>
          ))}
          
          <button
            onClick={() => scrollToSection('contact')}
            className={`flex items-center p-4 transition-all ${
              activeSection === 'contact' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-5 h-5 flex-shrink-0 group-hover/nav:mr-3" style={{ margin: '0 auto' }} />
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 absolute group-hover/nav:relative group-hover/nav:ml-0">
              Contact
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 px-4 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-12">
              <div className="absolute bg-blue-300 opacity-60 animate-blob" style={{ width: '400px', height: '280px', left: '-80px', top: '-20px' }}></div>
              <div className="absolute bg-blue-500 opacity-60 animate-blob" style={{ width: '280px', height: '380px', left: '-20px', top: '-70px', animationDelay: '2s' }}></div>
              <div className="absolute bg-blue-700 opacity-60 animate-blob" style={{ width: '340px', height: '300px', left: '-50px', top: '-30px', animationDelay: '4s' }}></div>
              
              <div className="relative rounded-3xl overflow-hidden" style={{ width: '300px', height: '300px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80" 
                  alt="Profile"
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-lg mb-2">Hello, I'm</p>
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 wave-text" data-text="James Ensley">
                  James Ensley
                </h1>
                <svg className="absolute" style={{ width: 0, height: 0 }}>
                  <defs>
                    <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
                      <path d={`M 0,${0.55 + 0.05 * Math.sin(waveOffset * 0.02)} ${Array.from({ length: 100 }, (_, i) => {
                        const x = i / 100;
                        const y = 0.55 + 0.05 * Math.sin((i + waveOffset) * 0.08);
                        return `L ${x},${y}`;
                      }).join(' ')} L 1,1.2 L 0,1.2 Z`} />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            
            <div className="h-20 mb-8">
              <p className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                {displayText}
                <span className="animate-pulse text-blue-400">|</span>
              </p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.notion.so/yourpage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition transform hover:scale-110"
                aria-label="Notion"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.887-.748-.84l-15.177.887c-.56.047-.747.327-.747.887zm14.336.186c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className={`max-w-6xl mx-auto ${visibleSections.has('about') ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                I'm a mechanical engineer with a deep passion for fluid dynamics and electromechanical systems. 
                My work focuses on bridging the gap between theoretical analysis and practical implementation, 
                creating solutions that are both innovative and efficient.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                With extensive experience in CFD analysis, turbomachinery design, and precision control systems, 
                I've helped companies optimize their processes and reduce energy consumption by significant margins.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                When I'm not designing pumps or programming controllers, you'll find me exploring the latest 
                developments in renewable energy systems and sustainable engineering practices.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-2">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80" 
                  alt="About Me"
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className={`max-w-7xl mx-auto ${visibleSections.has('projects') ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <div
                key={idx}
                style={{ transition: 'all 0.3s ease-in-out' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                className="bg-slate-900/50 backdrop-blur border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/60"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ transition: 'transform 0.5s ease-in-out' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full">
                    <span className="text-xs text-gray-300">{project.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className={`max-w-6xl mx-auto ${visibleSections.has('experience') ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">Senior Mechanical Engineer</h3>
                    <p className="text-gray-400">Advanced Fluid Systems Inc.</p>
                  </div>
                  <span className="text-sm text-gray-500">2020 - Present</span>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Led CFD analysis team for next-generation centrifugal pump designs
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Reduced energy consumption by 35% through thermal-fluid optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Mentored junior engineers in ANSYS Fluent and SolidWorks best practices
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">Electromechanical Design Engineer</h3>
                    <p className="text-gray-400">Precision Automation Corp.</p>
                  </div>
                  <span className="text-sm text-gray-500">2017 - 2020</span>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Designed and prototyped precision linear actuators for robotics applications
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Developed IoT-enabled valve control systems with predictive maintenance
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Integrated sensor systems and motor control circuits for automated production lines
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">Junior Mechanical Engineer</h3>
                    <p className="text-gray-400">Industrial Flow Solutions</p>
                  </div>
                  <span className="text-sm text-gray-500">2015 - 2017</span>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Conducted pipe network analysis and optimization for industrial clients
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Assisted in heat exchanger design and thermal analysis projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Performed flow measurement and instrumentation calibration
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className={`max-w-7xl mx-auto ${visibleSections.has('skills') ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-12 text-center">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 backdrop-blur border border-blue-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{category}</h3>
                <ul className="space-y-2">
                  {skillList.map((skill, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <ChevronDown className="w-4 h-4 text-cyan-400 rotate-[-90deg]" />
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className={`max-w-4xl mx-auto text-center ${visibleSections.has('contact') ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-300 mb-8">
            Interested in collaboration or have a project in mind?
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:engineer@example.com" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg transition">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Mechanical Engineer Portfolio. Specialized in Fluid Mechanics & Electromechanical Design.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
