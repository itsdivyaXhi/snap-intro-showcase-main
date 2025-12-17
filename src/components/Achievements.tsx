import { Card } from "@/components/ui/card";
import { Trophy, Award, Star, Target } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Award,
      title: "Google Developer Group On Campus",
      description:
        "Core Member of GDG On Campus, contributing to developer community growth",
      color: "from-primary to-cyan-500",
    },
    {
      icon: Star,
      title: "Samsung Innovation on Campus",
      description: "Selected for Samsung Innovation on Campus program",
      color: "from-secondary to-pink-500",
    },
    {
      icon: Target,
      title: "Student Placement Coordinator",
      description:
        "Leading placement coordination and career guidance initiatives",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      title: "Code.Enclave Winner",
      description:
        "Won Code.Enclave event in collaboration with MBA department",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Trophy,
      title: "Hackacelerate Hackathon Finalist",
      description: "Secured finalist position at Hackacelerate Hackathon",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "SIH Semi-Finalist",
      description: "Reached semi-finals at Smart India Hackathon",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "My_Portfolio",
      description:
        "A modern personal portfolio designed to highlight projects and skills with smooth UI and responsive layout.",
      features: [
        "Displays upcoming and past events",
        "Complete project showcase with demo links",
        "Achievements and engineering journey sections",
        "Smart contact section with predefined messages",
      ],
    },
  ];

  return (
    <section id="achievements" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="glass-card p-8 glow-hover group">
              {/* ✅ FIXED PART — SAFE CONDITIONAL */}
              {achievement.icon && achievement.color ? (
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} p-4 mb-6 group-hover:scale-110 transition-transform`}
                >
                  <achievement.icon className="w-full h-full text-white" />
                </div>
              ) : null}

              <h3 className="text-2xl font-bold mb-3">
                {achievement.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {achievement.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
