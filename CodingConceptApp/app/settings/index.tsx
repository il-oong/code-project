import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSessionStore } from '../../store/useSessionStore'; // useSessionStore 임포트

export default function SettingsIndex() {
  const { isSoundOn, toggleSound, nextNotificationTime, setNextNotificationTime, resetSession } = useSessionStore();
  const [showTimePicker, setShowTimePicker] = useState(false); // 시간 선택기 표시 여부

  const handleResetData = () => {
    // 실제 앱에서는 사용자에게 확인 메시지를 표시하는 것이 좋습니다.
    if (confirm("모든 학습 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      resetSession();
      alert("학습 데이터가 초기화되었습니다.");
    }
  };

  // 임시 시간 선택 로직 (실제 앱에서는 react-native-community/datetimepicker 등을 사용)
  const handleTimeChange = (newTime: string) => {
    setNextNotificationTime(newTime);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>사운드</Text>
        <Switch
          onValueChange={toggleSound}
          value={isSoundOn}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>다음 알림 시간</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.settingValue}>{nextNotificationTime}</Text>
        </TouchableOpacity>
        {/* {showTimePicker && (
          // 여기에 실제 시간 선택기 컴포넌트 (예: DateTimePicker)를 렌더링합니다.
          // 현재는 임시로 텍스트로만 표시합니다.
          <View style={styles.timePickerContainer}>
            <TouchableOpacity onPress={() => handleTimeChange("오전 8시")}>
              <Text style={styles.timeOption}>오전 8시</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeChange("오전 9시")}>
              <Text style={styles.timeOption}>오전 9시</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeChange("오후 6시")}>
              <Text style={styles.timeOption}>오후 6시</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>테마</Text>
        <Text style={styles.settingValue}>기본 (다크 모드 미지원)</Text>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetData}>
        <Text style={styles.resetButtonText}>모든 학습 데이터 초기화</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 18,
    color: '#555',
  },
  settingValue: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
  timePickerContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    right: 0,
    top: 40,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  timeOption: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    padding: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
