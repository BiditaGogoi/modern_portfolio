"use client";

import { motion } from "framer-motion";
import { caslon } from "@/fonts";
import { Mail, Link, Code2, Send } from "lucide-react";
import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Mock implementation)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black text-white">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm">
            <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
              Reach Out
            </span>
          </div>
          <h2 className={`${caslon.className} text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6`}>
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you have a question, a project idea, or just want to connect, feel free to drop a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-8 justify-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple-500/30 transition-colors backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                <Mail className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Email</h3>
              <a href="mailto:contact@biditagogoi.tech" className="text-gray-400 hover:text-white transition-colors">
                contact@example.com
              </a>
            </div>

            <div className="flex gap-4 w-full">
              <a href="#" className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-500/30 transition-colors backdrop-blur-sm">
                <Link className="h-8 w-8 text-blue-400" />
                <span className="font-semibold">LinkedIn</span>
              </a>
              <a href="#" className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-white/30 transition-colors backdrop-blur-sm">
                <Code2 className="h-8 w-8 text-white" />
                <span className="font-semibold">GitHub</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl pointer-events-none" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-5 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-5 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 text-white resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
