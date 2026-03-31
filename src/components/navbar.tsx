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
  
  // Define theme colors for each nav item (Avoiding Orange as requested)
  const NAV_COLORS = [
    "#d8b4fe", // Home: Light Purple
    "#93c5fd", // About Me: Light Blue
    "#818cf8", // Skills: Indigo
    "#22d3ee", // Projects: Cyan
    "#f472b6", // Contact: Pink
  ];

  const displayIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0);
  const displayColor = NAV_COLORS[displayIndex];

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
      <div className="w-full px-6 md:px-16 flex items-center justify-between pointer-events-none">
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
        <div className="hidden md:flex nav-wrapper pointer-events-auto">
          <div 
            className="nav-container"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => {
              const isActive = activeIndex === index;
              const isHovered = hoveredIndex === index;
              const itemColor = (isActive || isHovered) ? NAV_COLORS[index] : "#94a3b8";

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={closeMenu}
                  className="nav-btn transition-colors duration-500"
                  style={{ color: itemColor }}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Sliding Dot Indicator */}
            <motion.div
              className="nav-dot"
              style={{
                background: displayColor,
                boxShadow: `0 0 12px ${displayColor}80, 0 0 24px ${displayColor}40`
              }}
              animate={{
                left: `${(displayIndex * 20) + 10}%`,
                translateX: "-50%",
                scale: hoveredIndex !== null ? 1.2 : 1
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
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
