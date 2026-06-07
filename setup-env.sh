#!/bin/bash
# Setup Google Drive credentials for Learning Hub

echo "Setting up Google Drive credentials..."

# Create .env file
cat > .env << EOF
# Google Drive Configuration
# Learning Hub Content Management

# Public API Key (Read-only access for students fetching lessons)
REACT_APP_GOOGLE_DRIVE_API_KEY=AIzaSyA9kqgH0kLIH1sIGLBzyJqEVZctr9BBsig

# Write API Key (Admin/teacher access for managing content)
REACT_APP_GOOGLE_DRIVE_WRITE_API_KEY=AIzaSyBnpe5-qcjJZAG_WGCPXJFwUNuNc304QzU

# Google Drive Folder ID (where all lesson content is stored)
REACT_APP_GOOGLE_DRIVE_FOLDER_ID=1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8

# Google Docs ID (schema document)
REACT_APP_GOOGLE_DOCS_ID=1jUorTwmnCBl1uTXzWQ2zuLTvtwrX9CBo_0F0K9Q8TAw
EOF

echo "✅ .env file created with Google Drive credentials"
echo ""
echo "📁 Your Google Drive folder:"
echo "   https://drive.google.com/drive/u/0/folders/1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8"
echo ""
echo "🔐 Credentials configured:"
echo "   ✓ Read API Key (students)"
echo "   ✓ Write API Key (admins)"
echo "   ✓ Folder ID"
echo "   ✓ Schema Doc ID"
echo ""
echo "⚠️  IMPORTANT:"
echo "   - Never commit .env to GitHub"
echo "   - Keep these keys private"
echo "   - Rotate keys if exposed"
echo ""
echo "🚀 Next steps:"
echo "   1. npm install"
echo "   2. npm start"
echo "   3. Lessons will sync from Google Drive"
