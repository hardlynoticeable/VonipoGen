import { CLASSES, SUBCLASSES } from '../data/rules5e';
import { SPELL_LIST, SPELLCASTING_PROGRESSIONS } from '../data/spells5e';
import { inferEquippedSlot } from './stats';

export function getCharacterWarnings(data) {
    const warnings = [];
    const level = Number(data.level) || 1;
    const charClass = data.class ? CLASSES[data.class] : null;

    // 1. Equipment
    const inventory = Array.isArray(data.inventory) ? data.inventory : [];
    const hasWeapons = inventory.some(i => inferEquippedSlot(i) === 'Weapon');
    const hasArmor = inventory.some(i => inferEquippedSlot(i) === 'Armor');
    const equippedWeapons = inventory.filter(i => inferEquippedSlot(i) === 'Weapon' && i.isEquipped);
    const equippedArmor = inventory.filter(i => inferEquippedSlot(i) === 'Armor' && i.isEquipped);

    if (hasWeapons && equippedWeapons.length === 0) {
        warnings.push("You have weapons in your inventory but none are equipped.");
    }
    if (hasArmor && equippedArmor.length === 0) {
        warnings.push("You have armor in your inventory but none is equipped.");
    }

    // 2. Class & Subclass
    if (!data.class) {
        warnings.push("No class selected.");
    } else {
        const subclassLevel = charClass.subclassLevel || 3;
        if (level >= subclassLevel && !data.subclass) {
            warnings.push(`You have reached level ${subclassLevel} but haven't selected a ${charClass.subclassTitle || 'Subclass'}.`);
        }
        if (data.subclass) {
            const scData = SUBCLASSES[data.class]?.[data.subclass];
            if (scData?.subclassOptions && !data.subclassOption) {
                warnings.push(`You haven't selected an option for your ${data.subclass} subclass (${scData.subclassOptions.title}).`);
            }
        }
    }

    // 3. Background & Alignment & Language & Species
    if (!data.parentSpecies) warnings.push("No species selected.");
    if (data.parentSpecies && !data.species) warnings.push("No sub-species/ancestry selected.");
    if (!data.background) warnings.push("No background selected.");
    if (!data.alignment) warnings.push("No alignment selected.");
    if (!data.language) warnings.push("No bonus language selected.");

    // 4. Skills
    if (charClass) {
        const selectedSkillsCount = (data.selectedClassSkills || []).length;
        if (selectedSkillsCount < charClass.skillChoices) {
            warnings.push(`You can select ${charClass.skillChoices - selectedSkillsCount} more class skills.`);
        }
    }

    // 5. Ability Scores & Bonuses
    const scores = Object.values(data.abilityScores || {});
    if (scores.length < 6 || scores.some(s => s === "" || s === 0)) {
        warnings.push("Ability scores are incomplete.");
    }

    // 6. Spells
    if (charClass?.spellcasting) {
        const sc = charClass.spellcasting;
        const ability = sc.ability;
        const score = Number(data.abilityScores?.[ability]) || 10;
        const bonus = data.abilityBonuses?.[ability] || 0;
        const mod = Math.floor((score + bonus - 10) / 2);

        // Cantrips
        const cantripsKnown = sc.cantripsKnown[level - 1] || 0;
        const selectedCantripsCount = (data.selectedCantrips || []).length;
        if (selectedCantripsCount < cantripsKnown) {
            warnings.push(`You can select ${cantripsKnown - selectedCantripsCount} more cantrips.`);
        }

        // Leveled Spells
        let maxPreparedOrKnown = sc.spellsKnown ? sc.spellsKnown[level - 1] : 0;
        if (sc.type === 'prepared') {
            if (data.class === 'Paladin' || data.class === 'Artificer') {
                maxPreparedOrKnown = Math.max(1, Math.floor(level / 2) + mod);
            } else {
                maxPreparedOrKnown = Math.max(1, level + mod);
            }
        }

        if (maxPreparedOrKnown > 0) {
            const subclassSpells = data.subclass && SUBCLASSES[data.class]?.[data.subclass]?.spells ?
                Object.values(SUBCLASSES[data.class][data.subclass].spells).flat() : [];

            const selectedSpells = data.selectedSpells || {};
            const totalSelectedLeveled = Object.entries(selectedSpells).reduce((total, [lvl, spells]) => {
                const domainSpells = (data.subclass && SUBCLASSES[data.class]?.[data.subclass]?.spells?.[lvl]) || [];
                const classSpells = SPELL_LIST[data.class]?.[lvl] || [];
                const validAvailableSpells = [...new Set([...classSpells, ...domainSpells])];

                const manuallySelected = (spells || []).filter(s =>
                    !domainSpells.includes(s) && validAvailableSpells.includes(s)
                );
                return total + manuallySelected.length;
            }, 0);

            if (totalSelectedLeveled < maxPreparedOrKnown) {
                warnings.push(`You can ${sc.type === 'prepared' ? 'prepare' : 'learn'} ${maxPreparedOrKnown - totalSelectedLeveled} more leveled spells.`);
            }
        }
    }

    // 7. Attunement
    const attuableItems = inventory.filter(i => i.attunement === true || i.attunement === 'true');
    const attunedItems = inventory.filter(i => (i.attunement === true || i.attunement === 'true') && i.isAttuned);
    if (attuableItems.length > 0 && attunedItems.length === 0) {
        warnings.push("You have magic items that require attunement but haven't attuned any.");
    }

    return warnings;
}
