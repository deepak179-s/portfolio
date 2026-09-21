"use client";

import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/types";

/* ── tech icon map using devicon CDN ── */
const techIcons: Record<string, string> = {
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
    "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    "Stripe": "https://img.icons8.com/color/48/stripe.png",
    "Convex": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/convex/convex-original.svg",
    "Clerk": "https://img.clerk.com/static/logo-dark-mode-400x400.png",
    "Shadcn/UI": "https://avatars.githubusercontent.com/u/139895814?s=48&v=4",
    "Cloudinary": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudinary/cloudinary-original.svg",
    "JWT": "https://jwt.io/img/pic_logo.svg",
    "Inngest": "https://avatars.githubusercontent.com/u/74947497?s=48&v=4",
    "Google Gemini AI": "https://img.icons8.com/fluency/48/google-gemini.png",
    "Resend": "https://avatars.githubusercontent.com/u/108891279?s=48&v=4",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "Arduino": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "Electron": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
};



const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TechPill({ name, index }: { name: string; index: number }) {
    const icon = techIcons[name];
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold 
                 text-accent bg-accent/10 rounded-full border border-accent/20
                 hover:bg-accent/20 hover:border-accent/40 hover:shadow-md hover:shadow-accent/10
                 transition-colors duration-200 cursor-default"
        >
            {icon && (
                <img
                    src={icon}
                    alt={name}
                    width={14}
                    height={14}
                    className="flex-shrink-0"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            )}
            {name}
        </motion.span>
    );
}

interface ProjectsProps {
    projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
    if (!projects || projects.length === 0) return null;

    const displayProjects = projects.map(p => ({
        title: p.title,
        subtitle: "", 
        systemLine: p.description.split("\n")[0] || "",
        bullets: p.description.split("\n").slice(1).filter(b => b.trim() !== ""),
        tech: p.tech_stack || [],
        github: p.github_url || "",
        live: p.demo_url || "",
        image: p.image_url || "/splitr.png"
    }));

    return (
        <section id="projects" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
                        Projects
                    </h2>
                </motion.div>

                {/* Project Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {displayProjects.map((project, idx) => (
                        <motion.div
                            key={project.title + idx}
                            variants={cardVariant}
                            className="group bg-card rounded-2xl border border-border overflow-hidden
                         hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 
                         transition-all duration-300"
                        >
                            {/* Project Image */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-background">
                                {typeof project.image === 'string' ? (
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <>
                                        <Image
                                            src={project.image.light}
                                            alt={`${project.title} preview light`}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 dark:hidden"
                                        />
                                        <Image
                                            src={project.image.dark}
                                            alt={`${project.title} preview dark`}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 hidden dark:block"
                                        />
                                    </>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Title row */}
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.subtitle && <p className="text-sm text-text-secondary mt-0.5">{project.subtitle}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg border border-border text-text-secondary 
                                 hover:text-accent hover:border-accent/50 transition-all duration-200"
                                                aria-label={`Visit ${project.title} live`}
                                            >
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg border border-border text-text-secondary 
                                 hover:text-accent hover:border-accent/50 transition-all duration-200"
                                                aria-label={`View ${project.title} on GitHub`}
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* System line + bullets */}
                                {project.systemLine && (
                                    <p className="text-sm text-text-primary font-medium leading-relaxed mb-2">
                                        {project.systemLine}
                                    </p>
                                )}
                                {project.bullets && project.bullets.length > 0 && (
                                    <ul className="space-y-1 mb-4">
                                        {project.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                                                <span className="text-accent mt-1.5 text-[6px]">●</span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Animated tech pills with logos */}
                                {project.tech && project.tech.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {project.tech.map((t, i) => (
                                            <TechPill key={t} name={t} index={i} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
