"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase"
import { LayoutDashboard, User, Briefcase, GraduationCap, Code, Link as LinkIcon, LogOut, Settings } from "lucide-react"

import ProfileManager from "./components/ProfileManager"
import ProjectsManager from "./components/ProjectsManager"
import ExperienceManager from "./components/ExperienceManager"
import EducationManager from "./components/EducationManager"
import SkillsManager from "./components/SkillsManager"
import SocialLinksManager from "./components/SocialLinksManager"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const tabs = [
    { id: "profile", label: "Profile & CV", icon: User },
    { id: "projects", label: "Projects", icon: LayoutDashboard },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "links", label: "Social Links", icon: LinkIcon },
  ]

  return (
    <div className="flex h-[85vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-8">
        {activeTab === "profile" && <ProfileManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "experience" && <ExperienceManager />}
        {activeTab === "education" && <EducationManager />}
        {activeTab === "skills" && <SkillsManager />}
        {activeTab === "links" && <SocialLinksManager />}
      </div>
    </div>
  )
}
