// ─── ASHRAM AGENCY — SINGLE SOURCE OF TRUTH ───────────────────────────────
// Change anything here and the entire site updates automatically.

// ── Types ─────────────────────────────────────────────────────────────────

export type NavLink = { label: string; href: string };
export type Service = { id: string; number: string; title: string; description: string; tags: string[] };
export type Project = {
  id: string;
  title: string;
  category: "Web App" | "Mobile App" | "E-Commerce";
  year: string;
  description: string;
  image: string;
  accentColor: string;
  metrics: string;
  tags: string[];
  featured: boolean;
};
export type ProcessStep = { number: string; label: string; description: string };
export type Metric = { value: number; suffix: string; label: string };
export type ClientLogo = { name: string; image: string };
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  fullBio: string;
  image: string;
  social: { platform: string; url: string }[];
};
export type Testimonial = { quote: string; author: string; role: string; company: string; outcome: string };
export type FAQ = { question: string; answer: string };
export type FooterColumn = { heading: string; links: { label: string; href: string }[] };

// ── Agency Identity ────────────────────────────────────────────────────────

export const agency = {
  name: "AshRam",
  tagline: "Code that earns its keep.",
  subTagline: "Software Development Studio",
  logoText: "AshRam",
  logoLight: "/black-logo.png",
  logoDark:  "/white-logo.png",
  description:
    "AshRam is a software development studio based in India. We build web applications, mobile apps, and digital products for startups and businesses that need work that actually ships.",
  founded: "2026",
  location: "India",
} as const;

// ── Navigation ─────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Works",    href: "/works" },
  { label: "Team",     href: "/team" },
  { label: "Contact",  href: "/contact" },
];

// ── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  headlineLines: ["We Build Software", "That Moves Businesses."],
  subheadline:
    "A two-person studio delivering web apps, mobile apps, and digital products — built clean, shipped on time.",
  cta:          { label: "View Our Work",   href: "/works" },
  secondaryCta: { label: "Start a Project", href: "/contact" },
} as const;

// ── About ──────────────────────────────────────────────────────────────────

export const about = {
  eyebrow:   "Who We Are",
  heading:   "Software is a craft. We take it seriously.",
  body: [
    "We believe good software is not just code that runs — it is code that solves, scales, and lasts. Every architecture decision, every UI element, every API endpoint is deliberate.",
    "AshRam works with founders, startups, and companies who need digital products built right the first time. We are methodical, precise, and obsessively thorough.",
  ],
  manifesto:
    "We don't ship fast and fix later. We build with intent — clean architecture, thoughtful UX, and code that the next developer won't curse. Every project is built to grow with the business it serves.",
  process: [
    { step: "01", title: "Discovery",   body: "We understand your goals, users, and constraints before writing a single line of code. Requirements that are actually complete." },
    { step: "02", title: "Architecture", body: "We plan the stack, database schema, and system design. The foundation decisions that make everything else easier." },
    { step: "03", title: "Build",        body: "We develop, test, and iterate. Clean code, proper version control, structured reviews. You see progress at every milestone." },
    { step: "04", title: "Delivery",    body: "You receive production-ready software, documentation, and a handoff you can actually use — or we keep maintaining it for you." },
  ],
} as const;

