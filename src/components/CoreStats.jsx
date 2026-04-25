import React, { useEffect } from 'react';
import { CLASSES, BACKGROUNDS, LANGUAGES } from '../data/rules5e';
import { APPEARANCES, SPECIES } from '../data/species5e';

export default function CoreStats({ data, updateData }) {
    const classes = Object.keys(CLASSES);
    const backgrounds = Object.keys(BACKGROUNDS);

    const alignments = [
        'Lawful Good', 'Neutral Good', 'Chaotic Good',
        'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
        'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
    ];

    // Auto-apply background skills and remove any overlapping class skills
    useEffect(() => {
        if (data.background) {
            const bgSkills = BACKGROUNDS[data.background] || [];
            const newClassSkills = (data.selectedClassSkills || []).filter(skill => !bgSkills.includes(skill));

            updateData({
                backgroundSkills: bgSkills,
                selectedClassSkills: newClassSkills
            });
        } else {
            updateData({ backgroundSkills: [] });
        }
    }, [data.background]);

    // Clear class skills and other dependent state if class changes to prevent invalid selection
    const handleClassChange = (newClass) => {
        updateData({
            class: newClass,
            subclass: '',
            subclassOption: '',
            selectedClassSkills: [],
            background: '',
            backgroundSkills: [],
            selectedCantrips: [],
            selectedSpells: {},
            equippedArmor: 'None',
            equippedShield: false,
            equippedWeapons: ['', '', ''],
            inventory: '',
            abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
            abilityTokens: { t1: '', t2: '', t3: '' }
        });
    };

    const handleLevelChange = (newLevelStr) => {
        const newLevel = parseInt(newLevelStr) || 1;
        const oldLevel = Number(data.level) || 1;

        const updates = { level: newLevel };

        // Subclass Cleanup: If dropping below the level they gain a specialization
        if (data.class) {
            const requiredLevel = CLASSES[data.class]?.subclassLevel || 3;
            if (newLevel < requiredLevel) {
                updates.subclass = '';
                updates.subclassOption = '';
            }
        }

        // Spell Cleanup: If level decreases, clear selections (limits and slots change)
        if (newLevel < oldLevel) {
            updates.selectedCantrips = [];
            updates.selectedSpells = {};
        }

        updateData(updates);
    };

    const handleClassSkillChange = (skill) => {
        const current = data.selectedClassSkills || [];
        if (current.includes(skill)) {
            updateData({ selectedClassSkills: current.filter(s => s !== skill) });
        } else {
            const limit = CLASSES[data.class].skillChoices;
            if (current.length < limit) {
                updateData({ selectedClassSkills: [...current, skill] });
            }
        }
    };

    const getSynergyNotes = (className) => {
        return `A ${data.species || 'character'} ${className} is a fantastic choice for your adventure!`;
    };

    const currentClass = data.class ? CLASSES[data.class] : null;

    const getPhysicalBounds = () => {
        const p = data.parentSpecies;
        if (p === 'Dwarf') return { h: '4 to 5 feet', w: '130 - 170 lbs', minIn: 48, maxIn: 60, minW: 130, maxW: 170 };
        if (p === 'Dragonborn') return { h: 'over 6 feet', w: '200 - 300 lbs', minIn: 72, maxIn: 82, minW: 200, maxW: 300 };
        if (p === 'Half-Orc') return { h: '5 to 7 feet', w: '180 - 250 lbs', minIn: 64, maxIn: 84, minW: 180, maxW: 250 };
        if (p === 'Elf') return { h: 'under 5 to over 6 feet', w: '100 - 145 lbs', minIn: 58, maxIn: 74, minW: 100, maxW: 145 };
        if (p === 'Gnome' || p === 'Halfling') return { h: '3 to 4 feet', w: '35 - 45 lbs', minIn: 36, maxIn: 44, minW: 35, maxW: 45 };
        if (p === 'Tiefling') return { h: '5 to 6 feet', w: '140 - 180 lbs', minIn: 60, maxIn: 75, minW: 140, maxW: 180 };
        if (data.size === 'Small') return { h: '2 to 4 feet', w: '30 - 60 lbs', minIn: 30, maxIn: 48, minW: 30, maxW: 60 };
        return { h: '5 to 6+ feet', w: '110 - 200 lbs', minIn: 60, maxIn: 78, minW: 110, maxW: 200 };
    };

    const randomizeAppearance = () => {
        const pb = getPhysicalBounds();
        const age = 18 + Math.floor(Math.random() * 23);
        const totalInches = pb.minIn + Math.floor(Math.random() * (pb.maxIn - pb.minIn + 1));
        const totalWeight = pb.minW + Math.floor(Math.random() * (pb.maxW - pb.minW + 1));
            
        let eyes = '';
        let skin = '';
        let hair = '';
        
        if (data.species && APPEARANCES[data.species]) {
            const app = APPEARANCES[data.species];
            if (app.eyes) eyes = app.eyes[Math.floor(Math.random() * app.eyes.length)];
            if (app.skin) skin = app.skin[Math.floor(Math.random() * app.skin.length)];
            if (app.hair) hair = app.hair[Math.floor(Math.random() * app.hair.length)];
        } else if (data.parentSpecies && APPEARANCES[data.parentSpecies]) {
            const app = APPEARANCES[data.parentSpecies];
            if (app.eyes) eyes = app.eyes[Math.floor(Math.random() * app.eyes.length)];
            if (app.skin) skin = app.skin[Math.floor(Math.random() * app.skin.length)];
            if (app.hair) hair = app.hair[Math.floor(Math.random() * app.hair.length)];
        }
            
        updateData({
            eyes,
            skin,
            hair,
            height: `${Math.floor(totalInches / 12)}'${totalInches % 12}"`,
            weight: `${totalWeight} lb`,
            age: age.toString()
        });
    };

    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                Class, Skills and Traits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Class Selection */}
                <div className="space-y-4 bg-[var(--color-dark-card)] p-6 rounded-lg border border-gray-700">
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase">Class</label>
                            <select
                                value={data.class}
                                onChange={(e) => handleClassChange(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white"
                            >
                                <option value="" disabled>Select a Class</option>
                                {classes.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="w-24 space-y-2">
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase">Level</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={data.level || 1}
                                onChange={(e) => handleLevelChange(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white text-center"
                            />
                        </div>
                    </div>

                    {data.class && (
                        <div className="mt-4 p-4 rounded bg-brand-900/30 border border-brand-800 text-sm italic opacity-90">
                            <span className="font-bold mr-2 text-brand-300">Synergy Note:</span>
                            {getSynergyNotes(data.class)}
                        </div>
                    )}

                    {/* Class Image Nest */}
                    {data.class && data.species === 'Tabaxi' && (
                        <div className="mt-6 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-[3/4] rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                                <img
                                    src={`/classes/${data.class.toLowerCase()}.png`}
                                    alt={`Tabaxi ${data.class}`}
                                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png' }}
                                />
                            </div>
                        </div>
                    )}

                    {currentClass && (
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase mb-3">
                                Class Skills (Choose {currentClass.skillChoices})
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {currentClass.skillOptions.map(skill => {
                                    // Disable if they have it from somewhere else, or if they hit the cap and this isn't checked
                                    const isFromSpecies = (data.speciesSkills || []).includes(skill);
                                    const isFromBg = (data.backgroundSkills || []).includes(skill);
                                    const isChecked = (data.selectedClassSkills || []).includes(skill);
                                    const hitCap = (data.selectedClassSkills || []).length >= currentClass.skillChoices;

                                    const isDisabled = (isFromSpecies || isFromBg) || (hitCap && !isChecked);

                                    return (
                                        <label
                                            key={skill}
                                            className={`flex items-center space-x-2 text-sm p-2 rounded border transition-colors cursor-pointer
                                                ${isChecked ? 'bg-brand-900/40 border-brand-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-300'}
                                                ${isDisabled && !isChecked ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-500'}
                                            `}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked || isFromSpecies || isFromBg}
                                                disabled={isDisabled}
                                                onChange={() => handleClassSkillChange(skill)}
                                                className="w-4 h-4 text-brand-500 border-gray-600 rounded bg-gray-900 focus:ring-brand-500 focus:ring-2"
                                            />
                                            <span className="truncate">
                                                {skill}
                                                {isFromSpecies && <span className="ml-1 text-xs text-brand-400">(Species)</span>}
                                                {isFromBg && <span className="ml-1 text-xs text-brand-400">(Bg)</span>}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    
                    {/* Species Lore Duplicate */}
                    {data.species && SPECIES[data.species] && (
                        <div className="mt-8 pt-2">
                            <h3 className="block text-sm font-bold text-brand-400 tracking-wide uppercase mb-4">Species Traits</h3>
                            <div className="bg-brand-900/10 p-5 rounded-lg border border-gray-700">
                                <p className="text-sm opacity-90 mb-4 italic text-gray-300">
                                    "{SPECIES[data.species].description}"
                                </p>
                                <div className="space-y-3">
                                    {SPECIES[data.species].traits.map((trait, idx) => {
                                        const splitIndex = trait.indexOf(':');
                                        if (splitIndex !== -1) {
                                            return (
                                                <div key={idx} className="text-sm">
                                                    <span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] block mb-1">{trait.substring(0, splitIndex)}</span>
                                                    <span className="text-gray-200 leading-relaxed italic">{trait.substring(splitIndex + 1).trim()}</span>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div key={idx} className="text-sm text-gray-200 leading-relaxed italic">
                                                {trait}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Background & Alignment + Physical Characteristics */}
                <div className="space-y-8">
                    <div className="space-y-6 bg-[var(--color-dark-card)] p-6 rounded-lg border border-gray-700 h-fit">
                        <div>
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase mb-2">Background</label>
                            <select
                                value={data.background}
                                onChange={(e) => updateData({ background: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white mb-3"
                            >
                                <option value="" disabled>Select a Background</option>
                                {backgrounds.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            {data.background && BACKGROUNDS[data.background] && (
                                <div className="text-sm p-3 bg-gray-800 border border-gray-600 rounded">
                                    <span className="text-brand-400 font-bold block mb-1">Provided Skills:</span>
                                    <span className="text-gray-300">{BACKGROUNDS[data.background].join(', ')}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase mb-2">Alignment</label>
                            <select
                                value={data.alignment}
                                onChange={(e) => updateData({ alignment: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white"
                            >
                                <option value="" disabled>Select Alignment</option>
                                {alignments.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase mb-2">Bonus Language</label>
                            <select
                                value={data.language}
                                onChange={(e) => updateData({ language: e.target.value })}
                                className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white"
                            >
                                <option value="">Select Bonus Language</option>
                                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <div className="text-xs text-brand-300 italic mt-2">
                                Your species likely provides Common plus one other default language.
                            </div>
                        </div>
                    </div>

                    {/* Physical Characteristics */}
                    <div className="space-y-6 bg-[var(--color-dark-card)] p-6 rounded-lg border border-gray-700 h-fit">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-brand-400 tracking-wide uppercase">Physical Traits</label>
                            <button
                                onClick={randomizeAppearance}
                                className="text-[10px] bg-brand-600/20 hover:bg-brand-600/40 text-brand-400 border border-brand-500/30 px-2 py-1 rounded transition-colors uppercase font-black"
                            >
                                🎲 Randomize Appearance
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-400 uppercase">
                                    Age <span className="text-[10px] text-gray-500 lowercase ml-1">(18 to 40 years)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.age || ''}
                                    onChange={(e) => updateData({ age: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-400 uppercase">
                                    Weight <span className="text-[10px] text-gray-500 lowercase ml-1">
                                        ({getPhysicalBounds().w})
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.weight || ''}
                                    onChange={(e) => updateData({ weight: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-400 uppercase">
                                    Height <span className="text-[10px] text-gray-500 lowercase ml-1">
                                        ({getPhysicalBounds().h})
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.height || ''}
                                    onChange={(e) => updateData({ height: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase">
                                    Eyes <span className="text-[10px] text-gray-500 lowercase ml-1">(shape and color)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.eyes || ''}
                                    onChange={(e) => updateData({ eyes: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase">Skin (Coloring/Pattern)</label>
                                <input
                                    type="text"
                                    value={data.skin || ''}
                                    onChange={(e) => updateData({ skin: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 uppercase">Hair (Length)</label>
                                <input
                                    type="text"
                                    value={data.hair || ''}
                                    onChange={(e) => updateData({ hair: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
