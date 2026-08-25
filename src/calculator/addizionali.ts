import { calcolaAScaglioni, type Scaglione } from './scaglioni'

// Fonte: docs/fonti/addizionali.md — in vigore dal 2022, nessuna modifica rilevata per il 2026
const SCAGLIONI_ADDIZIONALE_REGIONALE_LOMBARDIA: Scaglione[] = [
  { fino: 15_000, aliquota: 0.0123 },
  { fino: 28_000, aliquota: 0.0158 },
  { fino: 50_000, aliquota: 0.0172 },
  { fino: null, aliquota: 0.0173 },
]

export function calcolaAddizionaleRegionale(redditoImponibile: number): number {
  return calcolaAScaglioni(redditoImponibile, SCAGLIONI_ADDIZIONALE_REGIONALE_LOMBARDIA)
}

// Fonte: docs/fonti/addizionali.md — delibera Comune di Milano (aliquota 2025, confermata per il 2026)
const ALIQUOTA_ADDIZIONALE_COMUNALE_MILANO = 0.008
const SOGLIA_ESENZIONE_ADDIZIONALE_COMUNALE_MILANO = 23_000

export function calcolaAddizionaleComunale(redditoImponibile: number): number {
  if (redditoImponibile <= SOGLIA_ESENZIONE_ADDIZIONALE_COMUNALE_MILANO) {
    return 0
  }
  // Sopra soglia l'addizionale si applica sull'intero imponibile: non è una franchigia.
  return redditoImponibile * ALIQUOTA_ADDIZIONALE_COMUNALE_MILANO
}
