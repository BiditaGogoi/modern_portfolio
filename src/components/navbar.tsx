"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setIsOpen(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    setActiveHash(window.location.hash);
    
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Determine which index to highlight (hovered or active)
  const activeIndex = navLinks.findIndex(link => 
    (activeHash === link.href) || (!activeHash && link.href === "/")
  );
  
  const displayIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-none">
        {/* Logo Pill - Left Side */}
        <div className="hidden md:flex logo-pill pointer-events-auto">
          <Link
            href="/"
            className="logo-container group"
            onClick={() => { closeMenu(); setActiveHash(""); }}
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 group-hover:scale-110 transition-transform">
              BG
            </span>
          </Link>
        </div>

        {/* Mobile BG Logo (Remains visible for branding) */}
        <Link
          href="/"
          className="md:hidden text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 pointer-events-auto"
          onClick={() => { closeMenu(); setActiveHash(""); }}
        >
          BG
        </Link>

        {/* Desktop Nav - Right Side */}
        <div 
          className="hidden md:flex nav-wrapper pointer-events-auto"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="nav-container">
            {navLinks.map((link, index) => {
              const isActive = activeIndex === index;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={closeMenu}
                  className={cn(
                    "nav-btn",
                    isActive && "text-white"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
          
          <div className="nav-outline">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 650 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width="648"
                height="54"
                rx="14"
                className="nav-rect"
                style={{
                  strokeDasharray: "130 1282",
                  strokeDashoffset: -displayIndex * 130
                }}
              />
            </svg>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10"
        >
          <nav className="flex flex-col items-center pt-20 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-2xl font-semibold text-gray-300 hover:text-purple-400"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
