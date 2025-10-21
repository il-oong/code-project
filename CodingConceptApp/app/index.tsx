import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { useSessionStore } from '../store/useSessionStore';
import { getDueSrsItems } from '../lib/srs/engine';

export default function Home() {
  const srsItems = useSessionStore((state) => state.srsItems);
  const [dueItemsCount, setDueItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 앱에서는 여기에서 srsItems를 로컬 스토리지 등에서 로드해야 합니다.
    // 현재는 useSessionStore에 srsItems가 초기화되어 있다고 가정합니다.
    const due = getDueSrsItems(Object.values(srsItems));
    setDueItemsCount(due.length);
    setLoading(false);
  }, [srsItems]);

  const handleStartLearning = () => {
    if (dueItemsCount > 0) {
      // 만료된 항목이 있으면 해당 항목으로 이동하는 로직 (예: 첫 번째 만료 항목)
      // 현재는 /learn으로 이동하도록 설정
      router.push('/learn');
    } else {
      router.push('/learn');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>학습 데이터를 로드 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>환영합니다! 오늘의 학습을 시작하세요.</Text>
      {dueItemsCount > 0 && (
        <Text style={{ marginTop: 10, marginBottom: 20, color: 'red' }}>
          복습할 항목이 {dueItemsCount}개 있습니다!
        </Text>
      )}
      <Button title="오늘의 학습 시작" onPress={handleStartLearning} />
    </View>
  );
}
