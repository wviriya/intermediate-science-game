# Ready-to-Use AI Prompts for Content Curation

Copy and paste these prompts into ChatGPT, Claude, or another AI when you have learning material to convert.

## General Prompt (Use This First)

```
You are an expert learning content curator. Your task is to convert the following learning 
material into a structured JSON lesson for a student tutor application.

IMPORTANT: Output ONLY valid JSON - no explanations, no markdown, just raw JSON.

Target audience: Year 8 students (age 13)
Subject: [SUBJECT - e.g., Science, Math, English]

Follow this exact JSON structure:

{
  "metadata": {
    "source_document": "[Material source]",
    "curation_date": "[Today's date]"
  },
  "lesson": {
    "id": "unique_lesson_id",
    "week": 1,
    "title": "Clear Lesson Title",
    "subject": "[subject - lowercase]",
    "level": "y8",
    "icon": "[Relevant emoji]",
    "color": "bg-[color]-100",
    "textColor": "text-[color]-700",
    "difficulty": "intermediate",
    "introduction": "Engaging 2-3 sentence overview",
    "sections": [
      {
        "id": "section_1",
        "title": "Section Title",
        "content": [
          "Clear, concise point 1",
          "Point 2 with context",
          "Point 3 with example",
          "Point 4 with detail",
          "Point 5 to conclude"
        ]
      }
    ],
    "diagram": {
      "type": "ascii",
      "content": "ASCII art or text diagram",
      "caption": "What this shows"
    },
    "flashcards": [
      {
        "id": "fc_1",
        "type": "definition",
        "q": "What is [term]?",
        "a": "Clear, accurate definition",
        "difficulty": "easy"
      }
    ],
    "quiz": [
      {
        "id": "q_1",
        "type": "multiple_choice",
        "q": "Question text?",
        "opts": ["Option A", "Option B", "Option C", "Option D"],
        "ans": 1,
        "difficulty": "easy",
        "explanation": "Why this answer is correct"
      }
    ],
    "cheatsheet": {
      "key_concepts": {
        "Term 1": "Definition",
        "Term 2": "Definition"
      },
      "important_equations": {
        "Name": "Formula"
      },
      "remember_this": "Memorable phrase"
    }
  }
}

Guidelines:
1. Extract 3-4 main topics as sections
2. Each section: 4-6 clear bullet points
3. Generate 12 flashcards (mix of definition, application, relationship types)
4. Generate 10 quiz questions: 3 easy, 5 intermediate, 2 advanced
5. Vary answer positions (correct answer shouldn't always be same position)
6. Include explanations for quiz answers
7. Create ASCII art for any diagrams
8. All content should be age-appropriate, accurate, and engaging
9. Use simple, clear language for Y8 students
10. Ensure all JSON is valid with proper escaping

Now, here is the learning material to curate:

[PASTE YOUR MATERIAL HERE]
```

## PDF Textbook Chapter Prompt

```
I have a PDF textbook chapter that I need to convert into an interactive lesson.

Please curate this material into a JSON lesson format following this structure:
- 3-4 major sections based on the chapter's organization
- Each section should have 4-6 key bullet points
- 12 comprehensive flashcards covering all major terms
- 10 quiz questions (3 easy, 5 intermediate, 2 advanced)
- ASCII diagram if the chapter has visual concepts
- Quick cheatsheet with key terms and definitions

Target: Year 8 Science lesson
Subject: [SCIENCE TOPIC]
Level: y8

OUTPUT ONLY VALID JSON (no explanations or markdown).

Here's the chapter content:

[PASTE CHAPTER TEXT HERE]
```

## PowerPoint Presentation Prompt

```
Please convert this PowerPoint presentation content into a JSON lesson for students.

Follow the slide order as the learning progression. Extract:
- Learning objectives from opening slides
- Main concepts from each slide
- Key bullet points (keep them concise)
- Diagrams as ASCII art descriptions
- Summary concepts from closing slides

Create:
- 3-4 lesson sections following the slide sequence
- 12 flashcards from key terms and concepts
- 10 quiz questions based on slide content
- ASCII diagrams for any visual slides

Target: Year 8 lesson in [SUBJECT]

OUTPUT ONLY VALID JSON - no other text.

Here's the PowerPoint content:

[PASTE SLIDE CONTENT HERE]
```

