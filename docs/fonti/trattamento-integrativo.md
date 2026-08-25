# Taglio del cuneo fiscale (ex bonus Renzi / trattamento integrativo)

Anno fiscale di riferimento: **2026**, disciplina strutturale introdotta dalla Legge di Bilancio 2025 (poi confermata dalla Legge di Bilancio 2026, L. 199/2025) al posto del precedente sgravio contributivo temporaneo.

Il beneficio riduce ulteriormente il netto trattenuto, sotto forma di una somma non imponibile o di una detrazione aggiuntiva, in funzione del reddito complessivo. Nel nostro caso il reddito complessivo coincide con il reddito imponibile IRPEF (nessun altro reddito, per ipotesi del task).

## Quota 1 — Somma integrativa non imponibile (redditi fino a 20.000 €)

Percentuale applicata al **reddito di lavoro dipendente ai sensi dell'art. 51 TUIR** (non all'imponibile contributivo INPS, che segue regole proprie), erogata come somma **non imponibile** (non tassata, si aggiunge direttamente al netto). Nel nostro caso, non essendoci altri redditi, il reddito di lavoro dipendente ex art. 51 TUIR coincide con il reddito imponibile IRPEF usato per tutti gli altri calcoli:

| Reddito | Percentuale |
|---|---|
| fino a 8.500 € | 7,1% |
| da 8.500,01 € a 15.000 € | 5,3% |
| da 15.000,01 € a 20.000 € | 4,8% |

## Quota 2 — Ulteriore detrazione dall'imposta lorda (redditi 20.000,01 € – 40.000 €)

```
se reddito ≤ 32.000 €:                    ulteriore detrazione = 1.000 €
se 32.000 € < reddito ≤ 40.000 €:         ulteriore detrazione = 1.000 × (40.000 − reddito) / 8.000
se reddito > 40.000 €:                    ulteriore detrazione = 0
```

Fonti:
- [Trattamento integrativo: come funziona e quali sono le novità del 2026 — factorial.it](https://factorial.it/blog/come-funziona-il-trattamento-integrativo/)
- [La nuova Legge di Bilancio 2026 (L. 199/2025) — trattamento integrativo e detrazioni IRPEF — GEPS](https://www.geps.it/la-nuova-legge-di-bilancio-2026-l-199-2025-trattamento-integrativo-e-detrazioni-irpef-per-lavoro-dipendente-disciplina-applicabile-nel-2026-11566/)
- [Trattamento Integrativo 2026: Chi Spetta, Calcolo e 730 — centrofiscale.com](https://centrofiscale.com/trattamento-integrativo-2026-chi-spetta-calcolo-730/)

## Semplificazione scelta: non implementiamo il "trattamento integrativo" storico da 1.200 €/anno (DL 3/2020) come voce separata

Il vecchio bonus Renzi/trattamento integrativo (1.200 €/anno fissi per redditi fino a 15.000 €, subordinato alla condizione che l'imposta lorda superi le detrazioni spettanti — "capienza") continua a esistere in normativa, ma le fonti consultate non sono concordi su come si combini esattamente con la nuova "somma integrativa" 2025-2026 descritta sopra per la stessa fascia di reddito (rischio di doppio conteggio della stessa agevolazione).

Per il prototipo, che per ipotesi del task modella un "caso semplice e standard" e non deve coprire ogni combinazione, **applichiamo solo il meccanismo strutturale 2025-2026 (Quota 1 + Quota 2 sopra)** e non sommiamo il vecchio trattamento integrativo da 1.200 €. Questo significa che il prototipo può leggermente **sottostimare** il netto per RAL molto basse (fino a ~15.000 €), che comunque non rappresentano il profilo "standard" atteso per un impiegato a tempo indeterminato. Semplificazione annotata anche in [assunzioni.md](../assunzioni.md), da discutere in eventuale interview.
