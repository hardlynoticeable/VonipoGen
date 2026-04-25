import React from 'react';
import { CLASSES, SKILLS, BACKGROUNDS } from '../data/rules5e';
import { calculateStats } from '../utils/stats';
import { SPECIES } from '../data/species5e';

export default function AbilityScoreImpact({ data }) {
    if (!data.class) return null;

    const stats = calculateStats(data);
    const { maxHp, ac, acNote, hasShield, passivePerception, initiative, mods, profBonus, knownSkills } = stats;

    const level = Number(data.level) || 1;
    const charClass = CLASSES[data.class];
    const formatMod = (m) => (m >= 0 ? `+${m}` : `${m}`);


    return (
        <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-brand-400 mb-6">
                Mechanical Impact (Level {level} {data.class})
            </h3>

            {/* Top Row: Core Derived Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-brand-900/10 border border-brand-900/40 p-4 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <p className="text-[10px] text-brand-300 font-bold uppercase mb-1">Armor Class</p>
                    <p className="text-sm text-brand-400 font-black flex items-center gap-2">
                        {(() => {
                            const scores = data.abilityScores;
                            const dex = Number(scores.dex || 10) + (SPECIES[data.species]?.abilityBonuses?.dex || 0);
                            const dexMod = Math.floor((dex - 10) / 2);
                            const gearAC = 10 + dexMod;
                            return gearAC;
                        })()}
                        <span className="text-[8px] opacity-40">BASE(10)+DEX</span>
                    </p>
                </div>

                <div className="bg-brand-900/10 border border-brand-900/40 p-4 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <p className="text-[10px] text-brand-300 font-bold uppercase mb-1">Initiative</p>
                    <p className="text-sm text-brand-400 font-black flex items-center gap-2">
                        {(() => {
                            const dex = Number(data.abilityScores.dex || 10) + (SPECIES[data.species]?.abilityBonuses?.dex || 0);
                            const mod = Math.floor((dex - 10) / 2);
                            return mod >= 0 ? `+${mod}` : mod;
                        })()}
                        <span className="text-[8px] opacity-40">DEX MOD</span>
                    </p>
                </div>

                <div className="bg-brand-900/10 border border-brand-900/40 p-4 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <p className="text-[10px] text-brand-300 font-bold uppercase mb-1">Hit Points</p>
                    <p className="text-sm text-brand-400 font-black flex items-center gap-2">
                        {(() => {
                            const con = Number(data.abilityScores.con || 10) + (SPECIES[data.species]?.abilityBonuses?.con || 0);
                            const mod = Math.floor((con - 10) / 2);
                            const classHP = CLASSES[data.class]?.hpDice || 8;
                            return (classHP + mod) * Number(data.level || 1);
                        })()}
                        <span className="text-[8px] opacity-40">MAX L1</span>
                    </p>
                </div>

                <div className="bg-brand-900/10 border border-brand-900/40 p-4 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <p className="text-[10px] text-brand-300 font-bold uppercase mb-1">Passive Perc.</p>
                    <p className="text-sm text-brand-400 font-black flex items-center gap-2">
                        {(() => {
                            const wis = Number(data.abilityScores.wis || 10) + (SPECIES[data.species]?.abilityBonuses?.wis || 0);
                            const mod = Math.floor((wis - 10) / 2);
                            const isProf = (data.classSkills || []).includes('Perception') || 
                                           (SPECIES[data.species]?.traits || []).some(t => t.toLowerCase().includes('perception proficiency')) ||
                                           (BACKGROUNDS[data.background] || []).includes('Perception');
                            const profBonus = 2; // Fixed lvl 1 bonus for preview
                            return 10 + mod + (isProf ? profBonus : 0);
                        })()}
                        <span className="text-[8px] opacity-40">10+WIS+PROF</span>
                    </p>
                </div>
            </div>

            {/* Mechanical Breakdown Box */}
            <div className="bg-brand-900/10 border border-brand-500/20 rounded-lg p-5 mb-8">
                <h3 className="text-xs font-black text-brand-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Calculation Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {/* AC Breakdown */}
                    <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Armor Class</span>
                        <div className="text-right">
                            <p className="text-xs font-mono text-white">
                                {stats.breakdown.ac.base} (Base)
                                {stats.breakdown.ac.dexBonus !== 0 && ` + ${stats.breakdown.ac.dexBonus} (DEX)`}
                                {stats.breakdown.ac.shieldBonus !== 0 && ` + ${stats.breakdown.ac.shieldBonus} (Shield)`}
                                {stats.breakdown.ac.specialBonus !== 0 && ` + ${stats.breakdown.ac.specialBonus} (Bonus)`}
                                {stats.breakdown.ac.itemBonus !== 0 && ` + ${stats.breakdown.ac.itemBonus} (Items)`}
                                {` = `}
                                <span className="text-brand-400 font-bold">{stats.breakdown.ac.total}</span>
                            </p>
                            <p className="text-[9px] text-gray-500 italic uppercase tracking-tighter">{stats.breakdown.ac.specialNote}</p>
                        </div>
                    </div>

                    {/* HP Breakdown */}
                    <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Hit Points</span>
                        <div className="text-right">
                            <p className="text-xs font-mono text-white">
                                {stats.breakdown.hp.base} (L1)
                                {level > 1 && ` + ${stats.breakdown.hp.levelBonus} (L2+)`}
                                {stats.breakdown.hp.conBonus !== 0 && ` + ${stats.breakdown.hp.conBonus} (CON)`}
                                {` = `}
                                <span className="text-brand-400 font-bold">{stats.breakdown.hp.total}</span>
                            </p>
                            <p className="text-[9px] text-gray-500 italic uppercase tracking-tighter">Level {level} {data.class}</p>
                        </div>
                    </div>

                    {/* Initiative Breakdown */}
                    <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Initiative</span>
                        <div className="text-right font-mono text-xs text-white">
                            {formatMod(stats.breakdown.initiative.dexMod)} (DEX Mod)
                            {` = `}
                            <span className="text-brand-400 font-bold">{formatMod(stats.breakdown.initiative.total)}</span>
                        </div>
                    </div>

                    {/* Passive Perception Breakdown */}
                    <div className="flex justify-between items-center border-b border-gray-800/50 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase">Passive Perception</span>
                        <div className="text-right font-mono text-xs text-white">
                            10 (Base)
                            {stats.breakdown.passivePerception.wisMod !== 0 && ` + ${formatMod(stats.breakdown.passivePerception.wisMod)} (WIS)`}
                            {stats.breakdown.passivePerception.profBonus !== 0 && ` + ${stats.breakdown.passivePerception.profBonus} (Prof)`}
                            {` = `}
                            <span className="text-brand-400 font-bold">{stats.breakdown.passivePerception.total}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Saving Throws */}
                <div className="bg-gray-900 border border-gray-700 rounded p-4">
                    <div className="flex justify-between items-baseline mb-4 border-b border-gray-800 pb-2">
                        <h4 className="font-bold text-brand-500 uppercase text-sm tracking-wider">Saving Throws</h4>
                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">Prof Bonus: +{profBonus}</span>
                    </div>
                    <div className="space-y-2">
                        {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => {
                            const isProf = charClass.saves.includes(stat);
                            const totalSave = stats.mods[stat] + (isProf ? profBonus : 0);
                            return (
                                <div key={stat} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full border ${isProf ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}></div>
                                        <span className={`uppercase font-mono ${isProf ? 'text-white font-bold' : 'text-gray-400'}`}>{stat}</span>
                                    </div>
                                    <span className={`font-mono ${isProf ? 'text-brand-400 font-bold' : 'text-gray-400'}`}>{formatMod(totalSave)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-gray-900 border border-gray-700 rounded p-4 lg:col-span-2">
                    <h4 className="font-bold text-emerald-500 uppercase text-sm tracking-wider mb-4 border-b border-gray-800 pb-2">Skills Overview</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                        {Object.entries(SKILLS).map(([skillName, governingStat]) => {
                            const isProf = knownSkills.has(skillName);
                            const totalSkill = mods[governingStat] + (isProf ? profBonus : 0);

                            return (
                                <div key={skillName} className="flex justify-between items-center text-sm py-1 border-b border-gray-800/50 hover:bg-gray-800/50 px-1 rounded transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full border ${isProf ? 'bg-brand-500 border-brand-500' : 'border-gray-600'}`}></div>
                                        <span className={isProf ? 'text-white font-bold' : 'text-gray-400'}>{skillName} <span className="text-[10px] text-gray-500 uppercase ml-1">({governingStat})</span></span>
                                    </div>
                                    <span className={`font-mono ${isProf ? 'text-brand-400 font-bold' : 'text-gray-400'}`}>{formatMod(totalSkill)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
