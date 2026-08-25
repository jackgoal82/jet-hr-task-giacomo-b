// Fonte: docs/fonti/irpef.md — detrazioni art. 13 TUIR, formula piena anno (365 giorni lavorati)
const MAGGIORAZIONE_65_EURO_DA = 25_000
const MAGGIORAZIONE_65_EURO_A = 35_000

export function calcolaDetrazioneLavoroDipendente(redditoImponibile: number): number {
  let detrazione: number

  if (redditoImponibile <= 15_000) {
    detrazione = 1_955
  } else if (redditoImponibile <= 28_000) {
    detrazione = 1_910 + (1_190 * (28_000 - redditoImponibile)) / 13_000
  } else if (redditoImponibile <= 50_000) {
    detrazione = (1_910 * (50_000 - redditoImponibile)) / 22_000
  } else {
    detrazione = 0
  }

  if (redditoImponibile > MAGGIORAZIONE_65_EURO_DA && redditoImponibile <= MAGGIORAZIONE_65_EURO_A) {
    detrazione += 65
  }

  return detrazione
}
