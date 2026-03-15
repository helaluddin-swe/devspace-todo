import React, { useState, useEffect } from 'react';
import { 
    Menu, X, LayoutDashboard, LogOut, UserPlus, LogIn, 
    ShieldCheck, Sun, Moon, PlusCircle, ListTodo 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { navigate, isLoggedIn, userData, logout } = useAppContext();
    const { isDarkMode, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const isAdmin = userData?.role === 'admin';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onNavigate = (to) => {
        setOpen(false);
        window.scrollTo(0, 0);
        navigate(to);
    };

    return (
        <nav className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
            scrolled 
                ? (isDarkMode ? "bg-slate-900 shadow-xl" : "bg-indigo-800 shadow-lg") 
                : (isDarkMode ? "bg-transparent" : "bg-indigo-600")
        } py-3`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-black text-indigo-600 shadow-sm">D</div>
                        <h1 className="text-white font-bold text-xl tracking-tight">
                            DevSpace <span className="text-pink-300 italic">Studio</span>
                        </h1>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* 🌙 Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6">
                            <button onClick={() => onNavigate('/')} className="text-white/90 hover:text-white font-medium text-sm transition-colors">Home</button>
                            
                            {isLoggedIn ? (
                                <>
                                    <button onClick={() => onNavigate('/add-todos')} className="text-white/90 hover:text-white font-medium text-sm flex items-center gap-1">
                                        <PlusCircle size={16}/> Add Task
                                    </button>
                                    <button onClick={() => onNavigate('/list-todos')} className="text-white/90 hover:text-white font-medium text-sm flex items-center gap-1">
                                        <ListTodo size={16}/> My Todos
                                    </button>
                                    {isAdmin && (
                                        <button onClick={() => onNavigate('/admin-control-center')} className="bg-amber-400 text-amber-950 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-tighter hover:bg-amber-300 transition-colors">
                                            Admin
                                        </button>
                                    )}
                                    <button onClick={logout} className="text-pink-200 hover:text-white font-medium text-sm transition-colors">Logout</button>
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white border-2 border-white/30 font-bold shadow-inner">
                                        {userData?.name?.charAt(0).toUpperCase()}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => onNavigate('/login')} className="text-white font-medium text-sm">Login</button>
                                    <button onClick={() => onNavigate('/signup')} className="bg-white text-indigo-600 px-5 py-2 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                                        Join Now
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button onClick={() => setOpen(!open)} className="lg:hidden text-white ml-2 transition-transform active:rotate-90">
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isDarkMode ? "bg-slate-800" : "bg-indigo-700"} ${open ? "max-h-[500px] border-t border-white/10 shadow-2xl" : "max-h-0"}`}>
                <div className="px-4 py-6 space-y-4">
                    <button onClick={() => onNavigate('/')} className="block w-full text-left text-white font-medium py-2 px-2 border-b border-white/5">Home</button>
                    
                    {isLoggedIn ? (
                        <>
                            <p className="text-white/60 text-[10px] uppercase font-bold px-2 tracking-widest">User: {userData?.name}</p>
                            <button onClick={() => onNavigate('/add-todos')} className="block w-full text-left text-white font-medium py-2 px-2">Add New Task</button>
                            <button onClick={() => onNavigate('/list-todos')} className="block w-full text-left text-white font-medium py-2 px-2">View My Todos</button>
                            {isAdmin && <button onClick={() => onNavigate('/admin-control-center')} className="block w-full text-left text-amber-300 font-medium py-2 px-2">Admin Panel</button>}
                            <button onClick={logout} className="block w-full text-left text-red-300 font-medium py-2 px-2">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onNavigate('/login')} className="block w-full text-left text-white font-medium py-2 px-2">Login</button>
                            <button onClick={() => onNavigate('/signup')} className="block w-full text-center bg-white text-indigo-600 font-bold py-3 rounded-xl mt-4">Join Now</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;