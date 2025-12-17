import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import ShakthiImg from "@/assets/Shakthi.png";
import AQIImg from "@/assets/AQI.png";
import MineImg from "@/assets/Mine.png";
import DivsImg from "@/assets/divs.png";


const Projects = () => {
  const projects = [
    {
      title: "Air Quality Index (AQI) Monitoring System",
      description: "A web application that monitors and displays air quality levels in real time.",
      features: [
        "Real-time Air Quality Index (AQI) monitoring with health-based severity indicators",
        "Detailed pollutant analysis including PM2.5, PM10, NO₂, O₃, and CO",
        "Health recommendations dynamically generated based on current AQI levels",
        "Short-term AQI forecasting with 6-hour predictive insights",
        "Interactive pollutant trend charts with 24h, 48h, and 7-day views",
        "Zone-wise air quality rankings and hotspot alerts across Delhi NCR",
        "Zonal pollution map visualizing spatial distribution of air quality",
        "Email and SMS-based pollution alert subscription system",
        "End-to-end data processing pipeline with feature engineering and spatial alignment",
        "Machine learning–based forecasting with explainability for key pollution drivers",
        "Integration of satellite and ground data sources (Sentinel-5P, CPCB, ERA5, AERONET)",
      ],
      tech: ["React", "D3.js", "Express", "Satellite & Open Data APIs"],
      link: "https://68efa7aeb1ebe86fbf49ec0e--lovely-beignet-af72b7.netlify.app/",
      image: AQIImg,
    },
    {
      title: "MINE_MITHRA",
      description: "Smart Safety app for Mine Workers",
      features: [
        "Smart safety companion application designed specifically for mine workers",
        "Daily safety focus section highlighting important PPE and safety reminders",
        "Interactive daily safety checklist to track and complete essential safety tasks",
        "Safety training section with educational videos on PPE usage, emergency response, and hazard management",
        "Hazard reporting system allowing workers to report incidents with location details and descriptions",
        "Option to attach photos or videos while reporting hazards for better clarity",
        "Dashboard displaying key safety metrics such as days without incidents, safety compliance, and incident rate",
        "Quick access to safety guidelines and protocols for on-site reference",
        "User-friendly and mobile-first interface optimized for on-field usage",
        "Clean, accessible UI focused on clarity and ease of use in safety-critical environments",
      ],
      tech: ["Next.js", "React", "REST APIs"],
      link: "https://68ef97a33fb3ef35cd61de15--nimble-sorbet-3c8142.netlify.app/",
      image: MineImg,
    },
    {
      title: "My_Portfolio",
      description:
        "A modern personal portfolio designed to highlight projects and skills with smooth UI and responsive layout.",
      features: [
        "Displays all upcoming events I am planning to participate in through a dedicated calendar section",
        "Showcases past events and activities I have participated in with relevant details",
        "Complete project showcase section with proper descriptions, tech stack, and live demo links",
        "Dedicated achievements section highlighting milestones and accomplishments from my engineering journey",
        "Structured representation of my engineering journey and learning progress till date",
        "Smart contact section allowing users to connect via Email, GitHub, and LinkedIn with minimal input",
        "Automated contact feature with predefined message templates enabling users to send messages without typing",
        "Multiple default message options such as collaboration, job inquiry, feedback, and networking",
        "Flexibility for users to customize the message or write their own if needed",
        "Clean, responsive, and user-friendly interface built for seamless interaction across devices",
      ],
      tech: ["React", "TypeScript", "TailwindCSS", "Responsive Design", "UI/UX Animations"],
      image: DivsImg,
    },
    {
      title: "Shakthi - Ayurvedic Hair Care",
      description:
        "E-commerce platform for natural hair care products with Ayurvedic formulations",
      features: [
        "Premium product showcase for Ayurvedic hair care oils with multiple size variants",
        "Clean and responsive UI with smooth navigation",
        "Ingredient-focused sections explaining Ayurvedic herbs",
        "Festive offers and bundle deals",
        "Customer testimonials section",
        "Static shopping cart UI to demonstrate e-commerce flow",
      ],
      tech: ["React", "TailwindCSS", "Netlify", "Responsive Design"],
      link: "https://68ea125fdcba6c9aa471a52a--superlative-chaja-e3fa39.netlify.app/",
      image: ShakthiImg,
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>

                {/* ✅ CONTEXT INDICATOR (ONLY ADDITION) */}
                {project.title === "My_Portfolio" && (
                  <p className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    This Portfolio (currently viewing)
                  </p>
                )}

                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                {/* FEATURES */}
                <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}
                {project.link ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Currently Viewing
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
