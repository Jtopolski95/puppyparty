import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDog } from '../contexts/DogContext';
import {
  DogBodyColor,
  DogSize,
  DogTail,
  DogBackground,
  DOG_BODY_COLORS,
  DOG_SIZES,
  DOG_TAILS,
  DOG_BACKGROUNDS,
  getDogBodyColorValue,
  getDogSizeScale,
  getDogTailLength,
  getDogBackgroundColor,
  getDogBackgroundEmoji,
} from '../types/dog';

export default function CreatePupScreen() {
  const { createDog } = useDog();
  const [dogName, setDogName] = useState('');
  const [selectedBodyColor, setSelectedBodyColor] = useState<DogBodyColor>(DogBodyColor.BROWN);
  const [selectedSize, setSelectedSize] = useState<DogSize>(DogSize.MEDIUM);
  const [selectedTail, setSelectedTail] = useState<DogTail>(DogTail.SMALL);
  const [selectedBackground, setSelectedBackground] = useState<DogBackground>(DogBackground.GRASS);

  const handleCreateDog = () => {
    const trimmedName = dogName.trim();
    
    if (!trimmedName) {
      Alert.alert('Name Required', 'Please enter a name for your dog.');
      return;
    }

    createDog(trimmedName, selectedBodyColor, selectedSize, selectedTail, selectedBackground);
    
    Alert.alert(
      'Success!',
      `Your digital dog ${trimmedName} has been created successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setDogName('');
            setSelectedBodyColor(DogBodyColor.BROWN);
            setSelectedSize(DogSize.MEDIUM);
            setSelectedTail(DogTail.SMALL);
            setSelectedBackground(DogBackground.GRASS);
          },
        },
      ]
    );
  };

  const renderDogPreview = () => {
    const scale = getDogSizeScale(selectedSize);
    const tailLength = getDogTailLength(selectedTail);

    return (
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Preview</Text>
        <View
          style={[
            styles.previewBackground,
            { backgroundColor: getDogBackgroundColor(selectedBackground) },
          ]}
        >
          <Text style={styles.backgroundEmoji}>
            {getDogBackgroundEmoji(selectedBackground)}
          </Text>
          
          <View style={styles.previewDog}>
            {/* Body */}
            <View
              style={[
                styles.previewBody,
                {
                  backgroundColor: getDogBodyColorValue(selectedBodyColor),
                  width: 80 * scale,
                  height: 50 * scale,
                },
              ]}
            />
            {/* Head */}
            <View
              style={[
                styles.previewHead,
                {
                  backgroundColor: getDogBodyColorValue(selectedBodyColor),
                  width: 50 * scale,
                  height: 50 * scale,
                  top: -25 * scale,
                },
              ]}
            />
            {/* Eyes */}
            <View
              style={[
                styles.previewEyes,
                {
                  top: -30 * scale,
                },
              ]}
            >
              <View
                style={[
                  styles.previewEye,
                  {
                    left: -5 * scale,
                    width: 5 * scale,
                    height: 5 * scale,
                  },
                ]}
              />
              <View
                style={[
                  styles.previewEye,
                  {
                    right: -5 * scale,
                    width: 5 * scale,
                    height: 5 * scale,
                  },
                ]}
              />
            </View>
            {/* Tail */}
            {selectedTail !== DogTail.NONE && (
              <View
                style={[
                  styles.previewTail,
                  {
                    backgroundColor: getDogBodyColorValue(selectedBodyColor),
                    right: -35 * scale,
                    top: -10 * scale,
                    width: 5 * scale,
                    height: tailLength * scale * 0.5,
                  },
                ]}
              />
            )}
          </View>
          
          <Text style={styles.previewName}>
            {dogName || 'Your Pup'}
          </Text>
        </View>
      </View>
    );
  };

  const renderCustomizationSection = (
    title: string,
    options: string[],
    selectedOption: string,
    onSelect: (option: string) => void
  ) => (
    <View style={styles.customizationSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsGrid}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐾 Create New Pup</Text>
        <Text style={styles.subtitle}>Design your perfect digital companion</Text>
      </View>

      {renderDogPreview()}

      <View style={styles.nameSection}>
        <Text style={styles.sectionTitle}>Dog's Name</Text>
        <TextInput
          style={styles.nameInput}
          value={dogName}
          onChangeText={setDogName}
          placeholder="Enter your dog's name"
          placeholderTextColor="#8E8E93"
          autoCapitalize="words"
        />
      </View>

      {renderCustomizationSection(
        'Body Color',
        DOG_BODY_COLORS,
        selectedBodyColor,
        (option) => setSelectedBodyColor(option as DogBodyColor)
      )}

      {renderCustomizationSection(
        'Size',
        DOG_SIZES,
        selectedSize,
        (option) => setSelectedSize(option as DogSize)
      )}

      {renderCustomizationSection(
        'Tail',
        DOG_TAILS,
        selectedTail,
        (option) => setSelectedTail(option as DogTail)
      )}

      {renderCustomizationSection(
        'Background',
        DOG_BACKGROUNDS,
        selectedBackground,
        (option) => setSelectedBackground(option as DogBackground)
      )}

      <TouchableOpacity
        style={[
          styles.createButton,
          !dogName.trim() && styles.disabledButton,
        ]}
        onPress={handleCreateDog}
        disabled={!dogName.trim()}
      >
        <Ionicons name="add-circle" size={24} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Create Dog</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9370DB',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  previewCard: {
    margin: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  previewBackground: {
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  backgroundEmoji: {
    fontSize: 60,
    opacity: 0.2,
    position: 'absolute',
  },
  previewDog: {
    position: 'relative',
    alignItems: 'center',
  },
  previewBody: {
    borderRadius: 25,
  },
  previewHead: {
    position: 'absolute',
    borderRadius: 25,
  },
  previewEyes: {
    position: 'absolute',
    flexDirection: 'row',
    width: 30,
    justifyContent: 'space-between',
  },
  previewEye: {
    backgroundColor: '#000',
    borderRadius: 2.5,
  },
  previewTail: {
    position: 'absolute',
    borderRadius: 2,
    transform: [{ rotate: '15deg' }],
  },
  previewName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  nameSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  nameInput: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    color: '#000',
  },
  customizationSection: {
    margin: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: '#9370DB',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  createButton: {
    backgroundColor: '#9370DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#E5E5EA',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
