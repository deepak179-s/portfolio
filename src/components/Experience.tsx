"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "SDE Intern",
        company: "Graphketing",
        badge: "Internship",
        period: "Aug 2025 – Oct 2025",
        location: "Remote",
        points: [
            "Built and shipped admin dashboard features enabling real-time visualization of operational metrics through scalable REST API integrations",
            "Improved frontend performance and reliability by identifying and resolving critical UI issues, optimizing data-fetching workflows, and ensuring cross-browser compatibility",
            "Delivered production-ready, reusable UI components by translating product requirements into scalable frontend architecture",
            "Collaborated with backend engineers to integrate APIs and ensure consistent data flow across the application"
        ],
        tech: [
            { name: "React.js", icon: "⚛️" }, 
            { name: "Node.js", icon: "🟢" }, 
            { name: "Express.js", icon: "⚙️" }, 
            { name: "REST APIs", icon: "🔌" }, 
            { name: "Tailwind CSS", icon: "💨" }
        ],
        logo: "G"
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="mb-12 text-left"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary">Experience</h2>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-6">
                    {experiences.map((exp, expIndex) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: expIndex * 0.1, ease: "easeOut" }}
                            className="group bg-card rounded-2xl border border-border overflow-hidden 
                         hover:border-accent/50 transition-all duration-300 hover:shadow-2xl 
                         hover:shadow-accent/10"
                        >
                            <div className="p-6 sm:p-10 relative">
                                {/* Subtle background glow effect over hovered card */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 relative z-10">
                                    {/* Left Logo */}
                                    <motion.div 
                                        whileHover={{ rotate: [-5, 5, 0], scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                        className="hidden sm:flex flex-shrink-0 mt-1"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-xl font-bold text-text-primary shadow-sm group-hover:border-accent/40 transition-colors">
                                            {exp.logo}
                                        </div>
                                    </motion.div>

                                    <div className="flex-grow">
                                        {/* Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
                                                        {exp.company}
                                                    </h3>
                                                    <span className="px-3 py-1 text-[11px] font-semibold text-blue-500 bg-blue-500/10 rounded-full border border-blue-500/20 uppercase tracking-wide">
                                                        {exp.badge}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-medium text-text-secondary">{exp.role}</p>
                                            </div>
                                            <div className="flex flex-col sm:items-end gap-1 text-sm text-text-secondary font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                    {exp.period}
                                                </div>
                                                <p>{exp.location}</p>
                                            </div>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-8">
                                            <p className="text-sm font-semibold text-text-primary mb-3">Technologies Used</p>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {exp.tech.map((t, i) => (
                                                    <motion.div
                                                        key={t.name}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.2 + (i * 0.05) }}
                                                        viewport={{ once: true }}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-background rounded-full border border-border 
                                                         text-[13px] font-medium text-text-primary hover:border-accent/50 hover:shadow-md 
                                                         hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                                                    >
                                                        <span className="text-sm">{t.icon}</span>
                                                        {t.name}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Points */}
                                        <ul className="space-y-4">
                                            {exp.points.map((point, i) => (
                                                <motion.li 
                                                    key={i} 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                                                    viewport={{ once: true }}
                                                    className="flex gap-3 text-sm text-text-secondary leading-relaxed group-hover:text-text-primary/90 transition-colors"
                                                >
                                                    <span className="text-accent mt-1.5 flex-shrink-0 text-[10px] transform group-hover:scale-125 transition-transform duration-300">●</span>
                                                    {point}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
