import flagUrl from "../images/flag.png";
import logoUrl from "../images/logo.png";
import odiUrl from "../images/odi.png";
import okyeheneUrl from "../images/okyehene.png";

const SITE = "https://ahenkanfootballacademy.com";
const GEN = "https://image.qwenlm.ai/generated-images";

export const IMG = {
  logo: logoUrl,
  flag: flagUrl,
  team: `${SITE}/team_staff.jpg`,
  president: odiUrl,
  patron: okyeheneUrl,
  fundraising: `${SITE}/thumbnail1.png`,
  hero: `${GEN}/e5c91cfd-8120-49bb-aeab-4ab1ad112f48/_result.png`,
  drill: `${GEN}/2d1c9046-6c7c-4e0f-bbfa-f3e4ee4cf53c/_result.png`,
  keeper: `${GEN}/8fa72442-1671-42a1-b319-6aa9ee3e19f5/_result.png`,
  coachTech: `${GEN}/a68f31d2-69dd-4bcf-b053-7bec0c20c873/_result.png`,
  coachGk: `${GEN}/f52f5a33-ab09-4932-876f-18fc0c7228b2/_result.png`,
  coachHead: `${GEN}/22ed0fb2-c6cd-4393-a7af-6bc36ec3fbd8/_result.png`,
  coachAma: `${GEN}/7c94f854-e4c0-4de1-a9b3-690304234278/_result.png`,
  pitch: `${GEN}/cde1429c-b66f-417d-b5ef-e839601d01ba/_result.png`,
  match: `${GEN}/7c88997c-cf4b-4b24-bc9b-b3a7f2bfb2ae/_result.png`,
};

export const CONTACT = {
  phone: "+233 24 471 2689",
  phoneHref: "tel:+233244712689",
  altPhone: "0244 8685 92",
  email: "info@ahenkanacademy.com",
  address: "Adeiso, Upper West Akyem",
  region: "Eastern Region, Ghana",
  facebook: "https://www.facebook.com/p/Ahenkan-Football-Academy-61571776081864/",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Training", to: "/training" },
  { label: "Fixtures", to: "/fixtures" },
  { label: "Blogs", to: "/blogs" },
  { label: "Media", to: "/media" },
  { label: "Players", to: "/players" },
  { label: "Staff", to: "/staff" },
  { label: "Contact", to: "/contact" },
];

export const SITE_LINKS = [
  { label: "About the Academy", href: `${SITE}/about` },
  { label: "Our Programs", href: `${SITE}/programs` },
  { label: "Coaching Staff", href: `${SITE}/staff` },
  { label: "Admissions Portal", href: `${SITE}/admissions` },
  { label: "Academy Blog", href: `${SITE}/blog` },
  { label: "Contact & Directions", href: `${SITE}/contact` },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Young Players", note: "Enrolled across age groups" },
  { value: 5, suffix: "+", label: "Coaches", note: "CAF-licensed specialists" },
  { value: 100, suffix: "%", label: "Dedication", note: "To every single player" },
];

export const WHY = [
  { icon: "book", title: "Academic Excellence", desc: "We ensure our players maintain high academic standards alongside their football training, preparing them for success in all areas of life." },
  { icon: "shield", title: "Character Development", desc: "Building strong character, leadership skills, and moral values that will serve our players throughout their lives." },
  { icon: "eye", title: "Safe Environment", desc: "Providing a secure, supportive environment where young players can grow, learn, and develop their potential safely." },
  { icon: "clock", title: "Flexible Training", desc: "Training schedules that accommodate school hours and family commitments, ensuring balanced development." },
  { icon: "heart", title: "Community Focus", desc: "Strong emphasis on community involvement and giving back, teaching players the importance of social responsibility." },
  { icon: "chart", title: "Competitive Edge", desc: "Regular participation in local and regional tournaments to develop competitive skills and match experience." },
  { icon: "star", title: "Life Skills", desc: "Teaching essential life skills including time management, teamwork, communication, and problem-solving." },
  { icon: "globe", title: "Global Perspective", desc: "Exposure to international football standards and opportunities for players to compete at higher levels." },
];

