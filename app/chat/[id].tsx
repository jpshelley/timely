import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'friend';
  timestamp: string;
}

// Mock conversation data
const messages: Message[] = [
  { id: 1, text: "Hey, are we still on for tennis tomorrow?", sender: 'friend', timestamp: '2:30 PM' },
  { id: 2, text: "Yes! I'll bring the tennis balls", sender: 'user', timestamp: '2:31 PM' },
  { id: 3, text: "Great! Same court as last time?", sender: 'friend', timestamp: '2:32 PM' },
  { id: 4, text: "Yep, court 3 at the rec center", sender: 'user', timestamp: '2:33 PM' },
  { id: 5, text: "Perfect, see you at 9!", sender: 'friend', timestamp: '2:34 PM' },
  { id: 6, text: "Looking forward to it!", sender: 'user', timestamp: '2:35 PM' },
  { id: 7, text: "Don't forget water, it's supposed to be hot", sender: 'friend', timestamp: '2:36 PM' },
  { id: 8, text: "Thanks for the reminder 👍", sender: 'user', timestamp: '2:37 PM' },
];

const MessageBubble: React.FC<Message> = ({ text, sender, timestamp }) => (
  <View style={[styles.messageBubbleContainer, sender === 'user' && styles.userMessageContainer]}>
    <View style={[
      styles.messageBubble,
      sender === 'user' ? styles.userMessage : styles.friendMessage
    ]}>
      <Text style={styles.messageText}>{text}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  </View>
);

export default function ChatDetail() {
  const { id, name } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 8,
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    flexDirection: 'column',
  },
  userMessage: {
    backgroundColor: Colors.dark.tint,
    borderTopRightRadius: 4,
  },
  friendMessage: {
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
}); 