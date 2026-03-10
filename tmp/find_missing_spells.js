const fs = require('fs');
const spellsPath = 'c:/Users/steph/OneDrive/Documents/Tabaxi Generator/src/data/spells5e.js';
const descPath = 'c:/Users/steph/OneDrive/Documents/Tabaxi Generator/src/data/spellDescriptions.js';
const spellsText = fs.readFileSync(spellsPath, 'utf8');
const descText = fs.readFileSync(descPath, 'utf8');
// extract spell names from SPELL_LIST
let spellNames = [];
const spellListRegex = /\[([^\]]+)\]/g; // matches array content
let match;
while ((match = spellListRegex.exec(spellsText)) !== null) {
    const inner = match[1];
    const nameMatches = inner.match(/'([^']+)'/g);
    if (nameMatches) {
        nameMatches.forEach(n => {
            const name = n.slice(1, -1);
            spellNames.push(name);
        });
    }
}
// extract described spell names from SPELL_DESCRIPTIONS
let described = [];
const descRegex = /"([^"]+)"\s*:/g;
while ((match = descRegex.exec(descText)) !== null) {
    described.push(match[1]);
}
const missing = spellNames.filter(s => !described.includes(s));
console.log(missing.join('\n'));