// ── Services ───────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks. React, Next.js, Node.js — performant, scalable, and maintainable from day one.",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "REST / GraphQL"],
  },
  {
    id: "mobile-dev",
    number: "02",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps for iOS and Android. React Native development with native performance and a polished user experience.",
    tags: ["React Native", "iOS", "Android", "Expo", "App Store Deployment"],
  },
  {
    id: "saas",
    number: "03",
    title: "SaaS Product Development",
    description:
      "End-to-end SaaS platform development — from architecture and auth to billing, dashboards, and multi-tenant systems.",
    tags: ["SaaS Architecture", "Auth Systems", "Billing Integration", "Admin Panels"],
  },
  {
    id: "backend",
    number: "04",
    title: "Backend & APIs",
    description:
      "Robust server-side systems, REST and GraphQL APIs, database design, and cloud infrastructure — built to handle real-world load.",
    tags: ["Node.js", "PostgreSQL", "MongoDB", "AWS / GCP", "API Design"],
  },
  {
    id: "ecommerce",
    number: "05",
    title: "E-Commerce Development",
    description:
      "Custom e-commerce experiences built for conversion. Shopify, custom carts, payment integrations, inventory systems, and more.",
    tags: ["Shopify", "Custom Cart", "Payment Gateways", "Inventory Systems"],
  },
  {
    id: "ui-ux",
    number: "06",
    title: "UI / UX Design",
    description:
      "Interface design grounded in user behaviour. From wireframes to polished high-fidelity screens with full interaction specifications.",
    tags: ["Figma", "Prototyping", "User Research", "Interaction Design"],
  },
  {
    id: "branding",
    number: "07",
    title: "Brand & Visual Identity",
    description:
      "Logo systems, colour palettes, typography scales, and brand guidelines. A visual identity built to represent your software product in the world.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Systems", "Style Guides"],
  },
  {
    id: "maintenance",
    number: "08",
    title: "Support & Maintenance",
    description:
      "Ongoing technical support, feature additions, performance monitoring, and security patches for existing products.",
    tags: ["Bug Fixes", "Feature Updates", "Performance", "Security Audits"],
  },
];

// ── Projects ───────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "aevum-gym",
    title: "AEVUM GYM",
    category: "Web App",
    year: "2027",
    description:
      "A modern gym landing page designed to attract new members, showcase trainers, highlight fitness programs, and drive membership registrations.",
    image: "/images/projects/aevum.png",
    accentColor: "#f97316",
    metrics: "98% Performance · 100% Mobile · <1s Load",
    tags: ["Next.js", "TailwindCSS", "GSAP"],
    featured: true,
  },
  {
    id: "karta",
    title: "Karta Shopping",
    category: "E-Commerce",
    year: "2025",
    description:
      "A full-featured e-commerce platform with product listings, cart system, user authentication, and secure checkout flow built for scale.",
    image: "/images/projects/karta.png",
    accentColor: "#ff4d6d",
    metrics: "1.8K users · 5K+ orders · 12% conversion",
    tags: ["Next.js", "PostgreSQL", "NeonDB", "Razorpay"],
    featured: true,
  },
  {
    id: "student-dashboard",
    title: "Student Dashboard",
    category: "Web App",
    year: "2025",
    description:
      "A comprehensive student management system with real-time analytics, course tracking, and a multi-role admin panel built for educational institutions.",
    image: "/images/projects/student-dashboard.png",
    accentColor: "#00d4ff",
    metrics: "2.4K users · 99.9% uptime · <2s load",
    tags: ["React", "Node.js", "MongoDB", "Express.js"],
    featured: true,
  },
  {
    id: "code-space",
    title: "Code Space",
    category: "Web App",
    year: "2024",
    description:
      "Save code snippets via unique ID and retrieve via URL. A minimal MERN tool for storing and sharing code instantly with syntax highlighting for 40+ languages.",
    image: "/images/projects/code-space.png",
    accentColor: "#1abc9c",
    metrics: "10K+ snippets · 40+ languages · 0.3s avg load",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: false,
  },
  {
    id: "devtools-playground",
    title: "DevTools Playground",
    category: "Web App",
    year: "2025",
    description:
      "A developer toolkit combining API Tester, JSON↔CSV Converter, JWT Decoder, URL Encoder, and Regex Tester — all in one clean UI with Google OAuth.",
    image: "/images/projects/dev-tools.png",
    accentColor: "#f59e0b",
    metrics: "8 tools · 50K+ requests · Google OAuth",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    featured: false,
  },
  {
    id: "healverse",
    title: "HealVerse",
    category: "Mobile App",
    year: "2025",
    description:
      "An AI-driven mobile health companion covering medication tracking, guided meditation, and personalized diet planning — powered by Spring Boot and PostgreSQL.",
    image: "/images/projects/healverse.png",
    accentColor: "#a855f7",
    metrics: "3 AI modules · iOS & Android · Full-stack",
    tags: ["React Native", "Spring Boot", "PostgreSQL", "NativeWind"],
    featured: false,
  },
  {
    id: "agriassist",
    title: "AgriAssist",
    category: "Mobile App",
    year: "2025",
    description:
      "A complete AI-powered farming companion with crop recommendation, deep learning disease detection, voice navigation, and expense management for farmers.",
    image: "/images/projects/agriassist.png",
    accentColor: "#22c55e",
    metrics: "Custom DL model · TensorFlow · Offline-first",
    tags: ["React Native", "Node.js", "MongoDB", "TensorFlow"],
    featured: false,
  },
  {
    id: "rat3",
    title: "RAT3",
    category: "Mobile App",
    year: "2025",
    description:
      "A Flutter + Kotlin mobile security app to detect, prevent, and alert users against Remote Access Trojan attacks in real time with a full security dashboard.",
    image: "/images/projects/rat3.png",
    accentColor: "#ef4444",
    metrics: "Real-time detection · Live threat DB · Mobile",
    tags: ["Flutter", "Kotlin"],
    featured: false,
  },
];

