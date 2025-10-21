import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react'; // useState 추가
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'; // TouchableOpacity 추가
import Markdown from 'react-native-markdown-display';
import { Card, Quiz, Lab } from '../../types'; // Quiz, Lab 타입 추가 임포트

import { Text as RNText } from 'react-native';

// 1) 고정 폭 정의
const SCREEN_WIDTH = Dimensions.get('window').width;
const H_PADDING = 20;
const ITEM_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

const BaseCard = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>
    {children}
  </View>
);

const StoryCard = ({ md }: { md: string }) => <BaseCard><Markdown>{md}</Markdown></BaseCard>;
const ConceptCard = ({ md }: { md: string }) => <BaseCard><Markdown>{md}</Markdown></BaseCard>;
const ExampleCard = ({ md }: { md: string }) => <BaseCard><Markdown>{md}</Markdown></BaseCard>;
const TipCard = ({ md }: { md: string }) => <BaseCard><Markdown>{md}</Markdown></BaseCard>;

// QuizCard 컴포넌트 수정
const QuizCard = ({ quizData, onSelectChoice, selectedChoice }: { quizData: Quiz, onSelectChoice: (choice: string) => void, selectedChoice: string | null }) => {
  return (
    <BaseCard>
      <View style={styles.quizContentContainer}>
        <Markdown>{quizData.stem}</Markdown>
        {quizData.choices && quizData.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quizChoiceContainer,
              selectedChoice === choice && styles.selectedQuizChoice,
            ]}
            onPress={() => onSelectChoice(choice)}
          >
            <RNText style={styles.quizChoice}>{`${index + 1}. ${choice}`}</RNText>
          </TouchableOpacity>
        ))}
      </View>
    </BaseCard>
  );
};

const LabCard = ({ labData }: { labData: Lab }) => {
  return (
    <BaseCard>
      <View style={styles.labContentContainer}>
        <RNText style={styles.labTitle}>실습 랩: {labData.id}</RNText>
        <RNText style={styles.labStarterCode}>{labData.starterCode}</RNText>
        {/* TODO: 코드 편집기 및 실행 버튼 추가 */}
      </View>
    </BaseCard>
  );
};
const ReviewCard = ({ md }: { md: string }) => <BaseCard><Markdown>{md}</Markdown></BaseCard>;


interface CardStackProps {
  cards: Card[];
  onCardChange: (index: number) => void;
  currentIndex: number;
  onQuizAnswer: (quizId: string, answer: string) => void; // 퀴즈 답변 추가
  quizAnswers: Record<string, string>; // 퀴즈 답변 상태 추가
}

export default function CardStack({ cards, onCardChange, currentIndex, onQuizAnswer, quizAnswers }: CardStackProps) {
  const flatListRef = useRef<FlatList>(null);

  // 2) 콜백/설정은 ref 또는 useCallback으로 안정화
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: 60, // 필요시 조정
  }).current;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);

  const renderItem = useCallback(
    ({ item }: { item: Card }) => {
      const containerStyle = { width: ITEM_WIDTH, position: 'relative' as const };

      switch (item.kind) {
        case 'story':
          return <View style={containerStyle}><StoryCard md={item.md || ''} /></View>;
        case 'concept':
          return <View style={containerStyle}><ConceptCard md={item.md || ''} /></View>;
        case 'example':
          return <View style={containerStyle}><ExampleCard md={item.md || ''} /></View>;
        case 'tip':
          return <View style={containerStyle}><TipCard md={item.md || ''} /></View>;
        case 'quiz':
          return (
            <View style={containerStyle}>
              {item.quizData ? (
                <QuizCard
                  quizData={item.quizData}
                  onSelectChoice={(choice) => onQuizAnswer(item.quizId!, choice)}
                  selectedChoice={item.quizId ? quizAnswers[item.quizId] : null}
                />
              ) : (
                <RNText>Quiz data not found</RNText>
              )}
            </View>
          );
        case 'lab':
          return (
            <View style={containerStyle}>
              {item.labData ? <LabCard labData={item.labData} /> : <RNText>Lab data not found</RNText>}
            </View>
          );
        case 'review':
          return <View style={containerStyle}><ReviewCard md={item.md || ''} /></View>;
        default:
          return <View style={containerStyle}><RNText>Unknown Card Kind</RNText></View>;
      }
    },
    [onQuizAnswer, quizAnswers, cards] // 의존성 배열에 추가
  );
  
  const getItemLayout = useCallback(
    (_: ArrayLike<Card> | null | undefined, index: number) => ({
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    }),
    []
  );
  
  const memoCards = useMemo(() => cards, [cards]);

  const handleScrollEnd = useCallback((event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / ITEM_WIDTH);
    if (newIndex !== currentIndex) {
      onCardChange(newIndex);
    }
  }, [currentIndex, onCardChange]);

  return (
    <FlatList
      ref={flatListRef}
      data={memoCards}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={ITEM_WIDTH}
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.flatListContentContainer} // 수정된 스타일 적용
      onMomentumScrollEnd={handleScrollEnd} // 스크롤 종료 시 인덱스 업데이트
      initialScrollIndex={currentIndex}
      getItemLayout={getItemLayout}
      extraData={currentIndex}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: H_PADDING, // 좌우 여백 추가
  },
  card: {
    width: ITEM_WIDTH,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: H_PADDING / 2, // 카드 간 간격 추가
  },
  quizContentContainer: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center', // 퀴즈 콘텐츠는 중앙 정렬하지 않음
    // alignItems: 'center', // 퀴즈 콘텐츠는 중앙 정렬하지 않음
  },
  labContentContainer: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center', // 랩 콘텐츠는 중앙 정렬하지 않음
    // alignItems: 'center', // 랩 콘텐츠는 중앙 정렬하지 않음
  },
  quizStem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  quizChoiceContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  selectedQuizChoice: {
    backgroundColor: '#e0e0ff',
    borderColor: '#0000ff',
  },
  quizChoice: {
    fontSize: 16,
  },
  labTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  labStarterCode: {
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
});
