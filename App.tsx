
import React, { useState, useEffect } from 'react';
import { User, UserRole, IQuoteAccount, IQuoteAccountType, WarrantyDoor } from './types';
import { SERVICE_LINKS } from './constants';
import ServiceCard from './components/ServiceCard';
import LoginForm from './components/LoginForm';
import { 
  LogOut, ArrowRight, ChevronRight, Menu, Key, 
  LayoutGrid, Hammer, ExternalLink, Plus, Trash2, 
  ShieldCheck, UserCircle, Briefcase, CreditCard, 
  FileText, Package, Users, Activity, ShieldPlus,
  RefreshCw, CheckCircle, Clock
} from 'lucide-react';

const PRESET_USERS: User[] = [
  {
    id: 'pb-wiked-001',
    username: 'Przemek',
    email: 'pb@wiked.pl',
    role: UserRole.USER,
    linkedAccounts: [
      {
        id: 'iq-5557',
        login: '5557 TEST-DYS',
        passwordHash: '••••••••',
        label: 'Dystrybutor Główny',
        type: IQuoteAccountType.DISTRIBUTOR,
        apsList: [
          { id: 'aps-5559', name: 'APS TEST', login: '5559' }
        ]
      }
    ],
    warrantyDoors: []
  },
  {
    id: 'jan-kowalski-001',
    username: 'Jan',
    email: 'jan@kowalski.pl',
    role: UserRole.USER,
    linkedAccounts: [],
    warrantyDoors: [
      {
        id: 'door-001',
        model: 'Termo Prestige Lux',
        serialNumber: 'WK-2023-9912',
        purchaseDate: '2023-11-12',
        warrantyUntil: '2028-11-12',
        status: 'active'
      }
    ]
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(PRESET_USERS[0]); // Domyślnie Przemek
  const [showLogin, setShowLogin] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddDoor, setShowAddDoor] = useState(false);
  const [newAccLogin, setNewAccLogin] = useState('');
  const [newAccPass, setNewAccPass] = useState('');
  
  // Door form state
  const [doorModel, setDoorModel] = useState('');
  const [doorSerial, setDoorSerial] = useState('');

  useEffect(() => {
    if (showLogin) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showLogin]);

  const switchUser = (id: string) => {
    const selected = PRESET_USERS.find(u => u.id === id);
    if (selected) {
      setUser(selected);
      setShowLogin(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (newUser: User) => {
    setUser({
      ...newUser,
      linkedAccounts: newUser.linkedAccounts || [],
      warrantyDoors: newUser.warrantyDoors || []
    });
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
      label: `iQuote ${user.linkedAccounts?.length ? user.linkedAccounts.length + 1 : 1}`,
      type: IQuoteAccountType.APS
    };

    setUser({
      ...user,
      linkedAccounts: [...(user.linkedAccounts || []), newAccount]
    });

    setNewAccLogin('');
    setNewAccPass('');
    setShowAddAccount(false);
  };

  const removeAccount = (accountId: string) => {
    if (!user) return;
    setUser({
      ...user,
      linkedAccounts: user.linkedAccounts?.filter(acc => acc.id !== accountId) || []
    });
  };

  const addNewDoor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doorModel || !doorSerial || !user) return;

    const newDoor: WarrantyDoor = {
      id: Math.random().toString(36).substr(2, 9),
      model: doorModel,
      serialNumber: doorSerial,
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
      status: 'active'
    };

    setUser({
      ...user,
      warrantyDoors: [...(user.warrantyDoors || []), newDoor]
    });

    setDoorModel('');
    setDoorSerial('');
    setShowAddDoor(false);
  };

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'moj-wiked' || serviceId === 'gwarancja') {
      if (!user) {
        setShowLogin(true);
      } else {
        const targetId = serviceId === 'moj-wiked' ? 'moj-wiked-section' : 'gwarancja-section';
        const section = document.getElementById(targetId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8fcc25] selection:text-white">
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none -z-10"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div 
              className="text-3xl font-extrabold tracking-tighter uppercase cursor-pointer flex items-center" 
              onClick={() => { setShowLogin(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              WIKĘD<span className="text-[#8fcc25]">ONE</span>
            </div>
            
            <div className="hidden lg:flex gap-8">
              <a href="https://wiked.pl/produkty/" target="_blank" className="nav-link">Produkty</a>
              <a href="https://wiked.pl/kontakt/" target="_blank" className="nav-link">Wsparcie</a>
              
              {/* Profile Switcher */}
              <div className="h-6 w-[1px] bg-black/5 self-center"></div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Profil:</span>
                <button 
                  onClick={() => switchUser('pb-wiked-001')}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all ${user?.id === 'pb-wiked-001' ? 'border-[#8fcc25] bg-[#8fcc25] text-white' : 'border-black text-black hover:bg-black hover:text-white'}`}
                >
                  Przemek
                </button>
                <button 
                  onClick={() => switchUser('jan-kowalski-001')}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all ${user?.id === 'jan-kowalski-001' ? 'border-[#8fcc25] bg-[#8fcc25] text-white' : 'border-black text-black hover:bg-black hover:text-white'}`}
                >
                  Jan
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden xl:flex items-center gap-3">
                  <button onClick={() => handleServiceClick('moj-wiked')} className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 hover:bg-[#8fcc25] hover:text-white px-4 py-2 transition-all">Mój Wikęd</button>
                  <button onClick={() => handleServiceClick('gwarancja')} className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-100 hover:bg-black hover:text-white px-4 py-2 transition-all">Gwarancja</button>
                </div>
                <div className="h-10 w-[1px] bg-black/5 hidden xl:block"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8fcc25] animate-pulse"></span>
                    {user.username}
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.email}</span>
                </div>
                <button onClick={handleLogout} className="text-black hover:text-red-500 transition-colors p-2" title="Wyloguj">
                  <LogOut size={22} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(!showLogin)} className="btn-black">
                {showLogin ? 'Powrót' : 'Konto / Zaloguj'}
              </button>
            )}
            <Menu className="lg:hidden" size={28} />
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-56 pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {showLogin && !user ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto">
              <LoginForm onLogin={handleLogin} />
            </div>
          ) : (
            <div className="stagger-in">
              {/* Header */}
              <div className="relative mb-40">
                <div className="absolute -top-24 -left-10 text-[14rem] font-black text-slate-100/50 select-none -z-10 pointer-events-none uppercase tracking-tighter opacity-70">
                  Wikęd
                </div>
                <h1 className="text-huge mb-16">
                  <span className="text-[#64748b]">Witaj,</span> <br />
                  <span className="text-outline">{user?.username || 'Gość'}</span> <br />
                  <span className="text-[#8fcc25]">One.</span>
                </h1>
                <div className="flex gap-10">
                  <div className="w-1 bg-[#8fcc25]"></div>
                  <p className="max-w-xl text-xl font-medium text-slate-400 leading-relaxed">
                    Centrum dowodzenia Twoimi usługami Wikęd. {user?.id === 'pb-wiked-001' ? 'Zarządzaj siecią dystrybucji i zamówieniami.' : 'Przeglądaj swoje drzwi i monitoruj statusy gwarancyjne.'}
                  </p>
                </div>
              </div>

              {/* GWARANCJA SECTION */}
              <div id="gwarancja-section" className="mb-40 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-black/5 pb-8">
                   <div>
                      <span className="text-[#8fcc25] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-4 block">Bezpieczeństwo i Wsparcie</span>
                      <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Twoja <span className="text-[#8fcc25]">Gwarancja</span></h2>
                      <p className="text-slate-400 font-medium mt-4">Zarejestruj swoje drzwi Wikęd, aby aktywować i przedłużyć ochronę gwarancyjną.</p>
                   </div>
                   <button 
                     onClick={() => setShowAddDoor(!showAddDoor)}
                     className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] font-extrabold uppercase tracking-widest hover:bg-[#8fcc25] transition-all"
                   >
                     <ShieldPlus size={18} /> {showAddDoor ? 'Anuluj' : 'Dodaj Drzwi do Systemu'}
                   </button>
                 </div>

                 {showAddDoor && (
                   <div className="bg-slate-50 p-12 border-2 border-dashed border-slate-200 animate-in fade-in zoom-in-95 duration-300">
                      <form onSubmit={addNewDoor} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                        <div className="space-y-4">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Model Drzwi</label>
                          <input 
                            type="text" 
                            value={doorModel}
                            onChange={(e) => setDoorModel(e.target.value)}
                            className="w-full bg-white border border-slate-200 p-4 font-black uppercase tracking-tighter outline-none focus:border-[#8fcc25]"
                            placeholder="np. Termo Prestige Lux"
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Numer Seryjny (WK-...)</label>
                          <input 
                            type="text" 
                            value={doorSerial}
                            onChange={(e) => setDoorSerial(e.target.value)}
                            className="w-full bg-white border border-slate-200 p-4 font-black uppercase tracking-widest outline-none focus:border-[#8fcc25]"
                            placeholder="Znajdziesz go na karcie gwarancyjnej"
                            required
                          />
                        </div>
                        <button type="submit" className="bg-[#8fcc25] text-white p-4 font-black uppercase text-[11px] tracking-widest hover:bg-black transition-all">Aktywuj Gwarancję</button>
                      </form>
                   </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {user?.warrantyDoors?.map((door) => (
                     <div key={door.id} className="bg-white border-2 border-black p-8 group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-4 ${door.status === 'active' ? 'text-[#8fcc25]' : 'text-red-500'}`}>
                          {door.status === 'active' ? <CheckCircle size={24} /> : <Clock size={24} />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 block">Serial: {door.serialNumber}</span>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">{door.model}</h4>
                        
                        <div className="space-y-3 pt-6 border-t border-black/5">
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Data Zakupu</span>
                              <span className="text-[10px] font-bold">{door.purchaseDate}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Ochrona do</span>
                              <span className={`text-[10px] font-bold ${door.status === 'active' ? 'text-[#8fcc25]' : 'text-red-500'}`}>{door.warrantyUntil}</span>
                           </div>
                        </div>

                        <div className="mt-8 flex gap-2">
                           <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-black ${door.status === 'active' ? 'bg-[#8fcc25] text-white border-[#8fcc25]' : 'bg-slate-100 text-slate-400'}`}>
                             {door.status === 'active' ? 'Gwarancja Aktywna' : 'Wygasła'}
                           </div>
                           <button className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-black hover:bg-black hover:text-white transition-all">
                             Zgłoś serwis
                           </button>
                        </div>
                     </div>
                   ))}

                   {(!user?.warrantyDoors || user.warrantyDoors.length === 0) && !showAddDoor && (
                     <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-100 bg-slate-50/50">
                        <p className="text-slate-300 font-black uppercase tracking-widest text-xs mb-2">Brak zarejestrowanych produktów.</p>
                        <p className="text-slate-400 text-[10px] font-medium">Użyj przycisku "Dodaj Drzwi", aby zintegrować swoje zakupy z Wikęd One.</p>
                     </div>
                   )}
                 </div>
              </div>

              {/* MOJ WIKED - iQuote Section (Everyone sees it after login) */}
              {user && (
                <div id="moj-wiked-section" className="mt-24 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                   <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-black/5 pb-8">
                     <div>
                        <span className="text-[#8fcc25] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-4 block">Dashboard B2B</span>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Mój <span className="text-[#8fcc25]">Wikęd</span></h2>
                        <p className="text-slate-400 font-medium mt-4">Twoje centrum dowodzenia iQuote i narzędzia profesjonalne.</p>
                     </div>
                     <button 
                       onClick={() => setShowAddAccount(!showAddAccount)}
                       className="flex items-center gap-3 bg-black text-white px-8 py-4 text-[11px] font-extrabold uppercase tracking-widest hover:bg-[#8fcc25] transition-all"
                     >
                       <Plus size={18} /> {showAddAccount ? 'Anuluj' : 'Podepnij konto iQuote'}
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
                          <button type="submit" className="bg-[#8fcc25] text-white p-4 font-black uppercase text-[11px] tracking-widest hover:bg-black transition-all">Dodaj i Synchronizuj</button>
                        </form>
                     </div>
                   )}
                   
                   <div className="grid grid-cols-1 gap-12">
                      {user.linkedAccounts?.map((acc) => (
                        <div key={acc.id} className="bg-white border-2 border-black p-8 md:p-12 shadow-[20px_20px_0px_rgba(143,204,37,0.1)] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8">
                             <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border ${acc.type === IQuoteAccountType.DISTRIBUTOR ? 'bg-black text-white' : 'border-black text-black'}`}>
                               {acc.type === IQuoteAccountType.DISTRIBUTOR ? 'Dystrybutor' : 'APS'}
                             </span>
                           </div>

                           <div className="flex flex-col md:flex-row gap-12 mb-12 border-b border-black/5 pb-12">
                              <div className="flex-grow">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-2 block">Profil Handlowy iQuote</span>
                                <h4 className="text-4xl font-black uppercase tracking-tighter mb-2">{acc.login}</h4>
                                <div className="flex items-center gap-4 text-slate-400">
                                  <span className="text-[10px] font-bold uppercase flex items-center gap-1"><ShieldCheck size={12} className="text-[#8fcc25]"/> Autoryzacja: OK</span>
                                  <span className="text-[10px] font-bold uppercase flex items-center gap-1"><RefreshCw size={12} className="text-[#8fcc25]"/> Baza zsynchronizowana</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <button onClick={() => removeAccount(acc.id)} className="p-4 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
                                  <Trash2 size={20} />
                                </button>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                              <a href="https://leader.wiked.pl" target="_blank" className="flex flex-col gap-4 p-8 bg-slate-50 hover:bg-black group/item transition-all border border-black/5 hover:border-black">
                                <Briefcase className="text-black group-hover/item:text-[#8fcc25]" size={28} />
                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/item:text-white">Leader</span>
                                <span className="text-[9px] text-slate-400 uppercase font-medium">Synchronizacja haseł</span>
                              </a>
                              <a href="https://pay.wiked.pl" target="_blank" className="flex flex-col gap-4 p-8 bg-slate-50 hover:bg-black group/item transition-all border border-black/5 hover:border-black">
                                <CreditCard className="text-black group-hover/item:text-[#8fcc25]" size={28} />
                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/item:text-white">Wikęd Pay</span>
                                <span className="text-[9px] text-slate-400 uppercase font-medium">Finanse i Rozliczenia</span>
                              </a>
                              <a href="https://strefa.wiked.pl/reklamacje" target="_blank" className="flex flex-col gap-4 p-8 bg-slate-50 hover:bg-black group/item transition-all border border-black/5 hover:border-black">
                                <FileText className="text-black group-hover/item:text-[#8fcc25]" size={28} />
                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/item:text-white">Reklamacje</span>
                                <span className="text-[9px] text-slate-400 uppercase font-medium">Moduł Zgłoszeń</span>
                              </a>
                              <a href="https://strefa.wiked.pl/zamowienia" target="_blank" className="flex flex-col gap-4 p-8 bg-slate-50 hover:bg-black group/item transition-all border border-black/5 hover:border-black">
                                <Package className="text-black group-hover/item:text-[#8fcc25]" size={28} />
                                <span className="text-[10px] font-black uppercase tracking-widest group-hover/item:text-white">Zamówienia</span>
                                <span className="text-[9px] text-slate-400 uppercase font-medium">Monitoring statusów</span>
                              </a>
                           </div>

                           {acc.type === IQuoteAccountType.DISTRIBUTOR && (
                             <div className="bg-slate-50/50 p-8 border border-black/5">
                                <div className="flex items-center justify-between mb-8">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-black text-[#8fcc25] flex items-center justify-center">
                                      <Users size={20} />
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em]">Moi APS (Sieć Sprzedaży)</h5>
                                  </div>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{acc.apsList?.length || 0} Aktywnych APS</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {acc.apsList?.map((aps) => (
                                    <div key={aps.id} className="bg-white p-6 border border-black/5 flex items-center justify-between group/aps hover:border-black transition-all">
                                      <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-[#8fcc25]"></div>
                                        <div>
                                          <span className="block text-sm font-black uppercase tracking-tight">{aps.name}</span>
                                          <span className="text-[9px] text-slate-400 font-bold uppercase">Login iQuote: {aps.login}</span>
                                        </div>
                                      </div>
                                      <button className="text-slate-300 group-hover/aps:text-black transition-colors">
                                        <ChevronRight size={16} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                             </div>
                           )}
                        </div>
                      ))}

                      {/* No linked accounts state (e.g. for Jan initially) */}
                      {(!user.linkedAccounts || user.linkedAccounts.length === 0) && !showAddAccount && (
                        <div className="py-24 text-center border-2 border-dashed border-slate-100 bg-slate-50/50">
                          <p className="text-slate-300 font-black uppercase tracking-widest text-xs mb-2">Brak podpiętych kont iQuote.</p>
                          <p className="text-slate-400 text-[10px] font-medium">Użyj przycisku "Podepnij konto iQuote", aby powiązać profile handlowe ze swoim kontem Wikęd One.</p>
                        </div>
                      )}
                   </div>
                </div>
              )}

              {/* Tools Section */}
              <div className="py-24 flex items-center justify-between">
                <h2 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-black">Usługi i Narzędzia</h2>
                <div className="h-[2px] flex-grow mx-12 bg-black/5"></div>
                <span className="text-[11px] font-bold text-slate-300">TECHNOLOGIA</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5">
                {/* Filter out Login card if user is already logged in */}
                {SERVICE_LINKS
                  .filter(s => s.category !== 'admin')
                  .filter(s => user ? s.id !== 'moj-wiked' : true)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} onClick={() => handleServiceClick(service.id)} />
                  ))
                }
              </div>

              {/* Footer Banner */}
              {!user && !showLogin && (
                <div className="mt-24 bg-black text-white p-12 md:p-24 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 text-[15rem] font-black text-white/5 select-none leading-none">
                    B2B
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-[#8fcc25] text-[11px] font-extrabold uppercase tracking-[0.3em] mb-6 block">Zostań Partnerem</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                      Zarządzaj <br /> <span className="text-[#8fcc25]">Biznesem.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 font-medium">
                      Wikęd One to centralne miejsce dla Twojego salonu sprzedaży, montażu i zamówień iQuote.
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
