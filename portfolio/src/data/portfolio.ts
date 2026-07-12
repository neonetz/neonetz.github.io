export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: TechStack[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
}

export interface TechStack {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
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

export const profile: Profile = {
  name: "Muhammad Adhyaksa Fadillah",
  role: "Software Developer",
  tagline: "Building digital experiences through code",
  bio: `A passionate developer with a keen eye for detail and a love for creating seamless digital experiences. 
  Specializing in full-stack development with expertise in building responsive web applications and automation tools. 
  Committed to writing clean, maintainable code and staying updated with the latest technologies.`,
  avatar: "/img/aksa.webp",
  location: "Indonesia",
  email: "aksafadillah@gmail.com",
  skills: [
    { name: "Go", level: 80, category: "backend" },
    { name: "Wails (Desktop Apps)", level: 75, category: "other" },
    { name: "React / TypeScript", level: 85, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "SQLite", level: 70, category: "database" },
    { name: "Python", level: 85, category: "backend" },
    { name: "OpenCV", level: 85, category: "other" },
    { name: "MediaPipe", level: 80, category: "other" },
    { name: "Odoo", level: 75, category: "other" },
    { name: "PostgreSQL", level: 70, category: "database" },
    { name: "Flask", level: 75, category: "backend" },
    { name: "TensorFlow Lite", level: 70, category: "other" },
    { name: "Firebase", level: 70, category: "database" },
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
    techStack: [
      { name: "Go", level: 80, category: "backend" },
      { name: "Wails", level: 75, category: "other" },
      { name: "React", level: 85, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
      { name: "Tailwind CSS", level: 90, category: "frontend" },
      { name: "Chart.js", level: 70, category: "frontend" },
    ],
    githubUrl: "https://github.com/neonetz/JazaSort",
    status: "completed",
  },
  {
    id: "lymuru",
    title: "Lymuru",
    description: "Desktop music downloader supporting Tidal, Amazon Music, Qobuz and Deezer with FLAC/MP3/M4A output.",
    longDescription: `A native desktop application for searching and downloading high-quality music from multiple providers including Tidal, Amazon Music, Qobuz, and Deezer. Built with Go and Wails with a React 19 frontend. Features include audio conversion (FLAC/MP3/M4A), spectrum analyzer, resampler, synced lyrics via LRCLIB, CJK romanization, download queue with SQLite history, and OS keychain credential management.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Go", level: 80, category: "backend" },
      { name: "Wails", level: 75, category: "other" },
      { name: "React", level: 85, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
      { name: "SQLite", level: 70, category: "database" },
      { name: "Python", level: 85, category: "backend" },
    ],
    githubUrl: "https://github.com/rioBMO/Lymuru",
    status: "completed",
  },
  {
    id: "lsp-asesor",
    title: "LSP Assessor Management",
    description: "Odoo 19 module for assessor assignment and scheduling with round-robin algorithm.",
    longDescription: `Custom Odoo 19 module for Lembaga Sertifikasi Profesi (LSP) that automates assessor scheduling, distribution, and validation. Uses a round-robin algorithm with a 1:10 assessor-to-participant ratio, includes quota validation, lock/unlock workflows with audit trails, encrypted assignment forms, and a QWeb portal for assessors.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 85, category: "backend" },
      { name: "Odoo 19", level: 75, category: "other" },
      { name: "PostgreSQL", level: 70, category: "database" },
      { name: "QWeb", level: 70, category: "frontend" },
    ],
    githubUrl: "https://github.com/proyek3-odoo-sertifikasi/plugins_manajement_asesor",
    status: "completed",
  },
  {
    id: "anticheat-system",
    title: "AI Proctoring System",
    description: "Real-time exam proctoring with computer vision — head pose, gaze, and multiple face detection.",
    longDescription: `An AI-powered proctoring system that monitors students via webcam in real-time. Uses MediaPipe Face Mesh for 468-landmark detection, PnP algorithm for head pose estimation, and iris tracking for 9-direction gaze analysis. Detects cheating indicators: looking away, eyes closed, multiple faces, and face loss. Includes a Streamlit admin dashboard for multi-student monitoring.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 85, category: "backend" },
      { name: "OpenCV", level: 85, category: "other" },
      { name: "MediaPipe", level: 80, category: "other" },
      { name: "Streamlit", level: 75, category: "frontend" },
    ],
    githubUrl: "https://github.com/neonetz/AntiCheatSystem",
    status: "completed",
  },
  {
    id: "mosq-iot",
    title: "MosQ IoT",
    description: "IoT mosquito monitoring with ML species classification and real-time dashboard.",
    longDescription: `An IoT-based Aedes mosquito trap monitoring system. ESP32-CAM devices capture images, a Flask server classifies mosquito species using TensorFlow Lite (7 species including DBD vectors), and a React dashboard displays real-time data with interactive maps, charts, and device analytics powered by Firebase Realtime Database.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "React", level: 85, category: "frontend" },
      { name: "Flask", level: 75, category: "backend" },
      { name: "TensorFlow Lite", level: 70, category: "other" },
      { name: "Firebase", level: 70, category: "database" },
      { name: "ESP32-CAM", level: 65, category: "other" },
    ],
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
