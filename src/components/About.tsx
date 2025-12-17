import { Card } from "@/components/ui/card";
import { GraduationCap, Code2, Briefcase } from "lucide-react";

const About = () => {
  const skills = [
    { name: "MongoDB", level: 88 },
    { name: "Express.js", level: 90 },
    { name: "React.js", level: 92 },
    { name: "Node.js", level: 90 },
    { name: "JavaScript/TypeScript", level: 88 },
    { name: "RESTful APIs", level: 85 },
    { name: "Git & GitHub", level: 87 },
    { name: "Redux/State Management", level: 82 },
  ];

  const timeline = [
    {
      icon: GraduationCap,
      year: "2024-2028",
      title: "Bachelor's in Computer Science",
      description: "GSSS Institue of Engineering and Technology for Women",
    },
    {
      icon: Briefcase,
      year: "2024-Present",
      title: "MERN Stack Developer",
      description: "Building full-stack applications with MongoDB, Express, React & Node.js",
    },
    {
      icon: Code2,
      year: "2025-Present",
      title: "Google Developers Group (Core Member)",
      description: "On Campus • Organizing, Devfest,tech events and workshops",
    },
    {
      icon: Code2,
      year: "2025-Present",
      title: "Samsung Innovation Campus",
      description: "Selected as Contributor and leaner for  development practices",
    },
    {
      icon: Code2,
      year: "2025-Present",
      title: "Student Placement Coordinator",
      description: "at GSSS Institue of Engineering and  Technology for Women,Mysuru",
    },
    // {
    //   icon: Code2,
    //   year: "Upcoming  Step Intern",
    //   title: "Google",
    //   description: "highly Competative",
    // },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a passionate MERN Stack Developer specializing in building robust, 
              scalable full-stack web applications using MongoDB, Express.js, React.js, 
              and Node.js. I thrive on creating seamless user experiences backed by 
              powerful server-side logic and efficient database management.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              As a Google Developer Group Core Member and Samsung Innovation Campus 
              Student, I'm constantly exploring cutting-edge technologies and 
              sharing knowledge with the developer community. Currently serving as the Student Placement Coordinator, connecting students with industry opportunities.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Skills</h3>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground/90">{skill.name}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-3xl font-semibold mb-8 text-center">Journey</h3>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <Card
              key={index}
              className="glass-card p-6 glow-hover flex gap-6 items-start"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-mono text-primary">{item.year}</span>
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                </div>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
