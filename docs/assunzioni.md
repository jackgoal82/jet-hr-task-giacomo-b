# Assunzioni e semplificazioni

Elenco delle assunzioni date dal task, più quelle aggiuntive scelte per costruire un prototipo funzionante sul "caso semplice e standard" richiesto. Ogni voce riporta il **motivo** della scelta, così da poterle discutere in un'eventuale interview.

## Date dal task

- Dipendente **impiegato a tempo indeterminato** (no operaio/dirigente/quadro — CCNL e aliquote INPS possono variare).
- Dipendente **residente a Milano** (fissa addizionale regionale Lombardia + addizionale comunale Milano, niente da chiedere in input).
- **Nessuna agevolazione particolare** (no bonus giovani/impatriati, no welfare aziendale, no detrazioni per carichi di famiglia, no altri redditi oltre alla RAL).

## Scelte di dominio, emerse durante la ricerca

Dettagli e fonti in [fonti/](fonti/); qui il riepilogo delle scelte fatte quando le fonti non erano univoche o il caso era fuori dallo scope "standard".

- **Aliquota INPS dipendente flat al 9,19%** su tutta la RAL, senza applicare l'aliquota aggiuntiva IVS dell'1% oltre un certo massimale di retribuzione. *Motivo*: le fonti consultate non concordano sul valore esatto del massimale 2026, e riguarda comunque retribuzioni elevate, fuori dal caso standard. Dettagli in [fonti/inps.md](fonti/inps.md).
- **Non implementiamo il vecchio "trattamento integrativo" da 1.200 €/anno** (DL 3/2020, ex bonus Renzi) per redditi fino a 15.000 €, applicando invece solo il meccanismo strutturale 2025-2026 di taglio del cuneo fiscale (somma non imponibile fino a 20.000 € + ulteriore detrazione 20.000-40.000 €). *Motivo*: le fonti non sono concordi su come le due misure si combinino per la stessa fascia di reddito; il rischio è un doppio conteggio. L'effetto è una leggera sottostima del netto solo per RAL molto basse (< 15.000 €), un profilo comunque non rappresentativo del "caso standard". Dettagli in [fonti/trattamento-integrativo.md](fonti/trattamento-integrativo.md).
- **Reddito complessivo IRPEF = reddito imponibile da lavoro dipendente** (RAL al netto dei soli contributi INPS). Coerente con l'ipotesi "nessun altro reddito" data dal task: non ci sono altri redditi o oneri deducibili da sommare/sottrarre.

## Scelte di implementazione

- **Mensilità**: assumiamo che la RAL comprenda già la tredicesima (13 mensilità), lo standard più diffuso tra i CCNL italiani per impiegati del settore privato. Non modelliamo eventuale quattordicesima (presente solo in alcuni CCNL, es. terziario/commercio) né la sua eventuale assenza. *Motivo*: senza un CCNL specificato dal task, 13 mensilità è l'ipotesi più rappresentativa del caso standard.
- **Netto mensile come media**: il "netto mensile" mostrato è `netto annuale / 12`, una media semplice — non distinguiamo il mese in cui viene erogata la tredicesima (che nella realtà avrebbe un cedolino diverso dagli altri undici, con un dodicesimo nei mesi ordinari e due dodicesimi a dicembre). *Motivo*: il task chiede una "proiezione", non un cedolino mese per mese; la media è il modo più semplice e leggibile di rispondere alla domanda "quanto percepisco al mese". **Requisito UI**: l'etichetta nel calcolatore deve dire esplicitamente "netto mensile medio" (non solo "netto mensile"), per non generare ambiguità con chi si aspetta la logica 1/13-2/13 di un cedolino reale.
- **Nessun arrotondamento intermedio**: i calcoli intermedi (IRPEF, addizionali, detrazioni) sono tenuti con precisione decimale piena e arrotondati solo nei valori finali mostrati in pagina. *Motivo*: evitare che arrotondamenti a cascata (es. su base mensile poi moltiplicata per 12) producano un netto annuale leggermente diverso dalla somma dei netti mensili.
