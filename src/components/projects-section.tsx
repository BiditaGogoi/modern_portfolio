"use client";

import { motion } from "framer-motion";
import { Link2, Code2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "AI Wearable for Blind",
    description: "An innovative hardware and software solution to assist visually impaired individuals using real-time AI computer vision and sensor feedback.",
    tech: ["Python", "OpenCV", "Raspberry Pi", "Arduino"],
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80",
    link: "#",
    github: "#"
  },
  {
    title: "Smart Blind Stick Focus",
    description: "A prototype smart stick equipped with ultrasonic sensors and feedback mechanisms to help navigation and obstacle detection.",
    tech: ["C++", "Arduino", "IoT Sensors"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    link: "#",
    github: "#"
  },
  {
    title: "WhatsApp Bot",
    description: "An automated assistant built to handle messages, provide information directly via WhatsApp using APIs, and automate routine tasks.",
    tech: ["Node.js", "WhatsApp Web.js", "API"],
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80",
    link: "#",
    github: "#"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black text-white">
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6 tracking-tight font-sans">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl">
            A selection of my recent works ranging from IoT hardware prototypes to full-stack software solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-all flex flex-col backdrop-blur-sm"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-1 relative z-10 -mt-10">
                <h3 className="text-2xl font-semibold mb-3 text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-semibold bg-white/5 border border-white/10 rounded text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a href={project.link} className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">
                    <Link2 size={16} /> Live Demo
                  </a>
                  <a href={project.github} className="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    <Code2 size={16} /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
