import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import './App.css';

function App({ menuData }) { // Accetta menuData come prop
  const menu = menuData;

  const [activeCategory, setActiveCategory] = useState(menu.categories[0].name.toLowerCase());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOnlineBookingModalOpen, setIsOnlineBookingModalOpen] = useState(false);

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
      // Determine active category based on scroll position
      let currentCategory = menu.categories[0].name.toLowerCase();
      for (const category of menu.categories) {
        const element = document.getElementById(category.name.toLowerCase());
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          currentCategory = category.name.toLowerCase();
        } else {
          break;
        }
      }
      setActiveCategory(currentCategory);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menu.categories]);

  return (
    <div className="bg-background min-h-screen font-body text-textDark relative overflow-x-hidden">
      {/* Climbing Plants Graphics - these could be more sophisticated SVGs or images */}
      <div className="absolute top-0 left-0 w-32 h-full z-0 pointer-events-none">
        {/* Simplified representation of climbing plants */}
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
                      document.getElementById(category.name.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
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
                    document.getElementById('allergeni').scrollIntoView({ behavior: 'smooth' });
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
          <h2 className="text-7xl font-display text-white mb-4">Benvenuti da {menu.pizzeriaName}!</h2>
          <p className="text-2xl text-textLight/90 mb-8">Autentica pizza italiana, cotta con amore.</p>
          <a href={`#${menu.categories[0].name.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(menu.categories[0].name.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
              setActiveCategory(menu.categories[0].name.toLowerCase());
            }}
            className="bg-accentRed hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg">
            Scopri il Menù
          </a>
        </div>
      </section>

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 relative z-10">
        {menu.categories.map((category) => (
          <section key={category.name} id={category.name.toLowerCase()} className="mb-20 scroll-mt-24">
            <h2 className="font-display text-5xl text-primary mb-10 text-center">{category.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.items.map((item, index) => (
                <div key={item.id || index} className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden transform hover:-translate-y-1 border border-secondary/30 hover:border-secondary">
                  {/* Optional: Add image here if available, e.g., <img src={`/immagini/${item.name.toLowerCase().replace(/\\s+/g, '-')}.jpg`} alt={item.name} className="w-full h-48 object-cover"/> */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-primary mb-2 font-display">{item.name}</h3>
                    <p className="text-textDark font-semibold text-xl mb-3">{item.price}</p>
                    {item.description && <p className="text-textDark/80 text-sm leading-relaxed flex-grow">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section id="allergeni" className="mb-16 p-10 bg-allergenBg border-2 border-allergenBorder rounded-lg shadow-lg scroll-mt-24">
          <h2 className="font-display text-4xl text-allergenText mb-6 text-center">Informazioni Allergeni</h2>
          <p className="text-textDark/90 leading-relaxed text-center">{menu.footer.allergenInfo}</p>
          <p className="text-textDark/90 mt-4 text-center">Per maggiori dettagli sulla presenza di allergeni specifici nei nostri piatti, si prega di consultare la documentazione disponibile in cassa o chiedere al nostro personale.</p>
        </section>
      </main>

      <footer className="bg-primary text-textLight p-10 mt-16 relative z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-display text-secondary mb-4">{menu.pizzeriaName}</h3>
            <p className="text-sm">{menu.footer.address}</p>
            <p className="text-sm">P.IVA: {menu.footer.vatId}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Orari</h3>
            {menu.footer.hours.map(line => <p key={line} className="mb-1 text-sm">{line}</p>)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Contatti</h3>
            <p className="text-sm">Tel: <a href={`tel:${menu.footer.phone}`} className="hover:text-secondary transition-colors">{menu.footer.phone.replace(/(\\d{2})(\\d{4})(\\d{4})/, "$1 $2 $3")}</a></p>
            <p className="text-sm mt-2"><a href={menu.footer.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Visualizza Mappa</a></p>
            <div className="mt-3 flex flex-col space-y-1"> {/* Adjusted space-y for tighter packing like links */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="text-sm text-textLight hover:text-secondary transition-colors text-left" // Changed: Styling to match link
              >
                Prenota (Telefono)
              </button>
              <button
                onClick={() => setIsOnlineBookingModalOpen(true)}
                className="text-sm text-textLight hover:text-secondary transition-colors text-left" // Changed: Styling to match link
              >
                Prenota Online
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Seguici</h3>
            <div className="flex space-x-4 mb-6">
              {menu.footer.social.map(socialLink => (
                <a
                  key={socialLink.name}
                  href={socialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={socialLink.name}
                  className="text-sm hover:text-secondary transition-transform transform hover:scale-105"
                >
                  {socialLink.name === 'Instagram' ? 'Instagram' : 'Facebook'} {/* Replace emoji with text */}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Google Maps Embed */}
        <div className="mt-10">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(menu.footer.address)}&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa Crosta Divina"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
        <div className="text-center text-textLight/70 pt-8 mt-10 border-t border-secondary/30">
          <p className="text-xs">Privacy & Cookie Policy – Made with love by Sinapps</p>
          <p className="text-xs mt-1">&copy; {new Date().getFullYear()} {menu.pizzeriaName}. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Booking Modal (Phone) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-card p-8 rounded-xl shadow-2xl max-w-md w-full relative border border-secondary">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-textDark hover:text-accentRed text-2xl font-bold"
              aria-label="Chiudi modale"
            >
              &times;
            </button>
            <h3 className="text-3xl font-display text-primary mb-6 text-center">Prenota il tuo Tavolo</h3>
            <div className="space-y-3 mb-6 text-textDark/90">
              <p className="text-lg">Chiamaci per prenotare:</p>
              <p className="text-2xl font-semibold text-primary text-center">
                <a href={`tel:${menu.footer.phone}`} className="hover:underline">{menu.footer.phone.replace(/(\\d{2})(\\d{4})(\\d{4})/, "$1 $2 $3")}</a>
              </p>
              <hr className="my-4 border-secondary/30" />
              <p className="text-lg font-semibold">I nostri orari:</p>
              {menu.footer.hours.map(line => (
                <p key={line} className="ml-2">{line}</p>
              ))}
            </div>
            <p className="text-sm text-textDark/70 text-center">Ti aspettiamo da {menu.pizzeriaName}!</p>
          </div>
        </div>
      )}

      {/* Online Booking Modal */}
      {isOnlineBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-card p-8 rounded-xl shadow-2xl max-w-md w-full relative border border-secondary">
            <button
              onClick={() => setIsOnlineBookingModalOpen(false)}
              className="absolute top-4 right-4 text-textDark hover:text-accentRed text-2xl font-bold"
              aria-label="Chiudi modale"
            >
              &times;
            </button>
            <h3 className="text-3xl font-display text-primary mb-6 text-center">Prenotazione Online</h3>
            <div className="space-y-4 mb-6 text-textDark/90 text-center">
              <p className="text-lg">Il nostro servizio di prenotazione online sarà presto disponibile!</p>
              <p>Nel frattempo, puoi prenotare comodamente per telefono.</p>
            </div>
            <button
              onClick={() => {
                setIsOnlineBookingModalOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="mt-4 w-full bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out text-base"
            >
              Prenota via Telefono
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Aggiungi la validazione per menuData
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
      hours: PropTypes.arrayOf(PropTypes.string).isRequired,
      social: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })).isRequired,
      allergenInfo: PropTypes.string.isRequired,
      mapLink: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default App;
