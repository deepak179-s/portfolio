"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Mail,
    Github,
    Linkedin,
    MapPin,
    CheckCircle2,
} from "lucide-react";

const socials = [
    {
        name: "Email",
        value: "deepak17943@gmail.com",
        href: "mailto:deepak17943@gmail.com",
        icon: Mail,
        color: "text-red-500",
        bg: "bg-red-500/10",
        borderHover: "hover:border-red-500/50",
    },
    {
        name: "GitHub",
        value: "deepak179-s",
        href: "https://github.com/deepak179-s",
        icon: Github,
        color: "text-gray-700 dark:text-gray-300",
        bg: "bg-gray-500/10",
        borderHover: "hover:border-gray-500/50",
    },
    {
        name: "LinkedIn",
        value: "deepak179-s",
        href: "https://www.linkedin.com/in/deepak179-s/",
        icon: Linkedin,
        color: "text-blue-600",
        bg: "bg-blue-500/10",
        borderHover: "hover:border-blue-600/50",
    },
];

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "bfb7bc7c-13a0-45e7-b159-49bb47a926de",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });
            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(result.message || "Failed to send message. Please try again later.");
            }
        } catch (err) {
            console.error("Failed to send email:", err);
            setError("Failed to send message. Please log in or try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="mb-14 text-left"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3">Contact Me</h2>
                    <div className="w-20 h-1.5 bg-accent rounded-full"></div>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Left Column: Social links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2 space-y-6 flex flex-col"
                        >
                            <div>
                                <h3 className="text-3xl font-bold text-text-primary mb-3">Let&apos;s Connect</h3>
                                <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed mb-4">
                                    I&apos;m always excited to work on new projects and collaborate with amazing people. Let&apos;s discuss how we can bring your ideas to life!
                                </p>
                            </div>

                            <div className="grid gap-3 flex-grow">
                                {socials.map((social, idx) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        whileHover={{ x: 5, scale: 1.02 }}
                                        className={`flex items-center gap-4 p-4 bg-card rounded-2xl border border-border 
                                         transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-pointer ${social.borderHover}`}
                                    >
                                        <div className={`p-3 rounded-xl ${social.bg} group-hover:scale-110 transition-transform duration-300`}>
                                            <social.icon className={`w-5 h-5 ${social.color}`} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-primary text-[15px]">{social.name}</p>
                                            <p className="text-text-secondary text-[13px] group-hover:text-text-primary transition-colors">
                                                {social.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border"
                                >
                                    <div className="p-3 rounded-xl bg-green-500/10">
                                        <MapPin className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-primary text-[15px]">Location</p>
                                        <p className="text-text-secondary text-[13px]">Jalandhar, Punjab, India</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Contact form & Available work box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                            className="lg:col-span-3 flex flex-col gap-6"
                        >
                            <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 relative overflow-hidden group shadow-lg hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500">
                                {/* Subtle animated background glow */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                <motion.h3
                                    className="text-2xl font-bold text-text-primary mb-6"
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                >
                                    Send a Message <span className="text-accent animate-pulse">✨</span>
                                </motion.h3>

                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                                            {error}
                                        </div>
                                    )}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.5 }}
                                        >
                                            <label htmlFor="name" className="block text-[13px] font-bold text-text-secondary mb-1.5 ml-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={isSubmitting}
                                                className="w-full px-4 py-3 rounded-2xl bg-background border border-border border-b-4 text-text-primary 
                                                placeholder:text-text-secondary/40 text-[15px] focus:outline-none focus:border-accent 
                                                transition-all duration-300 hover:border-text-secondary/30 disabled:opacity-50"
                                                placeholder="John Doe"
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.6 }}
                                        >
                                            <label htmlFor="email" className="block text-[13px] font-bold text-text-secondary mb-1.5 ml-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={isSubmitting}
                                                className="w-full px-4 py-3 rounded-2xl bg-background border border-border border-b-4 text-text-primary 
                                                placeholder:text-text-secondary/40 text-[15px] focus:outline-none focus:border-accent 
                                                transition-all duration-300 hover:border-text-secondary/30 disabled:opacity-50"
                                                placeholder="john@example.com"
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.7 }}
                                    >
                                        <label htmlFor="message" className="block text-[13px] font-bold text-text-secondary mb-1.5 ml-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 rounded-2xl bg-background border border-border border-b-4 text-text-primary 
                                            placeholder:text-text-secondary/40 text-[15px] focus:outline-none focus:border-accent 
                                            transition-all duration-300 hover:border-text-secondary/30 resize-none disabled:opacity-50"
                                            placeholder="Tell me about your project or just say hi..."
                                        />
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.8 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting || submitted}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white 
                                        font-bold text-[15px] rounded-2xl hover:bg-accent-hover transition-all duration-300 
                                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(var(--accent)/0.3)] shadow-accent/20 border-b-4 border-accent-hover disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <AnimatePresence mode="wait">
                                            {submitted ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    Message Sent!
                                                </motion.div>
                                            ) : isSubmitting ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="send"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Send className="w-4 h-4" />
                                                    Send Message
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </form>
                            </div>

                            {/* Available for Work Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="bg-card rounded-3xl border border-border p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="relative flex items-center justify-center w-16 h-16 mb-4">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-green-500 rounded-full"
                                    />
                                    <div className="w-8 h-8 bg-green-500 rounded-full z-10 shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                                </div>

                                <h3 className="text-xl font-bold text-green-600 dark:text-green-500 mb-2 tracking-wide">Available for Work</h3>
                                <p className="text-text-secondary text-sm mb-5">Open to new opportunities and exciting projects</p>

                                <div className="px-4 py-1.5 border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 font-semibold text-xs rounded-full cursor-default hover:bg-green-500/20 transition-colors">
                                    Accepting Projects
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
