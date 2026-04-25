const fs = require('fs');
const path = require('path');

async function run() {
    const filePath = path.join(__dirname, '../src/data/equipment.js');
    let content = fs.readFileSync(filePath, 'utf8');

    // Rather than parsing JSON (which fails due to ES6 export), 
    // we'll dynamically import, modify, and rewrite.

    const m = await import('file:///' + filePath.replace(/\\/g, '/'));
    const db = m.EQUIPMENT_DB;

    const missingWeapons = [
        { "Item": "Light hammer", "Type": "Simple Melee", "Cost": "2 gp", "Damage": "1d4 bludg.", "Properties": "Light, Thrown (20/60)" },
        { "Item": "Sickle", "Type": "Simple Melee", "Cost": "1 gp", "Damage": "1d4 slash.", "Properties": "Light" },
        { "Item": "Dart", "Type": "Simple Ranged", "Cost": "5 cp", "Damage": "1d4 pierc.", "Properties": "Finesse, Thrown (20/60)" },
        { "Item": "Sling", "Type": "Simple Ranged", "Cost": "1 sp", "Damage": "1d4 bludg.", "Properties": "Ammunition (30/120)" },
        { "Item": "Flail", "Type": "Martial Melee", "Cost": "10 gp", "Damage": "1d8 bludg.", "Properties": "—" },
        { "Item": "Glaive", "Type": "Martial Melee", "Cost": "20 gp", "Damage": "1d10 slash.", "Properties": "Heavy, Reach, Two-handed" },
        { "Item": "Halberd", "Type": "Martial Melee", "Cost": "20 gp", "Damage": "1d10 slash.", "Properties": "Heavy, Reach, Two-handed" },
        { "Item": "Lance", "Type": "Martial Melee", "Cost": "10 gp", "Damage": "1d12 pierc.", "Properties": "Reach, Special" },
        { "Item": "Morningstar", "Type": "Martial Melee", "Cost": "15 gp", "Damage": "1d8 pierc.", "Properties": "—" },
        { "Item": "Pike", "Type": "Martial Melee", "Cost": "5 gp", "Damage": "1d10 pierc.", "Properties": "Heavy, Reach, Two-handed" },
        { "Item": "Trident", "Type": "Martial Melee", "Cost": "5 gp", "Damage": "1d6 pierc.", "Properties": "Thrown (20/60), Versatile (1d8)" },
        { "Item": "War pick", "Type": "Martial Melee", "Cost": "5 gp", "Damage": "1d8 pierc.", "Properties": "—" },
        { "Item": "Whip", "Type": "Martial Melee", "Cost": "2 gp", "Damage": "1d4 slash.", "Properties": "Finesse, Reach" },
        { "Item": "Blowgun", "Type": "Martial Ranged", "Cost": "10 gp", "Damage": "1 pierc.", "Properties": "Ammunition (25/100), Loading" },
        { "Item": "Hand Crossbow", "Type": "Martial Ranged", "Cost": "75 gp", "Damage": "1d6 pierc.", "Properties": "Ammunition (30/120), Light, Loading" },
        { "Item": "Heavy Crossbow", "Type": "Martial Ranged", "Cost": "50 gp", "Damage": "1d10 pierc.", "Properties": "Ammunition (50/200), Heavy, Loading, Two-handed" },
        { "Item": "Net", "Type": "Martial Ranged", "Cost": "1 gp", "Damage": "—", "Properties": "Special, Thrown (5/15)" }
    ].map(item => ({ ...item, equipped_slot: "Weapon" }));

    // Filter out if they already exist
    const existingNames = new Set(db.weapons.map(w => w.Item.toLowerCase()));
    for (const w of missingWeapons) {
        if (!existingNames.has(w.Item.toLowerCase())) {
            db.weapons.push(w);
        }
    }

    // Write it back
    const outputContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Run scripts/parseEquipment.cjs to update

export const EQUIPMENT_DB = ${JSON.stringify(db, null, 4)};\n`;

    fs.writeFileSync(filePath, outputContent);
    console.log('Appended weapons successfully');
}
run();
