# Vonipo Character Generator - Agent Guidelines

## core Context 
This codebase is a generic D&D 5e Character generator with comprehensive support for the core Player's Handbook options. It was originally derived from the "Tabaxi Character Generator" but has been expanded into a "Universal Species Generator."

## Design Protocols 
- **Tech Stack:** React, Vite, Tailwind CSS (v4).
- **Styling (Amethyst Purple):** The application follows a strict design protocol using a "brand" palette centered on Amethyst Purple and Fuchsia.
    - **Primary Brand:** `bg-brand-500` (#d946ef) or gradients `from-brand-400 to-fuchsia-300`.
    - **Shadows:** Always use color-appropriate glows (e.g., `shadow-[0_0_15px_rgba(139,92,246,0.4)]`).
    - **Dark Mode:** `bg-[var(--color-dark-bg)]` (#12181b) should be the primary background.
    - **Prohibited:** NEVER use "emerald" or "teal" utility classes for UI elements (these are legacy).
- **Icons:** Use `lucide-react` with consistent sizing (usually `size={18}` or `size={20}`).

## Data Layers
- **Species System:** Managed in `src/data/species5e.js`. It supports complex nesting and traits that can be mapped to stat bonuses.
- **Lore Rendering:** `src/components/SpeciesLore.jsx` handles the dynamic rendering of race-specific details.
- **Validation:** Warnings are handled in `src/utils/validation.js`. Always verify that new features integrate with this warning system.

## Important Structural Notes
- **Vite Integration:** Uses tailwind v4 with `@tailwindcss/vite` plugin.
- **State Management:** Single source of truth in `CharacterWizard.jsx` (the `data` object).
- **Inventory Regex:** Item properties (like "Two-Handed" or "Stealth Disadv.") are inferred via regex in `src/utils/stats.js`. Ensure data additions follow the naming patterns in `src/data/equipment.js`.

## GitHub Repository
- **Current Remote:** `https://github.com/hardlynoticeable/VonipoGen`
- **Legacy Base:** `hardlynoticeable/tabaxi` (DO NOT push new VonipoGen updates to the tabaxi repo).
