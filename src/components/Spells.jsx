import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CLASSES, SUBCLASSES } from '../data/rules5e';
import { SPELL_LIST, SPELLCASTING_PROGRESSIONS } from '../data/spells5e';
import { SPELL_DESCRIPTIONS } from '../data/spellDescriptions';

export default function Spells({ data, updateData }) {
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [openPanels, setOpenPanels] = useState({});

    const allClasses = [data, ...(data.multiClasses || [])].filter(c => c && c.class && CLASSES[c.class]);
    const spellcastingClasses = allClasses.filter(c => CLASSES[c.class]?.spellcasting || (c.subclass && SUBCLASSES[c.class]?.[c.subclass]?.spellcasting));

    const togglePanel = (className) => {
        setOpenPanels(prev => ({
            [className]: !prev[className]
        }));
    };

    if (spellcastingClasses.length === 0) {
        return (
            <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <h2 className="text-3xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                        Spellcasting
                    </h2>
                    <p className="text-gray-400 text-center max-w-lg">
                        None of your selected classes have spellcasting abilities.
                    </p>
                </div>
            </div>
        );
    }

    const getCombinedSlots = () => {
        let effectiveLevel = 0;
        let numSpellcasters = 0;
        let warlockSlots = [];
        
        allClasses.forEach(c => {
            const sc = CLASSES[c.class]?.spellcasting || (c.subclass && SUBCLASSES[c.class]?.[c.subclass]?.spellcasting);
            if (!sc) return;
            
            if (sc.progression === 'warlock') {
                warlockSlots = SPELLCASTING_PROGRESSIONS.warlock[c.level - 1] || [];
                return;
            }
            
            numSpellcasters++;
            if (sc.progression === 'full') effectiveLevel += c.level;
            else if (sc.progression === 'half') effectiveLevel += Math.floor(c.level / 2);
            else if (sc.progression === 'artificer') effectiveLevel += Math.ceil(c.level / 2);
            else if (sc.progression === 'third') effectiveLevel += Math.floor(c.level / 3);
        });

        if (numSpellcasters === 1) {
            const singleClass = allClasses.find(c => {
                const sc = CLASSES[c.class]?.spellcasting || (c.subclass && SUBCLASSES[c.class]?.[c.subclass]?.spellcasting);
                return sc && sc.progression !== 'warlock';
            });
            if (singleClass) {
                const sc = CLASSES[singleClass.class].spellcasting || SUBCLASSES[singleClass.class][singleClass.subclass].spellcasting;
                return {
                    slots: SPELLCASTING_PROGRESSIONS[sc.progression][singleClass.level - 1] || [],
                    warlockSlots
                };
            }
        }
        
        const combinedLevel = Math.min(20, Math.max(1, effectiveLevel));
        const slots = numSpellcasters > 0 ? SPELLCASTING_PROGRESSIONS.full[combinedLevel - 1] || [] : [];
        return { slots, warlockSlots };
    };

    const { slots: combinedSlots, warlockSlots } = getCombinedSlots();

    return (
        <>
            <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
                <h2 className="text-3xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                    Spellcasting
                </h2>
                <p className="text-gray-400 mb-6">
                    Manage your known and prepared spells. Each spellcasting class learns and prepares spells differently according to their own rules, but your overall spell slots are combined for your convenience based on the multiclass spellcaster rules.
                </p>

                <div className="space-y-4">
                    {spellcastingClasses.map((cData, idx) => {
                        const charClass = cData.class;
                        const subclassData = (cData.subclass && SUBCLASSES[charClass]?.[cData.subclass]) || null;
                        const level = Number(cData.level) || 1;
                        const spellcasting = (charClass ? CLASSES[charClass]?.spellcasting : null) || subclassData?.spellcasting;

                        const ability = spellcasting.ability || 'int';
                        const abilityScore = data.abilityScores[ability] || 10;
                        const abilityBonus = data.abilityBonuses[ability] || 0;
                        const totalAbility = Number(abilityScore) + abilityBonus;
                        const abilityMod = Math.floor((totalAbility - 10) / 2);

                        const profBonus = Math.ceil(data.level / 4) + 1; // Use total character level for proficiency
                        const spellSaveDC = 8 + profBonus + abilityMod;
                        const spellAttackBonus = profBonus + abilityMod;

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

                        const spellsKnownTarget = spellcasting.spellsKnown ? spellcasting.spellsKnown[level - 1] : (spellcasting.type === 'prepared' ? Math.max(1, level + abilityMod) : 0);
                        let maxPreparedOrKnown = spellsKnownTarget;
                        if (spellcasting.type === 'prepared') {
                            if (charClass === 'Paladin' || charClass === 'Artificer') {
                                maxPreparedOrKnown = Math.max(1, Math.floor(level / 2) + abilityMod);
                            } else {
                                maxPreparedOrKnown = Math.max(1, level + abilityMod);
                            }
                        }

                        const selectedCantrips = cData.selectedCantrips || [];
                        const selectedSpells = cData.selectedSpells || { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };

                        const alwaysKnownSpells = {};
                        if (subclassData?.spells) {
                            Object.entries(subclassData.spells).forEach(([lvl, spells]) => {
                                if (parseInt(lvl) <= 9) alwaysKnownSpells[lvl] = spells;
                            });
                        }

                        const totalSelectedSpells = Object.entries(selectedSpells).reduce((total, [lvl, spells]) => {
                            const domainSpells = alwaysKnownSpells[lvl] || [];
                            const classSpells = SPELL_LIST[charClass]?.[lvl] || [];
                            const validAvailableSpells = [...new Set([...classSpells, ...domainSpells])];

                            const manuallySelected = (spells || []).filter(s =>
                                !domainSpells.includes(s) && validAvailableSpells.includes(s)
                            );
                            return total + manuallySelected.length;
                        }, 0);
                        const totalSelectedCantrips = selectedCantrips.filter(s => !subclassCantrips.includes(s) && cantripOptions.includes(s)).length;

                        const toggleCantrip = (spell) => {
                            const current = [...selectedCantrips];
                            let newCantrips = current;
                            if (current.includes(spell)) {
                                newCantrips = current.filter(s => s !== spell);
                            } else if (totalSelectedCantrips < cantripsKnown) {
                                newCantrips = [...current, spell];
                            }

                            if (idx === 0) updateData({ selectedCantrips: newCantrips });
                            else {
                                const newMulti = [...data.multiClasses];
                                newMulti[idx - 1].selectedCantrips = newCantrips;
                                updateData({ multiClasses: newMulti });
                            }
                        };

                        const toggleSpell = (lvl, spell) => {
                            const currentLevelSpells = [...(selectedSpells[lvl] || [])];
                            let newSpells = { ...selectedSpells };
                            if (currentLevelSpells.includes(spell)) {
                                newSpells[lvl] = currentLevelSpells.filter(s => s !== spell);
                            } else if (totalSelectedSpells < maxPreparedOrKnown) {
                                newSpells[lvl] = [...currentLevelSpells, spell];
                            }

                            if (idx === 0) updateData({ selectedSpells: newSpells });
                            else {
                                const newMulti = [...data.multiClasses];
                                newMulti[idx - 1].selectedSpells = newSpells;
                                updateData({ multiClasses: newMulti });
                            }
                        };

                        const isSingle = spellcastingClasses.length === 1;
                        const isOpen = isSingle || openPanels[charClass];

                        // Use combined slots for UI rendering so player knows what they have overall
                        const slotsToRender = spellcasting.progression === 'warlock' ? warlockSlots : combinedSlots;

                        return (
                            <div key={charClass} className="bg-[var(--color-dark-card)] border border-gray-700 rounded-lg overflow-hidden">
                                {!isSingle && (
                                    <button
                                        onClick={() => togglePanel(charClass)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 transition-colors"
                                    >
                                        <span className="text-xl font-bold text-brand-300">
                                            {charClass} (Level {level})
                                        </span>
                                        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    </button>
                                )}

                                {isOpen && (
                                    <div className={`p-6 ${!isSingle ? 'border-t border-gray-700' : ''}`}>
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
                                            <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700 h-fit">
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
                                                                                    {cData.subclass}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </label>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setSelectedDescription({ name: spell, desc: SPELL_DESCRIPTIONS[spell] || "Description not found." });
                                                                        }}
                                                                        className="ml-2 text-brand-500 hover:text-brand-400 p-1 flex items-center justify-center transition-transform hover:scale-110"
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
                                            <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700">
                                                <h3 className="text-xl font-bold text-brand-400 mb-2 border-b border-gray-700 pb-2">
                                                    {spellcasting.type === 'prepared' ? 'Prepared Spells' : 'Spells Known'} ({totalSelectedSpells} / {maxPreparedOrKnown})
                                                </h3>
                                                <div className="mt-4 space-y-6">
                                                    {slotsToRender.map((numSlots, index) => {
                                                        const spellLevel = index + 1;
                                                        if (numSlots <= 0 && spellcasting.progression !== 'warlock') return null;
                                                        const warlockMaxLevel = Math.min(5, Math.ceil(level / 2));
                                                        if (spellcasting.progression === 'warlock' && spellLevel > warlockMaxLevel) return null;

                                                        const classList = SPELL_LIST[charClass]?.[spellLevel] || [];
                                                        const domainSpellsForLevel = alwaysKnownSpells[spellLevel] || [];
                                                        const list = [...new Set([...classList, ...domainSpellsForLevel])].sort();

                                                        // Casters shouldn't pick spells above their individual progression allowed levels
                                                        // So we filter list based on what the class can prepare/learn natively at their level
                                                        const classMaxLevel = spellcasting.progression === 'full' ? Math.ceil(level / 2) :
                                                                              spellcasting.progression === 'half' ? Math.ceil(level / 4) :
                                                                              spellcasting.progression === 'third' ? Math.ceil(level / 6) :
                                                                              spellcasting.progression === 'artificer' ? Math.ceil(level / 4) : warlockMaxLevel;

                                                        if (spellLevel > classMaxLevel) return null; // They can't learn/prepare spells of this level

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
                                                                                    <div key={i} className="w-3 h-3 rounded bg-brand-700 border border-brand-400" title="Combined Spell Slot"></div>
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
                                                                                                {cData.subclass}
                                                                                            </span>
                                                                                        )}
                                                                                    </span>
                                                                                </label>
                                                                                <button
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        e.stopPropagation();
                                                                                        setSelectedDescription({ name: spell, desc: SPELL_DESCRIPTIONS[spell] || "Description not found." });
                                                                                    }}
                                                                                    className="ml-2 text-brand-500 hover:text-brand-400 p-1 flex items-center justify-center transition-transform hover:scale-110"
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
                                                    {slotsToRender.length === 0 && (
                                                        <p className="text-sm text-gray-400 italic">You have no spell slots at this level.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
