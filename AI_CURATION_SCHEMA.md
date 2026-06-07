# AI Content Curation Schema

## Purpose

This document defines the JSON schema that an AI system can use to automatically curate learning content from various sources (PDFs, Word documents, PowerPoints, web articles, etc.) and convert them into lessons for the Multi-Subject Tutor App.

## Overview

The curation process:
1. **User provides** learning material (PDF, DOCX, PPTX, etc.)
2. **AI reads** the material using OCR/parsing
3. **AI extracts** key concepts and information
4. **AI structures** data according to this schema
5. **AI generates** quiz questions and flashcards
6. **Output** is valid JSON matching lesson format
7. **Lesson** is ready to use in the app

## AI Curation Instructions

When an AI is given a learning material, use this prompt:

```
You are a learning content curator. Your task is to extract learning content 
from the provided material and structure it into a standardized JSON lesson format.

Follow this schema exactly:

[SCHEMA BELOW]

Guidelines:
1. Extract 3-5 main topics/sections from the material
2. For each section, extract 4-6 key bullet points
3. Identify 10-15 important terms for flashcards
4. Generate 10 quiz questions covering easy/intermediate/advanced difficulty
5. Create a cheatsheet with key terms and definitions
6. If there are diagrams/images, create ASCII art descriptions
7. Determine appropriate emoji, colors, and difficulty level
8. Ensure all content is accurate and age-appropriate for the target level

Output ONLY valid JSON matching the schema below.
```

## JSON Schema for AI Curation

```json
{
  "metadata": {
    "source_document": "filename or URL of source material",
    "curation_date": "YYYY-MM-DD",
    "ai_model_used": "GPT-4 or other model name (optional)",
    "curation_confidence": 0.95,
    "notes": "Any special notes about the curation process"
  },
  
  "lesson": {
    "id": "lesson_identifier_no_spaces",
    "week": 1,
    "title": "Lesson Title",
    "subject": "science|math|english|social-science",
    "level": "y7|y8|y9",
    "icon": "emoji that represents the topic",
    "color": "bg-[color]-100",
    "textColor": "text-[color]-700",
    "difficulty": "easy|intermediate|advanced",
    
    "introduction": "2-3 sentence overview that hooks student interest and explains what they'll learn",
    
    "sections": [
      {
        "id": "section_1",
        "title": "Section Title",
        "importance": "critical|important|supplementary",
        "content": [
          "Clearly stated concept or fact",
          "Another key point with examples",
          "Third point with explanation",
          "Fourth key takeaway",
          "Fifth important detail"
        ],
        "learning_objective": "What student should be able to do after this section"
      }
    ],
    
    "diagram": {
      "type": "ascii|description|flowchart",
      "content": "ASCII art or detailed description of visual concept",
      "caption": "What the diagram illustrates"
    },
    
    "key_vocabulary": [
      {
        "id": "term_1",
        "term": "Technical Term",
        "definition": "Clear, student-friendly definition",
        "context": "How/where this term is used",
        "importance": "critical|important|supplementary"
      }
    ],
    
    "flashcards": [
      {
        "id": "fc_1",
        "type": "definition|application|relationship|calculation",
        "q": "Question or prompt",
        "a": "Concise, clear answer",
        "hint": "Optional hint if student struggles",
        "difficulty": "easy|intermediate|advanced"
      }
    ],
    
    "quiz": [
      {
        "id": "q_1",
        "type": "multiple_choice|true_false|fill_blank",
        "q": "Question text",
        "opts": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "ans": 1,
        "difficulty": "easy|intermediate|advanced",
        "explanation": "Why this is correct (for feedback)"
      }
    ],
    
    "cheatsheet": {
      "key_concepts": {
        "Concept 1": "Brief explanation",
        "Concept 2": "Brief explanation"
      },
      "important_equations": {
        "Equation Name": "Formula or relationship"
      },
      "common_mistakes": [
        "Mistake 1: What students often get wrong",
        "Mistake 2: Another common error"
      ],
      "exam_focus": "What's most important for tests",
      "remember_this": "Memorable phrase or mnemonic"
    },
    
    "assessment": {
      "learning_outcomes": [
        "Student can identify key concepts",
        "Student can explain relationships",
        "Student can apply knowledge"
      ],
      "formative_assessment": "How to check understanding during lesson",
      "summative_assessment": "How to assess learning after lesson"
    },
    
    "extensions": {
      "further_reading": [
        "Topic or resource for deeper learning"
      ],
      "real_world_applications": [
        "How this concept applies in real life"
      ],
      "cross_curricular_links": [
        "How this connects to other subjects"
      ]
    },
    
    "curation_flags": {
      "requires_review": false,
      "missing_content": [],
      "unclear_sections": [],
      "fact_checked": true,
      "reviewer_notes": "Optional notes for human review"
    }
  }
}
```

