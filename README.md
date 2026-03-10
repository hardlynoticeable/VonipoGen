# Tabaxi Character Generator

A premium, interactive web application designed for generating and managing **Tabaxi** characters for Dungeons & Dragons 5th Edition. This tool streamlines the character creation process from initial concept to a ready-to-play PDF character sheet.

## 🌟 Key Features

### 🐱 Tabaxi Specialization
- Automatically handles race-specific traits like **Darkvision**, **Feline Agility**, and **Cat's Claws**.
- Dynamic sizing (Small or Medium) as per updated Mordenkainen's rules.
- Race-appropriate randomization for height, weight, and feline appearances.

### 🎒 Advanced Inventory Management
- **Extensive Database**: Access a library of over 5,000 D&D items.
- **Slot System**: Smart enforcement for equipped gear (Head, Neck, Ring, etc.).
- **Weapon Tracking**: Manage up to 3 active weapons with automatic attack/damage calculation.
- **Attunement Tracking**: Real-time enforcement of attunement limits (including Artificer bonuses).
- **Starting Packs**: Quick-select standard equipment packs (Explorer's, Burglar's, etc.).

### 💰 Wealth & Treasure
- Dedicated tracking for **CP, SP, EP, GP, and PP**.
- Manual Treasure recording for non-standard loot (gems, art objects, artifacts).

### 📝 Lore & Personality
- Integrated editors for **Traits, Ideals, Bonds, and Flaws**.
- Multi-line backstory support for deep character development.

### 📄 Professional PDF Export
- Generates a complete, form-filled D&D 5e character sheet.
- Intelligent mapping logic ensures physical traits, lore, and inventory are perfectly placed.
- Optimized font sizes for readability in long text fields.

## 🛠️ Technology Stack

- **Frontend**: React.js with Vite
- **Styling**: Vanilla CSS (Premium Dark Theme)
- **Icons**: Lucide React
- **PDF Logic**: pdf-lib
- **State Management**: React Hooks (useState, useEffect, useMemo)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hardlynoticeable/tabaxi.git
   cd tabaxi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### PDF Template

The generator requires a base PDF template located at `public/assets/CharacterSheet.pdf`. Ensure this file is present for the export functionality to work.

## 🤝 Contributing

Contributions are welcome! Whether it's adding new features, fixing bugs, or improving the UI, feel free to submit a pull request.

## 📜 License

This project is intended for personal use and is compatible with the D&D 5e System Reference Document (SRD).
