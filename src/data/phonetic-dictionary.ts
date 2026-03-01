/**
 * Phonetic Dictionary
 * Maps Klingon words to phonetic approximations for Web Speech API
 * Based on spec Section 3.2
 */

export const phoneticDictionary: Record<string, string> = {
  // ============================================================================
  // MODULE 1: Survival Basics
  // ============================================================================

  // Verbs
  Sop: 'SHOP',
  tlhutlh: 'TLOOTL',
  jaH: 'JAH',
  ghoS: 'GHOSH',
  "ba'": 'BAH',
  Qong: 'KHONG',
  ghop: 'GHOP',

  // Nouns
  Soj: 'SHOJ',
  bIQ: 'BIKH',
  HIq: 'HEEKH',
  "Qe'": 'KHEH',
  juH: 'JOOH',
  "pa'": 'PAH',

  // Prefixes
  'jI': 'JEE',
  bI: 'BEE',
  ma: 'MAH',
  vI: 'VEE',
  Da: 'DAH',

  // Suffixes
  Daq: 'DAKH',
  "'a'": 'AH',

  // Common Module 1 sentences
  jISop: 'JEE-SHOP',
  "Qe'Daq jISop": 'KHEH-DAKH, JEE-SHOP',
  'bIQ vItlhutlh': 'BIKH, VEE-TLOOTL',
  'juHDaq majaH': 'JOOH-DAKH, MAH-JAH',
  "bIQong'a'": 'BEE-KHONG-AH',
  "HIq Datlhutlh'a'": 'HEEKH, DAH-TLOOTL-AH',
  "pa'Daq jIba'": 'PAH-DAKH, JEE-BAH',
  'bIQ wItlhutlh': 'BIKH, WEE-TLOOTL',

  // ============================================================================
  // MODULE 2: Opinions & Feelings
  // ============================================================================

  // Verbs
  "parHa'": 'PAR-HAH',
  par: 'PAR',
  neH: 'NEH',
  Qub: 'KHOOB',
  yaj: 'YAZH',
  ghoj: 'GHOJ',
  SaH: 'SAH',

  // Adjectives/States
  QaQ: 'KHAKH',
  qab: 'KHAB',
  "nI'": 'NEE',
  tIQ: 'TEEKH',
  "chu'": 'CHOO',
  Daj: 'DAJ',

  // Additional prefixes
  qa: 'KHAH',
  cho: 'CHOH',
  wI: 'WEE',

  // Suffixes
  qu: 'KHOO',
  "be'": 'BEH',

  // Common Module 2 sentences
  "Soj vIparHa'": 'SHOJ, VEE-PAR-HAH',
  QaQqu: 'KHAKH-KHOO',
  'bIQ vIneH': 'BIKH, VEE-NEH',
  jIyajbe: 'JEE-YAZH-BEH',
  'Daj tlhIngan Hol': 'DAJ, TLIN-GAHN, HHOL',
  "HIq DaparHa''a'": 'HEEKH, DAH-PAR-HAH-AH',
  'ghojqu puq': 'GHOJ-KHOO, POOKH',

  // ============================================================================
  // MODULE 3: Social Life
  // ============================================================================

  // Verbs
  jatlh: 'JATL',
  ghel: 'GHEL',
  jang: 'JANG',
  nob: 'NOB',
  Hev: 'HEV',
  ghom: 'GHOM',
  "tlho'": 'TLOW',

  // Nouns
  jup: 'JOOP',
  "be'": 'BEH',
  loD: 'LOHD',
  puq: 'POOKH',
  ghot: 'GHOT',
  pong: 'PONG',
  Hol: 'HHOL',
  QIn: 'KHEEN',

  // Possessive suffixes
  wIj: 'WEEJ',
  lIj: 'LEEJ',
  Daj: 'DAJ',

  // Fixed compounds
  tlhIngan: 'TLIN-GAHN',
  'tlhIngan Hol': 'TLIN-GAHN, HHOL',

  // Common Module 3 sentences
  'tlhIngan Hol vIjatlh': 'TLIN-GAHN, HHOL, VEE-JATL',
  qatlho: 'KHAH-TLOW',
  'nuq ponglIj': 'NOOKH, PONG-LEEJ',
  'juplIj vIghom': 'JOOP-LEEJ, VEE-GHOM',
  'ghoj puqwIj': 'GHOJ, POOKH-WEEJ',
  'Soj vInob': 'SHOJ, VEE-NOB',

  // ============================================================================
  // MODULE 4: Time & Questions
  // ============================================================================

  // Time words
  DaH: 'DAH',
  "wa'leS": 'WAH-LESH',
  "wa'Hu'": 'WAH-HOOH',
  tugh: 'TOOGH',
  not: 'NOT',
  reH: 'REH',
  rut: 'ROOT',

  // Question words
  nuq: 'NOOKH',
  "'Iv": 'EEV',
  nuqDaq: 'NOOKH-DAKH',
  "chay'": 'CHAY',
  qatlh: 'KHATL',

  // Verb suffixes
  pu: 'POO',
  taH: 'TAH',
  laH: 'LAH',

  // Common Module 4 sentences
  'DaH jISoptaH': 'DAH, JEE-SHOP-TAH',
  "wa'leS Qe'Daq majaH": 'WAH-LESH, KHEH-DAKH, MAH-JAH',
  "tlhIngan Hol DajatlhlaH'a'": 'TLIN-GAHN, HHOL, DAH-JATL-LAH-AH',
  "wa'Hu' HIq vItlhutlhpu'": 'WAH-HOOH, HEEKH, VEE-TLOOTL-POO',
  'nuqDaq juHlIj': 'NOOKH-DAKH, JOOH-LEEJ',
  'reH Soj QaQ vIneH': 'REH, SHOJ, KHAKH, VEE-NEH',
  "chay' jIghoj": 'CHAY, JEE-GHOJ',

  // ============================================================================
  // MODULE 5: Personality & Flow
  // ============================================================================

  // Verbs
  Hagh: 'HAHGH',
  bel: 'BEL',
  tIv: 'TEEV',
  boch: 'BOCH',
  belHa: 'BEL-HAH',
  Dach: 'DACH',

  // Fixed phrases
  nuqneH: 'NOOKH-NEH',
  "Qapla'": 'KHAP-LAH',
  HISlaH: 'HHEESH-LAH',
  "ghobe'": 'GHOH-BEH',
  "lu'": 'LOO',
  luq: 'LOOKH',
  "majQa'": 'MAJ-KHAH',
  bIlughbej: 'BEE-LOOKH-BEJ',
  jIQochbe: 'JEE-KHOCH-BEH',
  'nuq DaneH': 'NOOKH, DAH-NEH',
  "yIDoghQo'": 'YEE-DOGH-KHO',

  // Command prefix and negative imperative
  yI: 'YEE',
  Qo: 'KHO',

  // Common Module 5 sentences
  'Soj vItIv': 'SHOJ, VEE-TEEV',
  maHaghtaH: 'MAH-HAHGH-TAH',
  jIbeltaH: 'JEE-BEL-TAH',
  "bItIv'a'": 'BEE-TEEV-AH',
  "yIba'": 'YEE-BAH',
  "yIQongQo'": 'YEE-KHONG-KHO',
  yIjatlh: 'YEE-JATL',
  yIjang: 'YEE-JANG',

  // ============================================================================
  // ADDITIONAL COMBINATIONS
  // ============================================================================

  // Common agglutinated forms
  jIghoj: 'JEE-GHOJ',
  bIghoj: 'BEE-GHOJ',
  maghoj: 'MAH-GHOJ',
  vIyaj: 'VEE-YAZH',
  Dayaj: 'DAH-YAZH',
  choyaj: 'CHOH-YAZH',
  qayaj: 'KHAH-YAZH',

  // Commands
  yISop: 'YEE-SHOP',
  yItlhutlh: 'YEE-TLOOTL',
  yIjaH: 'YEE-JAH',
  yIghoS: 'YEE-GHOSH',

  // Questions
  "nuq 'oH": 'NOOKH, OH',
  'nuqDaq ghaH': 'NOOKH-DAKH, GHAH',
};

/**
 * Get phonetic for a Klingon word
 * Returns the word itself if not found (fallback)
 */
export function getPhonetic(klingonText: string): string {
  return phoneticDictionary[klingonText] || klingonText;
}
