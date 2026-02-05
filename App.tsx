
import React, { useState } from 'react';
import { User, UserRole } from './types';
import { SERVICE_LINKS } from './constants';
import ServiceCard from './components/ServiceCard';
import LoginForm from './components/LoginForm';
import { LogOut, UserPlus, ArrowRight, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-black/5">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-extrabold text-xl rounded-sm">W</div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tighter leading-none">WIKĘD <span className="text-red-600">ONE</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Direct Platform</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
               <a href="https://wiked.pl" target="_blank" className="text-sm font-bold hover:text-red-600 transition-colors">Firma</a>
               <a href="https://konfigurator.wiked.pl" target="_blank" className="text-sm font-bold hover:text-red-600 transition-colors">Studio</a>
            </div>
            {user ? (
              <div className="flex items-center gap-4 pl-8 border-l border-black/5">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-extrabold">{user.username}</span>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter">Partner</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-600 hover:text-white transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="btn-premium bg-black text-white px-8 py-3.5 rounded-sm font-extrabold text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <UserPlus size={16} />
                <span>Mój Wikęd</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-6">
          {showLogin && !user ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <LoginForm onLogin={handleLogin} />
              <div className="text-center mt-12">
                <button 
                  onClick={() => setShowLogin(false)}
                  className="text-slate-400 hover:text-black text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto"
                >
                  <span>Anuluj logowanie</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-4xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="text-display text-6xl md:text-8xl font-black text-black mb-10 leading-[0.85]">
                  Dostęp do <span className="text-red-600">świata</span> Wikęd.
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Wszystkie systemy, konfiguratory i wsparcie techniczne producenta drzwi premium w jednym, przejrzystym miejscu.
                </p>
              </div>

              {/* Main Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                {SERVICE_LINKS.filter(s => s.category === 'main').map((service, idx) => (
                  <div key={service.id} className={`animate-in fade-in slide-in-from-bottom-12 duration-700 delay-[${idx * 100}ms]`}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {/* Tools Section Divider */}
              <div className="flex items-center gap-10 mb-16">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300 whitespace-nowrap">Narzędzia i Systemy</span>
                <div className="h-[1px] w-full bg-slate-100"></div>
              </div>

              {/* Secondary Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {SERVICE_LINKS.filter(s => s.category === 'tools' || s.category === 'support').map((service, idx) => (
                   <div key={service.id} className="animate-in fade-in slide-in-from-bottom-12 duration-700">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {user?.role === UserRole.ADMIN && (
                <div className="mt-20 pt-20 border-t border-black/5">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-10">Zarządzanie Portalem</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {SERVICE_LINKS.filter(s => s.category === 'admin').map(service => (
                      <ServiceCard key={service.id} service={service} onClick={() => alert('Panel Admina wkrótce.')} />
                    ))}
                   </div>
                </div>
              )}

              {/* Partner Banner */}
              {!user && (
                <div className="mt-40 bg-black rounded-sm p-12 md:p-20 relative overflow-hidden group">
                  <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">
                    <div>
                      <h2 className="text-4xl md:text-6xl text-white font-black text-display mb-8">
                        Zostań naszym <span className="text-red-600">partnerem</span>.
                      </h2>
                      <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                        Dołącz do sieci profesjonalistów Wikęd. Uzyskaj pełen dostęp do platformy iQuote, zamówień online i materiałów wsparcia sprzedaży.
                      </p>
                      <button 
                        onClick={() => setShowLogin(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-2xl shadow-red-900/40"
                      >
                        <span>Dodaj konto iQuote</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                    <div className="hidden md:block">
                       <div className="aspect-square border border-white/10 rounded-full flex items-center justify-center p-12 relative">
                         <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full group-hover:bg-red-600/10 transition-colors"></div>
                         <svg viewBox="0 0 24 24" className="w-full h-full text-white/5 group-hover:text-red-600/20 transition-all duration-700" fill="none" stroke="currentColor" strokeWidth="0.5">
                           <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M18 7a4 4 0 0 0-3-3.87" />
                         </svg>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-extrabold rounded-sm">W</div>
                <span className="text-xl font-extrabold tracking-tighter">WIKĘD <span className="text-red-600">ONE</span></span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                Platforma usługowa łącząca wszystkie cyfrowe rozwiązania marki Wikęd dla klientów indywidualnych i partnerów B2B.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black">Narzędzia</span>
                <a href="https://konfigurator.wiked.pl" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Studio Wikęd</a>
                <a href="https://kalkulator.wiked.pl" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Kalkulator</a>
                <a href="https://gdziekupic.wiked.pl" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Mapa Salonów</a>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black">Wsparcie</span>
                <a href="https://strefa.wiked.pl" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Strefa Montera</a>
                <a href="https://akademia.wiked.pl" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Akademia</a>
                <a href="#" className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">Gwarancja</a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between gap-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Designed for Impact.</p>
            <div className="flex gap-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} WIKĘD</span>
              <a href="https://wiked.pl/polityka-prywatnosci" target="_blank" className="text-xs font-bold text-slate-400 hover:text-black transition-colors uppercase tracking-widest">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