export const projectCategories = ["All", "Web App", "Mobile App", "E-Commerce"] as const;

// ── Client Journey Process ─────────────────────────────────────────────────

export const process: ProcessStep[] = [
  {
    number: "01",
    label: "You Reach Out",
    description:
      "Tell us about your idea, problem, or product. No spec needed — we ask the right questions and help shape the brief.",
  },
  {
    number: "02",
    label: "We Plan",
    description:
      "We define the architecture, tech stack, milestones, and timeline. A clear plan before a single line of code is written.",
  },
  {
    number: "03",
    label: "We Build",
    description:
      "Development with regular check-ins, demos, and feedback rounds. You see working software at every milestone.",
  },
  {
    number: "04",
    label: "You Ship",
    description:
      "Production deployment, documentation, and handoff — or we stay on for ongoing support. Either way, you own it completely.",
  },
];

// ── Trust Metrics ──────────────────────────────────────────────────────────

export const metrics: Metric[] = [
  { value: 32,  suffix: "+",  label: "Products Shipped" },
  { value: 100, suffix: "%",  label: "On-Time Delivery" },
  { value: 18,  suffix: "+",  label: "Happy Clients" },
];

export const clientLogos: ClientLogo[] = [
  { name: "AEVUM GYM",          image: "/images/clients/aevum.png" },
  { name: "Karta",              image: "/images/clients/karta.png" },
  { name: "Student Dashboard",  image: "/images/clients/student-dashboard.png" },
  { name: "Code Space",         image: "/images/clients/code-space.png" },
  { name: "HealVerse",          image: "/images/clients/healverse.png" },
  { name: "AgriAssist",         image: "/images/clients/agriassist.png" },
];

// ── Team ───────────────────────────────────────────────────────────────────

