"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="about" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="mb-12 text-left"
                >
                    <p className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-3 ml-1">About</p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-8">Me</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-card rounded-3xl border border-border overflow-hidden hover:border-accent/40 
                          transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 p-6 sm:p-10">
                        
                        <div className="flex flex-col md:flex-row gap-10 md:gap-14">
                            {/* Left Column: Avatar */}
                            <motion.div 
                                className="flex-shrink-0 flex justify-center md:justify-start"
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <div className="w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden border-4 border-border bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-slate-800 dark:to-slate-900 shadow-lg shrink-0 relative flex items-center justify-center group">
                                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                    <Image
                                        src="/profile.jpg"
                                        alt="Deepak Kumar"
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>
                            </motion.div>

                            {/* Right Column: Content */}
                            <motion.div 
                                className="flex-grow"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.h3 variants={itemVariants} className="text-3xl font-bold text-text-primary mb-6 relative inline-block">
                                    Deepak Kumar
                                    <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-accent rounded-full"></span>
                                </motion.h3>
                                
                                <motion.div variants={itemVariants} className="space-y-4 text-[15px] sm:text-base text-text-secondary leading-relaxed mb-10">
                                    <p>
                                        B.Tech CSE student specializing in Machine Learning, Data Science, and predictive modeling.
                                    </p>
                                    <p>
                                        Currently pursuing my education at LPU Jalandhar, where I focus on applying complex algorithms to real-world challenges. 
                                    </p>
                                    <p>
                                        I have hands-on experience building AI models using Python, deep learning frameworks, and advanced mathematical concepts, while also maintaining a strong foundation in Data Structures and Algorithms (DSA).
                                    </p>
                                    <p>
                                        With knowledge in Java, C, C++, and Python, I am equipped to develop optimized and highly scalable intelligence and data processing applications.
                                    </p>
                                    <p className="font-medium text-text-primary">
                                        Passionate about using data to make informed decisions and build smart, self-learning systems.
                                    </p>
                                </motion.div>

                                {/* Current Focus */}
                                <motion.div variants={itemVariants} className="bg-background rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-accent group-hover:w-full group-hover:opacity-10 transition-all duration-500"></div>
                                    <h4 className="text-[17px] font-bold text-text-primary mb-3 flex items-center gap-2">
                                        <span className="text-xl">🎯</span> Current Focus
                                    </h4>
                                    <p className="text-[15px] text-text-secondary leading-relaxed relative z-10">
                                        Developing advanced Machine Learning and Data Science models. Focused on improving my problem-solving skills with DSA and contributing to impactful AI/DS projects.
                                    </p>
                                </motion.div>
                                
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
