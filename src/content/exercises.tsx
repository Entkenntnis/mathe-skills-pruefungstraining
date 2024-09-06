import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/_first-test-deprecated/1-bruchteil-ermitteln-rechteck'
import { exercise2 } from './implementations/_first-test-deprecated/2-bruchteil-ermitteln-kreis'
import { exercise3 } from './implementations/_first-test-deprecated/3-bruchschreibweisen-gemischte-zahl'
import { exercise4 } from './implementations/_first-test-deprecated/4-bruchschreibweisen-unechter-bruch'
import { exercise5 } from './implementations/_first-test-deprecated/5-bruch-erweitern-auf-nenner'
import { exercise6 } from './implementations/_first-test-deprecated/6-bruch-kuerzen'
import { exercise7 } from './implementations/_first-test-deprecated/7-bruchschreibweisen-aus-dezimalzahl'
import { exercise8 } from './implementations/_first-test-deprecated/8-bruchschreibweisen-dezimalzahl'
import { exercise9 } from './implementations/_first-test-deprecated/9-bruchteil-faerben'
import { exercise10 } from './implementations/_first-test-deprecated/10-einheiten-umrechnen'
import { exercise11 } from './implementations/_first-test-deprecated/11-brueche-addieren-und-subtrahieren-gleichnamig'
import { exercise12 } from './implementations/_first-test-deprecated/12-brueche-addieren-und-subtrahieren'
import { exercise13 } from './implementations/_first-test-deprecated/13-brueche-addieren-und-subtrahieren-negative-zahlen'
import { exercise14 } from './implementations/_first-test-deprecated/14-brueche-addieren-und-subtrahieren-laengerer-term'
import { exercise15 } from './implementations/_first-test-deprecated/15-brueche-multiplizieren und dividieren'
import { exercise16 } from './implementations/_first-test-deprecated/16-brueche-multiplizieren und dividieren-negative-zahlen'
import { exercise17 } from './implementations/_first-test-deprecated/17-bruchterme-punkt-vor-strich'
import { exercise18 } from './implementations/_first-test-deprecated/18-sachaufgabe-mit-bruechen-fussballfans'
import { exercise19 } from './implementations/_first-test-deprecated/19-dezimalzahlen-addieren-und-subtrahieren'
import { exercise20 } from './implementations/_first-test-deprecated/20-dezimalzahlen-multiplizieren-im-kopf'
import { exercise23 } from './implementations/_first-test-deprecated/23-rechnen-mit-zehnerpotenzen'
import { exercise21 } from './implementations/_first-test-deprecated/21-dezimalzahlen-multiplizieren-schriftlich'
import { exercise22 } from './implementations/_first-test-deprecated/22-dezimalzahlen-dividieren-schriftlich'
import { exercise24 } from './implementations/_first-test-deprecated/24-rechengesetze-vorteilhaft-addieren'
import { exercise25 } from './implementations/_first-test-deprecated/25-distributivgesetz-vorteilhaft-rechnen'
import { exercise26 } from './implementations/_first-test-deprecated/26-raetsel-passendes-rechenzeichen'
import { exercise27 } from './implementations/_first-test-deprecated/27-rationale-zahlen-multiplizieren-geschickt-kuerzen'
import { exercise28 } from './implementations/_first-test-deprecated/28-potenzwert-berechnen'
import { exercise29 } from './implementations/_first-test-deprecated/29-potenzwert-berechnen-rationale-zahlen'
import { exercise32 } from './implementations/_first-test-deprecated/32-als-potenz-schreiben'
import { exercise33 } from './implementations/_first-test-deprecated/33-potenzwert-berechnen-term'
import { exercise51 } from './implementations/by-rs-gw-7/51-2023-1-rechnen-mit-rationalen-zahlen'
import { exercise55 } from './implementations/by-rs-gw-7/55-2023-2-anteil-bestimmen'
import { exercise56 } from './implementations/by-rs-gw-7/56-2023-3-prozentrechnen'
import { exercise57 } from './implementations/by-rs-gw-7/57-2023-4-rechnen-mit-laengeneinheiten'
import { exercise58 } from './implementations/by-rs-gw-7/58-2023-5-dezimalzahlen-als-faktoren'
import { exercise59 } from './implementations/by-rs-gw-7/59-2023-6-zahl-legen'
import { exercise60 } from './implementations/by-rs-gw-7/60-2023-7-winkel-zeichnen'
import { exercise61 } from './implementations/by-rs-gw-7/61-2023-8-diagramm-ablesen-und-ergaenzen'
import { exercise63 } from './implementations/by-rs-gw-7/63-2023-9-geradenkreuzung'
import { exercise64 } from './implementations/by-rs-gw-7/64-2023-10-bruch-ermitteln'
import { exercise65 } from './implementations/by-rs-gw-7/65-2023-11-wertetabelle-finden'
import { exercise66 } from './implementations/by-rs-gw-7/66-2023-12-gleichschenkliges-dreieck-zeichnen'
import { exercise67 } from './implementations/by-rs-gw-7/67-2023-13-gleichung-loesen'
import { exercise68 } from './implementations/by-rs-gw-7/68-2023-14-zahlen-runden'
import { exercise69 } from './implementations/by-rs-gw-7/69-2023-15-volumen-eines-quaders'
import { exercise70 } from './implementations/by-rs-gw-7/70-2023-16-schaetzen'
import { exercise71 } from './implementations/by-rs-gw-7/71-2023-17-achsenspiegelung'
import { exercise72 } from './implementations/by-rs-gw-7/72-2023-18-mias-freigehege'
import { exercise73 } from './implementations/by-rs-gw-7/73-2023-19-flaecheninhalt-raute'
import { exercise81 } from './implementations/by-rs-gw-9-z-i/81-2023-1-geraden-im-koordinatensystem'
import { exercise82 } from './implementations/by-rs-gw-9-z-i/82-2023-2-ausklammern'
import { exercise83 } from './implementations/by-rs-gw-9-z-i/83-2023-3-gleichwertige-terme'
import { exercise84 } from './implementations/by-rs-gw-9-z-i/84-2023-4-gleichung-loesen'
import { exercise85 } from './implementations/by-rs-gw-9-z-i/85-2023-5-raute-zeichnen'
import { exercise86 } from './implementations/by-rs-gw-9-z-i/86-2023-6-klammer-aufloesen'
import { exercise87 } from './implementations/by-rs-gw-9-z-i/87-2023-7-punkt-um-pfeil-verschieben'
import { exercise88 } from './implementations/by-rs-gw-9-z-i/88-2023-8-extremwert-eiens-quadratischen-terms'
import { exercise89 } from './implementations/by-rs-gw-9-z-i/89-2023-9-pias-freigehege'
import { exercise90 } from './implementations/by-rs-gw-9-z-i/90-2023-10-fehler-im-schraegbild'
import { exercise91 } from './implementations/by-rs-gw-9-z-i/91-2023-11-determinante'
import { exercise92 } from './implementations/by-rs-gw-9-z-i/92-2023-12-definitionsmenge-eines-bruchterms'
import { exercise93 } from './implementations/by-rs-gw-9-z-i/93-2023-13-bruchgleichung-loesen'
import { exercise94 } from './implementations/by-rs-gw-9-z-i/94-2023-14-thaleskreis'
import { exercise95 } from './implementations/by-rs-gw-9-z-i/95-2023-15-volumen-eines-quaders'
import { exercise96 } from './implementations/by-rs-gw-9-z-i/96-2023-16-preis-der-jeans'
import { exercise97 } from './implementations/by-rs-gw-9-z-i/97-2023-17-schaetzen'
import { exercise98 } from './implementations/by-rs-gw-9-z-i/98-2023-18-diagramm-ablesen'
import { exercise99 } from './implementations/by-rs-gw-9-z-i/99-2023-19-winkeljagd'
import { exercise100 } from './implementations/by-rs-gw-9-z-i/100-2023-20-relative-haeufigkeit-angeben'
import { exercise101 } from './implementations/by-rs-gw-9-z-ii-iii/101-2023-1-geraden-im-koordinatensystem'
import { exercise105 } from './implementations/by-rs-gw-9-z-ii-iii/105-2023-5-drachenviereck-zeichnen'
import { exercise106 } from './implementations/by-rs-gw-9-z-ii-iii/106-2023-6-klammer-aufloesen'
import { exercise111 } from './implementations/by-rs-gw-9-z-ii-iii/111-2023-11-geometrischen-ort-bestimmen'
import { exercise112 } from './implementations/by-rs-gw-9-z-ii-iii/112-2023-12-determinante'
import { exercise113 } from './implementations/by-rs-gw-9-z-ii-iii/113-2023-13-definitionsmenge-eines-bruchterms'
import { exercise115 } from './implementations/by-rs-gw-9-z-ii-iii/115-2023-15-thaleskreis'
import { exercise201 } from './implementations/NRW-MSA/201-2023-1-zahlen-ordnen'
import { exercise202 } from './implementations/NRW-MSA/202-2023-2-volumen-berechnen'
import { exercise204 } from './implementations/NRW-MSA/204-2023-4-Parabel-im-ks'
import { exercise203 } from './implementations/NRW-MSA/203-2023-3-lineares-gleichungssystem'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
  2: exercise2,
  3: exercise3,
  4: exercise4,
  5: exercise5,
  6: exercise6,
  7: exercise7,
  8: exercise8,
  9: exercise9,
  10: exercise10,
  11: exercise11,
  12: exercise12,
  13: exercise13,
  14: exercise14,
  15: exercise15,
  16: exercise16,
  17: exercise17,
  18: exercise18,
  19: exercise19,
  20: exercise20,
  21: exercise21,
  22: exercise22,
  23: exercise23,
  24: exercise24,
  25: exercise25,
  26: exercise26,
  27: exercise27,
  28: exercise28,
  29: exercise29,
  32: exercise32,
  33: exercise33,
  // ----
  51: exercise51,
  55: exercise55,
  56: exercise56,
  57: exercise57,
  58: exercise58,
  59: exercise59,
  60: exercise60,
  61: exercise61,
  63: exercise63,
  64: exercise64,
  65: exercise65,
  66: exercise66,
  67: exercise67,
  68: exercise68,
  69: exercise69,
  70: exercise70,
  71: exercise71,
  72: exercise72,
  73: exercise73,

  81: exercise81,
  82: exercise82,
  83: exercise83,
  84: exercise84,
  85: exercise85,
  86: exercise86,
  87: exercise87,
  88: exercise88,
  89: exercise89,
  90: exercise90,
  91: exercise91,
  92: exercise92,
  93: exercise93,
  94: exercise94,
  95: exercise95,
  96: exercise96,
  97: exercise97,
  98: exercise98,
  99: exercise99,
  100: exercise100,

  101: exercise101,
  102: { ...exercise82, constraint: ({ data }) => !data.withNeg },
  103: {
    ...exercise83,
    constraint: ({ data, rng }) => {
      if (data.correct === 4) return false
      data.randomOrder = rng.shuffleArray([0, 1, 2, 3])
      return true
    },
  },
  104: {
    ...exercise84,
    constraint(props) {
      if (props.data.a < 0) return false
      return exercise84.constraint!(props)
    },
  },
  105: exercise105,
  106: exercise106,
  111: exercise111,
  112: exercise112,
  113: exercise113,
  114: {
    ...exercise93,
    title: exercise93.title.replace('13)', '14)'),
    constraint(props) {
      if (props.data.a > 1) return false
      return exercise93.constraint!(props)
    },
  },
  115: exercise115,
  116: { ...exercise95, title: exercise95.title.replace('15)', '16)') },
  117: { ...exercise96, title: exercise96.title.replace('16)', '17)') },
  118: { ...exercise97, title: exercise97.title.replace('17)', '18)') },
  119: { ...exercise98, title: exercise98.title.replace('18)', '19)') },
  120: { ...exercise99, title: exercise99.title.replace('19)', '20)') },
  121: { ...exercise100, title: exercise100.title.replace('20)', '21)') },
  201: exercise201,
  202: exercise202,
  203: exercise203,
  204: exercise204,
}

// symbols:

// ℚ
// ·
// −
// ×
// α β γ δ
// ∠ ∡
// ⊕
// ≙ ≠ ⇒ ∈ ∉
