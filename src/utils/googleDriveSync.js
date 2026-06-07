/**
 * Google Drive Sync Utility
 * Manages syncing learning content between app and Google Drive
 *
 * Authentication Strategy:
 * - Public API Key: Read-only access (students fetching lessons)
 * - Service Account: Full access (admins managing content) - Server-side only
 */

// Google Drive API Configuration
const GOOGLE_DRIVE_API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
const GOOGLE_DRIVE_WRITE_API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_WRITE_API_KEY;
const GOOGLE_DRIVE_FOLDER_ID = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID || '1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8';
const GOOGLE_DOCS_ID = process.env.REACT_APP_GOOGLE_DOCS_ID || '1jUorTwmnCBl1uTXzWQ2zuLTvtwrX9CBo_0F0K9Q8TAw';

// Service Account (Server-side only, never expose to frontend)
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

// API Configuration
const DRIVE_API_VERSION = 'v3';
const DOCS_API_VERSION = 'v1';

/**
 * Initialize Google Drive API
 * Must be called before using other functions
 * Uses public API key for read-only access
 */
export const initializeGoogleDrive = async () => {
  if (!GOOGLE_DRIVE_API_KEY) {
    console.error('Google Drive API key not configured. Set REACT_APP_GOOGLE_DRIVE_API_KEY in .env');
    return false;
  }

  if (!window.gapi) {
    console.error('Google API not loaded. Make sure to include Google API script in index.html');
    return false;
  }

  try {
    // Load Google API with public key (read-only)
    window.gapi.client.setApiKey(GOOGLE_DRIVE_API_KEY);
    return true;
  } catch (err) {
    console.error('Failed to initialize Google Drive:', err);
    return false;
  }
};

/**
 * Fetch lesson content from Google Drive
 * @param {string} subject - Subject name
 * @param {string} level - Student level
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<object>} Lesson content
 */
