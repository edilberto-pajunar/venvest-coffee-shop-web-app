# Quick Start - Fix Firebase Error

## ❌ Current Issue
```
FirebaseError: [code=permission-denied]: Missing or insufficient permissions.
```

## ✅ Quick Fix (3 steps)

### Step 1: Create `.env.local` file

Create a new file in the project root named `.env.local`:

```bash
touch .env.local
```

Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc123
```

### Step 2: Update Firestore Rules

Go to [Firebase Console](https://console.firebase.google.com/) > Firestore Database > Rules

**For testing (allows all access):**
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

Click **Publish** to save changes.

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C in terminal)
npm run dev
```

## ✅ Verification

Check your browser console. You should see:
- ✅ `✅ Printers loaded: 0` (if no printers yet)
- ✅ `📭 No printers found in Firestore` (if collection is empty)

Instead of:
- ❌ `FirebaseError: [code=permission-denied]`

## 🎉 What's Been Improved

1. ✅ **Better error handling** - Clear error messages in console
2. ✅ **Firebase validation** - Warns if env vars missing
3. ✅ **Error UI** - Dashboard shows Firebase errors visually
4. ✅ **Loading states** - Shows when data is loading
5. ✅ **Helpful logs** - Console shows what's happening

## 📝 Next Steps

Once Firebase is configured:

1. Add test printer data in Firestore:
   - Collection: `printer`
   - Document ID: `AKL`
   - Fields:
     ```json
     {
       "id": "AKL",
       "label": "Auckland Printer"
     }
     ```

2. Refresh dashboard - should see printer appear!

## 📚 Full Documentation

See `FIREBASE_SETUP.md` for complete setup guide including:
- Production security rules
- Collection structure
- Testing procedures

## 🆘 Still Having Issues?

Check browser console (F12) for detailed error messages with emoji indicators:
- 🔒 = Security rules issue
- ❌ = Configuration error
- ✅ = Success
- 📭 = No data found
