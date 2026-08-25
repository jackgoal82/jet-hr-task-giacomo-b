// Fonte: docs/fonti/trattamento-integrativo.md — cuneo fiscale strutturale 2025-2026 (L. 207/2024, confermato da L. 199/2025)
// Base di calcolo: reddito di lavoro dipendente ex art. 51 TUIR, che nel nostro caso coincide con il
// reddito imponibile IRPEF (nessun altro reddito, per ipotesi del task).

/** Quota 1 — somma non imponibile per redditi fino a 20.000 €, si aggiunge direttamente al netto. */
export function calcolaSommaNonImponibileCuneoFiscale(redditoImponibile: number): number {
  if (redditoImponibile <= 8_500) {
    return redditoImponibile * 0.071
  }
  if (redditoImponibile <= 15_000) {
    return redditoImponibile * 0.053
  }
  if (redditoImponibile <= 20_000) {
    return redditoImponibile * 0.048
  }
  return 0
}

/** Quota 2 — ulteriore detrazione dall'imposta lorda per redditi tra 20.000,01 € e 40.000 €. */
export function calcolaUlterioreDetrazioneCuneoFiscale(redditoImponibile: number): number {
  if (redditoImponibile <= 20_000) {
    return 0
  }
  if (redditoImponibile <= 32_000) {
    return 1_000
  }
  if (redditoImponibile <= 40_000) {
    return (1_000 * (40_000 - redditoImponibile)) / 8_000
  }
  return 0
}
