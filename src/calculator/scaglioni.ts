export interface Scaglione {
  /** Limite superiore dello scaglione (incluso). `null` per l'ultimo scaglione, senza limite. */
  fino: number | null
  aliquota: number
}

/** Applica un sistema di aliquote a scaglioni progressivi (usato da IRPEF e addizionale regionale). */
export function calcolaAScaglioni(importo: number, scaglioni: Scaglione[]): number {
  let imposta = 0
  let sogliaPrecedente = 0

  for (const scaglione of scaglioni) {
    if (importo <= sogliaPrecedente) break

    const limiteSuperiore = scaglione.fino ?? Infinity
    const quotaNelloScaglione = Math.min(importo, limiteSuperiore) - sogliaPrecedente
    imposta += quotaNelloScaglione * scaglione.aliquota
    sogliaPrecedente = limiteSuperiore
  }

  return imposta
}
