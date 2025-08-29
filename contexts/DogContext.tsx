import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dog, DogBodyColor, DogSize, DogTail, DogBackground } from '../types/dog';

interface DogContextType {
  currentDog: Dog | null;
  createDog: (name: string, bodyColor: DogBodyColor, size: DogSize, tail: DogTail, background: DogBackground) => void;
  feedDog: () => void;
  playWithDog: () => void;
  petDog: () => void;
  resetDog: () => void;
  updateDogStats: () => void;
}

const DogContext = createContext<DogContextType | undefined>(undefined);

export const useDog = () => {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error('useDog must be used within a DogProvider');
  }
  return context;
};

interface DogProviderProps {
  children: ReactNode;
}

export const DogProvider: React.FC<DogProviderProps> = ({ children }) => {
  const [currentDog, setCurrentDog] = useState<Dog | null>(null);

  // Load dog from storage on app start
  useEffect(() => {
    loadDogFromStorage();
  }, []);

  // Update dog stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateDogStats();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentDog]);

  const loadDogFromStorage = async () => {
    try {
      const dogData = await AsyncStorage.getItem('currentDog');
      if (dogData) {
        const dog = JSON.parse(dogData);
        // Convert date strings back to Date objects
        dog.lastFed = new Date(dog.lastFed);
        dog.lastPlayed = new Date(dog.lastPlayed);
        setCurrentDog(dog);
      }
    } catch (error) {
      console.error('Error loading dog from storage:', error);
    }
  };

  const saveDogToStorage = async (dog: Dog) => {
    try {
      await AsyncStorage.setItem('currentDog', JSON.stringify(dog));
    } catch (error) {
      console.error('Error saving dog to storage:', error);
    }
  };

  const createDog = (name: string, bodyColor: DogBodyColor, size: DogSize, tail: DogTail, background: DogBackground) => {
    const newDog: Dog = {
      id: Date.now().toString(),
      name,
      bodyColor,
      size,
      tail,
      background,
      happiness: 50,
      energy: 50,
      hunger: 50,
      lastFed: new Date(),
      lastPlayed: new Date(),
    };
    setCurrentDog(newDog);
    saveDogToStorage(newDog);
  };

  const updateDogStats = () => {
    if (!currentDog) return;

    const now = new Date();
    const timeSinceLastFed = now.getTime() - currentDog.lastFed.getTime();
    const timeSinceLastPlayed = now.getTime() - currentDog.lastPlayed.getTime();

    let updatedDog = { ...currentDog };

    // Decrease stats over time
    if (timeSinceLastFed > 3600000) { // 1 hour
      updatedDog.hunger = Math.max(0, updatedDog.hunger - 5);
    }

    if (timeSinceLastPlayed > 1800000) { // 30 minutes
      updatedDog.energy = Math.max(0, updatedDog.energy - 3);
      updatedDog.happiness = Math.max(0, updatedDog.happiness - 2);
    }

    setCurrentDog(updatedDog);
    saveDogToStorage(updatedDog);
  };

  const feedDog = () => {
    if (!currentDog) return;

    const updatedDog = {
      ...currentDog,
      hunger: Math.min(100, currentDog.hunger + 30),
      happiness: Math.min(100, currentDog.happiness + 10),
      lastFed: new Date(),
    };

    setCurrentDog(updatedDog);
    saveDogToStorage(updatedDog);
  };

  const playWithDog = () => {
    if (!currentDog) return;

    const updatedDog = {
      ...currentDog,
      energy: Math.min(100, currentDog.energy + 20),
      happiness: Math.min(100, currentDog.happiness + 25),
      lastPlayed: new Date(),
    };

    setCurrentDog(updatedDog);
    saveDogToStorage(updatedDog);
  };

  const petDog = () => {
    if (!currentDog) return;

    const updatedDog = {
      ...currentDog,
      happiness: Math.min(100, currentDog.happiness + 5),
    };

    setCurrentDog(updatedDog);
    saveDogToStorage(updatedDog);
  };

  const resetDog = () => {
    setCurrentDog(null);
    AsyncStorage.removeItem('currentDog');
  };

  const value: DogContextType = {
    currentDog,
    createDog,
    feedDog,
    playWithDog,
    petDog,
    resetDog,
    updateDogStats,
  };

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
};
