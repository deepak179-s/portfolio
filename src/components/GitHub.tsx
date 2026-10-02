"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github as GithubIcon, ExternalLink, GitFork, Star, Code2 } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHub() {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({ repos: -1, stars: -1, contributions: -1 });

    useEffect(() => {
        setMounted(true);

        const fetchGitHubStats = async () => {
            const username = "deepak179-s";
            let repos = 0;
            let stars = 0;
            let contributions = 0;

            try {
                // Fetch basic user data (repos)
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                if (userRes.ok) {
                    const userData = await userRes.json();
                    repos = userData.public_repos || 0;
                }
            } catch (error) {
                console.warn("Failed to fetch GitHub user:", error);
            }

            try {
                // Fetch repositories (stars)
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                if (reposRes.ok) {
                    const reposData = await reposRes.json();
                    if (Array.isArray(reposData)) {
                        stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                    }
                }
            } catch (error) {
                console.warn("Failed to fetch GitHub repos:", error);
            }

            try {
                // Fetch contributions
                // Using the exact API used by react-github-calendar to ensure sync
                const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                if (contribRes.ok) {
                    const contribData = await contribRes.json();
                    contributions = contribData?.total?.lastYear || contribData?.total || 0;
                }
            } catch (error) {
                console.warn("Failed to fetch GitHub contributions:", error);
            }

            setStats({
                repos,
                stars,
                contributions
            });
        };

        fetchGitHubStats();
    }, []);

    const githubTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
                            <div className="flex flex-col items-center gap-10 mb-10">
                                {/* Profile Info and Stats Row */}
                                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="flex-shrink-0 flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-accent/20">
                                            DS
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-text-primary mb-1">Deepak Kumar</h3>
                                            <p className="text-lg text-text-secondary font-medium">AI / ML Engineer</p>
                                        </div>
                                    </div>
                                    
                                    {/* Quick stats moved to top right */}
                                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                        <div className="text-center p-4 bg-background rounded-xl border border-border min-w-[120px]">
                                            <Code2 className="w-5 h-5 text-accent mx-auto mb-2" />
                                            <p className="text-xl font-bold text-text-primary">{stats.repos !== -1 ? stats.repos : "..."}</p>
                                            <p className="text-xs text-text-secondary mt-1">Repositories</p>
                                        </div>
                                        <div className="text-center p-4 bg-background rounded-xl border border-border min-w-[120px]">
                                            <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-text-primary">{stats.stars !== -1 ? stats.stars : "..."}</p>
                                            <p className="text-xs text-text-secondary mt-1">Stars Earned</p>
                                        </div>
                                        <div className="text-center p-4 bg-background rounded-xl border border-border min-w-[120px]">
                                            <GitFork className="w-5 h-5 text-green-500 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-text-primary">{stats.contributions !== -1 ? stats.contributions : "..."}</p>
                                            <p className="text-xs text-text-secondary mt-1">Contributions</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Contribution Graph (Heatmap) - Now Full Width */}
                                <div className="w-full overflow-hidden overflow-x-auto flex justify-center min-h-[150px] bg-background/50 p-6 rounded-xl border border-border">
                                    {mounted ? (
                                        <div className="min-w-max">
                                            <GitHubCalendar 
                                                username="deepak179-s" 
                                                theme={githubTheme}
                                                colorScheme="dark"
                                                labels={{
                                                    totalCount: '{{count}} contributions in the last year',
                                                }}
                                                blockSize={14}
                                                blockMargin={5}
                                                fontSize={12}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center min-h-[120px]">
                                            <div className="w-full max-w-[800px] h-[120px] bg-border/20 rounded-md animate-pulse"></div>
                                        </div>
                                    )}
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
