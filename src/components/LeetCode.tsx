"use client";

import { motion } from "framer-motion";
import { Flame, ExternalLink, Trophy, Target, Zap, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

export default function LeetCode() {
    const [stats, setStats] = useState({ 
        solved: 0, 
        contestRating: 0, 
        topPercentage: 0 
    });
    const [calendarData, setCalendarData] = useState<{ date: string; count: number; level: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/leetcode");
                if (!res.ok) {
                    throw new Error("Failed to fetch LeetCode data from internal API");
                }
                
                const { userData, contestData, calData } = await res.json();

                setStats({
                    solved: userData?.solvedProblem || 0,
                    contestRating: Math.round(contestData?.contestRating) || 0,
                    topPercentage: contestData?.contestTopPercentage || 0,
                });

                if (calData?.submissionCalendar) {
                    const submissionCalendar = JSON.parse(calData.submissionCalendar);
                    const formatData = Object.keys(submissionCalendar).map((timestamp) => {
                        const date = new Date(parseInt(timestamp) * 1000);
                        const count = submissionCalendar[timestamp];
                        let level = 0;
                        if (count > 0) level = 1;
                        if (count >= 3) level = 2;
                        if (count >= 5) level = 3;
                        if (count >= 10) level = 4;
                        return { 
                            date: date.toISOString().split("T")[0], 
                            count, 
                            level 
                        };
                    });

                    const end = new Date();
                    const start = new Date();
                    start.setFullYear(end.getFullYear() - 1);
                    const finalCalendarData = [];
                    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                        const dateString = d.toISOString().split("T")[0];
                        const existingData = formatData.find((item) => item.date === dateString);
                        finalCalendarData.push(existingData || { date: dateString, count: 0, level: 0 });
                    }
                    setCalendarData(finalCalendarData);
                }
            } catch (error) {
                console.error("Failed to fetch LeetCode data", error);
                // Fallback to empty calendar to stop loading animation
                const end = new Date();
                const start = new Date();
                start.setFullYear(end.getFullYear() - 1);
                const fallbackCalendarData = [];
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    fallbackCalendarData.push({ date: d.toISOString().split("T")[0], count: 0, level: 0 });
                }
                setCalendarData(fallbackCalendarData);
            }
        };
        fetchData();
    }, []);

    const greenTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#1e1e24', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section id="leetcode" className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-left"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-text-primary">
                        LeetCode <span className="inline-block">🔥</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative bg-card rounded-2xl border border-border overflow-hidden 
                          hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl 
                          hover:shadow-orange-500/5">
                        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

                        <div className="p-8 sm:p-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
                                {/* Main stat */}
                                <div className="text-center md:text-left flex-shrink-0">
                                    <div className="inline-flex items-center gap-3 mb-2">
                                        <Flame className="w-10 h-10 text-orange-500" />
                                        <span className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                            {stats.solved === 0 ? "..." : stats.solved}
                                        </span>
                                    </div>
                                    <p className="text-xl text-text-secondary font-medium">Problems Solved</p>
                                </div>
                                
                                {/* Heatmap */}
                                <div className="w-full overflow-hidden overflow-x-auto flex justify-center md:justify-end">
                                    {calendarData.length > 0 ? (
                                        <ActivityCalendar 
                                            data={calendarData} 
                                            theme={greenTheme}
                                            colorScheme="dark"
                                            labels={{
                                                totalCount: '{{count}} submissions in the last year',
                                            }}
                                        />
                                    ) : (
                                        <div className="animate-pulse bg-background h-32 w-full max-w-lg rounded-xl border border-border"></div>
                                    )}
                                </div>
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">{stats.solved || "..."}</p>
                                    <p className="text-xs text-text-secondary mt-1">Total Solved</p>
                                </div>
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">{stats.contestRating || "..."}</p>
                                    <p className="text-xs text-text-secondary mt-1">Contest Rating</p>
                                </div>
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">Top {stats.topPercentage ? `${stats.topPercentage}%` : "..."}</p>
                                    <p className="text-xs text-text-secondary mt-1">Global Rank</p>
                                </div>
                                <div className="text-center p-4 bg-background rounded-xl border border-border">
                                    <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-text-primary">DSA</p>
                                    <p className="text-xs text-text-secondary mt-1">Focus Area</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center md:text-left">
                                <a
                                    href="https://leetcode.com/u/deepak0179/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 
                             text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 
                             transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    View LeetCode Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
