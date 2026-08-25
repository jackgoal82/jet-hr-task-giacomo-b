import './style.css'
import { calcolaProiezioneNetta } from '../calculator'
import type { NumeroMensilita, RisultatoCalcolo } from '../calculator/types'

const form = document.querySelector<HTMLFormElement>('#calculator-form')!
const ralInput = document.querySelector<HTMLInputElement>('#ral-input')!
const risultato = document.querySelector<HTMLDivElement>('#risultato')!

// Il toggle mensilità vive dentro l'HTML generato in renderRisultato (viene
// quindi ricreato a ogni render), perciò lo stato selezionato si tiene qui
// e gli eventi si intercettano per delega su #risultato.
let numeroMensilitaSelezionata: NumeroMensilita = 13

const formatoEuro = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  // Senza questa opzione l'ICU di alcuni runtime omette il separatore delle
  // migliaia sotto i 10.000 (es. "3860 €" invece di "3.860 €"). Il cast
  // aggira un bug delle definizioni di tipo di TypeScript: lib.es2020.bigint.d.ts
  // ridichiara useGrouping come solo booleano, in conflitto con l'unione più
  // ampia già presente in lib.es5.d.ts che include i valori stringa validi a runtime.
  useGrouping: 'always' as unknown as boolean,
})

function pulsanteMensilita(valore: NumeroMensilita, selezionata: NumeroMensilita): string {
  const isSelezionata = valore === selezionata
  return `<button type="button" class="mensilita-opzione${isSelezionata ? ' is-selezionata' : ''}" data-mensilita="${valore}" aria-pressed="${isSelezionata}">${valore} mensilità</button>`
}

function renderRisultato(r: RisultatoCalcolo): void {
  const netta = r.dettaglio

  risultato.innerHTML = `
    <div class="risultato-principale">
      <div class="risultato-box">
        <span class="risultato-label">Netto annuale</span>
        <span class="risultato-valore">${formatoEuro.format(r.nettoAnnuale)}</span>
      </div>
      <div class="risultato-box">
        <span class="risultato-label">Netto mensile medio</span>
        <span class="risultato-valore">${formatoEuro.format(r.nettoMensileMedio)}</span>
      </div>
    </div>

    <div class="mensilita-box">
      <div class="mensilita-toggle" role="group" aria-label="Numero di mensilità">
        ${pulsanteMensilita(13, r.numeroMensilita)}
        ${pulsanteMensilita(14, r.numeroMensilita)}
      </div>
      <p class="risultato-nota">
        Con ${r.numeroMensilita} mensilità: una mensilità ordinaria netta è
        <strong>${formatoEuro.format(r.nettoMensilitaOrdinaria)}</strong>, il mese con la mensilità aggiuntiva
        (es. dicembre) è <strong>${formatoEuro.format(r.nettoMeseConMensilitaAggiuntiva)}</strong>.
      </p>
    </div>

    <table class="dettaglio-tabella">
      <caption>Dettaglio trattenute annue (RAL: ${formatoEuro.format(r.ral)})</caption>
      <tbody>
        <tr><td>Contributi INPS (9,19%)</td><td>${formatoEuro.format(netta.contributiInps)}</td></tr>
        <tr><td>Reddito imponibile IRPEF</td><td>${formatoEuro.format(r.redditoImponibile)}</td></tr>
        <tr><td>IRPEF lorda</td><td>${formatoEuro.format(netta.irpefLorda)}</td></tr>
        <tr><td>Detrazioni lavoro dipendente</td><td>- ${formatoEuro.format(netta.detrazioniLavoroDipendente)}</td></tr>
        <tr><td>Ulteriore detrazione cuneo fiscale</td><td>- ${formatoEuro.format(netta.cuneoFiscaleUlterioreDetrazione)}</td></tr>
        <tr class="riga-subtotale"><td>IRPEF netta</td><td>${formatoEuro.format(netta.irpefNetta)}</td></tr>
        <tr><td>Addizionale regionale (Lombardia)</td><td>${formatoEuro.format(netta.addizionaleRegionale)}</td></tr>
        <tr><td>Addizionale comunale (Milano)</td><td>${formatoEuro.format(netta.addizionaleComunale)}</td></tr>
        <tr><td>Somma non imponibile cuneo fiscale</td><td>+ ${formatoEuro.format(netta.cuneoFiscaleSommaNonImponibile)}</td></tr>
        <tr class="riga-totale"><td>Totale trattenute nette</td><td>${formatoEuro.format(r.ral - r.nettoAnnuale)}</td></tr>
      </tbody>
    </table>
  `
  risultato.hidden = false
}

function renderErrore(messaggio: string): void {
  risultato.innerHTML = `<p class="errore">${messaggio}</p>`
  risultato.hidden = false
}

function calcolaERenderizza(): void {
  const ral = Number(ralInput.value)
  if (!Number.isFinite(ral) || ral <= 0) {
    renderErrore('Inserisci una RAL valida, maggiore di zero.')
    return
  }

  renderRisultato(calcolaProiezioneNetta(ral, numeroMensilitaSelezionata))
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault()
  calcolaERenderizza()
})

// Il toggle mensilità compare solo dopo il primo calcolo (è dentro #risultato),
// quindi gli eventi si ascoltano per delega sul contenitore, stabile nel DOM.
risultato.addEventListener('click', (evento) => {
  const bottone = (evento.target as HTMLElement).closest<HTMLButtonElement>('.mensilita-opzione')
  if (!bottone) return

  const valore = Number(bottone.dataset.mensilita) as NumeroMensilita
  if (valore === numeroMensilitaSelezionata) return

  numeroMensilitaSelezionata = valore
  calcolaERenderizza()
})
