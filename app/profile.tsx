import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDog } from '../contexts/DogContext';
import { getDogBodyColorValue, getDogBackgroundEmoji } from '../types/dog';

export default function ProfileScreen() {
  const { currentDog, resetDog } = useDog();
  const [userName, setUserName] = useState('Puppy Lover');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleResetDog = () => {
    Alert.alert(
      'Reset Dog',
      'This will delete your current digital dog. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetDog();
            Alert.alert('Success', 'Your dog has been reset.');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About PuppyParty',
      'PuppyParty v1.0\n\nA digital dog companion app that lets you create, care for, and interact with your virtual pet. Watch your dog through live feeds and enjoy Tamagotchi-style interactions!'
    );
  };

  const renderUserProfile = () => (
    <View style={styles.userProfile}>
      <Text style={styles.sectionTitle}>User Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle" size={50} color="#4169E1" />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userSubtitle}>PuppyParty User</Text>
          </View>
        </View>
        
        <View style={styles.profileDivider} />
        
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Member Since</Text>
            <Text style={styles.statValue}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={styles.statusValue}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAppSettings = () => (
    <View style={styles.appSettings}>
      <Text style={styles.sectionTitle}>App Settings</Text>
      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications" size={24} color="#4169E1" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSubtitle}>Get alerts about your dog</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E5E5EA', true: '#4169E1' }}
            thumbColor="#FFFFFF"
          />
        </View>
        
        <View style={styles.settingDivider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="volume-high" size={24} color="#4169E1" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Sound Effects</Text>
              <Text style={styles.settingSubtitle}>Play sounds during interactions</Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#E5E5EA', true: '#4169E1' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>
    </View>
  );

  const renderDogManagement = () => (
    <View style={styles.dogManagement}>
      <Text style={styles.sectionTitle}>Dog Management</Text>
      <View style={styles.dogCard}>
        {currentDog ? (
          <>
            <View style={styles.dogInfo}>
              <View style={styles.dogAvatar}>
                <Ionicons name="paw" size={24} color="#FF6B35" />
              </View>
              <View style={styles.dogDetails}>
                <Text style={styles.dogName}>{currentDog.name}</Text>
                <Text style={styles.dogSubtitle}>
                  {currentDog.bodyColor} • {currentDog.size}
                </Text>
              </View>
              <View style={styles.dogLevel}>
                <Text style={styles.levelLabel}>Level</Text>
                <Text style={styles.levelValue}>1</Text>
              </View>
            </View>
            
            <View style={styles.settingDivider} />
            
            <TouchableOpacity style={styles.settingRow} onPress={handleResetDog}>
              <View style={styles.settingInfo}>
                <Ionicons name="refresh" size={24} color="#4169E1" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Reset Dog</Text>
                  <Text style={styles.settingSubtitle}>Delete current dog and start over</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="paw" size={24} color="#4169E1" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>No Dog Created</Text>
                <Text style={styles.settingSubtitle}>Create your first digital companion</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const renderAppInfo = () => (
    <View style={styles.appInfo}>
      <Text style={styles.sectionTitle}>App Information</Text>
      <View style={styles.infoCard}>
        <TouchableOpacity style={styles.settingRow} onPress={handleAbout}>
          <View style={styles.settingInfo}>
            <Ionicons name="information-circle" size={24} color="#4169E1" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>About PuppyParty</Text>
              <Text style={styles.settingSubtitle}>Learn more about the app</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
        
        <View style={styles.settingDivider} />
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => Alert.alert('Rate App', 'Rating feature coming soon!')}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="star" size={24} color="#4169E1" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Rate App</Text>
              <Text style={styles.settingSubtitle}>Share your feedback</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
        
        <View style={styles.settingDivider} />
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => Alert.alert('Contact Support', 'Support feature coming soon!')}
        >
          <View style={styles.settingInfo}>
            <Ionicons name="mail" size={24} color="#4169E1" />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Contact Support</Text>
              <Text style={styles.settingSubtitle}>Get help and support</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👤 Profile & Settings</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>
      </View>

      {renderUserProfile()}
      {renderAppSettings()}
      {renderDogManagement()}
      {renderAppInfo()}
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
    color: '#4169E1',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 5,
  },
  userProfile: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  userSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  profileDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 15,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#32CD32',
  },
  appSettings: {
    margin: 16,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 55,
  },
  dogManagement: {
    margin: 16,
  },
  dogCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dogInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dogAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogDetails: {
    marginLeft: 15,
    flex: 1,
  },
  dogName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  dogSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  dogLevel: {
    alignItems: 'flex-end',
  },
  levelLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  levelValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4169E1',
  },
  appInfo: {
    margin: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
