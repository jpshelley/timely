import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';

interface ChatPreview {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
}

const chats: ChatPreview[] = [
  {
    id: 1,
    name: 'Angela M.',
    image: 'https://picsum.photos/200',
    lastMessage: 'See you at the golf course!',
    timestamp: '2m ago',
  },
  {
    id: 2,
    name: 'Benjamin R.',
    image: 'https://picsum.photos/201',
    lastMessage: "Perfect, I'll bring the tennis balls",
    timestamp: '15m ago',
  },
  {
    id: 3,
    name: 'Caroline S.',
    image: 'https://picsum.photos/202',
    lastMessage: 'How about next Saturday?',
    timestamp: '1h ago',
  },
  {
    id: 4,
    name: 'Derek L.',
    image: 'https://picsum.photos/203',
    lastMessage: 'Great game today!',
    timestamp: '2h ago',
  },
  {
    id: 5,
    name: 'Elena W.',
    image: 'https://picsum.photos/204',
    lastMessage: 'Looking forward to our match',
    timestamp: '1d ago',
  },
];

const ChatItem: React.FC<ChatPreview> = ({ name, image, lastMessage, timestamp }) => (
  <TouchableOpacity style={styles.chatItem}>
    <View style={styles.chatInfo}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.messageContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{lastMessage}</Text>
      </View>
    </View>
    <Text style={styles.timestamp}>{timestamp}</Text>
  </TouchableOpacity>
);

export default function Chat() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        <View style={styles.section}>
          {chats.map((chat) => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#808080',
  },
  timestamp: {
    fontSize: 12,
    color: '#808080',
    marginLeft: 8,
  },
});