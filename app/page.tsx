 "use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  Code2,
  Languages,
  Menu,
  Network,
  Workflow,
  X,
} from "lucide-react";

type Locale = "en" | "bn";

const copy = {
  en: {
    nav: ["About", "Experience", "Projects", "Operations Lab", "Insights"],
    eyebrow: "OPERATIONS • PEOPLE • PROCESS • TECHNOLOGY",
    headlineA: "Building better",
    headlineB: "operations.",
    intro:
      "I’m Md Shahin Alam — an operations and logistics professional focused on turning complex workflows into clear, measurable and scalable systems.",
    primary: "Explore my work",
    secondary: "Let’s connect",
    proof: "8+ years in operations · Courier & e-commerce logistics · Process improvement",
    metrics: [
      ["50K+", "Daily parcels overseen", "Current operational scope"],
      ["190+", "Team members", "Led through team leads"],
      ["11", "Operational functions", "Cross-functional leadership"],
      ["40%", "TAT reduction", "Process improvement result"],
    ],
    aboutLabel: "A practical approach to operational excellence",
    aboutTitle: "People first. Process always. Technology with purpose.",
    aboutText:
      "I work at the intersection of frontline operations, team leadership and process design. My focus is to make work easier to execute, easier to measure and easier to improve.",
    pillars: [
      ["People", "Build capable teams with clear ownership, coaching and performance routines."],
      ["Process", "Design practical SOPs, remove bottlenecks and improve quality at the source."],
      ["Technology", "Use fit-for-purpose automation, data and digital tools to reduce friction."],
    ],
    experienceLabel: "Experience",
    experienceTitle: "Operational leadership grounded in the field.",
    roles: [
      ["Assistant Manager – Operations", "Carrybee Express Ltd. · Jan 2026 – Present", "Leading multi-function courier operations, regional sub-sort activities and daily service performance."],
      ["Senior Executive – Operations", "Carrybee Express Ltd. · Nov 2024 – Dec 2025", "Operations planning, bottleneck analysis, cross-functional improvement and peak-season workforce planning."],
      ["Senior Operations Associate", "Pathao Ltd. · Jun 2023 – Oct 2024", "Sort and hub operations, workforce coordination and service-level execution at scale."],
      ["Operations Associate", "Pathao Ltd. · Sep 2019 – May 2023", "Inbound operations, parcel dispatch coordination, documentation and zone-level quality."],
    ],
    projectsLabel: "Selected work",
    projectsTitle: "Turning operational problems into useful systems.",
    projects: [
      ["Operations & KPI toolkit", "A practical knowledge base for operational definitions, performance measures and improvement thinking.", "Operations Lab"],
      ["Career portal", "A digital product concept exploring structured career information and user workflows.", "Product concept"],
      ["Productivity monitor", "A lightweight system concept for visibility into work patterns and productivity.", "Digital tool"],
    ],
    labLabel: "Operations Lab",
    labTitle: "Make operations measurable.",
    labText:
      "A growing collection of practical frameworks, KPI explainers and calculators for teams that want better visibility and more consistent execution.",
    labItems: [
      ["KPI Library", "Understand metric definitions, calculation logic and interpretation."],
      ["Calculators", "Explore operational scenarios with transparent assumptions."],
      ["Team Frameworks", "Connect ownership, routines and service outcomes."],
    ],
    insightsLabel: "Knowledge hub",
    insightsTitle: "Ideas from the work, shared clearly.",
    insightsText:
      "Articles, field notes and practical guides on logistics, operations management, leadership and continuous improvement.",
    contactTitle: "Let’s build better ways of working.",
    contactText:
      "For professional conversations, collaboration and operations-focused opportunities.",
    contact: "Email me",
    footer: "Building Better Operations Through People, Process & Technology.",
    note: "This is the first design foundation. Content and project details will be reviewed before public launch.",
  },
  bn: {
    nav: ["পরিচিতি", "অভিজ্ঞতা", "প্রজেক্ট", "অপারেশনস ল্যাব", "লেখালেখি"],
    eyebrow: "অপারেশনস • মানুষ • প্রক্রিয়া • প্রযুক্তি",
    headlineA: "আরও উন্নত",
    headlineB: "অপারেশন গড়ি।",
    intro:
      "আমি মোঃ শাহিন আলম—অপারেশনস ও লজিস্টিকস পেশাজীবী। জটিল কর্মপ্রবাহকে সহজ, পরিমাপযোগ্য ও সম্প্রসারণযোগ্য ব্যবস্থায় রূপ দেওয়াই আমার কাজের লক্ষ্য।",
    primary: "আমার কাজ দেখুন",
    secondary: "যোগাযোগ করুন",
    proof: "৮+ বছরের অভিজ্ঞতা · কুরিয়ার ও ই-কমার্স লজিস্টিকস · প্রক্রিয়া উন্নয়ন",
    metrics: [
      ["৫০K+", "দৈনিক পার্সেল", "বর্তমান অপারেশনাল পরিধি"],
      ["১৯০+", "টিম সদস্য", "টিম লিডের মাধ্যমে নেতৃত্ব"],
      ["১১", "অপারেশনাল ফাংশন", "বিভিন্ন বিভাগের সমন্বয়"],
      ["৪০%", "TAT হ্রাস", "প্রক্রিয়া উন্নয়নের ফল"],
    ],
    aboutLabel: "অপারেশনাল উৎকর্ষে বাস্তবভিত্তিক দৃষ্টিভঙ্গি",
    aboutTitle: "মানুষ আগে। প্রক্রিয়া নিয়মিত। প্রযুক্তি প্রয়োজনমতো।",
    aboutText:
      "ফ্রন্টলাইন অপারেশনস, টিম লিডারশিপ ও প্রক্রিয়া ডিজাইনের সমন্বয়ে কাজ করি। কাজকে সহজে বাস্তবায়ন, পরিমাপ ও উন্নত করার উপযোগী করাই আমার লক্ষ্য।",
    pillars: [
      ["মানুষ", "দায়িত্ব, প্রশিক্ষণ ও পারফরম্যান্স রুটিনের মাধ্যমে দক্ষ টিম গড়ে তোলা।"],
      ["প্রক্রিয়া", "কার্যকর SOP তৈরি, প্রতিবন্ধকতা কমানো ও কাজের শুরুতেই মান নিশ্চিত করা।"],
      ["প্রযুক্তি", "অটোমেশন, ডেটা ও ডিজিটাল টুল দিয়ে অপ্রয়োজনীয় জটিলতা কমানো।"],
    ],
    experienceLabel: "অভিজ্ঞতা",
    experienceTitle: "মাঠপর্যায়ের অভিজ্ঞতায় গড়ে ওঠা অপারেশনাল নেতৃত্ব।",
    roles: [
      ["Assistant Manager – Operations", "Carrybee Express Ltd. · জানু ২০২৬ – বর্তমান", "বহুমুখী কুরিয়ার অপারেশনস, আঞ্চলিক সাব-সোর্ট এবং দৈনিক সার্ভিস পারফরম্যান্স পরিচালনা।"],
      ["Senior Executive – Operations", "Carrybee Express Ltd. · নভে ২০২৪ – ডিসে ২০২৫", "অপারেশনস পরিকল্পনা, bottleneck বিশ্লেষণ, বিভাগীয় উন্নয়ন ও মৌসুমি জনবল পরিকল্পনা।"],
      ["Senior Operations Associate", "Pathao Ltd. · জুন ২০২৩ – অক্টো ২০২৪", "বৃহৎ পরিসরে সর্ট ও হাব অপারেশনস, জনবল সমন্বয় এবং SLA বাস্তবায়ন।"],
      ["Operations Associate", "Pathao Ltd. · সেপ্টে ২০১৯ – মে ২০২৩", "ইনবাউন্ড অপারেশনস, পার্সেল ডিসপ্যাচ, ডকুমেন্টেশন ও জোনভিত্তিক মান নিয়ন্ত্রণ।"],
    ],
    projectsLabel: "নির্বাচিত কাজ",
    projectsTitle: "অপারেশনাল সমস্যাকে কার্যকর সিস্টেমে রূপ দেওয়া।",
    projects: [
      ["Operations & KPI toolkit", "অপারেশনাল সংজ্ঞা, পারফরম্যান্স মেট্রিক ও উন্নয়ন চিন্তার ব্যবহারিক জ্ঞানভান্ডার।", "Operations Lab"],
      ["Career portal", "ক্যারিয়ার তথ্য ও ব্যবহারকারীর কর্মপ্রবাহ নিয়ে একটি ডিজিটাল পণ্য ধারণা।", "Product concept"],
      ["Productivity monitor", "কাজের ধরণ ও উৎপাদনশীলতা বোঝার জন্য একটি হালকা সিস্টেম ধারণা।", "Digital tool"],
    ],
    labLabel: "Operations Lab",
    labTitle: "অপারেশনসকে পরিমাপযোগ্য করুন।",
    labText:
      "টিমের কাজের দৃশ্যমানতা ও ধারাবাহিকতা বাড়াতে KPI ব্যাখ্যা, ব্যবহারিক ফ্রেমওয়ার্ক এবং ক্যালকুলেটরের সংগ্রহ।",
    labItems: [
      ["KPI Library", "মেট্রিকের সংজ্ঞা, হিসাবের পদ্ধতি ও ব্যাখ্যা বুঝুন।"],
      ["Calculators", "স্বচ্ছ অনুমানের ভিত্তিতে অপারেশনাল পরিস্থিতি বিশ্লেষণ করুন।"],
      ["Team Frameworks", "দায়িত্ব, কাজের রুটিন ও সার্ভিস ফলাফলের সংযোগ তৈরি করুন।"],
    ],
    insightsLabel: "Knowledge hub",
    insightsTitle: "কাজের অভিজ্ঞতা থেকে সহজ ভাষায় ভাবনা।",
    insightsText:
      "লজিস্টিকস, অপারেশনস ম্যানেজমেন্ট, নেতৃত্ব ও ধারাবাহিক উন্নয়ন বিষয়ে লেখা ও ব্যবহারিক গাইড।",
    contactTitle: "চলুন, কাজের আরও ভালো পদ্ধতি তৈরি করি।",
    contactText: "পেশাগত আলোচনা, সহযোগিতা ও অপারেশনস-কেন্দ্রিক সুযোগের জন্য যোগাযোগ করুন।",
    contact: "ইমেইল করুন",
    footer: "মানুষ, প্রক্রিয়া ও প্রযুক্তির মাধ্যমে উন্নত অপারেশন গড়ে তোলা।",
    note: "এটি প্রাথমিক ডিজাইন ভিত্তি। প্রকাশের আগে কনটেন্ট ও প্রজেক্টের তথ্য যাচাই করা হবে।",
  },
} as const;