## Detailed Field Descriptions

### Metadata Section

| Field | Description | Example |
|-------|-------------|---------|
| `source_document` | Original source material | `biology_textbook_ch3.pdf` |
| `curation_date` | When content was curated | `2024-01-15` |
| `ai_model_used` | Which AI created this | `GPT-4` |
| `curation_confidence` | How confident AI is (0-1) | `0.95` |
| `notes` | Any special notes | `Some diagrams converted to ASCII` |

### Lesson Metadata

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| `id` | Unique lesson ID | Yes | `cell_structure_basics` |
| `week` | Sequence number | Yes | `1` |
| `title` | Lesson name | Yes | `Cell Structure and Function` |
| `subject` | Science/Math/etc | Yes | `science` |
| `level` | Y7/Y8/Y9 | Yes | `y8` |
| `icon` | Emoji | Yes | `🔬` |
| `color` | Tailwind color | Yes | `bg-blue-100` |
| `textColor` | Tailwind text color | Yes | `text-blue-700` |
| `difficulty` | Lesson complexity | Yes | `intermediate` |
| `introduction` | Hook for students | Yes | `2-3 sentences` |

### Sections

Each section should:
- Have a clear, descriptive title
- Include 4-6 bullet points (not more, not less)
- Each point should be a complete thought
- Points should progress from basic → complex
- Include examples where helpful

```json
{
  "title": "What are Cells?",
  "importance": "critical",
  "content": [
    "Cells are the basic unit of life - all living things are made of one or more cells",
    "There are two main types: prokaryotic (bacteria) and eukaryotic (animals, plants, fungi)",
    "Eukaryotic cells contain a nucleus that holds DNA - prokaryotic cells don't",
    "Plant cells have a rigid cell wall and chloroplasts; animal cells don't",
    "Cell size is typically 10-100 micrometers - invisible to the naked eye"
  ],
  "learning_objective": "Student can identify and describe the two main types of cells"
}
```

### Flashcards

Generate 10-15 flashcards mixing question types:

- **Definition (40%)**: "What is X?" → "Definition of X"
- **Application (30%)**: "When would you use X?" → "In situation Y"
- **Relationship (20%)**: "How does X relate to Y?" → "Explanation"
- **Calculation (10%)**: "Calculate X using Y" → "Answer with formula"

```json
{
  "id": "fc_1",
  "type": "definition",
  "q": "What is photosynthesis?",
  "a": "Process where plants use sunlight, water, and CO₂ to make glucose and oxygen",
  "hint": "Think: plants + sunlight = food",
  "difficulty": "easy"
}
```

### Quiz Questions

Generate 10 questions with this distribution:
- **Easy (3)**: Recall, recognition, basic understanding
- **Intermediate (5)**: Application, analysis
- **Advanced (2)**: Synthesis, evaluation

