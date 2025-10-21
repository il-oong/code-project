import { Quiz } from '../../types';
import quizzesData from '../../assets/quizzes.json'; // quizzes.json 임포트

const quizzes: Record<string, Quiz> = quizzesData as Record<string, Quiz>; // 타입 단언 추가

export function getQuiz(quizId: string): Quiz | undefined {
  return quizzes[quizId];
}

export function grade(q: Quiz, userResponse: any): { correct: boolean; feedback: string; tags: string[]; explanation: string } {
  let correct = false;
  let feedback = "";

  if (q.type === 'mcq') {
    correct = q.answer === userResponse;
    feedback = correct ? "정답입니다!" : `오답입니다. 정답은 "${q.answer}"입니다.`;
  } else if (q.type === 'cloze') {
    const userAnswers = Array.isArray(userResponse) ? userResponse.map((r: string) => r.toLowerCase()) : [userResponse.toLowerCase()];
    const correctAnswers = Array.isArray(q.answer) ? q.answer.map((a: string) => a.toLowerCase()) : [q.answer.toLowerCase()];
    correct = userAnswers.every((ua: string) => correctAnswers.includes(ua));
    feedback = correct ? "정답입니다!" : `오답입니다. 정답은 "${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}"입니다.`;
  } else if (q.type === 'order') {
    correct = Array.isArray(userResponse) && Array.isArray(q.answer) && userResponse.length === q.answer.length && userResponse.every((val: string, index: number) => val === q.answer[index]);
    feedback = correct ? "정답입니다!" : `오답입니다. 정답 순서는 "${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}"입니다.`;
  } else if (q.type === 'code_read') {
    correct = q.answer === userResponse;
    feedback = correct ? "정답입니다!" : `오답입니다. 정답은 "${q.answer}"입니다.`;
  } else {
    feedback = "알 수 없는 퀴즈 타입입니다.";
  }

  return {
    correct,
    feedback: feedback,
    tags: q.tags,
    explanation: q.explanation, // explanation 추가
  };
}
