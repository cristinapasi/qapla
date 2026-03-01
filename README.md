# Synergy Klingon — tlhIngan Hol yIghoj!

A language learning application for Klingon using the Synergy Method. Build 1,000+ sentences with just 80 vocabulary pieces through combinatorial assembly.

## The Synergy Method

The Synergy Method teaches languages through **combinatorial building**, not memorization. Learn a small set of high-utility words divided into:

- **Bricks**: High-frequency content words (verbs, nouns, adjectives)
- **Mortar**: Structural pieces (prefixes, suffixes, connectors) that glue bricks together

**Key insight**: Learning ~80 carefully chosen pieces lets you build 1,000+ sentences through combination.

## Features

- **4-Phase Learning**:
  1. **Learn**: Flashcards with audio pronunciation
  2. **Build**: Interactive sentence constructor with tile system
  3. **Quiz**: Multiple choice, audio recognition, fill-in-the-gap
  4. **Sandbox**: Free sentence builder using all learned pieces

- **Gamification**:
  - XP system with rank progression
  - Streak bonuses
  - Module unlocking
  - Spaced repetition for vocabulary

- **Audio System**:
  - Web Speech API with phonetic dictionary
  - UI sound effects using Tone.js
  - Pronunciation guide

- **Mobile-First Design**:
  - Responsive layout (max-width 520px)
  - Touch-optimized interactions
  - Dark space theme

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Audio**: Web Speech API + Tone.js
- **State**: React Context + Hooks
- **Persistence**: window.storage API
- **Build Tool**: Vite

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
│   ├── Dashboard/     # Module selection & overview
│   ├── Learn/         # Flashcard phase
│   ├── Build/         # Sentence constructor phase
│   ├── Quiz/          # Assessment phase
│   ├── Sandbox/       # Free practice phase
│   └── common/        # Shared components
├── services/          # Audio, storage, sound effects
├── data/              # Module content & phonetic dictionary
│   ├── modules/       # Module vocabulary & exercises
│   └── phonetic-dictionary.ts
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## Module Content

### Module 1: Survival Basics
- **Theme**: Eat, Drink & Get Around
- **Vocabulary**: 13 bricks + 6 mortar pieces
- **Sentences**: 200+ combinations

### Modules 2-5
Coming soon...

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Vite + React + TypeScript
- [x] Tailwind CSS configuration
- [x] Type definitions for all data models
- [x] Storage service wrapper
- [x] Audio service with Web Speech API
- [x] Sound effects system with Tone.js
- [x] Phonetic dictionary (80 words)
- [x] Module 1 content
- [x] Basic app structure with Dashboard

### Phase 2: Learn Phase (In Progress)
- [ ] Flashcard component with flip animation
- [ ] Spaced repetition logic
- [ ] Audio playback integration
- [ ] Confidence tracking

### Phase 3: Build Phase
- [ ] Tile system with tap-to-select
- [ ] Construction zone with real-time preview
- [ ] Tile attachment/agglutination logic
- [ ] Answer validation
- [ ] Streak tracking

### Phase 4: Quiz Phase
- [ ] Multiple question types
- [ ] Score tracking
- [ ] Module unlocking logic
- [ ] Review system

### Phase 5: Sandbox Phase
- [ ] Free sentence builder
- [ ] Grammar validation
- [ ] Sentence counter

### Phase 6: Content Expansion
- [ ] Modules 2-5 vocabulary
- [ ] Build exercises for all modules
- [ ] Quiz questions
- [ ] Master Review

### Phase 7: Polish
- [ ] Animations & transitions
- [ ] Mobile optimization
- [ ] Performance tuning
- [ ] Accessibility improvements

## Contributing

Content creation workflow:
1. Add vocabulary to `src/data/modules/moduleN.ts`
2. Define tile attachment behaviors
3. Create build exercises with correct answers
4. Generate quiz questions with plausible distractors
5. Add phonetic entries to dictionary

## License

This project is built for educational purposes.

## Acknowledgments

- Inspired by Marcus Santamaria's Synergy Spanish method
- Klingon language created by Marc Okrand
- Phonetic mappings adapted for Web Speech API

---

**Qapla'!** (Success!)
