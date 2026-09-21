import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsHighlight from "@/components/SkillsHighlight";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import LeetCode from "@/components/LeetCode";
import GitHub from "@/components/GitHub";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0; // Disable caching so admin edits appear instantly

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch data with error handling (graceful fallback if keys are missing)
  let profile = null;
  let projects = [];
  let experience = [];
  let education = [];
  let skills = [];
  let socialLinks = [];

  try {
    const [profileRes, projectsRes, experienceRes, educationRes, skillsRes, linksRes] = await Promise.all([
      supabase.from("profile").select("*").single(),
      supabase.from("projects").select("*").order("order_index", { ascending: true }),
      supabase.from("experience").select("*").order("order_index", { ascending: true }),
      supabase.from("education").select("*").order("order_index", { ascending: true }),
      supabase.from("skills").select("*").order("order_index", { ascending: true }),
      supabase.from("social_links").select("*").order("order_index", { ascending: true }),
    ]);

    profile = profileRes.data;
    projects = projectsRes.data || [];
    experience = experienceRes.data || [];
    education = educationRes.data || [];
    skills = skillsRes.data || [];
    socialLinks = linksRes.data || [];
  } catch (e) {
    console.error("Supabase connection error. Fallback to static UI if needed.", e);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} socialLinks={socialLinks} />
        <SkillsHighlight />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <LeetCode />
        <GitHub />
        <Experience experience={experience} />
        <Education education={education} />
        <About profile={profile} />
        <Contact socialLinks={socialLinks} email={profile?.email} />
      </main>
      <Footer socialLinks={socialLinks} profile={profile} />
    </>
  );
}
