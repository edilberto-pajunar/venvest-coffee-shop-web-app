# Firebase Setup Guide

## Current Error
```
FirebaseError: [code=permission-denied]: Missing or insufficient permissions.
```

## Root Cause
1. Missing `.env.local` file with Firebase configuration
2. Firestore Security Rules blocking unauthenticated access

## Fix Steps

### Step 1: Create `.env.local` file

Create a file named `.env.local` in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Step 2: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click ⚙️ Settings > Project Settings
4. Scroll to "Your apps" section
5. Click "Web app" or create one if it doesn't exist
6. Copy the config values to your `.env.local`

### Step 3: Update Firestore Security Rules

Your Firestore rules are currently blocking access. Update them in Firebase Console:

**For Development (allow all - NOT FOR PRODUCTION):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For Production (recommended):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Printers collection - read only for web dashboard
    match /printer/{printerId} {
      allow read: if true;
      allow write: if false; // Only server should write
    }
    
    // Print queue - read only
    match /print_queue/{jobId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Logs - read only
    match /logs/{logId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Line decorations - read/write for admin
    match /line_decoration/{decorationId} {
      allow read: if true;
      allow write: if request.auth != null; // Requires auth
    }
  }
}
```

### Step 4: Restart Development Server

After creating `.env.local`:

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Verification

Once configured, check browser console:
- ✅ Should see: "Printers fetched... X"
- ❌ If error persists: Check Firebase Console > Firestore > Rules

## Collection Structure

Expected Firestore collections:

```
/printer
  - {printerId}
    - id: string
    - label: string
    - location: string (optional)
    - last_seen: timestamp (optional)
    - is_online: boolean (optional)

/print_queue
  - {jobId}
    - printer_id: string
    - line_1 to line_15: string
    - service_time: timestamp
    - status: "pending" | "processing" | "completed" | "failed"
    - created_at: timestamp

/logs
  - {logId}
    - printer_id: string
    - timestamp: timestamp
    - level: "info" | "warning" | "error"
    - message: string
```

## Testing

Add a test printer document in Firestore:

```javascript
// Collection: printer
// Document ID: AKL
{
  id: "AKL",
  label: "Auckland Printer",
  location: "Auckland City",
  is_online: true,
  last_seen: Timestamp.now()
}
```
