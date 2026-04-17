import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PersonalityTraits, UserAnswer } from "./types";
import { questions } from "./questions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTraits(answers: UserAnswer[]): PersonalityTraits {
  const traits: PersonalityTraits = {
    creative: 0,
    analytical: 0,
    leader: 0,
    supporter: 0,
    risk_taker: 0,
    stable: 0,
    social: 0,
    independent: 0,
  };

  answers.forEach((answer) => {
    if (answer.selectedOptionId) {
      const question = questions.find((q) => q.id === answer.questionId);
      const option = question?.options?.find(
        (o) => o.id === answer.selectedOptionId
      );
      if (option) {
        Object.keys(option.traits).forEach((key) => {
          traits[key as keyof PersonalityTraits] +=
            option.traits[key as keyof PersonalityTraits];
        });
      }
    }
  });

  return traits;
}

export function getDominantTraits(traits: PersonalityTraits): string[] {
  const sorted = Object.entries(traits).sort(([, a], [, b]) => b - a);
  return sorted.slice(0, 3).map(([key]) => key);
}
