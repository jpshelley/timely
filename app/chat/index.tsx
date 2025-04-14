import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  profileImage: string;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: "Hey, are we still on for tennis tomorrow?",
    timestamp: '2:30 PM',
    profileImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    lastMessage: "Great game yesterday!",
    timestamp: '11:20 AM',
    profileImage: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Emma Davis',
    lastMessage: "Let's practice this weekend",
    timestamp: 'Yesterday',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  },
];

const ChatItem: React.FC<{ chat: ChatPreview }> = ({ chat }) => (
  <Pressable
    style={styles.chatItem}
    onPress={() => router.push(`/chat/${chat.id}?name=${chat.name}`)}
  >
    <Image source={{ uri: chat.profileImage }} style={styles.profileImage} />
    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.name}>{chat.name}</Text>
        <Text style={styles.timestamp}>{chat.timestamp}</Text>
      </View>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {chat.lastMessage}
      </Text>
    </View>
  </Pressable>
);

export default function Chat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <ScrollView style={styles.scrollView}>
        {mockChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  lastMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
}); 