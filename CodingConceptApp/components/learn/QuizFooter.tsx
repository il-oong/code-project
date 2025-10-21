import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용을 위해 임포트

interface QuizFooterProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onShowExplanation: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isQuiz: boolean;
  isSubmitted: boolean;
  showExplanationButton: boolean;
  onToggleBookmark: () => void; // 북마크 토글 함수
  isBookmarked: boolean; // 북마크 상태
  onToggleSound: () => void; // 사운드 토글 함수
  isSoundOn: boolean; // 사운드 상태
  nextNotificationTime: string; // 다음 알림 시간
  isLoading?: boolean; // 로딩 상태 추가
}

export default function QuizFooter({
  onPrev,
  onNext,
  onSubmit,
  onShowExplanation,
  canGoPrev,
  canGoNext,
  isQuiz,
  isSubmitted,
  showExplanationButton,
  onToggleBookmark,
  isBookmarked,
  onToggleSound,
  isSoundOn,
  nextNotificationTime,
  isLoading = false, // 기본값 설정
}: QuizFooterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} disabled={!canGoPrev || isLoading} style={styles.button}>
        <Text style={[styles.buttonText, (!canGoPrev || isLoading) && styles.disabledText]}>이전</Text>
      </TouchableOpacity>

      {isQuiz && !isSubmitted && (
        <TouchableOpacity onPress={onSubmit} disabled={isLoading} style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>제출</Text>
        </TouchableOpacity>
      )}

      {isQuiz && isSubmitted && showExplanationButton && (
        <TouchableOpacity onPress={onShowExplanation} disabled={isLoading} style={[styles.button, styles.explanationButton]}>
          <Text style={styles.buttonText}>해설 보기</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onNext} disabled={!canGoNext || isLoading} style={styles.button}>
        <Text style={[styles.buttonText, (!canGoNext || isLoading) && styles.disabledText]}>다음</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleBookmark} style={styles.iconButton}>
        <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleSound} style={styles.iconButton}>
        <Ionicons name={isSoundOn ? "volume-high" : "volume-mute"} size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.notificationContainer}>
        <Ionicons name="alarm-outline" size={20} color="black" />
        <Text style={styles.notificationText}>{nextNotificationTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  explanationButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#ccc',
  },
  iconButton: {
    padding: 8,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  notificationText: {
    marginLeft: 5,
    fontSize: 14,
  },
});
