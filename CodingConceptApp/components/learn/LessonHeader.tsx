import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용 예시

interface LessonHeaderProps {
  dayIndex: number;
  remainingTime: number; // 초 단위
  progress: number; // 0.0 ~ 1.0
  onPause: () => void;
}

export default function LessonHeader({ dayIndex, remainingTime, progress, onPause }: LessonHeaderProps) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const progressPercent = Math.floor(progress * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.dayText}>Day {dayIndex}</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progressPercent}%</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <Ionicons name="time-outline" size={18} color="black" />
        <Text style={styles.timerText}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
      </View>
      <TouchableOpacity onPress={onPause} style={styles.pauseButton}>
        <Ionicons name="pause-circle-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  progressText: {
    fontSize: 14,
    marginRight: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerText: {
    fontSize: 16,
  },
  pauseButton: {
    padding: 4,
  },
});
