import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';

enum ConnectionStatus {
  NONE = 'NONE',
  CONNECTION_SENT = 'CONNECTION_SENT',
  CONNECTION_RECEIVED = 'CONNECTION_RECEIVED'
}

interface Friend {
  id: number;
  name: string;
  image: string;
  username: string;
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
}

// Mock data for friends and suggestions
const friends: Friend[] = [
  { id: 1, name: 'Angela M.', username: '@angelam', image: 'https://picsum.photos/200', isConnected: true, connectionStatus: ConnectionStatus.NONE },
  { id: 2, name: 'Benjamin R.', username: '@benjaminr', image: 'https://picsum.photos/201', isConnected: true, connectionStatus: ConnectionStatus.NONE },
  { id: 3, name: 'Caroline S.', username: '@carolines', image: 'https://picsum.photos/202', isConnected: true, connectionStatus: ConnectionStatus.NONE },
  { id: 4, name: 'Derek L.', username: '@derekl', image: 'https://picsum.photos/203', isConnected: true, connectionStatus: ConnectionStatus.NONE },
  { id: 5, name: 'Elena W.', username: '@elenaw', image: 'https://picsum.photos/204', isConnected: true, connectionStatus: ConnectionStatus.NONE },
  { id: 6, name: 'Emma B.', username: '@emmab', image: 'https://picsum.photos/205', isConnected: false, connectionStatus: ConnectionStatus.CONNECTION_RECEIVED },
  { id: 7, name: 'Fiona C.', username: '@fionac', image: 'https://picsum.photos/206', isConnected: false, connectionStatus: ConnectionStatus.CONNECTION_SENT },
  { id: 8, name: 'George D.', username: '@georged', image: 'https://picsum.photos/207', isConnected: false, connectionStatus: ConnectionStatus.NONE },
  { id: 9, name: 'Hannah E.', username: '@hannahe', image: 'https://picsum.photos/208', isConnected: false, connectionStatus: ConnectionStatus.NONE },
  { id: 10, name: 'Isabella F.', username: '@isabellaf', image: 'https://picsum.photos/209', isConnected: false, connectionStatus: ConnectionStatus.NONE },
];

const FriendItem: React.FC<Friend> = ({ name, image }) => (
  <View style={styles.friendItem}>
    <Image source={{ uri: image }} style={styles.avatar} />
    <Text style={styles.friendName}>{name}</Text>
  </View>
);

const RequestItem: React.FC<Friend> = ({ name, username, image }) => (
  <View style={styles.suggestedFriendItem}>
    <View style={styles.suggestedFriendInfo}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View>
        <Text style={styles.friendName}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
    <View style={styles.requestButtons}>
      <TouchableOpacity style={[styles.connectButton, styles.acceptButton]}>
        <Text style={[styles.connectButtonText, styles.acceptButtonText]}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.connectButton, styles.declineButton]}>
        <Text style={styles.connectButtonText}>Decline</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SuggestedFriendItem: React.FC<Friend> = ({ name, username, image, connectionStatus }) => (
  <View style={styles.suggestedFriendItem}>
    <View style={styles.suggestedFriendInfo}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View>
        <Text style={styles.friendName}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
    <TouchableOpacity 
      style={[
        styles.connectButton,
        connectionStatus === ConnectionStatus.CONNECTION_SENT && styles.connectButtonDisabled
      ]}
      disabled={connectionStatus === ConnectionStatus.CONNECTION_SENT}
    >
      <Text style={styles.connectButtonText}>
        {connectionStatus === ConnectionStatus.CONNECTION_SENT ? 'Pending' : 'Connect'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default function Friends() {
  const myFriends = friends.filter(friend => friend.isConnected);
  const friendRequests = friends.filter(friend => !friend.isConnected && friend.connectionStatus === ConnectionStatus.CONNECTION_RECEIVED);
  const suggestedFriends = friends.filter(friend => !friend.isConnected && friend.connectionStatus !== ConnectionStatus.CONNECTION_RECEIVED);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {friendRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Friend Requests</Text>
            {friendRequests.map((friend) => (
              <RequestItem key={friend.id} {...friend} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Friends</Text>
          {myFriends.map((friend) => (
            <FriendItem key={friend.id} {...friend} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People you may know</Text>
          {suggestedFriends.map((friend) => (
            <SuggestedFriendItem key={friend.id} {...friend} />
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
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  suggestedFriendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  suggestedFriendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  username: {
    fontSize: 14,
    color: '#808080',
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonDisabled: {
    opacity: 0.5,
  },
  requestButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: Colors.dark.tint,
  },
  acceptButtonText: {
    color: '#000000',
  },
  declineButton: {
    backgroundColor: '#2A2A2A',
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 