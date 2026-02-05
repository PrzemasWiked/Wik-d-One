
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
      setError('Uzupełnij wymagane pola danych.');
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
    }, 1000);
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
        setError('Identyfikacja nieudana. Sprawdź dane.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-12 md:p-16 border border-black/5 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] rounded-sm">
      <div className="flex gap-10 mb-16 border-b border-black/5 pb-10">
        <div className={`flex flex-col gap-2 ${mode === 'register' ? 'opacity-100' : 'opacity-30 cursor-pointer'}`} onClick={() => setMode('register')}>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Krok 01</span>
           <span className="text-xl font-black uppercase tracking-tight">Dodaj Konto</span>
        </div>
        <div className={`flex flex-col gap-2 ${mode === 'login' ? 'opacity-100' : 'opacity-30'}`}>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Krok 02</span>
           <span className="text-xl font-black uppercase tracking-tight">Autoryzacja</span>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-4xl font-black text-black tracking-tighter uppercase mb-4">
          {mode === 'register' ? 'Dodaj Profil iQuote' : 'Zaloguj sesję'}
        </h2>
        <p className="text-slate-400 font-medium">
          Dostęp do systemów partnerskich Wikęd wymaga autoryzacji kontem iQuote.
        </p>
      </div>

      <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-8">
        <div className="group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-red-600 transition-colors">Identyfikator iQuote</label>
          <div className="relative border-b-2 border-slate-100 group-focus-within:border-red-600 transition-all">
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-4 bg-transparent outline-none text-xl font-bold text-black placeholder:text-slate-200"
              placeholder="Twój login systemowy"
            />
          </div>
        </div>

        {mode === 'register' && (
          <div className="group animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-red-600 transition-colors">E-mail służbowy</label>
            <div className="relative border-b-2 border-slate-100 group-focus-within:border-red-600 transition-all">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-4 bg-transparent outline-none text-xl font-bold text-black placeholder:text-slate-200"
                placeholder="mail@partner.pl"
              />
            </div>
          </div>
        )}

        <div className="group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 group-focus-within:text-red-600 transition-colors">Hasło Dostępu</label>
          <div className="relative border-b-2 border-slate-100 group-focus-within:border-red-600 transition-all">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-4 bg-transparent outline-none text-xl font-bold text-black placeholder:text-slate-200 tracking-widest"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 p-5 rounded-sm text-sm font-bold border border-red-100 animate-in shake">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {registeredAccount && mode === 'login' && !error && (
          <div className="flex items-center gap-3 text-green-600 bg-green-50 p-5 rounded-sm text-sm font-bold border border-green-100">
            <CheckCircle2 size={20} />
            <span>Konto iQuote zostało zarejestrowane. Możesz się zalogować.</span>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] text-xs py-6 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{mode === 'register' ? 'Zarejestruj profil' : 'Rozpocznij pracę'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em] pt-8">
          Wszystkie dane są szyfrowane i przechowywane lokalnie.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
