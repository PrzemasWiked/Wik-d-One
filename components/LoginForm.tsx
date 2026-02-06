
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

type FormMode = 'register' | 'login';

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<FormMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{email: string, pass: string} | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Wprowadź adres e-mail oraz hasło.');
      return;
    }
    if (!email.includes('@')) {
      setError('Wprowadź poprawny adres e-mail.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setRegisteredUser({ email, pass: password });
      setMode('login');
      setLoading(false);
      setPassword('');
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Wprowadź dane logowania.');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      const isAdmin = email === 'admin@wiked.pl' && password === 'admin';
      const isRegistered = registeredUser && email === registeredUser.email && password === registeredUser.pass;
      const isValid = isAdmin || isRegistered || (email.length > 5 && password.length > 3);

      if (isAdmin) {
        onLogin({ 
          id: '1', 
          username: 'Administrator', 
          email: email, 
          role: UserRole.ADMIN 
        });
      } else if (isValid) {
        const displayName = email.split('@')[0];
        onLogin({ 
          id: Date.now().toString(), 
          username: displayName.charAt(0).toUpperCase() + displayName.slice(1), 
          email: email, 
          role: UserRole.USER 
        });
      } else {
        setError('Błędny e-mail lub hasło.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white border-[3px] border-black p-8 md:p-12 lg:p-16 shadow-[20px_20px_0px_rgba(0,0,0,0.03)] w-full max-w-2xl mx-auto overflow-hidden">
      {/* Mode Toggle Header */}
      <div className="flex border-b border-black/5 mb-12">
        <button 
          onClick={() => setMode('login')}
          className={`pb-4 px-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'login' ? 'text-black' : 'text-slate-300'}`}
        >
          01. Logowanie
          {mode === 'login' && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
        <button 
          onClick={() => setMode('register')}
          className={`pb-4 px-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'register' ? 'text-black' : 'text-slate-300'}`}
        >
          02. Nowe Konto
          {mode === 'register' && <div className="absolute bottom-[-2px] left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-5xl md:text-7xl font-black text-black mb-4 tracking-tighter uppercase leading-none">
          WITAJ
        </h2>
        <p className="text-slate-400 font-medium text-sm md:text-base">
          {mode === 'register' 
            ? 'Stwórz profil w systemie Wikęd One.' 
            : 'Zaloguj się do swojego centrum usług.'}
        </p>
      </div>

      <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-8">
        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-6 transition-all">
          <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 group-focus-within:text-[#8fcc25]">E-mail</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-xl md:text-2xl font-black text-black placeholder:text-slate-100 tracking-tight"
            placeholder="partner@domain.pl"
            autoComplete="email"
          />
        </div>

        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-6 transition-all">
          <label className="block text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2 group-focus-within:text-[#8fcc25]">Hasło</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-xl md:text-2xl font-black text-black placeholder:text-slate-100 tracking-[0.3em]"
            placeholder="••••••••"
            autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          />
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-600 border border-red-100 bg-red-50/50 p-4 font-bold uppercase text-[9px] tracking-widest">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {registeredUser && mode === 'login' && !error && (
          <div className="flex items-center gap-3 text-green-600 border border-green-100 bg-green-50/50 p-4 font-bold uppercase text-[9px] tracking-widest">
            <CheckCircle2 size={16} />
            Konto utworzone. Zaloguj się.
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full h-16 md:h-20 bg-black text-white hover:bg-[#8fcc25] font-black uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-4 group disabled:opacity-20"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {mode === 'register' ? 'Utwórz Konto' : 'Zaloguj się'}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </>
          )}
        </button>

        <p className="text-[8px] font-black text-slate-300 text-center uppercase tracking-[0.5em] pt-6">
          Wikęd One Ecosystem / v2.5
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