export const PROGRAMS = [
  {
    no: "01",
    name: "Youth Development Programs",
    ages: "Ages 6 – 17",
    tag: "Core Academy",
    desc: "Our flagship pathway — structured, age-group training that unearths raw talent in the Upper West Akyem zone and develops it with world-class coaching, from first touch to full-match understanding.",
    focus: ["Age-group squads from U-8 to U-17", "Technical, tactical & physical curriculum", "Schooling support built into the week", "Regional league & tournament fixtures"],
    meta: [["Venue", "Ahenkan Grounds, Adeiso"], ["Days", "Mon – Sat · 9am – 3pm"], ["Squads", "U-8 · U-12 · U-15 · U-17"]],
  },
  {
    no: "02",
    name: "Elite Training Camps",
    ages: "By Invitation & Open Registration",
    tag: "Intensives",
    desc: "High-intensity camps that push promising players to the next level — double sessions, video analysis, position-specific work and mentorship from our CAF-licensed coaching team.",
    focus: ["Residential & day-camp formats", "Position-specific masterclasses", "Video analysis & player reports", "Goalkeeping-specific camps"],
    meta: [["Format", "Residential & day camps"], ["Next Camp", "2026/27 season calendar"], ["Reports", "Individual player assessment"]],
  },
  {
    no: "03",
    name: "Community Outreach",
    ages: "All Welcome",
    tag: "Giving Back",
    desc: "Football as a force for the community — school festivals, talent identification days and open training across Upper West Akyem, because the next world-class star may live on any street in Adeiso.",
    focus: ["School & church festival days", "Open talent identification trials", "Equipment drives for local teams", "Parent & guardian engagement"],
    meta: [["Reach", "Upper West Akyem zone"], ["Trials", "Open applications"], ["Ages", "15 – 16 current window"]],
  },
];

export const SCHEDULE = [
  { day: "Mon", sessions: [ { time: "09:00", program: "Ball Mastery", pitch: "U-8 – U-12" }, { time: "11:00", program: "Position Play", pitch: "U-15" }, { time: "14:00", program: "Team Tactics", pitch: "U-17" } ] },
  { day: "Tue", sessions: [ { time: "09:00", program: "Physical Foundations", pitch: "All squads" }, { time: "11:00", program: "Small-Sided Games", pitch: "U-12" }, { time: "14:00", program: "Finishing & Striking", pitch: "U-15 · U-17" } ] },
  { day: "Wed", sessions: [ { time: "09:00", program: "School Support", pitch: "Classroom block" }, { time: "11:00", program: "Ball Mastery", pitch: "U-15" }, { time: "14:00", program: "Match Simulation", pitch: "U-17" } ] },
  { day: "Thu", sessions: [ { time: "09:00", program: "Small-Sided Games", pitch: "U-8 – U-12" }, { time: "11:00", program: "Position Play", pitch: "U-17" }, { time: "14:00", program: "Set Pieces & GK Unit", pitch: "All squads" } ] },
  { day: "Fri", sessions: [ { time: "09:00", program: "Recovery & Mobility", pitch: "All squads" }, { time: "11:00", program: "Team Activation", pitch: "U-15 · U-17" }, { time: "14:00", program: "Match Simulation", pitch: "U-17" } ] },
  { day: "Sat", note: "Matchday", sessions: [ { time: "10:00", program: "League Fixtures", pitch: "UWA Regional League" }, { time: "13:00", program: "Team Activation", pitch: "U-15 · U-17" } ] },
];

