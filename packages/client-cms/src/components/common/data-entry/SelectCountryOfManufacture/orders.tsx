/**
 * How countries will appear in a list, from smallest value to largest.
 * The value is simply for comparison, and does not indicate the physical
 * position in the menu list.
 * Typically, countries that are more common for making clothing should have
 * lower numbers. You can think of the number being the rank of number of
 * clothing made from that country.
 *
 * Sources for ranking significant textile exporting countries=
 * https=//howmuch.net/articles/world-map-clothing-exports
 */
enum Country_Of_Manufacture_Orders {
  // ========================================
  // TOP 10
  // ========================================
  // China - $158 Billion
  CN = 1,
  // Bangladesh - $33
  BD = 2,
  // Vietnam - $28
  VN = 3,
  // Italy - $25
  IT = 4,
  // Germany - $24
  DE = 5,
  // India - $17
  IN = 6,
  // Turkey - $16
  TR = 7,
  // Spain - $15
  ES = 8,
  // Hong Kong - $14
  HK = 9,
  // France - $13
  FR = 10,
  // ========================================
  // MAIN MARKETS
  // ========================================
  // United States - $6
  US = 20,
  // Canada - $1.7
  CA = 22,
  // UK - $8.8
  GB = 24,
  // Australia - $0.25
  AU = 26,
  // New Zealand - $0.2
  NZ = 28,
  // Japan - $0.648
  JP = 30,
  // South Korea - $2.1
  KR = 32,
  // ========================================
  // REST OF WORLD
  // ========================================
  // Netherlands - $13
  NL = 150,
  // Belgium - $9.9
  BE = 152,
  // Indonesia - $8.9
  ID = 154,
  // UK - $8.8
  // Cambodia - $8.1
  KH = 156,
  // Poland - $7
  PL = 158,
  // United States - $6
  // Pakistan - $5.9
  PK = 160,
  // Malaysia - $5.8
  MY = 162,
  // Sri Lanka - $5.2
  LK = 164,
  // Denmark - $4.6
  DK = 166,
  // Mexico - $4.2
  MX = 168,
  // Myanmar - $4.1
  MM = 170,
  // Thailand - $3.8
  TH = 172,
  // Portugal - $3.8
  PT = 174,
  // UAE - $3.5
  AE = 176,
  // Morocco - $3.4
  MA = 178,
  // Austria - $3.2
  AT = 180,
  // Canada - $1.7
}

export { Country_Of_Manufacture_Orders };