const icons = [Network, Workflow, Code2];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[locale];

  return (
    <main>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="SHAHIN4L home">
            <span className="brand-mark">S4L</span>
            <span>SHAHIN4L<small>Md Shahin Alam</small></span>
          </a>
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            {t.nav.map((item, i) => (
              <a key={item} href={["#about", "#experience", "#projects", "/operations", "/blog"][i]} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="lang-button" onClick={() => setLocale(locale === "en" ? "bn" : "en")} aria-label="Change language">
              <Languages size={16} /> {locale === "en" ? "বাংলা" : "English"}
            </button>
            <a className="button button-small" href="mailto:shahin4l.bd@gmail.com">{t.contact}</a>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />{t.eyebrow}</div>
            <h1>{t.headlineA}<br /><span>{t.headlineB}</span></h1>
            <p className="lead">{t.intro}</p>
            <div className="hero-actions">
              <a className="button" href="#projects">{t.primary}<ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href="#contact">{t.secondary}<ArrowDownRight size={17} /></a>
            </div>
            <p className="proof"><Check size={16} />{t.proof}</p>
          </div>
          <div className="hero-art" aria-label="SHAHIN4L brand graphic">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="monogram"><span>SHAHIN</span><strong>4L</strong><small>OPERATIONS THINKING</small></div>
            <div className="floating-card card-top"><ChartNoAxesCombined size={18} /><span>MEASURABLE<br />IMPROVEMENT</span></div>
            <div className="floating-card card-bottom"><Boxes size={18} /><span>PEOPLE · PROCESS<br />TECHNOLOGY</span></div>
          </div>
        </div>
        <div className="container metric-grid">
          {t.metrics.map(([value, label, detail]) => (
            <div className="metric-card" key={label}><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="container split">
          <div>
            <p className="eyebrow eyebrow-light">{t.aboutLabel}</p>
            <h2>{t.aboutTitle}</h2>
            <p className="body-copy">{t.aboutText}</p>
          </div>
          <div className="pillar-list">
            {t.pillars.map(([title, desc], i) => {
              const Icon = icons[i];
              return <article className="pillar" key={title}><div className="icon-box"><Icon size={21} /></div><div><h3>{title}</h3><p>{desc}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="experience">
        <div className="container">
          <div className="section-heading"><p className="eyebrow eyebrow-light">{t.experienceLabel}</p><h2>{t.experienceTitle}</h2></div>
          <div className="timeline">
            {t.roles.map(([role, org, desc], i) => <article className="timeline-item" key={role}>
              <div className="timeline-index">0{i + 1}</div>
              <div><h3>{role}</h3><p className="timeline-org">{org}</p><p>{desc}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div className="section-heading"><p className="eyebrow eyebrow-light">{t.projectsLabel}</p><h2>{t.projectsTitle}</h2></div>
          <div className="project-grid">
            {t.projects.map(([title, desc, tag], i) => <article className="project-card" key={title}>
              <div className="project-visual"><span>0{i + 1}</span><div className="visual-lines"><i /><i /><i /></div><ArrowUpRight size={22} /></div>
              <div className="project-content"><span className="tag">{tag}</span><h3>{title}</h3><p>{desc}</p><span className="text-link">Details coming soon <ArrowRight size={15} /></span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="operations">
        <div className="container">
          <div className="section-heading"><p className="eyebrow">{t.labLabel}</p><h2>{t.labTitle}</h2><p className="dark-copy">{t.labText}</p></div>
          <div className="lab-grid">
            {t.labItems.map(([title, desc], i) => <article className="lab-card" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight size={18} /></article>)}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="insights">
        <div className="container insight-row"><div><p className="eyebrow eyebrow-light">{t.insightsLabel}</p><h2>{t.insightsTitle}</h2></div><p className="body-copy">{t.insightsText}</p></div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container contact-box">
          <div><p className="eyebrow">{locale === "en" ? "START A CONVERSATION" : "আলোচনা শুরু করি"}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div>
          <a className="button button-light" href="mailto:shahin4l.bd@gmail.com">{t.contact}<ArrowUpRight size={17} /></a>
        </div>
      </section>

      <footer className="footer"><div className="container footer-row"><a className="brand brand-footer" href="#home"><span className="brand-mark">S4L</span><span>SHAHIN4L<small>Md Shahin Alam</small></span></a><p>{t.footer}</p><span>© {new Date().getFullYear()} SHAHIN4L</span></div></footer>
      <p className="container launch-note">{t.note}</p>
    </main>
  );
}
