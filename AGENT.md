# Vonipo Character Generator - Agent Guidelines

## core Context 
This codebase is a generic D&D 5e Character generator with comprehensive support for the core Player's Handbook options. It was originally derived from the "Tabaxi Character Generator" but has been expanded into a "Universal Species Generator."

## Design Protocols 
- **Tech Stack:** React, Vite, Tailwind CSS (v4).
- **Styling (Amethyst Purple):** The application follows a strict design protocol using a "brand" palette centered on Amethyst Purple and Fuchsia.
    - **Primary Brand:** `bg-brand-500` (#d946ef).
    - **Palette Extensions:** Use `brand-400` (#e879f9) for highlights and `brand-600` (#c026d3) for active states.
    - **RGB Variables:** Use `rgba(var(--color-brand-rgb), alpha)` for shadows and dynamic glows. `--color-brand-rgb` is `217, 70, 239`.
    - **Dark Mode:** `bg-[var(--color-dark-bg)]` (#12181b) is the primary background.
    - **Prohibited:** NEVER use "emerald" or "teal" utility classes for UI elements.
- **Icons:** Use `lucide-react` with consistent sizing (usually `size={18}` or `size={20}`).
- **Assets:** Character images are dynamically loaded using the convention `[species]-[class].png` (e.g., `tabaxi-warlock.png`). These are stored in `public/classes/`.

## Data Layers
- **Species System:** Managed in `src/data/species5e.js`. It supports complex nesting and traits that can be mapped to stat bonuses.
- **Lore Rendering:** `src/components/SpeciesLore.jsx` handles the dynamic rendering of race-specific details.
- **Validation:** Warnings are handled in `src/utils/validation.js`. Always verify that new features integrate with this warning system.

## Important Structural Notes
- **Vite Integration:** Uses tailwind v4 with `@tailwindcss/vite` plugin.
- **State Management:** Single source of truth in `CharacterWizard.jsx`. 
- **Multiclass Support:** Classes are stored as a list. `data` represents the first class, and `data.multiClasses` (array) contains subsequent classes. Functions should iterate over both to calculate totals (e.g., total level, spell slots).
- **PDF Generation:** `src/utils/pdfGenerator.js` handles multiclass formatting. It uses " / " for class/level combinations and calculates combined spell save DCs and attack bonuses based on each class's spellcasting ability.
- **Unarmed Strike:** Managed via `data.unarmedStrikeEquipped`. It auto-enables for Monks or characters without weapons (checked in `Equipment.jsx`).
- **Inventory Regex:** Item properties are inferred via regex in `src/utils/stats.js`. Ensure data additions follow the naming patterns in `src/data/equipment.js`.

## Production Website
- **Current Remote:** `https://charactergenerator.vonipo.com`

## GitHub Repository
- **Current Remote:** `https://github.com/hardlynoticeable/VonipoGen`
- **Legacy Base:** `hardlynoticeable/tabaxi` (DO NOT push new VonipoGen updates to the tabaxi repo).

