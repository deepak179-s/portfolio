"use client";

import { motion } from "framer-motion";
import type { Certification } from "@/types";
import { ExternalLink } from "lucide-react";

interface CertificationsProps {
    certifications?: Certification[];
}

export default function Certifications({ certifications = [] }: CertificationsProps) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <section id="certifications" className="py-24 px-4 overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="mb-14 text-left"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3">Certifications</h2>
                    <div className="w-20 h-1.5 bg-accent rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                            className="group bg-card rounded-2xl border border-border overflow-hidden 
                         hover:border-accent/40 transition-all duration-300 hover:shadow-xl p-6 relative"
                        >
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-start gap-5 relative z-10">
                                {/* Left Logo */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-border flex items-center justify-center font-bold text-xl text-slate-400 overflow-hidden shadow-sm group-hover:border-accent/30 transition-colors">
                                        {cert.logo_url ? (
                                            <img src={cert.logo_url} alt={cert.issuer} className="w-full h-full object-contain p-2" />
                                        ) : (
                                            cert.issuer.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors mb-1">
                                        {cert.title}
                                    </h3>
                                    <p className="text-base font-semibold text-text-secondary mb-2">{cert.issuer}</p>
                                    
                                    <p className="text-sm text-text-secondary mb-4">
                                        Issued {cert.issue_date} 
                                        {cert.expiration_date && ` · Expires ${cert.expiration_date}`}
                                    </p>

                                    {cert.credential_url && (
                                        <a 
                                            href={cert.credential_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-text-secondary/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                                        >
                                            Show credential
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
