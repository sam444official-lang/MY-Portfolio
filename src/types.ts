export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isFeatured?: boolean;
  features: string[];
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  architectureOverview: string;
  challengesSolved: string[];
  futureImprovements: string[];
  imagePlaceholderText: string;
  stats?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  progress: number; // 0-100
  category: "Frontend" | "Backend" | "Programming Languages" | "Databases" | "Developer Tools";
  iconName: string;
  relevantTech: string[];
  description?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  description: string;
  achievements: string[];
  coursework: string[];
  technicalFocus: string[];
}

export interface SoftSkill {
  id: string;
  title: string;
  iconName: string;
  description: string;
  examples: string;
}

export interface StatisticCard {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  iconName: string;
  trend?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface BillScanResult {
  providerName: string;
  monthlyUsageKwh: number;
  estimatedCarbonKg: number;
  sustainabilityRating: string;
  breakdown: { category: string; usagePercent: number; co2Kg: number }[];
  actionableTips: string[];
  reductionPotentialPercent: number;
}
