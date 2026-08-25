// Fonte e semplificazione scelta: docs/fonti/inps.md
const ALIQUOTA_INPS_DIPENDENTE = 0.0919

export function calcolaContributiInps(ral: number): number {
  return ral * ALIQUOTA_INPS_DIPENDENTE
}
