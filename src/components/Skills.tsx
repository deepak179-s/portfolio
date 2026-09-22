"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Layout,
    Server,
    Database,
    Wrench,
    LucideIcon
} from "lucide-react";
import type { Skill } from "@/types";

import { techIcons as skillIcons } from "@/utils/icons";
import { getCategoryIcon, getCategoryColor } from "@/utils/helpers";



const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

function SkillPill({ name, index }: { name: string; index: number }) {
    const icon = skillIcons[name];
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -3 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium 
                       text-text-primary bg-background rounded-full border border-border
                       hover:border-accent/40 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10
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



interface SkillsProps {
    skills?: Skill[];
}

export default function Skills({ skills = [] }: SkillsProps) {
    if (!skills || skills.length === 0) return null;

    const displayCategories = skills.map(s => ({
        title: s.category,
        icon: getCategoryIcon(s.category),
        color: getCategoryColor(s.category),
        skills: s.skills || []
    }));

    return (
        <section id="skills" className="py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header — left aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
                        Skills & Technologies
                    </h2>
                </motion.div>

                {/* Category Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {displayCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={cardVariant}
                            className="group bg-card rounded-2xl border border-border p-6 hover:border-accent/30 
                                       hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                                    <category.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-text-primary text-lg">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, i) => (
                                    <SkillPill key={skill + i} name={skill} index={i} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
