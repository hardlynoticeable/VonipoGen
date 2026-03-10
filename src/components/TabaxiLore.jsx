import React from 'react';

export default function TabaxiLore({ data, updateData }) {
    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)]">
            <div className="text-center mb-10">
                <h2 className="text-4xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    The Tabaxi
                </h2>
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                    Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting artifacts, gather tales and stories, and lay eyes on all the world's wonders.
                </p>
            </div>

            <div className="mb-8 w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-gray-700/50 shadow-lg shadow-black/20">
                <img
                    src="/assets/tabaxi1.png"
                    alt="Tabaxi Adventurer"
                    className="w-full h-48 md:h-64 object-cover object-top opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
            </div>

            <div className="bg-[var(--color-dark-bg)] p-6 rounded-lg border border-gray-700/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <h3 className="text-xl font-bold mb-6 text-emerald-300">Basic Info & Nature</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Character Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => updateData({ name: e.target.value })}
                                placeholder="e.g. Cloud on the Mountaintop"
                                className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Tabaxi Size</label>
                            <div className="flex gap-4">
                                {['Medium', 'Small'].map((size) => (
                                    <label key={size} className="flex flex-1 items-center gap-2 cursor-pointer p-3 rounded border border-gray-600 hover:border-emerald-500/50 transition-colors bg-gray-800/20">
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={data.size === size}
                                            onChange={(e) => updateData({ size: e.target.value })}
                                            className="text-brand-500 bg-gray-900 border-gray-600 focus:ring-brand-500"
                                        />
                                        <span className="font-bold text-sm">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Personality Traits</label>
                            <textarea
                                value={data.personalityTraits}
                                onChange={(e) => updateData({ personalityTraits: e.target.value })}
                                rows="3"
                                className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                                placeholder="What defines your character's mannerisms?"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Ideals</label>
                        <textarea
                            value={data.ideals}
                            onChange={(e) => updateData({ ideals: e.target.value })}
                            rows="2"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Bonds</label>
                        <textarea
                            value={data.bonds}
                            onChange={(e) => updateData({ bonds: e.target.value })}
                            rows="2"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Flaws</label>
                        <textarea
                            value={data.flaws}
                            onChange={(e) => updateData({ flaws: e.target.value })}
                            rows="2"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm resize-none"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Character Backstory</label>
                    <textarea
                        value={data.backstory}
                        onChange={(e) => updateData({ backstory: e.target.value })}
                        rows="5"
                        className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-white text-sm"
                        placeholder="Tell the story of how your tabaxi came to wander the world..."
                    />
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-emerald-300">
                Tabaxi Traits
            </h3>
            <div className="bg-emerald-900/10 border border-emerald-900/50 rounded-xl p-6 relative overflow-hidden group hover:bg-emerald-900/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M5.45 5.45l13.1 13.1M18.55 5.45L5.45 18.55" /></svg>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="space-y-3">
                        <p className="text-sm"><span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mr-2">Creature Type:</span> <span className="text-gray-200">Humanoid</span></p>
                        <p className="text-sm"><span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mr-2">Size:</span> <span className="text-gray-200">Medium or Small (You choose)</span></p>
                        <p className="text-sm"><span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mr-2">Speed:</span> <span className="text-gray-200">30 ft, Climbing Speed 30 ft</span></p>
                        <p className="text-sm"><span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mr-2">Darkvision:</span> <span className="text-gray-200">60 ft</span></p>
                    </div>
                    <div className="space-y-3">
                        <div className="text-sm">
                            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">Cat's Claws</span>
                            <span className="text-gray-200 leading-relaxed italic">Your unarmed strikes deal 1d6 + STR slashing damage.</span>
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">Cat's Talent</span>
                            <span className="text-gray-200 leading-relaxed italic">You have proficiency in Perception and Stealth.</span>
                        </div>
                        <div className="text-sm">
                            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">Feline Agility</span>
                            <span className="text-gray-200 leading-relaxed italic">Double your speed for a turn; recharges on a 0 ft move.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
