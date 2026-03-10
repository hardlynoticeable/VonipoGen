import { SPELL_LIST } from '../src/data/spells5e.js';
import { SPELL_DESCRIPTIONS } from '../src/data/spellDescriptions.js';
import fs from 'fs';

const allSpells = new Set();
for (const classSpells of Object.values(SPELL_LIST)) {
    for (const levelSpells of Object.values(classSpells)) {
        for (const spell of levelSpells) {
            allSpells.add(spell);
        }
    }
}

const missingSpells = [];
for (const spell of allSpells) {
    if (!SPELL_DESCRIPTIONS[spell]) {
        missingSpells.push(spell);
    }
}

console.log(`Total Spells: ${allSpells.size}`);
console.log(`Missing Descriptions: ${missingSpells.length}`);
console.log(missingSpells.join('\n'));
