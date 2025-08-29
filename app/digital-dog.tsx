import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDog } from '../contexts/DogContext';
import {
  getDogBodyColorValue,
  getDogSizeScale,
  getDogTailLength,
  getDogBackgroundColor,
  getDogBackgroundEmoji,
} from '../types/dog';

export default function DigitalDogScreen() {
  const { currentDog, feedDog, playWithDog, petDog } = useDog();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const tailAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations when component mounts
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const tailAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(tailAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(tailAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    scaleAnimation.start();
    tailAnimation.start();

    return () => {
      scaleAnimation.stop();
      tailAnimation.stop();
    };
  }, []);

  const handleFeed = () => {
    feedDog();
    Alert.alert('Dog Action', 'You fed your dog! 🍖');
  };

  const handlePlay = () => {
    playWithDog();
    Alert.alert('Dog Action', 'You played with your dog! 🎾');
  };

  const handlePet = () => {
    petDog();
    Alert.alert('Dog Action', 'You petted your dog! 🥰');
  };

  const renderDogDisplay = () => {
    if (!currentDog) return null;

    const scale = getDogSizeScale(currentDog.size);
    const tailLength = getDogTailLength(currentDog.tail);
    const tailRotation = tailAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['-15deg', '15deg'],
    });

    return (
      <View style={styles.dogDisplayArea}>
        <View
          style={[
            styles.background,
            { backgroundColor: getDogBackgroundColor(currentDog.background) },
          ]}
        >
          <Text style={styles.backgroundEmoji}>
            {getDogBackgroundEmoji(currentDog.background)}
          </Text>
        </View>

        <View style={styles.dogContainer}>
          <Animated.View
            style={[
              styles.dogBody,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Body */}
            <View
              style={[
                styles.body,
                {
                  backgroundColor: getDogBodyColorValue(currentDog.bodyColor),
                  width: 120 * scale,
                  height: 80 * scale,
                },
              ]}
            />
            {/* Head */}
            <View
              style={[
                styles.head,
                {
                  backgroundColor: getDogBodyColorValue(currentDog.bodyColor),
                  width: 80 * scale,
                  height: 80 * scale,
                  top: -40 * scale,
                },
              ]}
            />
            {/* Eyes */}
            <View
              style={[
                styles.eyes,
                {
                  top: -45 * scale,
                },
              ]}
            >
              <View
                style={[
                  styles.eye,
                  {
                    left: -10 * scale,
                    width: 8 * scale,
                    height: 8 * scale,
                  },
                ]}
              />
              <View
                style={[
                  styles.eye,
                  {
                    right: -10 * scale,
                    width: 8 * scale,
                    height: 8 * scale,
                  },
                ]}
              />
            </View>
            {/* Nose */}
            <View
              style={[
                styles.nose,
                {
                  top: -35 * scale,
                  width: 6 * scale,
                  height: 6 * scale,
                },
              ]}
            />
            {/* Ears */}
            <View
              style={[
                styles.ears,
                {
                  top: -60 * scale,
                },
              ]}
            >
              <View
                style={[
                  styles.ear,
                  {
                    backgroundColor: getDogBodyColorValue(currentDog.bodyColor),
                    left: -30 * scale,
                    width: 20 * scale,
                    height: 30 * scale,
                  },
                ]}
              />
              <View
                style={[
                  styles.ear,
                  {
                    backgroundColor: getDogBodyColorValue(currentDog.bodyColor),
                    right: -30 * scale,
                    width: 20 * scale,
                    height: 30 * scale,
                  },
                ]}
              />
            </View>
            {/* Tail */}
            {currentDog.tail !== 'None' && (
              <Animated.View
                style={[
                  styles.tail,
                  {
                    backgroundColor: getDogBodyColorValue(currentDog.bodyColor),
                    right: -60 * scale,
                    top: -20 * scale,
                    width: 8 * scale,
                    height: tailLength * scale,
                    transform: [{ rotate: tailRotation }],
                  },
                ]}
              />
            )}
          </Animated.View>

          <Text style={styles.dogName}>{currentDog.name}</Text>
        </View>
      </View>
    );
  };

  const renderStatsBars = () => {
    if (!currentDog) return null;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statBar}>
          <View style={styles.statHeader}>
            <Ionicons name="heart" size={16} color="#FFD700" />
            <Text style={styles.statLabel}>Happiness</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${currentDog.happiness}%`, backgroundColor: '#FFD700' },
              ]}
            />
          </View>
          <Text style={styles.statValue}>{currentDog.happiness}%</Text>
        </View>

        <View style={styles.statBar}>
          <View style={styles.statHeader}>
            <Ionicons name="flash" size={16} color="#32CD32" />
            <Text style={styles.statLabel}>Energy</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${currentDog.energy}%`, backgroundColor: '#32CD32' },
              ]}
            />
          </View>
          <Text style={styles.statValue}>{currentDog.energy}%</Text>
        </View>

        <View style={styles.statBar}>
          <View style={styles.statHeader}>
            <Ionicons name="restaurant" size={16} color="#FFA500" />
            <Text style={styles.statLabel}>Hunger</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${currentDog.hunger}%`, backgroundColor: '#FFA500' },
              ]}
            />
          </View>
          <Text style={styles.statValue}>{currentDog.hunger}%</Text>
        </View>
      </View>
    );
  };

  const renderInteractionButtons = () => (
    <View style={styles.interactionButtons}>
      <TouchableOpacity style={styles.interactionButton} onPress={handleFeed}>
        <Ionicons name="restaurant" size={24} color="#FFA500" />
        <Text style={styles.interactionText}>Feed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.interactionButton} onPress={handlePlay}>
        <Ionicons name="game-controller" size={24} color="#32CD32" />
        <Text style={styles.interactionText}>Play</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.interactionButton} onPress={handlePet}>
        <Ionicons name="hand-left" size={24} color="#4169E1" />
        <Text style={styles.interactionText}>Pet</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStatusMessage = () => {
    if (!currentDog) return null;

    let message = '';
    if (currentDog.hunger < 30) {
      message = `${currentDog.name} is very hungry! 🍖`;
    } else if (currentDog.energy < 30) {
      message = `${currentDog.name} is tired and needs rest 😴`;
    } else if (currentDog.happiness < 30) {
      message = `${currentDog.name} is sad and needs attention 😢`;
    } else if (currentDog.happiness > 80 && currentDog.energy > 80 && currentDog.hunger > 80) {
      message = `${currentDog.name} is very happy and healthy! 🎉`;
    } else {
      message = `${currentDog.name} is doing well! 🐕`;
    }

    return (
      <View style={styles.statusMessage}>
        <Text style={styles.statusText}>{message}</Text>
      </View>
    );
  };

  const renderNoDogState = () => (
    <View style={styles.noDogState}>
      <Ionicons name="paw" size={80} color="#FF6B35" />
      <Text style={styles.noDogTitle}>No Digital Dog</Text>
      <Text style={styles.noDogSubtitle}>
        Create your first digital companion to start interacting!
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐕 Digital Dog</Text>
        <Text style={styles.subtitle}>Interact with your digital companion</Text>
      </View>

      {currentDog ? (
        <>
          {renderDogDisplay()}
          {renderStatsBars()}
          {renderInteractionButtons()}
          {renderStatusMessage()}
        </>
      ) : (
        renderNoDogState()
      )}
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
    color: '#FF6B35',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  dogDisplayArea: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundEmoji: {
    fontSize: 100,
    opacity: 0.1,
  },
  dogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogBody: {
    position: 'relative',
    alignItems: 'center',
  },
  body: {
    borderRadius: 40,
  },
  head: {
    position: 'absolute',
    borderRadius: 40,
  },
  eyes: {
    position: 'absolute',
    flexDirection: 'row',
    width: 40,
    justifyContent: 'space-between',
  },
  eye: {
    backgroundColor: '#000',
    borderRadius: 4,
  },
  nose: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 3,
  },
  ears: {
    position: 'absolute',
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  ear: {
    borderRadius: 10,
  },
  tail: {
    position: 'absolute',
    borderRadius: 4,
  },
  dogName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  statsContainer: {
    margin: 16,
  },
  statBar: {
    marginBottom: 15,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: '#000',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'right',
    color: '#000',
  },
  interactionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  interactionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 80,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    color: '#000',
  },
  statusMessage: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  noDogState: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noDogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  noDogSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
