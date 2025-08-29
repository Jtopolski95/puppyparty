# Development Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jtopolski95/puppyparty.git
   cd puppyparty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Project Structure

```
puppyparty/
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
├── assets/               # Static assets
└── package.json          # Dependencies
```

## Key Technologies

- **React Native**: Mobile framework
- **Expo**: Development platform
- **Expo Router**: File-based navigation
- **TypeScript**: Type safety
- **React Context**: State management
- **AsyncStorage**: Data persistence

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Use consistent naming conventions
   - Add comments for complex logic

3. **Test your changes**
   - Test on both iOS and Android
   - Ensure responsive design works
   - Check for TypeScript errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

- Use TypeScript for all new code
- Follow React Native best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

## Testing

- Test on multiple devices/simulators
- Verify all dog interactions work correctly
- Check data persistence across app restarts
- Ensure animations are smooth
- Test error handling

## Common Issues

### Metro bundler issues
```bash
npx expo start --clear
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
npx expo run:android --clear
```

## Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npx expo build:ios
npx expo build:android
```

### Web Deployment
```bash
npm run web
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
