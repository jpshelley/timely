import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CreateEventModal } from '@/components/CreateEventModal';

interface Match {
  id: number;
  title: string;
  participants: string;
  dateTime: string;
  image: string;
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    title: 'Golf with Sam and Mike',
    participants: 'Sam, Mike',
    dateTime: 'Friday, 8:30 PM',
    image: 'https://picsum.photos/200',
  },
  {
    id: 2,
    title: 'Tennis with John and Jeff',
    participants: 'John, Jeff',
    dateTime: 'Saturday, 9:30 AM',
    image: 'https://picsum.photos/201',
  },
  {
    id: 3,
    title: 'Soccer with Tom and Alex',
    participants: 'Tom, Alex',
    dateTime: 'Sunday, 7:30 AM',
    image: 'https://picsum.photos/202',
  },
];

const MatchItem: React.FC<Match> = ({ title, dateTime, image }) => (
  <TouchableOpacity style={styles.matchItem}>
    <View style={styles.matchInfo}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.matchDetails}>
        <Text style={styles.matchTitle}>{title}</Text>
        <Text style={styles.matchDateTime}>{dateTime}</Text>
      </View>
    </View>
    <IconSymbol name="paperplane.fill" size={24} color="#808080" />
  </TouchableOpacity>
);

export default function Matches() {
  const tabBarHeight = useBottomTabBarHeight();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateEvent = (friendId: string) => {
    // Handle event creation here
    console.log('Creating event with friend:', friendId);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 80 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          {upcomingMatches.map((match) => (
            <MatchItem key={match.id} {...match} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: tabBarHeight + 16 }]}
        onPress={() => setIsModalVisible(true)}
      >
        <IconSymbol name="plus" size={24} color="#000000" />
      </TouchableOpacity>

      <CreateEventModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSend={handleCreateEvent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  matchInfo: {
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
  matchDetails: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  matchDateTime: {
    fontSize: 14,
    color: '#808080',
  },
  fab: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.tint,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 