import React, { useState } from 'react';
import { generateCharacterPDF } from '../utils/pdfGenerator';
import AbilityScoreImpact from './AbilityScoreImpact';
import { SUBCLASSES, CLASSES } from '../data/rules5e';
import { SPECIES } from '../data/species5e';
import { checkProficiency } from '../utils/stats';
import { STARTING_PACKS } from '../data/startingPacks';
import { getCharacterWarnings } from '../utils/validation';

export default function Review({ data }) {
    const [downloading, setDownloading] = useState(false);
    const warnings = getCharacterWarnings(data);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await generateCharacterPDF(data);
        } catch (err) {
            console.error(err);
        } finally {
            setDownloading(false);
        }
    };

    const allClasses = [data, ...(data.multiClasses || [])].filter(c => c && c.class && CLASSES[c.class]);
    const totalLevel = allClasses.reduce((sum, c) => sum + (Number(c.level) || 1), 0);

    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                    Review Your Character
                </h2>
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-fuchsia-500 text-white font-black hover:scale-105 hover:from-brand-500 hover:to-fuchsia-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center gap-3 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {downloading && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {downloading ? 'Generating PDF...' : 'Generate Character & PDF!'}
                </button>
            </div>

            {/* Warnings Section */}
            {warnings.length > 0 && (
                <div className="bg-amber-900/20 border border-amber-500/50 rounded-lg p-4 mb-6 animate-pulse-slow">
                    <div className="flex items-center gap-3 mb-3 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        <h3 className="font-bold uppercase tracking-wider text-sm">Review Warnings</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {warnings.map((warning, idx) => (
                            <li key={idx} className="text-xs text-amber-200/80 flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">•</span>
                                {warning}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-brand-900/10 border border-brand-800/50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
                {/* Background graphic */}
                <div className="absolute right-[-10%] bottom-[-20%] opacity-5 text-brand-500 pointer-events-none scale-150">
                    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                </div>

                {/* Left Column: Identity */}
                <div className="space-y-4 relative z-10">
                    <div>
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Name</p>
                        <p className="text-xl font-medium text-white">{data.name || 'Unnamed Wanderer'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Class(es)</p>
                            <div className="space-y-1 mt-1">
                                {allClasses.map((c, i) => (
                                    <p key={i} className="text-sm text-white">
                                        {c.class} Lvl {c.level}
                                        {c.subclass && <span className="text-brand-300 ml-1 text-xs">({c.subclass})</span>}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Total Level</p>
                            <p className="text-lg text-white">{totalLevel}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Background</p>
                            <p className="text-lg text-white">{data.background || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Alignment</p>
                            <p className="text-lg text-white">{data.alignment || 'Neutral'}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700/50">
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-2">Ability Scores</p>
                        <div className="flex gap-3 flex-wrap">
                            {Object.entries(data.abilityScores).map(([key, val]) => {
                                const selectedSpecies = SPECIES[data.species];
                                const bonus = (selectedSpecies?.abilityBonuses?.[key]) || 0;
                                const baseScore = val !== "" && val !== undefined ? Number(val) : 0;
                                const total = baseScore + bonus;
                                return (
                                    <div key={key} className="bg-gray-800 px-3 py-1 rounded border border-gray-600 font-mono">
                                        <span className="text-gray-400 mr-2 uppercase">{key}</span>
                                        <span className={`font-bold ${bonus > 0 ? 'text-brand-400' : 'text-brand-300'}`}>{total}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Species Traits */}
                    {data.species && SPECIES[data.species] && (
                        <div className="pt-4 border-t border-gray-700/50">
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-2">{data.species} Traits</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                                <li><span className="text-brand-300 font-bold">Speed:</span> {SPECIES[data.species].speed}ft Walking{SPECIES[data.species].climbSpeed ? `, ${SPECIES[data.species].climbSpeed}ft Climbing` : ''}</li>
                                <li><span className="text-brand-300 font-bold">Darkvision:</span> {SPECIES[data.species].darkvision > 0 ? `${SPECIES[data.species].darkvision}ft` : 'None'}</li>
                                <li><span className="text-brand-300 font-bold">Size:</span> {SPECIES[data.species].size.includes('or') ? data.size || 'Medium' : SPECIES[data.species].size}</li>
                                {SPECIES[data.species].traits.map((trait, idx) => {
                                    const splitIndex = trait.indexOf(':');
                                    if (splitIndex !== -1) {
                                        return (
                                            <li key={idx}><span className="text-brand-300 font-bold">{trait.substring(0, splitIndex)}:</span> {trait.substring(splitIndex + 1).trim()}</li>
                                        );
                                    }
                                    return <li key={idx}>{trait}</li>;
                                })}
                            </ul>
                        </div>
                    )}

                </div>

                {/* Right Column: Stats & Traits */}
                <div className="space-y-4 relative z-10 pl-0 md:pl-6 md:border-l border-gray-700">
                    {/* Class Features */}
                    {allClasses.map((cData, i) => {
                        const hasBaseFeatures = CLASSES[cData.class]?.features;
                        const hasSubclassFeatures = cData.subclass && SUBCLASSES[cData.class]?.[cData.subclass];
                        
                        if (!hasBaseFeatures && !hasSubclassFeatures) return null;

                        return (
                            <div key={i} className="mb-4">
                                {hasBaseFeatures && (
                                    <div>
                                        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mt-4 mb-2">
                                            {cData.class} Features
                                        </p>
                                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                                            {Object.entries(CLASSES[cData.class].features)
                                                .filter(([level]) => parseInt(level) <= cData.level)
                                                .flatMap(([_, featuresArray]) => featuresArray)
                                                .map((feature, idx) => (
                                                    <li key={`base-feature-${idx}`} className="text-xs italic opacity-80 border-l-2 border-brand-800 pl-2 ml-1">
                                                        {feature}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )}

                                {hasSubclassFeatures && (
                                    <div>
                                        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mt-4 mb-2">
                                            {CLASSES[cData.class]?.subclassTitle || "Subclass"} Features ({cData.subclass}{cData.subclassOption ? `: ${cData.subclassOption}` : ''})
                                        </p>
                                        <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                                            {Object.entries(SUBCLASSES[cData.class][cData.subclass])
                                                .filter(([key]) => key.startsWith('level') && parseInt(key.replace('level', '')) <= cData.level)
                                                .flatMap(([key, feature]) => {
                                                    const lines = feature.split('\n');
                                                    const options = SUBCLASSES[cData.class][cData.subclass].subclassOptions;

                                                    return lines.map((line, idx) => {
                                                        if (line.includes('Bonus Proficiency:') || line.includes('Spells:')) return null;

                                                        let content = line;
                                                        if (options && cData.subclassOption && line.startsWith(`${options.title}:`)) {
                                                            const benefit = options.choices[cData.subclassOption];
                                                            content = `${options.title} (${cData.subclassOption}): ${benefit}`;
                                                        }

                                                        return (
                                                            <li key={`${key}-${idx}`} className="whitespace-pre-line text-xs italic opacity-80 border-l-2 border-brand-800 pl-2 ml-1">
                                                                {content}
                                                            </li>
                                                        );
                                                    });
                                                })
                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Spells */}
                    {(() => {
                        let totalCantrips = [];
                        let totalSpells = [];

                        const spellcastingClasses = allClasses.filter(c => CLASSES[c.class]?.spellcasting || SUBCLASSES[c.class]?.[c.subclass]?.spellcasting);
                        const isMultiCaster = spellcastingClasses.length > 1;

                        allClasses.forEach(cData => {
                            const sc = CLASSES[cData.class]?.spellcasting || SUBCLASSES[cData.class]?.[cData.subclass]?.spellcasting;
                            if (!sc) return;

                            const subclassSpellsObj = (cData.class && cData.subclass && SUBCLASSES[cData.class]?.[cData.subclass]?.spells) || {};
                            const subclassCantrips = subclassSpellsObj[0] || [];
                            const selectedCantrips = cData.selectedCantrips || [];

                            [...new Set([...subclassCantrips, ...selectedCantrips])].forEach(spell => {
                                totalCantrips.push(isMultiCaster ? `${spell} (${cData.class})` : spell);
                            });

                            let availableLevels = [];
                            if (sc.progression === 'warlock') {
                                // For Review display, we only use their actual spell slots.
                                // Actually, Review is for the whole character, but spells are tracked by class.
                                // We can just look at what they selected + subclass spells up to what they can cast.
                                // Warlock slots are max 5th level
                                const wSlots = [1,2,3,4,5].filter(l => cData.level >= l * 2 - 1); 
                                availableLevels = wSlots; 
                            } else {
                                // other progressions
                                const effectiveLvl = sc.progression === 'full' ? cData.level : 
                                                    sc.progression === 'half' ? Math.floor(cData.level/2) : 
                                                    sc.progression === 'artificer' ? Math.ceil(cData.level/2) :
                                                    Math.floor(cData.level/3);
                                const maxSpellLevel = Math.ceil(effectiveLvl / 2);
                                availableLevels = [1,2,3,4,5,6,7,8,9].filter(l => l <= maxSpellLevel);
                            }

                            availableLevels.forEach(l => {
                                const subclassLeveled = subclassSpellsObj[l] || [];
                                const selectedLeveled = cData.selectedSpells?.[l] || [];
                                [...new Set([...subclassLeveled, ...selectedLeveled])].forEach(spell => {
                                    totalSpells.push(isMultiCaster ? `${spell} (${cData.class})` : spell);
                                });
                            });
                        });

                        const allCantrips = [...new Set(totalCantrips)];
                        const allLeveledSpells = [...new Set(totalSpells)];

                        if (allCantrips.length === 0 && allLeveledSpells.length === 0) return null;

                        return (
                            <div className="pt-4 border-t border-gray-700/50">
                                <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-2">
                                    Spells
                                </p>
                                <div className="space-y-3">
                                    {allCantrips.length > 0 && (
                                        <div>
                                            <p className="text-[10px] text-brand-300/60 uppercase font-black mb-1">Cantrips</p>
                                            <p className="text-xs text-gray-300 italic">{allCantrips.join(', ')}</p>
                                        </div>
                                    )}
                                    {allLeveledSpells.length > 0 && (
                                        <div>
                                            <p className="text-[10px] text-brand-300/60 uppercase font-black mb-1">Leveled Spells</p>
                                            <p className="text-xs text-gray-300 italic">{allLeveledSpells.join(', ')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Lore & Background */}
                    <div className="pt-4 border-t border-gray-700/50">
                        <p className="text-sm font-bold text-brand-500 uppercase tracking-wider mb-3">Lore & Background</p>
                        <div className="space-y-3">
                            {data.personalityTraits && (
                                <div>
                                    <p className="text-[10px] text-brand-300/60 uppercase font-black">Personality Traits</p>
                                    <p className="text-xs text-gray-300 italic">"{data.personalityTraits}"</p>
                                </div>
                            )}
                            {data.ideals && (
                                <div>
                                    <p className="text-[10px] text-brand-300/60 uppercase font-black">Ideals</p>
                                    <p className="text-xs text-gray-300 italic">"{data.ideals}"</p>
                                </div>
                            )}
                            {data.bonds && (
                                <div>
                                    <p className="text-[10px] text-brand-300/60 uppercase font-black">Bonds</p>
                                    <p className="text-xs text-gray-300 italic">"{data.bonds}"</p>
                                </div>
                            )}
                            {data.flaws && (
                                <div>
                                    <p className="text-[10px] text-brand-300/60 uppercase font-black">Flaws</p>
                                    <p className="text-xs text-gray-300 italic">"{data.flaws}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AbilityScoreImpact data={data} />

            {/* Bottom Section: Gear & Inventory */}
            <div className="mt-8 pt-8 border-t border-brand-900/50">
                <h3 className="text-xl font-bold text-brand-400 mb-6">
                    Gear & Inventory
                </h3>

                <div className="bg-black/20 border border-brand-900/30 rounded-lg p-6 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Currency & Treasure */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-amber-500 uppercase tracking-wider">Currency</p>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { id: 'cp', label: 'CP', color: 'text-orange-400' },
                                    { id: 'sp', label: 'SP', color: 'text-gray-300' },
                                    { id: 'ep', label: 'EP', color: 'text-blue-300' },
                                    { id: 'gp', label: 'GP', color: 'text-yellow-400' },
                                    { id: 'pp', label: 'PP', color: 'text-teal-300' }
                                ].map(coin => (
                                    <div key={coin.id} className="bg-black/40 px-3 py-1 rounded border border-gray-800 flex items-center gap-2">
                                        <span className={`text-[10px] font-black ${coin.color} uppercase`}>{coin.label}</span>
                                        <span className="text-sm font-bold text-white">{data.money?.[coin.id] || 0}</span>
                                    </div>
                                ))}
                            </div>

                            {data.treasure && (
                                <div className="mt-4">
                                    <p className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">Recorded Treasure</p>
                                    <div className="bg-black/40 p-3 rounded border border-amber-500/20">
                                        <p className="text-xs text-gray-400 italic font-medium whitespace-pre-wrap">{data.treasure}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Backpack Items */}
                        <div className="md:col-span-2 space-y-4">
                            <p className="text-sm font-bold text-brand-500 uppercase tracking-wider">Backpack Contents</p>

                            {/* Starting Pack Contents */}
                            {data.startingPack && STARTING_PACKS[data.startingPack] && (
                                <div className="mb-4 bg-brand-900/10 border border-brand-800/30 p-3 rounded-lg">
                                    <p className="text-[10px] text-brand-400 font-black uppercase mb-2 tracking-widest">{data.startingPack} Items</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {STARTING_PACKS[data.startingPack].map((item, idx) => (
                                            <div key={`pack-${idx}`} className="text-[10px] text-gray-400 flex items-center gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-brand-500/40"></span>
                                                {item.Item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Individual Inventory Items */}
                            <div className="space-y-2">
                                {(data.inventory?.length > 0 || data.unarmedStrikeEquipped) ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {data.unarmedStrikeEquipped && (
                                            <div className="bg-brand-900/20 border border-brand-500/30 p-2 rounded text-xs text-gray-300 flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-brand-400">•</span>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-brand-100">Unarmed Strike</span>
                                                        <span className="text-[10px] text-gray-500">Natural Weapon</span>
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-black text-brand-500/60 uppercase">Proficient</span>
                                            </div>
                                        )}
                                        {(data.inventory || []).map((item, idx) => (
                                            <div key={idx} className="bg-black/20 border border-white/5 p-2 rounded text-xs text-gray-300 flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-brand-500/50">•</span>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-brand-100">{item.name}</span>
                                                        <span className="text-[10px] text-gray-500">{item.type}</span>
                                                    </div>
                                                </div>
                                                {(() => {
                                                    const isProf = checkProficiency(data, item);
                                                    if (isProf === true) return <span className="text-[9px] font-black text-brand-500/60 uppercase">Proficient</span>;
                                                    if (isProf === false) return <span className="text-[9px] font-black text-amber-500 uppercase">Non-Proficient</span>;
                                                    return null;
                                                })()}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !data.startingPack && <p className="text-xs text-gray-500 italic">No items in backpack.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