```json
{
  "id": "q_1",
  "type": "multiple_choice",
  "q": "Which organelle is responsible for energy production in cells?",
  "opts": ["Nucleus", "Mitochondrion", "Ribosome", "Chloroplast"],
  "ans": 1,
  "difficulty": "intermediate",
  "explanation": "Mitochondria are the powerhouses of the cell - they produce ATP through cellular respiration"
}
```

### Cheatsheet

Create a quick reference guide:

```json
{
  "key_concepts": {
    "Respiration": "Chemical process breaking down glucose for energy",
    "Aerobic": "Requires oxygen (more efficient)",
    "Anaerobic": "Without oxygen (less efficient)"
  },
  "important_equations": {
    "Aerobic Respiration": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy"
  },
  "common_mistakes": [
    "Respiration ≠ Breathing (breathing is physical, respiration is chemical)",
    "Not all respiration requires oxygen"
  ],
  "exam_focus": "Know the difference between aerobic and anaerobic respiration",
  "remember_this": "Respiration happens in EVERY cell, not just lungs!"
}
```

## Color and Emoji Recommendations

### Science Topics
| Topic | Icon | Color |
|-------|------|-------|
| Biology/Cells | 🔬 | bg-red-100 / text-red-700 |
| Respiration | 🫁 | bg-red-100 / text-red-700 |
| Photosynthesis | 🌱 | bg-green-100 / text-green-700 |
| Ecosystems | 🌿 | bg-emerald-100 / text-emerald-700 |
| Physics/Forces | ⚡ | bg-blue-100 / text-blue-700 |
| Magnetism | 🧲 | bg-purple-100 / text-purple-700 |
| Chemistry | 🧪 | bg-indigo-100 / text-indigo-700 |

### Math Topics
| Topic | Icon | Color |
|-------|------|-------|
| Algebra | 📐 | bg-blue-100 / text-blue-700 |
| Geometry | 🔺 | bg-purple-100 / text-purple-700 |
| Statistics | 📊 | bg-teal-100 / text-teal-700 |
| Calculus | 📈 | bg-indigo-100 / text-indigo-700 |

### Other Subjects
| Subject | Icon | Color |
|---------|------|-------|
| English | 📖 | bg-orange-100 / text-orange-700 |
| Social Science | 🌍 | bg-emerald-100 / text-emerald-700 |
| History | 🏛️ | bg-yellow-100 / text-yellow-700 |

## Curation Workflow for AI

### Step 1: Parse Source Material

```
Input: PDF/DOCX/PPTX file
Process:
  1. Extract text (OCR if image-based)
  2. Identify chapter/section boundaries
  3. Extract headings as potential sections
  4. Note any diagrams or images
  5. Identify key terms in bold/highlighted
Output: Structured text with sections and terms
```

### Step 2: Extract Core Content

```
For each major section:
  1. Identify main concept
  2. Extract 4-6 key supporting points
  3. Find examples and applications
  4. Note any formulas or equations
  5. Identify common misconceptions
Output: Section data
```

### Step 3: Generate Flashcards

```
For each key term/concept:
  1. Create definition flashcard
  2. Create application flashcard
  3. Create relationship flashcard
  4. Difficulty assignment (easy/intermediate/advanced)
  5. Add optional hints
Output: 10-15 flashcards
```

### Step 4: Generate Quiz

```
Create 10 questions:
  1. 3 easy recall questions
  2. 5 intermediate application questions
  3. 2 advanced analysis questions
  4. Vary answer positions (not always B)
  5. Include explanations for each answer
Output: 10 validated quiz questions
```

### Step 5: Create Cheatsheet

```
Summarize:
  1. Key concepts with definitions
  2. Important equations/formulas
  3. Common student mistakes
  4. What's important for exams
  5. Memory tricks/mnemonics
Output: Condensed reference guide
```

### Step 6: Validate

