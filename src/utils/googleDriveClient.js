/**
 * Google Drive Client
 * Handles fetching lessons from Google Drive folder structure
 */

const FOLDER_ID = '1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8';
const API_KEY = 'AIzaSyA9kqgH0kLIH1sIGLBzyJqEVZctr9BBsig';

/**
 * Load Google API client
 */
export const loadGoogleAPI = async () => {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      window.gapi.load('client', async () => {
        try {
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
            ]
          });
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    } else {
      reject(new Error('Google API not loaded'));
    }
  });
};

/**
 * Get folder ID by name
 */
export const getFolderId = async (folderName, parentFolderId = FOLDER_ID) => {
  try {
    const response = await window.gapi.client.drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and parents='${parentFolderId}' and trashed=false`,
      spaces: 'drive',
      pageSize: 1,
      fields: 'files(id, name)'
    });

    if (response.result.files && response.result.files.length > 0) {
      return response.result.files[0].id;
    }
    return null;
  } catch (err) {
    console.error(`Error finding folder ${folderName}:`, err);
    return null;
  }
};

/**
 * List files in a folder
 */
export const listFilesInFolder = async (folderId) => {
  try {
    const response = await window.gapi.client.drive.files.list({
      q: `parents='${folderId}' and trashed=false`,
      spaces: 'drive',
      pageSize: 100,
      fields: 'files(id, name, mimeType, webContentLink, webViewLink)'
    });

    return response.result.files || [];
  } catch (err) {
    console.error('Error listing files:', err);
    return [];
  }
};

/**
 * Get file content (JSON)
 */
export const getFileContent = async (fileId) => {
  try {
    // Direct fetch using Google Drive export URL (simplest & most reliable)
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    console.log(`Fetching file ${fileId} from: ${exportUrl.substring(0, 80)}...`);

    const response = await fetch(exportUrl);

    if (!response.ok) {
      console.error(`HTTP ${response.status} when fetching file ${fileId}`);
      return null;
    }

    const text = await response.text();
    console.log(`Got response: ${text.substring(0, 100)}...`);

    const parsed = JSON.parse(text);
    console.log(`Successfully parsed JSON for file ${fileId}`);
    return parsed;

  } catch (err) {
    console.error(`Error getting file content for ${fileId}:`, err.message);
    return null;
  }
};

/**
 * Get lesson by subject and level
 */
export const getLessonsBySubjectAndLevel = async (subject, level) => {
  try {
    // Navigate folder structure: subject -> level
    const subjectFolderId = await getFolderId(subject, FOLDER_ID);
    if (!subjectFolderId) {
      console.warn(`Subject folder not found: ${subject}`);
      return [];
    }

    const levelFolderId = await getFolderId(level, subjectFolderId);
    if (!levelFolderId) {
      console.warn(`Level folder not found: ${level}`);
      return [];
    }

    // List all JSON files in level folder
    const files = await listFilesInFolder(levelFolderId);
    console.log(`Found ${files.length} files in ${subject}/${level}:`, files.map(f => f.name));

    const jsonFiles = files.filter(f => f.name.endsWith('.json'));
    console.log(`Found ${jsonFiles.length} JSON files`);

    // Fetch content for each file
    const lessons = [];
    for (const file of jsonFiles) {
      try {
        console.log(`Loading content for ${file.name}...`);
        const content = await getFileContent(file.id);
        if (content) {
          console.log(`Successfully loaded ${file.name}:`, content);
          lessons.push({
            ...content,
            googleDriveId: file.id,
            googleDriveLink: file.webViewLink
          });
        } else {
          console.warn(`No content returned for ${file.name}`);
        }
      } catch (err) {
        console.error(`Error loading lesson ${file.name}:`, err);
      }
    }

    console.log(`Total lessons loaded: ${lessons.length}`);
    // Sort by week
    return lessons.sort((a, b) => a.week - b.week);
  } catch (err) {
    console.error('Error getting lessons:', err);
    return [];
  }
};

/**
 * Get all available subjects
 */
export const getAvailableSubjects = async () => {
  try {
    const folders = await listFilesInFolder(FOLDER_ID);
    return folders
      .filter(f => f.mimeType === 'application/vnd.google-apps.folder')
      .map(f => f.name)
      .sort();
  } catch (err) {
    console.error('Error getting subjects:', err);
    return [];
  }
};

/**
 * Get levels available for a subject
 */
export const getAvailableLevels = async (subject) => {
  try {
    const subjectFolderId = await getFolderId(subject, FOLDER_ID);
    if (!subjectFolderId) return [];

    const folders = await listFilesInFolder(subjectFolderId);
    return folders
      .filter(f => f.mimeType === 'application/vnd.google-apps.folder')
      .map(f => f.name)
      .sort();
  } catch (err) {
    console.error('Error getting levels:', err);
    return [];
  }
};

/**
 * Search lessons by keyword
 */
export const searchLessons = async (keyword) => {
  try {
    const response = await window.gapi.client.drive.files.list({
      q: `name contains '${keyword}' and mimeType!='application/vnd.google-apps.folder' and parents in '${FOLDER_ID}' and trashed=false`,
      spaces: 'drive',
      pageSize: 50,
      fields: 'files(id, name, parents)'
    });

    const lessons = [];
    for (const file of response.result.files || []) {
      try {
        const content = await getFileContent(file.id);
        if (content) {
          lessons.push(content);
        }
      } catch (err) {
        console.error(`Error loading ${file.name}:`, err);
      }
    }

    return lessons;
  } catch (err) {
    console.error('Error searching lessons:', err);
    return [];
  }
};

/**
 * Get lesson statistics
 */
export const getLessonStats = async () => {
  try {
    const subjects = await getAvailableSubjects();
    const stats = {
      totalSubjects: subjects.length,
      subjects: {}
    };

    for (const subject of subjects) {
      const levels = await getAvailableLevels(subject);
      let totalLessons = 0;

      for (const level of levels) {
        const lessons = await getLessonsBySubjectAndLevel(subject, level);
        totalLessons += lessons.length;
      }

      stats.subjects[subject] = {
        levels: levels.length,
        lessons: totalLessons
      };
    }

    return stats;
  } catch (err) {
    console.error('Error getting stats:', err);
    return {};
  }
};

const googleDriveClientExports = {
  loadGoogleAPI,
  getFolderId,
  listFilesInFolder,
  getFileContent,
  getLessonsBySubjectAndLevel,
  getAvailableSubjects,
  getAvailableLevels,
  searchLessons,
  getLessonStats
};

export default googleDriveClientExports;
