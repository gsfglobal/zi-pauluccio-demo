import type { Lang } from "./site";

type L = Record<Lang, string>;

export type DishSource = "instagram" | "reviews";

export type Signature = {
  id: string;
  name: L;
  course: L;
  description: L;
  art: "ravioli" | "pancotto" | "fagioli" | "baba" | "caciocavallo" | "carciofo" | "vongole";
  source: DishSource;
  /** Link al post Instagram dell'osteria che presenta il piatto */
  post?: string;
};

export const sourceLabel: Record<DishSource, L> = {
  instagram: { it: "Dal profilo Instagram dell'osteria", en: "From the osteria's Instagram" },
  reviews: { it: "Citato più volte nelle recensioni degli ospiti", en: "Repeatedly mentioned in guest reviews" },
};

/**
 * Specialità citate più spesso nelle recensioni pubbliche (Tripadvisor, Sluurpy, Restaurant Guru).
 * Nomi e descrizioni sono da confermare con la cucina prima della pubblicazione.
 */
export const signatures: Signature[] = [
  {
    id: "ravioli-annurca",
    art: "ravioli",
    source: "instagram",
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/DW1_DFBgA5r/",
    name: { it: "Ravioli alla mela annurca", en: "Annurca apple ravioli" },
    course: { it: "Primo", en: "First course" },
    description: {
      it: "Delicati ed eleganti: la dolcezza leggermente acidula della mela annurca, regina della nostra terra, incontra la pasta fresca. Il piatto che gli ospiti citano più di tutti.",
      en: "Delicate and elegant: the gently tart sweetness of the Annurca, queen apple of our land, meets fresh pasta. The dish guests mention most.",
    },
  },
  {
    id: "caciocavallo-forno",
    art: "caciocavallo",
    source: "instagram",
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/Dd8p3W2IU4x/",
    name: { it: "Caciocavallo al forno", en: "Baked caciocavallo" },
    course: { it: "Antipasto", en: "Starter" },
    description: {
      it: "Caciocavallo di grotta che si scioglie e fila, pomodorini arrostiti, una pioggia di origano e bruschette croccanti per la scarpetta. Da dividere, fumante, con un bicchiere di rosso.",
      en: "Cave-aged caciocavallo, melted and stretchy, with roasted cherry tomatoes, oregano and crisp bruschetta for mopping up. To share, piping hot, with a glass of red.",
    },
  },
  {
    id: "carciofo-brace",
    art: "carciofo",
    source: "instagram",
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/DWRNQKkDbXa/",
    name: { it: "Carciofo alla brace", en: "Ember-grilled artichoke" },
    course: { it: "Novità in carta", en: "New on the menu" },
    description: {
      it: "Cotto lentamente sulla brace per esaltarne la dolcezza, rifinito con olio extravergine ed erbe fresche. L'eleganza della semplicità.",
      en: "Slow-cooked over the embers to bring out its sweetness, finished with extra-virgin olive oil and fresh herbs. Elegance in simplicity.",
    },
  },
  {
    id: "spaghetti-vongole",
    art: "vongole",
    source: "instagram",
    post: "https://www.instagram.com/anticaosteriazipauluccio/p/DbVQS_UAEWX/",
    name: { it: "Spaghetti alle vongole", en: "Spaghetti with clams" },
    course: { it: "Serate di pesce del venerdì", en: "Friday seafood nights" },
    description: {
      it: "Il mare tra i vicoli del borgo: nelle serate dedicate al pesce, i piatti di mare sono i veri protagonisti della tavola.",
      en: "The sea among the old town's alleys: on seafood nights, dishes from the sea take centre stage.",
    },
  },
];

export type MenuItem = L & { ig?: boolean };
export type MenuCategory = { id: string; name: L; intro: L; items: MenuItem[] };

/**
 * NON è il menu ufficiale: piatti presentati sul profilo Instagram dell'osteria (ig: true)
 * e piatti citati nelle recensioni pubbliche.
 * Prezzi, allergeni e disponibilità vanno inseriti dal menu fornito dal ristorante.
 */
