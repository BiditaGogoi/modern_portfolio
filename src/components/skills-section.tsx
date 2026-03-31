"use client";

import { motion } from "framer-motion";

const skills = [
  { category: "Languages", items: ["C", "Python", "JavaScript", "TypeScript"] },
  { category: "Web Development", items: ["Next.js", "React", "Tailwind CSS", "HTML/CSS"] },
  { category: "Databases", items: ["SQL", "MySQL"] },
  { category: "Hardware & IoT", items: ["Arduino", "Sensors", "Basic Electronics"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6 tracking-tight">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">
            A showcase of the technologies, languages, and tools I have been working with during my journey as a developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
                <span className="w-8 h-1 bg-purple-500 rounded-full inline-block" />
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium text-gray-300 group-hover:bg-purple-500/10 group-hover:text-purple-200 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
