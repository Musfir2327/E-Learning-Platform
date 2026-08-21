import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AIAnalysis = {
  layerAnalyzed: string;
  severity: string;
  rootCause: string;
  stepByStepFix: string;
  preventionTips: string;
  beginnerExplanation: string;
};

type ConsoleMentorProps = {
  onAwardXP: (xp: number) => void;
};

export function ConsoleMentor({ onAwardXP }: ConsoleMentorProps) {
  const [rawError, setRawError] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawError.trim() || isLoading) return;

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/mentor/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          rawError: rawError.trim(),
          codeSnippet: codeSnippet.trim()
        })
      });

      if (!response.ok) {
        throw new Error('AI Diagnosis request failed');
      }

      const data = await response.json();
      setAnalysisResult(data);
      onAwardXP(50); // Inform parent to update user session XP

    } catch (error: any) {
      console.error(error);
      alert('Error connecting to AI diagnostic server: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (sev: string) => {
    const s = sev.toLowerCase();
    if (s.includes('critical')) return 'bg-red-500/10 border-red-500/20 text-red-400';
    if (s.includes('high')) return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
    if (s.includes('medium')) return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
    return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  };

  return (
    <div className="space-y-6">
      {/* Paste Section */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-900/40 shadow-xl">
        <p className="text-xs font-black uppercase tracking-wider text-emerald-400 font-sans">AI Diagnostics Console</p>
        <h2 className="text-xl font-black text-white tracking-tight mt-1">Submit Error Trace & Code</h2>
        
        <form onSubmit={handleDiagnose} className="mt-5 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="error-input">
                Error log / Stack trace (Required)
              </label>
              <textarea
                id="error-input"
                required
                rows={6}
                value={rawError}
                onChange={(e) => setRawError(e.target.value)}
                placeholder="Paste your console output here (e.g. MongooseServerSelectionError, AxiosError: timeout, or npm crash logs)..."
                className="w-full font-mono text-xs rounded-xl border border-white/5 bg-slate-950/60 p-4 text-slate-300 placeholder:text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/25 transition resize-y"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5" htmlFor="code-input">
                Related Code Snippet (Optional)
              </label>
              <textarea
                id="code-input"
                rows={6}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="Paste the React component, Express route, or Database configuration code you suspect is causing the crash..."
                className="w-full font-mono text-xs rounded-xl border border-white/5 bg-slate-950/60 p-4 text-slate-300 placeholder:text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/25 transition resize-y"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!rawError.trim() || isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 btn-shimmer hover:brightness-110 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Mentor is diagnosing error...' : '⚡ Request AI Diagnosis (+50 XP)'}
          </button>
        </form>
      </div>

      {/* Analysis Results Display */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]"
          >
            {/* Left Column: Metadata & Analogy */}
            <div className="space-y-6 flex flex-col">
              <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-slate-900/60 shadow-xl flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">layer breakdown</span>
                    <h3 className="text-2xl font-black text-white leading-tight mt-1">{analysisResult.layerAnalyzed}</h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${getSeverityColor(analysisResult.severity)}`}>
                      Severity: {analysisResult.severity}
                    </span>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1.5">🎯 Root Cause Summary</h4>
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                      {analysisResult.rootCause}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-1.5">💡 Beginner Analogy</h4>
                  <p className="text-xs leading-relaxed text-slate-400 font-medium italic">
                    "{analysisResult.beginnerExplanation}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Fix & Prevention */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-slate-900/60 shadow-xl flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1.5">🛠️ Step-by-Step Fix</h4>
                  <div className="text-xs text-slate-300 font-semibold leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5 whitespace-pre-wrap select-all font-mono">
                    {analysisResult.stepByStepFix}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-400 mb-1.5">🛡️ Prevention & Best Practice</h4>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-950/20 p-3.5 rounded-xl border border-white/5">
                    {analysisResult.preventionTips}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
                🎉 Solved this issue? The fix has been logged, raising your proficiency stats!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
