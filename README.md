# Vonipo Character Generator

A comprehensive, high-fidelity character construction tool for Dungeons & Dragons 5th Edition, designed to support all core species and subclasses. This application streamlines the journey from concept to a professional, table-ready PDF character sheet.

**Try it out:** [charactergenerator.vonipo.com](https://charactergenerator.vonipo.com)

## Key Features

### Complete Species Support
Includes all standard Player's Handbook species with detailed sub-species mechanics (e.g., Draconic Ancestry for Dragonborns, Hill/Mountain Dwarfs). Seamlessly integrates racial traits directly into the stat and validation logic.

### Progressive Web App (PWA)
Installable on desktop and mobile for a premium, app-like experience. Features full offline support via service workers, ensuring your character data is always accessible even without an internet connection.

### Comprehensive Subclass Expansion
Access over **50+ official subclasses** from *Xanathar's Guide to Everything* and *Tasha's Cauldron of Everything*.
- **Full Coverage**: Every class (from Artificer to Wizard) now includes its most popular official specializations.
- **Smart UI**: Subclasses with additional choices (like the Warlock's **Genie Kind**) automatically trigger a smooth-scroll transition to their specific options.

### Character Creation Warnings
Built-in validation system that keeps your build on track. The **Review** tab provides alerts for:
- Missing essentials (Species, Alignment, Languages).
- Unspent skill points or unselected spells.
- Reminders for unequipped items or unattuned magic artifacts.

### High-Utility Inventory Management
- **Modal-Driven Database**: Access thousands of items (Weapons, Armor, Gear) through a searchable modal interface.
- **Inventory Aggregation**: Instantly track exactly how many instances of an item (e.g. Torches) are currently inside your backpack, including starter pack items.
- **Weapon & Armor Stats**: Immediately see exactly how your damage rolls or AC metrics will change, including two-handed statuses and stealth disadvantages.
- **Constraint Warnings**: Automatic alerts if a two-handed weapon is equipped alongside a shield.

### Advanced Spellcasting System
- **1,000+ Spell Library**: Comprehensive database including interactive descriptions.
- **Subclass Integration**: Detects and adds granted spells (e.g., Sorcerous Bloodline or Cleric Domain spells).
- **Automated Calculations**: Instant computation of Spell Save DC and Attack Modifiers.

### Pro-Grade PDF Generation
Generates an expertly form-filled **Standard WOTC D&D 5e Character Sheet**:
- **Smart Typography**: Dynamic font-scaling for complex fields to ensure maximum readability.
- **Automated Mapping**: All identity traits, equipment lists, and spells are securely mapped.

## Technology Stack

- **Core**: React.js with Vite
- **Styling**: Tailwind CSS (Premium Amethyst UI Theme)
- **Icons**: Lucide React
- **PDF Engine**: pdf-lib
- **Logic**: Centralized JS Computation Engine (`src/utils/stats.js`)

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build the application for deployment: `npm run build`

## License
This project is intended for personal use and is compatible with the D&D 5th Edition System Reference Document (SRD).
