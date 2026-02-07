import { Box } from "@mui/material";
import Navbar from "@/components/layout/Navbar";
import IntroSection from "@/components/sections/IntroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ContactSection from "@/components/sections/ContactSection";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", position: "relative" }}>
      <BackgroundOrbs />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <IntroSection />
          <AboutSection />
          <TechStackSection />
          <ExperienceSection />
          <ProjectSection />
          <CertificatesSection />
          <ContactSection />
        </main>
      </Box>
    </Box>
  );
}
