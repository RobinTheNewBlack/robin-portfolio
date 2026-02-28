import { Box } from "@mui/material";
import Navbar from "@/components/layout/Navbar";
import IntroSection from "@/components/sections/IntroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import StartupSection from "@/components/sections/StartupSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingLines from "@/components/FloatingLines";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <FloatingLines
          linesGradient={["#76127d", "#2F4BC0", "#5b47f5"]}
          animationSpeed={1}
          interactive
          bendRadius={5}
          bendStrength={-0.5}
          mouseDamping={0.05}
          parallax
          parallaxStrength={0.2}
        />
      </div>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <IntroSection />
          <AboutSection />
          <TechStackSection />
          <ExperienceSection />
          <StartupSection />
          <ProjectSection />
          <CertificatesSection />
          <ContactSection />
        </main>
      </Box>
    </Box>
  );
}
