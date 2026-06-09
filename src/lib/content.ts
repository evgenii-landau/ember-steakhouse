export const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Events', href: '#events' },
]

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'East Coast Oysters',
    description:
      'Fresh East Coast oysters served on a bed of crushed ice, accompanied by a classic red wine mignonette sauce with shallots, and fresh lemon wedges.',
    price: '$24',
    category: 'Raw & Seafood',
    image: '/dishes/east-coast-oysters.jpg',
  },
  {
    id: 2,
    name: 'Beef Tartare',
    description:
      'Hand-chopped prime marbling beef, tangy capers, shallots, and a raw quail egg yolk, finished with a touch of truffle oil and served with crispy artisanal crostini.',
    price: '$26',
    category: 'Raw & Seafood',
    image: '/dishes/beef-tartare.jpg',
  },
  {
    id: 3,
    name: 'Hamachi Crudo',
    description:
      'Thinly sliced fresh Hamachi (yellowtail), refreshing yuzu gel, premium cold-pressed olive oil, flaky sea salt, and micro-herbs.',
    price: '$28',
    category: 'Raw & Seafood',
    image: '/dishes/hamachi-crudo.jpg',
  },
  {
    id: 4,
    name: 'Tuna Tower',
    description:
      'Elegantly layered Ahi tuna tartare, ripe avocado, diced fresh mango, citrus-infused ponzu sauce, and a sprinkle of toasted sesame seeds.',
    price: '$32',
    category: 'Raw & Seafood',
    image: '/dishes/tuna-tower.jpg',
  },
  {
    id: 5,
    name: 'Lobster Bisque',
    description:
      'Rich and velvety cream soup made from roasted lobster shells, touched with cognac and fresh cream, topped with tender poached lobster meat and micro-greens.',
    price: '$28',
    category: 'Raw & Seafood',
    image: '/dishes/lobster-bisque.jpg',
  },
  {
    id: 6,
    name: 'Ribeye 16oz',
    description:
      'Premium, wet-aged thick-cut ribeye (450g) grilled over an open flame, infused with aromatic rosemary, charred garlic, and smoked sea salt.',
    price: '$89',
    category: 'Steaks & Mains',
    image: '/dishes/ribeye-16oz.jpg',
  },
  {
    id: 7,
    name: 'Wagyu Tenderloin',
    description:
      'Ultra-premium A5 Japanese Wagyu Filet Mignon with exceptional marbling, finished with Maldon sea salt flakes and a signature black truffle jus.',
    price: '$145',
    category: 'Steaks & Mains',
    image: '/dishes/wagyu-tenderloin.jpg',
  },
  {
    id: 8,
    name: 'Porterhouse for Two',
    description:
      'A massive, bone-in cut combining both tender filet and juicy strip loin, oak-fired in the Josper oven, carved and served with rich natural beef jus.',
    price: '$165',
    category: 'Steaks & Mains',
    image: '/dishes/porterhouse-for-two.jpg',
  },
  {
    id: 9,
    name: 'Lamb Rack',
    description:
      'Tender rack of New Zealand lamb roasted in a delicate crust of Dijon mustard and fresh garden herbs, served with a rich demi-glace reduction.',
    price: '$56',
    category: 'Steaks & Mains',
    image: '/dishes/lamb-rack.jpg',
  },
  {
    id: 10,
    name: 'Lava Cake',
    description:
      'Classic chocolate fondant made from premium Belgian dark chocolate with a signature molten liquid center, served with a scoop of vanilla bean ice cream and fresh raspberries.',
    price: '$18',
    category: 'Desserts',
    image: '/dishes/lava-cake.jpg',
  },
]

export const STORY_STATS = [
  { value: '2019', label: 'Established' },
  { value: '14', label: 'Awards' },
  { value: 'Marco Rodriguez', label: 'Executive Chef' },
]

export const AMBIANCE_IMAGES = [
  { src: '/gallery/dinner-ambiance.jpg', alt: 'Candlelit dinner table set for an evening service at Ember' },
  { src: '/gallery/lounge-area.jpg', alt: 'Intimate lounge seating with warm leather and low lighting' },
  { src: '/gallery/chef-hands.jpg', alt: 'Chef plating a dish by hand in the Ember kitchen' },
  { src: '/gallery/restaurant-interior.jpg', alt: 'Ember dining room interior with ambient evening lighting' },
  { src: '/gallery/bar-details.jpg', alt: 'Close-up of crafted cocktails and glassware at the bar' },
  { src: '/gallery/open-kitchen.jpg', alt: 'Open kitchen with the oak-fired grill in full service' },
  { src: '/gallery/table-flatlay.jpg', alt: 'Overhead flatlay of plated dishes and table settings' },
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
