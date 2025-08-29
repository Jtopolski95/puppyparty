import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LiveFeedScreen() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    Alert.alert(
      'Camera Connected',
      'Camera connection feature will be implemented in future updates.'
    );
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const renderConnectionStatus = () => (
    <View style={styles.connectionStatus}>
      <View style={styles.statusIndicator}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isConnected ? '#32CD32' : '#FF3B30' },
          ]}
        />
        <Text
          style={[
            styles.statusText,
            { color: isConnected ? '#32CD32' : '#FF3B30' },
          ]}
        >
          {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
    </View>
  );

  const renderLiveFeedArea = () => (
    <View style={styles.liveFeedArea}>
      {isConnected ? (
        <View style={styles.connectedState}>
          <Ionicons name="videocam" size={50} color="#4169E1" />
          <Text style={styles.feedTitle}>Live Camera Feed</Text>
          <Text style={styles.feedSubtitle}>
            Your dog's live video stream would appear here
          </Text>
        </View>
      ) : (
        <View style={styles.disconnectedState}>
          <Ionicons name="videocam-off" size={50} color="#8E8E93" />
          <Text style={styles.feedTitle}>Camera Not Connected</Text>
          <Text style={styles.feedSubtitle}>
            Connect to your home camera to watch your dog
          </Text>
        </View>
      )}
    </View>
  );

  const renderCameraControls = () => (
    <View style={styles.cameraControls}>
      <Text style={styles.sectionTitle}>Camera Controls</Text>
      <View style={styles.controlButtons}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            {
              backgroundColor: isConnected ? '#FF3B30' : '#4169E1',
            },
          ]}
          onPress={isConnected ? handleDisconnect : handleConnect}
        >
          <Ionicons
            name={isConnected ? 'videocam-off' : 'videocam'}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.controlButtonText}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => Alert.alert('Settings', 'Camera settings coming soon!')}
        >
          <Ionicons name="settings" size={20} color="#000" />
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {isConnected && (
        <View style={styles.cameraInfo}>
          <Text style={styles.infoTitle}>Camera Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>Streaming</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quality:</Text>
            <Text style={styles.infoValue}>HD</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>FPS:</Text>
            <Text style={styles.infoValue}>30</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Resolution:</Text>
            <Text style={styles.infoValue}>1920x1080</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📹 Live Feed</Text>
        <Text style={styles.subtitle}>Watch your dog in real-time</Text>
      </View>

      {renderConnectionStatus()}
      {renderLiveFeedArea()}
      {renderCameraControls()}
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
  connectionStatus: {
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
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  liveFeedArea: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    height: 300,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  connectedState: {
    alignItems: 'center',
    padding: 20,
  },
  disconnectedState: {
    alignItems: 'center',
    padding: 20,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000',
  },
  feedSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cameraControls: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    gap: 8,
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  settingsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
    gap: 8,
  },
  settingsButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  cameraInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
});
