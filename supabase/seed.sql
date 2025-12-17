-- CLEAR ALL OLD EVENTS
DELETE FROM public.events;

-- INSERT YOUR REAL PAST EVENTS (DESCENDING ORDER)
INSERT INTO public.events
(title, date, time, location, description, type, status)
VALUES
('DevFest 2025', '2025-11-22', 'Full Day', 'GSSSIETW Campus',
 'Organised DevFest in our campus', 'conference', 'completed'),

('Hackcelerate 2', '2025-11-20', 'Hackathon Duration', 'India',
 'Participated in Hackcelerate 2', 'hackathon', 'completed'),

('Talk on Data Center', '2025-11-08', 'Talk Duration', 'Mysuru',
 'Attended talk on Data Center from Vigyaan Lab, Mysuru', 'meetup', 'completed'),

('Smart India Hackathon (SIH)', '2025-10-15', 'Full Day', 'India',
 'Participated in Smart India Hackathon', 'hackathon', 'completed'),

('Code & Conclave', '2025-10-11', 'Event Hours', 'GSSSIETW Campus',
 'Coding event organised with MBA department', 'contest', 'completed'),

('Ideathon', '2025-10-05', 'Event Hours', 'GSSSIETW Campus',
 'Participated in Ideathon at GSSSIETW', 'contest', 'completed'),

('GDG Study Jam Session', '2025-09-23', 'Session Hours', 'GSSSIETW Campus',
 'Organised Study Jam session as GDG core member', 'workshop', 'completed'),

('From Python to Prediction Workshop', '2025-09-08', '3 Days', 'GSSSIETW Campus',
 'Workshop on From Python to Prediction', 'workshop', 'completed