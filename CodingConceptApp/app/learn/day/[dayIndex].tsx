import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LessonHeader from '../../../components/learn/LessonHeader';
import CardStack from '../../../components/learn/CardStack';
import QuizFooter from '../../../components/learn/QuizFooter';
import LabPlayer from '../../../components/learn/LabPlayer';
import { useSessionStore } from '../../../store/useSessionStore';
import { LabExecutionResult, getLab } from '../../../lib/lab/engine';
import { getQuiz } from '../../../lib/quiz/engine';
import { Card } from '../../../types';

export default function DayDetail() {
  const { dayIndex: paramDayIndex } = useLocalSearchParams();
  const dayIndex = paramDayIndex ? parseInt(paramDayIndex as string, 10) : 1;
  const router = useRouter();

  const {
    dayIndex: sessionDayIndex,
    cards, // useSessionStore에서 cards 상태를 직접 가져옴
    currentCardIndex,
    elapsedSec,
    isQuizSubmitted,
    quizResult,
    currentLabResult,
    answers, // useSessionStore에서 answers 상태를 가져옴
    start,
    nextCard,
    prevCard,
    submitQuiz,
    submitLab,
    showQuizExplanation,
    finish,
    setCurrentCardIndex,
    answerQuiz, // useSessionStore에서 answerQuiz 함수를 가져옴
    isBookmarked, // 북마크 상태 가져옴
    toggleBookmark, // 북마크 토글 액션 가져옴
    isSoundOn, // 사운드 상태 가져옴
    toggleSound, // 사운드 토글 액션 가져옴
    nextNotificationTime, // 다음 알림 시간 가져옴
    setNextNotificationTime, // 다음 알림 시간 설정 액션 가져옴
  } = useSessionStore();

  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(3600);
  const [showExplanation, setShowExplanation] = useState(false); // 해설 표시 상태 추가

  useEffect(() => {
    const initializeSession = async () => {
      console.log("Initializing session for day:", dayIndex); // 디버그 로그
      setLoading(true);
      await start(dayIndex); // 세션 시작 (cards 로드)
      setLoading(false);
      console.log("Session initialized. Cards loaded:", cards.length); // 디버그 로그 (cards 상태를 직접 사용)
    };
    initializeSession();
  }, [dayIndex, start]); // dayIndex가 변경될 때마다 세션 초기화

  useEffect(() => {
    if (sessionDayIndex !== null && !loading) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        // TODO: elapsedSec 업데이트 로직 추가
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sessionDayIndex, loading]);

  const currentCard = cards[currentCardIndex]; // enrichedCards 대신 cards를 직접 사용
  const isLastCard = currentCardIndex === cards.length - 1; // enrichedCards.length 대신 cards.length 사용
  const isFirstCard = currentCardIndex === 0;
  const isCurrentCardQuiz = currentCard?.kind === 'quiz';
  const isCurrentCardLab = currentCard?.kind === 'lab';

  console.log("Render: dayIndex", dayIndex, "currentCardIndex", currentCardIndex, "isLastCard", isLastCard, "cards.length", cards.length); // 디버그 로그

  const handleQuizSubmit = () => {
    if (currentCard?.quizId) {
      const userAnswer = answers[currentCard.quizId];
      if (userAnswer) {
        submitQuiz(currentCard.quizId, userAnswer);
        setShowExplanation(false); // 퀴즈 제출 시 해설 숨김
      } else {
        console.warn("Please select an answer before submitting the quiz.");
      }
    }
  };

  const handleLabComplete = (result: { success: boolean; output: string }, code: string) => {
    if (currentCard?.labId) {
      console.log("Submitting lab:", currentCard.labId, "with code:", code); // 디버깅 로그 추가
      submitLab(currentCard.labId, code);
    } else {
      console.error("currentCard.labId is undefined when trying to complete lab."); // 디버깅 로그 추가
    }
  };

  const handleNext = async () => {
    if (isLastCard) {
      console.log("Attempting to finish session and navigate to next day."); // 디버그 로그
      await finish();
      const nextDay = dayIndex + 1;
      console.log(`Navigating to /learn/day/${nextDay}`); // 디버그 로그
      router.push(`/learn/day/${nextDay}`);
    } else {
      nextCard();
    }
  };

  const handlePrev = () => {
    prevCard();
  };

  const handlePause = () => {
    console.log("Session Paused");
    // TODO: 일시정지 로직 구현
  };

  if (loading || sessionDayIndex === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>학습 콘텐츠를 로드 중입니다...</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>학습 콘텐츠가 없습니다.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <LessonHeader
        dayIndex={sessionDayIndex}
        remainingTime={remainingTime}
        progress={cards.length > 0 ? (currentCardIndex + 1) / cards.length : 0}
        onPause={handlePause}
      />
      <View style={styles.cardStackContainer}>
        {isCurrentCardLab && currentCard?.labId && currentCard?.labData ? (
          <LabPlayer
            lab={currentCard.labData}
            onComplete={handleLabComplete}
          />
        ) : (
          <CardStack
            cards={cards}
            onCardChange={setCurrentCardIndex}
            currentIndex={currentCardIndex}
            onQuizAnswer={answerQuiz} // 퀴즈 답변 함수 전달
            quizAnswers={answers} // 퀴즈 답변 상태 전달
          />
        )}
      </View>
      <QuizFooter
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleQuizSubmit}
        onShowExplanation={() => setShowExplanation(prev => !prev)} // 해설 표시 토글
        canGoPrev={!isFirstCard}
        canGoNext={true}
        isQuiz={isCurrentCardQuiz}
        isSubmitted={isQuizSubmitted}
        showExplanationButton={isQuizSubmitted && quizResult !== null} // 퀴즈 제출 후 결과가 있을 때만 해설 버튼 표시
        onToggleBookmark={toggleBookmark} // 북마크 토글 액션 전달
        isBookmarked={isBookmarked} // 북마크 상태 전달
        onToggleSound={toggleSound} // 사운드 토글 액션 전달
        isSoundOn={isSoundOn} // 사운드 상태 전달
        nextNotificationTime={nextNotificationTime} // 다음 알림 시간 전달
      />
      {isQuizSubmitted && quizResult && (
        <View style={styles.quizResultContainer}>
          <Text style={quizResult.correct ? styles.correctText : styles.incorrectText}>
            {quizResult.feedback}
          </Text>
          {showExplanation && quizResult.explanation && ( // showExplanation이 true일 때만 해설 표시
            <Text style={styles.explanationText}>
              {quizResult.explanation}
            </Text>
          )}
        </View>
      )}
      {isCurrentCardLab && currentLabResult && (
        <View style={styles.labResultContainer}>
          <Text style={currentLabResult.success ? styles.correctText : styles.incorrectText}>
            {currentLabResult.output}
          </Text>
          {currentLabResult.error && (
            <Text style={styles.incorrectText}>
              오류: {currentLabResult.error}
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStackContainer: {
    flex: 1,
  },
  quizResultContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  labResultContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  correctText: {
    color: 'green',
    fontWeight: 'bold',
  },
  incorrectText: {
    color: 'red',
    fontWeight: 'bold',
  },
  explanationText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
  },
});
