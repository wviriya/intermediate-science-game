# Content Management Guide

## Overview

This guide explains how to add new lessons, subjects, and content to the Multi-Subject Tutor App.

## Project Structure

```
public/content/
├── science/
│   ├── y7/
│   ├── y8/
│   │   └── lesson_1_respiration.json
│   └── y9/
├── math/
│   ├── y7/
│   ├── y8/
│   │   └── lesson_1_algebra_basics.json
│   └── y9/
├── english/
│   ├── y7/
│   ├── y8/
│   └── y9/
└── social-science/
    ├── y7/
    ├── y8/
    └── y9/

src/
├── App.jsx                    # Main app entry
├── SubjectSelector.jsx        # Subject/level/lesson picker
├── TutorApp.jsx              # Generic tutor component
├── utils/
│   └── contentLoader.js      # Content loading & randomization
└── index.js
```

## Adding a New Lesson

### Step 1: Create the JSON File

Create a new JSON file in the appropriate subject/level directory:
- Subject: `science`, `math`, `english`, or `social-science`
- Level: `y7`, `y8`, or `y9`
- Filename: Use descriptive names like `lesson_1_respiration.json`

### Step 2: Use the Lesson Template

Copy this template and fill in your content:

```json
{
  "id": "unique_id_no_spaces",
  "week": 1,
  "title": "Lesson Title Here",
  "subject": "science",
  "level": "y8",
  "icon": "🔬",
  "color": "bg-red-100",
  "textColor": "text-red-700",
  "difficulty": "intermediate",
  "introduction": "2-3 sentence overview of what students will learn...",
  
  "sections": [
    {
      "title": "Section Title",
      "content": [
        "Bullet point 1",
        "Bullet point 2",
        "Bullet point 3"
      ]
    },
    {
      "title": "Another Section",
      "content": [
        "More content here"
      ]
    }
  ],
  
  "diagram": "Optional: ASCII art or text diagram explaining concepts",
  
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
    "Key Term": "Definition",
    "Another Term": "Its definition",
    "Formula": "E = mc²",
    "Remember": "Memorable phrase for exam prep"
  }
}
```

## Field Details

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier (no spaces) | `respiration_system` |
| `week` | Week number / lesson order | `1` |
| `title` | Human-readable lesson title | `Respiration & the Respiratory System` |
| `subject` | Subject name | `science`, `math`, `english`, `social-science` |
| `level` | Student level | `y7`, `y8`, `y9` |
| `icon` | Emoji for visual identification | `🫁` |
| `color` | Tailwind CSS background color | `bg-red-100`, `bg-blue-100` |
| `textColor` | Tailwind CSS text color | `text-red-700`, `text-blue-700` |
| `difficulty` | Lesson difficulty | `easy`, `intermediate`, `advanced` |

### Content Sections

- **introduction**: 1-2 sentences explaining the lesson topic
- **sections**: Array of topic sections with bullet points
- **diagram**: Text-based diagram (ASCII art or description)
- **flashcards**: Q&A pairs for spaced repetition
- **quiz**: Multiple-choice questions with 4 options
- **cheatsheet**: Quick reference guide with key terms and definitions

## Color Scheme Reference

Use Tailwind CSS colors for consistency:

### Science Colors
- Biology: Red → `bg-red-100` / `text-red-700`
- Physics: Blue → `bg-blue-100` / `text-blue-700`
- Chemistry: Purple → `bg-purple-100` / `text-purple-700`
- Ecology: Green → `bg-green-100` / `text-green-700`

### Math Colors
- Algebra: Blue → `bg-blue-100` / `text-blue-700`
- Geometry: Purple → `bg-purple-100` / `text-purple-700`
- Statistics: Teal → `bg-teal-100` / `text-teal-700`
- Calculus: Indigo → `bg-indigo-100` / `text-indigo-700`

### Other Subjects
- English: Orange → `bg-orange-100` / `text-orange-700`
- Social Science: Emerald → `bg-emerald-100` / `text-emerald-700`
- History: Yellow → `bg-yellow-100` / `text-yellow-700`

## Quiz Difficulty Guidelines

- **Easy** (30%): Basic definitions, straightforward recall
- **Intermediate** (50%): Application, understanding concepts
- **Advanced** (20%): Analysis, complex reasoning, synthesis

## Content Quality Checklist

Before publishing a lesson, ensure:

