import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ErrorKey = 'CORS_ERROR' | 'MONGO_CONNECTION_ERROR' | 'JWT_ERROR' | 'VALIDATION_ERROR' | 'HTTP_404_ERROR' | 'HTTP_500_ERROR' | 'NETWORK_TIMEOUT';

type ErrorDetail = {
  errorType: ErrorKey;
  title: string;
  layer: string;
  message: string;
  consoleOutput: string;
  solutionSteps: string[];
  solution: string;
};

type ErrorSimulationEngineProps = {
  onStartSimulation: (layer: string, message: string) => void;
  onResetSimulation: () => void;
  isAnimating: boolean;
};

const errorsConfig: Array<{ key: ErrorKey; label: string; layer: string; color: string }> = [
  { key: 'CORS_ERROR', label: 'CORS policy block', layer: 'REST API', color: 'from-amber-600 to-orange-500' },
  { key: 'MONGO_CONNECTION_ERROR', label: 'Mongo connection timeout', layer: 'MongoDB', color: 'from-rose-600 to-red-500' },
  { key: 'JWT_ERROR', label: 'JWT expired/invalid', layer: 'Express Server', color: 'from-violet-600 to-indigo-500' },
  { key: 'VALIDATION_ERROR', label: 'Schema validation fail', layer: 'MongoDB', color: 'from-pink-600 to-rose-500' },
  { key: 'HTTP_404_ERROR', label: '404 endpoint not found', layer: 'REST API', color: 'from-yellow-600 to-amber-500' },
  { key: 'HTTP_500_ERROR', label: '500 server crash', layer: 'Express Server', color: 'from-red-700 to-rose-600' },
  { key: 'NETWORK_TIMEOUT', label: 'Network timeout', layer: 'Browser', color: 'from-sky-600 to-blue-500' }
];

export function ErrorSimulationEngine({
  onStartSimulation,
  onResetSimulation,
  isAnimating
}: ErrorSimulationEngineProps) {
  const [selectedError, setSelectedError] = useState<ErrorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const handleTriggerError = async (errorType: ErrorKey) => {
    if (isAnimating || isLoading) return;

    setIsLoading(true);
    setSimulationActive(false);
    setAnimationCompleted(false);
    onResetSimulation();

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('http://localhost:5001/api/simulator/trigger', {
        method: 'POST',
        headers,
        body: JSON.stringify({ errorType })
      });

      if (!res.ok) throw new Error('Simulation failed');

      const data = await res.json();
      setSelectedError(data);
      setSimulationActive(true);
      
      // Start visualizer animation
      onStartSimulation(data.layer, data.message);
      
      // Complete animation overlay after Y seconds
      setTimeout(() => {
        setAnimationCompleted(true);
      }, 3500);

    } catch (err) {
      console.error(err);
      alert('Error triggering simulation. Make sure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedError(null);
    setSimulationActive(false);
    setAnimationCompleted(false);
    onResetSimulation();
  };

  return (
    <div className="space-y-6">
      {/* Simulation Selector panel */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-slate-900/40 shadow-xl">
        <p className="text-xs font-black uppercase tracking-wider text-emerald-400">Simulation deck</p>
        <h2 className="text-xl font-black text-white tracking-tight mt-1">Select an error to inject</h2>
        <p className="text-xs font-semibold text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Inject real full-stack failures to test backend routes, trigger visual connection halts, view terminal exceptions, and learn guided diagnostic methods.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {errorsConfig.map((err) => (
            <button
              key={err.key}
              onClick={() => handleTriggerError(err.key)}
              disabled={isAnimating || isLoading}
              className={`rounded-xl px-4 py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-tr shadow-md transition-all duration-300 hover:scale-103 cursor-pointer disabled:opacity-40 disabled:scale-100 ${err.color} ${
                selectedError?.errorType === err.key ? 'ring-2 ring-white scale-103 shadow-lg' : 'hover:brightness-110'
              }`}
              type="button"
            >
              🔥 {err.label}
            </button>
          ))}
          {selectedError && (
            <button
              onClick={handleClear}
              className="rounded-xl border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-3 text-xs font-black uppercase tracking-wider text-rose-400 transition cursor-pointer"
              type="button"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Simulated Output & Resolution guides */}
      <AnimatePresence>
        {simulationActive && selectedError && animationCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Terminal Console Output */}
            <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden min-h-[400px]">
              {/* Terminal Header */}
              <div className="bg-slate-900 px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs font-bold text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-[10px] uppercase font-black tracking-wider text-slate-500">System Terminal logs</span>
                </div>
                <span>Express Server Dev Console</span>
              </div>
              {/* Output Content */}
              <pre className="flex-1 p-5 overflow-auto font-mono text-[11px] leading-relaxed text-rose-400 bg-black/80 font-medium whitespace-pre-wrap select-all">
                {selectedError.consoleOutput}
              </pre>
            </div>

            {/* AI Diagnostics Guidance */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-slate-900/60 shadow-2xl flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <span className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-rose-400">
                    Broken layer: {selectedError.layer}
                  </span>
                  <h3 className="mt-2.5 text-lg font-black text-white leading-tight">{selectedError.title}</h3>
                  <p className="mt-2 text-xs font-semibold text-slate-400 leading-relaxed">
                    {selectedError.message}
                  </p>
                </div>

                <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1.5">🛠️ Guided Debugging Steps</h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-semibold leading-relaxed">
                      {selectedError.solutionSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                          <span className="text-emerald-400">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-1.5">💡 Explanation & Solution</h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-white/5">
                      {selectedError.solution}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClear}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3 text-xs font-extrabold uppercase tracking-wider text-white hover:brightness-110 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                type="button"
              >
                Clear simulation & reload stack
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
