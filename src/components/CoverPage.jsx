import React from 'react';
import { Sword, Sparkles, Save, WifiOff } from 'lucide-react';

const CoverPage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-6 py-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="max-w-4xl w-full z-10 flex flex-col items-center">
                {/* Title Section */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-fuchsia-400 to-brand-500 drop-shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                        The D&D 5e Character Sheet Generator
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-brand-500 to-fuchsia-500 mx-auto rounded-full"></div>
                </div>

                {/* Hero Image Section */}
                <div className="relative group w-full max-w-2xl aspect-[16/9] mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <img 
                        src="/coverart1.png" 
                        alt="D&D Cover Art" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content Area */}
                <div className="text-center max-w-2xl space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <Sparkles size={20} className="text-brand-400" />
                            <span>Many Species</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Sword size={20} className="text-fuchsia-400" />
                            <span>Multiclassing</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <WifiOff size={20} className="text-brand-400" />
                            <span>Works Offline</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Save size={20} className="text-fuchsia-400" />
                            <span>Local Saves</span>
                        </div>
                    </div>

                    <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed">
                        Made by fans, for fans. Generate professional PDF character sheets with ease. 
                        Our generator supports all official classes and species, handling the complex math 
                        so you can focus on the roleplay.
                    </p>

                    <blockquote className="italic text-brand-300 font-serif text-xl border-l-4 border-brand-500 pl-6 py-2">
                        "Every legend begins with a single sheet. Forge your path, write your story, 
                        and embark on an adventure that will echo through the ages."
                    </blockquote>

                    <button
                        onClick={onGetStarted}
                        className="group relative px-12 py-5 bg-gradient-to-r from-brand-600 to-fuchsia-600 rounded-2xl font-black uppercase tracking-tighter text-xl shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Get Started
                            <Sword size={24} className="group-hover:rotate-45 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </div>
            
            {/* Attribution */}
            <div className="absolute bottom-8 text-gray-600 text-xs font-medium uppercase tracking-[0.2em]">
                Vonipo Character Generator • v1.2
            </div>
        </div>
    );
};

export default CoverPage;
