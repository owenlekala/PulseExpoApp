# PulseExpoApp

A production-ready React Native Expo application with Firebase Authentication, API integration, Hero UI Native components, Ming Cute icons, and dark/light theme support.

## Features

- 🔐 Firebase Authentication (Email/Password)
- 🎨 Hero UI Native components (Button, Input, Dropdown, Tabs)
- 🎯 Ming Cute icons integration
- 🌓 Dark/Light mode theme with system preference detection
- 📱 React Navigation (Stack & Tab navigators)
- 🗄️ Zustand state management
- 🌐 Axios API client with interceptors
- 💾 AsyncStorage & SecureStore for data persistence
- 📝 TypeScript support

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase project setup
- iOS Simulator / Android Emulator or physical device

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PulseExpoApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` file with your Firebase and API credentials:
```
EXPO_PUBLIC_API_URL=https://your-api-url.com
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication section
3. Copy your Firebase config values to `.env` file
4. For iOS: Download `GoogleService-Info.plist` and add to `ios/` directory
5. For Android: Download `google-services.json` and add to `android/app/` directory

## Running the App

### Development
```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- `w` for web browser

### Platform-specific
```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## Project Structure

See [APP_STRUCTURE.md](./APP_STRUCTURE.md) for detailed project structure documentation.

## Key Dependencies

- **expo**: ~54.0.31
- **react-native**: 0.81.5
- **@react-navigation/native**: ^6.1.9
- **firebase**: ^10.7.1
- **axios**: ^1.6.2
- **zustand**: ^4.4.7

**Note**: Hero UI Native and Ming Cute Icons are not included in package.json as they may not be published to npm yet. Install them separately when available:
- `heroui-native`: Follow installation guide at [Hero UI Native GitHub](https://github.com/heroui-inc/heroui-native)
- `mingcute-icon`: Use SVG files from [Ming Cute website](https://www.mingcute.com/) or install the package when available

## Usage

### Using Hero UI Native Components

```tsx
import { Button, Input, Dropdown, Tabs } from '@/components/ui';

// Button
<Button variant="primary" onPress={handlePress}>
  Click Me
</Button>

// Input
<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
/>

// Dropdown
<Dropdown
  label="Select Option"
  options={options}
  selectedValue={selected}
  onValueChange={setSelected}
/>

// Tabs
<Tabs
  items={tabItems}
  defaultActiveKey="tab1"
  onTabChange={handleTabChange}
/>
```

### Using Ming Cute Icons

```tsx
import { Icon } from '@/components/ui';
import { ICONS } from '@/constants/icons';

<Icon name={ICONS.HOME} size={24} color="#000" />
```

### Theme Management

```tsx
import { useTheme } from '@/hooks/useTheme';
import { useThemeStore } from '@/store/slices/themeSlice';

function MyComponent() {
  const { colors, spacing } = useTheme();
  const { mode, setMode } = useThemeStore();
  
  // Change theme mode
  setMode('dark'); // or 'light' or 'system'
}
```

### Firebase Auth

```tsx
import { signIn, signUp, signOut } from '@/services/firebase/auth';

// Sign in
await signIn({ email: 'user@example.com', password: 'password' });

// Sign up
await signUp({ email: 'user@example.com', password: 'password' });

// Sign out
await signOut();
```

### API Calls

```tsx
import { api } from '@/services/api/client';

// GET request
const response = await api.get('/users');

// POST request
const response = await api.post('/users', { name: 'John' });
```

## Next Steps

1. **Install Hero UI Native**: Follow the [Hero UI Native installation guide](https://github.com/heroui-inc/heroui-native) to replace placeholder components
2. **Install Ming Cute Icons**: Install the Ming Cute icon package and update the Icon component
3. **Configure API Endpoints**: Update `src/services/api/endpoints.ts` with your actual API endpoints
4. **Customize Theme**: Modify colors in `src/theme/colors.ts` to match your brand
5. **Add Features**: Start building features in the `src/features/` directory

## Troubleshooting

### Metro bundler cache issues
```bash
npm start -- --reset-cache
```

### iOS build issues
```bash
cd ios && pod install && cd ..
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Your License Here]

## Support

For issues and questions, please open an issue on GitHub.

