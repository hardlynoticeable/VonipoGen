export const PARENT_SPECIES = {
    "Dragonborn": ["Black Dragonborn", "Blue Dragonborn", "Brass Dragonborn", "Bronze Dragonborn", "Copper Dragonborn", "Gold Dragonborn", "Green Dragonborn", "Red Dragonborn", "Silver Dragonborn", "White Dragonborn"],
    "Dwarf": ["Hill Dwarf", "Mountain Dwarf"],
    "Elf": ["High Elf", "Wood Elf", "Dark Elf (Drow)"],
    "Gnome": ["Forest Gnome", "Rock Gnome"],
    "Half-Elf": ["Half-Elf"],
    "Halfling": ["Lightfoot Halfling", "Stout Halfling"],
    "Half-Orc": ["Half-Orc"],
    "Human": ["Human"],
    "Tiefling": ["Tiefling"],
    "Tabaxi": ["Tabaxi"]
};

export const SPECIES = {
    "Black Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Black): You have resistance to Acid damage, and a Breath Weapon that shoots a 5 by 30 ft. line of Acid (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Blue Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Blue): You have resistance to Lightning damage, and a Breath Weapon that shoots a 5 by 30 ft. line of Lightning (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Brass Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Brass): You have resistance to Fire damage, and a Breath Weapon that shoots a 5 by 30 ft. line of Fire (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Bronze Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Bronze): You have resistance to Lightning damage, and a Breath Weapon that shoots a 5 by 30 ft. line of Lightning (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Copper Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Copper): You have resistance to Acid damage, and a Breath Weapon that shoots a 5 by 30 ft. line of Acid (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Gold Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Gold): You have resistance to Fire damage, and a Breath Weapon that shoots a 15 ft. cone of Fire (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Green Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Green): You have resistance to Poison damage, and a Breath Weapon that shoots a 15 ft. cone of Poison (Constitution save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Red Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Red): You have resistance to Fire damage, and a Breath Weapon that shoots a 15 ft. cone of Fire (Dexterity save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Silver Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (Silver): You have resistance to Cold damage, and a Breath Weapon that shoots a 15 ft. cone of Cold (Constitution save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "White Dragonborn": {
        description: "Dragonborn look very much like dragons standing erect in humanoid form.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 2, cha: 1 },
        traits: [
            "Draconic Ancestry (White): You have resistance to Cold damage, and a Breath Weapon that shoots a 15 ft. cone of Cold (Constitution save)."
        ],
        skills: [], languages: ["Common", "Draconic"]
    },
    "Hill Dwarf": {
        description: "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
        size: "Medium", speed: 25, darkvision: 60,
        abilityBonuses: { con: 2, wis: 1 },
        traits: [
            "Dwarven Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage.",
            "Dwarven Combat Training: You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
            "Tool Proficiency: You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
            "Stonecunning: You are considered proficient in History and add double your proficiency bonus for checks related to the origin of stonework.",
            "Dwarven Toughness: Your hit point maximum increases by 1, and it increases by 1 every time you gain a level."
        ],
        skills: [], languages: ["Common", "Dwarvish"]
    },
    "Mountain Dwarf": {
        description: "As a mountain dwarf, you're strong and hardy, accustomed to a difficult life in rugged terrain.",
        size: "Medium", speed: 25, darkvision: 60,
        abilityBonuses: { con: 2, str: 2 },
        traits: [
            "Dwarven Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage.",
            "Dwarven Combat Training: You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
            "Tool Proficiency: You gain proficiency with the artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
            "Stonecunning: You are considered proficient in History and add double your proficiency bonus for checks related to the origin of stonework.",
            "Dwarven Armor Training: You have proficiency with light and medium armor."
        ],
        skills: [], languages: ["Common", "Dwarvish"]
    },
    "High Elf": {
        description: "As a high elf, you have a keen mind and a mastery of at least the basics of magic.",
        size: "Medium", speed: 30, darkvision: 60,
        abilityBonuses: { dex: 2, int: 1 },
        traits: [
            "Fey Ancestry: You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
            "Trance: Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day.",
            "Elf Weapon Training: You have proficiency with the longsword, shortsword, shortbow, and longbow.",
            "Cantrip: You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it."
        ],
        skills: ["Perception"], languages: ["Common", "Elvish"]
    },
    "Wood Elf": {
        description: "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily.",
        size: "Medium", speed: 35, darkvision: 60,
        abilityBonuses: { dex: 2, wis: 1 },
        traits: [
            "Fey Ancestry: You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
            "Trance: Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day.",
            "Elf Weapon Training: You have proficiency with the longsword, shortsword, shortbow, and longbow.",
            "Fleet of Foot: Your base walking speed increases to 35 feet.",
            "Mask of the Wild: You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena."
        ],
        skills: ["Perception"], languages: ["Common", "Elvish"]
    },
    "Dark Elf (Drow)": {
        description: "Descended from an earlier subrace of dark-skinned elves, the drow were banished to the Underdark.",
        size: "Medium", speed: 30, darkvision: 120,    
        abilityBonuses: { dex: 2, cha: 1 },
        traits: [
            "Fey Ancestry: You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
            "Trance: Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day.",
            "Sunlight Sensitivity: You have disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight when you or your target are in direct sunlight.",
            "Drow Magic: You know the dancing lights cantrip. You can cast faerie fire and darkness at higher levels. Charisma is your spellcasting ability.",
            "Drow Weapon Training: You have proficiency with rapiers, shortswords, and hand crossbows."
        ],
        skills: ["Perception"], languages: ["Common", "Elvish"]
    },
    "Forest Gnome": {
        description: "As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth.",
        size: "Small", speed: 25, darkvision: 60,
        abilityBonuses: { int: 2, dex: 1 },
        traits: [
            "Gnome Cunning: You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
            "Natural Illusionist: You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
            "Speak with Small Beasts: Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts."
        ],
        skills: [], languages: ["Common", "Gnomish"]
    },
    "Rock Gnome": {
        description: "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.",
        size: "Small", speed: 25, darkvision: 60,
        abilityBonuses: { int: 2, con: 1 },
        traits: [
            "Gnome Cunning: You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
            "Artificer's Lore: Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus.",
            "Tinker: You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp to construct a Tiny clockwork device."
        ],
        skills: [], languages: ["Common", "Gnomish"]
    },
    "Half-Elf": {
        description: "Half-elves combine what some say are the best qualities of their elf and human parents.",
        size: "Medium", speed: 30, darkvision: 60,
        abilityBonuses: { cha: 2 },
        traits: [
            "Ability Score Increase: Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.",
            "Fey Ancestry: You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
            "Skill Versatility: You gain proficiency in two skills of your choice."
        ],
        skills: [], languages: ["Common", "Elvish"]
    },
    "Lightfoot Halfling": {
        description: "As a lightfoot halfling, you can easily hide from notice, even using other people as cover.",
        size: "Small", speed: 25, darkvision: 0,
        abilityBonuses: { dex: 2, cha: 1 },
        traits: [
            "Lucky: When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
            "Brave: You have advantage on saving throws against being frightened.",
            "Halfling Nimbleness: You can move through the space of any creature that is of a size larger than yours.",
            "Naturally Stealthy: You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you."
        ],
        skills: [], languages: ["Common", "Halfling"]
    },
    "Stout Halfling": {
        description: "As a stout halfling, you're hardier than average and have some resistance to poison.",
        size: "Small", speed: 25, darkvision: 0,
        abilityBonuses: { dex: 2, con: 1 },
        traits: [
            "Lucky: When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
            "Brave: You have advantage on saving throws against being frightened.",
            "Halfling Nimbleness: You can move through the space of any creature that is of a size larger than yours.",
            "Stout Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage."
        ],
        skills: [], languages: ["Common", "Halfling"]
    },
    "Half-Orc": {
        description: "Half-orcs reflect both elements of their parentage, possessing physical might and endurance.",
        size: "Medium", speed: 30, darkvision: 60,
        abilityBonuses: { str: 2, con: 1 },
        traits: [
            "Relentless Endurance: When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
            "Savage Attacks: When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
        ],
        skills: ["Intimidation"], languages: ["Common", "Orc"]
    },
    "Human": {
        description: "Humans are the most adaptable, flexible, and ambitious people among the common races.",
        size: "Medium", speed: 30, darkvision: 0,
        abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
        traits: [
            "Extra Language: You can speak, read, and write one extra language of your choice."
        ],
        skills: [], languages: ["Common"]
    },
    "Tiefling": {
        description: "Tieflings are derived from human bloodlines, their infernal heritage leaving a clear imprint on their appearance.",
        size: "Medium", speed: 30, darkvision: 60,
        abilityBonuses: { cha: 2, int: 1 },
        traits: [
            "Hellish Resistance: You have resistance to fire damage.",
            "Infernal Legacy: You know the thaumaturgy cantrip. You can cast hellish rebuke and darkness at higher levels. Charisma is your spellcasting ability for these spells."
        ],
        skills: [], languages: ["Common", "Infernal"]
    },
    "Tabaxi": {
        description: "Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity.",
        size: "Medium", speed: 30, climbSpeed: 30, darkvision: 60,
        abilityBonuses: { dex: 2, cha: 1 },
        traits: [
            "Cat's Claws: You have a climbing speed equal to your walking speed. In addition, your claws are natural weapons, dealing 1d6 + STR slashing damage.",
            "Cat's Talent: You have proficiency in the Perception and Stealth skills.",
            "Feline Agility: When you move on your turn in combat, you can double your speed until the end of the turn. Recharge: 0 movement turn."
        ],
        skills: ["Perception", "Stealth"], languages: ["Common"]
    }
};