## Web Article / Blog Post Prompt

```
I have a web article about [TOPIC] that I want to convert into a lesson.

Please structure it as a JSON lesson with:
1. Clear introduction that hooks the reader
2. 3-4 main sections from the article
3. Key concepts highlighted and defined
4. Real-world applications mentioned
5. 12 flashcards covering important terms
6. 10 quiz questions at various difficulties
7. A summary/cheatsheet

Target student: Year 8 (age 13)
Subject: [SUBJECT]

Make sure to:
- Paraphrase content (no direct copying)
- Maintain factual accuracy
- Include source attribution if appropriate
- Use engaging language for middle school students

OUTPUT ONLY JSON:

[PASTE ARTICLE HERE]
```

## Science Textbook Lesson Prompt

```
Convert this science lesson into an interactive JSON format.

Requirements:
- Topic: [TOPIC]
- Level: Y8
- Include scientific terminology and definitions
- Explain 'why' and 'how' not just 'what'
- Include practical examples students can relate to
- Create diagrams as ASCII art

Content sections should cover:
1. What is [concept]?
2. How does [mechanism] work?
3. Why is this important?
4. Real-world applications
5. Common misconceptions students have

Flashcards should include:
- Definitions of key terms
- Applications of concepts
- Relationships between ideas
- Process steps or sequences

Quiz should progress:
- Easy: Basic recall
- Intermediate: Understanding and application
- Advanced: Analysis and synthesis

OUTPUT ONLY JSON:

[PASTE SCIENCE TEXT HERE]
```

## Math Lesson Prompt

```
Convert this math lesson into an interactive JSON lesson.

Content: [TOPIC]
Level: Y8

Extract:
1. Definition of the concept
2. How to solve/calculate (step-by-step)
3. Common mistakes students make
4. Real-world applications
5. Related concepts

Sections should include:
- What is [concept]?
- How do we use it?
- Step-by-step examples
- Practice tips
- Why it matters

Flashcards must include:
- Definitions
- Formula flashcards (question: name, answer: formula)
- Worked examples
- Application scenarios

Quiz should test:
- Formula recall
- Calculation skills
- Conceptual understanding
- Problem-solving ability

Include important equations in the cheatsheet.

OUTPUT ONLY JSON:

[PASTE MATH CONTENT HERE]
```

## English Literature Prompt

```
Convert this English lesson material into a JSON lesson.

Content: [TOPIC - e.g., Shakespeare's Macbeth]
Level: Y8

Structure around:
1. Background and context
2. Main themes and ideas
3. Character analysis
4. Literary techniques
5. Key quotes and meanings

Sections should cover:
- Historical/biographical context
- Main plot points or themes
- How the author conveys meaning
- Student interpretations
- Relevance to today

Flashcards must include:
- Character names and roles
- Key quotes and their meanings
- Literary devices used
- Thematic elements
- Vocabulary terms

Quiz should test:
- Comprehension of content
- Analysis of techniques
- Understanding of themes
- Application to real life

Create an ASCII representation if there's a structure (family tree, plot timeline, etc).

OUTPUT ONLY JSON:

[PASTE ENGLISH TEXT HERE]
```

## Social Science / History Prompt

```
Convert this social science material into a JSON lesson.

Topic: [TOPIC]
Level: Y8
Subject: [History/Geography/Civics/Economics]

Extract:
1. Time period or context (if history)
2. Key people, places, events, or concepts
3. Causes and consequences
4. Geographic or social context
5. Relevance today

Sections should include:
- What happened / What is it?
- Why did it happen / Why does it matter?
- Who was involved / How does it work?
- What were the consequences / What can we learn?
- Modern-day relevance / Applications

Flashcards should cover:
- Dates and events (if history)
- Key figures and their roles
- Geographic locations
- Social/political concepts
- Causes and effects

Quiz should test:
- Factual knowledge
- Understanding of cause-effect
- Analysis of significance
- Critical thinking about relevance

If geography: include map references and ASCII diagrams.
If history: include timeline context.
If civics: include real-world applications.

OUTPUT ONLY JSON:

[PASTE CONTENT HERE]
```

