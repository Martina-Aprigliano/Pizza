import React from 'react';
import { Link } from 'react-router-dom';

// Importa le immagini delle pizze qui
// Assicurati che i percorsi siano corretti e che le immagini siano nella cartella /immagini o /public
// Esempio: import margheritaImg from '../immagini/margherita.jpg';
// Dovrai aggiungere un'immagine per ogni pizza che vuoi mostrare.
// Per ora, useremo placeholder se le immagini specifiche non sono disponibili.

const pizzeDaMostrare = [
    { id: "691", name: "Margherita", imgSrc: "/immagini/margherita-placeholder.jpg", description: "Classica e deliziosa." },
    { id: "285", name: "‘Nduja", imgSrc: "/immagini/nduja-placeholder.jpg", description: "Piccante e saporita." },
    { id: "378", name: "Bufala", imgSrc: "/immagini/bufala-placeholder.jpg", description: "Con mozzarella di bufala fresca." },
    { id: "156", name: "Marinara", imgSrc: "/immagini/marinara-placeholder.jpg", description: "Semplice e tradizionale." },
    { id: "417", name: "Diavola Gialla", imgSrc: "/immagini/diavola-gialla-placeholder.jpg", description: "Un tocco di giallo piccante." },
    { id: "73", name: "Capricciosa", imgSrc: "/immagini/capricciosa-placeholder.jpg", description: "Ricca di ingredienti." },
    // Aggiungi altre pizze qui dal tuo menu, con i rispettivi imgSrc
    // { id: "...", name: "Nome Pizza", imgSrc: "/immagini/nome-pizza.jpg", description: "Descrizione..." },
];

// Funzione helper per generare un percorso immagine placeholder se non specificato
const getImagePath = (pizza) => {
    // Se hai immagini specifiche nella cartella /immagini, usa quelle.
    // Esempio: return `/immagini/${pizza.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    // Altrimenti, usa un placeholder generico o quello specificato in imgSrc.
    return pizza.imgSrc || `/immagini/placeholder-pizza.jpg`;
};


function PizzaGallery({ menuData }) {
    const pizzaItems = menuData.categories.find(category => category.name === "Pizze")?.items || [];

    // Se vuoi usare le immagini definite in pizzeDaMostrare, mappa su quello.
    // Altrimenti, se vuoi generare dinamicamente dalle voci del menu:
    const galleryItems = pizzaItems.map(pizza => {
        const predefinedPizza = pizzeDaMostrare.find(p => p.name.toLowerCase() === pizza.name.toLowerCase());
        return {
            ...pizza,
            imgSrc: predefinedPizza ? getImagePath(predefinedPizza) : getImagePath({ name: pizza.name, imgSrc: null }),
            description: predefinedPizza?.description || pizza.description // Usa la descrizione predefinita o quella del menu
        };
    });

    return (
        <div className="bg-background min-h-screen font-body text-textDark relative overflow-x-hidden">
            {/* Header Semplificato per la Galleria */}
            <header className="bg-primary/95 shadow-xl backdrop-blur-sm sticky top-0 z-50">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    <Link to="/" className="text-4xl font-display text-textLight hover:text-secondary transition-colors">
                        {menuData.pizzeriaName}
                    </Link>
                    <Link to="/" className="text-lg font-display text-textLight hover:text-secondary transition-colors">
                        Torna al Menù
                    </Link>
                </div>
            </header>

            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 relative z-10">
                <h1 className="font-display text-6xl text-primary mb-16 text-center">Galleria delle Nostre Pizze</h1>

                {galleryItems.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {galleryItems.map((pizza) => (
                            <div key={pizza.id || pizza.name} className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden transform hover:-translate-y-1 border border-secondary/30 hover:border-secondary">
                                <img
                                    src={pizza.imgSrc}
                                    alt={`Pizza ${pizza.name}`}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/immagini/placeholder-pizza.jpg'; }} // Fallback se l'immagine non carica
                                />
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-primary mb-2 font-display">{pizza.name}</h3>
                                    <p className="text-textDark/80 text-sm leading-relaxed flex-grow">{pizza.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-textDark/80">Nessuna pizza da mostrare nella galleria al momento.</p>
                )}
            </main>

            {/* Footer Semplificato */}
            <footer className="bg-primary text-textLight p-10 mt-16 relative z-10">
                <div className="text-center text-textLight/70 pt-8 border-t border-secondary/30">
                    <p className="text-xs">&copy; {new Date().getFullYear()} {menuData.pizzeriaName}. Tutti i diritti riservati.</p>
                </div>
            </footer>
        </div>
    );
}

export default PizzaGallery;
