export type CardKind = 'story' | 'concept' | 'example' | 'tip' | 'quiz' | 'lab' | 'review';

export type Card = {
  id: string;
  kind: CardKind;
  md?: string;        // story/concept/example/tip/review
  quizId?: string;    // quiz
  labId?: string;     // lab
  quizData?: Quiz;    // 퀴즈 데이터 (보강된 카드용)
  labData?: Lab;      // 랩 데이터 (보강된 카드용)
};

export type Lesson = {
  id: string;
  dayIndex: number;
  topic: string;
  cards: Card[];
  quizSetId: string;
  labId?: string;
  srsLinks: string[];
};

export type Quiz = {
  id: string;
  type: 'mcq' | 'cloze' | 'order' | 'code_read';
  stem: string;
  choices?: string[];
  answer: string | string[];
  explanation: string;
  tags: string[];
};

export type Lab = {
  id: string;
  type: 'js-sandbox' | 'dom-mini' | 'trace' | 'debug-hunt';
  starterCode: string;
  tests?: string;
  assets?: string[];
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  example: string;
  analogy: string;
  relatedTerms: string[];
  isFavorite: boolean;
  category: string;
};
