-- Create enum for event types
CREATE TYPE public.event_type AS ENUM (
  'hackathon',
  'conference',
  'workshop',
  'meetup',
  'contest'
);

-- Create enum for event status
CREATE TYPE public.event_status AS ENUM (
  'upcoming',
  'completed'
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type public.event_type NOT NULL,
  status public.event_status NOT NULL DEFAULT 'upcoming',
  feedback TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can read events
CREATE POLICY "Anyone can view events"
ON public.events
FOR SELECT
USING (true);

-- Auth users can manage events
CREATE POLICY "Authenticated users can insert events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
ON public.events
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete events"
ON public.events
FOR DELETE
TO authenticated
USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_events_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_events_updated_at_column();
