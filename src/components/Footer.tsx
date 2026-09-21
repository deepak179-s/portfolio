"use client";

import { Github, Linkedin, Mail, Heart, Link as LinkIcon } from "lucide-react";
import type { SocialLink, Profile } from "@/types";

const defaultSocials = [
    { icon: Github, href: "https://github.com/deepak179-s", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/deepak179-s/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:deepak17943@gmail.com", label: "Email" },
];

const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return Github;
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("email") || p.includes("mail")) return Mail;
    return LinkIcon;
};

interface FooterProps {
    socialLinks?: SocialLink[];
    profile?: Profile | null;
}

export default function Footer({ socialLinks = [], profile }: FooterProps) {
    const displaySocials = socialLinks && socialLinks.length > 0 
        ? socialLinks.map(link => ({
            icon: getPlatformIcon(link.platform),
            href: link.url,
            label: link.platform
        }))
        : defaultSocials;

    // Add email to footer if present and not in social links
    if (profile?.email && !displaySocials.find(s => s.label.toLowerCase().includes("email"))) {
        displaySocials.push({
            icon: Mail,
            href: `mailto:${profile.email}`,
            label: "Email"
        });
    }

    const name = profile?.full_name || "Deepak Kumar";

    return (
        <footer className="py-8 px-4 border-t border-border">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-text-secondary flex items-center gap-1.5">
                    Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by{" "}
                    <span className="font-semibold text-text-primary">{name}</span>
                </p>

                <div className="flex gap-3">
                    {displaySocials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-text-secondary hover:text-accent hover:bg-accent/5 
                         transition-all duration-200"
                            aria-label={social.label}
                        >
                            <social.icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>

                <p className="text-sm text-text-secondary">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
