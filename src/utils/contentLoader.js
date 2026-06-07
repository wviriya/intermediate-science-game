/**
 * Content Loader Utility
 * Handles loading and processing lesson content from JSON files
 */

/**
 * Load a single lesson by subject, level, and lesson name
 * @param {string} subject - Subject name (science, math, english, social-science)
 * @param {string} level - Student level (y7, y8, y9)
 * @param {string} lessonFile - Lesson filename without extension
 * @returns {Promise<object>} Lesson content object
 */
export const loadLesson = async (subject, level, lessonFile) => {
  try {
    const path = `/content/${subject}/${level}/${lessonFile}.json`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load lesson: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading lesson:', error);
    throw error;
  }
};

/**
 * Load all lessons for a subject and level
 * @param {string} subject - Subject name
 * @param {string} level - Student level
 * @returns {Promise<array>} Array of lesson metadata
 */
export const loadLessonIndex = async (subject, level) => {
  try {
    const path = `/content/${subject}/${level}/index.json`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load lesson index: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading lesson index:', error);
    return [];
  }
};

/**
 * Randomize quiz questions
 * @param {array} questions - Array of quiz question objects
 * @param {string} difficulty - Optional filter by difficulty (easy, intermediate, advanced)
 * @returns {array} Randomized questions array
 */
export const randomizeQuestions = (questions, difficulty = null) => {
  let filtered = questions;

  // Filter by difficulty if specified
  if (difficulty) {
    filtered = questions.filter((q) => q.difficulty === difficulty);
  }

  // Shuffle using Fisher-Yates algorithm
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

/**
 * Randomize question options
 * @param {object} question - Single quiz question object
 * @returns {object} Question with shuffled options and updated correct answer index
 */
export const randomizeQuestionOptions = (question) => {
  const correctAnswer = question.opts[question.ans];

  // Create array of options with their original indices
  const optionsWithIndex = question.opts.map((opt, idx) => ({
    text: opt,
    original: idx
  }));

  // Shuffle options
  const shuffled = [...optionsWithIndex];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Find new index of correct answer
  const newAnsIndex = shuffled.findIndex(
    (item) => item.text === correctAnswer
  );

  return {
    ...question,
    opts: shuffled.map((item) => item.text),
    ans: newAnsIndex
  };
};

/**
 * Randomize flashcard order
 * @param {array} flashcards - Array of flashcard objects
 * @returns {array} Randomized flashcards
 */
export const randomizeFlashcards = (flashcards) => {
  const shuffled = [...flashcards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get multiple random lessons from a subject/level
 * @param {array} lessons - Array of all lessons
 * @param {number} count - Number of lessons to select
 * @returns {array} Random subset of lessons
 */
export const selectRandomLessons = (lessons, count) => {
  if (lessons.length <= count) {
    return lessons;
  }

  const selected = [];
  const indices = new Set();

  while (selected.length < count) {
    const randomIdx = Math.floor(Math.random() * lessons.length);
    if (!indices.has(randomIdx)) {
      indices.add(randomIdx);
      selected.push(lessons[randomIdx]);
    }
  }

  return selected;
};

/**
 * Filter lessons by difficulty
 * @param {array} lessons - Array of lesson objects
 * @param {string} difficulty - Difficulty level (easy, intermediate, advanced)
 * @returns {array} Filtered lessons
 */
export const filterByDifficulty = (lessons, difficulty) => {
  return lessons.filter((lesson) => lesson.difficulty === difficulty);
};

/**
 * Sort lessons by week/order
 * @param {array} lessons - Array of lesson objects
 * @returns {array} Sorted lessons
 */
export const sortByWeek = (lessons) => {
  return [...lessons].sort((a, b) => a.week - b.week);
};

/**
 * Available subjects and levels configuration
 */
export const SUBJECTS = [
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'math', name: 'Maths', icon: '📐' },
  { id: 'english', name: 'English', icon: '📖' },
  { id: 'social-science', name: 'Social Science', icon: '🌍' }
];

export const LEVELS = [
  { id: 'y7', name: 'Year 7 (Age 12)', order: 1 },
  { id: 'y8', name: 'Year 8 (Age 13)', order: 2 },
  { id: 'y9', name: 'Year 9 (Age 14)', order: 3 }
];

/**
 * Get subject info by id
 * @param {string} subjectId
 * @returns {object} Subject info object
 */
export const getSubjectInfo = (subjectId) => {
  return SUBJECTS.find((s) => s.id === subjectId);
};

/**
 * Get level info by id
 * @param {string} levelId
 * @returns {object} Level info object
 */
export const getLevelInfo = (levelId) => {
  return LEVELS.find((l) => l.id === levelId);
};
