export interface Profile {
  id: string;
  name: string;
  email: string | null;
  bio: string | null;
  about: string | null;
  profile_photo_url: string | null;
  cv_url: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  tech_stack: string[];
  order_index: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string | null;
  order_index: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  score: string | null;
  order_index: number;
}

export interface Skill {
  id: string;
  category: string;
  skills: string[];
  order_index: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  order_index: number;
}
