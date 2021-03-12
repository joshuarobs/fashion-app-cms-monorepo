/**
 * How countries will appear in a list, from smallest value to largest.
 * The value is simply for comparison, and does not indicate the physical
 * position in the menu list.
 * Typically, countries that are more common for major mainstream clothing
 * brands should have lower numbers. Mostly first world countries, and the
 * markets we serve would be at the top of the list here (lower numbers).
 */
enum Country_Of_Brand_Origin_Order {
  // ========================================
  // MAIN MARKETS (A-Z)
  // ========================================
  // Australia
  AU = 1,
  // Canada
  CA = 2,
  // China
  CN = 4,
  // France
  FR = 6,
  // Germany
  DE = 8,
  // Italy
  IT = 10,
  // Japan
  JP = 12,
  // New Zealand
  NZ = 14,
  // South Korea
  KR = 16,
  // Spain
  ES = 18,
  // Sweden,
  SE = 20,
  // UK
  GB = 22,
  // United States
  US = 24,
  // ========================================
  // EUROPE (A-Z)
  // ========================================
  // Austria
  AT = 100,
  // Belgium
  BE = 102,
  // Denmark
  DK = 104,
  // Netherlands
  NL = 106,
  // Portugal
  PT = 108,
  // Poland
  PL = 110,
  // Turkey - $16
  TR = 112,
  // ========================================
  // ASIA
  // ========================================
  // Bangladesh
  BD = 200,
  // Cambodia
  KH = 202,
  // Hong Kong
  HK = 204,
  // India
  IN = 206,
  // Indonesia
  ID = 208,
  // Malaysia
  MY = 210,
  // Myanmar
  MM = 212,
  // Pakistan
  PK = 214,
  // Sri Lanka
  LK = 216,
  // Thailand
  TH = 218,
  // Vietnam
  VN = 220,
  // ========================================
  // AMERICAS
  // ========================================
  // Mexico
  MX = 300,
  // ========================================
  // MIDDLE EAST
  // ========================================
  // UAE
  AE = 400,
  // ========================================
  // AFRICA
  // ========================================
  // Morocco
  MA = 500,
  // ========================================
  // REST OF WORLD
  // ========================================
}

export { Country_Of_Brand_Origin_Order };