export const APPEARANCES = {
    "Black Dragonborn": {
        eyes: ["Black", "Yellow", "Gold"],
        skin: ["Shiny Black Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Blue Dragonborn": {
        eyes: ["Blue", "Silver"],
        skin: ["Dull Blue Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Brass Dragonborn": {
        eyes: ["Brass", "Copper", "Gold"],
        skin: ["Polished Brass Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Bronze Dragonborn": {
        eyes: ["Bronze", "Copper", "Gold", "Green"],
        skin: ["Glimmering Bronze Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Copper Dragonborn": {
        eyes: ["Copper", "Gold"],
        skin: ["Ruddy Copper Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Gold Dragonborn": {
        eyes: ["Gold", "Silver", "Red"],
        skin: ["Gleaming Gold Scales"],
        hair: ["Horn-like crests", "Fleshy tendrils"]
    },
    "Green Dragonborn": {
        eyes: ["Green", "Yellow"],
        skin: ["Jade Green Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Red Dragonborn": {
        eyes: ["Red", "Gold", "Black"],
        skin: ["Crimson Red Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Silver Dragonborn": {
        eyes: ["Silver", "Blue", "White"],
        skin: ["Burnished Silver Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "White Dragonborn": {
        eyes: ["White", "Pale Blue", "Silver"],
        skin: ["Pale White Scales"],
        hair: ["Horn-like crests", "Thick cranial spikes"]
    },
    "Dwarf": {
        eyes: ["Brown", "Hazel", "Grey", "Deep Blue", "Pale Green"],
        skin: ["Light Brown", "Deep Tan", "Pale", "Ruddy", "Ashy"],
        hair: ["Black", "Grey", "Chestnut", "Fiery Red", "Braided Gold", "Thick Brown beard", "Braided Black"]
    },
    "Elf": {
        eyes: ["Green", "Gold", "Silver", "Blue", "Violet", "Amber"],
        skin: ["Alabaster", "Pale", "Tan", "Copper"],
        hair: ["Blonde", "Black", "Silver", "Copper"]
    },
    "Dark Elf (Drow)": {
        eyes: ["Lilac", "Silver", "Red", "Pale Yellow"],
        skin: ["Obsidian", "Charcoal", "Blue-Grey"],
        hair: ["White", "Pale Yellow", "Silver"]
    },
    "Gnome": {
        eyes: ["Glittering Black", "Bright Blue", "Hazel", "Green"],
        skin: ["Tan", "Nut Brown", "Pale", "Woody"],
        hair: ["Wild White", "Spiky Blonde", "Light Brown", "Fiery Orange"]
    },
    "Half-Elf": {
        eyes: ["Green", "Brown", "Blue", "Hazel", "Gold"],
        skin: ["Fair", "Tan", "Olive", "Deep Brown"],
        hair: ["Auburn", "Black", "Blonde", "Brown"]
    },
    "Halfling": {
        eyes: ["Brown", "Hazel", "Green"],
        skin: ["Ruddy", "Pale", "Tan"],
        hair: ["Curly Brown", "Sandy", "Black"]
    },
    "Half-Orc": {
        eyes: ["Yellow", "Red", "Black"],
        skin: ["Grey", "Green", "Olive", "Dark Green"],
        hair: ["Black", "Dark Brown", "Braided Black", "Shaved"]
    },
    "Human": {
        eyes: ["Brown", "Blue", "Green", "Hazel", "Grey"],
        skin: ["Fair", "Olive", "Tan", "Dark Brown", "Black"],
        hair: ["Black", "Brown", "Blonde", "Red", "Grey", "Bald"]
    },
    "Tiefling": {
        eyes: ["Solid Red", "Solid Black", "Solid White", "Solid Gold"],
        skin: ["Red", "Dark Red", "Purple", "Blue", "Human-like"],
        hair: ["Black", "Red", "Dark Blue", "Purple", "Horns only"]
    },
    "Tabaxi": {
        eyes: ["Green", "Yellow", "Gold", "Blue"],
        skin: ["Spotted coat", "Striped coat", "Black fur", "Tawny fur", "Snow leopard fur"],
        hair: ["Tufted ears", "Mane", "Sleek fur"]
    }
};
