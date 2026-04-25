# Vonipo Character Generator

A comprehensive, multi-species character construction tool for Dungeons & Dragons 5th Edition. Designed with a premium "Amethyst Purple" aesthetic, this tool streamlines the journey from concept to a professional, table-ready PDF character sheet.

**Try it out:** [charactergenerator.vonipo.com](https://charactergenerator.vonipo.com)

## Key Features

### Universal Species Engine
Includes all standard Player's Handbook species with detailed sub-species mechanics (e.g., Draconic Ancestry for Dragonborns, Hill/Mountain Dwarfs). The engine is species-agnostic, allowing for easy expansion and consistent trait integration.

### Progressive Web App (PWA)
Installable on desktop and mobile for a premium, app-like experience. Features full offline support via service workers, ensuring your character data is always accessible at the table.

### Comprehensive Subclass Expansion
Access over **50+ official subclasses** from *Xanathar's Guide to Everything* and *Tasha's Cauldron of Everything*.
- **Full Coverage**: Every class (from Artificer to Wizard) includes its most popular official specializations.
- **Smart UI**: Dynamic transitions for additional choices (like the Warlock's **Genie Kind**).

### Real-Time Build Validation
Integrated warning system that provides live feedback on your build:
- Missing essentials (Alignment, Languages, Background).
- Unspent resource alerts (Skill points, Spells).
- Critical gear reminders (Unequipped shields, missing attunements).

### High-Fidelity PDF Exports
Generates an expertly form-filled **Standard WOTC D&D 5e Character Sheet**:
- **Smart Typography**: Dynamic font-scaling for complex fields.
- **Full Mapping**: Identity traits, equipment lists, and spellbooks are fully synchronized.

## Advanced Data Systems

- **Inventory Integration**: Automated AC calculations, stealth disadvantage detection, and two-handed weapon validation.
- **Spellcasting Lib**: A library of over 1,000+ spells with automated DC and Attack modifier computation.
- **Lore Rendering**: Detailed racial history and trait breakdowns for every species.

## Technology Stack

- **Framework**: React.js 19 + Vite 7
- **Styling**: Tailwind CSS v4 (Custom Amethyst Theme)
- **Icons**: Lucide React
- **PDF Engine**: pdf-lib

## Getting Started

1. Clone the repository: `git clone https://github.com/hardlynoticeable/VonipoGen.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## License
Personal project compatible with the D&D 5th Edition System Reference Document (SRD).
