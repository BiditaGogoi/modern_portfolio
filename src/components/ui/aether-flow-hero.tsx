"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, animate } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

// A utility function for class names
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

import { useCursor } from "@/context/cursor-context";
import { caslon } from "@/fonts";

// A single character that responds to mouse proximity
const ProximityCharacter = ({ char, mouseX, mouseY }: { char: string, mouseX: any, mouseY: any }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const color = useMotionValue("rgba(255, 255, 255, 0.85)");
    const isPurple = useRef(false);

    useAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(mouseX.get() - charX, 2) + 
            Math.pow(mouseY.get() - charY, 2)
        );

        // If distance is less than 100px, glow a soft faded purple
        if (distance < 100) {
            if (!isPurple.current) {
                isPurple.current = true;
                animate(color, "rgba(216, 180, 254, 0.85)", { duration: 0.1 });
            }
        } else {
            if (isPurple.current) {
                isPurple.current = false;
                animate(color, "rgba(255, 255, 255, 0.85)", { duration: 1.5 });
            }
        }
    });

    return (
        <motion.span
            ref={ref}
            style={{ color }}
            className="inline-block"
        >
            {char}
        </motion.span>
    );
};

// The main hero component
const AetherFlowHero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { setCursorType } = useCursor();
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

        // Particle class definition
        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas!.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas!.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse collision detection
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius + this.size) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (canvas!.height * canvas!.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                let color = 'rgba(191, 128, 255, 0.8)'; // Brighter purple
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const resizeCanvas = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
            init(); 
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const connect = () => {
            if (!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (canvas!.width / 7) * (canvas!.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        
                        let dx_mouse_a = particles[a].x - (mouse.x || 0);
                        let dy_mouse_a = particles[a].y - (mouse.y || 0);
                        let distance_mouse_a = Math.sqrt(dx_mouse_a*dx_mouse_a + dy_mouse_a*dy_mouse_a);

                        if (mouse.x && distance_mouse_a < mouse.radius) {
                             ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        } else {
                             ctx.strokeStyle = `rgba(200, 150, 255, ${opacityValue})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animateCanvas = () => {
            animationFrameId = requestAnimationFrame(animateCanvas);
            if (!ctx) return;
            // Set the background color to solid black as requested
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        };
        
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };
        
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
            mouseX.set(-1000);
            mouseY.set(-1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        init();
        animateCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        } as any),
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            
            <div className="relative z-10 text-center p-6">
                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={`${caslon.className} text-5xl md:text-8xl font-bold mb-6 cursor-default px-4 text-white flex flex-wrap justify-center overflow-visible tracking-tight`}
                >
                    <div className="flex mr-[0.3em]">
                        {"BIDITA".split("").map((char, i) => (
                            <ProximityCharacter key={`b-${i}`} char={char} mouseX={mouseX} mouseY={mouseY} />
                        ))}
                    </div>
                    <div className="flex">
                        {"GOGOI".split("").map((char, i) => (
                            <ProximityCharacter key={`g-${i}`} char={char} mouseX={mouseX} mouseY={mouseY} />
                        ))}
                    </div>
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto text-lg text-gray-400 mb-10"
                >
                    B.Tech 1st Year | Passionate Developer | Tech Enthusiast
                </motion.p>

                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto max-w-2xl mt-4">
                        <motion.button 
                            onClick={() => {
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="animated-button relative flex items-center justify-center gap-2 w-auto px-10 py-3 border-2 border-white/30 bg-gradient-to-br from-purple-950/60 via-purple-900/40 to-blue-950/60 rounded-full font-bold text-white cursor-pointer overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:bg-white hover:text-blue-950 hover:border-white hover:shadow-[0_0_30px_rgba(191,128,255,0.4)] backdrop-blur-md group text-sm"
                            onMouseEnter={() => setCursorType('hover')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            {/* Arrow 1 (Starts inside, moves out to right) */}
                            <ArrowRight className="absolute right-4 w-5 h-5 text-white z-10 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-blue-950" />

                            {/* Arrow 2 (Starts outside left, moves in to 16px) */}
                            <ArrowRight className="absolute -left-10 w-5 h-5 text-white z-10 group-hover:left-4 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:text-blue-950" />

                            {/* Button Text (Shifts right) */}
                            <span className="relative z-10 translate-x-0 group-hover:translate-x-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                My work
                            </span>
                        </motion.button>
                        
                        <motion.button 
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-blue-950/50 via-blue-900/30 to-blue-850/50 backdrop-blur-sm border border-white/10 text-white font-bold rounded-full transition-all duration-300 hover:bg-blue-400 hover:text-black hover:border-blue-400 hover:shadow-[0_0_25px_rgba(96,165,250,0.4)] overflow-hidden text-sm w-auto"
                            onMouseEnter={() => setCursorType('hover')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            <span className="relative z-10 pl-2">Resume</span>
                            <div className="relative flex-shrink-0 w-7 h-7 bg-white/10 group-hover:bg-black rounded-full flex items-center justify-center overflow-hidden transition-colors duration-300 backdrop-blur-md border border-white/10 group-hover:border-transparent">
                                {/* Icon 1: Slides out top-right */}
                                <Zap className="w-3.5 h-3.5 text-white group-hover:text-blue-400 absolute transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
                                {/* Icon 2: Slides in from bottom-left */}
                                <Zap className="w-3.5 h-3.5 text-white group-hover:text-blue-400 absolute transition-transform duration-300 ease-in-out -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0" />
                            </div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AetherFlowHero;
