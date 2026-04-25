import React from 'react';
import { createPortal } from 'react-dom';
import { CLASSES, SUBCLASSES } from '../data/rules5e';
import { SPELL_LIST, SPELLCASTING_PROGRESSIONS } from '../data/spells5e';
import { SPELL_DESCRIPTIONS } from '../data/spellDescriptions';

export default function Spells({ data, updateData }) {
    const [selectedDescription, setSelectedDescription] = React.useState(null);
    const charClass = data.class;
    const subclassData = (data.subclass && SUBCLASSES[charClass]?.[data.subclass]) || null;
    const level = Number(data.level) || 1;
    const spellcasting = (charClass ? CLASSES[charClass]?.spellcasting : null) || subclassData?.spellcasting;

    if (!spellcasting) return <div className="text-gray-400 p-8 text-center bg-[var(--color-dark-card)] rounded border border-gray-800 m-4">No spellcasting for this class.</div>;

    const ability = spellcasting.ability || 'int'; // 'int', 'wis', 'cha'
    const abilityScore = data.abilityScores[ability] || 10;
    const abilityBonus = data.abilityBonuses[ability] || 0;
    const totalAbility = Number(abilityScore) + abilityBonus;
    const abilityMod = Math.floor((totalAbility - 10) / 2);

    const profBonus = Math.ceil(level / 4) + 1;
    const spellSaveDC = 8 + profBonus + abilityMod;
    const spellAttackBonus = profBonus + abilityMod;

    // Cantrips
    let baseCantripsKnown = spellcasting.cantripsKnown?.[level - 1] || 0;
    const bonusCantrips = subclassData?.bonusCantrips;
    if (bonusCantrips) {
        baseCantripsKnown += (bonusCantrips.count || 0);
    }
    const cantripsKnown = baseCantripsKnown;

    const subclassCantrips = subclassData?.spells?.[0] || [];
    let classCantrips = SPELL_LIST[charClass]?.[0] || [];
    
    if (bonusCantrips) {
        if (bonusCantrips.list && SPELL_LIST[bonusCantrips.list]?.[0]) {
            classCantrips = [...classCantrips, ...SPELL_LIST[bonusCantrips.list][0]];
        } else if (bonusCantrips.options) {
            classCantrips = [...classCantrips, ...bonusCantrips.options];
        }
    }

    const cantripOptions = [...new Set([...classCantrips, ...subclassCantrips])].sort();

    // Slots & Leveled Spells
    const progression = SPELLCASTING_PROGRESSIONS[spellcasting.progression] || Array(20).fill([]);
    const availableSlots = progression[level - 1] || []; // e.g. [4, 2] means 4 1st, 2 2nd

    // Allowed known spells (if applicable)
    const spellsKnownTarget = spellcasting.spellsKnown ? spellcasting.spellsKnown[level - 1] : (spellcasting.type === 'prepared' ? Math.max(1, level + abilityMod) : 0);
    // For prepared casters: level + mod (Cleric, Druid, Wizard, Artificer uses level/2 + mod, Paladin uses level/2 + mod)
    // Actually exact prep formula: 
    // Artificer: Floor(Level/2) + Int Mod
    // Paladin: Floor(Level/2) + Cha Mod
    // Cleric/Druid/Wizard: Level + Mod
    let maxPreparedOrKnown = spellsKnownTarget;
    if (spellcasting.type === 'prepared') {
        if (charClass === 'Paladin' || charClass === 'Artificer') {
            maxPreparedOrKnown = Math.max(1, Math.floor(level / 2) + abilityMod);
        } else {
            maxPreparedOrKnown = Math.max(1, level + abilityMod);
        }
    }

    const { selectedCantrips = [], selectedSpells = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] } } = data;

    // Get subclass spells
    const alwaysKnownSpells = {};
    if (subclassData?.spells) {
        Object.entries(subclassData.spells).forEach(([lvl, spells]) => {
            if (parseInt(lvl) <= 9) { // Ensure within leveled spells
                alwaysKnownSpells[lvl] = spells;
            }
        });
    }

    // Count currently selected leveled spells, IGNORING those that are always known AND those not on class list
    const totalSelectedSpells = Object.entries(selectedSpells).reduce((total, [lvl, spells]) => {
        const domainSpells = alwaysKnownSpells[lvl] || [];
        const classSpells = SPELL_LIST[charClass]?.[lvl] || [];
        const validAvailableSpells = [...new Set([...classSpells, ...domainSpells])];

        const manuallySelected = spells.filter(s =>
            !domainSpells.includes(s) && validAvailableSpells.includes(s)
        );
        return total + manuallySelected.length;
    }, 0);
    const totalSelectedCantrips = selectedCantrips.filter(s => !subclassCantrips.includes(s) && cantripOptions.includes(s)).length;

    const toggleCantrip = (spell) => {
        const current = [...selectedCantrips];
        if (current.includes(spell)) {
            updateData({ selectedCantrips: current.filter(s => s !== spell) });
        } else if (totalSelectedCantrips < cantripsKnown) {
            updateData({ selectedCantrips: [...current, spell] });
        }
    };

    const toggleSpell = (level, spell) => {
        const currentLevelSpells = [...(selectedSpells[level] || [])];
        if (currentLevelSpells.includes(spell)) {
            const updated = { ...selectedSpells, [level]: currentLevelSpells.filter(s => s !== spell) };
            updateData({ selectedSpells: updated });
        } else if (totalSelectedSpells < maxPreparedOrKnown) {
            const updated = { ...selectedSpells, [level]: [...currentLevelSpells, spell] };
            updateData({ selectedSpells: updated });
        }
    };

    return (
        <>
            <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
                <h2 className="text-3xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                    Spellcasting (Level {level} {charClass})
                </h2>

                {/* Spellcasting Core Stats Header */}
                <div className="flex gap-4 mb-6 relative">
                    <div className="flex-1 bg-gray-900/60 p-4 rounded-lg border border-brand-900/50 flex flex-col items-center">
                        <span className="text-xs uppercase font-bold text-gray-400 mb-1">Ability</span>
                        <span className="text-xl font-bold text-brand-300 uppercase">{ability}</span>
                    </div>
                    <div className="flex-1 bg-gray-900/60 p-4 rounded-lg border border-brand-900/50 flex flex-col items-center">
                        <span className="text-xs uppercase font-bold text-gray-400 mb-1">Save DC</span>
                        <span className="text-3xl font-bold text-brand-400">{spellSaveDC}</span>
                    </div>
                    <div className="flex-1 bg-gray-900/60 p-4 rounded-lg border border-brand-900/50 flex flex-col items-center">
                        <span className="text-xs uppercase font-bold text-gray-400 mb-1">Attack Bonus</span>
                        <span className="text-3xl font-bold text-brand-400">+{spellAttackBonus}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cantrips Section */}
                    <div className="bg-[var(--color-dark-card)] p-6 rounded-lg border border-gray-700 h-fit">
                        <h3 className="text-xl font-bold text-brand-400 mb-2 border-b border-gray-700 pb-2">
                            Cantrips ({totalSelectedCantrips} / {cantripsKnown})
                        </h3>
                        {cantripsKnown > 0 || subclassCantrips.length > 0 ? (
                            <div className="mt-4 flex flex-col gap-1">
                                {cantripOptions.map(spell => {
                                    const isAlwaysKnown = subclassCantrips.includes(spell);
                                    const isSelected = isAlwaysKnown || selectedCantrips.includes(spell);
                                    const hitCap = totalSelectedCantrips >= cantripsKnown;
                                    return (
                                        <div key={spell} className="flex items-center">
                                            <label className={`flex items-center space-x-2 text-sm p-1 rounded transition-colors flex-1 ${isSelected ? 'bg-brand-900/40 text-white' : 'hover:bg-gray-800'} ${isAlwaysKnown ? 'cursor-default border border-brand-500/30' : 'cursor-pointer'}`}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    disabled={isAlwaysKnown || (!isSelected && hitCap)}
                                                    onChange={() => toggleCantrip(spell)}
                                                    className={`w-4 h-4 rounded focus:ring-brand-500 bg-gray-900 border-gray-600 ${isAlwaysKnown ? 'text-brand-400 opacity-100' : 'text-brand-500'}`}
                                                />
                                                <span className="flex-1 flex items-center gap-2">
                                                    {spell}
                                                    {isAlwaysKnown && (
                                                        <span className="text-[10px] uppercase font-bold text-brand-400 bg-brand-900/50 px-1.5 py-0.5 rounded border border-brand-500/30">
                                                            {data.subclass}
                                                        </span>
                                                    )}
                                                </span>
                                            </label>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedDescription({ name: spell, desc: SPELL_DESCRIPTIONS[spell] || "Description for this spell is not available in the SRD database. Please consult your sourcebooks." });
                                                }}
                                                className="ml-2 text-brand-500 hover:text-brand-400 p-1 flex items-center justify-center transition-transform hover:scale-110"
                                                title="Spell Description"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 italic">This class gets no cantrips at this level.</p>
                        )}
                    </div>

                    {/* Leveled Spells Section */}
                    <div className="bg-[var(--color-dark-card)] p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-brand-400 mb-2 border-b border-gray-700 pb-2">
                            {spellcasting.type === 'prepared' ? 'Prepared Spells' : 'Spells Known'} ({totalSelectedSpells} / {maxPreparedOrKnown})
                        </h3>
                        <div className="mt-4 space-y-6">
                            {availableSlots.map((numSlots, index) => {
                                const spellLevel = index + 1;
                                // Warlock hack check (if numSlots happens to be 0 but they do have slots of higher levels... actually warlock max spell level)
                                if (numSlots <= 0 && spellcasting.progression !== 'warlock') return null;
                                const warlockMaxLevel = Math.min(5, Math.ceil(level / 2));
                                if (spellcasting.progression === 'warlock' && spellLevel > warlockMaxLevel) return null;

                                const classList = SPELL_LIST[charClass]?.[spellLevel] || [];
                                const domainSpellsForLevel = alwaysKnownSpells[spellLevel] || [];
                                // Combine class spell list with domain spells, removing duplicates, then sort alphabetically
                                const list = [...new Set([...classList, ...domainSpellsForLevel])].sort();

                                return (
                                    <div key={spellLevel}>
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-brand-300">Level {spellLevel}</h4>
                                            <div className="flex gap-1">
                                                {spellcasting.progression === 'warlock' ? (
                                                    numSlots > 0 ? (
                                                        Array.from({ length: numSlots }).map((_, i) => (
                                                            <div key={i} className="w-4 h-4 rounded bg-purple-700 border border-purple-400" title="Pact Magic Slot"></div>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-purple-400 italic">Upcast via Pact Magic</span>
                                                    )
                                                ) : (
                                                    <>
                                                        {Array.from({ length: numSlots }).map((_, i) => (
                                                            <div key={i} className="w-3 h-3 rounded bg-brand-700 border border-brand-400" title="Spell Slot"></div>
                                                        ))}
                                                        {numSlots === 0 && <span className="text-xs text-gray-500">-</span>}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {list.map(spell => {
                                                const isAlwaysKnown = (alwaysKnownSpells[spellLevel] || []).includes(spell);
                                                const isSelected = isAlwaysKnown || (selectedSpells[spellLevel] || []).includes(spell);
                                                const hitCap = totalSelectedSpells >= maxPreparedOrKnown;
                                                return (
                                                    <div key={spell} className="flex items-center">
                                                        <label className={`flex items-center space-x-2 text-sm p-1 rounded transition-colors flex-1 ${isSelected ? 'bg-brand-900/40 text-white' : 'hover:bg-gray-800'} ${isAlwaysKnown ? 'cursor-default border border-brand-500/30' : 'cursor-pointer'}`}>
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                disabled={isAlwaysKnown || (!isSelected && hitCap)}
                                                                onChange={() => toggleSpell(spellLevel, spell)}
                                                                className={`w-4 h-4 rounded focus:ring-brand-500 bg-gray-900 border-gray-600 ${isAlwaysKnown ? 'text-brand-400 opacity-100' : 'text-brand-500'}`}
                                                            />
                                                            <span className="flex-1 flex items-center gap-2">
                                                                {spell}
                                                                {isAlwaysKnown && (
                                                                    <span className="text-[10px] uppercase font-bold text-brand-400 bg-brand-900/50 px-1.5 py-0.5 rounded border border-brand-500/30">
                                                                        {data.subclass}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </label>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSelectedDescription({ name: spell, desc: SPELL_DESCRIPTIONS[spell] || "Description for this spell is not available in the SRD database. Please consult your sourcebooks." });
                                                            }}
                                                            className="ml-2 text-brand-500 hover:text-brand-400 p-1 flex items-center justify-center transition-transform hover:scale-110"
                                                            title="Spell Description"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            {list.length === 0 && <div className="text-xs text-gray-500 italic">No spells listed.</div>}
                                        </div>
                                    </div>
                                );
                            })}
                            {availableSlots.length === 0 && (
                                <p className="text-sm text-gray-400 italic">You have no spell slots at this level.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spell Description Modal */}
            {selectedDescription && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedDescription(null)}>
                    <div className="bg-gray-900 border border-brand-500 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-brand-900/10">
                            <h3 className="text-2xl font-bold text-brand-400">{selectedDescription.name}</h3>
                            <button onClick={() => setSelectedDescription(null)} className="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                                {selectedDescription.desc}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-800 flex justify-end">
                            <button
                                onClick={() => setSelectedDescription(null)}
                                className="px-6 py-2 bg-brand-700 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-brand-900/20"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
