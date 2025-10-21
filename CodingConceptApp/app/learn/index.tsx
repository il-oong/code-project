import { useEffect } from 'react';
import { router } from 'expo-router';
import { useSessionStore } from '../../store/useSessionStore';

export default function LearnIndex() {
  const { dayIndex, start } = useSessionStore();

  useEffect(() => {
    const initializeAndRedirect = async () => {
      let targetDayIndex;
      if (dayIndex === null) {
        // dayIndex가 null이면 Day 1으로 시작
        await start(1); // dayIndex를 1로 설정
        targetDayIndex = 1;
      } else {
        // 이미 dayIndex가 설정되어 있으면 다음 Day로 이동
        targetDayIndex = dayIndex + 1;
      }
      router.replace(`/learn/day/${targetDayIndex}`);
    };

    initializeAndRedirect();
  }, [dayIndex, start]); // dayIndex 또는 start 함수가 변경될 때마다 실행

  return null; // 리다이렉트만 수행하므로 UI는 렌더링하지 않음
}
