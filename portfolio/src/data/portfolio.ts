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
  avatar: "/img/logo.jpeg",
  location: "Indonesia",
  email: "adhyaksa@example.com",
  skills: [
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React.js", level: 85, category: "frontend" },
    { name: "Python", level: 88, category: "backend" },
    { name: "Django", level: 75, category: "backend" },
    { name: "SQL/Database", level: 80, category: "database" },
    { name: "Git/GitHub", level: 90, category: "devops" },
    { name: "UI/UX Design", level: 70, category: "other" },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/neonetz", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/neonetz", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/neonetz", icon: "twitter" },
  ],
};

export const projects: Project[] = [
  {
    id: "portfolio-v1",
    title: "Personal Portfolio v1",
    description: "First iteration of my personal portfolio website",
    longDescription: `A clean and minimalist portfolio website built with vanilla HTML, CSS, and JavaScript. 
    Features smooth scrolling navigation, responsive design, and a dark theme optimized for readability. 
    This project showcases my early web development skills and understanding of fundamental web technologies.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "HTML5", level: 95, category: "frontend" },
      { name: "CSS3", level: 90, category: "frontend" },
      { name: "JavaScript", level: 85, category: "frontend" },
    ],
    liveUrl: "https://neonetz.github.io",
    githubUrl: "https://github.com/neonetz/neonetz.github.io",
    status: "completed",
  },
  {
    id: "berita-scraper",
    title: "Berita Scraper",
    description: "Automated news scraping tool with Django backend",
    longDescription: `A web scraping application that automatically collects news articles from various Indonesian news websites. 
    Built with Python and BeautifulSoup for parsing, Django for the web interface, and SQLite for data storage. 
    Includes scheduled tasks for automatic content updates and a search functionality.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 90, category: "backend" },
      { name: "Django", level: 85, category: "backend" },
      { name: "BeautifulSoup", level: 80, category: "backend" },
      { name: "SQLite", level: 75, category: "database" },
    ],
    githubUrl: "https://github.com/neonetz/berita-scraper",
    status: "completed",
  },
  {
    id: "automation-scripts",
    title: "Automation Scripts",
    description: "Collection of Python automation utilities",
    longDescription: `A repository of Python scripts designed to automate repetitive tasks. 
    Includes file organization scripts, email automation, social media posting tools, and data processing utilities. 
    Built with modularity in mind for easy customization and reuse.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 92, category: "backend" },
      { name: "Selenium", level: 75, category: "backend" },
      { name: "Pandas", level: 80, category: "backend" },
    ],
    githubUrl: "https://github.com/neonetz/automation-scripts",
    status: "in-progress",
  },
  {
    id: "music-player",
    title: "Web Music Player",
    description: "Custom music player with playlist management",
    longDescription: `A feature-rich web-based music player built with vanilla JavaScript. 
    Features include playlist management, shuffle and repeat modes, volume control, 
    keyboard shortcuts, and a modern dark-themed UI. Uses the Web Audio API for audio processing.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "HTML5", level: 90, category: "frontend" },
      { name: "CSS3", level: 88, category: "frontend" },
      { name: "JavaScript", level: 90, category: "frontend" },
      { name: "Web Audio API", level: 70, category: "frontend" },
    ],
    status: "archived",
  },
];

export const experiences = [
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    description: "Developing custom web applications and automation tools for clients",
  },
  {
    title: "Web Development Intern",
    company: "Tech Startup",
    period: "2022 - 2023",
    description: "Assisted in building and maintaining company websites",
  },
];
