
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { UserCircle, Lock, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication logic
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin({
          id: '1',
          username: 'Administrator',
          email: 'admin@wiked.pl',
          role: UserRole.ADMIN
        });
      } else if (username && password) {
        onLogin({
          id: '2',
          username: username,
          email: `${username}@partner.wiked.pl`,
          role: UserRole.USER
        });
      } else {
        setError('Wprowadź poprawne dane iQuote.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Mój Wikęd</h2>
        <p className="text-slate-500">Zaloguj się kontem iQuote</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Login iQuote</label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="Twój login"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Hasło</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : 'Zaloguj się'}
        </button>

        <div className="text-center text-xs text-slate-400">
          Dane logowania są identyczne jak w systemie iQuote.
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
