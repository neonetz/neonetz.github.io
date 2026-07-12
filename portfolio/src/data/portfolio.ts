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
    githubUrl: "https://github.com/lymuru/lymuru",
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
