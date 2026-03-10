export const SKILLS = {
    Acrobatics: 'dex',
    'Animal Handling': 'wis',
    Arcana: 'int',
    Athletics: 'str',
    Deception: 'cha',
    History: 'int',
    Insight: 'wis',
    Intimidation: 'cha',
    Investigation: 'int',
    Medicine: 'wis',
    Nature: 'int',
    Perception: 'wis',
    Performance: 'cha',
    Persuasion: 'cha',
    Religion: 'int',
    'Sleight of Hand': 'dex',
    Stealth: 'dex',
    Survival: 'wis'
};

export const CLASSES = {
    Artificer: {
        hitDie: 8,
        saves: ['int', 'con'],
        primaryAbilities: ['int', 'con'],
        abilityAdvice: "Intelligence powers your spells and magical inventions, while Constitution keeps you alive in combat.",
        skillChoices: 2,
        skillOptions: ['Arcana', 'History', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Sleight of Hand'],
        armorProficiencies: ['Light', 'Medium', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged'],
        toolProficiencies: ["Thieves' tools", "Tinker's tools", "One type of artisan's tools"],
        spellcasting: {
            ability: 'int',
            type: 'prepared',
            progression: 'artificer',
            cantripsKnown: [2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4]
        },
        features: {
            1: ['Magical Tinkering'],
            2: ['Infuse Item'],
            3: ['The Right Tool for the Job'],
            6: ['Tool Expertise'],
            7: ['Flash of Genius'],
            10: ['Magic Item Adept'],
            11: ['Spell-Storing Item'],
            14: ['Magic Item Savant'],
            18: ['Magic Item Master'],
            20: ['Soul of Artifice']
        },
        subclassLevel: 3,
        subclassTitle: "Artificer Specialist"
    },
    Barbarian: {
        hitDie: 12,
        saves: ['str', 'con'],
        primaryAbilities: ['str', 'con'],
        abilityAdvice: "Strength powers your massive melee attacks, and Constitution boosts your hit points and fuels your Unarmored Defense.",
        skillChoices: 2,
        skillOptions: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
        armorProficiencies: ['Light', 'Medium', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Martial Melee', 'Martial Ranged'],
        features: {
            1: ['Rage', 'Unarmored Defense'],
            2: ['Reckless Attack', 'Danger Sense'],
            5: ['Extra Attack', 'Fast Movement'],
            7: ['Feral Instinct'],
            9: ['Brutal Critical (1 die)'],
            11: ['Relentless Rage'],
            13: ['Brutal Critical (2 dice)'],
            15: ['Persistent Rage'],
            17: ['Brutal Critical (3 dice)'],
            18: ['Indomitable Might'],
            20: ['Primal Champion']
        },
        subclassLevel: 3,
        subclassTitle: "Primal Path"
    },
    Bard: {
        hitDie: 8,
        saves: ['dex', 'cha'],
        primaryAbilities: ['cha', 'dex'],
        abilityAdvice: "Charisma determines your spellcasting power, while Dexterity protects you in light armor and powers finesse weapons.",
        skillChoices: 3,
        skillOptions: Object.keys(SKILLS), // Any 3 skills
        armorProficiencies: ['Light'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Hand Crossbow', 'Longsword', 'Rapier', 'Shortsword'],
        spellcasting: {
            ability: 'cha',
            type: 'known',
            progression: 'full',
            cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            spellsKnown: [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22]
        },
        features: {
            1: ['Bardic Inspiration (d6)'],
            2: ['Jack of All Trades', 'Song of Rest (d6)'],
            3: ['Expertise'],
            5: ['Bardic Inspiration (d8)', 'Font of Inspiration'],
            6: ['Countercharm'],
            9: ['Song of Rest (d8)'],
            10: ['Bardic Inspiration (d10)', 'Expertise', 'Magical Secrets'],
            13: ['Song of Rest (d10)'],
            14: ['Magical Secrets'],
            15: ['Bardic Inspiration (d12)'],
            17: ['Song of Rest (d12)'],
            18: ['Magical Secrets'],
            20: ['Superior Inspiration']
        },
        subclassLevel: 3,
        subclassTitle: "Bard College"
    },
    Cleric: {
        hitDie: 8,
        saves: ['wis', 'cha'],
        primaryAbilities: ['wis', 'str', 'con'],
        abilityAdvice: "Wisdom dictates how potent your divine spells are. Depending on your domain, emphasize Strength for melee combat or Constitution for survivability.",
        skillChoices: 2,
        skillOptions: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['Light', 'Medium', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged'],
        spellcasting: {
            ability: 'wis',
            type: 'prepared',
            progression: 'full',
            cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        },
        features: {
            2: ['Channel Divinity (1/rest)', 'Turn Undead'],
            5: ['Destroy Undead (CR 1/2)'],
            6: ['Channel Divinity (2/rest)'],
            8: ['Destroy Undead (CR 1)'],
            10: ['Divine Intervention'],
            11: ['Destroy Undead (CR 2)'],
            14: ['Destroy Undead (CR 3)'],
            17: ['Destroy Undead (CR 4)'],
            18: ['Channel Divinity (3/rest)'],
            20: ['Divine Intervention Improvement']
        },
        subclassLevel: 1,
        subclassTitle: "Divine Domain"
    },
    Druid: {
        hitDie: 8,
        saves: ['int', 'wis'],
        primaryAbilities: ['wis', 'con'],
        abilityAdvice: "Wisdom powers your connection to nature's magic. Constitution ensures you can take a hit, especially when Wild Shaped.",
        skillChoices: 2,
        skillOptions: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
        armorProficiencies: ['Light', 'Medium', 'Shield'], // Note: Non-metal omitted for simplicity
        weaponProficiencies: ['Club', 'Dagger', 'Dart', 'Javelin', 'Mace', 'Quarterstaff', 'Scimitar', 'Sickle', 'Sling', 'Spear'],
        spellcasting: {
            ability: 'wis',
            type: 'prepared',
            progression: 'full',
            cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
        },
        features: {
            1: ['Druidic'],
            2: ['Wild Shape'],
            4: ['Wild Shape Improvement'],
            8: ['Wild Shape Improvement'],
            18: ['Timeless Body', 'Beast Spells'],
            20: ['Archdruid']
        },
        subclassLevel: 2,
        subclassTitle: "Druid Circle"
    },
    Fighter: {
        hitDie: 10,
        saves: ['str', 'con'],
        primaryAbilities: ['str', 'dex', 'con'],
        abilityAdvice: "Prioritize Strength for heavy weapons or Dexterity for archery and finesse combat. Constitution is vital for front-line survivability.",
        skillChoices: 2,
        skillOptions: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
        armorProficiencies: ['Light', 'Medium', 'Heavy', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Martial Melee', 'Martial Ranged'],
        features: {
            1: ['Fighting Style', 'Second Wind'],
            2: ['Action Surge (one use)'],
            5: ['Extra Attack'],
            9: ['Indomitable (one use)'],
            11: ['Extra Attack (2)'],
            13: ['Indomitable (two uses)'],
            17: ['Action Surge (two uses)', 'Indomitable (three uses)'],
            20: ['Extra Attack (3)']
        },
        subclassLevel: 3,
        subclassTitle: "Martial Archetype"
    },
    Monk: {
        hitDie: 8,
        saves: ['str', 'dex'],
        primaryAbilities: ['dex', 'wis'],
        abilityAdvice: "Dexterity fuels your martial arts and evasiveness, while Wisdom empowers your Ki abilities and adds to your Unarmored Defense.",
        skillChoices: 2,
        skillOptions: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
        armorProficiencies: [],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Shortsword'],
        features: {
            1: ['Unarmored Defense', 'Martial Arts'],
            2: ['Ki', 'Unarmored Movement'],
            3: ['Deflect Missiles'],
            4: ['Slow Fall'],
            5: ['Extra Attack', 'Stunning Strike'],
            6: ['Ki-Empowered Strikes'],
            7: ['Evasion', 'Stillness of Mind'],
            10: ['Purity of Body'],
            13: ['Tongue of the Sun and Moon'],
            14: ['Diamond Soul'],
            15: ['Timeless Body'],
            18: ['Empty Body'],
            20: ['Perfect Self']
        },
        subclassLevel: 3,
        subclassTitle: "Monastic Tradition"
    },
    Paladin: {
        hitDie: 10,
        saves: ['wis', 'cha'],
        primaryAbilities: ['str', 'cha'],
        abilityAdvice: "Strength lets you hit hard and wear heavy armor. Charisma commands your divine magic, auras, and saving throws.",
        skillChoices: 2,
        skillOptions: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['Light', 'Medium', 'Heavy', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Martial Melee', 'Martial Ranged'],
        spellcasting: {
            ability: 'cha',
            type: 'prepared',
            progression: 'half',
            cantripsKnown: Array(20).fill(0)
        },
        features: {
            1: ['Divine Sense', 'Lay on Hands'],
            2: ['Fighting Style', 'Divine Smite'],
            3: ['Divine Health'],
            5: ['Extra Attack'],
            6: ['Aura of Protection'],
            10: ['Aura of Courage'],
            11: ['Improved Divine Smite'],
            14: ['Cleansing Touch'],
            18: ['Aura Improvements']
        },
        subclassLevel: 3,
        subclassTitle: "Sacred Oath"
    },
    Ranger: {
        hitDie: 10,
        saves: ['str', 'dex'],
        primaryAbilities: ['dex', 'wis'],
        abilityAdvice: "Dexterity powers your archery, finesse weapons, and stealth. Wisdom attunes you to the wild and powers your spellcasting.",
        skillChoices: 3,
        skillOptions: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
        armorProficiencies: ['Light', 'Medium', 'Shield'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Martial Melee', 'Martial Ranged'],
        spellcasting: {
            ability: 'wis',
            type: 'known',
            progression: 'half',
            cantripsKnown: Array(20).fill(0),
            spellsKnown: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
        },
        features: {
            1: ['Favored Enemy', 'Natural Explorer'],
            2: ['Fighting Style'],
            3: ['Primeval Awareness'],
            5: ['Extra Attack'],
            8: ['Land\'s Stride'],
            10: ['Hide in Plain Sight'],
            14: ['Vanish'],
            18: ['Feral Senses'],
            20: ['Foe Slayer']
        },
        subclassLevel: 3,
        subclassTitle: "Ranger Archetype"
    },
    Rogue: {
        hitDie: 8,
        saves: ['dex', 'int'],
        primaryAbilities: ['dex', 'int', 'cha'],
        abilityAdvice: "Dexterity is the golden rule for stealth and Sneak Attack. Beyond that, boost Intelligence if you are an Arcane Trickster/Investigator, or Charisma if you want to be a charming Swashbuckler.",
        skillChoices: 4,
        skillOptions: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'],
        armorProficiencies: ['Light'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged', 'Hand Crossbow', 'Longsword', 'Rapier', 'Shortsword'],
        features: {
            1: ['Expertise', 'Sneak Attack', 'Thieves\' Cant'],
            2: ['Cunning Action'],
            5: ['Uncanny Dodge'],
            6: ['Expertise'],
            7: ['Evasion'],
            11: ['Reliable Talent'],
            14: ['Blindsense'],
            15: ['Slippery Mind'],
            18: ['Elusive'],
            20: ['Stroke of Luck']
        },
        subclassLevel: 3,
        subclassTitle: "Roguish Archetype"
    },
    Sorcerer: {
        hitDie: 6,
        saves: ['con', 'cha'],
        primaryAbilities: ['cha', 'con'],
        abilityAdvice: "Charisma dictates your innate magical potential. Constitution is vital for maintaining Concentration on spells and buffering your small d6 hit points.",
        skillChoices: 2,
        skillOptions: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
        armorProficiencies: [],
        weaponProficiencies: ['Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
        spellcasting: {
            ability: 'cha',
            type: 'known',
            progression: 'full',
            cantripsKnown: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
            spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
        },
        features: {
            2: ['Font of Magic'],
            3: ['Metamagic'],
            10: ['Metamagic'],
            17: ['Metamagic'],
            20: ['Sorcerous Restoration']
        },
        subclassLevel: 1,
        subclassTitle: "Sorcerous Origin"
    },
    Warlock: {
        hitDie: 8,
        saves: ['wis', 'cha'],
        primaryAbilities: ['cha', 'con'],
        abilityAdvice: "Charisma powers your Eldritch Blasts and Pact Magic. Constitution helps you maintain concentration and survive close calls.",
        skillChoices: 2,
        skillOptions: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'],
        armorProficiencies: ['Light'],
        weaponProficiencies: ['Simple Melee', 'Simple Ranged'],
        spellcasting: {
            ability: 'cha',
            type: 'known',
            progression: 'warlock',
            cantripsKnown: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            spellsKnown: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
        },
        features: {
            2: ['Eldritch Invocations'],
            3: ['Pact Boon'],
            11: ['Mystic Arcanum (6th level)'],
            13: ['Mystic Arcanum (7th level)'],
            15: ['Mystic Arcanum (8th level)'],
            17: ['Mystic Arcanum (9th level)'],
            20: ['Eldritch Master']
        },
        subclassLevel: 1,
        subclassTitle: "Otherworldly Patron"
    },
    Wizard: {
        hitDie: 6,
        saves: ['int', 'wis'],
        primaryAbilities: ['int', 'con', 'dex'],
        abilityAdvice: "Intelligence is everything: it dictates how many spells you can prepare and how hard they hit. Use your remaining points on Dexterity (for Armor Class) and Constitution (for Concentration and HP).",
        skillChoices: 2,
        skillOptions: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
        armorProficiencies: [],
        weaponProficiencies: ['Dagger', 'Dart', 'Sling', 'Quarterstaff', 'Light Crossbow'],
        spellcasting: {
            ability: 'int',
            type: 'prepared',
            progression: 'full',
            cantripsKnown: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        },
        features: {
            1: ['Arcane Recovery'],
            18: ['Spell Mastery'],
            20: ['Signature Spells']
        },
        subclassLevel: 2,
        subclassTitle: "Arcane Tradition"
    }
};

export const SUBCLASSES = {
    Barbarian: {
        'Path of the Berserker': {
            description: 'For some barbarians, rage is a means to an end—that end being violence.',
            level3: 'Frenzy: Gain a bonus action melee attack while raging (gain exhaustion when rage ends).',
            level6: 'Mindless Rage: Can\'t be charmed or frightened while raging.'
        },
        'Path of the Totem Warrior': {
            description: 'Your totem animal is a spirit guide that provides you with supernatural might.',
            level3: 'Spirit Seeker: Cast Beast Sense and Speak with Animals as rituals.\nTotem Spirit: Choose an animal spirit (Bear, Eagle, or Wolf) for unique rage benefits.',
            level6: 'Aspect of the Beast: Gain a magical benefit based on your chosen totem animal.',
            subclassOptions: {
                title: "Totem Spirit",
                choices: {
                    "Bear": "While raging, you have resistance to all damage except psychic damage.",
                    "Eagle": "While raging, you can Dash as a bonus action and enemies have disadvantage on opportunity attacks.",
                    "Wolf": "While raging, allies gain advantage on melee attacks against enemies within 5ft of you."
                },
                description: "Choose a spirit animal to guide you."
            }
        }
    },
    Bard: {
        'College of Lore': {
            description: 'Bards of the College of Lore know something about most things, collecting bits of knowledge from diverse sources.',
            level3: 'Bonus Proficiencies: Gain proficiency with three skills of your choice.\nCutting Words: Use Bardic Inspiration to decrease a creature\'s roll.',
            level6: 'Additional Magical Secrets: Learn two spells of your choice from any class list.'
        },
        'College of Valor': {
            description: 'Bards of the College of Valor are daring skalds whose tales keep alive the memory of great heroes.',
            armorProficiencies: ['Medium', 'Shield'],
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            level3: 'Bonus Proficiencies: Medium armor, shields, and martial weapons.\nCombat Inspiration: Allies can add inspiration die to damage or AC.',
            level6: 'Extra Attack: Attack twice when you take the Attack action.'
        }
    },
    Druid: {
        'Circle of the Land': {
            description: 'A circle of mystics and sages who safeguard ancient knowledge and rites.',
            level2: 'Bonus Cantrip: Learn one additional druid cantrip.\nNatural Recovery: Regain spell slots on a short rest.',
            level3: 'Circle Spells: Access to always-prepared spells based on your chosen terrain.'
        },
        'Circle of the Moon': {
            description: 'Druids of the Circle of the Moon are fierce guardians of the wilds.',
            level2: 'Combat Wild Shape: Transform as a bonus action and heal with spell slots.\nCircle Forms: Transform into more powerful beasts (CR 1).',
            level6: 'Primal Strike: Your attacks in beast form count as magical.'
        }
    },
    Artificer: {
        'Alchemist': {
            description: 'An expert at combining reagents to produce magical effects, healing draughts, and toxic fumes.',
            spells: { 1: ['Healing Word', 'Ray of Sickness'] },
            level3: 'Tool Proficiency: Alchemist\'s supplies\nExperimental Elixir: Create magical elixirs when you finish a long rest or by expending spell slots.',
            level5: 'Alchemical Savant: Add your Intelligence modifier to rolls that heal or deal acid, fire, necrotic, or poison damage when casting through alchemist\'s supplies.'
        },
        'Armorer': {
            description: 'Your magic functions like technology, bonding with heavy armor to refine it into a magical second skin.',
            armorProficiencies: ['Heavy'],
            spells: { 1: ['Magic Missile', 'Thunderwave'] },
            level1: 'Bonus Proficiency: Heavy Armor, Smith\'s tools.',
            level3: 'Arcane Armor: Turn armor into magical power armor\nArmor Model:\n[ ] Guardian (Thunder Gauntlets)\n[ ] Infiltrator (Lightning Launcher)',
            level5: 'Extra Attack: Attack twice when you take the Attack action on your turn.',
            subclassOptions: {
                title: "Armor Model",
                choices: {
                    "Guardian": "Thunder Gauntlets (1d8 thunder) that impose disadvantage on target's next attack against others.",
                    "Infiltrator": "Lightning Launcher (1d6 lightning) that deals extra damage once per turn and increases speed."
                },
                description: "Guardian for defense, Infiltrator for stealth and speed."
            }
        },
        'Artillerist': {
            description: 'A master of magical artillery, hurling energy across the battlefield and commanding eldritch cannons.',
            level3: 'Tool Proficiency: Woodcarver\'s tools\nArtillerist Spells: Shield, Thunderwave\nEldritch Cannon: Create a small or tiny magical cannon (Flamethrower, Force Ballista, or Protector).',
            level5: 'Arcane Firearm: Turn a wand, staff, or rod into a firearm, adding 1d8 to its damage rolls.'
        },
        'Battle Smith': {
            description: 'A protector and medic who fights on the front lines alongside a mechanical companion.',
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            spells: { 1: ['Heroism', 'Shield'] },
            level1: 'Bonus Proficiency: Martial Weapons, Smith\'s tools.',
            level3: 'Battle Ready: Use Intelligence for magic weapon attacks\nSteel Defender: Create a mechanical companion that fights alongside you.',
            level5: 'Extra Attack: Attack twice when you take the Attack action on your turn.'
        }
    },
    Cleric: {
        'Arcana Domain': {
            description: 'Magic is an energy that infuses the multiverse, and these clerics study it as a divine force.',
            effect: 'Gain Arcana proficiency, Wizard cantrips, and domain spells from the Wizard list. You can turn celestials, elementals, fey, and fiends.',
            spells: {
                1: ['Detect Magic', 'Magic Missile'],
                2: ['Magic Weapon', 'Nystul\'s Magic Aura'],
                3: ['Dispel Magic', 'Magic Circle'],
                4: ['Arcane Eye', 'Leomund\'s Secret Chest'],
                5: ['Planar Binding', 'Teleportation Circle']
            },
            level1: 'Arcane Mastery: Gain two Wizard cantrips and proficiency in Arcana.',
            level2: 'Channel Divinity: Arcane Abjuration: Turn celestials, elementals, fey, or fiends.',
            level6: 'Spell Breaker: Healing spells also end one spell affecting the target.',
            level8: 'Potent Spellcasting: Add your Wisdom modifier to the damage you deal with any cleric cantrip.'
        },
        'Death Domain': {
            description: 'Concerned with the forces that cause death, these clerics harness necrotic energy.',
            effect: 'Gain martial weapons, powerful necromancy spells, and the ability to target two creatures with necromancy cantrips.',
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            spells: {
                1: ['False Life', 'Ray of Sickness'],
                2: ['Blindness/Deafness', 'Ray of Enfeeblement'],
                3: ['Animate Dead', 'Vampiric Touch'],
                4: ['Blight', 'Death Ward'],
                5: ['Antilife Shell', 'Cloudkill']
            },
            level1: 'Bonus Proficiency: Martial Weapons.\nReaper: Gain a necromancy cantrip. Necromancy cantrips can target two creatures within 5ft of each other.',
            level2: 'Channel Divinity: Touch of Death: Deal extra necrotic damage (5 + twice cleric level) on a melee attack.',
            level6: 'Inescapable Destruction: Your necrotic damage ignores resistance to necrotic damage.',
            level8: 'Divine Strike: Infuse weapon strikes with extra necrotic damage (1d8, increases to 2d8 at level 14).'
        },
        'Forge Domain': {
            description: 'Gods of the forge value hard work and the creation of items from raw materials.',
            effect: 'Gain heavy armor, smith\'s tools, and the ability to temporarily make armor or weapons magical.',
            armorProficiencies: ['Heavy'],
            spells: {
                1: ['Identify', 'Searing Smite'],
                2: ['Heat Metal', 'Magic Weapon'],
                3: ['Elemental Weapon', 'Protection from Energy'],
                4: ['Fabricate', 'Wall of Fire'],
                5: ['Animate Objects', 'Creation']
            },
            level1: 'Bonus Proficiency: Heavy Armor, Smith\'s tools.\nBlessing of the Forge: Imbue magic into a weapon or armor for a +1 bonus until your next long rest.',
            level2: 'Channel Divinity: Artisan\'s Blessing: Conduct an hour-long ritual to craft a nonmagical item containing metal.',
            level6: 'Soul of the Forge: Gain resistance to fire damage, and a +1 bonus to AC while wearing heavy armor.',
            level8: 'Divine Strike: Infuse weapon strikes with extra fire damage (1d8, increases to 2d8 at level 14).'
        },
        'Grave Domain': {
            description: 'Guardians of the line between life and death who seek to put restless spirits to rest.',
            effect: 'Learn Spare the Dying (cast as bonus action at range), maximize healing on creatures at 0 HP, and detect undead.',
            spells: {
                1: ['Bane', 'False Life'],
                2: ['Gentle Repose', 'Ray of Enfeeblement'],
                3: ['Revivify', 'Vampiric Touch'],
                4: ['Blight', 'Death Ward'],
                5: ['Antilife Shell', 'Raise Dead']
            },
            level1: 'Circle of Mortality: Maximize healing on creatures at 0 HP. Gain Spare the Dying cantrip (30ft range, bonus action).\nEyes of the Grave: Detect undead within 60ft.',
            level2: 'Channel Divinity: Path to the Grave: Curse a creature to give it vulnerability to all of the next attack\'s damage.',
            level6: 'Sentinel at Death\'s Door: You can turn a critical hit against an ally within 30ft into a normal hit.',
            level8: 'Potent Spellcasting: Add your Wisdom modifier to the damage you deal with any cleric cantrip.'
        },
        'Knowledge Domain': {
            description: 'Values learning and understanding above all. Followers pursue esoteric knowledge.',
            effect: 'Gain deep proficiency in two knowledge skills (Arcana, History, Nature, Religion) and learn extra languages.',
            spells: {
                1: ['Command', 'Identify'],
                2: ['Augury', 'Suggestion'],
                3: ['Nondetection', 'Speak with Dead'],
                4: ['Arcane Eye', 'Confusion'],
                5: ['Legend Lore', 'Scrying']
            },
            level1: 'Blessings of Knowledge: Learn two languages. Gain proficiency (with doubled proficiency bonus) in two of: Arcana, History, Nature, Religion.',
            level2: 'Channel Divinity: Knowledge of the Ages: Gain proficiency in a skill or tool for 10 minutes.',
            level6: 'Channel Divinity: Read Thoughts: Read a creature\'s thoughts and cast Suggestion on them.',
            level8: 'Potent Spellcasting: Add your Wisdom modifier to the damage you deal with any cleric cantrip.'
        },
        'Life Domain': {
            description: 'Focuses on the vibrant positive energy that sustains all life.',
            effect: 'Gain heavy armor and your healing spells are significantly more effective, restoring extra hit points.',
            armorProficiencies: ['Heavy'],
            spells: {
                1: ['Bless', 'Cure Wounds'],
                2: ['Lesser Restoration', 'Spiritual Weapon'],
                3: ['Beacon of Hope', 'Revivify'],
                4: ['Death Ward', 'Guardian of Faith'],
                5: ['Mass Cure Wounds', 'Raise Dead']
            },
            level1: 'Bonus Proficiency: Heavy Armor\nDisciple of Life: Healing spells restore 2 + spell level additional HP.',
            level2: 'Channel Divinity: Preserve Life: Heal up to 5 × your cleric level HP, divided among creatures within 30ft.',
            level6: 'Blessed Healer: When you cast a healing spell on another creature, you regain HP equal to 2 + the spell\'s level.',
            level8: 'Divine Strike: Infuse weapon strikes with extra radiant damage (1d8, increases to 2d8 at level 14).'
        },
        'Light Domain': {
            description: 'Clerics of the Light promote ideals of rebirth, truth, and burning away the darkness.',
            effect: 'Gain the Light cantrip, fiery offensive domain spells (like Fireball), and the ability to impose disadvantage on incoming attacks.',
            spells: {
                1: ['Burning Hands', 'Faerie Fire'],
                2: ['Flaming Sphere', 'Scorching Ray'],
                3: ['Daylight', 'Fireball'],
                4: ['Guardian of Faith', 'Wall of Fire'],
                5: ['Flame Strike', 'Scrying']
            },
            level1: 'Bonus Cantrip: Gain the Light cantrip.\nWarding Flare: Imposes disadvantage on an attacking creature (reaction).',
            level2: 'Channel Divinity: Radiance of the Dawn: Dispel magical darkness and deal radiant damage to hostiles within 30ft.',
            level6: 'Improved Warding Flare: You can use your Warding Flare when a creature attacks an ally within 30ft of you.',
            level8: 'Potent Spellcasting: Add your Wisdom modifier to the damage you deal with any cleric cantrip.'
        },
        'Nature Domain': {
            description: 'Clerics of nature gods protect the natural world.',
            effect: 'Gain heavy armor, a Druid cantrip, and proficiency in an outdoorsy skill (Animal Handling, Nature, Survival).',
            armorProficiencies: ['Heavy'],
            spells: {
                1: ['Animal Friendship', 'Speak with Animals'],
                2: ['Barkskin', 'Spike Growth'],
                3: ['Plant Growth', 'Wind Wall'],
                4: ['Dominate Beast', 'Grasping Vine'],
                5: ['Insect Plague', 'Tree Stride']
            },
            level1: 'Bonus Proficiency: Heavy Armor, one cantrip from Druid list, one skill (Animal Handling, Nature, or Survival).',
            level2: 'Channel Divinity: Charm Animals and Plants: Charm beasts and plants within 30ft.',
            level6: 'Dampen Elements: Grant resistance to acid, cold, fire, lightning, or thunder damage to an ally within 30ft (reaction).',
            level8: 'Divine Strike: Infuse weapon strikes with extra cold, fire, or lightning damage (1d8, increases to 2d8 at level 14).'
        },
        'Order Domain': {
            description: 'Devoted to the concept of law and the hierarchy of civilization.',
            effect: 'Gain heavy armor and your supportive spells allow allies to make immediate reaction attacks.',
            armorProficiencies: ['Heavy'],
            spells: {
                1: ['Command', 'Heroism'],
                2: ['Hold Person', 'Zone of Truth'],
                3: ['Mass Healing Word', 'Slow'],
                4: ['Banishment', 'Compulsion'],
                5: ['Commune', 'Dominate Person']
            },
            level1: 'Bonus Proficiency: Heavy Armor, Persuasion or Intimidation skill.\nVoice of Authority: Trigger an ally\'s reaction attack when you cast a spell on them.',
            level2: 'Channel Divinity: Order\'s Demand: Charm and disarm enemies within 30ft.',
            level6: 'Embodiment of the Law: Cast enchantment spells as a bonus action.',
            level8: 'Divine Strike: Infuse weapon strikes with extra psychic damage (1d8, increases to 2d8 at level 14).'
        },
        'Peace Domain': {
            description: 'Focuses on forging bonds between people and avoiding conflict when possible.',
            effect: 'Gain Insight, Performance, or Persuasion, and create a mystical bond between allies to boost their attacks/saves.',
            spells: {
                1: ['Heroism', 'Sanctuary'],
                2: ['Aid', 'Warding Bond'],
                3: ['Beacon of Hope', 'Sending'],
                4: ['Aura of Purity', 'Otiluke\'s Resilient Sphere'],
                5: ['Greater Restoration', 'Rary\'s Telepathic Bond']
            },
            level1: 'Implement of Peace: Gain proficiency in Insight, Performance, or Persuasion.\nEmboldening Bond: Bond allies together; they can add 1d4 to attack rolls, checks, or saves once per turn.',
            level2: 'Channel Divinity: Balm of Peace: Move up to your speed without provoking opportunity attacks, and heal allies you pass.',
            level6: 'Protective Bond: Bonded allies can use a reaction to teleport and take damage for another bonded ally.',
            level8: 'Potent Spellcasting: Add your Wisdom modifier to the damage you deal with any cleric cantrip.'
        },
        'Tempest Domain': {
            description: 'Clerics of gods who control the storms.',
            effect: 'Gain heavy armor, martial weapons, and the ability to rebuke attackers with lightning or thunder damage.',
            armorProficiencies: ['Heavy'],
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            spells: {
                1: ['Fog Cloud', 'Thunderwave'],
                2: ['Gust of Wind', 'Shatter'],
                3: ['Call Lightning', 'Sleet Storm'],
                4: ['Control Water', 'Ice Storm'],
                5: ['Destructive Wave', 'Insect Plague']
            },
            level1: 'Bonus Proficiency: Heavy Armor, Martial Weapons.\nWrath of the Storm: Reaction to deal 2d8 lightning or thunder damage to an attacker.',
            level2: 'Channel Divinity: Destructive Wrath: Turn a roll of lightning or thunder damage into maximum damage.',
            level6: 'Thunderous Strike: When you deal lightning damage to a Large or smaller creature, you can push it up to 10 feet.',
            level8: 'Divine Strike: Infuse weapon strikes with extra thunder damage (1d8, increases to 2d8 at level 14).'
        },
        'Trickery Domain': {
            description: 'Gods of trickery are mischief-makers and instigators who stand against tyranny.',
            effect: 'Gain illusion/stealth domain spells and the ability to give a willing ally advantage on Stealth checks.',
            spells: {
                1: ['Charm Person', 'Disguise Self'],
                2: ['Mirror Image', 'Pass without Trace'],
                3: ['Blink', 'Dispel Magic'],
                4: ['Dimension Door', 'Polymorph'],
                5: ['Dominate Person', 'Modify Memory']
            },
            level1: 'Blessing of the Trickster: Grant another creature advantage on Stealth checks.',
            level2: 'Channel Divinity: Invoke Duplicity: Create a perfect illusion of yourself that you can move and cast spells from.',
            level6: 'Channel Divinity: Cloak of Shadows: Turn invisible until the end of your next turn.',
            level8: 'Divine Strike: Infuse weapon strikes with extra poison damage (1d8, increases to 2d8 at level 14).'
        },
        'Twilight Domain': {
            description: 'Guardians against the horrors of the dark.',
            effect: 'Gain heavy armor, martial weapons, massive 300ft darkvision (which can be shared), and advantage on initiative.',
            armorProficiencies: ['Heavy'],
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            spells: {
                1: ['Faerie Fire', 'Sleep'],
                2: ['Moonbeam', 'See Invisibility'],
                3: ['Aura of Vitality', 'Leomund\'s Tiny Hut'],
                4: ['Aura of Life', 'Greater Invisibility'],
                5: ['Circle of Power', 'Mislead']
            },
            level1: 'Bonus Proficiency: Heavy Armor, Martial Weapons.\nEyes of Night: 300ft Darkvision (can share with allies).\nVigilant Blessing: Give a creature advantage on the next initiative roll.',
            level2: 'Channel Divinity: Twilight Sanctuary: Create a sphere of twilight granting temp HP or removing conditions.',
            level6: 'Steps of Night: Gain a flying speed in dim light or darkness (duration 1 minute).',
            level8: 'Divine Strike: Infuse weapon strikes with extra radiant damage (1d8, increases to 2d8 at level 14).'
        },
        'War Domain': {
            description: 'Clerics of war gods excel in combat.',
            effect: 'Gain heavy armor, martial weapons, and the ability to make a bonus action weapon attack when attacking.',
            armorProficiencies: ['Heavy'],
            weaponProficiencies: ['Martial Melee', 'Martial Ranged'],
            spells: {
                1: ['Divine Favor', 'Shield of Faith'],
                2: ['Magic Weapon', 'Spiritual Weapon'],
                3: ['Crusader\'s Mantle', 'Spirit Guardians'],
                4: ['Freedom of Movement', 'Stoneskin'],
                5: ['Flame Strike', 'Hold Monster']
            },
            level1: 'Bonus Proficiency: Heavy Armor, Martial Weapons.\nWar Priest: Make a weapon attack as a bonus action when you take the Attack action.',
            level2: 'Channel Divinity: Guided Strike: Gain a +10 bonus to an attack roll.',
            level6: 'Channel Divinity: War God\'s Blessing: Grant a +10 bonus to an ally\'s attack roll.',
            level8: 'Divine Strike: Infuse weapon strikes with extra weapon damage (1d8, increases to 2d8 at level 14).'
        }
    },
    Fighter: {
        'Champion': {
            description: 'The archetypal Champion focuses on the development of raw physical power perfected to deadly perfection.',
            level3: 'Improved Critical: Weapon attacks score a critical hit on a roll of 19 or 20.',
            level7: 'Remarkable Athlete: Add half proficiency bonus to Strength, Dexterity, or Constitution checks.'
        },
        'Battle Master': {
            description: 'Those who emulate the Battle Master archetype employ martial techniques passed down through generations.',
            level3: 'Combat Superiority: Learn maneuvers and gain superiority dice (d8s) to fuel them.\nStudent of War: Gain proficiency with one type of artisan\'s tools.'
        },
        'Eldritch Knight': {
            description: 'The archetypal Eldritch Knight combines martial mastery with a careful study of magic.',
            level3: 'Spellcasting: Gain INT-based wizard spellcasting.\nWeapon Bond: Create a magical bond with up to two weapons.',
            level7: 'War Magic: Cast a cantrip and make one weapon attack as a bonus action.'
        }
    },
    Monk: {
        'Way of the Open Hand': {
            description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat.',
            level3: 'Open Hand Technique: Manipulate your ki to control an opponent when you hit with Flurry of Blows.',
            level6: 'Wholeness of Body: Regain HP equal to three times your monk level once per long rest.'
        },
        'Way of Shadow': {
            description: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.',
            level3: 'Shadow Arts: Use ki to cast Darkness, Darkvision, Pass without Trace, or Silence.\nMage Hand: Gain the Minor Illusion cantrip.',
            level6: 'Shadow Step: Teleport from one shadow to another as a bonus action.'
        },
        'Way of the Four Elements': {
            description: 'Harness the elements to perform magical effects using your ki.',
            level3: 'Elemental Disciple: Learn elemental disciplines that allow you to cast spells or perform special actions.'
        }
    },
    Paladin: {
        'Oath of Devotion': {
            description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
            spells: { 1: ['Protection from Evil and Good', 'Sanctuary'], 2: ['Lesser Restoration', 'Zone of Truth'], 3: ['Beacon of Hope', 'Dispel Magic'], 4: ['Freedom of Movement', 'Guardian of Faith'], 5: ['Commune', 'Flame Strike'] },
            level3: 'Oath Spells.',
            level7: 'Aura of Devotion: You and friendly creatures within 10 feet can\'t be charmed.',
            level15: 'Purity of Spirit: You are always under the effects of a Protection from Evil and Good spell.',
            level20: 'Holy Nimbus: Emanate sunlight that deals radiant damage to enemies and grants you advantage on saving throws against spells.'
        },
        'Oath of the Ancients': {
            description: 'The Oath of the Ancients is as old as the race of elves and the rituals of the druids.',
            spells: { 1: ['Ensnaring Strike', 'Speak with Animals'], 2: ['Moonbeam', 'Misty Step'], 3: ['Plant Growth', 'Protection from Energy'], 4: ['Ice Storm', 'Stoneskin'], 5: ['Commune with Nature', 'Tree Stride'] },
            level3: 'Oath Spells.\nChannel Divinity: Nature\'s Wrath or Turn the Faithless.',
            level7: 'Aura of Warding: You and nearby allies gain resistance to damage from spells.',
            level15: 'Undying Sentinel: When dropping to 0 HP, you can choose to drop to 1 HP instead.',
            level20: 'Elder Champion: Assume the form of an ancient force of nature, gaining regeneration and faster spellcasting.'
        },
        'Oath of Vengeance': {
            description: 'The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin.',
            spells: { 1: ['Bane', 'Hunter\'s Mark'], 2: ['Hold Person', 'Misty Step'], 3: ['Haste', 'Protection from Energy'], 4: ['Banishment', 'Dimension Door'], 5: ['Hold Monster', 'Scrying'] },
            level3: 'Oath Spells.\nChannel Divinity: Abjure Enemy or Vow of Enmity.',
            level7: 'Relentless Avenger: When you hit with an opportunity attack, you can move half your speed as part of the same reaction.',
            level15: 'Soul of Vengeance: You can make a melee attack against your Vow of Enmity target as a reaction when they attack.',
            level20: 'Avenging Angel: Transform into an angelic avenger, gaining a flying speed and an aura of menace.'
        },
        'Oath of Conquest': {
            description: 'Paladins who take the Oath of Conquest seek glory in battle and the subjugation of their enemies.',
            spells: { 1: ['Armor of Agathys', 'Command'], 2: ['Hold Person', 'Spiritual Weapon'], 3: ['Bestow Curse', 'Fear'], 4: ['Dominate Beast', 'Stoneskin'], 5: ['Cloudkill', 'Dominate Person'] },
            level3: 'Oath Spells.\nChannel Divinity: Conquering Presence or Guided Strike.',
            level7: 'Aura of Conquest: Frightened enemies within 10 feet have their speed reduced to 0 and take psychic damage.',
            level15: 'Scornful Rebuke: Those who strike you take psychic damage equal to your Charisma modifier.',
            level20: 'Invincible Conqueror: Gain resistance to all damage, an extra attack, and improved critical chance.'
        },
        'Oath of the Crown': {
            description: 'The Oath of the Crown is sworn to the ideals of civilization, exacting the principles of law and rulership.',
            spells: { 1: ['Command', 'Compelled Duel'], 2: ['Warding Bond', 'Zone of Truth'], 3: ['Aura of Vitality', 'Spirit Guardians'], 4: ['Banishment', 'Guardian of Faith'], 5: ['Circle of Power', 'Geas'] },
            level3: 'Oath Spells.\nChannel Divinity: Champion Challenge or Turn the Tide.',
            level7: 'Divine Allegiance: React to take the damage intended for an ally within 5 feet.',
            level15: 'Unyielding Spirit: Gain advantage on saving throws to avoid being paralyzed or stunned.',
            level20: 'Exalted Champion: Gain resistance to mundane weapons and advantage on death saves and Wisdom saves.'
        },
        'Oath of Glory': {
            description: 'Paladins who take the Oath of Glory believe they are destined to achieve greatness through heroic deeds.',
            spells: { 1: ['Guiding Bolt', 'Heroism'], 2: ['Enhance Ability', 'Magic Weapon'], 3: ['Haste', 'Protection from Energy'], 4: ['Compulsion', 'Freedom of Movement'], 5: ['Commune', 'Flame Strike'] },
            level3: 'Oath Spells.\nChannel Divinity: Peerless Athlete or Inspiring Smite.',
            level7: 'Aura of Alacrity: Your walking speed increases by 10 feet, and allies starting their turn next to you get the same boost.',
            level15: 'Glorious Defense: Turn an enemy\'s miss into an immediate counterattack.',
            level20: 'Living Myth: Gain advantage on Charisma checks, turn misses into hits, and reroll failed saving throws.'
        },
        'Oath of Redemption': {
            description: 'The Oath of Redemption sets a paladin on a difficult path, offering redemption to those who seek it.',
            spells: { 1: ['Sanctuary', 'Sleep'], 2: ['Calm Emotions', 'Hold Person'], 3: ['Counterspell', 'Hypnotic Pattern'], 4: ['Otiluke\'s Resilient Sphere', 'Stoneskin'], 5: ['Hold Monster', 'Wall of Force'] },
            level3: 'Oath Spells.\nChannel Divinity: Emissary of Peace or Rebuke the Violent.',
            level7: 'Aura of the Guardian: Magnetically redirect damage from allies to yourself.',
            level15: 'Protective Spirit: Automatically regain 1d6 + half your paladin level in HP when bloodied in combat.',
            level20: 'Emissary of Redemption: Gain resistance to damage from all creatures until you attack them, and reflect damage back.'
        },
        'Oath of the Watchers': {
            description: 'Paladins of the Oath of the Watchers are sworn to protect mortal realms from extraplanar threats.',
            spells: { 1: ['Alarm', 'Detect Magic'], 2: ['Moonbeam', 'See Invisibility'], 3: ['Counterspell', 'Nondetection'], 4: ['Aura of Purity', 'Banishment'], 5: ['Hold Monster', 'Scrying'] },
            level3: 'Oath Spells.\nChannel Divinity: Watcher\'s Will or Abjure the Extraplanar.',
            level7: 'Aura of the Sentinel: You and allies within 10 feet gain a bonus to initiative equal to your Charisma modifier.',
            level15: 'Vigilant Rebuke: Deal force damage to any creature that forces you or an ally to make an Intelligence, Wisdom, or Charisma save.',
            level20: 'Mortal Bulwark: Gain truesight, advantage on attacks against extraplanar creatures, and a banishing strike.'
        }
    },
    Ranger: {
        'Hunter': {
            description: 'Emulate the specialized hunting techniques used by those who patrol the wilderness.',
            level3: 'Hunter\'s Prey: Choose one (Colossus Slayer, Giant Killer, or Horde Breaker).',
            level7: 'Defensive Tactics: Choose one (Escape the Horde, Multiattack Defense, or Steel Will).',
            subclassOptions: {
                title: "Hunter's Prey",
                choices: {
                    "Colossus Slayer": "Deal extra 1d8 damage once per turn to a creature already below its HP maximum.",
                    "Giant Killer": "Use reaction to attack a Large or larger creature that attacked you within 10ft.",
                    "Horde Breaker": "Make an extra attack against a different creature within 5ft of the original target."
                },
                description: "Your focus at 3rd level."
            }
        },
        'Beast Master': {
            description: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world.',
            level3: 'Ranger\'s Companion: Gain a beast companion (CR 1/4 or lower) that fights alongside you.',
            level7: 'Exceptional Training: Your beast can take special actions as a bonus action.'
        }
    },
    Rogue: {
        'Thief': {
            description: 'You hone your skills in the thieving arts.',
            level3: 'Fast Hands: Use Cunning Action to make Sleight of Hand checks, use thieves\' tools, or Use an Object.\nSecond-Story Work: Climbing no longer costs extra movement and jump distance increases.'
        },
        'Assassin': {
            description: 'You focus your training on the grim art of death.',
            level3: 'Bonus Proficiencies: Proficiency with disguise kit and poisoner\'s kit.\nAssassinate: Advantage on initiative rolls and critical hits against surprised creatures.'
        },
        'Arcane Trickster': {
            description: 'You combine your rogue skills with the magic of the wizard.',
            level3: 'Spellcasting: Gain INT-based wizard spellcasting.\nMage Hand Legerdemain: Your Mage Hand is invisible and can perform thieving tasks.'
        }
    },
    Sorcerer: {
        'Draconic Bloodline': {
            description: 'Your innate magic comes from draconic magic mingled with your blood.',
            level1: 'Draconic Resilience: Max HP increases by 1 per level. Base AC is 13 + DEX when unarmored.',
            level6: 'Elemental Affinity: Add Charisma modifier to damage of one elemental type.',
            subclassOptions: {
                title: "Draconic Ancestry",
                choices: {
                    "Black (Acid)": "Acid damage affinity and resistance at higher levels.",
                    "Blue (Lightning)": "Lightning damage affinity and resistance at higher levels.",
                    "Brass (Fire)": "Fire damage affinity and resistance at higher levels.",
                    "Bronze (Lightning)": "Lightning damage affinity and resistance at higher levels.",
                    "Copper (Acid)": "Acid damage affinity and resistance at higher levels.",
                    "Gold (Fire)": "Fire damage affinity and resistance at higher levels.",
                    "Green (Poison)": "Poison damage affinity and resistance at higher levels.",
                    "Red (Fire)": "Fire damage affinity and resistance at higher levels.",
                    "Silver (Cold)": "Cold damage affinity and resistance at higher levels.",
                    "White (Cold)": "Cold damage affinity and resistance at higher levels."
                },
                description: "Determines your dragon type and breath weapon element."
            }
        },
        'Wild Magic': {
            description: 'Your magic comes from the wild forces of chaos.',
            level1: 'Wild Magic Surge: Your spellcasting can unleash surges of untamed magic.\nTides of Chaos: Gain advantage on one attack, ability check, or save.',
            level6: 'Bend Luck: Use sorcery points to alter another creature\'s roll damage.'
        }
    },
    Warlock: {
        'The Fiend': {
            description: 'You have made a pact with a fiend from the lower planes.',
            spells: { 1: ['Burning Hands', 'Command'] },
            level1: 'Expanded Spell List: Burning Hands, Command.\nDark One\'s Blessing: Gain temporary HP when you reduce a hostile creature to 0 HP.',
            level6: 'Dark One\'s Own Luck: Add 1d10 to an ability check or saving throw.'
        },
        'The Archfey': {
            description: 'Your patron is a lord or lady of the fey.',
            spells: { 1: ['Faerie Fire', 'Sleep'] },
            level1: 'Expanded Spell List: Faerie Fire, Sleep.\nFey Presence: Use your action to charm or frighten creatures in a 10ft cube.',
            level6: 'Misty Escape: Teleport and turn invisible when you take damage.'
        },
        'The Great Old One': {
            description: 'Your patron is a mysterious entity from the far reaches of reality.',
            spells: { 1: ['Dissonant Whispers', 'Tasha\'s Hideous Laughter'] },
            level1: 'Expanded Spell List: Dissonant Whispers, Tasha\'s Hideous Laughter.\nAwakened Mind: Communicate telepathically with any creature within 30ft.',
            level6: 'Entropic Ward: Impose disadvantage on an attack roll against you.'
        }
    },
    Wizard: {
        'School of Abjuration': {
            description: 'You focus on spells that block, banish, and protect.',
            level2: 'Abjuration Savant: Halve cost/time to copy abjuration spells.\nArcane Ward: Create a magical ward that takes damage for you.'
        },
        'School of Conjuration': {
            description: 'You focus on spells that conjure objects and creatures.',
            level2: 'Conjuration Savant: Halve cost/time to copy conjuration spells.\nMinor Conjuration: Create a small inanimate object.'
        },
        'School of Divination': {
            description: 'You focus on spells that reveal information.',
            level2: 'Divination Savant: Halve cost/time to copy divination spells.\nPortent: Roll two d20s and use them later to replace any roll.'
        },
        'School of Enchantment': {
            description: 'You focus on spells that beguile and entrance.',
            level2: 'Enchantment Savant: Halve cost/time to copy enchantment spells.\nHypnotic Gaze: Charm a creature within 5ft with your gaze.'
        },
        'School of Evocation': {
            description: 'You focus on spells that create powerful elemental effects.',
            level2: 'Evocation Savant: Halve cost/time to copy evocation spells.\nSculpt Spells: Create pockets of safety within your area-effect evocation spells.'
        },
        'School of Illusion': {
            description: 'You focus on spells that deceive the senses.',
            level2: 'Illusion Savant: Halve cost/time to copy illusion spells.\nImproved Minor Illusion: Minor Illusion can have both sound and image.'
        },
        'School of Necromancy': {
            description: 'You focus on spells that manipulate life and death.',
            level2: 'Necromancy Savant: Halve cost/time to copy necromancy spells.\nGrim Harvest: Regain HP when you kill a creature with a spell.'
        },
        'School of Transmutation': {
            description: 'You focus on spells that alter physical properties.',
            level2: 'Transmutation Savant: Halve cost/time to copy transmutation spells.\nMinor Alchemy: Temporarily alter the physical properties of one object.'
        }
    }
};

export const BACKGROUNDS = {
    Acolyte: ['Insight', 'Religion'],
    Charlatan: ['Deception', 'Sleight of Hand'],
    Criminal: ['Deception', 'Stealth'],
    Entertainer: ['Acrobatics', 'Performance'],
    'Folk Hero': ['Animal Handling', 'Survival'],
    'Guild Artisan': ['Insight', 'Persuasion'],
    Hermit: ['Medicine', 'Religion'],
    Noble: ['History', 'Persuasion'],
    Outlander: ['Athletics', 'Survival'],
    Sage: ['Arcana', 'History'],
    Sailor: ['Athletics', 'Perception'],
    Soldier: ['Athletics', 'Intimidation'],
    Urchin: ['Sleight of Hand', 'Stealth']
};

export const LANGUAGES = [
    'Abyssal',
    'Celestial',
    'Draconic',
    'Deep Speech',
    'Dwarvish',
    'Elvish',
    'Giant',
    'Gnomish',
    'Goblin',
    'Halfling',
    'Infernal',
    'Orc',
    'Primordial',
    'Sylvan',
    'Undercommon'
];
