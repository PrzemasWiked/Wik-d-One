
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { UserCircle, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

type FormMode = 'register' | 'login';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<FormMode>('register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredAccount, setRegisteredAccount] = useState<{login: string, pass: string} | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !email) {
      setError('Wymagane uzupełnienie wszystkich pól konfiguracji.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setRegisteredAccount({ login: username, pass: password });
      setMode('login');
      setLoading(false);
      setUsername('');
      setPassword('');
    }, 1200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const isAdmin = username === 'admin' && password === 'admin';
      const isRegistered = registeredAccount && username === registeredAccount.login && password === registeredAccount.pass;

      if (isAdmin) {
        onLogin({ id: '1', username: 'Administrator', email: 'admin@wiked.pl', role: UserRole.ADMIN });
      } else if (isRegistered || (username && password)) {
        onLogin({ id: '2', username: username, email: email || 'partner@wiked.pl', role: UserRole.USER });
      } else {
        setError('Identyfikacja profilu odrzucona. Sprawdź parametry logowania.');
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[40px_40px_0px_rgba(0,0,0,0.05)]">
      {/* Mode Toggle Header */}
      <div className="flex border-b border-black/5 mb-20">
        <button 
          onClick={() => setMode('register')}
          className={`pb-8 px-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'register' ? 'text-black' : 'text-slate-300'}`}
        >
          01. Rejestracja Profilu
          {mode === 'register' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
        <button 
          onClick={() => setMode('login')}
          className={`pb-8 px-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'login' ? 'text-black' : 'text-slate-300'}`}
        >
          02. Autoryzacja Dostępu
          {mode === 'login' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
      </div>

      <div className="mb-20">
        <h2 className="text-huge text-black mb-6">
          {mode === 'register' ? 'Profil' : 'Dostęp'}
        </h2>
        <p className="text-slate-400 font-medium text-lg">
          {mode === 'register' 
            ? 'Skonfiguruj swoje dane dostępowe do ekosystemu iQuote.' 
            : 'Wprowadź poświadczenia dla autoryzowanej sesji.'}
        </p>
      </div>

      <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-12">
        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-8 transition-all">
          <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 group-focus-within:text-[#8fcc25]">Login iQuote</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none text-3xl font-black text-black placeholder:text-slate-100 uppercase tracking-tighter"
            placeholder="Identyfikator"
          />
        </div>

        {mode === 'register' && (
          <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-8 transition-all animate-in fade-in slide-in-from-top-4">
            <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 group-focus-within:text-[#8fcc25]">E-mail</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-3xl font-black text-black placeholder:text-slate-100 tracking-tighter"
              placeholder="Partner@Domain.pl"
            />
          </div>
        )}

        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-8 transition-all">
          <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 group-focus-within:text-[#8fcc25]">Hasło</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-3xl font-black text-black placeholder:text-slate-100 tracking-[0.3em]"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="flex items-center gap-4 text-red-600 border border-red-100 bg-red-50/50 p-6 font-bold uppercase text-[10px] tracking-widest">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {registeredAccount && mode === 'login' && !error && (
          <div className="flex items-center gap-4 text-green-600 border border-green-100 bg-green-50/50 p-6 font-bold uppercase text-[10px] tracking-widest">
            <CheckCircle2 size={20} />
            Konfiguracja profilu zakończona pomyślnie.
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full h-24 bg-black text-white hover:bg-[#8fcc25] font-black uppercase tracking-[0.4em] text-xs transition-all flex items-center justify-center gap-6 group disabled:opacity-20"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {mode === 'register' ? 'Skonfiguruj Profil' : 'Autoryzuj Dostęp'}
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
            </>
          )}
        </button>

        <p className="text-[9px] font-black text-slate-300 text-center uppercase tracking-[0.5em] pt-12">
          Secure Core Environment / Wikęd-v03
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
