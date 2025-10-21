import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native'; // Dimensions 임포트

// Prop view to filter out responder props and prevent warnings
const PropFilteringView = (props: any) => {
  const { onStartShouldSetResponder, onResponderRelease, onResponderTerminate, ...rest } = props;
  return <View {...rest} />;
};
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit'; // LineChart 임포트
import { useStreakRewardStore } from '../../store/useStreakRewardStore';
import { useSessionStore } from '../../store/useSessionStore'; // useSessionStore 임포트

// react-native-calendars의 onDayPress 콜백 인자 타입을 위한 인터페이스 정의
interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const screenWidth = Dimensions.get('window').width; // 화면 너비 가져오기

export default function ProgressIndex() {
  const { currentStreak, rewards, earnReward, resetStreak } = useStreakRewardStore();
  const { quizHistory } = useSessionStore(); // quizHistory 가져오기
  const [selectedDate, setSelectedDate] = useState('');

  // 약점 토픽 추천 로직
  const analyzeWeakTopics = () => {
    const topicStats: Record<string, { correct: number; total: number }> = {};

    quizHistory.forEach(record => {
      record.tags.forEach(tag => {
        if (!topicStats[tag]) {
          topicStats[tag] = { correct: 0, total: 0 };
        }
        topicStats[tag].total++;
        if (record.correct) {
          topicStats[tag].correct++;
        }
      });
    });

    const weakTopics = Object.entries(topicStats)
      .map(([tag, stats]) => ({
        tag,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        totalAttempts: stats.total,
      }))
      .filter(topic => topic.totalAttempts > 0 && topic.accuracy < 70) // 70% 미만을 약점 토픽으로 간주
      .sort((a, b) => a.accuracy - b.accuracy); // 정확도 낮은 순으로 정렬

    return weakTopics;
  };

  const weakTopics = analyzeWeakTopics();

  const handleEarnReward = () => {
    const newRewardId = `reward_${currentStreak + 1}`; // 예시 리워드 ID
    earnReward(newRewardId);
  };

  // 예시로 특정 날짜를 마크합니다. 실제 데이터는 스토어에서 가져올 수 있습니다.
  const markedDates = {
    '2025-10-20': { selected: true, marked: true, selectedColor: 'blue' },
    '2025-10-21': { marked: true },
    '2025-10-22': { marked: true, dotColor: 'red', activeOpacity: 0 },
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>진행 상황</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>달력</Text>
          <Calendar
            onDayPress={(day: DayObject) => { // day 매개변수에 정의한 DayObject 타입 명시
              setSelectedDate(day.dateString);
              console.log('selected day', day);
            }}
            markedDates={{
              ...markedDates,
              [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
            }}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          {selectedDate && <Text style={styles.selectedDateText}>선택된 날짜: {selectedDate}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>스트릭</Text>
          <Text style={styles.streakText}>현재 스트릭: {currentStreak}일</Text>
          <Button title="스트릭 초기화 (테스트용)" onPress={resetStreak} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>리워드</Text>
          {Object.keys(rewards).length === 0 ? (
            <Text>획득한 리워드가 없습니다.</Text>
          ) : (
            Object.keys(rewards).map((rewardId) => (
              <Text key={rewardId}>- {rewardId} 획득!</Text>
            ))
          )}
          <Button title="리워드 획득 (테스트용)" onPress={handleEarnReward} />
        </View>

        {/* 정확도 차트 섹션 */}
        <PropFilteringView style={styles.section}>
          <Text style={styles.sectionTitle}>정확도 차트</Text>
          <LineChart
            data={{
              labels: ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={screenWidth - 60} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </PropFilteringView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>약점 토픽 추천</Text>
          {weakTopics.length === 0 ? (
            <Text style={styles.infoText}>아직 약점 토픽이 없습니다. 퀴즈를 더 풀어보세요!</Text>
          ) : (
            weakTopics.map((topic, index) => (
              <Text key={index} style={styles.topicText}>
                - {topic.tag}: 정확도 {topic.accuracy.toFixed(0)}% ({topic.totalAttempts}회 시도)
              </Text>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#555',
  },
  streakText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  topicText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
});
