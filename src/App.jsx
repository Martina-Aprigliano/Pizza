import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import './App.css';
import { supabase } from './supabaseClient'; // Import supabase client

// I dati del menu ora vengono passati come prop
function App({ menuData }) {
  const menu = menuData; // Usa i dati passati come prop

  const [activeCategory, setActiveCategory] = useState(menu.categories[0].name.toLowerCase());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOnlineBookingModalOpen, setIsOnlineBookingModalOpen] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  const getLinkClassName = (linkName, currentActiveCategory, scrolled) => {
    const isActive = linkName === currentActiveCategory;
    if (isActive) {
      return scrolled ? 'text-secondary scale-110' : 'text-primary underline decoration-secondary decoration-2 underline-offset-4';
    }
    return scrolled ? 'text-textLight/80 hover:text-secondary' : 'text-textDark/70 hover:text-primary';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      let currentCategory = menu.categories.length > 0 ? menu.categories[0].name.toLowerCase() : '';
      for (const category of menu.categories) {
        const element = document.getElementById(category.name.toLowerCase());
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          currentCategory = category.name.toLowerCase();
        } else {
          // Se l'elemento non è visibile o non esiste, non aggiornare ulteriormente
          // e mantieni l'ultima categoria valida trovata.
          // Questo previene che currentCategory diventi undefined se si scorre oltre l'ultimo elemento.
          break;
        }
      }
      // Solo se currentCategory è stato effettivamente trovato e non è una stringa vuota
      // (o se si vuole sempre impostare anche se vuoto, dipende dalla logica desiderata)
      if (currentCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menu.categories]);

  useEffect(() => {
    // 1. Fetch initial data
    async function fetchPizzas() {
      console.log('Fetching initial pizzas...');
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .order('id'); // It's good practice to order your data

      if (error) {
        console.error('Error fetching initial pizzas:', error);
        setPizzas([]); // Set to empty array or handle error appropriately
      } else {
        console.log('Initial pizzas fetched successfully:', data);
        setPizzas(data || []); // Ensure data is an array
      }
    }
    fetchPizzas();

    // 2. Set up real-time subscription
    console.log('Setting up Supabase real-time subscription...');
    const channel = supabase
      .channel('public:pizzas') // A unique name for the channel
      .on(
        'postgres_changes',
        { event: '*' /* Listen to all changes: INSERT, UPDATE, DELETE */, schema: 'public', table: 'pizzas' },
        (payload) => {
          console.log('----------------------------------');
          console.log('Supabase real-time change received:', payload);
          console.log('Current pizzas state BEFORE update:', pizzas); // Log current state

          if (payload.eventType === 'INSERT') {
            console.log('Handling INSERT event');
            setPizzas((currentPizzas) => {
              const newPizzas = [...currentPizzas, payload.new].sort((a, b) => a.id - b.id);
              console.log('New pizzas state AFTER INSERT:', newPizzas);
              return newPizzas;
            });
          } else if (payload.eventType === 'UPDATE') {
            console.log('Handling UPDATE event for ID:', payload.new.id);
            setPizzas((currentPizzas) => {
              const updatedPizzas = currentPizzas.map((pizza) =>
                pizza.id === payload.new.id ? payload.new : pizza
              );
              console.log('New pizzas state AFTER UPDATE:', updatedPizzas);
              return updatedPizzas;
            });
          } else if (payload.eventType === 'DELETE') {
            console.log('Handling DELETE event for ID:', payload.old.id);
            setPizzas((currentPizzas) => {
              const filteredPizzas = currentPizzas.filter(
                (pizza) => pizza.id !== payload.old.id
              );
              console.log('New pizzas state AFTER DELETE:', filteredPizzas);
              return filteredPizzas;
            });
          }
          console.log('----------------------------------');
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully SUBSCRIBED to real-time pizza changes!');
        } else if (status === 'CHANNEL_ERROR' || err) {
          console.error('Supabase subscription ERROR:', err || 'Channel error');
        } else {
          console.log('Supabase subscription status:', status);
        }
      });

    // Cleanup function: Unsubscribe when the component unmounts
    return () => {
      console.log('Removing Supabase channel subscription.');
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

  return (
    <div className="bg-background min-h-screen font-body text-textDark relative overflow-x-hidden">
      {/* Climbing Plants Graphics */}
      <div className="absolute top-0 left-0 w-32 h-full z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
          <path d="M0,0 Q20,100 0,200 Q20,300 0,400 Q20,500 0,600 Q20,700 0,800 L5,800 Q25,700 5,600 Q25,500 5,400 Q25,300 5,200 Q25,100 5,0 Z" className="fill-naturalGreen/50" />
          <path d="M10,0 Q30,150 10,300 Q30,450 10,600 Q30,750 10,900 L15,900 Q35,750 15,600 Q35,450 15,300 Q35,150 15,0 Z" transform="translate(20, 50)" className="fill-primary/40" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-full z-0 pointer-events-none transform scale-x-[-1]">
        <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
          <path d="M0,0 Q20,100 0,200 Q20,300 0,400 Q20,500 0,600 Q20,700 0,800 L5,800 Q25,700 5,600 Q25,500 5,400 Q25,300 5,200 Q25,100 5,0 Z" className="fill-naturalGreen/50" />
          <path d="M10,0 Q30,150 10,300 Q30,450 10,600 Q30,750 10,900 L15,900 Q35,750 15,600 Q35,450 15,300 Q35,150 15,0 Z" transform="translate(20, 50)" className="fill-primary/40" />
        </svg>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-primary/95 shadow-xl backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <h1 className={`text-4xl font-display transition-colors duration-300 ${isScrolled ? 'text-textLight' : 'text-primary'}`}>{menu.pizzeriaName}</h1>
          <nav>
            <ul className="flex space-x-6">
              {menu.categories.map(category => (
                <li key={category.name}>
                  <a
                    href={`#${category.name.toLowerCase()}`}
                    className={`text-lg font-display transition-all duration-300 ${getLinkClassName(category.name.toLowerCase(), activeCategory, isScrolled)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(category.name.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                      setActiveCategory(category.name.toLowerCase());
                    }}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#allergeni"
                  className={`text-lg font-display transition-all duration-300 ${getLinkClassName('allergeni', activeCategory, isScrolled)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('allergeni');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setActiveCategory('allergeni');
                  }}
                >
                  Allergeni
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen bg-hero-pizza bg-cover bg-center flex items-center justify-center relative z-10">
        <div className="text-center bg-heroOverlay p-10 rounded-lg shadow-2xl">
          <h2 className="text-7xl font-display text-white mb-4">Benvenuti da {menu?.pizzeriaName}!</h2>
          <p className="text-2xl text-textLight/90 mb-8">Le migliori pizze della città, cotte nel forno a legna.</p>
          <div className="space-x-4">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-green-800 text-white font-display px-8 py-3 rounded-lg text-xl hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Prenota un Tavolo
            </button>
            <button
              onClick={() => setIsOnlineBookingModalOpen(true)}
              className="bg-secondary text-white font-display px-8 py-3 rounded-lg text-xl hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Ordina Online
            </button>
          </div>
        </div>
      </section>

      {/* Main Content - Categories & Items */}
      <main className="relative z-10 pt-32">
        {menu.categories.map(category => (
          <section key={category.name} id={category.name.toLowerCase()} className="py-16 px-4 sm:px-6 lg:px-8">
            <h3 className={`text-5xl font-display text-center mb-12 ${isScrolled ? 'text-primary' : 'text-accent'}`}>{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {(category.name.toLowerCase() === 'pizze' ? pizzas : category.items).map(item => (
                <div key={item.id} className="bg-lightBeige p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <h4 className="text-2xl font-display text-primary mb-2">{item.name}</h4>
                  <p className="text-accent font-bold text-lg mb-3">{item.price}{category.name.toLowerCase() === 'pizze' ? '€' : ''}</p>
                  <p className="text-textDark/80 text-sm">{category.name.toLowerCase() === 'pizze' ? item.ingredients : item.description || ''}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Allergeni Section */}
      <section id="allergeni" className="py-16 bg-beige/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className={`text-5xl font-display text-center mb-12 ${isScrolled ? 'text-primary' : 'text-accent'}`}>Informazioni Allergeni</h3>
          <div className="bg-white p-8 rounded-lg shadow-xl space-y-6 text-textDark/90">
            <p className="font-semibold text-accent">Si premette che la nostra attività elabora e somministra, utilizzando un’ unico laboratorio e un’unica dispensa, prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.</p>
            <p>Gentile Cliente, se hai allergie e/o intolleranze alimentari, chiedi pure informazioni al nostro personale di sala e consulta la tabella degli allergeni.</p>
            <p>Tutti i nostri prodotti possono contenere tracce di <strong className="text-accent">glutine, latte, uova, frutta a guscio, soia, sedano, senape, sesamo, anidride solforosa e solfiti, lupini, pesce, crostacei, molluschi</strong>.</p>
            <p>La nostra cucina utilizza ingredienti freschi e di stagione. Alcuni prodotti potrebbero essere surgelati o congelati all\'origine, nel rispetto della normativa vigente (Reg. CE 853/04).</p>
            <p className="pt-4">Per maggiori dettagli su specifici piatti, non esitare a chiedere al nostro staff.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-textLight py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h5 className="text-xl font-display mb-3">Indirizzo</h5>
            <p>{menu.footer.address}</p>
          </div>
          <div>
            <h5 className="text-xl font-display mb-3">Contatti</h5>
            <p>P.IVA: {menu.footer.vatId}</p>
            <p>Tel: <a href={`tel:${menu.footer.phone}`} className="hover:text-secondary">{menu.footer.phone}</a></p>
          </div>
          <div>
            <h5 className="text-xl font-display mb-3">Orari</h5>
            {menu.footer.hours.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        {/* Google Maps Embed */}
        <div className="max-w-7xl mx-auto mt-10">
          <h5 className="text-xl font-display mb-3 text-center md:text-left">Dove Trovarci</h5>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://maps.google.com/maps?q=Corso%20Buenos%20Aires%2C%2047%2C%2020135%20Milano%20MI&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="max-w-7xl mx-auto mt-10 text-center">
          <h5 className="text-xl font-display mb-3">SEGUICI SUI SOCIAL</h5>
          <div className="flex justify-center space-x-4">
            <a href="YOUR_INSTAGRAM_URL_HERE" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">Instagram</a>
            <a href="YOUR_FACEBOOK_URL_HERE" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">Facebook</a>
          </div>
        </div>
        <div className="text-center text-textLight/70 mt-10 border-t border-textLight/30 pt-8">
          <p>&copy; {new Date().getFullYear()} {menu.pizzeriaName}. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Booking Modals */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative">
            <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-3 right-3 bg-primary text-textLight hover:bg-primary/90 text-xl rounded-full focus:outline-none flex items-center justify-center w-7 h-7">&times;</button>
            <h3 className="text-3xl font-display text-primary mb-6 text-center">Prenota un Tavolo</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" placeholder="Il tuo nome" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefono</label>
                <input type="tel" name="phone" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" placeholder="Numero di telefono" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" placeholder="La tua email" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
                <input type="date" name="date" id="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Ora</label>
                <input type="time" name="time" id="time" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Numero Ospiti</label>
                <input type="number" name="guests" id="guests" min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white" placeholder="Es. 4" />
              </div>
              <button type="submit" className="w-full bg-white text-green-800 font-display px-6 py-3 rounded-lg text-lg border border-green-800 hover:bg-green-50 hover:text-green-900 transition-colors shadow-md hover:shadow-lg">
                Invia Prenotazione
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">Ti contatteremo per confermare la prenotazione.</p>
          </div>
        </div>
      )}

      {isOnlineBookingModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative">
            <button onClick={() => setIsOnlineBookingModalOpen(false)} className="absolute top-3 right-3 bg-primary text-textLight hover:bg-primary/90 text-xl rounded-full focus:outline-none flex items-center justify-center w-7 h-7">&times;</button>
            <h3 className="text-3xl font-display text-primary mb-6 text-center">Ordina Online</h3>
            <p className="text-center text-gray-700 mb-4">
              Siamo spiacenti, il nostro sistema di ordinazione online è attualmente in manutenzione.
              <br />Per ordinare, chiamaci direttamente al <a href={`tel:${menu.footer.phone}`} className="text-accent hover:underline">{menu.footer.phone}</a>.
            </p>
            <p className="text-center text-gray-500 text-sm">
              Presto potrai ordinare comodamente da qui!
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOnlineBookingModalOpen(false)}
                className="bg-primary text-white font-display px-8 py-3 rounded-lg text-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg">
                Capito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ripristina PropTypes per menuData
App.propTypes = {
  menuData: PropTypes.shape({
    pizzeriaName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string
      })).isRequired
    })).isRequired,
    footer: PropTypes.shape({
      address: PropTypes.string.isRequired,
      vatId: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      hours: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired
};

export default App;
