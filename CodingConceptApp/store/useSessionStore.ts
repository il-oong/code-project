import { create } from 'zustand';
import { Card, Quiz, Lab } from '../types'; // types.ts 파일에서 Card, Quiz, Lab 타입 임포트
import day01Content from '../assets/lessons/day01.json';
import day02Content from '../assets/lessons/day02.json';
import day03Content from '../assets/lessons/day03.json';
import day04Content from '../assets/lessons/day04.json';
import day05Content from '../assets/lessons/day05.json';
import day06Content from '../assets/lessons/day06.json';
import day07Content from '../assets/lessons/day07.json';
import day08Content from '../assets/lessons/day08.json';
import day09Content from '../assets/lessons/day09.json';
import day10Content from '../assets/lessons/day10.json';
import day11Content from '../assets/lessons/day11.json';
import day12Content from '../assets/lessons/day12.json';
import day13Content from '../assets/lessons/day13.json';
import day14Content from '../assets/lessons/day14.json';
import day15Content from '../assets/lessons/day15.json';
import day16Content from '../assets/lessons/day16.json';
import day17Content from '../assets/lessons/day17.json';
import day18Content from '../assets/lessons/day18.json';
import day19Content from '../assets/lessons/day19.json';
import day20Content from '../assets/lessons/day20.json';
import day21Content from '../assets/lessons/day21.json';
import day22Content from '../assets/lessons/day22.json';
import day23Content from '../assets/lessons/day23.json';
import day24Content from '../assets/lessons/day24.json';
import day25Content from '../assets/lessons/day25.json';
import day26Content from '../assets/lessons/day26.json';
import day27Content from '../assets/lessons/day27.json';
import day28Content from '../assets/lessons/day28.json';
import day29Content from '../assets/lessons/day29.json';
import day30Content from '../assets/lessons/day30.json';
import { getQuiz, grade } from '../lib/quiz/engine';
import { runLab, LabExecutionResult, getLab } from '../lib/lab/engine'; // 랩 엔진 임포트 및 getLab 임포트
import { SrsItem, calculateNextReview, initializeSrsItem } from '../lib/srs/engine'; // SRS 엔진 임포트

const lessonContents: Record<number, Card[]> = {
  1: day01Content as Card[],
  2: day02Content as Card[],
  3: day03Content as Card[],
  4: day04Content as Card[],
  5: day05Content as Card[],
  6: day06Content as Card[],
  7: day07Content as Card[],
  8: day08Content as Card[],
  9: day09Content as Card[],
  10: day10Content as Card[],
  11: day11Content as Card[],
  12: day12Content as Card[],
  13: day13Content as Card[],
  14: day14Content as Card[],
  15: day15Content as Card[],
  16: day16Content as Card[],
  17: day17Content as Card[],
  18: day18Content as Card[],
  19: day19Content as Card[],
  20: day20Content as Card[],
  21: day21Content as Card[],
  22: day22Content as Card[],
  23: day23Content as Card[],
  24: day24Content as Card[],
  25: day25Content as Card[],
  26: day26Content as Card[],
  27: day27Content as Card[],
  28: day28Content as Card[],
  29: day29Content as Card[],
  30: day30Content as Card[],
};

type SessionState = {
  dayIndex: number | null;
  cards: Card[];             // 현재 Day 카드들
  currentCardIndex: number;
  elapsedSec: number;
  answers: Record<string, any>; // quiz/lab 응답
  isQuizSubmitted: boolean;
  quizResult: { correct: boolean; feedback: string; tags: string[]; explanation: string } | null; // explanation 추가
  currentLabResult: LabExecutionResult | null; // 랩 실행 결과 추가
  srsItems: Record<string, SrsItem>; // SRS 항목 추가
  isBookmarked: boolean; // 북마크 상태 추가
  isSoundOn: boolean; // 사운드 상태 추가
  nextNotificationTime: string; // 다음 알림 시간 추가
  quizHistory: { quizId: string; correct: boolean; tags: string[]; timestamp: number }[]; // 퀴즈 기록 추가
  
  start: (dayIndex: number) => Promise<Card[]>; // 반환 타입 수정
  nextCard: () => void;
  prevCard: () => void;
  answerQuiz: (quizId: string, value: any) => void;
  submitQuiz: (quizId: string, userResponse: any) => void;
  submitLab: (labId: string, code: string) => Promise<void>; // 랩 제출 액션 추가
  showQuizExplanation: () => void;
  updateSrsItem: (itemId: string, quality: number) => void; // SRS 항목 업데이트 액션 추가
  finish: () => Promise<void>;   // 성과 저장 + SRS 큐 생성 (MVP 이후 구현)
  resetSession: () => void;
  setCurrentCardIndex: (index: number) => void; // 추가할 액션
  toggleBookmark: () => void; // 북마크 토글 액션 추가
  toggleSound: () => void; // 사운드 토글 액션 추가
  setNextNotificationTime: (time: string) => void; // 다음 알림 시간 설정 액션 추가
  addQuizResultToHistory: (quizId: string, correct: boolean, tags: string[]) => void; // 퀴즈 기록 추가 액션
};

