"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github as GithubIcon, ExternalLink, GitFork, Star, Code2 } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHub() {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({ repos: 0, stars: 0, contributions: 0 });

    useEffect(() => {
        setMounted(true);

        const fetchGitHubStats = async () => {
            try {
                const username = "deepak179-s";
                
                // Fetch basic user data (repos)
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();
                
                // Fetch repositories (stars)
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const reposData = await reposRes.json();
                let totalStars = 0;
                if (Array.isArray(reposData)) {
                    totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                }

                // Fetch contributions
                const contribRes = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
                if (contribRes.ok) {
                    const contribData = await contribRes.json();
                    const totalContribs = contribData?.totalContributions || 0;
                    
                    setStats({
                        repos: userData.public_repos || 0,
                        stars: totalStars,
                        contributions: totalContribs
                    });
                } else {
                    setStats({
                        repos: userData.public_repos || 0,
                        stars: totalStars,
                        contributions: 0
                    });
                }
            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
            }
        };

        fetchGitHubStats();
    }, []);

    const greenTheme = {
        light: ['#e8f5e9', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#142e1d', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section id="github" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-left"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary flex items-center gap-3">
                        GitHub <GithubIcon className="w-10 h-10 text-text-primary" />
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 
                          transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                        {/* Header Gradient */}
                        <div className="h-1.5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 dark:from-gray-200 dark:via-gray-400 dark:to-gray-600" />

                        <div className="p-8 sm:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
                                {/* Profile Info */}
                                <div className="text-center md:text-left flex-shrink-0 flex flex-col items-center md:items-start gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-accent/20">
                                        DS
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-text-primary mb-1">Deepak Kumar</h3>
                                        <p className="text-lg text-text-secondary font-medium">AI / ML Engineer</p>
                                    </div>
                                </div>
                                
                                {/* Contribution Graph (Heatmap) */}
                                <div className="w-full overflow-hidden overflow-x-auto flex flex-col items-center md:items-end justify-center md:justify-end min-h-[150px]">
                                    {mounted ? (
                                        <GitHubCalendar 
                                            username="deepak179-s" 
                                            theme={greenTheme}
                                            colorScheme="dark"
                                            labels={{
                                                totalCount: '{{count}} contributions in the last half year',
                                            }}
                                            blockSize={12}
                                            blockMargin={4}
                                            fontSize={12}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center min-h-[120px]">
                                            <div className="w-full max-w-[600px] h-[120px] bg-border/20 rounded-md animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <Code2 className="w-6 h-6 text-accent mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">{stats.repos > 0 ? stats.repos : "2+"}</p>
                                    <p className="text-xs text-text-secondary mt-1">Repositories</p>
                                </div>
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">{stats.stars > 0 ? stats.stars : "1+"}</p>
                                    <p className="text-xs text-text-secondary mt-1">Stars Earned</p>
                                </div>
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <GitFork className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">{stats.contributions > 0 ? stats.contributions : "50+"}</p>
                                    <p className="text-xs text-text-secondary mt-1">Contributions</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center md:text-left">
                                <a
                                    href="https://github.com/deepak179-s"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold 
                                     rounded-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-lg 
                                     hover:shadow-accent/25 hover:-translate-y-0.5"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View GitHub Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
