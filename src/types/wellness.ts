export interface CheckInData {
  energy: number;
  sleep: string;
  hydration: boolean;
  screenTime: string;
  anxiety: number;
  motivation: string;
  date: string;
}

export interface WellnessReport {
  level: 'excellent' | 'good' | 'attention' | 'stress';
  message: string;
  insight: string;
  quote: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'sleep' | 'hydration' | 'screen' | 'food' | 'anxiety';
  completed: boolean;
  date: string;
}

export interface UserProgress {
  totalCheckIns: number;
  consecutiveDays: number;
  completedChallenges: number;
  badges: string[];
  lastCheckIn: string;
}
