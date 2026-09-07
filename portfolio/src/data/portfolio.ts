export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'other';

export interface TechStack {
  name: string;
  category: SkillCategory;
  /** Bundled brand SVG under /skills (see scripts/fetch-skill-logos.mjs). Absent = letter fallback. */
  logo?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  about: string;
  avatar: string;
  skills: TechStack[];
  socialLinks: SocialLink[];
  location: string;
  email: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const projectStatusLabels: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  archived: 'Archived',
};

export const profile: Profile = {
  name: "Muhammad Adhyaksa Fadillah",
  role: "Software Developer",
  tagline: "Building digital experiences through code",
  bio: `A passionate developer with a keen eye for detail and a love for creating seamless digital experiences.
  Specializing in full-stack development with expertise in building responsive web applications and automation tools.
  Committed to writing clean, maintainable code and staying updated with the latest technologies.`,
  about: `I'm a developer from Indonesia who enjoys building things end to end: desktop apps with Go and Wails,
  web frontends with React and TypeScript, and the occasional Odoo module or computer-vision experiment.
  Most of my projects start as tools I wanted for myself, then grow into something other people can use too.
  I care about clean structure, small details, and software that keeps working after the demo ends.`,
  avatar: "/img/aksa.webp",
  location: "Indonesia",
  email: "aksafadillah@gmail.com",
  skills: [
    { name: "Go", category: "backend", logo: "/skills/go.svg" },
    { name: "Wails (Desktop Apps)", category: "other", logo: "/skills/wails.svg" },
    { name: "React / TypeScript", category: "frontend", logo: "/skills/react.svg" },
    { name: "Tailwind CSS", category: "frontend", logo: "/skills/tailwindcss.svg" },
    { name: "SQLite", category: "database", logo: "/skills/sqlite.svg" },
    { name: "Python", category: "backend", logo: "/skills/python.svg" },
    { name: "OpenCV", category: "other", logo: "/skills/opencv.svg" },
    { name: "MediaPipe", category: "other", logo: "/skills/mediapipe.svg" },
    { name: "Odoo", category: "other", logo: "/skills/odoo.svg" },
    { name: "PostgreSQL", category: "database", logo: "/skills/postgresql.svg" },
    { name: "Flask", category: "backend", logo: "/skills/flask.svg" },
    { name: "TensorFlow Lite", category: "other", logo: "/skills/tensorflow.svg" },
    { name: "Firebase", category: "database", logo: "/skills/firebase.svg" },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/neonetz", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/neonetz", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/neonetz", icon: "twitter" },
  ],
};

export const projects: Project[] = [
  {
    id: "jazasort",
    title: "JazaSort",
    description: "Native Windows desktop file organizer with automatic sorting, duplicate detection, and one-click undo.",
    longDescription: `A blazingly fast, zero-configuration native Windows desktop application built with Go and Wails. Automatically sorts messy folders (Downloads, Desktop) into organized structures by file type. Features Windows 11 Mica/Acrylic glass UI, SHA-256 duplicate detection, metadata-based sorting for photos and music, one-click undo, and a RAM optimizer.`,
    image: "/img/logo.jpeg",
    tech: ["Go", "Wails", "React", "TypeScript", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/neonetz/JazaSort",
    status: "completed",
  },
  {
    id: "lymuru",
    title: "Lymuru",
    description: "Desktop music downloader supporting Tidal, Amazon Music, Qobuz and Deezer with FLAC/MP3/M4A output.",
    longDescription: `A native desktop application for searching and downloading high-quality music from multiple providers including Tidal, Amazon Music, Qobuz, and Deezer. Built with Go and Wails with a React 19 frontend. Features include audio conversion (FLAC/MP3/M4A), spectrum analyzer, resampler, synced lyrics via LRCLIB, CJK romanization, download queue with SQLite history, and OS keychain credential management.`,
    image: "/img/logo.jpeg",
    tech: ["Go", "Wails", "React", "TypeScript", "SQLite", "Python"],
    githubUrl: "https://github.com/rioBMO/Lymuru",
    status: "completed",
  },
  {
    id: "lsp-asesor",
    title: "LSP Assessor Management",
    description: "Odoo 19 module for assessor assignment and scheduling with round-robin algorithm.",
    longDescription: `Custom Odoo 19 module for Lembaga Sertifikasi Profesi (LSP) that automates assessor scheduling, distribution, and validation. Uses a round-robin algorithm with a 1:10 assessor-to-participant ratio, includes quota validation, lock/unlock workflows with audit trails, encrypted assignment forms, and a QWeb portal for assessors.`,
    image: "/img/logo.jpeg",
    tech: ["Python", "Odoo 19", "PostgreSQL", "QWeb"],
    githubUrl: "https://github.com/proyek3-odoo-sertifikasi/plugins_manajement_asesor",
    status: "completed",
  },
  {
    id: "anticheat-system",
    title: "AI Proctoring System",
    description: "Real-time exam proctoring with computer vision: head pose, gaze, and multiple face detection.",
    longDescription: `An AI-powered proctoring system that monitors students via webcam in real-time. Uses MediaPipe Face Mesh for 468-landmark detection, PnP algorithm for head pose estimation, and iris tracking for 9-direction gaze analysis. Detects cheating indicators: looking away, eyes closed, multiple faces, and face loss. Includes a Streamlit admin dashboard for multi-student monitoring.`,
    image: "/img/logo.jpeg",
    tech: ["Python", "OpenCV", "MediaPipe", "Streamlit"],
    githubUrl: "https://github.com/neonetz/AntiCheatSystem",
    status: "completed",
  },
  {
    id: "mosq-iot",
    title: "MosQ IoT",
    description: "IoT mosquito monitoring with ML species classification and real-time dashboard.",
    longDescription: `An IoT-based Aedes mosquito trap monitoring system. ESP32-CAM devices capture images, a Flask server classifies mosquito species using TensorFlow Lite (7 species including DBD vectors), and a React dashboard displays real-time data with interactive maps, charts, and device analytics powered by Firebase Realtime Database.`,
    image: "/img/logo.jpeg",
    tech: ["React", "Flask", "TensorFlow Lite", "Firebase", "ESP32-CAM"],
    githubUrl: "https://github.com/rioBMO/Mosq-IOT",
    status: "completed",
  },
];

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experiences: Experience[] = [];
