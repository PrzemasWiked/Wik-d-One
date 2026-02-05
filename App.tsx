
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import { SERVICE_LINKS } from './constants';
import ServiceCard from './components/ServiceCard';
import LoginForm from './components/LoginForm';
import { LogOut, User as UserIcon, ShieldAlert, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-black text-2xl w-10 h-10 flex items-center justify-center rounded-lg shadow-lg shadow-red-600/20">W</div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">WIKĘD <span className="text-red-600">ONE</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Universal Service Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-900 leading-none">{user.username}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${user.role === UserRole.ADMIN ? 'text-red-600' : 'text-blue-600'}`}>
                    {user.role === UserRole.ADMIN ? 'Administrator' : 'Partner Wikęd'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  title="Wyloguj się"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-slate-900/20 flex items-center gap-2"
              >
                <UserIcon size={18} />
                <span>Mój Wikęd</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {showLogin && !user ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <LoginForm onLogin={handleLogin} />
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowLogin(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
              >
                Wróć do wyboru usług
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Twoje Centrum <span className="text-red-600">Wikęd</span>
              </h2>
              <p className="text-slate-600 text-lg">
                Szybki dostęp do wszystkich narzędzi, konfiguratorów i wsparcia technicznego firmy Wikęd. Wszystko czego potrzebujesz w jednym miejscu.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_LINKS.filter(s => s.category === 'main').map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
              
              <div className="lg:col-span-3 mt-8 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-grow bg-slate-200"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Narzędzia i Wsparcie</span>
                  <div className="h-[1px] flex-grow bg-slate-200"></div>
                </div>
              </div>

              {SERVICE_LINKS.filter(s => s.category === 'tools' || s.category === 'support').map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}

              {user?.role === UserRole.ADMIN && (
                <>
                  <div className="lg:col-span-3 mt-8 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] flex-grow bg-red-100"></div>
                      <div className="flex items-center gap-2 px-4">
                        <ShieldAlert className="text-red-500" size={16} />
                        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Strefa Administracyjna</span>
                      </div>
                      <div className="h-[1px] flex-grow bg-red-100"></div>
                    </div>
                  </div>
                  {SERVICE_LINKS.filter(s => s.category === 'admin').map(service => (
                    <ServiceCard 
                      key={service.id} 
                      service={service} 
                      onClick={() => alert('Panel administracyjny dostępny wkrótce.')}
                    />
                  ))}
                </>
              )}
            </div>

            {!user && (
              <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative group">
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-black mb-4">Współpracujesz z nami?</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                      Zaloguj się do platformy iQuote, aby uzyskać dostęp do zamówień, statusów realizacji oraz ekskluzywnych materiałów dla partnerów handlowych Wikęd.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-red-500" />
                        Podgląd bieżących zamówień
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-red-500" />
                        Dedykowane materiały marketingowe
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-red-500" />
                        System zgłoszeń reklamacyjnych
                      </li>
                    </ul>
                    <button 
                      onClick={() => setShowLogin(true)}
                      className="bg-white text-slate-900 hover:bg-red-500 hover:text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl"
                    >
                      Zaloguj do iQuote
                    </button>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="relative w-64 h-64">
                       <div className="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                       <UserCircleIconLarge />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2 opacity-50 grayscale">
                <div className="bg-slate-900 text-white font-black text-xl w-8 h-8 flex items-center justify-center rounded">W</div>
                <h1 className="text-lg font-black tracking-tighter text-slate-900 leading-none uppercase">Wikęd One</h1>
              </div>
              <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} WIKĘD Sp. z o.o. sp. k. Wszystkie prawa zastrzeżone.</p>
            </div>
            
            <div className="flex gap-8">
              <a href="https://wiked.pl/polityka-prywatnosci" target="_blank" className="text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors">Polityka prywatności</a>
              <a href="https://wiked.pl/kontakt" target="_blank" className="text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const UserCircleIconLarge = () => (
  <svg width="256" height="256" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/10 group-hover:text-red-500/20 transition-colors duration-500">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default App;
