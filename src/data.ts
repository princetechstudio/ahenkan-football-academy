const GEN = "https://image.qwenlm.ai/generated-images";

export const IMG = {
  // Real assets from ahenkanfootballacademy.com
  logo: "https://ahenkanfootballacademy.com/logo.jpg",
  flag: "https://ahenkanfootballacademy.com/Flag.jpg",
  team: "https://ahenkanfootballacademy.com/team_staff.jpg",
  president: "https://ahenkanfootballacademy.com/Odi-ahenkan.jpg",
  patron: "https://ahenkanfootballacademy.com/Okyen-hene.jpg",
  fundraiser: "https://ahenkanfootballacademy.com/thumbnail1.png",
  // Editorial photography
  hero: `${GEN}/e5c91cfd-8120-49bb-aeab-4ab1ad112f48/_result.png`,
  drill: `${GEN}/2d1c9046-6c7c-4e0f-bbfa-f3e4ee4cf53c/_result.png`,
  keeper: `${GEN}/8fa72442-1671-42a1-b319-6aa9ee3e19f5/_result.png`,
  pitch: `${GEN}/7c88997c-cf4b-4b24-bc9b-b3a7f2bfb2ae/_result.png`,
  match: `${GEN}/20c150da-293f-4a63-a428-e73fc37e9789/_result.png`,
};

export const CONTACT = {
  phone: "+233 24 471 2689",
  phoneHref: "tel:+233244712689",
  altPhone: "0244 868 592",
  email: "info@ahenkanacademy.com",
  address: "Adeiso, Upper West Akyem",
  region: "Eastern Region, Ghana",
  facebook: "https://www.facebook.com/p/Ahenkan-Football-Academy-61571776081864/",
  site: "https://ahenkanfootballacademy.com",
};

export const NAV = [
  { label: "The Academy", href: "#academy" },
  { label: "Programs", href: "#programs" },
  { label: "Leadership", href: "#leadership" },
  { label: "Community", href: "#community" },
  { label: "News", href: "#news" },
];

export const TICKER = [
  "Talent",
  "Wisdom",
  "Knowledge",
  "Discipline",
  "Community",
  "Excellence",
  "Developing Ghana's Future Stars",
];

export const STATS = [
  { value: 50, suffix: "+", label: "Young Players" },
  { value: 5, suffix: "+", label: "Expert Coaches" },
  { value: 100, suffix: "%", label: "Dedication" },
  { value: 2025, suffix: "", label: "Founded in Adeiso" },
];

export const WHY: { title: string; desc: string; icon: string }[] = [
  {
    title: "Academic Excellence",
    desc: "We ensure our players maintain high academic standards alongside their football training, preparing them for success in all areas of life.",
    icon: "academic",
  },
  {
    title: "Character Development",
    desc: "Building strong character, leadership skills, and moral values that will serve our players throughout their lives.",
    icon: "character",
  },
  {
    title: "Safe Environment",
    desc: "Providing a secure, supportive environment where young players can grow, learn, and develop their potential safely.",
    icon: "safe",
  },
  {
    title: "Flexible Training",
    desc: "Training schedules that accommodate school hours and family commitments, ensuring balanced development.",
    icon: "flexible",
  },
  {
    title: "Community Focus",
    desc: "Strong emphasis on community involvement and giving back, teaching players the importance of social responsibility.",
    icon: "community",
  },
  {
    title: "Competitive Edge",
    desc: "Regular participation in local and regional tournaments to develop competitive skills and match experience.",
    icon: "competitive",
  },
  {
    title: "Life Skills",
    desc: "Teaching essential life skills including time management, teamwork, communication, and problem-solving.",
    icon: "life",
  },
  {
    title: "Global Perspective",
    desc: "Exposure to international football standards and opportunities for players to compete at higher levels.",
    icon: "global",
  },
];

