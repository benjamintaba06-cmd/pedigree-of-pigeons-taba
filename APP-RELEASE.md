# Pedigree of Pigeons by TABA — Release preparation

## Current delivery status

- The web frontend is a static HTML application backed by Supabase.
- PWA manifest, install metadata, app icon and a conservative network-first app-shell service worker are included.
- Capacitor 8.6.2 configuration is included for Android and iOS packaging.
- Native store binaries have **not** been built or signed. Store submission is not complete.

## Web / PWA

1. Deploy the repository root to the production HTTPS domain.
2. Verify `/manifest.webmanifest`, `/icons/icon.svg` and `/sw.js` return HTTP 200 with correct content types.
3. Test installation on Android Chrome and iOS Safari.
4. Test login, logout, password recovery, photo upload, PDF/print, invite links and deep links after installation.
5. Confirm that authenticated Supabase/API responses are never cached by the service worker.

## Android and iOS native projects

Requirements for Capacitor 8:
- Node.js 22 or later.
- Android: Android Studio 2025.2.1 or later and Android SDK (API 24+; target the current Play requirement at release time).
- iOS: macOS with Xcode 26 or later; iOS 15+ is supported.

Commands:

```sh
npm install
npm run build
npm run cap:add:android   # run once
npm run cap:add:ios       # run once, on a Mac
npm run cap:sync
npm run cap:open:android
npm run cap:open:ios
```

Set the final bundle identifier, signing team, version/build numbers, app icons and splash screens in the native projects before release. Keep generated native project files and the package lockfile in source control.

## Store submission blockers / owner inputs

- Publish a real privacy policy and support URL, and add the in-app links.
- Complete App Store privacy disclosures and Google Play Data safety form based on actual collection, sharing, retention and deletion behavior.
- Provide account deletion in-app and a public account-deletion request URL where required.
- Confirm age rating, target audience, content moderation/reporting/blocking process and community guidelines.
- Provide screenshots, store descriptions, contact/support details and legal publisher identity.
- Test on physical iPhone and Android devices; verify camera/photo permissions, file selection, external links, keyboard/safe areas and auth redirect handling.
- Confirm Supabase Auth redirect URLs and email templates for the production domain and native callback scheme.
- Create release signing credentials securely; never commit signing keys or passwords.

## Release gate

Do not submit until the security and end-to-end test plan is completed and the production privacy/legal pages and deletion workflow are live.

