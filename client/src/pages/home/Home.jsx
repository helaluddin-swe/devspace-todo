import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Trophy, 
  BookOpen, 
  ArrowRight, 
  Zap,
  BarChart3,
  PlusCircle,
  ClipboardList,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useAppContext();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"}`}>
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden text-center">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 blur-[120px] rounded-full ${isDarkMode ? "bg-indigo-600/10" : "bg-indigo-500/5"}`} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <CheckCircle2 size={14} /> Efficient Task Management
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-black tracking-tight mb-6 ${isDarkMode ? "bg-gradient-to-b from-white to-slate-500" : "text-slate-900"} bg-clip-text text-transparent`}>
            Streamline Your Workflow <br /> 
            <span className="text-indigo-500">Organize, Track, Achieve.</span>
          </h1>
          
          <p className={`max-w-2xl mx-auto text-lg mb-10 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Experience the next level of productivity with our Todo Management system. 
            From quick drafts to complex project milestones, keep everything in one place.
          </p>

          {/* --- ACTION BUTTONS --- */}
          {!isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
              >
                Start Organizing Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => navigate('/todo-page')}
                className="flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20 transition-all active:scale-95"
              >
                <Layers size={24} /> Go to Todo Workspace
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- TODO MANAGEMENT INFO GRID --- */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<PlusCircle className="text-blue-400" />}
          title="Quick Capture"
          desc="Instantly add tasks with titles and descriptions. Never let a brilliant idea or urgent chore slip away."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<Clock className="text-amber-400" />}
          title="Real-time Tracking"
          desc="Monitor your pending tasks in a clean, organized list. Sort by priority and manage your time effectively."
          isDarkMode={isDarkMode}
        />
        <FeatureCard 
          icon={<CheckCircle2 className="text-emerald-400" />}
          title="Goal Completion"
          desc="Mark tasks as finished to boost your progress stats. Celebrate your productivity with a visual history of success."
          isDarkMode={isDarkMode}
        />
      </section>

      {/* --- QUICK STATS --- */}
      {isLoggedIn && userData?.stats && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className={`border rounded-[2.5rem] p-8 ${isDarkMode ? "bg-[#0b0f1a] border-white/5" : "bg-white border-slate-200 shadow-sm"}`}>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-500"/> Productivity Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBox label="Tasks Created" value={userData.stats.totalSolved || 0} isDarkMode={isDarkMode} />
              <StatBox label="Completed" value={userData.stats.totalCorrect || 0} isDarkMode={isDarkMode} />
              <StatBox label="Pending" value={(userData.stats.totalSolved - userData.stats.totalCorrect) || 0} isDarkMode={isDarkMode} />
              <StatBox label="Efficiency" value={`${((userData.stats.totalCorrect / (userData.stats.totalSolved || 1)) * 100).toFixed(0)}%`} isDarkMode={isDarkMode} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, isDarkMode }) => (
  <div className={`p-8 rounded-4xl border transition-all group ${isDarkMode ? "bg-[#0b0f1a] border-white/5 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:border-indigo-400 shadow-sm"}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDarkMode ? "bg-white/5" : "bg-slate-100"}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{desc}</p>
  </div>
);

const StatBox = ({ label, value, isDarkMode }) => (
  <div className={`p-4 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"}`}>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-indigo-400">{value}</p>
  </div>
);

export default Home;