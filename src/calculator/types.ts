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

export interface RisultatoCalcolo {
  ral: number
  redditoImponibile: number
  dettaglio: DettaglioTrattenute
  totaleTrattenute: number
  nettoAnnuale: number
  nettoMensileMedio: number
}
