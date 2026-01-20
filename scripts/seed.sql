-- Seed data for Luv Kush Pratisthan database
-- Run this in your PostgreSQL database

-- Insert Admin User
-- Password: admin123 (hashed with bcrypt)
INSERT INTO "Admin" (id, email, password, name, "createdAt")
VALUES (
  'cm4xadmin001',
  'admin@luvkushpratisthan.org',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5agyWY5qyNQTy',
  'Admin User',
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert Sample Programs
INSERT INTO "Program" (id, title, category, description, "createdAt", "updatedAt")
VALUES 
(
  'prog001',
  'Scholarships',
  'Education',
  'Support for meritorious and needy students across grades and colleges.',
  NOW(),
  NOW()
),
(
  'prog002',
  'Health Camps',
  'Health',
  'Preventive screenings, maternal care awareness, and nutrition guidance.',
  NOW(),
  NOW()
),
(
  'prog003',
  'Skills & Jobs',
  'Livelihood',
  'Vocational training, micro-entrepreneurship, and placement help.',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert Sample Events
INSERT INTO "Event" (id, title, date, location, description, "createdAt", "updatedAt")
VALUES 
(
  'event001',
  'Education Scholarship Drive',
  'Sep 28, 2025',
  'Biratnagar',
  'Application counseling, document help, and merit awards announcements.',
  NOW(),
  NOW()
),
(
  'event002',
  'Community Health Camp',
  'Oct 11, 2025',
  'Biratnagar',
  'General check-ups, maternal health, and nutrition awareness.',
  NOW(),
  NOW()
),
(
  'event003',
  'Cultural Festival & Sports',
  'Nov 15, 2025',
  'Biratnagar',
  'Celebrating heritage with music, art, and youth sports events.',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
