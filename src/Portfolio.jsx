import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Wrench, Mail, Linkedin } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [waveOffset, setWaveOffset] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProjectImageIndex, setCurrentProjectImageIndex] = useState(0);

  const aboutImages = [
    "pic4.jpg",
    "pic3.png",
    "pic5.jpg",
    "pic6.jpg",
    "pic7.jpg",
    "pic8.jpg"
  ];

  const titles = [
    "Mechanical Engineering Co-op Student",
    "Tesla New Programs Harness Intern",
    "Enedym Junior Mechanical Engineer - Part Time",
    "MAC Formula Electric - Inverter Capstone & Harness Lead"
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
          // Update active section based on what's visible
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [selectedProject]);

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
        }, 3000);
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
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Automatic slideshow for About section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [aboutImages.length]);

  // Reset project image index when project changes
  useEffect(() => {
    setCurrentProjectImageIndex(0);
  }, [selectedProject]);

  // Automatic slideshow for project images
  useEffect(() => {
    if (!selectedProject || !selectedProject.projectImages) return;
    
    const interval = setInterval(() => {
      setCurrentProjectImageIndex((prev) => (prev + 1) % selectedProject.projectImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [selectedProject]);

  const projects = [
    {
      title: "Inverter Capstone",
      category: "Thermal Management",
      description: "Liquid-cooled cold plate thermal management system for IGBT power electronics",
      tags: ["Thermofluids First Principals", "Thermal Testing", "ANSYS Fluent"],
      image: "coldplate-render.png",
      projectImages: [
        "ansys-sim.png",
        "packaging.png",
        "o-ring-groove-prototypes.png",
        "TPI-index.png",
        "test-setup.png"
      ],
      organizationLogo: "MACFE-Official-Logo.png",
      fullDescription: "Designed a custom liquid-cooled cold plate system to manage thermal loads in IGBT power electronics for MAC Formula Electric's inverter, maintaining junction temperatures below critical thresholds while optimizing cooling efficiency.",
      challenges: [
        "Keeping IGBT junction temperature below critical threshold at specified coolant flow rate and inlet temperature",
        "Minimizing thermal resistance through optimal TIM selection and cold plate fin geometry",
        "Designing leak-proof O-ring seals that meet compression ratio, gland fill, and diameter tolerance requirements"
      ],
      solutions: [
        "Performed IGBT power loss simulations in IPOSIM to determine heat dissipation requirements",
        "Ran ANSYS thermal simulations with mesh independence and refinement studies to optimize cold plate geometry with plans to validate results through experimental thermal testing",
        "Selected thermal interface materials with significantly lower thermal resistance than air gaps to improve heat transfer efficiency",
        "Designed grooves to fit off-the-shelf O-rings meeting all compression ratio, gland fill ratio, and diameter tolerance criteria for reliable sealing",
        "Developed comprehensive test plan using resistor array to experimentally validate thermal performance and pressure drop"
      ],
      results: [
        "Testing in progress - experimental validation planned for Spring 2025",
        "Cold plate design completed and ready for prototyping",
        "Test infrastructure designed including power supply configuration (30V 150A) and instrumentation plan",
        "Thermal Performance Index (TPI) framework established to evaluate heat transfer effectiveness vs pressure drop"
      ]
    },
    {
      title: "Powertrain Lap Simulation",
      category: "Vehicle Dynamics",
      description: "MATLAB-based lap simulation tool to optimize powertrain performance for Formula Electric racing",
      tags: ["Vehicle Dynamics", "MATLAB", "Powertrain Modelling"],
      image: "motor-efficiency-map.png",
      projectImages: [
        "motor-speed-curve.png",
        "braking-FBD.png",
        "dyno.jpg"
      ],
      organizationLogo: "MACFE-Official-Logo.png",
      fullDescription: "Developing a comprehensive lap simulation model in MATLAB to predict vehicle performance and optimize powertrain configuration for MAC Formula Electric's competition vehicle.",
      challenges: [
        "Accurately modeling motor efficiency across varying speed and torque conditions",
        "Balancing acceleration performance with energy consumption for endurance events",
        "Integrating tire grip limits, aerodynamic forces, and track geometry into lap time predictions"
      ],
      solutions: [
        "Extracting motor efficiency data from manufacturer datasheets to map power consumption at each operating point",
        "Building speed-torque curves incorporating motor limits, gear ratio, and vehicle dynamics",
        "Implementing point-mass vehicle model with braking and traction force constraints for lap simulation"
      ],
      results: [
        "Project in progress - motor characterization phase underway",
        "Motor efficiency map extracted from datasheet for modeling foundation",
        "Initial vehicle dynamics framework established for simulation development"
      ]
    },
    {
      title: "Battery Pack Enclosure",
      category: "Mechanical Design",
      description: "Custom battery pack enclosure for 144s4p, 600V, 6.2kWh pack",
      tags: ["DFMA Principals", "Mechanical Design", "SolidWorks", "Formula FSAE"],
      image: "battery-pack-render.png",
      projectImages: [
        "pic9.jpg",
        "pic10.jpg",
        "pic11.jpg",
        "pic12.jpg"
      ],
      fullDescription: "Designed an enclosure that:",
      overviewList: [
        {
          title: "1. Protects the cells during vehicle operation from",
          items: ["Punctures", "Thermal Runaway", "Moisture/debris", "Arcs"]
        },
        {
          title: "2. Makes the cells, BMS, and PCBs easily serviceable",
          items: []
        },
        {
          title: "3. Minimizes mass and cost",
          items: []
        }
      ],
      challenges: [
        "Tight width constraint in existing vehicle chassis",
        "Ensuring HV is isolated while still making the cells easily accessible and connected",
        "Orion BMS is very large and impractical to package"
      ],
      solutions: [
        "Optimized segment and cell configuration based on width constraint",
        "Developed a 'cell cap' to make use of negative space and make each segment easily removable",
        "Separated the BMS control and battery interface board for cleaner packaging and harness routing"
      ],
      results: [
        "Successful integration of the pack into the chassis",
        "Passed mechanical battery inspection for the first time",
        "Several compliments on our clean packaging and ease of accessibility"
      ]
    },
    {
      title: "Wireharness Routing",
      category: "Harness Design",
      description: "Complete vehicle harness routing in SolidWorks with automated formboard generation",
      tags: ["Harness Design", "Formboard Drawings", "SolidWorks"],
      image: "all-harnesses.jpg",
      projectImages: [
        "harness-X.png",
        "harness-Z.png",
        "pic13.jpg",
        "pic14.jpg",
        "pic15.jpg",
        "pic16.jpg"
      ],
      fullDescription: "Designed the complete low-voltage harness system for MAC Formula Electric's vehicle in SolidWorks. By automating connection generation and exporting 1:1 formboard drawings, manufacturing time was reduced by 90% - a first in the team's history.",
      challenges: [
        "Converting Altium schematics to SolidWorks efficiently to get accurate harness lengths",
        "Ensuring the harness is serviceable, not requiring the entire harness to be taken out in order to diagnose issues",
        "Tight timeline with chassis final design released later than expected"
      ],
      solutions: [
        "Utilized SolidWorks Routing tool, and imported a from-to list automatically generated by an excel I created, sorted by harness",
        "Separated the vehicle harness into 4 quadrants of the vehicle, adding inlines in accessible areas",
        "Designed in parallel with chassis still being finalized by making the harness as independent from the chassis design as possible, then refining later on"
      ],
      results: [
        "All harnesses designed and built a month ahead of schedule",
        "Documented process for future-years and for other schools we meet at competition"
      ]
    },
    {
      title: "Miscellaneous Projects",
      category: "Academic Work",
      description: "Smaller side projects I developed throughout the course of academic career",
      tags: ["Electromechanical Design", "Designathons"],
      image: "robot-render.png",
      externalLink: "https://james-ensley.notion.site/James-Ensley-ed013f0a72dc4a5da8b32d1e4ab8071d",
      fullDescription: "Portfolio of projects completed during undergraduate mechanical engineering coursework, demonstrating proficiency in design, analysis, and practical engineering skills.",
      challenges: [
        "Diverse project requirements across multiple disciplines",
        "Tight academic deadlines",
        "Balancing theoretical knowledge with practical application"
      ],
      solutions: [
        "Applied engineering fundamentals to real-world problems",
        "Utilized CAD, FEA, and other engineering tools",
        "Collaborated with peers on team projects"
      ],
      results: [
        "Strong academic performance across technical courses",
        "Developed well-rounded engineering skill set",
        "Built foundation for co-op and capstone work"
      ]
    }
  ];

  const skills = {
    "Software & CAD": [
      "SolidWorks & Flow Simulation",
      "CATIA V6",
      "ANSYS Fluent",
      "MATLAB & Simulink",
      "SolidWorks Routing"
    ],
    "Specialized Skills": [
      "Harness Routing & Design",
      "Thermal Management",
      "Sheet Metal Design",
      "Cooling Design",
      "Electromechanical Packaging",
      "Prototyping & DFMA"
    ],
    "Engineering Areas": [
      "Heat Transfer & Thermodynamics",
      "Fluid Mechanics",
      "CAD & Design",
      "Circuits & Vibrations",
      "EV Powertrain Systems"
    ]
  };

  return (
    <div className="min-h-screen text-white" style={{ background: '#1e2836' }}>
      {selectedProject ? (
        // Project Detail Subpage
        <div className="min-h-screen">
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedProject(null);
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="fixed top-6 left-6 z-50 flex items-center space-x-2 bg-slate-900/90 backdrop-blur hover:bg-cyan-600 px-4 py-3 rounded-lg transition transform hover:scale-105 border border-cyan-500/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Portfolio</span>
          </button>

          {/* Project Detail Content */}
          <div className="pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Hero Image with Overlay - MOVED TO TOP */}
              <div className="mb-8 animate-fade-in-up relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent rounded-2xl z-10"></div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl shadow-cyan-500/20"
                  loading="lazy"
                />
                {/* Floating category badge */}
                <div className="absolute top-6 left-6 z-20 bg-cyan-500/20 backdrop-blur-xl px-6 py-3 rounded-full border-2 border-cyan-400/50">
                  <span className="text-cyan-300 font-bold text-lg">{selectedProject.category}</span>
                </div>
              </div>

              {/* Title with decorative elements */}
              <div className="mb-16 animate-fade-in-down text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full"></div>
              </div>

              {/* Project Overview with Image Slider */}
              <div className="mb-16 animate-fade-in-up delay-150">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Project Overview - LEFT */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold text-cyan-400">Project Overview</h2>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl p-8 shadow-xl hover:shadow-cyan-500/10 transition-all">
                      <p className="text-xl text-gray-300 leading-relaxed mb-4">{selectedProject.fullDescription}</p>
                      {selectedProject.overviewList && (
                        <div className="bg-slate-900/30 rounded-lg p-6 border border-cyan-500/10 mt-6">
                          <div className="space-y-6">
                            {selectedProject.overviewList.map((section, i) => (
                              <div key={i} className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-3">
                                  <span className="text-cyan-400 font-bold text-lg">{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-lg text-gray-200 font-semibold mb-2">{section.title.replace(/^\d+\.\s*/, '')}</p>
                                  {section.items.length > 0 && (
                                    <ul className="ml-4 space-y-2">
                                      {section.items.map((item, j) => (
                                        <li key={j} className="text-gray-300 flex items-start">
                                          <span className="text-cyan-400 mr-3 text-lg">•</span>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {selectedProject.overviewFooter && (
                            <p className="text-lg text-gray-300 mt-6 italic">{selectedProject.overviewFooter}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Slider - RIGHT */}
                  <div className="flex flex-col justify-center">
                    {selectedProject.projectImages && selectedProject.projectImages.length > 0 ? (
                      <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-400/10 border border-cyan-500/30 rounded-2xl p-2 shadow-2xl shadow-cyan-500/20">
                          {/* Slideshow container */}
                          <div className="relative w-full h-96 rounded-xl overflow-hidden bg-black">
                            {selectedProject.projectImages.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${selectedProject.title} ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-contain rounded-xl transition-opacity duration-1000"
                                style={{
                                  opacity: currentProjectImageIndex === index ? 1 : 0,
                                  zIndex: currentProjectImageIndex === index ? 1 : 0
                                }}
                                loading="lazy"
                              />
                            ))}
                            {/* Overlay gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          </div>
                          
                          {/* Dots navigation */}
                          <div className="flex justify-center gap-2 mt-4">
                            {selectedProject.projectImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentProjectImageIndex(index)}
                                className={`transition-all duration-300 rounded-full ${
                                  currentProjectImageIndex === index
                                    ? 'w-8 h-2 bg-cyan-400'
                                    : 'w-2 h-2 bg-gray-500 hover:bg-cyan-300'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-2xl text-gray-400">
                        <p>No images available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div className="mb-16 animate-fade-in-up delay-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-red-400">Challenges</h2>
                </div>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-red-500/20 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-4">
                    {selectedProject.challenges.map((challenge, i) => (
                      <div key={i} className="flex items-start bg-slate-900/40 rounded-xl p-6 border border-red-500/10 hover:border-red-500/30 transition-all group">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-red-500/30 transition-all">
                          <span className="text-red-400 font-bold">{i + 1}</span>
                        </div>
                        <span className="text-gray-300 text-lg leading-relaxed">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="mb-16 animate-fade-in-up delay-400">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-green-400">Solutions</h2>
                </div>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-green-500/20 rounded-2xl p-8 shadow-xl">
                  <div className="space-y-4">
                    {selectedProject.solutions.map((solution, i) => (
                      <div key={i} className="flex items-start bg-slate-900/40 rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all group">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-lg leading-relaxed">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="mb-16 animate-fade-in-up delay-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-cyan-400">Results & Impact</h2>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-2 border-cyan-500/30 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/5 rounded-full -ml-24 -mb-24"></div>
                  <div className="relative z-10 space-y-4">
                    {selectedProject.results.map((result, i) => (
                      <div key={i} className="flex items-start bg-slate-900/40 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all hover:scale-105 group backdrop-blur">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-200 text-lg font-medium leading-relaxed">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="animate-fade-in-up delay-500">
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-lg border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Main Portfolio View
        <div>
      <style>{`
        @keyframes waveText {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes floatDown {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-down {
          animation: floatDown 1.2s ease-out forwards;
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

        .wave-text-section {
          position: relative;
          color: white;
        }

        .wave-text-section::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          clip-path: url(#wave-clip-section);
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideshow {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
          }
        }

        @keyframes blob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) scale(1);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(5px, -5px) scale(1.02);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 45% 60% 40%;
            transform: translate(-5px, 5px) scale(0.98);
          }
          75% {
            border-radius: 70% 30% 50% 50% / 30% 55% 70% 45%;
            transform: translate(3px, 3px) scale(1.01);
          }
        }

        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>

      {/* Navigation - Side bar */}
      <nav className="group/nav fixed left-6 top-1/2 transform -translate-y-1/2 bg-slate-900/95 backdrop-blur-md z-50 border border-blue-500/20 rounded-2xl overflow-visible hover:w-44 w-16 transition-all duration-500">
        <div className="p-4 border-b border-blue-500/20 flex items-center justify-center space-x-3">
          <Wrench className="w-6 h-6 text-cyan-400 flex-shrink-0" />
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
              className={`flex items-center justify-center group-hover/nav:justify-start p-4 transition-all ${
                activeSection === item.id ? 'bg-cyan-400 text-slate-900' : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0 group-hover/nav:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 overflow-hidden w-0 group-hover/nav:w-auto">
                {item.label}
              </span>
            </button>
          ))}
          
          <button
            onClick={() => scrollToSection('contact')}
            className={`flex items-center justify-center group-hover/nav:justify-start p-4 transition-all ${
              activeSection === 'contact' ? 'bg-cyan-400 text-slate-900' : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-5 h-5 flex-shrink-0 group-hover/nav:mr-3" />
            <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 overflow-hidden w-0 group-hover/nav:w-auto">
              Contact
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 px-4 overflow-hidden min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <div className="flex flex-col items-center text-center animate-float-down">
            <div className="relative mb-12">
              <div className="absolute bg-cyan-300 opacity-60 animate-blob" style={{ width: '400px', height: '450px', left: '-80px', top: '-60px', borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
              <div className="absolute bg-cyan-400 opacity-60 animate-blob" style={{ width: '350px', height: '420px', left: '-50px', top: '-80px', animationDelay: '3s', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
              <div className="absolute bg-cyan-500 opacity-60 animate-blob" style={{ width: '380px', height: '440px', left: '-65px', top: '-70px', animationDelay: '6s', borderRadius: '49% 51% 48% 52% / 62% 44% 56% 38%' }}></div>
              
              <div className="relative rounded-3xl overflow-hidden" style={{ width: '300px', height: '300px' }}>
                <img 
                  src="pic1.jpg" 
                  alt="Profile"
                  className="w-full h-full object-cover relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="relative inline-block animate-float">
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
              <p className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-300 font-semibold">
                {displayText}
                <span className="animate-pulse text-cyan-400">|</span>
              </p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/james-ensley/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-cyan-400 rounded-lg transition transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="mailto:ensleyj@mcmaster.ca" 
                className="flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-cyan-400 rounded-lg transition transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative overflow-hidden">
        {/* Background accents - more transparent and subtle */}
        <div className="absolute top-20 right-20 w-[280px] h-[320px] bg-cyan-300 opacity-25 animate-blob" style={{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
        <div className="absolute bottom-32 left-1/4 w-[250px] h-[300px] bg-cyan-400 opacity-25 animate-blob" style={{ animationDelay: '3s', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
        <div className="absolute top-1/2 right-1/3 w-[230px] h-[270px] bg-cyan-500 opacity-20 animate-blob" style={{ animationDelay: '6s', borderRadius: '49% 51% 48% 52% / 62% 44% 56% 38%' }}></div>
        
        <div className={`max-w-6xl mx-auto relative z-10 ${visibleSections.has('about') ? '' : 'opacity-0'}`}>
          <div className="mb-12 text-center">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('about') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="About Me">
              About Me
            </h2>
            <svg className="absolute" style={{ width: 0, height: 0 }}>
              <defs>
                <clipPath id="wave-clip-section" clipPathUnits="objectBoundingBox">
                  <path d={`M 0,${0.55 + 0.05 * Math.sin(waveOffset * 0.02)} ${Array.from({ length: 100 }, (_, i) => {
                    const x = i / 100;
                    const y = 0.55 + 0.05 * Math.sin((i + waveOffset) * 0.08);
                    return `L ${x},${y}`;
                  }).join(' ')} L 1,1.2 L 0,1.2 Z`} />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`${visibleSections.has('about') ? 'animate-fade-in-left delay-100' : 'opacity-0'}`}>
                <div className="relative bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="absolute -left-3 top-8 w-1 h-3/4 bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-700 rounded-full"></div>
                  <div className="space-y-6">
                    <p className="text-gray-300 leading-relaxed text-lg">
                      I'm a Mechanical Engineering Co-op student at McMaster University with a passion for thermal systems, 
                      energy storage and electromechanical design! My work focuses on bridging theoretical engineering principles 
                      with practical applications in electric vehicles and high-performance systems.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      With hands-on experience at Tesla and Christie Digital Systems, I've specialized in harness routing, thermal 
                      optimization, and packaging design. I've led mechanical design initiatives for MAC Formula Electric's FSAE team, 
                      pushing the boundaries of what's possible in student-led automotive engineering.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Worked at Enedym part time during the fall term whilst working on my inverter capstone project for MAC Formula Electric, where I designed custom cold plates and integrated complex thermal management systems.
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Outside of engineering, I've recently taken up rock climbing this summer and am looking forward to getting into hiking 
                      and camping to explore the outdoors!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`flex justify-center ${visibleSections.has('about') ? 'animate-fade-in-right delay-200' : 'opacity-0'}`}>
                <div className="relative group w-full">
                  {/* Animated border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-cyan-600/20 to-cyan-400/10 border border-cyan-500/30 rounded-2xl p-2 shadow-2xl shadow-cyan-500/20">
                    {/* Slideshow container */}
                    <div className="relative w-full h-96 rounded-xl overflow-hidden">
                      {aboutImages.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`About Me ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000"
                          style={{
                            opacity: currentImageIndex === index ? 1 : 0,
                            zIndex: currentImageIndex === index ? 1 : 0
                          }}
                          loading="lazy"
                        />
                      ))}
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                    
                    {/* Dots navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                      {aboutImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`transition-all duration-300 rounded-full ${
                            currentImageIndex === index
                              ? 'w-8 h-2 bg-cyan-400'
                              : 'w-2 h-2 bg-gray-500 hover:bg-cyan-300'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section below both */}
            <div className={`grid grid-cols-3 gap-4 max-w-3xl mx-auto ${visibleSections.has('about') ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-cyan-400">3+</div>
                <div className="text-sm text-gray-400 mt-1">Co-op Terms</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-cyan-400">Jan. 2027</div>
                <div className="text-sm text-gray-400 mt-1">Expected Graduation</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-cyan-400">3+</div>
                <div className="text-sm text-gray-400 mt-1">Years on MAC Formula Electric</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: '#1e2836' }}>
        {/* Background accents - more transparent and subtle */}
        <div className="absolute top-1/4 left-1/3 w-[280px] h-[320px] bg-cyan-400 opacity-15 animate-blob" style={{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-[260px] h-[300px] bg-cyan-500 opacity-15 animate-blob" style={{ animationDelay: '3s', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
        
        <div className={`max-w-7xl mx-auto relative z-10 ${visibleSections.has('projects') ? '' : 'opacity-0'}`}>
          <div className="mb-4 text-center">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('projects') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="Featured Projects">
              Featured Projects
            </h2>
          </div>
          <p className={`text-gray-400 text-center mb-12 ${visibleSections.has('projects') ? 'animate-fade-in-down delay-100' : 'opacity-0'}`}>
            Explore my work in fluid mechanics and electromechanical systems
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto place-items-center">
            {projects.map((project, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (project.externalLink) {
                    window.open(project.externalLink, '_blank');
                  } else {
                    setSelectedProject(project);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
                  }
                }}
                className={`cursor-pointer w-full ${visibleSections.has('projects') ? 'animate-fade-in-up' : 'opacity-0'} ${idx === projects.length - 1 && projects.length % 2 !== 0 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''}`}
                style={{
                  transition: 'all 0.3s ease-in-out',
                  animationDelay: `${0.2 + idx * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/60 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={{ transition: 'transform 0.5s ease-in-out' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-cyan-500/20 backdrop-blur px-3 py-1.5 rounded-full border border-cyan-400/30">
                      <span className="text-xs text-cyan-300 font-medium">{project.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    
                    {/* Organization label with logo */}
                    {(project.title.includes("Battery") || project.title.includes("Wireharness") || project.title.includes("Inverter")) && (
                      <div className="flex items-center gap-2 mb-3">
                        <img 
                          src="MACFE-Official-Logo.png" 
                          alt="MAC Formula Electric"
                          className="w-8 h-8 object-contain rounded"
                          loading="lazy"
                        />
                        <span className="text-sm text-cyan-300 font-medium">MAC Formula Electric</span>
                      </div>
                    )}
                    
                    {project.title.includes("Inertial") && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 flex items-center justify-center text-2xl">
                          💻
                        </div>
                        <span className="text-sm text-cyan-300 font-medium">Personal Project</span>
                      </div>
                    )}
                    
                    {project.title.includes("Thrust Vector") && (
                      <div className="flex items-center gap-2 mb-3">
                        <img 
                          src="rocketry-logo.png" 
                          alt="McMaster Rocketry Team"
                          className="w-8 h-8 object-contain rounded"
                          loading="lazy"
                        />
                        <span className="text-sm text-cyan-300 font-medium">McMaster Rocketry Team</span>
                      </div>
                    )}
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-cyan-400 font-medium">
                      <span>View Details</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative overflow-hidden">
        {/* Background accents - more transparent and subtle */}
        <div className="absolute top-1/4 right-1/4 w-[270px] h-[310px] bg-cyan-400 opacity-20 animate-blob" style={{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
        <div className="absolute bottom-1/3 left-20 w-[250px] h-[290px] bg-cyan-500 opacity-20 animate-blob" style={{ animationDelay: '3s', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
        
        <div className={`max-w-6xl mx-auto relative z-10 ${visibleSections.has('experience') ? '' : 'opacity-0'}`}>
          <div className="mb-4 text-center">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('experience') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="Professional Experience">
              Professional Experience
            </h2>
          </div>
          <p className={`text-gray-400 text-center mb-12 ${visibleSections.has('experience') ? 'animate-fade-in-down delay-100' : 'opacity-0'}`}>
            My journey in mechanical engineering
          </p>
          <div className="space-y-8">
            <div className={`relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors ${visibleSections.has('experience') ? 'animate-fade-in-left delay-200' : 'opacity-0'}`}>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img src="enedym-logo.png" alt="Enedym" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">Junior Mechanical Engineer - Part Time</h3>
                        <p className="text-gray-400">Enedym</p>
                      </div>
                      <span className="text-sm text-gray-500">Sep 2025 - Dec 2025</span>
                    </div>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Owning the top-down packaging of an EV powertrain retrofit, resolving thermal, mechanical and electrical constraints
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Making seamless transitions for electric vehicle conversions through integrated design approach
                  </li>
                </ul>
              </div>
            </div>

            <div className={`relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors ${visibleSections.has('experience') ? 'animate-fade-in-left delay-300' : 'opacity-0'}`}>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img src="tesla-logo.png" alt="Tesla" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">New Programs Harness Intern</h3>
                        <p className="text-gray-400">Tesla</p>
                      </div>
                      <span className="text-sm text-gray-500">Feb 2025 - Aug 2025</span>
                    </div>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Designed and optimized LV harness routing for multiple prototype vehicle designs in CATIA V6
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Utilized slack control and option codes to design modular harnesses adaptable to various prototype configurations
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Packaged <strong className="text-white">80%</strong> of LV components in an upcoming prototype, completing build a week ahead of schedule</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Produced clear, detailed 1:1 harness drawings and assembly instructions for fast-paced builds
                  </li>
                </ul>
              </div>
            </div>

            <div className={`relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors ${visibleSections.has('experience') ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300/50"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img src="christie-logo.png" alt="Christie Digital" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">Thermal Intern</h3>
                        <p className="text-gray-400">Christie Digital Systems</p>
                      </div>
                      <span className="text-sm text-gray-500">May 2024 - Jan 2025</span>
                    </div>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Led testing on thermal expansion in the optical path, implementing a solution that reduces pixel defocus by <strong className="text-white">50%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Developed a thermistor characterization equation, improving accuracy by <strong className="text-white">40%</strong> with <strong className="text-white">±0.5°C</strong> of error</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Optimized manifold in SolidWorks Flow Simulation, balancing mesh size, computation time and convergence
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Designed a heat load jig to qualify a chiller's heat load capacity and airflow rating, along with a jig to replicate the head pressure of an elevated projector
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Assisted in developing software that adjusts projector brightness based on ambient and humidity conditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    <span>Conducted environmental tests to characterize projector's performance under different ambient and humidity conditions, analyzing data from over <strong className="text-white">180 thermocouples</strong> using Benchlink</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Characterized the thermal resistance of radiators at varying airflow and heat load conditions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurriculars Section */}
      <section id="extracurriculars" className="py-20 px-4 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-1/4 left-1/4 w-[270px] h-[310px] bg-cyan-400 opacity-20 animate-blob" style={{ borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' }}></div>
        <div className="absolute bottom-1/3 right-20 w-[250px] h-[290px] bg-cyan-500 opacity-20 animate-blob" style={{ animationDelay: '3s', borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}></div>
        
        <div className={`max-w-6xl mx-auto relative z-10 ${visibleSections.has('extracurriculars') ? '' : 'opacity-0'}`}>
          <div className="mb-4 text-center">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('extracurriculars') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="Extracurriculars">
              Extracurriculars
            </h2>
          </div>
          <p className={`text-gray-400 text-center mb-12 ${visibleSections.has('extracurriculars') ? 'animate-fade-in-down delay-100' : 'opacity-0'}`}>
            Leadership and technical contributions beyond the classroom
          </p>
          <div className="space-y-8">
            {/* MAC Formula Electric - Combined */}
            <div className={`relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors ${visibleSections.has('extracurriculars') ? 'animate-fade-in-left delay-200' : 'opacity-0'}`}>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img src="MACFE-Official-Logo.png" alt="MAC Formula Electric" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">MAC Formula Electric</h3>
                        <p className="text-gray-400">Multiple Roles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capstone - Inverter */}
                <div className="mt-4 ml-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-200">Capstone - Inverter</h4>
                    <span className="text-sm text-gray-500">Aug 2025 - Present</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Inverter coldplate design, thermal testing and packaging
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Developing a powertrain model in MATLAB
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Ansys Fluent</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Simulink</span>
                  </div>
                </div>

                {/* Harness Lead */}
                <div className="mt-6 pt-6 border-t border-cyan-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-200">Harness Lead - Mechanical</h4>
                    <span className="text-sm text-gray-500">Aug 2024 - Jul 2025</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Routed the vehicle's harnesses in SolidWorks for the first time in the team's history
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Developed an Excel tool that organizes and formats connector tables exported from Altium which is imported into SolidWorks to automatically route every connection within the harness
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Produced 1:1 scale, industry standard formboard drawings for every harness in the vehicle to optimize manufacturing process
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Justified connector, clip, grommet and tape selection using decision matrices to ensure it aligns with our team's goals
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Documented the entire process to ensure knowledge transfer and continuity for future years
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Wiring Harness</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Formboard Drawings</span>
                  </div>
                </div>

                {/* Battery Lead */}
                <div className="mt-6 pt-6 border-t border-cyan-500/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-200">Battery Lead - Mechanical</h4>
                    <span className="text-sm text-gray-500">Dec 2023 - Aug 2024</span>
                  </div>
                  <ul className="text-gray-300 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Designed a sheet metal battery pack enclosure based on DFMA, HV isolation and wire length considerations in SolidWorks, reducing it's overall weight by 10%
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Designed and prototyped a creative solution for securing and assembling the battery segments into the pack, printed using ULTEM 9085
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Developed an equation that calculates the overall enclosure dimensions based on the cell configuration, the material chosen and tolerances
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">▸</span>
                      Implemented SolidWorks equations for modular weld slot locations
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Computer-Aided Design (CAD)</span>
                    <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">Battery Electric Vehicle (BEV)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* McMaster Rocketry Team */}
            <div className={`relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors ${visibleSections.has('extracurriculars') ? 'animate-fade-in-left delay-300' : 'opacity-0'}`}>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
              <div className="bg-slate-900/50 backdrop-blur border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                    <img src="rocketry-logo.png" alt="McMaster Rocketry Team" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400">Flight Controls Member</h3>
                        <p className="text-gray-400">McMaster Rocketry Team</p>
                      </div>
                      <span className="text-sm text-gray-500">Dec 2021 - Mar 2023</span>
                    </div>
                  </div>
                </div>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Prototyped the data acquisition, live telemetry, and GPS tracking system for Launch Canada 2022
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Researched and taught how to perform FEA, the math behind it, and how to test validity in a video presentation to show to future years
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Researched thrust vector controlled (TVC) rocket using a PID controller, and STM32 protocols for efficient data transmission
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Organized meetings, assigned tasks, created a bill of materials, and set testing dates for the TVC project
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    Performed FEA simulations in SolidWorks on the TVC static mount and adjusted the design accordingly by using a fundamental understanding of mechanics
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">▸</span>
                    3D printed TVC components to approximate wiring lengths, degrees of freedom, and approximate thrust placed on the mount
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">STM32</span>
                  <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">C++</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className={`max-w-7xl mx-auto ${visibleSections.has('skills') ? '' : 'opacity-0'}`}>
          <div className="mb-12 text-center">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('skills') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="Technical Expertise">
              Technical Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-cyan-900/20 backdrop-blur border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">{category}</h3>
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
      <section id="contact" className="py-20 px-4" style={{ backgroundColor: '#1e2836' }}>
        <div className={`max-w-4xl mx-auto text-center ${visibleSections.has('contact') ? '' : 'opacity-0'}`}>
          <div className="mb-6">
            <h2 className={`text-5xl md:text-6xl font-bold wave-text-section inline-block ${visibleSections.has('contact') ? 'animate-fade-in-down' : 'opacity-0'}`} data-text="Let's Connect">
              Let's Connect
            </h2>
          </div>
          <p className={`text-xl text-gray-300 mb-8 ${visibleSections.has('contact') ? 'animate-fade-in-down delay-100' : 'opacity-0'}`}>
            Interested in collaboration or have a project in mind?
          </p>
          <div className={`flex justify-center space-x-6 ${visibleSections.has('contact') ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
            <a href="mailto:ensleyj@mcmaster.ca" className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg transition transform hover:scale-105">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/james-ensley/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-700 hover:bg-cyan-600 px-6 py-3 rounded-lg transition transform hover:scale-105">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="tel:226-218-8318" className="flex items-center space-x-2 bg-slate-700 hover:bg-cyan-600 px-6 py-3 rounded-lg transition transform hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Phone</span>
            </a>
          </div>
        </div>
      </section>

        </div>
      )}
    </div>
  );
}

export default App;