export const menuFromReviews: MenuCategory[] = [
  {
    id: "antipasti",
    name: { it: "Antipasti", en: "Starters" },
    intro: { it: "Per cominciare, alla maniera del Sannio.", en: "To begin, the Sannio way." },
    items: [
      { it: "Caciocavallo di grotta al forno con pomodorini arrostiti, origano e bruschette", en: "Baked cave-aged caciocavallo with roasted cherry tomatoes, oregano and bruschetta", ig: true },
      { it: "Pancotto", en: "Pancotto (bread and greens)" },
      { it: "Pacca e fagioli", en: "Pacca e fagioli" },
      { it: "Fritti misti: crocchè con salsiccia e friarielli", en: "Mixed fried bites: croquettes with sausage and friarielli" },
      { it: "Spighe ripiene", en: "Stuffed 'spighe'" },
      { it: "Selezione di salumi e formaggi locali", en: "Local cured meats and cheeses" },
    ],
  },
  {
    id: "primi",
    name: { it: "Primi", en: "First courses" },
    intro: { it: "Pasta fresca e sughi lenti.", en: "Fresh pasta, slow sauces." },
    items: [
      { it: "Ravioli alla mela annurca", en: "Annurca apple ravioli", ig: true },
      { it: "Cavatelli con salsiccia e pomodorini", en: "Cavatelli with sausage and cherry tomatoes" },
      { it: "Cavatelli con friarielli", en: "Cavatelli with friarielli" },
      { it: "Tortelli alla genovese", en: "Tortelli with Genovese onion ragù" },
      { it: "Cappelletti al ragù", en: "Cappelletti with ragù" },
      { it: "Paccheri con baccalà", en: "Paccheri with salt cod" },
    ],
  },
  {
    id: "secondi",
    name: { it: "Secondi", en: "Main courses" },
    intro: { it: "La brace e la tradizione.", en: "The grill and tradition." },
    items: [
      { it: "Tris di carne", en: "Trio of meats" },
      { it: "Tagliata e filetto", en: "Sliced steak and fillet" },
      { it: "Angus con porcini", en: "Angus with porcini" },
      { it: "Salsiccia rossa di Castelpoto con cicoria selvatica", en: "Castelpoto red sausage with wild chicory" },
      { it: "Polpette", en: "Meatballs" },
      { it: "Baccalà in cassuola", en: "Salt cod 'in cassuola'" },
    ],
  },
  {
    id: "contorni",
    name: { it: "Contorni", en: "Sides" },
    intro: { it: "L'orto di stagione.", en: "From the seasonal garden." },
    items: [
      { it: "Carciofo grigliato alla brace con olio extravergine ed erbe fresche", en: "Ember-grilled artichoke with extra-virgin olive oil and fresh herbs", ig: true },
      { it: "Friarielli", en: "Friarielli greens" },
      { it: "Scarola", en: "Escarole" },
    ],
  },
  {
    id: "dolci",
    name: { it: "Dolci", en: "Desserts" },
    intro: { it: "Per chiudere in dolcezza.", en: "A sweet ending." },
    items: [
      { it: "Babà alla mela annurca", en: "Annurca apple babà" },
      { it: "Sbriciolona con crema e mele", en: "Crumble cake with custard and apples" },
      { it: "Tronchetto allo Strega", en: "Strega liqueur log cake" },
      { it: "Caprese", en: "Caprese almond-chocolate cake" },
    ],
  },
  {
    id: "vini",
    name: { it: "Vini", en: "Wines" },
    intro: { it: "Dalla cantina scavata nel tufo.", en: "From the cellar below." },
    items: [
      { it: "Aglianico della casa", en: "House Aglianico" },
      { it: "Carta dei vini: in attesa dell'elenco ufficiale", en: "Wine list: awaiting the official list" },
    ],
  },
];

/** Parole e piatti più ricorrenti nelle recensioni (sintesi, non citazioni). */
export const reviewThemes: { label: L; weight: number }[] = [
  { label: { it: "ravioli alla mela annurca", en: "Annurca apple ravioli" }, weight: 5 },
  { label: { it: "accoglienza", en: "hospitality" }, weight: 5 },
  { label: { it: "atmosfera rustica", en: "rustic atmosphere" }, weight: 4 },
  { label: { it: "carni alla brace", en: "grilled meats" }, weight: 4 },
  { label: { it: "pacca e fagioli", en: "pacca e fagioli" }, weight: 4 },
  { label: { it: "caciocavallo al forno", en: "baked caciocavallo" }, weight: 2 },
  { label: { it: "babà all'annurca", en: "Annurca babà" }, weight: 4 },
  { label: { it: "prezzi onesti", en: "fair prices" }, weight: 3 },
  { label: { it: "la cantina", en: "the cellar" }, weight: 3 },
  { label: { it: "pancotto", en: "pancotto" }, weight: 3 },
  { label: { it: "salumi e formaggi locali", en: "local salumi & cheese" }, weight: 3 },
  { label: { it: "cavatelli", en: "cavatelli" }, weight: 3 },
  { label: { it: "Aglianico della casa", en: "house Aglianico" }, weight: 2 },
];
