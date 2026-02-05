
import React, { useState } from 'react';
import { User, UserRole } from './types';
import { SERVICE_LINKS } from './constants';
import ServiceCard from './components/ServiceCard';
import LoginForm from './components/LoginForm';
import { LogOut, UserPlus, ArrowRight, ChevronRight, Menu } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col selection:bg-[#8fcc25] selection:text-white">
      {/* Structural Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none -z-10"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-black tracking-tighter uppercase">
              Wikęd <span className="text-[#8fcc25]">One</span>
            </div>
            <div className="h-6 w-[1px] bg-black/10 hidden sm:block"></div>
            <div className="hidden sm:flex gap-6">
              {['Produkty', 'Wsparcie', 'Partnerzy'].map(item => (
                <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest border border-black px-3 py-1">{user.username}</span>
                <button onClick={handleLogout} className="text-black hover:text-[#8fcc25] transition-colors">
                  <LogOut size={20} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="btn-konkret bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] z-10"
              >
                Mój Wikęd
              </button>
            )}
            <Menu className="sm:hidden" size={24} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-48 pb-32">
        <div className="container mx-auto px-6">
          {showLogin && !user ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto">
              <LoginForm onLogin={handleLogin} />
              <button 
                onClick={() => setShowLogin(false)}
                className="mt-12 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors flex items-center gap-2 mx-auto"
              >
                Powrót do strony głównej <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <div className="stagger-in">
              {/* Header Section */}
              <div className="relative mb-32">
                <div className="absolute -top-20 -left-10 text-[12rem] font-black text-slate-100/50 select-none -z-10 pointer-events-none uppercase tracking-tighter">
                  Wikęd
                </div>
                <h1 className="text-huge mb-12">
                  Kompletne <br />
                  <span className="text-outline">Systemy</span> <br />
                  <span className="text-[#8fcc25]">Usługowe.</span>
                </h1>
                <p className="max-w-xl text-lg font-medium text-slate-500 leading-relaxed border-l-4 border-[#8fcc25] pl-8">
                  Dedykowany ekosystem narzędzi dla profesjonalistów i klientów premium. Zarządzaj projektami, wymiarami i konfiguracją w jednej przestrzeni.
                </p>
              </div>

              {/* Grid Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                {SERVICE_LINKS.filter(s => s.category === 'main').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Tools Divider */}
              <div className="py-24 flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Narzędzia Projektowe</h2>
                <div className="h-[2px] flex-grow mx-12 bg-black/5"></div>
                <span className="text-[10px] font-bold text-slate-300">02 / 04</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                {SERVICE_LINKS.filter(s => s.category === 'tools' || s.category === 'support').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Footer Banner */}
              {!user && (
                <div className="mt-48 bg-black text-white p-12 md:p-24 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-white/5 select-none leading-none">
                    B2B
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-[#8fcc25] text-[10px] font-black uppercase tracking-[0.3em] mb-6 block">Strefa Partnerska</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                      Wzmocnij swój <br /> <span className="text-[#8fcc25]">biznes.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 font-medium">
                      Zarejestruj profil iQuote i uzyskaj dostęp do zaawansowanych systemów zamówień i wsparcia projektowego.
                    </p>
                    <button 
                      onClick={() => setShowLogin(true)}
                      className="bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#8fcc25] hover:text-white transition-all flex items-center gap-4 group"
                    >
                      Zarejestruj profil <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black tracking-tighter uppercase mb-8">Wikęd</div>
              <p className="text-slate-400 font-medium max-w-sm leading-relaxed">
                Producent drzwi premium. Innowacja, jakość i design zdefiniowane w każdym detalu. Dostarczamy rozwiązania, które chronią i zdobią Twoje wejście do świata.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-8">Platforma</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="https://konfigurator.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Studio Wikęd</a></li>
                <li><a href="https://gdziekupic.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Mapa Salonów</a></li>
                <li><a href="https://kalkulator.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Kalkulator Wymiarów</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-8">Informacje</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="https://wiked.pl/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Polityka Prywatności</a></li>
                <li><a href="https://strefa.wiked.pl/zaloguj" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Gwarancja</a></li>
                <li><a href="mailto:luzino@wiked.pl" className="hover:text-[#8fcc25] transition-colors">luzino@wiked.pl</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-16 border-t border-black/5 gap-8">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Precision in every open.</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-black/40">© {new Date().getFullYear()} Wikęd Sp. z o.o.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
