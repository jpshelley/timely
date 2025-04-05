import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function Preference() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const tabBarHeight = useBottomTabBarHeight();

  const toggleButtonSelection = (label: string) => {
    setSelectedButtons((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((item) => item !== label)
        : [...prevSelected, label]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>When are you free?</Text>
        <SegmentedControl
          values={['Everyday', 'Weekday', 'Weekends']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.segmentedControl}
          backgroundColor="#2A2A2A"
          tintColor={Colors.dark.tint}
          fontStyle={{ color: '#FFFFFF' }}
          activeFontStyle={{ color: '#000000' }}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Pick a time</Text>
        <View style={[styles.buttonContainer, { paddingBottom: tabBarHeight }]}>
          {['Dusk', 'Morning', 'Afternoon', 'Evening'].map((label, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chip,
                selectedButtons.includes(label) && styles.selectedChip,
              ]}
              onPress={() => toggleButtonSelection(label)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedButtons.includes(label) && styles.selectedChipText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  segmentedControl: {
    height: 40,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 16,
  },
  chip: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
  },
  selectedChip: {
    backgroundColor: Colors.dark.tint,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedChipText: {
    color: '#000000',
  },
});