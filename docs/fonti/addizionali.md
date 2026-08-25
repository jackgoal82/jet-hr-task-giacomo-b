# Addizionali regionale e comunale

Calcolate entrambe sul **reddito imponibile IRPEF** (non sulla RAL). Valgono per l'ipotesi fissa del task: dipendente residente a Milano.

## Addizionale regionale — Lombardia

A scaglioni, in vigore dal 2022 (nessuna modifica per il 2026 rispetto alle fonti consultate):

| Reddito imponibile IRPEF | Aliquota |
|---|---|
| fino a 15.000 € | 1,23% |
| da 15.000,01 € a 28.000 € | 1,58% |
| da 28.000,01 € a 50.000 € | 1,72% |
| oltre 50.000 € | 1,73% |

Come per l'IRPEF nazionale, il calcolo è a scaglioni progressivi.

Fonti:
- [Tabella aliquote addizionale regionale — Agenzia delle Entrate (PDF)](https://www.agenziaentrate.gov.it/portale/documents/20143/3111282/Tabella+addizionali+regionali_PF.pdf)
- [Addizionale regionale Lombardia: netto 2026 — calcolonetto.it](https://www.calcolonetto.it/guide/regione/lombardia/)

## Addizionale comunale — Milano

- **Aliquota**: 0,80% flat (nessuna progressività a scaglioni).
- **Soglia di esenzione**: reddito imponibile IRPEF fino a 23.000 € → nessuna addizionale dovuta.
- **Sopra soglia**: l'addizionale si applica sull'**intero** reddito imponibile (non solo sulla parte eccedente la soglia — non è una franchigia, è un'esenzione "a scalino").

```
se reddito imponibile ≤ 23.000 €:  addizionale comunale = 0
altrimenti:                        addizionale comunale = reddito imponibile × 0,80%
```

Nota: al momento della ricerca il Comune di Milano non aveva ancora pubblicato una nuova delibera per il 2026, per cui resta in vigore l'aliquota e la soglia deliberate per il 2025.

## Semplificazione scelta: calcolo sull'anno corrente, non in acconto/saldo

In busta paga reale le addizionali regionale e comunale vengono trattenute in **acconto** durante l'anno in corso, calcolate sul reddito imponibile dell'**anno precedente**, con un conguaglio a saldo l'anno successivo. Il task chiede però una **proiezione annuale** ("quanto netto percepisce il dipendente" data una RAL), non una simulazione di cedolino mese per mese: per rispondere a questa domanda ha senso calcolare le addizionali direttamente sul reddito imponibile generato dalla RAL in input, come se l'anno fosse "a regime". È una scelta consapevole, non un'imprecisione: un vero cedolino di dicembre mostrerebbe importi diversi per via del meccanismo acconto/saldo.

Fonti:
- [Addizionale comunale IRPEF Milano (MI) 2026: aliquota 0,80% — TuttoCalcolo.it](https://www.tuttocalcolo.it/addizionale-irpef/lombardia/milano)
- [Qual è l'aliquota dell'addizionale comunale Irpef? — Comune di Milano](https://servizicrm.comune.milano.it/centro-supporto/KA-01934/Aliquota-addizionale-comunale-IRPEF)
- [Ci sono esenzioni per l'addizionale comunale Irpef? — Comune di Milano](https://servizicrm.comune.milano.it/centro-supporto/KA-01737/Esenzioni-addizionale-comunale-IRPEF)
