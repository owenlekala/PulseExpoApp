# Deployment Guide

This guide covers deploying the PulseExpoApp to production.

## Prerequisites

- Expo account
- Firebase project configured
- Environment variables set up
- API endpoints configured

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase project set up and configured
- [ ] API endpoints tested
- [ ] App icons and splash screens updated
- [ ] App version and build number incremented
- [ ] All tests passing
- [ ] Code reviewed and merged

## Building for Production

### iOS

1. **Update app.json:**
   ```json
   {
     "expo": {
       "ios": {
         "bundleIdentifier": "com.yourcompany.pulseexpoapp",
         "buildNumber": "1.0.0"
       }
     }
   }
   ```

2. **Build with EAS:**
   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform ios
   ```

3. **Submit to App Store:**
   ```bash
   eas submit --platform ios
   ```

### Android

1. **Update app.json:**
   ```json
   {
     "expo": {
       "android": {
         "package": "com.yourcompany.pulseexpoapp",
         "versionCode": 1
       }
     }
   }
   ```

2. **Build with EAS:**
   ```bash
   eas build --platform android
   ```

3. **Submit to Google Play:**
   ```bash
   eas submit --platform android
   ```

## Environment Variables

Set environment variables in EAS:

```bash
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.production.com
eas secret:create --scope project --name EXPO_PUBLIC_FIREBASE_API_KEY --value your_key
# ... etc
```

Or use `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.production.com"
      }
    }
  }
}
```

## Firebase Configuration

### iOS

1. Download `GoogleService-Info.plist` from Firebase Console
2. Place in `ios/` directory
3. Ensure it's included in the build

### Android

1. Download `google-services.json` from Firebase Console
2. Place in `android/app/` directory
3. Ensure it's included in the build

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm install -g eas-cli
      - run: eas build --platform all --non-interactive
```

## Monitoring

- Set up error tracking (Sentry, Bugsnag)
- Configure analytics (Firebase Analytics, Mixpanel)
- Monitor API performance
- Set up crash reporting

## Rollback

If issues occur:

1. **EAS Build:**
   ```bash
   eas build:list
   eas build:download [build-id]
   ```

2. **Revert to previous version:**
   - Update version in `app.json`
   - Create new build
   - Submit to stores

## Post-Deployment

- [ ] Verify app functionality
- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Test on physical devices
- [ ] Notify users of update (if applicable)

## Troubleshooting

### Build Failures

- Check EAS build logs
- Verify environment variables
- Ensure all dependencies are compatible
- Check Firebase configuration

### Runtime Errors

- Check error tracking service
- Review Firebase logs
- Verify API endpoints
- Check environment variables

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Firebase Console](https://console.firebase.google.com/)

