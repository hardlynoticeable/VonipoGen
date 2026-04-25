# Vonipo Character Generator

## Context 
This codebase is a generic D&D 5e Character generator with comprehensive support for the core Player's Handbook options.

## Design Protocols 
- **Tech Stack:** React, Vite, Tailwind CSS. No complex routing (single page App with tab states).
- **Styling:** "Amethyst Purple" dark mode (`--color-brand-*` maps to standard tailwind purple gradients). Do not accidentally apply emerald styling!
- **Data Layers:** All rules and standard dictionaries are placed into `src/data/`. `species5e.js` uses a `PARENT_SPECIES` grouping mapper to support nesting like Dragonborn colours.
- **Validation:** Complex state derivation (calculating Max AC, Attack modifiers) uses `src/utils/stats.js`. Warnings are driven entirely by `src/utils/validation.js`.

## Recent Structural Quirks
- **Equipment System:** Items are heavily inferred using Regex for attributes. Two-Handed + Shield checks are performed lazily in the Backpack view rather than forbidding the Equip entirely.
