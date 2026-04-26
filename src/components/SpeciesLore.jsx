import React from 'react';
import { SPECIES, PARENT_SPECIES } from '../data/species5e';
import namesData from '../data/names.json';

export default function SpeciesLore({ data, updateData }) {
    const parentSpeciesList = Object.keys(PARENT_SPECIES);
    const availableSubSpecies = data.parentSpecies ? PARENT_SPECIES[data.parentSpecies] : [];
    const selectedSpecies = data.species ? SPECIES[data.species] : null;

    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)]">
            <div className="text-center mb-10">
                <h2 className="text-4xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                    Background
                </h2>
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    Define your character's origins, physical nature, and personal history.
                </p>
            </div>

            <div className="bg-[var(--color-dark-bg)] p-6 rounded-lg border border-gray-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <h3 className="text-xl font-bold mb-6 text-brand-300">Choose Your Species</h3>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-400 mb-2 uppercase tracking-wide">Species</label>
                            <div className="relative">
                                <select
                                    value={data.parentSpecies || ''}
                                    onChange={(e) => {
                                        const newParent = e.target.value;
                                        const subs = PARENT_SPECIES[newParent] || [];
                                        const autoSelect = subs.length === 1 ? subs[0] : '';
                                        const speciesData = autoSelect ? SPECIES[autoSelect] : null;

                                        updateData({
                                            parentSpecies: newParent,
                                            species: autoSelect,
                                            size: speciesData ? (speciesData.size.includes('or') ? data.size || 'Medium' : speciesData.size) : 'Medium'
                                        });
                                    }}
                                    className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select a Species</option>
                                    {parentSpeciesList.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        {availableSubSpecies.length > 1 && (
                            <div>
                                <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${data.parentSpecies ? 'text-brand-400' : 'text-gray-500'}`}>Sub Species / Ancestry</label>
                                <div className="relative">
                                    <select
                                        value={data.species || ''}
                                        onChange={(e) => {
                                            const newSpecies = e.target.value;
                                            const speciesData = SPECIES[newSpecies];
                                            updateData({
                                                species: newSpecies,
                                                size: speciesData.size.includes('or') ? data.size || 'Medium' : speciesData.size
                                            });
                                        }}
                                        disabled={!data.parentSpecies}
                                        className={`w-full bg-gray-900 border border-gray-600 rounded px-4 py-3 pr-10 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white appearance-none ${!data.parentSpecies ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <option value="" disabled>Select Sub Species</option>
                                        {availableSubSpecies.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedSpecies && selectedSpecies.description && (
                        <div className="animate-fade-in py-4 px-6 bg-brand-500/5 border border-brand-500/20 rounded-xl">
                            <p className="text-md opacity-90 italic text-gray-300 leading-relaxed">
                                "{selectedSpecies.description}"
                            </p>
                        </div>
                    )}

                    {selectedSpecies && selectedSpecies.size && selectedSpecies.size.includes('or') && (
                        <div className="max-w-md">
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Size Option</label>
                            <div className="flex gap-4">
                                {['Medium', 'Small'].map((size) => (
                                    <label key={size} className={`flex flex-1 items-center gap-2 cursor-pointer p-3 rounded border transition-colors bg-gray-800/20 ${data.size === size ? 'border-brand-500 text-brand-400' : 'border-gray-600 hover:border-brand-500/50'}`}>
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={data.size === size}
                                            onChange={(e) => updateData({ size: e.target.value })}
                                            className="hidden"
                                        />
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-1 ${data.size === size ? 'border-brand-400' : 'border-gray-500'}`}>
                                            {data.size === size && <div className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_5px_rgba(var(--color-brand-rgb),0.5)]"></div>}
                                        </div>
                                        <span className="font-bold text-sm flex-1 text-center pr-4">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {selectedSpecies && (
                    <div className="mt-6 border-t border-gray-700/50 pt-6">
                        <div className="bg-brand-900/10 border border-brand-900/50 rounded-xl p-6 relative overflow-hidden group hover:bg-brand-900/20 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M5.45 5.45l13.1 13.1M18.55 5.45L5.45 18.55" /></svg>
                            </div>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-3">
                                <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-white/5">
                                    <p className="text-sm"><span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] mr-2">Creature Type:</span> <span className="text-gray-200">Humanoid</span></p>
                                    <p className="text-sm"><span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] mr-2">Size:</span> <span className="text-gray-200">{selectedSpecies.size.includes('or') ? data.size || 'Medium' : selectedSpecies.size}</span></p>
                                    <p className="text-sm"><span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] mr-2">Speed:</span> <span className="text-gray-200">{selectedSpecies.speed} ft</span></p>
                                    {selectedSpecies.climbSpeed && <p className="text-sm"><span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] mr-2">Climb:</span> <span className="text-gray-200">{selectedSpecies.climbSpeed} ft</span></p>}
                                    <p className="text-sm"><span className="font-bold text-brand-400 uppercase tracking-wider text-[10px] mr-2">Darkvision:</span> <span className="text-gray-200">{selectedSpecies.darkvision > 0 ? `${selectedSpecies.darkvision} ft` : 'None'}</span></p>
                                </div>
                                <div className="space-y-4">
                                    {selectedSpecies.traits.map((trait, idx) => {
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
                                            <div key={idx} className="text-sm">
                                                <span className="text-gray-200 leading-relaxed italic block">{trait}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-[var(--color-dark-bg)] p-6 rounded-lg border border-gray-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <h3 className="text-xl font-bold mb-6 text-brand-300">Basic Info & Nature</h3>
                <p className="mb-6 text-md opacity-90 italic text-gray-300">You can come back to this section later if you'd like.</p>

                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-gray-400 uppercase tracking-wide">Character Name</label>
                            {data.parentSpecies && namesData[data.parentSpecies] && (
                                <button
                                    onClick={() => {
                                        const names = namesData[data.parentSpecies];
                                        updateData({ name: names[Math.floor(Math.random() * names.length)] });
                                    }}
                                    className="text-[10px] bg-brand-600/20 hover:bg-brand-600/40 text-brand-400 border border-brand-500/30 px-2 py-1 rounded transition-colors uppercase font-black"
                                >
                                    🎲 Suggest A Name
                                </button>
                            )}
                        </div>
                        <input
                            type="text"
                            value={data.name || ''}
                            onChange={(e) => updateData({ name: e.target.value })}
                            placeholder={data.parentSpecies && namesData[data.parentSpecies] ? `e.g. ${namesData[data.parentSpecies][0]}` : "e.g. Adventurer"}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Personality Traits</label>
                    <textarea
                        value={data.personalityTraits || ''}
                        onChange={(e) => updateData({ personalityTraits: e.target.value })}
                        rows="3"
                        className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        placeholder="What defines your character's mannerisms?"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Ideals</label>
                        <textarea
                            value={data.ideals || ''}
                            onChange={(e) => updateData({ ideals: e.target.value })}
                            rows="4"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Bonds</label>
                        <textarea
                            value={data.bonds || ''}
                            onChange={(e) => updateData({ bonds: e.target.value })}
                            rows="4"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Flaws</label>
                        <textarea
                            value={data.flaws || ''}
                            onChange={(e) => updateData({ flaws: e.target.value })}
                            rows="4"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Character Backstory</label>
                    <textarea
                        value={data.backstory || ''}
                        onChange={(e) => updateData({ backstory: e.target.value })}
                        rows="5"
                        className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm"
                        placeholder="Tell the story of how you came to wander the world..."
                    />
                </div>
            </div>
        </div>
    );
}
