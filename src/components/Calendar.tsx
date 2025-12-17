import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Filter, Plus, Edit2, Trash2, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import techCircuit from "@/assets/tech-circuit-1.png";
import techCode from "@/assets/tech-code-1.png";
import techChip from "@/assets/tech-chip-1.png";
import { supabase } from "@/integrations/supabase/client";


interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "hackathon" | "conference" | "workshop" | "meetup" | "contest";
  status: "upcoming" | "completed";
  feedback: string | null;
  image_url: string | null;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    type: "hackathon" as Event["type"],
    status: "upcoming" as Event["status"],
    feedback: "",
  });

  const images = [techCircuit, techCode, techChip];

  useEffect(() => {
    fetchEvents();
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast({
        title: "Error fetching events",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      type: formData.type,
      status: formData.status,
      feedback: formData.feedback || null,
    };

    if (editingEvent) {
      const { error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", editingEvent.id);

      if (error) {
        toast({
          title: "Error updating event",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Event updated successfully!" });
        fetchEvents();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("events").insert(eventData);

      if (error) {
        toast({
          title: "Error creating event",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Event created successfully!" });
        fetchEvents();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error deleting event",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Event deleted successfully!" });
      fetchEvents();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: "hackathon",
      status: "upcoming",
      feedback: "",
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      type: event.type,
      status: event.status,
      feedback: event.feedback || "",
    });
    setIsDialogOpen(true);
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  });

  const completedEvents = filteredEvents.filter((e) => e.status === "completed");
  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hackathon": return "text-primary";
      case "conference": return "text-secondary";
      case "workshop": return "text-accent";
      case "contest": return "text-primary";
      case "meetup": return "text-secondary";
      default: return "text-primary";
    }
  };

  return (
    <section id="calendar" className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary">Timeline</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-mono mb-4">
            <span className="text-gradient">Events & Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tracking my growth through hackathons, conferences, and tech competitions
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in">
          <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all">
            <div className="text-3xl font-bold text-primary mb-1">{events.length}</div>
            <div className="text-sm text-muted-foreground font-mono">Total Events</div>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all">
            <div className="text-3xl font-bold text-accent mb-1">{completedEvents.length}</div>
            <div className="text-sm text-muted-foreground font-mono">Completed</div>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all">
            <div className="text-3xl font-bold text-secondary mb-1">{upcomingEvents.length}</div>
            <div className="text-sm text-muted-foreground font-mono">Upcoming</div>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-all">
            <div className="text-3xl font-bold text-primary mb-1">{events.filter(e => e.type === 'hackathon').length}</div>
            <div className="text-sm text-muted-foreground font-mono">Hackathons</div>
          </div>
        </div>

        {/* Tech Images Banner */}
        <div className="relative mb-12 rounded-2xl overflow-hidden border border-border/50 animate-fade-in">
          <div className="flex">
            {images.map((img, idx) => (
              <div key={idx} className="flex-1 h-32 md:h-40 relative">
                <img 
                  src={img} 
                  alt={`Tech visual ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <span className="text-sm font-mono text-primary">// developer journey</span>
            <span className="text-xs text-muted-foreground">Building. Learning. Growing.</span>
          </div>
        </div>

        {/* Filter and Add Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <div className="flex gap-2">
              {["all", "completed", "upcoming"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f as typeof filter)}
                  className="font-mono"
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {isAuthenticated && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Event
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-mono">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select value={formData.type} onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                      <SelectItem value="contest">Contest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={formData.status} onValueChange={(value: Event["status"]) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.status === "completed" && (
                  <Textarea
                    placeholder="Your feedback & experience (optional)"
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    className="min-h-[100px]"
                  />
                )}
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEvent ? "Update" : "Create"} Event
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          )}
        </div>

        {/* Past Events Vlog Section */}
        {(filter === "all" || filter === "completed") && completedEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold font-mono mb-6 text-primary">
              <MessageSquare className="inline w-6 h-6 mr-2" />
              Past Events & Experiences
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {completedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${getTypeColor(event.type)} bg-current/10 mb-2`}>
                          {event.type}
                        </span>
                        <h4 className="text-xl font-bold font-mono text-foreground">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      {isAuthenticated && (
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openEditDialog(event)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3">{event.description}</p>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.feedback && (
                      <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/50">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                          <MessageSquare className="w-4 h-4" />
                          <span className="font-semibold text-sm">My Experience</span>
                        </div>
                        <p className="text-sm text-foreground italic">"{event.feedback}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events Timeline */}
        {(filter === "all" || filter === "upcoming") && upcomingEvents.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold font-mono mb-6 text-accent">
              <CalendarIcon className="inline w-6 h-6 mr-2" />
              Upcoming Events
            </h3>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${getTypeColor(event.type)} bg-current border-4 border-background shadow-[0_0_10px_currentColor]`}></div>
                      {index < upcomingEvents.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] group-hover:translate-x-2">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${getTypeColor(event.type)} bg-current/10 mb-2`}>
                              {event.type}
                            </span>
                            <h4 className="text-2xl font-bold font-mono text-foreground group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-primary">
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                            {isAuthenticated && (
                              <>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => openEditDialog(event)}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleDelete(event.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">No events found</p>
            <p className="text-sm text-muted-foreground mt-2">Add your first event to get started!</p>
          </div>
        )}

        {/* Terminal-style footer */}
        <div className="mt-12 p-4 bg-card border border-border rounded-lg font-mono text-sm animate-fade-in">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-primary">$</span>
            <span>events --filter={filter}</span>
            <span className="ml-auto text-accent">{filteredEvents.length} events found</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
