# Tabaxi Character Generator

A comprehensive, high-fidelity character construction tool for Dungeons & Dragons 5th Edition, meticulously tailored for the Tabaxi race. This application streamlines the journey from concept to a professional, table-ready PDF character sheet.

**Try it out:** [tabaxi.vonipo.com](https://tabaxi.vonipo.com)

## Key Features

### Progressive Web App (PWA)
Installable on desktop and mobile for a premium, app-like experience. Features full offline support via service workers, ensuring your character data is always accessible even without an internet connection.

### Comprehensive Subclass Expansion
Access over **50+ official subclasses** from *Xanathar's Guide to Everything* and *Tasha's Cauldron of Everything*.
- **Full Coverage**: Every class (from Artificer to Wizard) now includes its most popular official specializations.
- **Smart UI**: Subclasses with additional choices (like the Warlock's **Genie Kind** or Barbarian's **Storm Environment**) automatically trigger a smooth-scroll transition to their specific options section.

### Character Creation Warnings
Built-in validation system that keeps your build on track. The **Review** tab provides real-time alerts for:
- **Missing Essentials**: Background, Alignment, and Bonus Languages.
- **Mechanical Completion**: Incomplete Ability Scores or unapplied racial bonuses (+1/+1/+1 or +2/+1).
- **Spells & Skills**: Alerts for unspent skill points or unselected spell slots.
- **Equipment Readiness**: Reminders to equip weapons/armor in your inventory or attune to magic items.

### Mechanical Breakdown & Transparency
No more "black box" numbers. The generator features a dedicated **Calculation Breakdown** UI providing full visibility:
- **AC Math**: Visual step-by-step breakdown of Base Armor + DEX + Shield + Special Bonuses (Unarmored Defense, Infusions, etc.).
- **HP Scaling**: Transparent tracking of Base HP + Level Up Scaling + Constitution bonuses.
- **Stat Derivation**: Detailed components for Initiative and Passive Perception (Base + Mod + Proficiency).

### High-Utility Inventory Management
- **Modal-Driven Database**: Access 5,000+ items (Weapons, Armor, Gear) through a searchable modal interface.
- **Proficiency Feedback**: Immediate visual indicators (Proficient/Non-Proficient) with detailed warnings about mechanical penalties (Disadvantage/Spellcasting restrictions).
- **Starting Pack Support**: One-click selection of official class starter packs (Explorer's, Dungeoneer's, etc.).
- **Live Previews**: Dynamic previews of Attack/Damage and AC potential directly within the backpack.
- **Attunement Tracking**: Slot enforcement and dynamic limit scaling (with special support for Artificer's *Magic Item Adept* features).

### Advanced Spellcasting System
- **1,000+ Spell Library**: Comprehensive database including full descriptions for SRD and expanded content via interactive modals.
- **Subclass Integration**: Automatically detects and adds subclass-granted spells (e.g., Sorcerous Bloodline or Cleric Domain spells).
- **Automated Calculations**: Instant computation of Spell Save DC, Spell Attack Bonus, and level-indexed slot availability.

### Pro-Grade PDF Generation
Generates an expertly form-filled **Standard WOTC D&D 5e Character Sheet**:
- **Smart Typography**: Dynamic font-scaling for complex fields like Backstory and Features to ensure maximum readability.
- **Automated Mapping**: All identity traits, equipment lists, and currency are mapped to their official sheet locations.
- **Inventory Sync**: Includes starting pack contents and equipped status directly on the sheet.

## Technology Stack

- **Core**: React.js with Vite
- **Styling**: Vanilla CSS (Premium Dark/Glassmorphism Theme)
- **Icons**: Lucide React
- **PDF Engine**: pdf-lib
- **Logic**: Centralized JS Computation Engine (`stats.js`)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1. Clone the repository: `git clone https://github.com/hardlynoticeable/tabaxi.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the generator at `http://localhost:5173`.

## License
This project is intended for personal use and is compatible with the D&D 5th Edition System Reference Document (SRD).
