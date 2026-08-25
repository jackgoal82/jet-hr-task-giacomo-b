import { describe, expect, it } from 'vitest'
import { calcolaProiezioneNetta } from '../src/calculator'

describe('calcolaProiezioneNetta', () => {
  it('calcola correttamente una RAL di 30.000 € (verificato a mano dalle fonti in docs/fonti/)', () => {
    const r = calcolaProiezioneNetta(30_000)

    expect(r.dettaglio.contributiInps).toBeCloseTo(2757, 2)
    expect(r.redditoImponibile).toBeCloseTo(27_243, 2)
    expect(r.dettaglio.irpefLorda).toBeCloseTo(6265.89, 2)
    expect(r.dettaglio.detrazioniLavoroDipendente).toBeCloseTo(2044.3, 1)
    expect(r.dettaglio.cuneoFiscaleUlterioreDetrazione).toBe(1000)
    expect(r.dettaglio.addizionaleRegionale).toBeCloseTo(377.94, 1)
    expect(r.dettaglio.addizionaleComunale).toBeCloseTo(217.94, 1)
    expect(r.nettoAnnuale).toBeCloseTo(23_425.52, 1)
    expect(r.nettoMensileMedio).toBeCloseTo(r.nettoAnnuale / 12, 6)
  })

  it('applica la somma non imponibile del cuneo fiscale solo sotto i 20.000 € di reddito imponibile', () => {
    const bassa = calcolaProiezioneNetta(12_000)
    expect(bassa.dettaglio.cuneoFiscaleSommaNonImponibile).toBeGreaterThan(0)
    expect(bassa.dettaglio.cuneoFiscaleUlterioreDetrazione).toBe(0)

    const alta = calcolaProiezioneNetta(30_000)
    expect(alta.dettaglio.cuneoFiscaleSommaNonImponibile).toBe(0)
  })

  it('azzera detrazioni e cuneo fiscale oltre le rispettive soglie per RAL alte', () => {
    const r = calcolaProiezioneNetta(90_000)
    expect(r.dettaglio.detrazioniLavoroDipendente).toBe(0)
    expect(r.dettaglio.cuneoFiscaleUlterioreDetrazione).toBe(0)
    expect(r.dettaglio.cuneoFiscaleSommaNonImponibile).toBe(0)
  })

  it('il netto è sempre positivo e inferiore alla RAL, su un ampio range di redditi', () => {
    for (const ral of [8_000, 15_000, 20_000, 28_000, 32_000, 40_000, 50_000, 70_000, 120_000]) {
      const r = calcolaProiezioneNetta(ral)
      expect(r.nettoAnnuale).toBeGreaterThan(0)
      expect(r.nettoAnnuale).toBeLessThan(ral)
    }
  })
})
