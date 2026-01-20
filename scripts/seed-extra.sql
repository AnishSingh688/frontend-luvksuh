-- Add extra items to test Carousel

INSERT INTO "Program" (id, title, category, description, "createdAt", "updatedAt")
VALUES 
(
  'prog004',
  'Women Empowerment',
  'Livelihood',
  'Supporting women through self-help groups and artisanal training.',
  NOW(),
  NOW()
),
(
  'prog005',
  'Digital Literacy',
  'Education',
  'Teaching basic computer skills to rural youth and elders.',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO "Event" (id, title, date, location, description, "createdAt", "updatedAt")
VALUES 
(
  'event004',
  'Annual General Meeting',
  'Dec 20, 2025',
  'Community Hall',
  'Reviewing yearly progress and electing new board members.',
  NOW(),
  NOW()
),
(
  'event005',
  'Blood Donation Drive',
  'Jan 15, 2026',
  'City Hospital',
  'Emergency blood donation camp in partnership with Red Cross.',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
