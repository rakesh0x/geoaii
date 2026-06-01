export interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  website?: string;
  onboarded?: boolean;
  auth_provider?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => void;
  setUser: (user: User | null) => void;
}

export interface PlatformHealth {
  name: string;
  score: number;
  status: "Strong" | "Moderate" | "Weak" | "Missing";
  note?: string;
}

export interface OpportunityTopic {
  topic: string;
  visibility: number;
  status: "present" | "partial" | "missed";
}

export interface Insight {
  finding: string;
  recommendation: string;
  impact: "High" | "Medium" | "Low";
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  gain: number;
  impact: "High" | "Medium" | "Low";
  effort: "Low" | "Medium" | "High";
}

export interface CompetitorEntity {
  name: string;
  self?: boolean;
  scores: number[];
}

export interface SimulatorResult {
  answer: string;
  brands: string[];
  current_probability: number;
  potential_probability: number;
}
