export interface MenuDish {
  name: string
  composition: string
  price: string
}

export interface MenuSection {
  section: string
  items: MenuDish[]
}

export const FULL_MENU: MenuSection[] = [
  {
    section: 'Raw Bar',
    items: [
      { name: 'East Coast Oysters', composition: 'Half dozen, mignonette, lemon, horseradish', price: '$24' },
      { name: 'Beef Tartare', composition: 'Hand-cut tenderloin, cured yolk, capers, grilled sourdough', price: '$26' },
      { name: 'Hamachi Crudo', composition: 'Yellowtail, blood orange, serrano, olive oil', price: '$28' },
      { name: 'Tuna Tower', composition: 'Bluefin, avocado, cucumber, sesame, ponzu', price: '$32' },
    ],
  },
  {
    section: 'Starters',
    items: [
      { name: 'Bone Marrow', composition: 'Roasted, parsley salad, pickled shallot, toast', price: '$22' },
      { name: 'Seared Foie Gras', composition: 'Brioche, fig jam, aged balsamic', price: '$34' },
      { name: 'Crispy Sweetbreads', composition: 'Brown butter, capers, lemon, frisée', price: '$24' },
      { name: 'Grilled Octopus', composition: 'Smoked paprika, fingerling potato, chimichurri', price: '$26' },
    ],
  },
  {
    section: 'Soups & Salads',
    items: [
      { name: 'Lobster Bisque', composition: 'Maine lobster, cognac cream, chive oil', price: '$28' },
      { name: 'French Onion', composition: 'Slow caramelized onion, gruyère, beef broth', price: '$18' },
      { name: 'Wedge Salad', composition: 'Iceberg, blue cheese, bacon lardons, buttermilk', price: '$17' },
      { name: 'Heirloom Tomato', composition: 'Burrata, basil, aged balsamic, sea salt', price: '$19' },
    ],
  },
  {
    section: 'Signature Steaks',
    items: [
      { name: 'Ribeye 16oz', composition: 'Dry-aged 40 days, truffle butter, roasted bone marrow', price: '$89' },
      { name: 'Wagyu Tenderloin', composition: 'Japanese A5, yuzu kosho, micro herbs', price: '$145' },
      { name: 'Porterhouse for Two', composition: '38oz, charred over oak, maldon salt', price: '$165' },
      { name: 'New York Strip', composition: 'Prime, 14oz, peppercorn crust, red wine jus', price: '$72' },
      { name: 'Filet Mignon', composition: 'Center-cut 8oz, bordelaise, confit garlic', price: '$68' },
    ],
  },
  {
    section: 'Mains',
    items: [
      { name: 'Branzino', composition: 'Whole roasted, lemon, capers, charred fennel', price: '$46' },
      { name: 'Roasted Half Chicken', composition: 'Herb butter, pan jus, fingerling potato', price: '$38' },
      { name: 'Diver Scallops', composition: 'Seared, brown butter, cauliflower purée, capers', price: '$52' },
      { name: 'Lamb Rack', composition: 'Herb crust, mint gremolata, ratatouille', price: '$56' },
    ],
  },
  {
    section: "Chef's Table",
    items: [
      { name: 'Tasting of Beef', composition: 'Five cuts, progressive char, paired sauces', price: '$120' },
      { name: 'Truffle Service', composition: 'Seasonal black truffle, shaved tableside', price: 'Market' },
      { name: 'Tomahawk Experience', composition: '45oz, fire-finished, smoked sea salt, three sides', price: '$185' },
      { name: "Chef's Surprise", composition: 'A rotating dish from the freshest market finds', price: '$95' },
    ],
  },
  {
    section: 'Sides',
    items: [
      { name: 'Truffle Fries', composition: 'Hand-cut, parmesan, truffle oil, herbs', price: '$14' },
      { name: 'Creamed Spinach', composition: 'Slow-cooked, nutmeg, gruyère crust', price: '$13' },
      { name: 'Lobster Mac', composition: 'Cavatappi, four cheeses, butter-poached lobster', price: '$24' },
      { name: 'Charred Asparagus', composition: 'Grilled, lemon, hollandaise, sea salt', price: '$13' },
      { name: 'Duck Fat Potatoes', composition: 'Crisped, rosemary, confit garlic', price: '$12' },
    ],
  },
  {
    section: 'Desserts',
    items: [
      { name: 'Lava Cake', composition: 'Valrhona chocolate, vanilla bean ice cream', price: '$18' },
      { name: 'Crème Brûlée', composition: 'Tahitian vanilla, caramelized sugar crust', price: '$15' },
      { name: 'Basque Cheesecake', composition: 'Burnt top, crème fraîche, macerated berries', price: '$16' },
      { name: 'Warm Apple Tart', composition: 'Puff pastry, calvados caramel, crème anglaise', price: '$16' },
    ],
  },
  {
    section: 'Cheese & Digestifs',
    items: [
      { name: 'Artisan Cheese Board', composition: "Five selections, honeycomb, marcona almonds", price: '$28' },
      { name: 'Aged Port', composition: '20-year tawny, served chilled', price: '$22' },
      { name: 'Cognac Flight', composition: 'Three houses, VSOP to XO', price: '$48' },
      { name: 'Single Malt Scotch', composition: '18-year Highland, neat or with water', price: '$36' },
    ],
  },
  {
    section: 'Bar & Wine',
    items: [
      { name: 'Smoked Old Fashioned', composition: 'Bourbon, demerara, applewood smoke', price: '$20' },
      { name: 'Ember Negroni', composition: 'Charred-rosemary gin, campari, vermouth', price: '$19' },
      { name: 'Cabernet Sauvignon', composition: 'Napa Valley, by the glass', price: '$26' },
      { name: 'Champagne', composition: 'Grand cru brut, by the glass', price: '$32' },
    ],
  },
]
