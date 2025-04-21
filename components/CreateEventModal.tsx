import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FriendsList } from '@/components/FriendsList';
import { SelectionButton } from '@/components/SelectionButton';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Provider as PaperProvider } from 'react-native-paper';

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (friend: string) => void;
}

export function CreateEventModal({ visible, onClose, onSend }: CreateEventModalProps) {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [selectedFriendName, setSelectedFriendName] = useState<string | undefined>();
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const insets = useSafeAreaInsets();

  const handleSelectFriend = (friendId: string, friendName: string) => {
    setSelectedFriend(friendId);
    setSelectedFriendName(friendName);
    setShowFriendsList(false);
  };

  const handleCreateMatch = () => {
    if (selectedFriend) {
      onSend(selectedFriend);
      setSelectedFriend(null);
      setSelectedFriendName(undefined);
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  };

  const handleClose = () => {
    setSelectedFriend(null);
    setSelectedFriendName(undefined);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    onClose();
  };

  const handleDateConfirm = ({
    date,
  }: {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
  }) => {
    if (date) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleDateDismiss = () => {
    setShowDatePicker(false);
  };

  const handleTimeConfirm = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    const newTime = new Date();
    if (selectedDate) {
      newTime.setTime(selectedDate.getTime());
    }
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setSelectedTime(newTime);
    setShowTimePicker(false);
  };

  const handleTimeDismiss = () => {
    setShowTimePicker(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <PaperProvider
        theme={{
          colors: {
            primary: '#CCFF00',
            onPrimary: '#000000',
            primaryContainer: '#CCFF00',
            onPrimaryContainer: '#000000',
            secondary: '#CCFF00',
            onSecondary: '#000000',
            secondaryContainer: '#CCFF00',
            onSecondaryContainer: '#000000',
            tertiary: '#CCFF00',
            onTertiary: '#000000',
            tertiaryContainer: '#CCFF00',
            onTertiaryContainer: '#000000',
            error: '#FF0000',
            onError: '#FFFFFF',
            errorContainer: '#FF0000',
            onErrorContainer: '#FFFFFF',
            background: Colors.dark.background,
            onBackground: '#FFFFFF',
            surface: Colors.dark.background,
            onSurface: '#FFFFFF',
            surfaceVariant: '#1E1E1E',
            onSurfaceVariant: '#FFFFFF',
            outline: '#CCFF00',
            outlineVariant: '#CCFF00',
            shadow: '#000000',
            scrim: '#000000',
            inverseSurface: '#FFFFFF',
            inverseOnSurface: '#000000',
            inversePrimary: '#000000',
            elevation: {
              level0: 'transparent',
              level1: '#1E1E1E',
              level2: '#1E1E1E',
              level3: '#1E1E1E',
              level4: '#1E1E1E',
              level5: '#1E1E1E',
            },
          },
          dark: true,
        }}
      >
        <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <IconSymbol name="xmark" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <ThemedText type="title" style={styles.title}>New Match</ThemedText>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.content}>
              {showFriendsList ? (
                <FriendsList
                  onSelectFriend={handleSelectFriend}
                  selectedFriend={selectedFriend}
                />
              ) : (
                <>
                  <SelectionButton
                    label="Select a friend"
                    value={selectedFriendName}
                    onPress={() => setShowFriendsList(true)}
                  />
                  
                  <SelectionButton
                    label="Choose Date"
                    value={selectedDate ? format(selectedDate, 'MMMM d, yyyy') : undefined}
                    icon="calendar"
                    onPress={() => setShowDatePicker(true)}
                  />

                  <SelectionButton
                    label="Choose Time"
                    value={selectedTime ? format(selectedTime, 'h:mm a') : undefined}
                    icon="calendar"
                    onPress={() => setShowTimePicker(true)}
                  />
                </>
              )}
            </View>

            {!showFriendsList && (
              <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
                <TouchableOpacity
                  style={[
                    styles.createButton,
                    !selectedFriend && styles.createButtonDisabled
                  ]}
                  disabled={!selectedFriend}
                  onPress={handleCreateMatch}
                >
                  <ThemedText style={styles.createButtonText}>Create Match</ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <DatePickerModal
            visible={showDatePicker}
            mode="single"
            onDismiss={handleDateDismiss}
            date={selectedDate}
            onConfirm={handleDateConfirm}
            presentationStyle="pageSheet"
            locale="en"
            allowEditing={false}
            validRange={{
              startDate: new Date(),
            }}
          />
          <TimePickerModal
            visible={showTimePicker}
            onDismiss={handleTimeDismiss}
            onConfirm={handleTimeConfirm}
            hours={selectedTime?.getHours() || 12}
            minutes={selectedTime?.getMinutes() || 0}
            label="Select time"
            cancelLabel="Cancel"
            confirmLabel="OK"
            animationType="fade"
          />
        </ThemedView>
      </PaperProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bottomContainer: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  createButton: {
    backgroundColor: '#CCFF00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 