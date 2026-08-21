import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LayerId = 'browser' | 'react' | 'api' | 'express' | 'mongodb';

type LayerInfo = {
  id: LayerId;
  name: string;
  description: string;
  responsibilities: string[];
  mistakes: string[];
  practices: string[];
  tech: string;
};

const layersData: Record<LayerId, LayerInfo> = {
  browser: {
    id: 'browser',
    name: 'Browser (User Interface)',
    tech: 'HTML5 / Vanilla CSS / DOM',
    description: 'The starting and ending point of the full-stack request cycle. It renders the static layout and executes user actions (like clicks, form inputs, page visits).',
    responsibilities: [
      'Render the HTML document structure.',
      'Apply CSS styling, transitions, and layout grids.',
      'Capture input clicks and hand them off to the JavaScript runtime.'
    ],
    mistakes: [
      'Hardcoding API links directly in native element attributes.',
      'Performing zero client-side validations, overloading server ports.',
      'Storing critical security passwords or encryption secrets in plain client local storage.'
    ],
    practices: [
      'Keep markup fully semantic (use tags like <main>, <header>, <nav>).',
      'Optimize layout responsiveness using CSS Flexbox and Grid models.',
      'Enforce strict Content Security Policies (CSP) to block malicious scripts.'
    ]
  },
  react: {
    id: 'react',
    name: 'React Frontend (Client State)',
    tech: 'React / Framer Motion / Axios',
    description: 'The client-side application logic. It handles the local states, dynamically updates the UI, manages client-side routing, and issues async requests to backend APIs.',
    responsibilities: [
      'Manage local component states and reactive re-renders.',
      'Trigger asynchronous REST HTTP fetch requests (via Axios or fetch API).',
      'Format and validate forms before request submission.'
    ],
    mistakes: [
      'Mutating state directly (e.g., state.value = x) instead of using setstate setter hooks.',
      'Creating infinite re-render loops by omitting dependency arrays in useEffect hook.',
      'Over-fetching API data repeatedly by failing to cache responses locally.'
    ],
    practices: [
      'Encapsulate repeating API client initializers into dedicated reusable custom hooks.',
      'Ensure proper handling of loading states and fetch failure exceptions.',
      'Write components focused on singular responsibilities for better maintainability.'
    ]
  },
  api: {
    id: 'api',
    name: 'REST API Gateway (Routing Layer)',
    tech: 'Express Router / HTTP Protocols',
    description: 'The entrance gateway of the backend. It maps incoming request URLs to specific server endpoints, checks request formats, and enforces security CORS headers.',
    responsibilities: [
      'Listen for connections and direct request URLs to correct controller handlers.',
      'Define CORS configurations to permit client domains to communicate.',
      'Intercept requests with early validation controls (checks if inputs exist).'
    ],
    mistakes: [
      'Spelling URL pathways incorrectly (e.g. /api/course vs /api/courses).',
      'Using the wrong HTTP method (e.g. requesting GET to write database documents).',
      'Failing to handle CORS parameters, triggering access-denied warnings in browsers.'
    ],
    practices: [
      'Enforce proper RESTful conventions for URL routing trees (e.g., nouns for resources).',
      'Adopt JSON payloads for all API communication exchanges.',
      'Always respond with standardized HTTP status codes (200 OK, 400 Bad Request, etc.).'
    ]
  },
  express: {
    id: 'express',
    name: 'Express Server (Business Logic)',
    tech: 'Node.js / Express Middleware',
    description: 'The powerhouse of the application. It processes middleware stacks (like JWT decoding, authorization), runs core algorithms, and coordinates transactions.',
    responsibilities: [
      'Execute business logical algorithms and user authentication controls.',
      'Authenticate tokens (JWT) and restrict paths via middleware filters.',
      'Manage connections and request limits to prevent server crashes.'
    ],
    mistakes: [
      'Leaving database queries outside try-catch loops, crashing servers on faults.',
      'Omit calling next() in custom middleware, hanging requests indefinitely.',
      'Keeping sensitive cryptographic secrets inside code files instead of .env files.'
    ],
    practices: [
      'Store all secrets inside environment variables (e.g., process.env).',
      'Enforce global error catchers at the end of middleware chains.',
      'Always write comprehensive unit tests to validate server route responses.'
    ]
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB Database (Persistence)',
    tech: 'MongoDB / Mongoose schemas',
    description: 'The persistent store of the application. It saves user credentials, documents, and lists, runs index aggregations, and returns documents.',
    responsibilities: [
      'Store collections and documents securely in disk space.',
      'Execute query indexes, filters, updates, and delete aggregations.',
      'Enforce schema types and validations via Mongoose rules.'
    ],
    mistakes: [
      'Querying MongoDB on un-indexed fields, causing database slow-downs.',
      'Storing user login passwords in plain readable text (failing to hash them).',
      'Dropping active database connection listeners by neglecting event bindings.'
    ],
    practices: [
      'Secure passwords by hashing them with salt (using bcryptjs) before saving.',
      'Design clear schemas matching frontend data expectations to prevent type mismatches.',
      'Configure auto-reconnect logic to recover from socket drops gracefully.'
    ]
  }
};

