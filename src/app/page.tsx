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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SkillsHighlight />
        <Projects />
        <Skills />
        <LeetCode />
        <GitHub />
        <Experience />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