export const LEADERS = [
  {
    name: "Odi – Ahenkan Kwame Yeboah",
    role: "President",
    img: IMG.president,
    bio: "Leading the academy with vision and dedication, ensuring our players receive the best opportunities for growth both on and off the field.",
    note: "Founder's Vision",
  },
  {
    name: "His Royal Majesty Osagyefo Amoatia Ofori Payin",
    role: "Okyenhene · Life Patron",
    img: IMG.patron,
    bio: "Providing guidance and support as the Life Patron, embodying the traditional values and cultural heritage that define our academy's foundation.",
    note: "Royal Patronage",
  },
];

export const PROGRAMS = [
  {
    id: "youth",
    no: "01",
    name: "Youth Development Programs",
    tag: "Core Academy",
    ages: "Ages 6–17",
    desc: "Our flagship pathway — premier youth development built on daily technical training, tactical education and schooling support, so every player grows as a footballer and a student.",
    focus: [
      "Technical & tactical development in age-group squads",
      "Academic support scheduled around every session",
      "Local & regional tournament match experience",
      "Mentorship from licensed coaches, 9am – 3pm daily",
    ],
    meta: [
      ["Venue", "Ahenkan Grounds, Adeiso"],
      ["Sessions", "Mon – Sat · 09:00 – 15:00"],
      ["Schooling", "Lessons built into the week"],
      ["Intake", "Open all year round"],
    ],
  },
  {
    id: "elite",
    no: "02",
    name: "Elite Training Camps",
    tag: "Performance",
    ages: "Ages 13–18",
    desc: "High-intensity camps for our most advanced players — double sessions, match analysis and exposure opportunities that prepare athletes for international football standards.",
    focus: [
      "Double-session blocks with recovery & nutrition",
      "Video analysis and individual development plans",
      "Showcase matches in front of scouts & partner clubs",
      "Leadership training for future captains",
    ],
    meta: [
      ["Format", "Day & residential camps"],
      ["Duration", "2-week intensive blocks"],
      ["Exposure", "Scouts & partner clubs"],
      ["Entry", "By trial · GH₵200"],
    ],
  },
  {
    id: "community",
    no: "03",
    name: "Community Outreach",
    tag: "Giving Back",
    ages: "All Ages",
    desc: "Football for everyone — free open days, school coaching visits across Upper West Akyem and community events like our fundraising ceremony that is expanding our facilities for the next generation.",
    focus: [
      "Free monthly open training days for all children",
      "Coaching visits to schools across the Akyem area",
      "Facility expansion drive — Building Dreams Together",
      "Social responsibility programmes led by our players",
    ],
    meta: [
      ["Open Days", "First Saturday monthly · Free"],
      ["Schools", "Visits across Upper West Akyem"],
      ["Fundraising", "Facility expansion underway"],
      ["Motto", "“Building Dreams Together”"],
    ],
  },
];

export const SCHEDULE = [
  {
    day: "Mon",
    sessions: [
      { time: "09:00", program: "Ball Mastery", pitch: "Main Ground" },
      { time: "13:00", program: "Small-Sided Games", pitch: "Main Ground" },
    ],
  },
  {
    day: "Tue",
    sessions: [
      { time: "09:00", program: "Physical Foundations", pitch: "Training Pitch" },
      { time: "13:00", program: "Position Play", pitch: "Main Ground" },
    ],
  },
  {
    day: "Wed",
    note: "Study",
    sessions: [
      { time: "09:00", program: "School Support", pitch: "Academy Hall" },
      { time: "13:00", program: "Team Tactics", pitch: "Main Ground" },
    ],
  },
  {
    day: "Thu",
    sessions: [
      { time: "09:00", program: "Finishing & Striking", pitch: "Main Ground" },
      { time: "13:00", program: "Match Simulation", pitch: "Main Ground" },
    ],
  },
  {
    day: "Fri",
    sessions: [
      { time: "09:00", program: "Set Pieces & GK Unit", pitch: "Training Pitch" },
      { time: "13:00", program: "Recovery & Mobility", pitch: "Training Pitch" },
    ],
  },
  {
    day: "Sat",
    note: "Matchday",
    sessions: [
      { time: "09:00", program: "Team Activation", pitch: "Home or Away" },
      { time: "13:00", program: "League Fixtures", pitch: "Local & Regional" },
    ],
  },
];

