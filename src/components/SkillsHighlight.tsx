"use client";

import { motion } from "framer-motion";

const topSkills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Express.js", icon: "⚙️" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Tailwind CSS", icon: "💨" },
    { name: "C++", icon: "⚡" },
    { name: "AWS", icon: "☁️" },
];

export default function SkillsHighlight() {
    return (
        <section className="pb-20 pt-4 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {topSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.04 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-card rounded-full border border-border
                         text-sm font-medium text-text-primary hover:border-accent/50 hover:shadow-md 
                         hover:shadow-accent/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                        >
                            <span className="text-base">{skill.icon}</span>
                            {skill.name}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
