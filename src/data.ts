const SITE = "https://ahenkanfootballacademy.com";
const GEN = "https://image.qwenlm.ai/generated-images";

export const IMG = {
  logo: `${SITE}/logo.jpg`,
  flag: `${SITE}/Flag.jpg`,
  team: `${SITE}/team_staff.jpg`,
  president: `${SITE}/Odi-ahenkan.jpg`,
  patron: `${SITE}/Okyen-hene.jpg`,
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
    meta: [["Reach", "Upper West Akyem zone"], ["Trials", "Open · GH₵200 registration"], ["Ages", "15 – 16 current window"]],
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

export const FIXTURES = [
  { id: 1, date: "2026-07-04T15:00:00", squad: "U-17", opp: "Adeiso Stars", venue: "Home · Ahenkan Grounds", comp: "UWA Regional Youth League" },
  { id: 2, date: "2026-07-05T13:00:00", squad: "U-15", opp: "Kibi United", venue: "Away · Kibi Park", comp: "UWA Regional Youth League" },
  { id: 3, date: "2026-07-11T15:00:00", squad: "U-17", opp: "Asamankese FC", venue: "Away · Asamankese Stadium", comp: "UWA Regional Youth League" },
  { id: 4, date: "2026-07-18T13:00:00", squad: "U-15", opp: "Suhum City", venue: "Home · Ahenkan Grounds", comp: "UWA Regional Youth League" },
  { id: 5, date: "2026-07-25T15:00:00", squad: "U-17", opp: "Akim Oda Lions", venue: "Home · Ahenkan Grounds", comp: "Eastern Regional Cup" },
  { id: 6, date: "2026-08-01T13:00:00", squad: "U-15", opp: "Nkawkaw Rangers", venue: "Away · Nkawkaw Park", comp: "UWA Regional Youth League" },
];

export const RESULTS = [
  { id: 1, date: "2026-06-27", squad: "U-17", opp: "Adeiso Stars", score: "3 – 1", res: "W" as const, venue: "Home" },
  { id: 2, date: "2026-06-27", squad: "U-15", opp: "Kibi United", score: "1 – 1", res: "D" as const, venue: "Away" },
  { id: 3, date: "2026-06-20", squad: "U-17", opp: "Ofoase Ajax", score: "2 – 0", res: "W" as const, venue: "Home" },
  { id: 4, date: "2026-06-20", squad: "U-15", opp: "Asamankese FC", score: "0 – 2", res: "L" as const, venue: "Away" },
  { id: 5, date: "2026-06-13", squad: "U-17", opp: "Suhum City", score: "4 – 2", res: "W" as const, venue: "Home" },
  { id: 6, date: "2026-06-13", squad: "U-15", opp: "Begoro Royals", score: "2 – 2", res: "D" as const, venue: "Away" },
];

export const STANDINGS = [
  { pos: 1, team: "Ahenkan FA", p: 6, w: 5, d: 1, l: 0, gf: 16, ga: 5, pts: 16, us: true },
  { pos: 2, team: "Akim Oda Lions", p: 6, w: 4, d: 1, l: 1, gf: 12, ga: 6, pts: 13, us: false },
  { pos: 3, team: "Asamankese FC", p: 6, w: 3, d: 2, l: 1, gf: 10, ga: 8, pts: 11, us: false },
  { pos: 4, team: "Adeiso Stars", p: 6, w: 2, d: 2, l: 2, gf: 9, ga: 9, pts: 8, us: false },
  { pos: 5, team: "Kibi United", p: 6, w: 1, d: 2, l: 3, gf: 6, ga: 10, pts: 5, us: false },
  { pos: 6, team: "Suhum City", p: 6, w: 0, d: 2, l: 4, gf: 4, ga: 14, pts: 2, us: false },
];

export const BLOGS = [
  {
    id: 1, featured: true, cat: "Community", date: "1/19/2024", img: IMG.fundraising,
    title: "Ahenkan Academy Fundraising Ceremony: Building Dreams Together",
    excerpt: "A memorable evening of community support as Ahenkan Football Academy successfully raised funds to expand our facilities and provide more opportunities for young Ghanaian footballers.",
    full: "A memorable evening of community support as Ahenkan Football Academy successfully raised funds to expand our facilities and provide more opportunities for young Ghanaian footballers. Chiefs, elders, parents and friends of the academy gathered in Adeiso to pledge their support for the next phase of our journey. The funds raised will go directly toward expanding our training grounds, upgrading the classroom block and equipping our players with the boots, kits and nutrition they need to compete at the highest level. We say ayɛkoo to every family, business and well-wisher who contributed — you are not just funding a facility, you are building dreams, one child at a time.",
  },
  {
    id: 2, cat: "Development", date: "1/14/2024", img: IMG.match,
    title: "The Future of Ghanaian Football: Developing Young Talent",
    excerpt: "Ghana's next generation of Black Stars will not emerge by accident — they will be unearthed, nurtured and developed with intention, structure and world-class coaching.",
    full: "Ghana's next generation of Black Stars will not emerge by accident — they will be unearthed, nurtured and developed with intention, structure and world-class coaching. At Ahenkan, our youth development programs begin with fundamentals: first touch, decision-making and love for the game. From there, players graduate through age-group squads into competitive regional football. We believe every community in Ghana holds world-class talent. Our job is to find it early, train it properly and protect the child while the player develops. The future of Ghanaian football is being written right now, on pitches like ours in Adeiso.",
  },
  {
    id: 3, cat: "Health & Wellness", date: "1/9/2024", img: IMG.drill,
    title: "Nutrition and Performance: Fueling Champions",
    excerpt: "What a young player eats determines how they train, recover and grow. Our nutrition guidelines turn everyday Ghanaian food into champion fuel.",
    full: "What a young player eats determines how they train, recover and grow. Our nutrition guidelines turn everyday Ghanaian food into champion fuel — kontomire and garden eggs for recovery, banku and grilled fish for energy, and fruit before every session. Players learn to hydrate before they are thirsty and to eat for the session ahead, not just the meal in front of them. Supported by our nutritionist, every squad receives a simple, affordable meal framework their families can follow at home. Champions are not only made in training — they are fueled in the kitchen.",
  },
  {
    id: 4, cat: "Announcements", date: "6/20/2026", img: IMG.hero,
    title: "Open Trials: Calling All Talented 15 – 16 Year Olds",
    excerpt: "Ahenkan Football Academy invites talented young footballers aged 15–16 to our open trials. Registration is GH₵200 and sessions run 9am – 3pm at our Adeiso grounds.",
    full: "Ahenkan Football Academy invites talented young footballers aged 15–16 to our open trials at the Ahenkan Grounds in Adeiso. Registration is GH₵200 and trial days run from 9am to 3pm. Come with your boots, shin guards and water bottle — and bring everything you have. Our CAF-licensed coaches assess every player across technical ability, physical readiness and attitude. For the full trial calendar or further explanation, call +233 24 471 2689 or 0244 8685 92. Your world-class journey starts with one trial day.",
  },
  {
    id: 5, cat: "Club News", date: "6/05/2026", img: IMG.keeper,
    title: "Unveiling Our Colours for the 2026/27 Season",
    excerpt: "We proudly unveil our colours for the new season — official first and second jerseys that carry the pride of Adeiso onto every pitch we play.",
    full: "We are honoured to share our colours with such a distinguished footballing community. For the 2026/27 season, Ahenkan Football Academy proudly unveils its official first and second jerseys — royal purple and gold, the colours of ambition and royalty, honouring the patronage of the Okyenhene and the spirit of Upper West Akyem. Every thread carries our promise: Talent, Wisdom and Knowledge at Work. The kits debut at our first home fixture of the season — supporters are welcome at the grounds.",
  },
  {
    id: 6, cat: "Club Life", date: "5/22/2026", img: IMG.pitch,
    title: "A Day at Adeiso: Inside Our 9am – 3pm Training Week",
    excerpt: "From ball mastery at dawn to match simulation at dusk — a look inside the daily rhythm that shapes Ahenkan players.",
    full: "The grounds come alive at 8:30 in the morning. By 9:00 the youngest squad is deep in ball mastery — hundreds of touches before the sun is high. Mid-morning brings position play and small-sided games, then a quiet classroom block where schooling support keeps every player's education on track. Afternoons belong to tactics, finishing and match simulation, while our goalkeepers work separately with Ama Mensah. Saturdays are matchday. Sundays, the grounds rest — but the players never really stop dreaming.",
  },
];

export const TESTIMONIALS = [
  { quote: "Ahenkan Academy has transformed my son's football skills and character. The coaches are dedicated and the training is world-class. I'm proud to see him grow both as a player and a person.", name: "Kwame Asante", role: "Parent of U-15 Player", initials: "KA" },
  { quote: "The academy's commitment to community development is remarkable. They're not just training footballers, they're building future leaders who will make Ghana proud.", name: "Sarah Mensah", role: "Community Leader", initials: "SM" },
  { quote: "The holistic approach at Ahenkan Academy is exceptional. They understand that mental strength is as important as physical skills in developing champions.", name: "Dr. Kofi Boateng", role: "Sports Psychologist", initials: "DKB" },
  { quote: "Training at Ahenkan Academy prepared me for success both on and off the field. The values I learned here continue to guide me in my professional career.", name: "Ama Serwaa", role: "Former Player", initials: "AS" },
];

export const LEADERSHIP = [
  {
    img: IMG.president,
    name: "Odi – Ahenkan Kwame Yeboah",
    role: "President",
    bio: "Leading the academy with vision and dedication, ensuring our players receive the best opportunities for growth both on and off the field.",
  },
  {
    img: IMG.patron,
    name: "His Royal Majesty Osagyefo Amoatia Ofori Payin",
    role: "Okyenhene · Royal Patron",
    bio: "Providing guidance and support as the Royal Patron, embodying the traditional values and cultural heritage that define our academy's foundation.",
  },
];

export const COACHES = [
  {
    img: IMG.coachHead, name: "Kwame Asante", role: "Head Coach", qual: "CAF License A", years: "15+ Years",
    bio: "Former Ghana U-20 player with extensive coaching experience across West Africa. Holds CAF License A and has developed numerous players who now compete professionally.",
    tags: ["CAF License A Certified", "Former Ghana U-20", "50+ Players Developed", "15 Years Experience"],
  },
  {
    img: IMG.coachTech, name: "Emmanuel Adjei", role: "Technical Skills Coach", qual: "CAF License B", years: "8 Years",
    bio: "Specializes in technical development and ball control. Former Hearts of Oak youth player with a passion for building clean, confident technique from the youngest age groups.",
    tags: ["CAF License B", "Accra, Ghana"],
  },
  {
    img: "", initials: "KO", name: "Kofi Owusu", role: "Fitness & Conditioning", qual: "Sports Science", years: "6 Years",
    bio: "Sports science graduate focusing on youth fitness development and injury prevention. Designs every squad's physical foundations, from movement skills to recovery.",
    tags: ["Sports Science Degree", "Kumasi, Ghana"],
  },
  {
    img: IMG.coachAma, name: "Ama Mensah", role: "Goalkeeping Coach", qual: "GK Specialist", years: "10 Years",
    bio: "Former national team goalkeeper with specialized training in goalkeeping techniques. Leads our dedicated GK unit and the academy's goalkeeping camps.",
    tags: ["GK License", "Cape Coast, Ghana"],
  },
];

export const SUPPORT = [
  { title: "Academic Coordinator", desc: "Educational support & school liaison" },
  { title: "Physiotherapist", desc: "Injury prevention & recovery" },
  { title: "Nutritionist", desc: "Diet & wellness programs" },
  { title: "Scout Coordinator", desc: "Talent identification across UWA" },
];

export const STEPS = [
  { no: "01", title: "Apply or Walk In", desc: "Submit the application form or visit our Adeiso grounds on any training day — our admissions team will guide you through the process." },
  { no: "02", title: "Trial Day · 9am – 3pm", desc: "Train with your age group while our CAF-licensed coaches assess technique, physical readiness and attitude. Registration is GH₵200." },
  { no: "03", title: "Join the Academy", desc: "Successful players are enrolled into their squad, receive their kit and begin the Ahenkan pathway — football and schooling together." },
];

export const VALUES = [
  { word: "Talent", desc: "We believe world-class ability sleeps in every community. Our scouts and coaches unearth it early — then refine it with structured, age-appropriate training until it shines on any pitch in Ghana." },
  { word: "Wisdom", desc: "Football intelligence is trained, not inherited. Decision-making, discipline and humility are coached here as deliberately as any technique, guided by the wisdom of our patrons and elders." },
  { word: "Knowledge", desc: "Books and boots share the same timetable. Our classroom block keeps every player's education on track, because a world-class champion must be equipped for life beyond the final whistle." },
];

export const TIMELINE = [
  { when: "2025", title: "The Academy Rises", desc: "Ahenkan Football Academy is founded in Adeiso, Upper West Akyem by President Odi – Ahenkan Kwame Yeboah, with a single pitch and a clear mission." },
  { when: "2025", title: "Royal Patronage", desc: "His Royal Majesty Osagyefo Amoatia Ofori Payin, the Okyenhene, graciously accepts the role of Royal Patron — anchoring the academy in the heritage of Akyem." },
  { when: "2026", title: "Building Dreams Together", desc: "The community fundraising ceremony raises funds to expand facilities, bringing 50+ young players into structured age-group squads." },
  { when: "2026", title: "Open Trials Window", desc: "Trials open for talented 15–16 year olds across the region — GH₵200 registration, 9am to 3pm at the Ahenkan Grounds." },
  { when: "2026/27", title: "Season Colours Unveiled", desc: "The club proudly unveils its first and second jerseys for the new season — purple and gold, carrying the pride of Adeiso onto every pitch." },
];

export const BRING = [
  "Football boots (firm ground)",
  "Shin guards — compulsory",
  "Water bottle & light snack",
  "White t-shirt & shorts for trials",
  "Parent / guardian contact details",
  "GH₵200 registration fee",
];

export const TICKER = ["Talent", "Wisdom", "Knowledge", "Discipline", "Education", "Community", "World-Class"];
