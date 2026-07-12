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
  skills: [],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/neonetz", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/neonetz", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com/neonetz", icon: "twitter" },
  ],
};

export const projects: Project[] = [];

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const experiences: Experience[] = [];
