import { calcolaContributiInps } from './inps'
import { calcolaIrpefLorda } from './irpef'
import { calcolaDetrazioneLavoroDipendente } from './detrazioniLavoroDipendente'
import { calcolaSommaNonImponibileCuneoFiscale, calcolaUlterioreDetrazioneCuneoFiscale } from './cuneoFiscale'
import { calcolaAddizionaleRegionale, calcolaAddizionaleComunale } from './addizionali'
import type { RisultatoCalcolo } from './types'

/**
 * Proiezione RAL -> netto per il caso standard descritto in docs/metodologia.md:
 * impiegato a tempo indeterminato, residente a Milano, nessun altro reddito o agevolazione.
 */
export function calcolaProiezioneNetta(ral: number): RisultatoCalcolo {
  const contributiInps = calcolaContributiInps(ral)
  const redditoImponibile = ral - contributiInps

  const irpefLorda = calcolaIrpefLorda(redditoImponibile)
  const detrazioniLavoroDipendente = calcolaDetrazioneLavoroDipendente(redditoImponibile)
  const cuneoFiscaleUlterioreDetrazione = calcolaUlterioreDetrazioneCuneoFiscale(redditoImponibile)
  const irpefNetta = Math.max(irpefLorda - detrazioniLavoroDipendente - cuneoFiscaleUlterioreDetrazione, 0)

  const cuneoFiscaleSommaNonImponibile = calcolaSommaNonImponibileCuneoFiscale(redditoImponibile)

  const addizionaleRegionale = calcolaAddizionaleRegionale(redditoImponibile)
  const addizionaleComunale = calcolaAddizionaleComunale(redditoImponibile)

  const totaleTrattenute = contributiInps + irpefNetta + addizionaleRegionale + addizionaleComunale

  const nettoAnnuale = ral - totaleTrattenute + cuneoFiscaleSommaNonImponibile

  return {
    ral,
    redditoImponibile,
    dettaglio: {
      contributiInps,
      irpefLorda,
      detrazioniLavoroDipendente,
      cuneoFiscaleUlterioreDetrazione,
      irpefNetta,
      addizionaleRegionale,
      addizionaleComunale,
      cuneoFiscaleSommaNonImponibile,
    },
    totaleTrattenute,
    nettoAnnuale,
    nettoMensileMedio: nettoAnnuale / 12,
  }
}
