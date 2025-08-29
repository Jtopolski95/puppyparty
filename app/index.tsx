import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDog } from '../contexts/DogContext';
import { getDogBodyColorValue, getDogBackgroundEmoji } from '../types/dog';

export default function DashboardScreen() {
  const { currentDog } = useDog();

  const handleQuickAction = (action: string) => {
    Alert.alert('Quick Action', `${action} feature will be implemented soon!`);
  };

  const renderStatusIndicator = (title: string, value: number, color: string) => (
    <View style={styles.statusIndicator}>
      <Text style={styles.statusTitle}>{title}</Text>
      <View style={styles.circularProgress}>
        <View style={[styles.progressCircle, { borderColor: color }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: color,
                transform: [{ rotate: `${(value / 100) * 360}deg` }],
              },
            ]}
          />
          <Text style={styles.progressText}>{value}%</Text>
        </View>
      </View>
    </View>
  );

  const renderDogStatusCard = () => {
    if (!currentDog) return null;

    return (
      <View style={styles.dogStatusCard}>
        <View style={styles.dogHeader}>
          <View style={styles.dogInfo}>
            <Text style={styles.dogName}>{currentDog.name}</Text>
            <Text style={styles.dogSubtitle}>Your Digital Companion</Text>
          </View>
          <View style={styles.dogIcon}>
            <View
              style={[
                styles.dogAvatar,
                { backgroundColor: getDogBodyColorValue(currentDog.bodyColor) },
              ]}
            >
              <Text style={styles.dogEmoji}>🐕</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusIndicators}>
          {renderStatusIndicator('Happiness', currentDog.happiness, '#FFD700')}
          {renderStatusIndicator('Energy', currentDog.energy, '#32CD32')}
          {renderStatusIndicator('Hunger', currentDog.hunger, '#FFA500')}
        </View>
      </View>
    );
  };

  const renderNoDogCard = () => (
    <View style={styles.noDogCard}>
      <Ionicons name="paw" size={50} color="#FF6B35" />
      <Text style={styles.noDogTitle}>No Digital Dog Yet</Text>
      <Text style={styles.noDogSubtitle}>
        Create your first digital companion in the Create Pup tab!
      </Text>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleQuickAction('Feed Dog')}
        >
          <Ionicons name="restaurant" size={24} color="#FFA500" />
          <Text style={styles.actionText}>Feed Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleQuickAction('Play Time')}
        >
          <Ionicons name="game-controller" size={24} color="#32CD32" />
          <Text style={styles.actionText}>Play Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleQuickAction('Live Feed')}
        >
          <Ionicons name="videocam" size={24} color="#4169E1" />
          <Text style={styles.actionText}>Live Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleQuickAction('Create New')}
        >
          <Ionicons name="add-circle" size={24} color="#9370DB" />
          <Text style={styles.actionText}>Create New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDogDetails = () => {
    if (!currentDog) return null;

    return (
      <View style={styles.dogDetails}>
        <Text style={styles.sectionTitle}>Dog Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Size:</Text>
          <Text style={styles.detailValue}>{currentDog.size}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Color:</Text>
          <Text style={styles.detailValue}>{currentDog.bodyColor}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tail:</Text>
          <Text style={styles.detailValue}>{currentDog.tail}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Background:</Text>
          <Text style={styles.detailValue}>
            {currentDog.background} {getDogBackgroundEmoji(currentDog.background)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🐕 PuppyParty</Text>
        <Text style={styles.subtitle}>Your Digital Dog Companion</Text>
      </View>

      {currentDog ? renderDogStatusCard() : renderNoDogCard()}
      {renderQuickActions()}
      {renderDogDetails()}
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
  dogStatusCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dogInfo: {
    flex: 1,
  },
  dogName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  dogSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  dogIcon: {
    marginLeft: 10,
  },
  dogAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogEmoji: {
    fontSize: 24,
  },
  statusIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 5,
  },
  circularProgress: {
    position: 'relative',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressFill: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'currentColor',
  },
  progressText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  noDogCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noDogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  noDogSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  quickActions: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
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
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    color: '#000',
  },
  dogDetails: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});
