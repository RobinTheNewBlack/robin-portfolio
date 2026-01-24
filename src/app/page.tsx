import { Box } from "@mui/material";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PortfolioSection from "@/components/sections/PortfolioSection";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <PortfolioSection />

        {/* Contact Section Placeholder */}
        <Box
          id="contact"
          component="section"
          sx={{
            py: { xs: 8, md: 12 },
            textAlign: "center",
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
            <Box
              component="h2"
              className="text-gradient-blue"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Contact
            </Box>
            <Box component="p" sx={{ color: "text.secondary", mb: 4 }}>
              Get in touch with me for collaborations or opportunities.
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Box
                component="a"
                href="mailto:example@email.com"
                sx={{
                  px: 4,
                  py: 1.5,
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 50,
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Send Email
              </Box>
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
