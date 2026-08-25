import { calcolaAScaglioni, type Scaglione } from './scaglioni'

// Fonte: docs/fonti/irpef.md — Legge di Bilancio 2026 (L. 199/2025)
const SCAGLIONI_IRPEF_2026: Scaglione[] = [
  { fino: 28_000, aliquota: 0.23 },
  { fino: 50_000, aliquota: 0.33 },
  { fino: null, aliquota: 0.43 },
]

export function calcolaIrpefLorda(redditoImponibile: number): number {
  return calcolaAScaglioni(redditoImponibile, SCAGLIONI_IRPEF_2026)
}
