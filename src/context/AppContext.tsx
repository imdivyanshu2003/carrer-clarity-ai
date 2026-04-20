"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Language, UserAnswer, CareerReport, PremiumReport, AppState } from "@/lib/types";

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  addAnswer: (answer: UserAnswer) => void;
  goToQuestion: (num: number) => void;
  setReport: (report: CareerReport) => void;
  setPremiumReport: (report: PremiumReport) => void;
  setIsPaid: (paid: boolean) => void;
  setIsUpgraded: (upgraded: boolean) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setPaymentOrderId: (orderId: string) => void;
  setWhatsappNumber: (num: string) => void;
  setUserEmail: (email: string) => void;
  reset: () => void;
}

const initialState: AppState = {
  language: null,
  currentQuestion: 0,
  answers: [],
  report: null,
  premiumReport: null,
  isPaid: false,
  isUpgraded: false,
  isAnalyzing: false,
  paymentOrderId: null,
  whatsappNumber: "",
  userEmail: "",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setLanguage = useCallback((lang: Language) => {
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const addAnswer = useCallback((answer: UserAnswer) => {
    setState((prev) => {
      const existing = prev.answers.findIndex(
        (a) => a.questionId === answer.questionId
      );
      const newAnswers = [...prev.answers];
      if (existing >= 0) {
        newAnswers[existing] = answer;
      } else {
        newAnswers.push(answer);
      }
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const goToQuestion = useCallback((num: number) => {
    setState((prev) => ({ ...prev, currentQuestion: num }));
  }, []);

  const setReport = useCallback((report: CareerReport) => {
    setState((prev) => ({ ...prev, report }));
  }, []);

  const setPremiumReport = useCallback((premiumReport: PremiumReport) => {
    setState((prev) => ({ ...prev, premiumReport }));
  }, []);

  const setIsPaid = useCallback((paid: boolean) => {
    setState((prev) => ({ ...prev, isPaid: paid }));
  }, []);

  const setIsUpgraded = useCallback((upgraded: boolean) => {
    setState((prev) => ({ ...prev, isUpgraded: upgraded }));
  }, []);

  const setIsAnalyzing = useCallback((analyzing: boolean) => {
    setState((prev) => ({ ...prev, isAnalyzing: analyzing }));
  }, []);

  const setPaymentOrderId = useCallback((orderId: string) => {
    setState((prev) => ({ ...prev, paymentOrderId: orderId }));
  }, []);

  const setWhatsappNumber = useCallback((num: string) => {
    setState((prev) => ({ ...prev, whatsappNumber: num }));
  }, []);

  const setUserEmail = useCallback((email: string) => {
    setState((prev) => ({ ...prev, userEmail: email }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        addAnswer,
        goToQuestion,
        setReport,
        setPremiumReport,
        setIsPaid,
        setIsUpgraded,
        setIsAnalyzing,
        setPaymentOrderId,
        setWhatsappNumber,
        setUserEmail,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
