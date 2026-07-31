/**
 * Every real-world value the site needs lives here.
 * This is the only file a non-developer should ever have to edit.
 */
export const site = {
  name: 'Baby Time',

  // TODO: replace with the production domain before launch.
  url: 'https://babytime.uz',

  // TODO: replace with the real store listings.
  appStoreUrl: 'https://apps.apple.com/app/id0000000000',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=uz.babytime.app',

  // TODO: replace with real contact details.
  email: 'info@babytime.uz',
  phone: '+998 90 000 00 00',
  phoneHref: '+998900000000',

  // TODO: replace with real profiles. Remove any you do not use.
  social: {
    telegram: 'https://t.me/babytime',
    instagram: 'https://instagram.com/babytime',
    facebook: 'https://facebook.com/babytime',
    youtube: '',
  },

  /**
   * TODO: these three numbers appear in the hero trust row and must be real
   * before launch. Fabricated traction is the fastest way to lose a parent's trust.
   */
  stats: {
    rating: 4.9,
    kindergartens: 200,
    bookings: 10000,
  },

  /** Where the coverage map opens, and how far in. */
  mapCenter: { lat: 41.2995, lng: 69.2401, zoom: 12 },
} as const;

/**
 * Pins for the coverage map.
 *
 * TODO: DEMO DATA. The coordinates are real Tashkent districts, but the names
 * are the same placeholders used elsewhere on the site — no real kindergarten
 * has agreed to be listed here yet. Replace this array with partners who have
 * actually signed up, or drop the section, before launch. Never show a parent
 * a pin they cannot actually book.
 */
export const mapPins = [
  { name: 'Quyoshli Bola', district: 'Chilonzor', lat: 41.2756, lng: 69.2044 },
  { name: 'Kichkintoy', district: 'Yunusobod', lat: 41.345, lng: 69.289 },
  { name: 'Bolajon', district: 'Mirzo Ulugʻbek', lat: 41.325, lng: 69.335 },
  { name: 'Umid Bogʻchasi', district: 'Sergeli', lat: 41.223, lng: 69.22 },
  { name: 'Barakali Kun', district: 'Yakkasaroy', lat: 41.283, lng: 69.253 },
  { name: 'Yulduzcha', district: 'Shayxontohur', lat: 41.317, lng: 69.228 },
  { name: 'Kamalak', district: 'Mirobod', lat: 41.29, lng: 69.28 },
  { name: 'Nur Bolajon', district: 'Olmazor', lat: 41.34, lng: 69.22 },
] as const;

export type Social = keyof typeof site.social;
