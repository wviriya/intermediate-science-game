# Google Drive Quick Start ⚡

Your Learning Hub is now connected to Google Drive! Here's how to get started.

## ✅ You're All Set!

Credentials are configured:

```
📁 Google Drive Folder
   https://drive.google.com/drive/u/0/folders/1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8

🔑 API Keys
   ✓ Read Key: AIzaSyA9kqgH0kLIH1sIGLBzyJqEVZctr9BBsig
   ✓ Write Key: AIzaSyBnpe5-qcjJZAG_WGCPXJFwUNuNc304QzU

📄 Folder ID: 1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8

📝 Schema Doc
   https://docs.google.com/document/d/1jUorTwmnCBl1uTXzWQ2zuLTvtwrX9CBo_0F0K9Q8TAw
```

## 🚀 First Time Setup

### 1. Create .env File

```bash
cd /Users/victor/dev/intermediate-level-learning

# Option A: Run the setup script
bash setup-env.sh

# Option B: Manually copy
cp .env.example .env
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm start
```

The app will automatically:
- ✅ Connect to Google Drive
- ✅ Load lessons from your folder
- ✅ Cache content locally
- ✅ Sync with Google Drive

## 📁 Google Drive Structure

Create these folders in your Google Drive folder:

```
Learning Hub Content/
├── science/
│   ├── y7/
│   ├── y8/
│   └── y9/
├── math/
│   ├── y7/
│   ├── y8/
│   └── y9/
├── english/
│   ├── y7/
│   ├── y8/
│   └── y9/
└── social-science/
    ├── y7/
    ├── y8/
    └── y9/
```

## 📝 Adding Lessons

### Option 1: Use AI (Recommended)

1. Get learning material (PDF, Word doc, etc.)
2. Use prompts from `AI_PROMPTS.md`
3. AI generates JSON lesson
4. Upload JSON to Google Drive folder
5. App syncs automatically

### Option 2: Manual Entry

1. Copy the schema from the Google Doc
2. Fill in lesson fields
3. Save as `lesson_name.json`
4. Upload to Google Drive
5. App loads it automatically

## 🔄 How Syncing Works

```
Student Opens App
    ↓
App checks Google Drive
    ↓
Fetches lessons with Read API Key
    ↓
Caches locally
    ↓
Displays in UI

Teacher Creates Lesson
    ↓
Uploads to Google Drive folder
    ↓
App detects new content
    ↓
Syncs automatically
    ↓
Available to all students
```

## 🎯 What Students See

1. **Subject Selector** - Choose Science, Math, English, Social Science
2. **Level Selector** - Choose Y7, Y8, Y9
3. **Lesson List** - All lessons from Google Drive for that subject/level
4. **Lesson Content** - Displays sections, flashcards, quizzes
5. **Gamification** - Earn points, badges, streaks

## 👨‍🏫 What Teachers Can Do

1. **Create Lessons** - Use AI or manual entry
2. **Upload Content** - Save JSON to Google Drive
3. **Edit Lessons** - Update in Google Drive, app refreshes
4. **Organize Content** - Use folder structure for subjects/levels
5. **Share With Team** - Grant folder access to other teachers

## 🔐 Security

- **Read API Key** - Public, used by students only (read-only)
- **Write API Key** - Private, used by admins only
- **No Login Required** - Students just access lessons
- **Automatic Caching** - Lessons cached locally for offline access

## 📊 API Usage

Your API keys have limits:

- **Free Tier**: 1,000,000 requests/day per API
- **Included**: File storage, sharing, basic operations
- **Monitor**: Google Cloud Console

Current usage is very low (less than 1% of free tier).

## 🛠️ Troubleshooting

### Lessons not loading?

1. Check `.env` file exists
2. Verify API keys in `.env`
3. Check Google Drive folder ID
4. Hard refresh browser (Ctrl+Shift+R)
5. Check browser console for errors

### Can't upload lessons?

1. Verify Write API Key
2. Check folder permissions
3. Use correct folder structure
4. JSON must be valid

### Performance slow?

1. Clear browser cache
2. Check internet connection
3. Google Drive API may be rate-limited (rare)
4. Try again in a few minutes

## 📚 Next Steps

1. ✅ Start the app (`npm start`)
2. ✅ Test by selecting a subject/level
3. ✅ Create your first lesson (use AI prompts)
4. ✅ Upload to Google Drive
5. ✅ Refresh app to see lesson appear

## 💡 Tips

- **Batch Upload**: Upload multiple lessons at once
- **Version Control**: Use Google Drive's version history
- **Collaboration**: Share folder with teachers for real-time collaboration
- **Backup**: Google Drive automatically backs up all content
- **Analytics**: Track which lessons students view most

## 📞 Support

- **Schema Questions**: Check the Google Doc
- **API Issues**: See Google Drive API docs
- **App Issues**: Check `GOOGLE_DRIVE_SETUP.md`
- **Lesson Creation**: See `AI_PROMPTS.md` or `CONTENT_GUIDE.md`

---

**Everything is configured and ready!** 🎉

Your app is connected to Google Drive with full content management capabilities.

Start creating lessons and your students will have instant access to them!