export const useSessionStore = create<SessionState>((set, get) => ({
  dayIndex: null,
  cards: [],
  currentCardIndex: 0,
  elapsedSec: 0,
  answers: {},
  isQuizSubmitted: false,
  quizResult: null,
  currentLabResult: null, // 초기화
  srsItems: {}, // SRS 항목 초기화
  isBookmarked: false, // 북마크 초기화
  isSoundOn: true, // 사운드 초기화
  nextNotificationTime: "내일 오전 9시", // 다음 알림 시간 초기화
  quizHistory: [], // 퀴즈 기록 초기화

  start: async (newDayIndex: number): Promise<Card[]> => {
    const { dayIndex: currentDayIndex } = get();
    if (currentDayIndex !== null && currentDayIndex === newDayIndex) {
      console.log(`Session for Day ${newDayIndex} is already active. Skipping initialization.`);
      return get().cards; // 이미 세션이 활성화되어 있으면 현재 카드 반환
    }

    const loadedCards = lessonContents[newDayIndex] || [];
    if (loadedCards.length === 0) {
      console.warn(`No content found for day ${newDayIndex}`);
    }

    // 퀴즈 및 랩 데이터 보강
    const enrichedLoadedCards = loadedCards.map(card => {
      if (card.kind === 'quiz' && card.quizId) {
        const quiz = getQuiz(card.quizId);
        return quiz ? { ...card, quizData: quiz } : card;
      }
      if (card.kind === 'lab' && card.labId) {
        const lab = getLab(card.labId);
        return lab ? { ...card, labData: lab } : card;
      }
      return card;
    });

    set((state) => ({
      dayIndex: newDayIndex,
      cards: enrichedLoadedCards, // 보강된 카드 사용
      currentCardIndex: 0,
      elapsedSec: 0,
      answers: {},
      isQuizSubmitted: false,
      quizResult: null,
      currentLabResult: null,
      srsItems: state.srsItems,
      isBookmarked: state.isBookmarked,
      isSoundOn: state.isSoundOn,
      nextNotificationTime: state.nextNotificationTime,
    }));
    console.log("Session initialized in store. Cards loaded:", enrichedLoadedCards.length); // 디버그 로그 추가
    return enrichedLoadedCards;
  },

  nextCard: () => {
    set((state) => ({
      currentCardIndex: Math.min(state.currentCardIndex + 1, state.cards.length - 1),
      isQuizSubmitted: false, // 다음 카드로 이동 시 퀴즈 제출 상태 초기화
      quizResult: null,
      currentLabResult: null, // 다음 카드로 이동 시 랩 결과 초기화
    }));
  },

  prevCard: () => {
    set((state) => ({
      currentCardIndex: Math.max(state.currentCardIndex - 1, 0),
      isQuizSubmitted: false, // 이전 카드로 이동 시 퀴즈 제출 상태 초기화
      quizResult: null,
      currentLabResult: null, // 이전 카드로 이동 시 랩 결과 초기화
    }));
  },

  answerQuiz: (quizId: string, value: any) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [quizId]: value,
      },
    }));
  },

  submitQuiz: (quizId: string, userResponse: any) => {
    const quiz = getQuiz(quizId);
    if (quiz) {
      const result = grade(quiz, userResponse);
      set((state) => {
        const newQuizHistory = [...state.quizHistory, { quizId, correct: result.correct, tags: result.tags, timestamp: Date.now() }];
        return {
          isQuizSubmitted: true,
          quizResult: result,
          quizHistory: newQuizHistory,
        };
      });
    }
  },

  submitLab: async (labId: string, code: string) => {
    const lab = getLab(labId); // lib/lab/engine에서 랩 객체 가져오기
    if (lab) {
      const result = await runLab(lab, code);
      set({ currentLabResult: result });
    } else {
      set({ currentLabResult: { success: false, output: '', error: `Lab with ID ${labId} not found.` } });
    }
  },

  showQuizExplanation: () => {
    // 해설 보기 로직 (현재는 submitQuiz에서 feedback을 제공하므로 추가 UI 로직 필요)
    console.log("Show explanation for current quiz.");
  },

  finish: async () => {
    // TODO: 성과 저장 및 SRS 큐 생성 로직 구현 (MVP 이후)
    console.log("Session finished!");
    set({ currentCardIndex: 0, answers: {}, isQuizSubmitted: false, quizResult: null, currentLabResult: null }); // dayIndex와 cards는 start에서 업데이트되므로 여기서 초기화하지 않음
  },

  updateSrsItem: (itemId: string, quality: number) => {
    set((state) => {
      const existingItem = state.srsItems[itemId];
      const srsItem = existingItem ? existingItem : initializeSrsItem(itemId);
      const updatedItem = calculateNextReview(srsItem, quality);
      return {
        srsItems: {
          ...state.srsItems,
          [itemId]: updatedItem,
        },
      };
    });
  },

  resetSession: () => {
    set({ dayIndex: null, cards: [], currentCardIndex: 0, elapsedSec: 0, answers: {}, isQuizSubmitted: false, quizResult: null, currentLabResult: null, srsItems: {}, quizHistory: [] });
  },

  setCurrentCardIndex: (index: number) => {
    set({ currentCardIndex: index });
  },

  toggleBookmark: () => {
    set((state) => ({ isBookmarked: !state.isBookmarked }));
  },

  toggleSound: () => {
    set((state) => ({ isSoundOn: !state.isSoundOn }));
  },

  setNextNotificationTime: (time: string) => {
    set({ nextNotificationTime: time });
  },

  addQuizResultToHistory: (quizId: string, correct: boolean, tags: string[]) => {
    set((state) => ({
      quizHistory: [...state.quizHistory, { quizId, correct, tags, timestamp: Date.now() }],
    }));
  },
}));
