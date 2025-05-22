import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Estrai i dati del menu da App o definiscili qui se preferisci
// Per semplicità, li passiamo come prop, assumendo che App li possa fornire
// o che siano accessibili globalmente/tramite context.

// Temporaneamente, definiamo qui i dati del menu per passarli. 
// Idealmente, questi verrebbero da una fonte comune o da App.
const menuData = {
  pizzeriaName: "Crosta Divina",
  categories: [
    {
      name: "Pizze", items: [
        { id: "691", name: "Margherita", price: "9€", description: "Passata di pomodoro San Marzano Dop, fior di latte, Parmigiano Reggiano, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "285", name: "‘nduja", price: "11€", description: "Passata di pomodoro San Marzano Dop, fior di latte, nduja calabrese Madeo, Parmigiano Reggiano, basilico fresco, olio extravergine d’oliva biologico" },
        { id: "378", name: "Bufala", price: "12€", description: "Passata di pomodoro San Marzano. Dop, bufala campana Dop, pepe nero, basilico fresco, olio extravergine d’oliva biologico" },
        { id: "156", name: "Marinara", price: "8€", description: "Passata di pomodoro San Marzano Dop, pomodori datterini rossi, origano di collina, aglio, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "166", name: "Napoli", price: "13€", description: "Passata di pomodoro San Marzano Dop, fior di latte, alici di Cetara, olive Riviera, capperi di Salina, origano, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "417", name: "Diavola Gialla", price: "14€", description: "Passata di pomodorini del Piennolo del Vesuvio gialli, fior di latte, salamino piccante, fili di peperoncino, ‘nduja calabrese Madeo, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "209", name: "Norma", price: "12€", description: "Passata di pomodoro San Marzano Dop, provola affumicata, melanzane al forno, pomodorini semi dry, ricotta salata, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "47", name: "Tonno e Cipolla", price: "15€", description: "Crema di cipolle di Tropea, fior di latte, cipolle rosse di Tropea caramellate, filetti di tonno Armatore, olive Riviera, polvere di cipolla bianca, basilico, olio extravergine d’oliva biologico." },
        { id: "164", name: "Vegana", price: "12€", description: "Crema di verze, scarola cotta nel forno a legna, pomodori datterini rossi, olive Riviera, mandorle tostate, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "73", name: "Capricciosa", price: "15€", description: "Passata di pomodoro San Marzano Dop, fior di latte, prosciutto cotto Praga, funghi champignon, carciofini, polvere di olive Riviera, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "27", name: "Quattro formaggi", price: "15€", description: "Fior di latte, cacioricotta del Cilento, gorgonzola dolce Dop, cialde di Parmigiano Reggiano aromatizzate al limone, confettura di albicocche, olio extravergine d’oliva biologico." },
        { id: "25", name: "Amatriciana Gialla", price: "14€", description: "Passata di datterini gialli, pomodorini semi dry rossi, guanciale di Amatrice, pecorino romano Dop, pepe nero, basilico fresco, olio extra vergine d’oliva biologico." },
        { id: "12", name: "Fiori di zucca e alici di Cetara", price: "15€", description: "Passata di pomodori datterini gialli, fior di latte, alici di Cetara, fiori di zucca, olive Riviera, peperoncino contuso, basilico fresco." },
        { id: "3", name: "Vegetariana", price: "13€", description: "Passata di pomodori datterini gialli, stracciatella pugliese, peperoni arrostiti nel forno a legna, zucchine marinate alla menta, fiori di zucca, olio evo biologico." },
        { id: "6", name: "Salame ventricina e friggitelli", price: "14€", description: "Passata di datterini rossi arrostiti, fior di latte, salame ventricina abruzzese, friggitelli, riduzione di peperoncino." },
        { id: "11", name: "Crudo San Daniele e Parmigiano Reggiano", price: "15€", description: "Passata di pomodoro dop San Marzano, fior di latte, pomodori datterini gialli e rossi, prosciutto crudo San Daniele, scaglie di Parmigiano Reggiano, basilico fresco, olio evo biologico." }
      ]
    }, {
      name: "Sfizi", items: [
        { id: "s1", name: "Polpette di bovino piemontese", price: "9€", description: "Con passata di pomodoro San Marzano Dop, Parmigiano Reggiano, basilico fresco e pane cotto nel forno a legna." },
        { id: "s2", name: "Hummus di ceci", price: "6€", description: "Con paprika dolce, olio extravergine d’oliva biologico e pane cotto nel forno a legna." },
        { id: "s3", name: "Stracciatella pugliese", price: "7€", description: "Con pepe nero e olio extravergine d’oliva biologico e pane cotto nel forno a legna." },
        { id: "s4", name: "Burrata pugliese con datterini", price: "10€", description: "Rossi e gialli e olio extravergine d’oliva biologico." },
        { id: "s5", name: "Bruschetta Classica", price: "5€", description: "Con datterini rossi e gialli, basilico fresco, olio extravergine d’oliva biologico." },
        { id: "s6", name: "Bruschetta Speciale", price: "6€", description: "Con stracciatella pugliese, friarielli, alici di Cetara, olio extravergine d’oliva biologico." },
        { id: "s7", name: "Scarola spadellata", price: "6€", description: "Con olive Riviera, capperi di Salina, olio extravergine d’oliva biologico." },
        { id: "s8", name: "Tagliere di salumi", price: "12€", description: "Con crudo San Daniele, salame dolce piacentino, speck, prosciutto cotto e focaccia." }
      ]
    },
    {
      name: "Insalate", items: [
        { id: "i1", name: "Insalata Tonno", price: "10€", description: "Misticanza, mozzarella di bufala, filetti di tonno, datterini rossi, olive Riviera." },
        { id: "i2", name: "Songino e finocchi", price: "10€", description: "Songino, finocchi, arance, noci, semi di zucca." }
      ]
    },
    {
      name: "Dolci", items: [
        { id: "d1", name: "Tiramusù con ricotta di bufala", price: "7€", description: "" },
        { id: "d2", name: "Cannolo siciliano scomposto", price: "6€", description: "Con crema di ricotta e gocce di cioccolato." },
        { id: "d3", name: "Affogato al caffè", price: "7€", description: "Con gelato alla nocciola e granella di nocciole." },
        { id: "d4", name: "Gelato fior di latte", price: "9€", description: "Con frutti di bosco (mirtili, lamponi, more)." },
        { id: "d5", name: "Cheesecake", price: "8€", description: "Con confettura ai frutti di bosco." },
        { id: "d6", name: "Crostata al cioccolato", price: "8€", description: "" }
      ]
    },
    {
      name: "Bevande", items: [
        { id: "b1", name: "Coca Cola", price: "4€", description: "Bibita in vetro." },
        { id: "b2", name: "Coca Cola Zero", price: "4€", description: "Bibita in vetro." },
        { id: "b3", name: "Fanta", price: "4€", description: "Bibita in vetro." },
        { id: "b4", name: "Sprite", price: "4€", description: "Bibita in vetro." },
        { id: "b5", name: "Acqua Panna (50 cl)", price: "3€", description: "" },
        { id: "b6", name: "Acqua S. Pellegrino (50 cl)", price: "3€", description: "" },
        { id: "b7", name: "Birra Moretti Baffo Oro (Spina Piccola)", price: "4€", description: "Media 6€. No asporto." },
        { id: "b8", name: "Birra Moretti La Rossa (Spina Piccola)", price: "4€", description: "Media 6€. No asporto." },
        { id: "b9", name: "Birre Artigianali (33cl)", price: "7€", description: "Selezione di birre artigianali." },
        { id: "b10", name: "Birra Moretti La Rossa (Bottiglia 33cl)", price: "4€", description: "" },
        { id: "b11", name: "Birra Moretti La Bianca (Bottiglia 33cl)", price: "4€", description: "" },
        { id: "b12", name: "Birra Moretti La Oro (Bottiglia 33cl)", price: "4€", description: "" },
        { id: "b13", name: "Prosecco Valdobbiadene DOCG Colbelo (Calice)", price: "7€", description: "Bottiglia 30€. Casa Vinicola Merotto." },
        { id: "b14", name: "Le Vedute (Calice)", price: "7€", description: "Bottiglia 40€." },
        { id: "b15", name: "Lugana Classico D.O.C. (Calice)", price: "7€", description: "Bottiglia 30€. Tenuta Roveglia (Lombardia)." },
        { id: "b16", name: "Pecorino Superiore D.O.C. Spinelli (Calice)", price: "7€", description: "Bottiglia 30€. Le Stagioni (Abruzzo)." },
        { id: "b17", name: "Collio Ribolla Gialla D.O.C. (Calice)", price: "7€", description: "Bottiglia 30€. Vigna del Lauro (Friuli)." },
        { id: "b18", name: "Vermentino di Sardegna D.O.C. Camminera", price: "35€", description: "Bottiglia. Audarya (Sardegna)." },
        { id: "b19", name: "A.A. Gewurztraminer D.O.C.", price: "40€", description: "Bottiglia. Von Blumen (Alto Adige)." },
        { id: "b20", name: "Rosato Cannonau di Sardegna D.O.C.", price: "28€", description: "Bottiglia. Audarya (Sardegna)." },
        { id: "b21", name: "Rosato Primitivo (Calice)", price: "7€", description: "Bottiglia 28€. A Mano (Puglia)." },
        { id: "b22", name: "Dolcetto d’Alba D.O.C (Calice)", price: "7€", description: "Bottiglia 28€. La Ganghijia (Piemonte)." },
        { id: "b23", name: "Aglianico I.G.P. (Calice)", price: "6€", description: "Bottiglia 25€. La Capranera (Campania)." },
        { id: "b24", name: "Isonzo Merlot D.O.C (Calice)", price: "7€", description: "Bottiglia 27€. Vigna del Lauro (Friuli)." },
        { id: "b25", name: "Monica di Sardegna D.O.C", price: "28€", description: "Bottiglia. Audarya (Sardegna)." },
        { id: "b26", name: "A.A. Pinot Nero D.O.C", price: "40€", description: "Bottiglia. Von Blumen (Alto Adige)." },
        { id: "b27", name: "Jefferson Amaro Importante", price: "4€", description: "" },
        { id: "b28", name: "L’Amaro di Farmily", price: "4€", description: "" }
      ]
    },
  ],
  footer: {
    address: "Corso Buenos Aires, 47 | 20135 Milano MI",
    vatId: "09242710961",
    phone: "0254118711",
    hours: [
      "Lun-Ven 12.30 – 15.00 / 19.30 – 23.30",
      "Sab-Dom 12.30 – 15.00 / 19.30 – 00.00"
    ],
    social: [
      { name: "Instagram", url: "https://instagram.com" },
      { name: "Facebook", url: "https://facebook.com" }
    ],
    allergenInfo: "Si premette che la nostra attività elabora e somministra, utilizzando un’ unico laboratorio e un’unica dispensa, prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.",
    mapLink: "https://maps.google.com/?q=Corso+Buenos+Aires+47+Milano"
  }
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App menuData={menuData} />
  </StrictMode>
);
