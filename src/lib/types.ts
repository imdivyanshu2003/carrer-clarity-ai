export type Language = "hi" | "en";

export interface QuestionOption {
  id: string;
  text: {
    en: string;
    hi: string;
  };
  traits: {
    creative: number;
    analytical: number;
    leader: number;
    supporter: number;
    risk_taker: number;
    stable: number;
    social: number;
    independent: number;
  };
}

export interface Question {
  id: number;
  type: "mcq" | "open";
  text: {
    en: string;
    hi: string;
  };
  subtitle?: {
    en: string;
    hi: string;
  };
  options?: QuestionOption[];
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId?: string;
  openText?: string;
}

export interface PersonalityTraits {
  creative: number;
  analytical: number;
  leader: number;
  supporter: number;
  risk_taker: number;
  stable: number;
  social: number;
  independent: number;
}

export interface CareerRecommendation {
  title: string;
  whyItFits: string;
  realWorldContext: string;
}

export interface AvoidCareer {
  title: string;
  reason: string;
}

export interface ActionPlan {
  skillToLearn: string;
  smallProject: string;
  direction: string;
  weeklyBreakdown: string[];
}

export interface CareerReport {
  personalitySummary: string;
  strengths: string[];
  weaknesses: string[];
  thinkingStyle: string;
  topCareers: CareerRecommendation[];
  avoidCareers: AvoidCareer[];
  actionPlan: ActionPlan;
}

export interface PremiumReport {
  deepPersonality: string;
  coreValues: string[];
  skillRoadmap: {
    skill: string;
    why: string;
    howToLearn: string;
    timeframe: string;
  }[];
  careerStrategy: {
    shortTerm: string;
    midTerm: string;
    longTerm: string;
  };
  mistakesToAvoid: {
    mistake: string;
    consequence: string;
    whatToDo: string;
  }[];
  detailedActionPlan: {
    week: number;
    focus: string;
    tasks: string[];
    outcome: string;
  }[];
  motivationalNote: string;
}

export interface AppState {
  language: Language | null;
  currentQuestion: number;
  answers: UserAnswer[];
  report: CareerReport | null;
  premiumReport: PremiumReport | null;
  isPaid: boolean;
  isUpgraded: boolean;
  isAnalyzing: boolean;
  paymentOrderId: string | null;
  whatsappNumber: string;
  userEmail: string;
}
