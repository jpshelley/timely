import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface SelectionButtonProps {
  label: string;
  value?: string;
  onPress: () => void;
  icon?: "chevron.right" | "calendar";
}

export function SelectionButton({ label, value, onPress, icon = "chevron.right" }: SelectionButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText style={[styles.text, value ? styles.textSelected : styles.textPlaceholder]}>
        {value || label}
      </ThemedText>
      <IconSymbol name={icon} size={20} color="#808080" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
  },
  textSelected: {
    color: '#FFFFFF',
  },
  textPlaceholder: {
    color: '#808080',
  },
}); 