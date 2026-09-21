"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown, Link as LinkIcon, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import type { Profile, SocialLink } from "@/types";

interface HeroProps {
    profile?: Profile | null;
    socialLinks?: SocialLink[];
}

// Map platform strings to icons
const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return Github;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("twitter") || p.includes("x")) return Twitter;
    if (p.includes("facebook")) return Facebook;
    if (p.includes("instagram")) return Instagram;
    if (p.includes("youtube")) return Youtube;
    if (p.includes("mail") || p.includes("email")) return Mail;
    return LinkIcon;
};

export default function Hero({ profile, socialLinks = [] }: HeroProps) {
    const name = profile?.name || "Deepak Kumar";
    const bioText = profile?.bio || "I am a B.Tech CSE student specializing in Machine Learning and Data Science.";
    const cvUrl = profile?.cv_url || "https://drive.google.com/file/d/1hjHBFBXq13E9bsxwfzi2lFCfSk4i-_eu/view?usp=sharing";

    // Fallback socials if empty
    const defaultSocials = [
        { icon: Github, href: "https://github.com/deepak179-s", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/deepak179-s/", label: "LinkedIn" },
        { icon: Mail, href: "mailto:deepak17943@gmail.com", label: "Email" },
    ];

    const displaySocials = socialLinks && socialLinks.length > 0 
        ? socialLinks.map(link => ({
            icon: getIcon(link.platform),
            href: link.url,
            label: link.platform
        }))
        : defaultSocials;

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
        >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[650px] w-full text-center">
                {/* Availability badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Available for opportunities
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-primary leading-tight mb-4"
                >
                    Hello, I&apos;m{" "}
                    <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                        {name.split(" ")[0]}
                    </span>{" "}
                    <motion.span
                        animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                        className="inline-block"
                    >
                        👋🏻
                    </motion.span>
                </motion.h1>

                {/* Role line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl font-semibold text-text-secondary mb-8"
                >
                    {profile?.name ? name : "B.Tech CSE Student"}
                </motion.p>

                {/* Description — bold and confident */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-10 space-y-1"
                >
                    <p className="text-base sm:text-lg font-semibold text-text-primary leading-relaxed">
                        {bioText}
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-center gap-5 mb-10"
                >
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold 
                       rounded-xl hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25
                       hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                    >
                        <ArrowDown className="w-4 h-4" />
                        View Projects
                    </a>
                    <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-card text-text-primary font-semibold 
                       rounded-xl border border-border hover:border-accent/50 transition-all duration-300
                       hover:-translate-y-0.5"
                    >
                        <FileText className="w-4 h-4" />
                        Resume
                    </a>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-center gap-3"
                >
                    {displaySocials.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="p-3 rounded-xl bg-card border border-border text-text-secondary 
                         hover:text-accent hover:border-accent/50 hover:-translate-y-1 
                         transition-all duration-300"
                        >
                            <social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
