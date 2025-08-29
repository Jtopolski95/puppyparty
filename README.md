# 🐕 PuppyParty - Digital Dog Companion App

A delightful cross-platform mobile app that lets you create, care for, and interact with your own digital dog companion. Built with React Native and Expo, PuppyParty combines the charm of Tamagotchi-style pet care with modern mobile app design.

## 📱 Features

### 🏠 Dashboard
- Overview of your digital dog's status
- Quick access to all app features
- Real-time stats display (happiness, energy, hunger)
- Quick action buttons for common tasks

### 📹 Live Feed
- Connect to home cameras to watch your real dog
- Camera connection status and controls
- Simulated live feed interface
- Camera settings and information display

### 🐕 Digital Dog (Tamagotchi-style)
- Interactive digital dog with animations
- Feed, play, and pet your virtual companion
- Real-time stat tracking and updates
- Visual feedback for all interactions
- Customizable dog appearance

### 🐾 Create New Pup
- Design your perfect digital companion
- Customize:
  - **Name**: Personalize your dog's name
  - **Body Color**: Brown, Black, White, Golden, Gray, Red
  - **Size**: Small, Medium, Large
  - **Tail**: None, Small, Long
  - **Background**: Grass, Cement, Beach, Los Angeles, New York City
- Live preview of your creation
- Easy-to-use interface with visual feedback

### 👤 Profile & Settings
- User profile management
- App settings (notifications, sound effects)
- Dog management (view current dog, reset)
- App information and support

## 🛠 Technical Details

### Architecture
- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab navigation
- **State Management**: React Context API
- **Data Persistence**: AsyncStorage
- **Platform**: iOS, Android, Web (cross-platform)

### Key Components
- `types/dog.ts`: TypeScript interfaces and enums
- `contexts/DogContext.tsx`: React Context for state management
- `app/_layout.tsx`: Root layout with tab navigation
- Individual screen files for each feature
- Custom React Native components

### Data Models
```typescript
interface Dog {
  id: string;
  name: string;
  bodyColor: DogBodyColor;
  size: DogSize;
  tail: DogTail;
  background: DogBackground;
  happiness: number;
  energy: number;
  hunger: number;
  lastFed: Date;
  lastPlayed: Date;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Run on your preferred platform:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

### Project Structure
```
PuppyParty/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with tabs
│   ├── index.tsx          # Dashboard screen
│   ├── live-feed.tsx      # Live camera feed
│   ├── digital-dog.tsx    # Tamagotchi interaction
│   ├── create-pup.tsx     # Dog creation
│   └── profile.tsx        # Settings and profile
├── contexts/              # React Context providers
│   └── DogContext.tsx     # Dog state management
├── types/                 # TypeScript definitions
│   └── dog.ts            # Dog data models
├── assets/               # App assets
├── package.json          # Dependencies
├── app.json             # Expo configuration
└── tsconfig.json        # TypeScript configuration
```

## 🎨 Design Features

### Visual Design
- Modern mobile-first design language
- Consistent color scheme with orange accent
- Smooth animations and transitions
- Responsive layout for different screen sizes
- Custom dog illustrations using React Native components

### User Experience
- Intuitive tab-based navigation
- Clear visual feedback for all actions
- Progressive disclosure of features
- Consistent interaction patterns
- Accessibility considerations

## 📱 Platform Support

### iOS
- Native iOS components and animations
- iOS-specific design patterns
- Optimized for iPhone and iPad

### Android
- Material Design components
- Android-specific interactions
- Optimized for various screen sizes

### Web
- Responsive web design
- Progressive Web App capabilities
- Cross-browser compatibility

## 🔮 Future Enhancements

### Planned Features
- **Real Camera Integration**: Connect to actual home cameras
- **Push Notifications**: Reminders for feeding and playtime
- **Achievements**: Unlock rewards and milestones
- **Social Features**: Share your dog with friends
- **Mini-games**: Interactive games with your dog
- **Customization**: More appearance options
- **Cloud Sync**: Sync across devices

### Technical Improvements
- **Firebase Integration**: Backend services
- **Real-time Updates**: Live data synchronization
- **Offline Support**: Work without internet
- **Performance Optimization**: Better app performance
- **Testing**: Unit and integration tests

## 🛠 Development

### Available Scripts
- `npm start`: Start Expo development server
- `npm run ios`: Run on iOS simulator
- `npm run android`: Run on Android emulator
- `npm run web`: Run in web browser
- `npm run build`: Build for production

### Dependencies
- **Expo**: Development platform
- **React Native**: Mobile framework
- **Expo Router**: Navigation
- **AsyncStorage**: Data persistence
- **React Native Reanimated**: Animations
- **Expo Vector Icons**: Icon library

## 🤝 Contributing

This is a demonstration project showcasing React Native development with Expo. Feel free to explore the code and use it as a reference for your own projects.

## 📄 License

This project is for educational and demonstration purposes.

## 🐾 About

PuppyParty was created to demonstrate modern React Native development practices using Expo, with a focus on creating an engaging and delightful cross-platform user experience. The app combines pet simulation mechanics with real-world camera integration concepts.

---

*Made with ❤️ and 🐕 using React Native & Expo*
