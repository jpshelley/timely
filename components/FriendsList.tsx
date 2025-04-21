import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';

interface Friend {
  id: string;
  name: string;
}

interface FriendsListProps {
  onSelectFriend: (friendId: string, friendName: string) => void;
  selectedFriend: string | null;
}

const friends: Friend[] = [
  { id: '1', name: 'Sam' },
  { id: '2', name: 'Mike' },
  { id: '3', name: 'John' },
  { id: '4', name: 'Jeff' },
  { id: '5', name: 'Sarah' },
  { id: '6', name: 'Emily' },
  { id: '7', name: 'David' },
  { id: '8', name: 'Alex' },
];

export function FriendsList({ onSelectFriend, selectedFriend }: FriendsListProps) {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  // Debounce the search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredFriends = debouncedSearchText
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#808080" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor="#808080"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
            <IconSymbol name="xmark" size={16} color="#808080" />
          </TouchableOpacity>
        )}
      </View>

      {searchText.length > 0 && (
        <View style={styles.friendsList}>
          {filteredFriends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={[
                styles.friendItem,
                selectedFriend === friend.id && styles.selectedFriend
              ]}
              onPress={() => onSelectFriend(friend.id, friend.name)}
            >
              <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
            </TouchableOpacity>
          ))}
          {filteredFriends.length === 0 && (
            <ThemedText style={styles.noResults}>No friends found</ThemedText>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#FFFFFF',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  friendsList: {
    gap: 12,
  },
  friendItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
  },
  selectedFriend: {
    backgroundColor: Colors.dark.tint,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
  },
  noResults: {
    textAlign: 'center',
    color: '#808080',
    marginTop: 24,
  },
}); 