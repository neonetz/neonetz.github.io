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
    { name: "Python (Computer Vision)", level: 90, category: "backend" },
    { name: "TypeScript / React", level: 85, category: "frontend" },
    { name: "C (Systems Programming)", level: 80, category: "backend" },
    { name: "HTML / Tailwind CSS", level: 90, category: "frontend" },
    { name: "Image Processing / OpenCV", level: 85, category: "other" },
    { name: "Godot Engine", level: 70, category: "other" },
    { name: "Git / GitHub", level: 85, category: "devops" },
    { name: "Networking & Web Servers", level: 75, category: "devops" },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/neonetz", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/neonetz", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/neonetz", icon: "twitter" },
  ],
};

export const projects: Project[] = [
  {
    id: "esa-loan-microservices",
    title: "Loan Microservices",
    description: "Enterprise architecture assignment focusing on loan management microservices.",
    longDescription: `A university assignment focusing on Enterprise Architecture (ESA). This project implements a loan microservice architecture, dealing with complex enterprise patterns, distributed systems, and potentially event-driven designs.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "TypeScript", level: 85, category: "backend" },
      { name: "Microservices", level: 80, category: "backend" },
      { name: "Enterprise Architecture", level: 75, category: "other" },
    ],
    githubUrl: "https://github.com/neonetz/esa-loan-microservices",
    status: "completed",
  },
  {
    id: "esa-e-commerce",
    title: "E-Commerce Microservices",
    description: "Implementation of Saga Pattern & Resilience Pattern for E-Commerce.",
    longDescription: `An advanced microservices project implementing the Saga Pattern and Resilience Patterns for an E-Commerce backend. Built to handle distributed transactions and ensure fault tolerance across multiple independent services.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Microservices", level: 85, category: "backend" },
      { name: "Saga Pattern", level: 80, category: "backend" },
      { name: "Resilience Design", level: 75, category: "other" },
    ],
    githubUrl: "https://github.com/neonetz/esa-e-commerce",
    status: "completed",
  },
  {
    id: "anticheat-system",
    title: "Anti-Cheat System",
    description: "Digital image processing project for detecting cheating.",
    longDescription: `A computer vision-based project developed for an academic assignment (Pengolahan Citra Digital). 
    It utilizes Python and image processing techniques to analyze visual data and detect potential anomalies or cheating behaviors.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 90, category: "backend" },
      { name: "OpenCV", level: 85, category: "backend" },
      { name: "Image Processing", level: 80, category: "other" },
    ],
    githubUrl: "https://github.com/neonetz/AntiCheatSystem",
    status: "completed",
  },
  {
    id: "virtual-tryon",
    title: "Virtual Try-On (Godot)",
    description: "Virtual clothing try-on system integrated with Godot Engine.",
    longDescription: `An innovative virtual fitting room application. This project connects Python-based computer vision logic with the Godot Engine to render a virtual try-on experience, mapping clothing onto user movements in real-time.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Python", level: 90, category: "backend" },
      { name: "Godot Engine", level: 75, category: "other" },
      { name: "Computer Vision", level: 85, category: "backend" },
    ],
    githubUrl: "https://github.com/neonetz/Virtual-TryOn-in-Godot",
    status: "in-progress",
  },
  {
    id: "webserver-c",
    title: "C Web Server",
    description: "A custom web server built from scratch using C.",
    longDescription: `A low-level systems programming project that involves creating a functional HTTP web server entirely in C. 
    It handles socket programming, network connections, and HTTP request parsing directly at the OS level.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "C", level: 85, category: "backend" },
      { name: "Socket Programming", level: 80, category: "devops" },
      { name: "HTTP Protocol", level: 75, category: "devops" },
    ],
    githubUrl: "https://github.com/neonetz/WebServerC",
    status: "completed",
  },
  {
    id: "project3-odoo",
    title: "Odoo ERP Template",
    description: "Template repository for running and configuring Odoo ERP.",
    longDescription: `A template configuration project for deploying and managing Odoo ERP systems. It involves setting up the environment, modules, and business logic structures for enterprise resource planning.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "Odoo", level: 80, category: "other" },
      { name: "Python", level: 85, category: "backend" },
      { name: "ERP Systems", level: 70, category: "other" },
    ],
    githubUrl: "https://github.com/neonetz/project3-odoo-template",
    status: "completed",
  },
  {
    id: "portfolio-website",
    title: "Interactive Portfolio",
    description: "Sci-fi themed personal developer portfolio.",
    longDescription: `The website you are currently viewing. Built with a modern tech stack featuring React, TypeScript, and Tailwind CSS. 
    It employs a custom sci-fi/terminal aesthetic inspired by video game UI, utilizing Framer Motion for smooth animations and transitions.`,
    image: "/img/logo.jpeg",
    techStack: [
      { name: "React", level: 90, category: "frontend" },
      { name: "TypeScript", level: 85, category: "frontend" },
      { name: "Tailwind CSS", level: 95, category: "frontend" },
      { name: "Framer Motion", level: 80, category: "frontend" },
    ],
    liveUrl: "https://neonetz.github.io",
    githubUrl: "https://github.com/neonetz/neonetz.github.io",
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
