import { Tabs } from 'expo-router'; // Stack 대신 Tabs 임포트
import { useEffect } from 'react';
import { useStreakRewardStore } from '../store/useStreakRewardStore';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 임포트
import React from 'react'; // React 임포트

export default function RootLayout() {
  const incrementStreak = useStreakRewardStore((state) => state.incrementStreak);

  useEffect(() => {
    incrementStreak();
  }, []);
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: '오늘의 학습',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="learn/index"
        options={{
          title: '학습',
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
          headerShown: false, // 학습 플레이어 화면에서는 헤더 숨김
        }}
      />
      <Tabs.Screen
        name="learn/day/[dayIndex]"
        options={{
          title: '특정 Day 학습',
          href: null, // 탭 바에서 숨김
          headerShown: false, // 특정 Day 학습 화면에서는 헤더 숨김
        }}
      />
      <Tabs.Screen
        name="glossary/index"
        options={{
          title: '용어집',
          tabBarIcon: ({ color, size }) => <Ionicons name="library-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="glossary/term/[termId]"
        options={{
          title: '용어 상세',
          href: null, // 탭 바에서 숨김
        }}
      />
      <Tabs.Screen
        name="practice/index"
        options={{
          title: '연습',
          tabBarIcon: ({ color, size }) => <Ionicons name="pencil-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress/index"
        options={{
          title: '진행 상황',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: '설정',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
