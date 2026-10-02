"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function VisibilityManager() {
  const [loading, setLoading] = useState(false);
  const [showLeetCode, setShowLeetCode] = useState(true);
  const [showGitHub, setShowGitHub] = useState(true);

  // We store these config values inside social_links as pseudo-links
  // platform: "config:show_leetcode" | "config:show_github"
  // url: "true" | "false"

  useEffect(() => {
    fetchVisibility();
  }, []);

  const fetchVisibility = async () => {
    setLoading(true);
    const { data } = await supabase.from("social_links").select("*").like("platform", "config:show_%");
    
    if (data) {
      const leetcodeConf = data.find((d: any) => d.platform === "config:show_leetcode");
      const githubConf = data.find((d: any) => d.platform === "config:show_github");

      if (leetcodeConf) setShowLeetCode(leetcodeConf.url === "true");
      if (githubConf) setShowGitHub(githubConf.url === "true");
    }
    setLoading(false);
  };

  const saveVisibility = async (platform: string, value: boolean) => {
    setLoading(true);
    const { data } = await supabase.from("social_links").select("*").eq("platform", platform).single();

    if (data) {
      // Update existing
      await supabase.from("social_links").update({ url: value.toString() }).eq("id", data.id);
    } else {
      // Create new
      await supabase.from("social_links").insert([{
        platform,
        url: value.toString(),
        icon: "Config",
        order_index: 999
      }]);
    }
    setLoading(false);
  };

  const handleLeetCodeToggle = async () => {
    const newValue = !showLeetCode;
    setShowLeetCode(newValue);
    await saveVisibility("config:show_leetcode", newValue);
  };

  const handleGitHubToggle = async () => {
    const newValue = !showGitHub;
    setShowGitHub(newValue);
    await saveVisibility("config:show_github", newValue);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-2xl font-bold mb-1">Visibility Settings</h3>
        <p className="text-slate-500">Hide or show specific sections of your portfolio.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        
        {/* LeetCode Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-text-primary">LeetCode Section</h4>
            <p className="text-sm text-text-secondary">Show your LeetCode stats and graph on the main page.</p>
          </div>
          <button
            onClick={handleLeetCodeToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showLeetCode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showLeetCode ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        {/* GitHub Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-text-primary">GitHub Section</h4>
            <p className="text-sm text-text-secondary">Show your GitHub contributions and stats on the main page.</p>
          </div>
          <button
            onClick={handleGitHubToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showGitHub ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showGitHub ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

      </div>
    </div>
  );
}
