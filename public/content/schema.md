# Content Structure Schema

## Overview
This document describes how learning content is organized and structured for the Multi-Subject Tutor App.

## Directory Structure
```
public/content/
├── schema.md (this file)
├── science/
│   ├── y7/
│   │   ├── lesson_1.json
│   │   ├── lesson_2.json
│   │   └── ...
│   ├── y8/
│   │   ├── lesson_1.json
│   │   └── ...
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

## Lesson File Structure

Each lesson JSON file has this structure:

```json
{
  "id": "respiration_1",
  "week": 1,
  "title": "Respiration & the Respiratory System",
  "subject": "science",
  "level": "y8",
  "icon": "🫁",
  "color": "bg-red-100",
  "textColor": "text-red-700",
  "difficulty": "intermediate",
  
  "introduction": "Brief lesson introduction text...",
  
  "sections": [
    {
      "title": "Section Title",
      "content": ["Point 1", "Point 2", "Point 3"]
    }
  ],
  
  "diagram": "ASCII diagram or description",
  
  "flashcards": [
    {
      "id": "fc_1",
      "q": "Question?",
      "a": "Answer"
    }
  ],
  
  "quiz": [
    {
      "id": "q_1",
      "q": "Question text?",
      "opts": ["Option A", "Option B", "Option C", "Option D"],
      "ans": 1,
      "difficulty": "easy"
    }
  ],
  
  "cheatsheet": {
    "Key Terms": {
      "Term": "Definition"
    },
    "Equation": "Formula or relationship",
    "Remember": "Memorable phrase",
    "Exam Focus": "What students must know"
  }
}
```

## Fields Description

### Top-level fields
- **id**: Unique identifier for the lesson (string, no spaces)
- **week**: Week/order number in the course (integer)
- **title**: Human-readable lesson title
- **subject**: Subject name (science, math, english, social-science)
- **level**: Student level (y7, y8, y9)
- **icon**: Emoji for visual identification
- **color**: Tailwind color class for background
- **textColor**: Tailwind color class for text
- **difficulty**: easy, intermediate, advanced
- **introduction**: 1-2 paragraph overview of the lesson

### sections
Array of topic sections within the lesson
- **title**: Section heading
- **content**: Array of bullet points/content items

### diagram
Text-based or ASCII diagram explaining visual concepts

### flashcards
Array of card objects for spaced repetition practice
- **id**: Unique card identifier
- **q**: Question/prompt
- **a**: Answer

### quiz
Array of multiple-choice question objects
- **id**: Unique question identifier
- **q**: Question text
- **opts**: Array of 4 answer options
- **ans**: Index of correct answer (0-3)
- **difficulty**: easy, intermediate, advanced

### cheatsheet
Object with summary information
Keys can be any summary category
Values can be strings or objects for nested summaries

## Randomization Support

The app will support:
1. **Question Randomization**: Quiz questions shuffled in random order
2. **Option Randomization**: Multiple choice options reshuffled each attempt
3. **Flashcard Randomization**: Flashcards presented in random order
4. **Filtered Quizzes**: Option to show only certain difficulty levels

## Content Guidelines

1. **Consistency**: Keep terminology consistent across all lessons in a subject
2. **Completeness**: Ensure each lesson has all sections (sections, flashcards, quiz, cheatsheet)
3. **Clarity**: Write for the target age group (Y7 = ~12yo, Y8 = ~13yo, Y9 = ~14yo)
4. **Accuracy**: Verify scientific/mathematical accuracy before publishing
5. **Engagement**: Use emojis and diagrams to make content engaging
6. **Variety**: Mix question types and difficulty levels in quizzes

## Example: Minimal Valid Lesson

```json
{
  "id": "example_lesson",
  "week": 1,
  "title": "Example Lesson",
  "subject": "science",
  "level": "y8",
  "icon": "📚",
  "color": "bg-blue-100",
  "textColor": "text-blue-700",
  "difficulty": "intermediate",
  "introduction": "This is what students will learn today.",
  "sections": [
    {
      "title": "What is the topic?",
      "content": ["Key point 1", "Key point 2"]
    }
  ],
  "diagram": "Text or ASCII diagram",
  "flashcards": [
    {
      "id": "fc_1",
      "q": "Q1?",
      "a": "A1"
    }
  ],
  "quiz": [
    {
      "id": "q_1",
      "q": "Which is correct?",
      "opts": ["A", "B", "C", "D"],
      "ans": 1,
      "difficulty": "easy"
    }
  ],
  "cheatsheet": {
    "Key Points": "Summary of lesson"
  }
}
```
