import React, { useRef, useEffect } from 'react';
import { SUBCLASSES, CLASSES } from '../data/rules5e';

export default function SubclassSelector({ data, updateData }) {
    const charClass = data.class;
    const subclasses = SUBCLASSES[charClass] || {};
    const subclassTitle = CLASSES[charClass]?.subclassTitle || "Subclass";
    const optionsRef = useRef(null);

    const requiredLevel = CLASSES[charClass]?.subclassLevel || 3;
    const isRestricted = data.level < requiredLevel;

    useEffect(() => {
        if (data.subclass && subclasses[data.subclass]?.subclassOptions && optionsRef.current) {
            optionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [data.subclass]);

    const handleSelect = (subclassName) => {
        if (isRestricted) return;
        updateData({
            subclass: subclassName,
            subclassOption: '' // Reset option when specialization changes
        });
    };

    if (Object.keys(subclasses).length === 0) {
        return (
            <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <h2 className="text-3xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                        {subclassTitle}
                    </h2>
                    <p className="text-gray-400 text-center max-w-lg">
                        {charClass} does not have any further {subclassTitle.toLowerCase()} selection required at this step in the current data set.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in text-[var(--color-brand-100)] h-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
            <h2 className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-fuchsia-300">
                Choose Your {subclassTitle}
            </h2>

            {isRestricted ? (
                <div className="bg-amber-900/40 border border-amber-500/50 p-4 rounded-lg mb-6 animate-pulse">
                    <div>
                        <h4 className="font-bold text-amber-500">Level Requirement Not Met</h4>
                        <p className="text-sm text-amber-200/80">
                            {charClass} characters gain their {subclassTitle.toLowerCase()} at <strong>Level {requiredLevel}</strong>.
                            You are currently Level {data.level}. You can view the options below, but cannot select one yet.
                        </p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-300 mb-6 font-medium">
                    {subclassTitle}s grant potent new abilities, tool proficiencies, and spells at {requiredLevel === 1 ? '1st level' : requiredLevel === 2 ? '2nd level' : '3rd level'} and beyond.
                </p>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-2 transition-all duration-500 ${isRestricted ? 'grayscale opacity-50 pointer-events-none filter blur-[1px]' : ''}`}>
                {Object.entries(subclasses).map(([name, details]) => (
                    <div
                        key={name}
                        onClick={() => updateData({ subclass: name, subclassOption: null })}
                        className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group
                            ${data.subclass === name
                                ? 'bg-brand-900/40 border-brand-500 shadow-[0_0_15px_rgba(var(--color-brand-rgb),0.3)] scale-[1.02]'
                                : 'bg-[var(--color-dark-card)] border-gray-700 hover:border-brand-500/50 hover:bg-gray-800'}`}
                    >
                        <h3 className="text-xl font-bold text-brand-400 mb-2">{name}</h3>
                        <p className="text-sm text-gray-300 mb-4 italic leading-relaxed">"{details.description}"</p>

                        <div className="space-y-4">
                            {details.effect && (
                                <div>
                                    <span className="font-bold text-brand-400 block mb-1 uppercase tracking-wider text-[10px]">Primary Effect:</span>
                                    <span className="whitespace-pre-line text-brand-100/80 text-sm leading-relaxed">{details.effect}</span>
                                </div>
                            )}
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 17, 18, 20].map(levelNum => {
                                const levelKey = `level${levelNum}`;
                                if (!details[levelKey]) return null;

                                const hasAccess = data.level >= levelNum;
                                return (
                                    <div key={levelKey} className={`text-xs mt-3 ${hasAccess ? 'text-gray-300' : 'text-gray-500'}`}>
                                        <span className={`font-bold flex items-center gap-1.5 mb-1 text-[10px] uppercase tracking-widest ${hasAccess ? 'text-brand-400' : 'text-gray-500'}`}>
                                            <Award size={10} />
                                            {levelNum}th Level Feature
                                            {hasAccess && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </span>
                                        <span className="whitespace-pre-line">{details[levelKey]}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Subclass Options Selection */}
            {data.subclass && subclasses[data.subclass]?.subclassOptions && (
                <div ref={optionsRef} className="mt-8 p-6 bg-brand-900/20 border border-brand-500/30 rounded-xl animate-fade-in shadow-[0_0_30px_rgba(var(--color-brand-rgb),0.1)]">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-xl font-bold text-brand-400">{subclasses[data.subclass].subclassOptions.title}</h3>
                        <span className="text-[10px] bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded border border-brand-500/30 font-black uppercase">REQUIRED CHOICE</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {Object.entries(subclasses[data.subclass].subclassOptions.choices).map(([choice, description]) => (
                            <div
                                key={choice}
                                className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden group
                                    ${data.subclassOption === choice
                                    ? 'bg-brand-500/20 border-brand-400 ring-1 ring-brand-500/50 shadow-[0_0_15px_rgba(var(--color-brand-rgb),0.2)]'
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-brand-500/50 hover:bg-gray-750'}`}
                                onClick={() => updateData({ subclassOption: choice })}
                            >
                                <input
                                    type="radio"
                                    name="subclassOption"
                                    className="hidden"
                                    checked={data.subclassOption === choice}
                                    onChange={() => updateData({ subclassOption: choice })}
                                />
                                <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center ${data.subclassOption === choice ? 'border-brand-400' : ''}`}>
                                        {data.subclassOption === choice && <div className="w-1.5 h-1.5 rounded-full bg-brand-600"></div>}
                                    </div>
                                    <span className={`font-bold transition-colors ${data.subclassOption === choice ? 'text-white' : 'group-hover:text-gray-300'}`}>{choice}</span>
                                </div>
                                <p className={`text-sm ${data.subclassOption === choice ? 'text-brand-100/90' : 'text-gray-400'} ml-6`}>
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                    {!data.subclassOption && (
                        <p className="mt-4 text-xs text-amber-500 animate-pulse font-medium">
                            * Please select an option for your {subclassTitle.toLowerCase()}.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