export const STEPS = [
  {
    no: "01",
    title: "Apply Online",
    desc: "Complete the registration form below, or call our admissions team on +233 24 471 2689 and we will guide you through every step.",
  },
  {
    no: "02",
    title: "Trial Day",
    desc: "Join an open trial at our Adeiso grounds — 9am to 3pm. Registration fee is GH₵200. Bring your boots, your kit and your dream.",
  },
  {
    no: "03",
    title: "Join the Family",
    desc: "Successful players are placed into an age-group squad with structured training, schooling support and dedicated mentorship.",
  },
];

export const NEWS = [
  {
    title: "Ahenkan Academy Fundraising Ceremony: Building Dreams Together",
    cat: "Community",
    date: "Jan 19, 2024",
    img: IMG.fundraiser,
    featured: true,
    excerpt:
      "A memorable evening of community support as Ahenkan Football Academy successfully raised funds to expand our facilities and provide more opportunities for young Ghanaian footballers.",
    full: "A memorable evening of community support as Ahenkan Football Academy successfully raised funds to expand our facilities and provide more opportunities for young Ghanaian footballers. Under the patronage of His Royal Majesty Osagyefo Amoatia Ofori Payin, families, friends and supporters from across Upper West Akyem came together for a night of celebration and generosity. Every cedi raised goes directly into new training facilities, equipment and scholarship places — because when the community builds together, dreams grow together.",
  },
  {
    title: "The Future of Ghanaian Football: Developing Young Talent",
    cat: "Development",
    date: "Jan 14, 2024",
    img: IMG.match,
    featured: false,
    excerpt:
      "How structured youth development — from ball mastery to tactical intelligence — is shaping the next generation of Ghanaian champions right here in Adeiso.",
    full: "Ghana has never lacked talent; what talent needs is a pathway. At Ahenkan, our youth development programs combine daily technical repetition, age-appropriate tactical education and real match experience in local and regional tournaments. The result is players who are not only skilful, but intelligent, disciplined and ready for every level the game can offer.",
  },
  {
    title: "Nutrition and Performance: Fueling Champions",
    cat: "Health & Wellness",
    date: "Jan 9, 2024",
    img: IMG.drill,
    featured: false,
    excerpt:
      "What our young athletes eat, drink and how they recover — inside the academy's approach to nutrition, hydration and rest for growing champions.",
    full: "Champions are built as much in the kitchen as on the pitch. Our players learn the fundamentals of fueling — balanced local meals, smart hydration before and after sessions, and the discipline of rest and recovery. It is another example of how Ahenkan prepares young people for success in all aspects of life, not just football.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Ahenkan Academy has transformed my son's football skills and character. The coaches are dedicated and the training is world-class. I'm proud to see him grow both as a player and a person.",
    name: "Kwame Asante",
    role: "Parent of U-15 Player",
    initials: "KA",
  },
  {
    quote:
      "The academy's commitment to community development is remarkable. They're not just training footballers, they're building future leaders who will make Ghana proud.",
    name: "Sarah Mensah",
    role: "Community Leader",
    initials: "SM",
  },
  {
    quote:
      "The holistic approach at Ahenkan Academy is exceptional. They understand that mental strength is as important as physical skills in developing champions.",
    name: "Dr. Kofi Boateng",
    role: "Sports Psychologist",
    initials: "DKB",
  },
  {
    quote:
      "Training at Ahenkan Academy prepared me for success both on and off the field. The values I learned here continue to guide me in my professional career.",
    name: "Ama Serwaa",
    role: "Former Player",
    initials: "AS",
  },
];

export const SITE_LINKS = [
  { label: "About Us", href: "https://ahenkanfootballacademy.com/about" },
  { label: "Programs", href: "https://ahenkanfootballacademy.com/programs" },
  { label: "Coaching Staff", href: "https://ahenkanfootballacademy.com/staff" },
  { label: "Admissions", href: "https://ahenkanfootballacademy.com/admissions" },
  { label: "Blog", href: "https://ahenkanfootballacademy.com/blog" },
  { label: "Contact", href: "https://ahenkanfootballacademy.com/contact" },
];
