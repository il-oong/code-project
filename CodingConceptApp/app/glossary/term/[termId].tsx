import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { getGlossaryTermById } from '../../../lib/glossary/engine';
import { GlossaryTerm } from '../../../types';

export default function TermDetail() {
  const { termId } = useLocalSearchParams();
  const [term, setTerm] = useState<GlossaryTerm | undefined>(undefined);

  useEffect(() => {
    if (typeof termId === 'string') {
      const foundTerm = getGlossaryTermById(termId);
      setTerm(foundTerm);
    }
  }, [termId]);

  if (!term) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: '용어 상세' }} />
        <Text style={styles.errorText}>용어를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: term.term }} />
      <View style={styles.card}>
        <Text style={styles.termText}>{term.term}</Text>
        <Text style={styles.categoryText}>카테고리: {term.category}</Text>
        <View style={styles.divider} />
        <Text style={styles.heading}>정의</Text>
        <Text style={styles.content}>{term.definition}</Text>
        <View style={styles.divider} />
        <Text style={styles.heading}>예시</Text>
        <Text style={styles.content}>{term.example}</Text>
        <View style={styles.divider} />
        <Text style={styles.heading}>한 줄 비유</Text>
        <Text style={styles.content}>{term.analogy}</Text>
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.heading}>관련 용어</Text>
            <View style={styles.relatedTermsContainer}>
              {term.relatedTerms.map((relatedTermName, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.relatedTermChip}
                  onPress={() => {
                    // TODO: relatedTermName으로 용어 ID를 찾아 이동
                    // 현재는 더미 데이터에 ID가 없으므로, 실제 구현 시 ID를 찾아야 함
                    // 임시로 검색 기능을 활용하거나, 관련 용어 데이터에 ID를 포함해야 함
                    alert(`'${relatedTermName}' 관련 용어 클릭됨. 실제 이동 로직 필요.`);
                  }}
                >
                  <Text style={styles.relatedTermText}>{relatedTermName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 2,
    shadowColor: '#000', // iOS specific shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  termText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  relatedTermsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  relatedTermChip: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  relatedTermText: {
    color: '#333',
    fontSize: 14,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
