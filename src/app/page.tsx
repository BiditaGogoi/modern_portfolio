import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { ArrowRight, BookOpen, Trophy, GraduationCap } from "lucide-react";
import Link from "next/link";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <AetherFlowHero />
      
      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-black text-white">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tight text-white uppercase sm:normal-case">
              Future Software Engineer
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl text-center leading-relaxed mb-16">
              I am a passionate B.Tech 1st Year student with a deep interest in software development and artificial intelligence. I enjoy building modern web applications, experimenting with hardware, and exploring the endless possibilities of technology. My goal is to create impactful solutions that combine seamless design with robust functionality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {/* Education Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Education</h3>
                <p className="text-gray-400">
                  Currently pursuing B.Tech in Computer Science and Engineering (1st Year).
                </p>
              </div>

              {/* Passion Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Passions</h3>
                <p className="text-gray-400">
                  Web Development, Python Scripting, UI/UX Design, and IoT tinkering.
                </p>
              </div>

              {/* Achievements Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/30 transition-colors group md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-gray-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Achievements</h3>
                <p className="text-gray-400">
                  Continuously learning and exploring new tech stacks. Building real-world projects.
                </p>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
               <Link href="#projects" className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20">
                  View Projects <ArrowRight className="h-4 w-4" />
               </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded Sections */}
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