export const CAMPS = [
  { name: "Elite Residential Camp", length: "14 days", who: "Invited players · 13 – 17", desc: "Live, train and study at the grounds — double daily sessions, video analysis, nutrition plans and evening mentorship with our coaching staff.", tags: ["2 sessions / day", "Video analysis", "Full board"] },
  { name: "Goalkeeping Camp", length: "3 days", who: "Ages 10 – 16 · all levels", desc: "Run by former national-team goalkeeper Ama Mensah — handling, distribution, command of the box and the mental side of keeping.", tags: ["GK specialist", "Equipment provided", "Player report"] },
  { name: "Holiday Development Camp", length: "School holidays", who: "Ages 6 – 14 · open entry", desc: "Fun-first fundamentals during the break — ball mastery, small-sided games and life-skills sessions, with a festival match to finish.", tags: ["Open entry", "Festival match", "Half / full day"] },
];

export const FIXTURES = [];

export const RESULTS = [];

export const STANDINGS = [];

export const BLOGS = [];

export const TESTIMONIALS = [];

export const LEADERSHIP = [
  {
    img: IMG.president,
    name: "Odi – Ahenkan Kwame Yeboah",
    role: "President",
    bio: "Leading the academy with vision and dedication, ensuring our players receive the best opportunities for growth both on and off the field.",
  },
  {
    img: IMG.patron,
    name: "OSAGYEFO AMOATIA OFORI PAYIN I I",
    role: "Okyenhene · Life Patron",
    bio: "Providing guidance and support as the Life Patron, embodying the traditional values and cultural heritage that define our academy's foundation.",
  },
];

export const COACHES = [];

export const SUPPORT = [];

export const STEPS = [
  { no: "01", title: "Apply or Walk In", desc: "Submit the application form or visit our Adeiso grounds on any training day — our admissions team will guide you through the process." },
  { no: "02", title: "Trial Day · 9am – 3pm", desc: "Train with your age group while our CAF-licensed coaches assess technique, physical readiness and attitude. Our admissions team will confirm the next available session." },
  { no: "03", title: "Join the Academy", desc: "Successful players are enrolled into their squad, receive their kit and begin the Ahenkan pathway — football and schooling together." },
];

export const VALUES = [
  { word: "Talent", desc: "We believe world-class ability sleeps in every community. Our scouts and coaches unearth it early — then refine it with structured, age-appropriate training until it shines on any pitch in Ghana." },
  { word: "Wisdom", desc: "Football intelligence is trained, not inherited. Decision-making, discipline and humility are coached here as deliberately as any technique, guided by the wisdom of our patrons and elders." },
  { word: "Knowledge", desc: "Books and boots share the same timetable. Our classroom block keeps every player's education on track, because a world-class champion must be equipped for life beyond the final whistle." },
];

export const TIMELINE = [
  { when: "2025", title: "The Academy Rises", desc: "Ahenkan Football Academy is founded in Adeiso, Upper West Akyem by President Odi – Ahenkan Kwame Yeboah, with a single pitch and a clear mission." },
  { when: "2025", title: "Life Patronage", desc: "His Royal Majesty OSAGYEFO AMOATIA OFORI PAYIN I I, the Okyenhene, graciously accepts the role of Life Patron — anchoring the academy in the heritage of Akyem." },
  { when: "2026", title: "Building Dreams Together", desc: "The community fundraising ceremony raises funds to expand facilities, bringing 50+ young players into structured age-group squads." },
  { when: "2026", title: "Open Trials Window", desc: "Trials open for talented 15–16 year olds across the region, with sessions running from 9am to 3pm at the Ahenkan Grounds." },
  { when: "2026/27", title: "Season Colours Unveiled", desc: "The club proudly unveils its first and second jerseys for the new season — purple and gold, carrying the pride of Adeiso onto every pitch." },
];

export const BRING = [
  "Football boots (firm ground)",
  "Shin guards — compulsory",
  "Water bottle & light snack",
  "White t-shirt & shorts for trials",
  "Parent / guardian contact details",
];

export const TICKER = ["Talent", "Wisdom", "Knowledge", "Discipline", "Education", "Community", "World-Class"];
