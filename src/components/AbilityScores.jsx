import React, { useState, useEffect } from 'react';
import { CLASSES } from '../data/rules5e';
import { SPECIES } from '../data/species5e';
import AbilityScoreImpact from './AbilityScoreImpact';

export default function AbilityScores({ data, updateData }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [flashGuidance, setFlashGuidance] = useState(false);

    const allSelectedClasses = [data, ...(data.multiClasses || [])].filter(c => c && c.class);
    const isMulticlass = allSelectedClasses.length > 1;
    const [activeOptimizationClass, setActiveOptimizationClass] = useState(data.class);

    useEffect(() => {
        if (data.class) {
            setActiveOptimizationClass(data.class);
            setFlashGuidance(true);
            const timer = setTimeout(() => {
                setFlashGuidance(false);
            }, 3000); // 3-second flash duration
            return () => clearTimeout(timer);
        }
    }, [data.class]);

    const handleShowPriority = (className) => {
        setActiveOptimizationClass(className);
        setFlashGuidance(true);
        setTimeout(() => setFlashGuidance(false), 3000);
    };

    const abilities = [
        { key: 'str', label: 'Strength' },
        { key: 'dex', label: 'Dexterity' },
        { key: 'con', label: 'Constitution' },
        { key: 'int', label: 'Intelligence' },
        { key: 'wis', label: 'Wisdom' },
        { key: 'cha', label: 'Charisma' }
    ];

    const generateRandomScores = () => {
        if (isGenerating) return;
        setIsGenerating(true);

        const newScores = {};
        abilities.forEach(({ key }) => {
            const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
            rolls.sort((a, b) => b - a); // sort descending
            // Drop lowest, sum top 3
            newScores[key] = rolls[0] + rolls[1] + rolls[2];
        });

        // Set the base scores and clear any legacy tokens
        updateData({
            abilityScores: newScores
        });

        // Cooldown
        setTimeout(() => {
            setIsGenerating(false);
        }, 3000);
    };

    const handleScoreChange = (key, value) => {
        // If user clears the input, let it be blank
        if (value === "") {
            updateData({ abilityScores: { ...data.abilityScores, [key]: "" } });
            return;
        }

        const numVal = Number(value);
        if (isNaN(numVal)) return;

        // Allow users to type intermediate values (like 1 or 2) without jumping to 3 
        // but still cap the upper bound at 30 (being generous for magic items/buffs)
        const cappedVal = Math.min(30, numVal);
        
        const selectedSpecies = SPECIES[data.species];
        const activeBonus = (selectedSpecies?.abilityBonuses?.[key]) || 0;
        const newBase = cappedVal - activeBonus;

        updateData({
            abilityScores: { ...data.abilityScores, [key]: newBase }
        });
    };


    const getSortedScoresArray = () => {
        const scores = [];
        abilities.forEach(({ key }) => {
            const val = data.abilityScores[key];
            if (val !== "") scores.push({ key, val: Number(val) });
        });
        return scores.sort((a, b) => a.val - b.val); // lowest to highest
    };

    const handleSwapUp = (key) => {
        const sorted = getSortedScoresArray();
        const currentIndex = sorted.findIndex(s => s.key === key);
        if (currentIndex < 0 || currentIndex === sorted.length - 1) return;

        // Find the next strictly greater value
        const currentVal = sorted[currentIndex].val;
        let nextIndex = currentIndex + 1;
        while (nextIndex < sorted.length && sorted[nextIndex].val === currentVal) {
            nextIndex++;
        }

        if (nextIndex >= sorted.length) return; // No strictly greater value

        const nextHighest = sorted[nextIndex];

        updateData({
            abilityScores: {
                ...data.abilityScores,
                [key]: nextHighest.val,
                [nextHighest.key]: currentVal
            }
        });
    };

    const handleSwapDown = (key) => {
        const sorted = getSortedScoresArray();
        const currentIndex = sorted.findIndex(s => s.key === key);
        if (currentIndex <= 0) return;

        // Find the next strictly lesser value
        const currentVal = sorted[currentIndex].val;
        let nextIndex = currentIndex - 1;
        while (nextIndex >= 0 && sorted[nextIndex].val === currentVal) {
            nextIndex--;
        }

        if (nextIndex < 0) return; // No strictly lesser value

        const nextLowest = sorted[nextIndex];

        updateData({
            abilityScores: {
                ...data.abilityScores,
                [key]: nextLowest.val,
                [nextLowest.key]: currentVal
            }
        });
    };

    const calculateModifier = (totalScore) => {
        if (totalScore === "" || isNaN(totalScore)) return 0;
        return Math.floor((totalScore - 10) / 2);
    };

    // Calculate disabled arrows
    const sortedScores = getSortedScoresArray();
    let highestVal = -Infinity;
    let lowestVal = Infinity;
    if (sortedScores.length > 0) {
        lowestVal = sortedScores[0].val;
        highestVal = sortedScores[sortedScores.length - 1].val;
    }

    const getBonusesText = () => {
        if (!data.species || !SPECIES[data.species]) return "";
        return Object.entries(SPECIES[data.species].abilityBonuses || {}).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', ');
    };

    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 gap-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200 m-0">
                    Ability Scores
                </h2>

                <button
                    onClick={generateRandomScores}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded font-bold transition-all shadow-md flex items-center gap-2
                        ${isGenerating ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_10px_rgba(var(--color-brand-rgb),0.3)]'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isGenerating ? 'animate-spin' : ''}>
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.28l5.67-5.67" />
                    </svg>
                    {isGenerating ? 'Randomizing...' : 'Randomize'}
                </button>
            </div>

            {data.species && (
                <div className="mb-8 p-4 bg-brand-950/20 border border-brand-800/30 rounded-lg flex items-center gap-4 animate-fade-in">
                    <div className="bg-brand-500/10 p-2 rounded-full hidden sm:block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-brand-400 uppercase tracking-widest mb-1">{data.species} Bonuses</h4>
                        <p className="text-sm text-brand-100/80 leading-relaxed font-medium">
                            The {data.species} species provides: <span className="text-white font-bold">{getBonusesText()}</span>. These are automatically added to your scores below.
                        </p>
                    </div>
                </div>
            )}

            {data.class && CLASSES[data.class] && (
                <div className="flex flex-col gap-4 mb-8">
                    {allSelectedClasses.map((c, i) => (
                        <div key={i} className={`bg-[var(--color-dark-card)] p-4 border-l-4 rounded shadow-md transition-all ${flashGuidance && activeOptimizationClass === c.class ? 'border-brand-500 animate-flash-3x' : 'border-gray-700'}`}>
                            <div className="flex justify-between items-start md:items-center mb-2 flex-col md:flex-row gap-2">
                                <h3 className="text-brand-300 font-bold">
                                    {c.class} Optimization Strategy
                                </h3>
                                {isMulticlass && (
                                    <button 
                                        onClick={() => handleShowPriority(c.class)}
                                        className="text-xs px-3 py-1.5 bg-brand-900/40 hover:bg-brand-500 text-brand-300 hover:text-white rounded border border-brand-500/50 transition-colors shadow-sm"
                                    >
                                        Show me the priority status for {c.class}
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-gray-300 italic">
                                {CLASSES[c.class]?.abilityAdvice}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-none w-full md:w-56 space-y-4">
                {abilities.map(({ key, label }) => {
                    const baseScore = data.abilityScores && data.abilityScores[key] !== undefined ? data.abilityScores[key] : "";
                    const selectedSpecies = SPECIES[data.species];
                    const bonus = (selectedSpecies?.abilityBonuses?.[key]) || 0;
                    const totalScore = baseScore !== "" ? Number(baseScore) + bonus : "";
                    const mod = calculateModifier(totalScore);

                    const isBlank = baseScore === "";
                    const isPrimary = activeOptimizationClass && CLASSES[activeOptimizationClass]?.primaryAbilities?.includes(key);
                    const cardBorder = (isPrimary && flashGuidance) ? 'animate-flash-3x' : 'border-gray-700 hover:border-brand-500';
                    const textClass = (isPrimary && flashGuidance) ? 'animate-flash-text-3x' : 'text-gray-400';

                    return (
                        <div key={key} className={`bg-[var(--color-dark-card)] p-4 pt-8 rounded-lg border flex items-center justify-between relative overflow-hidden group transition-colors ${cardBorder}`}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-gray-400 pointer-events-none scale-150 group-hover:text-brand-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                            </div>

                            <label className={`absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase z-10 ${textClass}`}>
                                {label}
                            </label>

                            <div className="flex flex-col items-center z-10">
                                <input
                                    type="number"
                                    value={totalScore}
                                    onChange={(e) => handleScoreChange(key, e.target.value)}
                                    placeholder="-"
                                    className={`w-20 text-center bg-gray-900/80 border-2 rounded-lg text-4xl font-bold py-2 focus:outline-none focus:border-brand-500 transition-colors placeholder:text-gray-700
                                        ${bonus > 0 && totalScore !== "" ? 'text-brand-400 border-brand-900/50' : 'text-white border-brand-900/50'}`}
                                />
                                <div className="mt-2 flex items-center justify-between w-full">
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                        {bonus > 0 && (
                                            <div className="px-1.5 py-0.5 bg-brand-100 text-brand-900 text-[9px] font-black rounded border border-brand-500 whitespace-nowrap flex items-center gap-0.5">
                                                <span>+{bonus}</span>
                                                <span className="opacity-70">SPS</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-2xl font-black ${isPrimary ? 'text-brand-500' : 'text-gray-400'}`}>
                                        {mod >= 0 ? '+' : ''}{mod}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 z-10 mt-2">
                                <button
                                    onClick={() => handleSwapUp(key)}
                                    disabled={isBlank || Number(baseScore) === highestVal}
                                    className="w-8 h-8 rounded bg-gray-800 border border-gray-600 text-gray-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-white transition-colors"
                                    title="Swap with next highest score"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <button
                                    onClick={() => handleSwapDown(key)}
                                    // Disable if blank, or if this score is equal to the absolute lowest score
                                    disabled={isBlank || Number(baseScore) === lowestVal}
                                    className="w-8 h-8 rounded bg-gray-800 border border-gray-600 text-gray-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 hover:text-white transition-colors"
                                    title="Swap with next lowest score"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
                </div>
                
                <hr className="border-gray-800 my-4 md:hidden block" />

                <div className="flex-1 w-full min-w-0">
                    <AbilityScoreImpact data={data} />
                </div>
            </div>
        </div>
    );
}
