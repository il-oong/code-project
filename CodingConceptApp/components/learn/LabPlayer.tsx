import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Lab } from '../../types';
import { runLab } from '../../lib/lab/engine'; // runLab 임포트

interface LabPlayerProps {
  lab: Lab;
  onComplete: (result: { success: boolean; output: string }, code: string) => void; // code 인자 추가
}

export default function LabPlayer({ lab, onComplete }: LabPlayerProps) {
  const [code, setCode] = useState(lab.starterCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    setIsLoading(true);
    setOutput('코드 실행 중...');

    try {
      const result = await runLab(lab, code); // runLab 함수 호출
      setOutput(result.output);
      onComplete({ success: result.success, output: result.output }, code); // code 전달
    } catch (e: any) {
      setOutput(`오류: ${e.message}`);
      onComplete({ success: false, output: e.message }, code); // code 전달
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>실습 랩: {lab.id}</Text>
      <ScrollView style={styles.codeEditor}>
        <TextInput
          style={styles.textInput}
          multiline
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="여기에 코드를 작성하세요..."
        />
      </ScrollView>
      <Button title={isLoading ? "실행 중..." : "코드 실행"} onPress={runCode} disabled={isLoading} />
      <ScrollView style={styles.outputContainer}>
        <Text style={styles.outputText}>{output}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  codeEditor: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: 'monospace', // 코드 가독성을 위해 모노스페이스 폰트 사용
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 300, // 최소 높이 추가
  },
  outputContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  outputText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
