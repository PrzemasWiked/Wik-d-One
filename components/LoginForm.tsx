
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
      // Keep email for convenience when switching to login
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
      
      // Default dummy check for any non-empty credentials if not specifically registered
      const isValid = isAdmin || isRegistered || (email.length > 5 && password.length > 3);

      if (isAdmin) {
        onLogin({ 
          id: '1', 
          username: 'Administrator', 
          email: email, 
          role: UserRole.ADMIN 
        });
      } else if (isValid) {
        // Use part of email as display name
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
    <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[40px_40px_0px_rgba(0,0,0,0.05)]">
      {/* Mode Toggle Header */}
      <div className="flex border-b border-black/5 mb-20">
        <button 
          onClick={() => setMode('login')}
          className={`pb-8 px-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'login' ? 'text-black' : 'text-slate-300'}`}
        >
          01. Logowanie
          {mode === 'login' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
        <button 
          onClick={() => setMode('register')}
          className={`pb-8 px-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${mode === 'register' ? 'text-black' : 'text-slate-300'}`}
        >
          02. Nowe Konto
          {mode === 'register' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8fcc25]"></div>}
        </button>
      </div>

      <div className="mb-20">
        <h2 className="text-huge text-black mb-6">
          {mode === 'register' ? 'Witaj' : 'Witaj'}
        </h2>
        <p className="text-slate-400 font-medium text-lg">
          {mode === 'register' 
            ? 'Stwórz profil w systemie Wikęd One.' 
            : 'Zaloguj się do swojego centrum usług.'}
        </p>
      </div>

      <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-12">
        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-8 transition-all">
          <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 group-focus-within:text-[#8fcc25]">E-mail</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-3xl font-black text-black placeholder:text-slate-100 tracking-tighter"
            placeholder="partner@domain.pl"
            autoComplete="email"
          />
        </div>

        <div className="group border-l-2 border-slate-100 focus-within:border-[#8fcc25] pl-8 transition-all">
          <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4 group-focus-within:text-[#8fcc25]">Hasło</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-3xl font-black text-black placeholder:text-slate-100 tracking-[0.3em]"
            placeholder="••••••••"
            autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          />
        </div>

        {error && (
          <div className="flex items-center gap-4 text-red-600 border border-red-100 bg-red-50/50 p-6 font-bold uppercase text-[10px] tracking-widest">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {registeredUser && mode === 'login' && !error && (
          <div className="flex items-center gap-4 text-green-600 border border-green-100 bg-green-50/50 p-6 font-bold uppercase text-[10px] tracking-widest">
            <CheckCircle2 size={20} />
            Konto utworzone. Możesz się zalogować.
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
              {mode === 'register' ? 'Utwórz Konto' : 'Zaloguj się'}
              <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
            </>
          )}
        </button>

        <p className="text-[9px] font-black text-slate-300 text-center uppercase tracking-[0.5em] pt-12">
          Wikęd One Ecosystem / v2.5
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
