import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { getAllGlossaryTerms, searchGlossaryTerms, getGlossaryCategories, toggleFavorite } from '../../lib/glossary/engine';
import { GlossaryTerm } from '../../types';

const GlossaryIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const allTerms = getAllGlossaryTerms();
    setTerms([...allTerms]); // 깊은 복사
    setCategories(['All', ...getGlossaryCategories()]);
  }, []);

  useEffect(() => {
    let filteredTerms = getAllGlossaryTerms();

    if (searchQuery) {
      filteredTerms = searchGlossaryTerms(searchQuery);
    }

    if (selectedCategory !== 'All') {
      filteredTerms = filteredTerms.filter(term => term.category === selectedCategory);
    }
    setTerms([...filteredTerms]); // 깊은 복사
  }, [searchQuery, selectedCategory]);

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id); // 백엔드(더미 데이터) 업데이트
    // UI 상태를 업데이트하기 위해 terms를 직접 업데이트
    setTerms(prevTerms =>
      prevTerms.map(term =>
        term.id === id ? { ...term, isFavorite: !term.isFavorite } : term
      )
    );
  };

  const renderTermCard = ({ item }: { item: GlossaryTerm }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`/glossary/term/${item.id}`);
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.termText}>{item.term}</Text>
        <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
          <Text style={{ color: item.isFavorite ? 'gold' : 'gray' }}>
            {item.isFavorite ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.definitionText} numberOfLines={2}>{item.definition}</Text>
      <Text style={styles.categoryText}>카테고리: {item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '용어집' }} />
      <TextInput
        style={styles.searchBar}
        placeholder="용어 검색..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={terms}
        renderItem={renderTermCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  selectedCategoryChip: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // Android specific shadow
    // Web specific boxShadow
    shadowColor: '#000', // iOS specific shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  termText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  definitionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});

export default GlossaryIndex;