export const fetchLessonFromGoogleDrive = async (subject, level, lessonId) => {
  try {
    // For now, fetch from local content directory
    // In future, this will fetch from Google Drive
    const response = await fetch(`/content/${subject}/${level}/${lessonId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch lesson: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching lesson from Google Drive:', error);
    throw error;
  }
};

/**
 * Fetch all available lessons from Google Drive
 * @returns {Promise<array>} Array of available lessons
 */
export const fetchAllLessonsFromGoogleDrive = async () => {
  try {
    // Fetch from local directory for now
    // This would be replaced with Google Drive API calls
    const subjects = ['science', 'math', 'english', 'social-science'];
    const levels = ['y7', 'y8', 'y9'];
    const lessons = [];

    for (const subject of subjects) {
      for (const level of levels) {
        try {
          const response = await fetch(`/content/${subject}/${level}/index.json`);
          if (response.ok) {
            const data = await response.json();
            lessons.push(...data.map(l => ({ ...l, subject, level })));
          }
        } catch (err) {
          // Fallback: try loading individual lessons
          console.warn(`Could not load index for ${subject}/${level}`);
        }
      }
    }

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons from Google Drive:', error);
    return [];
  }
};

/**
 * Save lesson content to Google Drive
 * @param {string} subject - Subject name
 * @param {string} level - Student level
 * @param {object} lesson - Lesson content object
 * @returns {Promise<boolean>} Success status
 */
export const saveLessonToGoogleDrive = async (subject, level, lesson) => {
  try {
    // This would use Google Drive API to save
    // For now, just validate the lesson structure
    validateLessonStructure(lesson);

    console.log(`Lesson ${lesson.id} validated and ready to save to Google Drive`);

    // TODO: Implement actual Google Drive save
    // Use Google Docs API or Google Drive API

    return true;
  } catch (error) {
    console.error('Error saving lesson to Google Drive:', error);
    return false;
  }
};

/**
 * Validate lesson structure against schema
 * @param {object} lesson - Lesson to validate
 * @throws {Error} If lesson is invalid
 */
export const validateLessonStructure = (lesson) => {
  const requiredFields = [
    'id', 'week', 'title', 'subject', 'level',
    'icon', 'color', 'textColor', 'difficulty',
    'introduction', 'sections', 'diagram',
    'flashcards', 'quiz', 'cheatsheet'
  ];

  for (const field of requiredFields) {
    if (!(field in lesson)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate sections
  if (!Array.isArray(lesson.sections) || lesson.sections.length === 0) {
    throw new Error('Lesson must have at least one section');
  }

  for (const section of lesson.sections) {
    if (!section.title || !Array.isArray(section.content)) {
      throw new Error('Each section must have a title and content array');
    }
  }

  // Validate flashcards
  if (!Array.isArray(lesson.flashcards) || lesson.flashcards.length < 5) {
    throw new Error('Lesson must have at least 5 flashcards');
  }

  for (const card of lesson.flashcards) {
    if (!card.id || !card.q || !card.a) {
      throw new Error('Each flashcard must have id, q, and a fields');
    }
  }

  // Validate quiz
  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 8) {
    throw new Error('Lesson must have at least 8 quiz questions');
  }

  for (const question of lesson.quiz) {
    if (!question.id || !question.q || !Array.isArray(question.opts) || question.opts.length !== 4) {
      throw new Error('Each quiz question must have id, q, and 4 opts');
    }
    if (typeof question.ans !== 'number' || question.ans < 0 || question.ans > 3) {
      throw new Error('Quiz answer index must be 0-3');
    }
  }

  return true;
};

/**
 * Export lesson as JSON for backup/sharing
 * @param {object} lesson - Lesson to export
 * @returns {string} JSON string
 */
export const exportLessonAsJSON = (lesson) => {
  return JSON.stringify(lesson, null, 2);
};

/**
 * Import lesson from JSON
 * @param {string} jsonString - JSON lesson data
 * @returns {object} Parsed lesson object
 */
export const importLessonFromJSON = (jsonString) => {
  try {
    const lesson = JSON.parse(jsonString);
    validateLessonStructure(lesson);
    return lesson;
  } catch (error) {
    console.error('Error importing lesson from JSON:', error);
    throw error;
  }
};

/**
 * Get schema from Google Drive
 * @returns {Promise<object>} Schema object
 */
export const getSchemaFromGoogleDrive = async () => {
  try {
    // Fetch the schema markdown from Google Drive
    // This is stored in the Google Doc
    const response = await fetch(`/content/schema.md`);
    if (!response.ok) {
      throw new Error('Failed to fetch schema');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching schema from Google Drive:', error);
    throw error;
  }
};

/**
 * Sync local lessons with Google Drive
 * @returns {Promise<object>} Sync result summary
 */
export const syncLessonsWithGoogleDrive = async () => {
  try {
    const result = {
      synced: 0,
      failed: 0,
      errors: [],
      timestamp: new Date().toISOString()
    };

    // Fetch all local lessons
    const allLessons = await fetchAllLessonsFromGoogleDrive();

    for (const lesson of allLessons) {
      try {
        await saveLessonToGoogleDrive(lesson.subject, lesson.level, lesson);
        result.synced++;
      } catch (error) {
        result.failed++;
        result.errors.push({
          lessonId: lesson.id,
          error: error.message
        });
      }
    }

    console.log('Sync complete:', result);
    return result;
  } catch (error) {
    console.error('Error syncing with Google Drive:', error);
    throw error;
  }
};

/**
 * Get lesson statistics from Google Drive
 * @returns {Promise<object>} Statistics object
 */
export const getLessonStatistics = async () => {
  try {
    const allLessons = await fetchAllLessonsFromGoogleDrive();

    const stats = {
      totalLessons: allLessons.length,
      bySubject: {},
      byLevel: {},
      byDifficulty: {},
      totalFlashcards: 0,
      totalQuestions: 0,
      lastUpdated: new Date().toISOString()
    };

    for (const lesson of allLessons) {
      // Count by subject
      stats.bySubject[lesson.subject] = (stats.bySubject[lesson.subject] || 0) + 1;

      // Count by level
      stats.byLevel[lesson.level] = (stats.byLevel[lesson.level] || 0) + 1;

      // Count by difficulty
      stats.byDifficulty[lesson.difficulty] = (stats.byDifficulty[lesson.difficulty] || 0) + 1;

      // Total flashcards and questions
      stats.totalFlashcards += lesson.flashcards?.length || 0;
      stats.totalQuestions += lesson.quiz?.length || 0;
    }

    return stats;
  } catch (error) {
    console.error('Error getting lesson statistics:', error);
    throw error;
  }
};

export default {
  initializeGoogleDrive,
  fetchLessonFromGoogleDrive,
  fetchAllLessonsFromGoogleDrive,
  saveLessonToGoogleDrive,
  validateLessonStructure,
  exportLessonAsJSON,
  importLessonFromJSON,
  getSchemaFromGoogleDrive,
  syncLessonsWithGoogleDrive,
  getLessonStatistics
};
