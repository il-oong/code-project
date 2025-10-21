import { Redirect } from 'expo-router';
import { useSessionStore } from '../../store/useSessionStore';

/**
 * 이 컴포넌트는 사용자를 올바른 학습 페이지로 리다이렉트하는 역할만 수행합니다.
 * Expo Router의 Redirect 컴포넌트를 사용하여 네비게이션 타이밍 문제를 해결합니다.
 */
export default function LearnIndex() {
  // 스토어에서 현재 dayIndex를 동기적으로 읽어옵니다.
  const { dayIndex } = useSessionStore.getState();

  // 활성화된 세션이 없으면 Day 1로, 있으면 마지막으로 활성화된 Day로 이동 경로를 설정합니다.
  const targetDayIndex = dayIndex === null ? 1 : dayIndex;

  // 계산된 경로로 리다이렉트하는 컴포넌트를 렌더링합니다.
  return <Redirect href={`/learn/day/${targetDayIndex}`} />;
}
