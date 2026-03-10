// Script to find spells in SPELL_LIST that lack entries in SPELL_DESCRIPTIONS
const fs = require('fs');
const path = require('path');

const spellsFile = path.resolve('c:/Users/steph/OneDrive/Documents/Tabaxi Generator/src/data/spells5e.js');
const descFile = path.resolve('c:/Users/steph/OneDrive/Documents/Tabaxi Generator/src/data/spellDescriptions.js');

const spellsText = fs.readFileSync(spellsFile, 'utf8');
const descText = fs.readFileSync(descFile, 'utf8');

// Extract spell names from SPELL_LIST arrays
let spellNames = [];
const listRegex = /\[([^\]]+)\]/g; // matches content inside []
let match;
while ((match = listRegex.exec(spellsText)) !== null) {
    const inner = match[1];
    const nameMatches = inner.match(/'([^']+)'/g);
    if (nameMatches) {
        nameMatches.forEach(n => {
            const name = n.slice(1, -1);
            spellNames.push(name);
        });
    }
}

// Extract described spell keys from SPELL_DESCRIPTIONS object
let described = [];
const descKeyRegex = /"([^"]+)"\s*:/g;
while ((match = descKeyRegex.exec(descText)) !== null) {
    described.push(match[1]);
}

// Find missing spells
const missing = spellNames.filter(s => !described.includes(s));

// Output each missing spell on its own line
console.log(missing.join('\n'));