```
Checks:
  ✓ All required fields present
  ✓ No plagiarism (paraphrase properly)
  ✓ Age-appropriate language
  ✓ Accuracy verified
  ✓ Diversity of question types
  ✓ JSON valid and well-formed
Output: Valid lesson JSON
```

## AI Prompts for Different Sources

### For PDF Textbooks

```
Extract learning content from the provided PDF chapter. Create a comprehensive lesson 
covering all main concepts. Ensure:
- All key terms are defined
- Relationships between concepts are explained
- Examples are included
- Difficulty progressions from basic to advanced
- Factual accuracy is maintained

Output as JSON following the curation schema.
```

### For PowerPoint Presentations

```
Convert the PowerPoint slides into a structured lesson. Extract:
- Main learning objectives from slides
- Key bullet points in logical order
- Concepts shown in diagrams (convert to ASCII)
- Summaries from concluding slides
- Speaker notes if available

Organize chronologically as the presentation intended. Output JSON lesson.
```

### For Word Documents

```
Parse this Word document as learning material. Identify:
- Section headings and hierarchy
- Key terms (bold, italic, or in context)
- Worked examples for practice
- Summary boxes or callouts
- Review questions (convert to quiz format)

Structure into lesson format. Output JSON.
```

### For Web Articles

```
Curate this web article into a lesson. Extract:
- Main topic and subtopics
- Factual information (verify if needed)
- Definitions of technical terms
- Real-world examples and applications
- External references for extension

Organize logically for student learning. Output JSON lesson.
```

## Quality Assurance Checklist for AI

Before outputting the JSON, AI should verify:

- [ ] **Completeness**: All required fields present
- [ ] **Accuracy**: Facts are correct and current
- [ ] **Age-Appropriate**: Language matches Y7/Y8/Y9 level
- [ ] **Balance**: Good mix of easy/intermediate/advanced questions
- [ ] **Clarity**: Concepts explained simply and clearly
- [ ] **Structure**: Logical progression of ideas
- [ ] **Diversity**: Different question types (definition, application, analysis)
- [ ] **Engagement**: Interesting examples and real-world connections
- [ ] **Plagiarism**: Content paraphrased, not copied
- [ ] **JSON Validity**: Proper syntax, all quotes escaped
- [ ] **Consistency**: Terminology consistent throughout
- [ ] **Completeness**: Flashcards and quiz have minimum required items

## Example: PDF to Lesson Conversion

### Input (PDF Content)

```
Chapter 3: The Cell
The cell is the basic unit of life. All living organisms are composed of one or more cells.
- Prokaryotic cells (bacteria) lack a nucleus
- Eukaryotic cells (animals, plants, fungi) contain a nucleus
Organelles are specialized structures within cells that perform specific functions.
The mitochondrion produces ATP through cellular respiration...
```

### Output (JSON Lesson)

```json
{
  "metadata": {
    "source_document": "Biology_Textbook_Ch3.pdf",
    "curation_date": "2024-01-15"
  },
  "lesson": {
    "id": "cell_basics_structures",
    "title": "Cell Structure and Organelles",
    "subject": "science",
    "level": "y8",
    ...
    "sections": [
      {
        "title": "What Are Cells?",
        "content": [
          "Cells are the basic unit of life - all living things are made of cells",
          "There are two main types: prokaryotic and eukaryotic cells",
          "Prokaryotic cells (bacteria) have no nucleus - DNA floats freely",
          "Eukaryotic cells (animals, plants, fungi) have a nucleus containing DNA",
          "All cells have a cell membrane that controls what enters and exits"
        ]
      },
      {
        "title": "Cell Organelles",
        "content": [
          "Organelles are specialized structures that perform specific jobs",
          "Mitochondria produce energy (ATP) through cellular respiration",
          "Ribosomes build proteins following DNA instructions",
          "Endoplasmic reticulum transports proteins and lipids",
          "Golgi apparatus packages and ships molecules"
        ]
      }
    ],
    "flashcards": [...],
    "quiz": [...],
    "cheatsheet": {...}
  }
}
```