type ArchitectureVisualizerProps = {
  isAnimating: boolean;
  onAnimationEnd?: () => void;
  activeErrorLayer: string | null;
  errorMessage: string | null;
};

export function ArchitectureVisualizer({
  isAnimating,
  onAnimationEnd,
  activeErrorLayer,
  errorMessage: _errorMessage
}: ArchitectureVisualizerProps) {
  const [selectedLayer, setSelectedLayer] = useState<LayerInfo | null>(null);
  
  // Track animation position: 'idle', 'browser', 'react', 'api', 'express', 'mongodb', 'response', 'done'
  const [pulsePos, setPulsePos] = useState<'idle' | 'browser' | 'react' | 'api' | 'express' | 'mongodb' | 'response' | 'error' | 'done'>('idle');

  React.useEffect(() => {
    if (isAnimating) {
      setPulsePos('browser');
      const sequence = [
        { pos: 'react', delay: 800 },
        { pos: 'api', delay: 1600 },
        { pos: 'express', delay: 2400 },
        { pos: 'mongodb', delay: 3200 }
      ];

      const timers: any[] = [];

      sequence.forEach((step) => {
        const t = setTimeout(() => {
          // If we encounter an error layer, halt the pulse at that layer!
          if (activeErrorLayer && getLayerKey(activeErrorLayer) === step.pos) {
            setPulsePos('error');
            if (onAnimationEnd) onAnimationEnd();
            return;
          }
          setPulsePos(step.pos as any);

          // If we hit the end of the chain (mongodb) and there is no error, animate the response back!
          if (step.pos === 'mongodb') {
            const returnTimer = setTimeout(() => {
              setPulsePos('response');
              const doneTimer = setTimeout(() => {
                setPulsePos('done');
                if (onAnimationEnd) onAnimationEnd();
              }, 1200);
              timers.push(doneTimer);
            }, 1000);
            timers.push(returnTimer);
          }
        }, step.delay);
        timers.push(t);
      });

      // Special check if the error is right at the React or REST API gateway
      if (activeErrorLayer) {
        const errKey = getLayerKey(activeErrorLayer);
        if (errKey === 'browser' || errKey === 'react') {
          setTimeout(() => {
            setPulsePos('error');
            if (onAnimationEnd) onAnimationEnd();
          }, errKey === 'browser' ? 200 : 900);
        }
      }

      return () => {
        timers.forEach(clearTimeout);
      };
    } else {
      setPulsePos('idle');
    }
  }, [isAnimating, activeErrorLayer]);

  const getLayerKey = (layerName: string): LayerId => {
    const name = layerName.toLowerCase();
    if (name.includes('mongo')) return 'mongodb';
    if (name.includes('express') || name.includes('server')) return 'express';
    if (name.includes('api')) return 'api';
    if (name.includes('react')) return 'react';
    return 'browser';
  };

  const getPulseY = () => {
    switch (pulsePos) {
      case 'browser': return '10%';
      case 'react': return '30%';
      case 'api': return '50%';
      case 'express': return '70%';
      case 'mongodb': return '90%';
      case 'error':
        if (activeErrorLayer) {
          const key = getLayerKey(activeErrorLayer);
          if (key === 'browser') return '10%';
          if (key === 'react') return '30%';
          if (key === 'api') return '50%';
          if (key === 'express') return '70%';
          return '90%';
        }
        return '90%';
      default: return '0%';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {/* Interactive Visualizer Canvas */}
      <div className="glass-panel rounded-2xl p-8 border border-white/5 bg-slate-900/40 min-h-[550px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          ⚡ Interactive Request Flow & Architecture
          {pulsePos !== 'idle' && pulsePos !== 'done' && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
              {pulsePos === 'error' ? '💥 request stopped' : '🚀 request active'}
            </span>
          )}
        </h2>

        {/* Central visual stack */}
        <div className="relative flex-1 flex flex-col items-center justify-around py-6 my-4">
          
          {/* Vertical connecting pathway line */}
          <div className="absolute top-[10%] bottom-[10%] w-[4px] bg-slate-800 rounded-full overflow-hidden">
            {/* Glowing Request Animation pulse */}
            {isAnimating && (pulsePos !== 'idle' && pulsePos !== 'done') && (
              <motion.div
                className={`absolute w-full h-[60px] rounded-full filter blur-xs ${
                  pulsePos === 'error' ? 'bg-rose-500 shadow-[0_0_20px_#f43f5e]' : 'bg-emerald-400 shadow-[0_0_25px_#34d399]'
                }`}
                style={{ top: getPulseY() }}
                animate={pulsePos === 'response' ? {
                  top: ['90%', '10%'],
                  height: ['40px', '20px']
                } : {}}
                transition={pulsePos === 'response' ? { duration: 1.2, ease: 'easeInOut' } : { duration: 0.5 }}
              />
            )}
          </div>

          {/* Render layer nodes */}
          {(Object.keys(layersData) as LayerId[]).map((key, idx) => {
            const layer = layersData[key];
            const isSelected = selectedLayer?.id === key;
            const isCurrentPulse = pulsePos === key;
            const isFailedNode = pulsePos === 'error' && activeErrorLayer && getLayerKey(activeErrorLayer) === key;

            return (
              <motion.button
                key={key}
                onClick={() => setSelectedLayer(layer)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-10 w-full max-w-md rounded-xl p-4.5 text-left border flex items-center justify-between shadow-lg backdrop-blur-md transition-all duration-300 ${
                  isFailedNode
                    ? 'border-rose-500/50 bg-rose-950/20 text-rose-300 ring-2 ring-rose-500 shadow-rose-500/20'
                    : isCurrentPulse
                    ? 'border-emerald-500/50 bg-emerald-950/10 text-emerald-300 ring-1 ring-emerald-400 shadow-emerald-500/10'
                    : isSelected
                    ? 'border-white/20 bg-slate-800/80 text-white'
                    : 'border-white/5 bg-slate-900/60 text-slate-300 hover:border-white/10 hover:bg-slate-900/90'
                }`}
                type="button"
              >
                <div className="flex items-center gap-4">
                  {/* Visual Node Number */}
                  <span className={`grid h-8 w-8 place-items-center rounded-lg font-black text-xs ${
                    isFailedNode 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 animate-pulse'
                      : isCurrentPulse
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'bg-slate-950/50 text-slate-400'
                  }`}>
                    {isFailedNode ? '⚠️' : idx + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight text-white leading-snug">{layer.name}</h3>
                    <p className={`text-[10px] font-bold ${isFailedNode ? 'text-rose-400' : isCurrentPulse ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {layer.tech}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {isFailedNode && (
                    <span className="text-[10px] font-extrabold tracking-wider uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-md animate-pulse">
                      crashed
                    </span>
                  )}
                  <span className="text-slate-600 text-xs">🛈</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
          💡 Click any layer node to inspect its inner workings & best practices
        </p>
      </div>

      {/* Layer details Sidebar panel */}
      <div className="flex flex-col h-full justify-between">
        <AnimatePresence mode="wait">
          {selectedLayer ? (
            <motion.div
              key={selectedLayer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel rounded-2xl p-6 border border-white/10 bg-slate-950/70 shadow-2xl flex-1 flex flex-col justify-between"
            >
              <div className="space-y-5.5">
                {/* Header */}
                <div className="border-b border-white/5 pb-4">
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-emerald-400">
                    {selectedLayer.tech}
                  </span>
                  <h3 className="mt-2.5 text-lg font-black text-white leading-tight">{selectedLayer.name}</h3>
                  <p className="mt-2 text-xs font-semibold text-slate-400 leading-relaxed">
                    {selectedLayer.description}
                  </p>
                </div>

                {/* Section tabs */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-1.5">🔑 Key Responsibilities</h4>
                    <ul className="space-y-1 text-xs text-slate-300 font-semibold leading-relaxed">
                      {selectedLayer.responsibilities.map((resp, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-emerald-400">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-400 mb-1.5">❌ Common Mistakes</h4>
                    <ul className="space-y-1 text-xs text-slate-300 font-semibold leading-relaxed">
                      {selectedLayer.mistakes.map((mist, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-rose-400">•</span>
                          <span>{mist}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-1.5">✅ Best Practices</h4>
                    <ul className="space-y-1 text-xs text-slate-300 font-semibold leading-relaxed">
                      {selectedLayer.practices.map((prac, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-sky-400">•</span>
                          <span>{prac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedLayer(null)}
                className="mt-6 w-full rounded-xl border border-white/10 hover:bg-white/5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-300 hover:text-white transition cursor-pointer"
                type="button"
              >
                Close details
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel rounded-2xl p-8 border border-white/5 bg-slate-900/20 shadow-xl flex-1 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950/60 border border-white/5 text-2xl text-slate-500">
                🔎
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">No layer selected</h3>
                <p className="mt-1.5 text-xs font-semibold text-slate-500 max-w-xs leading-relaxed">
                  Click on any node in the architecture stack on the left to display its detailed full-stack documentation, mistakes, and guidelines.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