- [ ] **Accuracy**: All facts are correct and up-to-date
- [ ] **Completeness**: Lesson has all sections (content, flashcards, quiz, cheatsheet)
- [ ] **Clarity**: Language matches target age group (Y7=12yo, Y8=13yo, Y9=14yo)
- [ ] **Consistency**: Terminology matches other lessons in the subject
- [ ] **Engagement**: Includes emojis, diagrams, and varied content types
- [ ] **Balance**: Quiz has mix of easy, intermediate, advanced questions
- [ ] **Formatting**: JSON is valid (no syntax errors)

## Adding Flashcards

Good flashcards:
- Have clear, concise questions
- Provide complete, understandable answers
- Include both definitions AND applications
- Mix recall (definition) with understanding (application)

Example:
```json
{
  "id": "fc_1",
  "q": "What is mitosis?",
  "a": "Cell division process that creates two identical daughter cells"
},
{
  "id": "fc_2",
  "q": "Why is mitosis important for organisms?",
  "a": "Allows growth, repair of damaged cells, and asexual reproduction"
}
```

## Creating Good Quiz Questions

- **Easy**: "What is X?" or "Where does Y happen?"
- **Intermediate**: "Explain why Z occurs" or "Calculate X using formula Y"
- **Advanced**: "Predict what would happen if..." or "Compare and contrast X and Y"

Correct answer position should vary:
- Mix answer positions (don't always put correct answer in position 1)
- This prevents students from guessing patterns

Example progression:
```json
[
  {
    "q": "What is respiration?",
    "opts": ["A", "B", "C", "D"],
    "ans": 1,
    "difficulty": "easy"
  },
  {
    "q": "Where in the cell does respiration occur?",
    "opts": ["A", "B", "C", "D"],
    "ans": 3,
    "difficulty": "intermediate"
  },
  {
    "q": "Why is aerobic respiration more efficient than anaerobic?",
    "opts": ["A", "B", "C", "D"],
    "ans": 2,
    "difficulty": "advanced"
  }
]
```

## Creating Diagrams

Use ASCII art for technical diagrams:

```
Good ASCII Diagram:
     CELL STRUCTURE
    ┌─────────────────┐
    │   Nucleus       │
    │       🔵        │
    │   Contains DNA  │
    └─────────────────┘
          ↓ Contains
    Chromosomes (DNA)

Poor: "The nucleus contains chromosomes made of DNA"
```

## File Naming Convention

Use snake_case with descriptive names:
- ✓ `lesson_1_cell_structure.json`
- ✓ `lesson_2_mitosis_and_meiosis.json`
- ✓ `lesson_3_photosynthesis.json`
- ✗ `Lesson1.json`
- ✗ `lesson1_CellStructure.json`

## Testing Your Content

1. **Check JSON validity**: Use jsonlint.com or your IDE
2. **Test in app**: Load the lesson and verify:
   - All sections display correctly
   - Flashcards flip properly
   - Quiz shows all questions
   - Cheatsheet formatting looks good
3. **Verify randomization**: Run quiz/flashcards multiple times to confirm shuffling works

## Creating an Index File

For each subject/level, optionally create an `index.json`:

```json
[
  {
    "id": "lesson_1_respiration",
    "title": "Respiration & the Respiratory System",
    "week": 1
  },
  {
    "id": "lesson_2_lungs",
    "title": "How the Lungs Work",
    "week": 2
  }
]
```

This helps the app discover available lessons (otherwise it uses defaults).

## Publishing Checklist

- [ ] JSON file created in correct subject/level folder
- [ ] All required fields present and filled
- [ ] JSON syntax is valid (test with validator)
- [ ] Content is accurate and age-appropriate
- [ ] Flashcards and quiz questions are comprehensive
- [ ] Difficulty levels are balanced
- [ ] Color scheme chosen and applied
- [ ] Diagrams are clear and helpful
- [ ] Cheatsheet summarizes key points
- [ ] Tested in the app interface
- [ ] Randomization verified

## Examples

See these files for complete examples:
- Science Y8: `public/content/science/y8/lesson_1_respiration.json`
- Math Y8: `public/content/math/y8/lesson_1_algebra_basics.json`

## Troubleshooting

### Lesson doesn't appear in selector
- Check that subject and level directories exist
- Verify JSON file is in correct directory
- Ensure JSON is valid (no syntax errors)

### Content doesn't display properly
- Check Tailwind CSS color classes exist
- Verify emoji rendering (some systems don't support all)
- Check JSON string formatting (escaped newlines in diagrams)

### Quiz questions not randomizing
- Check that `randomizeQuestions()` is being called
- Verify quiz array has more than 1 question
- Browser might be caching - hard refresh (Ctrl+Shift+R)

## Need Help?

Refer to the schema documentation: `public/content/schema.md`

Examples are provided in this guide and in the content files themselves.