export const team: TeamMember[] = [
  {
    id: "ashok",
    name: "Ashok Bongu",
    role: "Full-Stack Developer & Co-Founder",
    shortBio: "Leads architecture, backend systems, and client delivery.",
    fullBio:
      "Ashok leads engineering at AshRam — from system architecture and API design to deployment and client delivery. With a focus on building software that scales cleanly, he believes the best code is the kind that doesn't need explaining six months later. He is obsessed with shipping things that actually work in production.",
    image: "/images/team/ashok.png",
    social: [
      { platform: "GitHub",   url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter",  url: "#" },
    ],
  },
  {
    id: "sriram",
    name: "Sriram Bongu",
    role: "Frontend Developer & UI Designer",
    shortBio: "Builds interfaces that are fast, accessible, and beautiful.",
    fullBio:
      "Sriram handles everything the user sees — from React component architecture and animation systems to UI design and performance optimisation. He believes great frontend work is invisible: users simply move through it without friction. His interfaces are fast, accessible, and crafted to feel effortless.",
    image: "/images/team/sriram.png",
    social: [
      { platform: "GitHub",    url: "#" },
      { platform: "Dribbble",  url: "#" },
      { platform: "LinkedIn",  url: "#" },
    ],
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      "AshRam built our e-commerce platform end-to-end — auth, cart, payments — everything worked on day one. Clean code, no drama, delivered on time.",
    author: "Priya Mehra",
    role: "Founder",
    company: "Karta Shopping",
    outcome: "5K+ orders in first month",
  },
  {
    quote:
      "The gym site they built for us performs at 98 on Lighthouse and loads in under a second. Our online registrations went up immediately after launch.",
    author: "Rajesh Kumar",
    role: "Owner",
    company: "AEVUM GYM",
    outcome: "98% Lighthouse · <1s load",
  },
  {
    quote:
      "Our student dashboard handles 2,400 users with 99.9% uptime. The admin panel is genuinely good — our staff actually enjoy using it.",
    author: "Ananya Singh",
    role: "Academic Director",
    company: "Student Dashboard",
    outcome: "2.4K users · 99.9% uptime",
  },
];

// ── FAQs ───────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: "What types of projects do you take on?",
    answer:
      "We build web applications, mobile apps (iOS & Android), SaaS platforms, e-commerce stores, and internal tools. We also handle UI/UX design and brand identity for software products. Our sweet spot is 0→1 product builds for startups and SMEs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A simple web app or mobile app takes 6–10 weeks. A full SaaS platform with auth, billing, and dashboards is typically 3–5 months. We scope every project individually and give you a detailed timeline upfront — no vague estimates.",
  },
  {
    question: "What does your development process look like?",
    answer:
      "We run four phases: Discovery (requirements, architecture planning), Build (development with weekly demos), QA & Launch (testing, staging, deployment), and Handoff (documentation, training, or ongoing support). You see working software throughout — not just at the end.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "For web: React / Next.js frontend, Node.js backend, PostgreSQL or MongoDB. For mobile: React Native with Expo. For cloud: AWS or GCP. We choose the stack that fits your project — not the one we're most comfortable with by default.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We work remotely with clients across India, the Middle East, Southeast Asia, and Europe. All communication, reviews, and deliveries happen digitally — timezone differences are manageable.",
  },
  {
    question: "How do you price your projects?",
    answer:
      "Fixed-project pricing, not hourly rates. Every project gets a custom proposal based on scope, features, and timeline. We're transparent about what's included and what isn't. No hidden costs, no scope creep without agreement.",
  },
  {
    question: "Can you take over an existing codebase?",
    answer:
      "Yes. We do code audits first — we'll give you an honest assessment of what we're inheriting before we commit. If it's workable, we take it on. If it needs a rebuild, we'll say so and explain why.",
  },
  {
    question: "Do you offer maintenance after launch?",
    answer:
      "Yes. We offer ongoing support retainers — bug fixes, feature additions, performance monitoring, and security patches. Monthly scope is agreed upfront. Many of our clients stay on retainer after their initial project.",
  },
];

// ── Contact ────────────────────────────────────────────────────────────────

export const contact = {
  email: "hello@ashram.studio",
  phone: "+91 98765 43210",
  address: "Hyderabad, Telangana, India",
  availability: "Currently accepting projects for Q3 2026",
  socials: [
    { platform: "Instagram", url: "https://instagram.com", handle: "@ashram.studio" },
    { platform: "Behance",   url: "https://behance.net",   handle: "ashram-studio" },
    { platform: "LinkedIn",  url: "https://linkedin.com",  handle: "ashram-studio" },
    { platform: "Twitter",   url: "https://twitter.com",   handle: "@ashramstudio" },
  ],
};

// ── Footer ─────────────────────────────────────────────────────────────────

export const footer = {
  tagline: "Code that earns its keep.",
  copyright: `© ${new Date().getFullYear()} AshRam Studio. All rights reserved.`,
  columns: [
    {
      heading: "Studio",
      links: [
        { label: "About Us",  href: "/about" },
        { label: "Our Team",  href: "/team" },
        { label: "Process",   href: "/about#process" },
      ],
    },
    {
      heading: "Work",
      links: [
        { label: "Services",  href: "/services" },
        { label: "Portfolio", href: "/works" },
        { label: "Case Studies", href: "/works" },
      ],
    },
    {
      heading: "Connect",
      links: [
        { label: "Start a Project", href: "/contact" },
        { label: "Instagram",       href: "https://instagram.com" },
        { label: "Behance",         href: "https://behance.net" },
      ],
    },
  ] as FooterColumn[],
};
