
import React, { useState, useEffect } from 'react';
import { User, UserRole, IQuoteAccount } from './types';
import { SERVICE_LINKS } from './constants';
import ServiceCard from './components/ServiceCard';
import LoginForm from './components/LoginForm';
import { LogOut, ArrowRight, ChevronRight, Menu, Key, LayoutGrid, Hammer, ExternalLink, Plus, Trash2, ShieldCheck, UserCircle } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [newAccLogin, setNewAccLogin] = useState('');
  const [newAccPass, setNewAccPass] = useState('');

  // Scroll to top when login view is triggered
  useEffect(() => {
    if (showLogin) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showLogin]);

  const handleLogin = (newUser: User) => {
    // Initial user setup
    const userWithAccounts = {
      ...newUser,
      linkedAccounts: newUser.linkedAccounts || []
    };
    setUser(userWithAccounts);
    setShowLogin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addIQuoteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccLogin || !newAccPass || !user) return;

    const newAccount: IQuoteAccount = {
      id: Math.random().toString(36).substr(2, 9),
      login: newAccLogin,
      passwordHash: '••••••••',
      label: `iQuote ${user.linkedAccounts?.length ? user.linkedAccounts.length + 1 : 1}`
    };

    setUser({
      ...user,
      linkedAccounts: [...(user.linkedAccounts || []), newAccount]
    });

    setNewAccLogin('');
    setNewAccPass('');
    setShowAddAccount(false);
  };

  const removeAccount = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      linkedAccounts: user.linkedAccounts?.filter(acc => acc.id !== id)
    });
  };

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'moj-wiked') {
      if (!user) {
        setShowLogin(true);
      } else {
        const section = document.getElementById('moj-wiked-section');
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8fcc25] selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none -z-10"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <div 
              className="text-3xl font-extrabold tracking-tighter uppercase cursor-pointer flex items-center" 
              onClick={() => { setShowLogin(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              WIKĘD<span className="text-[#8fcc25]">ONE</span>
            </div>
            
            <div className="hidden lg:flex gap-10">
              <a href="https://wiked.pl/produkty/" target="_blank" className="nav-link">Produkty</a>
              <a href="https://wiked.pl/kontakt/" target="_blank" className="nav-link">Wsparcie</a>
              <div className="group relative flex items-center">
                <button className="nav-link flex items-center gap-1">Partnerzy</button>
                <div className="absolute top-full left-0 w-56 bg-white border border-black/5 shadow-2xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 p-6 space-y-4">
                  <a href="https://www.roto-frank.com/" target="_blank" className="nav-link text-[10px] flex items-center justify-between hover:text-[#8fcc25]">Roto <ExternalLink size={10}/></a>
                  <a href="https://www.maco.eu/" target="_blank" className="nav-link text-[10px] flex items-center justify-between hover:text-[#8fcc25]">Maco <ExternalLink size={10}/></a>
                  <a href="https://www.veka.pl/" target="_blank" className="nav-link text-[10px] flex items-center justify-between hover:text-[#8fcc25]">Veka <ExternalLink size={10}/></a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-3">
                  <button onClick={() => handleServiceClick('moj-wiked')} className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 hover:bg-[#8fcc25] hover:text-white px-4 py-2 transition-all">Mój Wikęd</button>
                  <a href="https://strefa.wiked.pl/monter" target="_blank" className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 hover:bg-black hover:text-white px-4 py-2 transition-all">Strefa Montera</a>
                </div>
                <div className="h-10 w-[1px] bg-black/5 hidden xl:block"></div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8fcc25] animate-pulse"></span>
                  {user.username}
                </span>
                <button onClick={handleLogout} className="text-black hover:text-[#8fcc25] transition-colors p-2" title="Wyloguj">
                  <LogOut size={22} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(!showLogin)}
                className="btn-black"
              >
                {showLogin ? 'Powrót' : 'Konto / Zaloguj'}
              </button>
            )}
            <Menu className="lg:hidden" size={28} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-56 pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {showLogin && !user ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto">
              <LoginForm onLogin={handleLogin} />
              <button 
                onClick={() => setShowLogin(false)}
                className="mt-12 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-black transition-colors flex items-center gap-2 mx-auto"
              >
                Powrót do strony głównej <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <div className="stagger-in">
              {/* Header */}
              <div className="relative mb-40">
                <div className="absolute -top-24 -left-10 text-[14rem] font-black text-slate-100/50 select-none -z-10 pointer-events-none uppercase tracking-tighter opacity-70">
                  Wikęd
                </div>
                <h1 className="text-huge mb-16">
                  <span className="text-[#64748b]">Kompletne</span> <br />
                  <span className="text-outline">Systemy</span> <br />
                  <span className="text-[#8fcc25]">Usługowe.</span>
                </h1>
                <div className="flex gap-10">
                  <div className="w-1 bg-[#8fcc25]"></div>
                  <p className="max-w-xl text-xl font-medium text-slate-400 leading-relaxed">
                    Ekosystem narzędzi dla profesjonalistów i klientów. Zarządzaj projektami, wymiarami i konfiguracją w jednej przestrzeni Wikęd One.
                  </p>
                </div>
              </div>

              {/* Grid: Main Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                {SERVICE_LINKS.filter(s => s.category === 'main').map((service) => {
                  const dynamicService = {...service};
                  if (service.id === 'moj-wiked' && user) {
                    dynamicService.title = 'Mój Wikęd';
                    dynamicService.url = '#'; 
                  }
                  return (
                    <ServiceCard 
                      key={service.id} 
                      service={dynamicService} 
                      onClick={() => handleServiceClick(service.id)}
                    />
                  );
                })}
              </div>

              {/* Logged in Area - Multiple iQuote Accounts */}
              {user && (
                <div id="moj-wiked-section" className="mt-24 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                   <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-black/5 pb-8">
                     <div>
                        <span className="text-[#8fcc25] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-4 block">Profil Użytkownika</span>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Mój <span className="text-[#8fcc25]">Wikęd</span></h2>
                        <p className="text-slate-400 font-medium mt-4">Poniżej znajdziesz swoje podpięte dostępy handlowe iQuote.</p>
                     </div>
                     <button 
                       onClick={() => setShowAddAccount(!showAddAccount)}
                       className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] font-extrabold uppercase tracking-widest hover:bg-[#8fcc25] transition-all"
                     >
                       <Plus size={18} /> {showAddAccount ? 'Anuluj' : 'Dodaj dostęp iQuote'}
                     </button>
                   </div>

                   {showAddAccount && (
                     <div className="bg-slate-50 p-12 border-2 border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-300">
                        <form onSubmit={addIQuoteAccount} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                          <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Login iQuote</label>
                            <input 
                              type="text" 
                              value={newAccLogin}
                              onChange={(e) => setNewAccLogin(e.target.value)}
                              className="w-full bg-white border border-slate-200 p-4 font-black uppercase tracking-tighter outline-none focus:border-[#8fcc25]"
                              placeholder="ID_HANDLOWE"
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Hasło iQuote</label>
                            <input 
                              type="password" 
                              value={newAccPass}
                              onChange={(e) => setNewAccPass(e.target.value)}
                              className="w-full bg-white border border-slate-200 p-4 font-black uppercase tracking-widest outline-none focus:border-[#8fcc25]"
                              placeholder="••••••••"
                            />
                          </div>
                          <button type="submit" className="bg-[#8fcc25] text-white p-4 font-black uppercase text-[11px] tracking-widest hover:bg-black transition-all">Autoryzuj i Dodaj</button>
                        </form>
                     </div>
                   )}
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {user.linkedAccounts?.map((acc) => (
                        <div key={acc.id} className="group relative bg-white border border-black/5 p-10 hover:shadow-2xl hover:border-[#8fcc25]/20 transition-all duration-500 overflow-hidden">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-[#8fcc25]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700"></div>
                           <div className="flex justify-between items-start mb-10">
                              <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#8fcc25] transition-colors">
                                <Key size={20} />
                              </div>
                              <button 
                                onClick={() => removeAccount(acc.id)}
                                className="text-slate-200 hover:text-red-500 transition-colors"
                                title="Usuń powiązanie"
                              >
                                <Trash2 size={16} />
                              </button>
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 block">{acc.label}</span>
                           <h4 className="text-xl font-black uppercase tracking-tighter mb-1">{acc.login}</h4>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <ShieldCheck size={12} className="text-[#8fcc25]" /> Aktywne iQuote
                           </p>
                        </div>
                      ))}

                      {(!user.linkedAccounts || user.linkedAccounts.length === 0) && (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 bg-slate-50/50">
                          <p className="text-slate-300 font-black uppercase tracking-widest text-xs mb-2">Brak podpiętych kont iQuote.</p>
                          <p className="text-slate-400 text-[10px] font-medium">Użyj przycisku "Dodaj dostęp iQuote", aby powiązać profile handlowe ze swoim kontem Wikęd One.</p>
                        </div>
                      )}
                   </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <a href="https://strefa.wiked.pl/monter" target="_blank" className="bg-black p-10 text-white flex items-center justify-between group hover:bg-[#8fcc25] transition-all">
                      <div className="flex items-center gap-6">
                        <Hammer className="text-[#8fcc25] group-hover:text-white" size={32} />
                        <div>
                          <span className="block font-black uppercase tracking-widest text-lg">Strefa Montera</span>
                          <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Dokumentacja i narzędzia</span>
                        </div>
                      </div>
                      <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                    </a>
                    <a href="https://akademia.wiked.pl" target="_blank" className="bg-slate-100 p-10 text-black flex items-center justify-between group hover:bg-black hover:text-white transition-all">
                      <div className="flex items-center gap-6">
                        <UserCircle className="text-black group-hover:text-[#8fcc25]" size={32} />
                        <div>
                          <span className="block font-black uppercase tracking-widest text-lg">Akademia Wikęd</span>
                          <span className="text-[10px] text-black/40 group-hover:text-white/40 uppercase font-bold tracking-widest">Twoja ścieżka rozwoju</span>
                        </div>
                      </div>
                      <ArrowRight className="group-hover:translate-x-4 transition-transform" />
                    </a>
                  </div>
                </div>
              )}

              {/* Tools Section */}
              <div className="py-24 flex items-center justify-between">
                <h2 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-black">Narzędzia Projektowe</h2>
                <div className="h-[2px] flex-grow mx-12 bg-black/5"></div>
                <span className="text-[11px] font-bold text-slate-300">TECHNOLOGIA</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                {SERVICE_LINKS.filter(s => s.category === 'tools' || s.category === 'support').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Admin Section */}
              {user?.role === UserRole.ADMIN && (
                <>
                  <div className="py-24 flex items-center justify-between">
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#8fcc25]">Panel Administracyjny</h2>
                    <div className="h-[2px] flex-grow mx-12 bg-[#8fcc25]/20"></div>
                    <span className="text-[11px] font-bold text-[#8fcc25]">CONTROL</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                    {SERVICE_LINKS.filter(s => s.category === 'admin').map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </>
              )}

              {/* Partnerzy Footer Section */}
              <div className="mt-48 py-24 border-t border-black/5">
                <h2 className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-center mb-16 text-slate-300">Partnerzy Technologiczni</h2>
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  <a href="https://www.roto-frank.com/" target="_blank" className="text-3xl font-black tracking-tighter hover:text-red-600 transition-colors">ROTO</a>
                  <a href="https://www.maco.eu/" target="_blank" className="text-3xl font-black tracking-tighter hover:text-blue-800 transition-colors">MACO</a>
                  <a href="https://www.veka.pl/" target="_blank" className="text-3xl font-black tracking-tighter hover:text-blue-600 transition-colors">VEKA</a>
                </div>
              </div>

              {/* Footer Banner */}
              {!user && !showLogin && (
                <div className="mt-24 bg-black text-white p-12 md:p-24 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-white/5 select-none leading-none">
                    B2B
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-[#8fcc25] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-6 block">Strefa Partnerska</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                      Wzmocnij swój <br /> <span className="text-[#8fcc25]">biznes.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 font-medium">
                      Zarejestruj się w Wikęd One i zyskaj centralny dostęp do wszystkich narzędzi handlowych.
                    </p>
                    <button 
                      onClick={() => setShowLogin(true)}
                      className="bg-white text-black px-12 py-5 text-[11px] font-extrabold uppercase tracking-[0.3em] hover:bg-[#8fcc25] hover:text-white transition-all flex items-center gap-4 group"
                    >
                      Utwórz konto <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
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
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-extrabold tracking-tighter uppercase mb-8">WIKĘD<span className="text-[#8fcc25]">ONE</span></div>
              <p className="text-slate-400 font-medium max-w-sm leading-relaxed">
                Producent drzwi premium. Innowacja, jakość i design zdefiniowane w każdym detalu Twojego wejścia do domu.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest mb-8">Platforma</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="https://konfigurator.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Studio Wikęd</a></li>
                <li><a href="https://gdziekupic.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Mapa Salonów</a></li>
                <li><a href="https://kalkulator.wiked.pl/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Kalkulator Wymiarów</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest mb-8">Kontakt i Wsparcie</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><a href="https://wiked.pl/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Polityka Prywatności</a></li>
                <li><a href="https://strefa.wiked.pl/zaloguj" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Strefa Gwarancji</a></li>
                <li><a href="mailto:luzino@wiked.pl" className="text-[#8fcc25] font-black tracking-tight hover:underline">luzino@wiked.pl</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-16 border-t border-black/5 gap-8">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-300 italic">Precision in every open.</div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-black/40">© {new Date().getFullYear()} Wikęd Sp. z o.o. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
