export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/e5c91cfd-8120-49bb-aeab-4ab1ad112f48/_result.png",
  drill: "https://image.qwenlm.ai/generated-images/2d1c9046-6c7c-4e0f-bbfa-f3e4ee4cf53c/_result.png",
  keeper: "https://image.qwenlm.ai/generated-images/8fa72442-1671-42a1-b319-6aa9ee3e19f5/_result.png",
  coach1: "https://image.qwenlm.ai/generated-images/a68f31d2-69dd-4bcf-b053-7bec0c20c873/_result.png",
  coach2: "https://image.qwenlm.ai/generated-images/f52f5a33-ab09-4932-876f-18fc0c7228b2/_result.png",
  coach3: "https://image.qwenlm.ai/generated-images/cde1429c-b66f-417d-b5ef-e839601d01ba/_result.png",
  pitch: "https://image.qwenlm.ai/generated-images/7c88997c-cf4b-4b24-bc9b-b3a7f2bfb2ae/_result.png",
  match: "https://image.qwenlm.ai/generated-images/20c150da-293f-4a63-a428-e73fc37e9789/_result.png",
};

export const NAV = [
  { label: "The Way", href: "#way" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Coaches", href: "#coaches" },
  { label: "Results", href: "#results" },
  { label: "News", href: "#news" },
];

export const STATS = [
  { value: 340, suffix: "+", label: "Active players", note: "across six age groups" },
  { value: 27, suffix: "", label: "Pro contracts", note: "Ghana & abroad since 2014" },
  { value: 14, suffix: "", label: "National call-ups", note: "Black Starlets & maidens" },
  { value: 9, suffix: "", label: "Licensed coaches", note: "CAF / GFA badge holders" },
];

export const PILLARS = [
  {
    no: "01",
    icon: "target",
    title: "Technical Excellence",
    body: "Daily ball-mastery, 1v1 dominance and positional play taught the Ahenkan way — 4,000+ touches a week before a player turns thirteen.",
  },
  {
    no: "02",
    icon: "book",
    title: "Education First",
    body: "Every scholar is a student. Homework clubs, SHS placement support and a strict 'no pass, no play' rule sit beside every training block.",
  },
  {
    no: "03",
    icon: "shield",
    title: "Character & Culture",
    body: "Discipline, humility and brotherhood. Captains rotate monthly, seniors mentor juniors, and every squad cleans its own pitch after sessions.",
  },
  {
    no: "04",
    icon: "eye",
    title: "Real Exposure",
    body: "GFA youth leagues, international showcases and a verified video portfolio for every U17 player — scouted on merit, never on payment.",
  },
];

export const PROGRAMS = [
  {
    id: "grassroots",
    no: "01",
    name: "Grassroots",
    ages: "Ages 6–9",
    tag: "Foundation",
    desc: "Where the miracle starts. Fun-first sessions built on ball mastery, coordination and falling in love with the game — small groups, big smiles.",
    meta: [
      ["Sessions", "Mon · Wed · Fri, 15:30"],
      ["Venue", "Mini-pitch, Ahenkan Grounds"],
      ["Squad size", "14 per coach"],
      ["Monthly fee", "GH₵ 150"],
    ],
    focus: ["Ball mastery & two-footedness", "Agility and movement ABCs", "Small-sided games 3v3–5v5"],
  },
  {
    id: "development",
    no: "02",
    name: "Development",
    ages: "Ages 10–13",
    tag: "Learning to train",
    desc: "The technical core of the academy. Positional foundations, structured rondo culture and game intelligence developed through deliberate practice.",
    meta: [
      ["Sessions", "Mon–Thu, 15:30–17:30"],
      ["Venue", "Pitch A & B, Ahenkan Grounds"],
      ["Squad size", "18 per squad"],
      ["Monthly fee", "GH₵ 200"],
    ],
    focus: ["Rondos & positional play", "First touch under pressure", "GFA Colts league fixtures"],
  },
  {
    id: "youth",
    no: "03",
    name: "Youth Competitive",
    ages: "Ages 14–17",
    tag: "Learning to compete",
    desc: "GFA Greater Accra Youth League squads with full performance support — video analysis, strength & conditioning and matchday routine.",
    meta: [
      ["Sessions", "Mon–Fri, 16:00 + Sat matchday"],
      ["Venue", "Pitch A, Ahenkan Grounds"],
      ["Squad size", "22 per squad"],
      ["Monthly fee", "GH₵ 250"],
    ],
    focus: ["11v11 tactical periodisation", "Individual video review", "League & cup competition"],
  },
  {
    id: "elite",
    no: "04",
    name: "Elite Pathway",
    ages: "Ages 18–21",
    tag: "Learning to win",
    desc: "An invitational bridge to the professional game: pro-standard training loads, trial placement with Ghana Premier League and foreign clubs, and agent-free career guidance.",
    meta: [
      ["Sessions", "2× daily, Mon–Sat"],
      ["Venue", "Ahenkan Grounds + gym partner"],
      ["Squad size", "16 by invitation"],
      ["Monthly fee", "Scholarship / waived"],
    ],
    focus: ["GPL & overseas trial placement", "Performance analytics portfolio", "Nutrition & lifestyle mentoring"],
  },
  {
    id: "queens",
    no: "05",
    name: "Ahenkan Queens",
    ages: "Girls 8–17",
    tag: "Women's program",
    desc: "Our fastest-growing program. Dedicated female coaching staff, GWPL pathway links and the same standards — and same pitch time — as the boys.",
    meta: [
      ["Sessions", "Tue · Thu · Sat"],
      ["Venue", "Pitch B, Ahenkan Grounds"],
      ["Squad size", "18 per squad"],
      ["Monthly fee", "GH₵ 150"],
    ],
    focus: ["GWPL Colts competition", "Girls-only development groups", "Female mentorship network"],
  },
  {
    id: "gk",
    no: "06",
    name: "Goalkeeping Academy",
    ages: "Ages 10–19",
    tag: "Specialist",
    desc: "Twice-weekly specialist unit under Daniel Ofori — shot-stopping, distribution and the mental craft of the loneliest position on the pitch.",
    meta: [
      ["Sessions", "Wed & Sat, 07:00"],
      ["Venue", "Pitch A, Ahenkan Grounds"],
      ["Squad size", "6 keepers per coach"],
      ["Monthly fee", "GH₵ 100 add-on"],
    ],
    focus: ["Footwork & set positioning", "Distribution under press", "Match psychology routines"],
  },
];

export type Session = { time: string; program: string; pitch: string };
export const SCHEDULE: { day: string; note?: string; sessions: Session[] }[] = [
  {
    day: "Monday",
    sessions: [
      { time: "15:30", program: "Grassroots", pitch: "Mini-pitch" },
      { time: "15:30", program: "Development", pitch: "Pitch B" },
      { time: "16:00", program: "Youth Comp.", pitch: "Pitch A" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "15:30", program: "Development", pitch: "Pitch B" },
      { time: "16:00", program: "Youth Comp.", pitch: "Pitch A" },
      { time: "16:00", program: "Queens", pitch: "Pitch B" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "07:00", program: "Goalkeepers", pitch: "Pitch A" },
      { time: "15:30", program: "Grassroots", pitch: "Mini-pitch" },
      { time: "16:00", program: "Youth Comp.", pitch: "Pitch A" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "15:30", program: "Development", pitch: "Pitch B" },
      { time: "16:00", program: "Youth Comp.", pitch: "Pitch A" },
      { time: "16:00", program: "Queens", pitch: "Pitch B" },
    ],
  },
  {
    day: "Friday",
    sessions: [
      { time: "15:30", program: "Grassroots", pitch: "Mini-pitch" },
      { time: "16:00", program: "Youth Comp.", pitch: "Pitch A" },
      { time: "17:30", program: "Elite", pitch: "Pitch A" },
    ],
  },
  {
    day: "Saturday",
    note: "Matchday",
    sessions: [
      { time: "07:00", program: "Goalkeepers", pitch: "Pitch A" },
      { time: "08:00", program: "Queens", pitch: "Pitch B" },
      { time: "10:00", program: "Youth Comp.", pitch: "League fixture" },
    ],
  },
];

export const COACHES = [
  {
    name: "Kwame Mensah",
    role: "Head of Coaching",
    badge: "CAF A Licence",
    img: IMG.coach1,
    bio: "Former Asante Kotoko midfielder with 18 years on the touchline. Kwame built the Ahenkan curriculum from a chalkboard in 2014 and still takes the U17s every Saturday.",
    creds: ["Ex-Asante Kotoko", "GFA Technical Committee", "340+ players developed"],
  },
  {
    name: "Abena Serwaa",
    role: "Head of Women's Program",
    badge: "GFA Licence A",
    img: IMG.coach2,
    bio: "Ex-Black Queens winger who founded the Ahenkan Queens in 2019. Her U15 side reached the national GWPL Colts semifinals in their second season.",
    creds: ["Ex-Black Queens", "GWPL Colts semifinalist", "40+ girls in pathway"],
  },
  {
    name: "Daniel Ofori",
    role: "Goalkeeping Coach",
    badge: "GFA GK Diploma",
    img: IMG.coach3,
    bio: "Twelve seasons between the posts for Hearts of Oak. Daniel runs the specialist keeping unit that has produced three Ghana youth internationals.",
    creds: ["Ex-Hearts of Oak", "3 youth internationals", "12 GPL seasons"],
  },
];

export const PATHWAY = [
  {
    step: "01",
    title: "Scout",
    body: "Open trials across Greater Accra every quarter — free to enter, judged on potential not polish.",
    icon: "cone",
  },
  {
    step: "02",
    title: "Foundation",
    body: "Grassroots and Development blocks build technique, two-footedness and game love.",
    icon: "ball",
  },
  {
    step: "03",
    title: "Compete",
    body: "GFA Colts and Youth League football against the best academies in the country.",
    icon: "whistle",
  },
  {
    step: "04",
    title: "Perform",
    body: "Video analysis, S&C and nutrition wrap around training as players chase excellence.",
    icon: "chart",
  },
  {
    step: "05",
    title: "Professional",
    body: "GPL and overseas trial placement — 27 contracts signed since 2014.",
    icon: "star",
  },
];

export const RESULTS = [
  { date: "21 Feb 2026", comp: "GFA U17 Youth League", score: "3–1", opp: "Accra Lions", res: "W" as const },
  { date: "14 Feb 2026", comp: "GFA U15 Colts League", score: "2–2", opp: "Tema Youth", res: "D" as const },
  { date: "08 Feb 2026", comp: "GFA U13 Colts League", score: "4–0", opp: "Danbort FC", res: "W" as const },
  { date: "01 Feb 2026", comp: "GFA U17 Youth League", score: "1–2", opp: "Right to Dream", res: "L" as const },
  { date: "25 Jan 2026", comp: "GWPL Colts · Queens U15", score: "2–1", opp: "Fabulous Ladies", res: "W" as const },
  { date: "18 Jan 2026", comp: "GFA U11 Festival", score: "5–2", opp: "Spintex Knights", res: "W" as const },
];

export const NEWS = [
  {
    cat: "Match Report",
    date: "21 Feb 2026",
    title: "U17s seal top-two finish with statement win over Accra Lions",
    img: IMG.match,
    excerpt: "A second-half brace from skipper Selorm Agbeko and a thunderous free-kick sealed a 3–1 victory that keeps the title race alive heading into the final block.",
    full: "Selorm Agbeko opened the scoring on 54 minutes with a composed finish after a 22-pass sequence, then doubled it from a free-kick that dipped over the wall. Accra Lions pulled one back from the spot, but substitute Kwabena Antwi killed the contest in stoppage time. The win keeps Ahenkan within two points of the summit with three games to play — and guarantees a top-two finish and CAF Youth Games qualification for the first time in academy history.",
  },
  {
    cat: "Transfers",
    date: "09 Feb 2026",
    title: "Two Elite Pathway scholars sign pre-contracts with European clubs",
    img: IMG.drill,
    excerpt: "Midfielder Isaac Tetteh (18) and full-back Richard Asamoah (19) will join Danish and Belgian second-division sides in the summer window.",
    full: "Both players joined the academy at age 11 through community trials in Ashaiman and Nungua. After two seasons in the Elite Pathway — including trial spells organised by the academy — they signed pre-contracts pending work permits. 'They leave as professionals and come back as brothers,' said Head of Coaching Kwame Mensah. The academy retains a development solidarity percentage that funds 40 grassroots scholarships each year.",
  },
  {
    cat: "Academy",
    date: "28 Jan 2026",
    title: "2026 open trials: March dates announced for boys and Queens",
    img: IMG.keeper,
    excerpt: "Free entry for all players born 2009–2019. Trials run across two weekends at the Ahenkan Grounds on Spintex Road, with scouts from six GPL clubs invited.",
    full: "The academy's flagship recruitment window returns on Saturday 14 March (boys U10–U17) and Sunday 15 March (Queens U10–U17). Entry is free — players register online or on the gate from 06:00. Every trialist receives written feedback, and standout players are invited into funded scholarship squads. Bring boots, shin guards, water and a plain white shirt. Goalkeepers report to the specialist tent at 06:45.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "My son joined at eight, shy and raw. Six years later he captains the U15s, speaks in front of adults without shaking, and still finishes his homework before training. Ahenkan raises people, then footballers.",
    name: "Mrs. Adwoa Boateng",
    role: "Parent · Development squad",
  },
  {
    quote:
      "The coaches told me the truth when I wasn't ready, worked with me when I was, and put my tape in front of clubs I only knew from the TV. I signed my first pro contract at 19.",
    name: "Isaac Tetteh",
    role: "Alumni · Elite Pathway '26",
  },
  {
    quote:
      "As a mother of a girl playing football in Ghana, I was nervous. The Queens program gave my daughter female coaches, real league games and a standard that says: you belong here.",
    name: "Mr. & Mrs. Lartey",
    role: "Parents · Queens U13",
  },
];

export const TRIAL_DATES = [
  { day: "Saturday", date: "14 March 2026", group: "Boys U10–U17", time: "07:00 – 11:00" },
  { day: "Sunday", date: "15 March 2026", group: "Queens U10–U17", time: "07:00 – 11:00" },
  { day: "Saturday", date: "28 March 2026", group: "Grassroots 6–9 yrs", time: "08:00 – 10:00" },
];

export const BRING = [
  "Football boots (moulded studs) & shin guards",
  "Plain white shirt and dark shorts",
  "At least 1.5L of water",
  "Signed parental consent form (emailed after registration)",
];

export const POSITIONS = [
  "Goalkeeper",
  "Right back",
  "Centre back",
  "Left back",
  "Defensive midfield",
  "Central midfield",
  "Attacking midfield",
  "Winger",
  "Striker",
];
