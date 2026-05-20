export const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Events', href: '#events' },
]

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Ribeye 16oz',
    description: 'Dry-aged, truffle butter, roasted bone marrow',
    price: '$89',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
  },
  {
    id: 2,
    name: 'Wagyu Tenderloin',
    description: 'Japanese A5, yuzu kosho, micro herbs',
    price: '$145',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: 3,
    name: 'Lobster Bisque',
    description: 'Maine lobster, cognac cream, chive oil',
    price: '$28',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
  },
  {
    id: 4,
    name: 'Lava Cake',
    description: 'Valrhona chocolate, vanilla bean ice cream',
    price: '$18',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
  },
]

export const STORY_STATS = [
  { value: '2019', label: 'Established' },
  { value: '14', label: 'Awards' },
  { value: 'Marco Rodriguez', label: 'Executive Chef' },
]

export const AMBIANCE_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Dining room' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', alt: 'Bar' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80', alt: 'Dish detail' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Interior' },
  { src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&q=80', alt: 'Guests' },
  { src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80', alt: 'Fine dining' },
  { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80', alt: 'Restaurant atmosphere' },
]

export const REVIEWS = [
  {
    id: 1,
    quote: 'The Wagyu tenderloin was unlike anything I have experienced in twenty years of dining in New York. Ember has redefined what a steakhouse can be.',
    author: 'James H.',
    context: 'Business Dinner',
    stars: 5,
  },
  {
    id: 2,
    quote: 'We hosted our anniversary here and the team made every detail feel effortless. The dry-aged ribeye is worth every penny.',
    author: 'Sophia & Daniel M.',
    context: 'Anniversary Dinner',
    stars: 5,
  },
  {
    id: 3,
    quote: 'The atmosphere is electric but intimate. The lobster bisque alone deserves a Michelin star. We will be back next month.',
    author: 'Rachel T.',
    context: 'Regular Guest',
    stars: 5,
  },
]

export const CONTACT_INFO = {
  address: '142 West 53rd Street\nNew York, NY 10019',
  hours: 'Mon – Thu: 5 PM – 11 PM\nFri – Sat: 5 PM – 12 AM\nSun: 5 PM – 10 PM',
  phone: '+1 (212) 555-0198',
  email: 'reservations@ember-nyc.com',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
}
