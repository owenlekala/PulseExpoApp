# Architecture Documentation

This document describes the architecture and design decisions for PulseExpoApp.

## Overview

PulseExpoApp is a React Native Expo application built with a feature-based architecture, emphasizing separation of concerns, type safety, and scalability.

## Architecture Principles

1. **Feature-Based Organization**: Code is organized by features rather than file types
2. **Separation of Concerns**: Business logic separated from UI components
3. **Type Safety**: TypeScript used throughout for better type checking
4. **Reusability**: Shared components and utilities are centralized
5. **Scalability**: Architecture supports growth and new features

## Project Structure

```
src/
├── app/              # App entry point and providers
├── features/         # Feature modules (auth, home, profile, etc.)
├── components/       # Shared/reusable components
├── navigation/       # Navigation configuration
├── services/         # API and external services
├── store/            # State management
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── constants/        # App-wide constants
├── types/            # TypeScript type definitions
└── theme/            # Theme configuration
```

## Key Technologies

### Core
- **React Native**: Mobile framework
- **Expo**: Development platform and tooling
- **TypeScript**: Type safety

### Navigation
- **React Navigation**: Navigation library
- **Stack Navigator**: For auth flow
- **Tab Navigator**: For main app

### State Management
- **Zustand**: Lightweight state management
- **AsyncStorage**: Persistent storage
- **SecureStore**: Secure token storage

### UI & Styling
- **Hero UI Native**: Component library
- **Ming Cute Icons**: Icon library
- **Uniwind**: Tailwind CSS for React Native
- **Theme System**: Custom dark/light mode support

### Backend Integration
- **Firebase Auth**: Authentication
- **Axios**: HTTP client
- **API Client**: Centralized API service

## Data Flow

```
User Action
    ↓
Component
    ↓
Hook/Service
    ↓
API/Firebase
    ↓
Store Update
    ↓
Component Re-render
```

## State Management

### Zustand Stores

- **authSlice**: Authentication state (user, token, loading)
- **themeSlice**: Theme preferences (light/dark/system)

### Storage

- **AsyncStorage**: Non-sensitive data (theme preferences)
- **SecureStore**: Sensitive data (auth tokens)

## Theme System

### Implementation

1. **Theme Provider**: Manages theme state
2. **System Detection**: Detects OS theme preference
3. **User Override**: Allows manual theme selection
4. **Persistence**: Saves user preference

### Theme Structure

```typescript
{
  mode: 'light' | 'dark' | 'system',
  colors: { ... },
  spacing: { ... },
  typography: { ... }
}
```

## Authentication Flow

1. User enters credentials
2. Firebase Auth validates
3. Token stored in SecureStore
4. Auth state updated in store
5. Navigation switches to app screens

## API Integration

### Client Setup

- Base URL from environment variables
- Request interceptors for token injection
- Response interceptors for error handling
- Automatic token refresh

### Error Handling

- Centralized error handling
- User-friendly error messages
- Network error detection
- Retry logic for failed requests

## Component Architecture

### UI Components

- Wrapped Hero UI Native components
- Consistent API across app
- Theme-aware styling
- Accessibility support

### Feature Components

- Feature-specific components
- Co-located with feature logic
- Reusable across features

## Navigation Structure

```
RootNavigator
├── AuthNavigator (if not authenticated)
│   ├── LoginScreen
│   ├── SignUpScreen
│   └── ForgotPasswordScreen
└── AppNavigator (if authenticated)
    ├── HomeScreen
    ├── ProfileScreen
    └── SettingsScreen
```

## Security Considerations

1. **Tokens**: Stored in SecureStore
2. **API Keys**: Environment variables only
3. **Input Validation**: Yup schemas
4. **Error Messages**: No sensitive data exposed

## Performance Optimizations

1. **Code Splitting**: Feature-based organization
2. **Image Optimization**: Expo Image
3. **List Optimization**: FlatList for long lists
4. **Memoization**: React.memo where appropriate

## Testing Strategy

- Unit tests for utilities
- Integration tests for features
- E2E tests for critical flows
- Component tests for UI

## Future Considerations

- Offline support
- Push notifications
- Deep linking
- Analytics integration
- Error tracking (Sentry)

## Design Decisions

### Why Zustand?

- Lightweight compared to Redux
- Simple API
- Good TypeScript support
- Minimal boilerplate

### Why Feature-Based?

- Better code organization
- Easier to find related code
- Scales well with team growth
- Clear boundaries

### Why Hero UI Native?

- Modern component library
- Built for React Native
- Theme support
- Accessibility built-in

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Firebase Documentation](https://firebase.google.com/docs)

