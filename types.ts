export interface HonorAward {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface PortfolioFeature {
  name: string;
  details?: string[];
}

export interface PortfolioProduct {
  name: string;
  features: (string | PortfolioFeature)[];
}

export interface PortfolioProject {
  title: string;
  products: PortfolioProduct[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    googleScriptWebAppUrl: string;
  };
  topSkills: string[];
  languages: {
    name: string;
    proficiency: string;
  }[];
  certifications: Certification[];
  honorsAwards: HonorAward[];
  summary: string;
  experience: Experience[];
  education: Education[];
  ventures: Venture[];
  portfolio: PortfolioProject[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
}

export interface Venture {
    name: string;
    role: string;
    description: string;
}