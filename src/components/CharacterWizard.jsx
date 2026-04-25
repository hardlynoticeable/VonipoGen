import React, { useState, useEffect } from 'react';
import { saveCharacter, loadCharacter, exportCharacterJSON } from '../utils/storage';
import SpeciesLore from './SpeciesLore';
import CoreStats from './CoreStats';
import AbilityScores from './AbilityScores';
import SubclassSelector from './SubclassSelector';
import Equipment from './Equipment';
import Spells from './Spells';
import Review from './Review';
import { CLASSES, SUBCLASSES } from '../data/rules5e';

export const DEFAULT_CHARACTER = {
    name: '',
    class: '',
    subclass: '',
    background: '',
    alignment: '',
    level: 1,
    size: 'Medium', // Default size
    abilityScores: { str: '', dex: '', con: '', int: '', wis: '', cha: '' },
    abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    speciesSkills: [],
    selectedClassSkills: [],
    backgroundSkills: [],
    selectedCantrips: [],
    selectedSpells: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] },
    inventory: [],
    money: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    treasure: '',
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: '',
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: ''
};

export default function CharacterWizard() {
    const [step, setStep] = useState(1);
    const [characterData, setCharacterData] = useState(DEFAULT_CHARACTER);
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        const saved = loadCharacter();
        if (saved) {
            setCharacterData(saved);
        }
    }, []);

    useEffect(() => {
        const handleReset = () => {
            setCharacterData(DEFAULT_CHARACTER);
            setStep(1);
            saveCharacter(DEFAULT_CHARACTER);
        };

        const handleSave = () => {
            exportCharacterJSON(characterData);
        };

        const handleTriggerLoad = () => {
            if (fileInputRef.current) fileInputRef.current.click();
        };

        window.addEventListener('reset-character', handleReset);
        window.addEventListener('save-character', handleSave);
        window.addEventListener('trigger-load-character', handleTriggerLoad);
        
        return () => {
            window.removeEventListener('reset-character', handleReset);
            window.removeEventListener('save-character', handleSave);
            window.removeEventListener('trigger-load-character', handleTriggerLoad);
        };
    }, [characterData]);

    const hasSpells = Boolean(characterData.class && CLASSES[characterData.class]?.spellcasting);
    const hasSubclass = Boolean(
        characterData.class &&
        SUBCLASSES[characterData.class]
    );

    // Build conditional steps array dynamically
    const stepsConfig = [
        { id: 1, label: 'Background', canEnter: true },
        { id: 2, label: 'Class', canEnter: !!characterData.species },
        { id: 3, label: 'Abilities', canEnter: !!characterData.class }
    ];

    let currentId = 4;
    if (hasSubclass) {
        stepsConfig.push({ id: currentId++, label: 'Subclass', canEnter: !!characterData.class });
    }
    if (hasSpells) {
        stepsConfig.push({ id: currentId++, label: 'Spells', canEnter: !!characterData.class });
    }

    // Always append Gear and Review
    const gearStepId = currentId++;
    const reviewStepId = currentId;

    stepsConfig.push({ id: gearStepId, label: 'Gear', canEnter: !!characterData.class });
    stepsConfig.push({ id: reviewStepId, label: 'Review', canEnter: !!characterData.class });

    const maxSteps = stepsConfig.length;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    useEffect(() => {
        if (step > maxSteps) setStep(maxSteps);
    }, [maxSteps, step]);

    const nextStep = () => setStep(s => Math.min(s + 1, maxSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const updateData = (newData) => {
        const merged = { ...characterData, ...newData };
        setCharacterData(merged);
        saveCharacter(merged);
    };

    const handleTabClick = (targetStepId) => {
        const targetStep = stepsConfig.find(s => s.id === targetStepId);
        if (targetStep && targetStep.canEnter) {
            setStep(targetStepId);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedData = JSON.parse(event.target.result);
                // Simple validation check: ensure it has basic keys
                if (loadedData.abilityScores && loadedData.level) {
                    setCharacterData(loadedData);
                    saveCharacter(loadedData);
                    alert(`Character "${loadedData.name || 'Unnamed'}" loaded successfully!`);
                } else {
                    alert("Invalid character file format.");
                }
            } catch (err) {
                console.error("Error parsing JSON:", err);
                alert("Failed to read character file.");
            }
        };
        reader.readAsText(file);
        // Clear input so same file can be loaded again
        e.target.value = '';
    };

    return (
        <div className="glass-card w-full max-w-4xl mx-auto p-8 shadow-2xl relative overflow-hidden">
            {/* Hidden File Input for Loading */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-8 relative z-10 gap-2">
                {stepsConfig.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => handleTabClick(s.id)}
                        disabled={!s.canEnter}
                        className={`flex-1 text-center border-b-2 pb-4 transition-all duration-300 focus:outline-none 
                            ${step === s.id ? 'border-brand-500 text-brand-500 font-bold scale-105'
                                : s.canEnter ? 'border-gray-600 text-gray-400 hover:text-brand-300 hover:border-brand-300 cursor-pointer'
                                    : 'border-gray-800 text-gray-700 cursor-not-allowed'}`}
                    >
                        <span className="text-sm tracking-wider uppercase">{s.label}</span>
                    </button>
                ))}
            </div>

            <div className="min-h-[400px] relative z-10">
                {step === 1 && <SpeciesLore data={characterData} updateData={updateData} />}
                {step === 2 && <CoreStats data={characterData} updateData={updateData} />}
                {step === 3 && <AbilityScores data={characterData} updateData={updateData} />}
                {hasSubclass && step === stepsConfig.find(s => s.label === 'Subclass')?.id && <SubclassSelector data={characterData} updateData={updateData} />}
                {hasSpells && step === stepsConfig.find(s => s.label === 'Spells')?.id && <Spells data={characterData} updateData={updateData} />}
                {step === gearStepId && <Equipment data={characterData} updateData={updateData} />}
                {step === reviewStepId && <Review data={characterData} updateData={updateData} />}
            </div>

            <div className="flex justify-between mt-8 relative z-10 pt-4 border-t border-dark-border">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="px-8 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-30 transition-all font-medium uppercase tracking-wider text-sm"
                >
                    Back
                </button>
                {step < maxSteps && (
                    <button
                        onClick={nextStep}
                        className="px-8 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all font-medium uppercase tracking-wider text-sm"
                    >
                        Next Step
                    </button>
                )}
            </div>
        </div>
    );
}
