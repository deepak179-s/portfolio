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
    <div className="flex flex-col md:flex-row h-[85vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col shrink-0">
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span className="hidden sm:inline">Admin Panel</span>
            <span className="sm:hidden">Admin</span>
          </h2>
          <div className="md:hidden">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <nav className="p-3 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                {tab.label}
              </button>
            )
          })}
        </nav>
        <div className="hidden md:block mt-auto p-4 border-t border-slate-200 dark:border-slate-800">
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
      <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-4 md:p-8">
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
