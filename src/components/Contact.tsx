import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Github, Linkedin, Twitter, Zap, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailTemplates = [
    {
      name: "Collaboration",
      icon: FileText,
      content: (name: string) => `Subject: Collaboration Opportunity\n\nHi [Your Name],\n\nMy name is ${name}, and I came across your impressive portfolio. I'm particularly interested in your work on [specific project].\n\nI'd love to discuss potential collaboration opportunities or partnership.\n\nBest regards,\n${name}`
    },
    {
      name: "Job Inquiry",
      icon: Mail,
      content: (name: string) => `Subject: Regarding Open Position\n\nHi [Your Name],\n\nI'm ${name}, and I found your portfolio while researching talented developers. Your expertise in [technology] aligns perfectly with what we're looking for.\n\nAre you open to discussing new opportunities?\n\nBest,\n${name}`
    },
    {
      name: "Feedback",
      icon: MessageSquare,
      content: (name: string) => `Subject: Portfolio Feedback\n\nHi [Your Name],\n\nI'm ${name}. Just wanted to say your portfolio is fantastic! The [specific project] really caught my attention.\n\nWould love to learn more about your development process.\n\nCheers,\n${name}`
    }
  ];

  const linkedinTemplates = [
    {
      name: "Professional",
      icon: Linkedin,
      content: (name: string) => `Hi [Your Name],\n\nI'm ${name}. I discovered your profile and was impressed by your work in [technology]. Your project on [specific work] is particularly interesting!\n\nI'd love to connect and potentially collaborate.\n\nBest regards,\n${name}`
    },
    {
      name: "Networking",
      icon: Linkedin,
      content: (name: string) => `Hello [Your Name]!\n\nMy name is ${name}. I'm building my network in the [industry] space and came across your profile.\n\nYour experience with [skill] is exactly what I'm looking to learn more about. Let's connect!\n\n${name}`
    },
    {
      name: "Mentorship",
      icon: Linkedin,
      content: (name: string) => `Hi [Your Name],\n\nI'm ${name}, and I'm really inspired by your career path. I'm particularly interested in [specific area].\n\nWould you be open to a quick chat? I'd love your advice.\n\nThank you,\n${name}`
    }
  ];

  const quickTemplates = [
    {
      name: "Casual Intro",
      icon: MessageSquare,
      content: (name: string) => `Hey! 👋\n\nI'm ${name}. Love your work! Especially the [project name] - super cool implementation.\n\nLet's chat sometime!`
    },
    {
      name: "Quick Connect",
      icon: Zap,
      content: (name: string) => `Hi there!\n\n${name} here. Quick note to say your portfolio is awesome! Would be great to connect.\n\nCheers! ✨`
    },
    {
      name: "Direct",
      icon: Mail,
      content: (name: string) => `Hello,\n\n${name} here. Impressed by your work. Available for a quick call this week?\n\nThanks!`
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<'email' | 'linkedin' | 'quick'>('email');

  const generateMessage = (template: { content: (name: string) => string }) => {
    const name = formData.name || "[Your Name]";
    const generatedMessage = template.content(name);
    setFormData({ ...formData, message: generatedMessage });
    toast.success("Template applied! Customize it as needed.");
  };

  const getCurrentTemplates = () => {
    switch(selectedCategory) {
      case 'email': return emailTemplates;
      case 'linkedin': return linkedinTemplates;
      case 'quick': return quickTemplates;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call backend Edge Function to save contact submission
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast.success(data.message || "Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:thakurdivyanshiii11@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/itsdivyaXhi" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/divyanshi-s11" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl font-bold text-center mb-16 text-gradient">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg glass-card glow-hover group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <Card className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground/90">Message Templates</label>
                  <Badge variant="secondary" className="text-xs font-mono">
                    <Zap className="w-3 h-3 mr-1" />
                    Quick Start
                  </Badge>
                </div>
                
                {/* Category Tabs */}
                <div className="flex gap-2 mb-3 p-1 rounded-lg bg-muted/50">
                  <Button
                    type="button"
                    variant={selectedCategory === 'email' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory('email')}
                    className="flex-1 text-xs font-mono"
                  >
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={selectedCategory === 'linkedin' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory('linkedin')}
                    className="flex-1 text-xs font-mono"
                  >
                    <Linkedin className="w-3 h-3 mr-1" />
                    LinkedIn
                  </Button>
                  <Button
                    type="button"
                    variant={selectedCategory === 'quick' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory('quick')}
                    className="flex-1 text-xs font-mono"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Quick
                  </Button>
                </div>

                {/* Template Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {getCurrentTemplates().map((template, idx) => (
                    <Button
                      key={idx}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateMessage(template)}
                      className="flex flex-col items-center gap-1 h-auto py-2 text-xs font-mono hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      <template.icon className="w-4 h-4" />
                      <span className="text-[10px]">{template.name}</span>
                    </Button>
                  ))}
                </div>

                <Textarea
                  placeholder="Your message will appear here... Click a template above to get started!"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={10}
                  className="bg-background/50 resize-none font-mono text-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <footer className="mt-20 text-center text-foreground/50">
        <p>© 2024 Divyanshi. Built with passion and React.</p>
      </footer>
    </section>
  );
};

export default Contact;