## Document with Images/Diagrams Prompt

```
I have a document with diagrams and images that I need to convert.

Please:
1. Extract all text content
2. Convert diagrams/images to ASCII art descriptions or detailed text
3. Create sections around the visual concepts
4. Reference the diagrams in relevant flashcards and quiz

Output a complete JSON lesson where:
- Diagrams are described in the "diagram" field as ASCII or detailed text
- Flashcards test understanding of visual concepts
- Quiz includes questions about the diagrams
- Cheatsheet summarizes visual relationships

Topic: [TOPIC]
Level: y8

OUTPUT ONLY JSON:

[PASTE TEXT HERE]

For diagrams, describe them like:
"
[Large structure showing X at top connected to Y and Z below, with arrows showing flow]
"

[PASTE YOUR CONTENT AND DIAGRAM DESCRIPTIONS HERE]
```

## Quick Batch Prompt (For Multiple Lessons)

```
I'm building a multi-lesson course. Please create JSON lessons for each of these topics:

1. [Topic 1]
2. [Topic 2]  
3. [Topic 3]

Each should be:
- Level: Y8
- Subject: [Subject]
- Format: JSON (ONLY JSON, no other text)
- Include: 3-4 sections, 12 flashcards, 10 quiz questions, cheatsheet
- Follow the standard schema

Output THREE separate complete JSON lesson objects (you can output them one after another).

Content for Lesson 1:
[CONTENT HERE]

Content for Lesson 2:
[CONTENT HERE]

Content for Lesson 3:
[CONTENT HERE]
```

## Tips for Best Results

### 1. Prepare Your Material
- ✓ Clean up text (remove headers/footers)
- ✓ Use clear formatting
- ✓ Include all relevant information
- ✓ Remove redundant content

### 2. Customize the Prompt
- Replace [BRACKETS] with your info
- Specify exact topic and level
- Mention any special requirements
- Include number of sections/questions if needed

### 3. Provide Clear Context
- State what you want in clear terms
- Give examples if needed
- Specify target audience
- Mention any constraints

### 4. Verify Output
- Copy the JSON output
- Paste into https://jsonlint.com/ to validate
- Check all required fields are present
- Fix any formatting issues

### 5. Review Content
- Read through the extracted content
- Verify accuracy
- Check if explanations are clear
- Ensure age-appropriate language

## For Different AI Models

### ChatGPT (GPT-4)
Use full detailed prompt - ChatGPT handles long context well

### Claude  
Include "Output ONLY JSON" - Claude follows this clearly

### Gemini (Google)
Be explicit about format - Gemini likes clear instructions

### LLaMA / Local Models
Use simpler prompts - may need more structured guidance

## When AI Output Needs Fixes

### If JSON is invalid
- Copy error message from validator
- Ask AI: "Fix this JSON error: [error message]"
- Paste the broken JSON

### If content is inaccurate
- Specify which part is wrong
- Provide correct information
- Ask AI to regenerate just that section

### If flashcards/quiz are poor
- Show examples of better cards
- Ask AI to regenerate with more variety
- Specify types you want

### If language is too complex
- Ask AI to "simplify for 13-year-olds"
- Provide vocabulary constraints
- Show examples of appropriate level

## Example: From PDF to Published Lesson

```
Step 1: Prepare
- Extract text from PDF
- Clean up formatting

Step 2: Use Prompt
- Copy "PDF Textbook Chapter Prompt"
- Paste your chapter text
- Run with ChatGPT/Claude

Step 3: Validate
- Copy JSON output
- Paste into jsonlint.com
- Fix any errors

Step 4: Review
- Read content accuracy
- Check question difficulty balance
- Verify age-appropriate language

Step 5: Publish
- Save JSON to: public/content/[subject]/y8/lesson_name.json
- Refresh app
- Test in browser

Step 6: Share
- Lesson is now live
- Students can access via subject selector
```

---

**Pro Tip**: Start with the "General Prompt" - it works for most materials. Only use specific subject prompts if you have special requirements.

**Note**: Always review AI-generated content for accuracy before publishing to students.