## Integration with App

Once AI generates the JSON:

1. **Save to correct directory**: `public/content/[subject]/[level]/[lesson_file].json`
2. **Validate JSON**: Use jsonlint.com or IDE validator
3. **Test in app**: Load subject → level → lesson
4. **Human review**: Check content quality, accuracy, age-appropriateness
5. **Publish**: JSON is now live in the app

## Customization Options

### For Different Age Groups

- **Y7 (age 12)**: Simpler vocabulary, concrete examples, more visual support
- **Y8 (age 13)**: More complex concepts, some abstract reasoning
- **Y9 (age 14)**: Advanced concepts, analysis-level questions

### For Different Learning Styles

- **Visual learners**: Emphasis on diagrams and color-coding
- **Kinesthetic learners**: Real-world applications and hands-on examples
- **Auditory learners**: Emphasis on explanations and relationships
- **Reading/writing learners**: Detailed definitions and text-based examples

## Testing AI-Generated Content

```javascript
// Test suite for AI-curated lessons
const validateLesson = (lesson) => {
  const checks = {
    hasRequiredFields: () => {
      return lesson.id && lesson.title && lesson.subject && lesson.level;
    },
    hasValidStructure: () => {
      return Array.isArray(lesson.sections) && 
             Array.isArray(lesson.flashcards) && 
             Array.isArray(lesson.quiz);
    },
    sufficientContent: () => {
      return lesson.sections.length >= 3 &&
             lesson.flashcards.length >= 10 &&
             lesson.quiz.length >= 10;
    },
    validJSON: () => {
      try {
        JSON.stringify(lesson);
        return true;
      } catch {
        return false;
      }
    }
  };
  
  return Object.entries(checks).map(([name, test]) => ({
    check: name,
    passed: test()
  }));
};
```

## Common Issues and Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Missing flashcards | AI didn't extract terms | Manually review and add missing concepts |
| Biased quiz | AI focused on one topic | Ensure balanced coverage across sections |
| Complex language | Didn't match age level | Simplify for Y7/Y8 or expand for Y9 |
| Plagiarized content | Direct copying from source | Have AI paraphrase and cite sources |
| Incorrect answers | AI made factual errors | Have domain expert review |
| Incomplete JSON | Schema violation | Use validator and fix missing fields |

## Best Practices for AI Curation

1. **Always verify accuracy** - Have subject matter expert review
2. **Paraphrase, don't copy** - Avoid plagiarism issues
3. **Cite sources** - Give credit to original material
4. **Match age level** - Use vocabulary appropriate for Y7/Y8/Y9
5. **Ensure diversity** - Mix question types and difficulty levels
6. **Include examples** - Real-world applications increase engagement
7. **Validate JSON** - Use tools to ensure valid syntax
8. **Test in app** - Verify all features work correctly
9. **Gather feedback** - See how students respond
10. **Iterate** - Improve based on usage data

---

## Quick Reference: Minimal Required Fields

For a minimally viable AI-curated lesson:

```json
{
  "lesson": {
    "id": "unique_id",
    "week": 1,
    "title": "Lesson Title",
    "subject": "science",
    "level": "y8",
    "icon": "🔬",
    "color": "bg-red-100",
    "textColor": "text-red-700",
    "difficulty": "intermediate",
    "introduction": "Overview",
    "sections": [{"title": "T", "content": ["C1", "C2", "C3"]}],
    "diagram": "ASCII",
    "flashcards": [{"id": "fc_1", "q": "Q?", "a": "A"}],
    "quiz": [{"id": "q_1", "q": "Q?", "opts": ["A", "B", "C", "D"], "ans": 0, "difficulty": "easy"}],
    "cheatsheet": {"Key": "Value"}
  }
}
```

This schema and documentation is designed to be given to an AI system that will then automatically curate learning content from any source document.
