const fs = require('fs');

const NEW_DESCRIPTIONS = {
    "Booming Blade": "You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes 1d8 thunder damage, and the spell ends.",
    "Green-Flame Blade": "You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects, and you can cause green fire to leap from the target to a different creature of your choice that you can see within 5 feet of it. The second creature takes fire damage equal to your spellcasting ability modifier.",
    "Lightning Lure": "You create a lash of lightning energy that strikes at one creature of your choice that you can see within 15 feet of you. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you.",
    "Sword Burst": "You create a momentary circle of spectral blades that sweep around you. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 force damage."
};

const filePath = 'src/data/spellDescriptions.js';
let content = fs.readFileSync(filePath, 'utf8');

let newContentBlock = '';
for (const [spell, description] of Object.entries(NEW_DESCRIPTIONS)) {
    if (!content.includes(`"${spell}":`)) {
        newContentBlock += `    "${spell}": ${JSON.stringify(description)},\n`;
    }
}

const lastBraceIndex = content.lastIndexOf('}');
if (lastBraceIndex !== -1 && newContentBlock.length > 0) {
    let before = content.slice(0, lastBraceIndex);
    before = before.trimEnd();
    if (!before.endsWith(',') && !before.endsWith('{')) {
        before += ',';
    }
    before += '\n';
    const finalContent = before + newContentBlock + '};\n';
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log("Appended the final 4 spell descriptions.");
} else {
    console.log("No missing descriptions to append.");
}
