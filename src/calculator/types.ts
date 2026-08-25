export interface DettaglioTrattenute {
  contributiInps: number
  irpefLorda: number
  detrazioniLavoroDipendente: number
  cuneoFiscaleUlterioreDetrazione: number
  irpefNetta: number
  addizionaleRegionale: number
  addizionaleComunale: number
  cuneoFiscaleSommaNonImponibile: number
}

export type NumeroMensilita = 13 | 14

export interface RisultatoCalcolo {
  ral: number
  numeroMensilita: NumeroMensilita
  redditoImponibile: number
  dettaglio: DettaglioTrattenute
  totaleTrattenute: number
  nettoAnnuale: number
  /** Media semplice sui 12 mesi solari (netto annuale / 12), indipendente dal numero di mensilità. */
  nettoMensileMedio: number
  /** Importo di una mensilità ordinaria (netto annuale / numeroMensilita). */
  nettoMensilitaOrdinaria: number
  /** Importo del mese che include la mensilità aggiuntiva (es. dicembre con la tredicesima). */
  nettoMeseConMensilitaAggiuntiva: number
}
