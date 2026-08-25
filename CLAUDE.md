# CLAUDE.md — Task Jet HR: calcolatore RAL → netto

Riferimento persistente per qualsiasi sessione di lavoro su questo progetto. Leggere questo file all'inizio di ogni sessione prima di modificare codice o logica.

## Cos'è questo progetto

Prototipo per l'esercizio "Product Builder @ Jet HR": una pagina web dove l'utente inserisce una RAL (retribuzione annua lorda), clicca "calcola" e ottiene:

- netto annuale
- netto mensile
- il dettaglio di tutte le trattenute applicate al lordo (contributi INPS, IRPEF, addizionali, eventuale trattamento integrativo)

Il testo esatto e non modificato del task è in [docs/task.md](docs/task.md) — è la fonte di verità per lo scope. In caso di dubbio su cosa è richiesto, si fa riferimento a quel file, non a questo.

## Cosa NON è questo progetto

- Non deve coprire tutti i casi possibili del payroll italiano. Solo il caso semplice e standard descritto nel task.
- Non deve impressionare per la scelta del tool (no page-builder tipo Lovable). Deve dimostrare che chi l'ha costruito **capisce e controlla** la logica di calcolo.
- Non serve un backend: il calcolo è deterministico e puramente funzione della RAL in input, quindi tutta la logica sta lato client.

## Assunzioni fisse (date dal task)

- Impiegato, contratto a tempo indeterminato.
- Residente a Milano (addizionale regionale Lombardia + addizionale comunale Milano, non richieste come input).
- Nessuna agevolazione: no bonus giovani/impatriati, no welfare, no carichi di famiglia, no altri redditi.

Altre semplificazioni aggiuntive fatte in corso d'opera vanno annotate in [docs/assunzioni.md](docs/assunzioni.md), con relativa motivazione — verranno discusse in eventuale interview.

## Struttura del repository

```
docs/
  task.md          # testo originale del task, non modificare
  assunzioni.md     # assunzioni e semplificazioni, con motivazione
  fonti/            # note di ricerca per ogni voce di calcolo (IRPEF, INPS, addizionali...)
src/
  calculator/       # logica di calcolo pura (RAL -> netto), no DOM, no framework
  ui/                # rendering della pagina e gestione dell'input utente
tests/               # test della logica di calcolo (casi noti / da fonti ufficiali)
public/              # asset statici
```

Regola guida: la logica di calcolo in `src/calculator/` deve restare pura (funzioni input→output, senza dipendenze dal DOM), testabile e leggibile — è la parte che deve dimostrare controllo del dominio. La UI in `src/ui/` è solo presentazione.

## Stack tecnico

Da confermare/scaffoldare alla prima sessione di implementazione. Orientamento: Vite + TypeScript, senza framework UI pesante, per tenere il prototipo semplice, leggibile e facile da mostrare come "codice di cui ho il controllo" (coerente con l'avvertenza del task contro i page-builder). Se questa scelta cambia, aggiornare questa sezione.

## Processo di lavoro atteso

1. **Ricerca**: raccogliere le fonti ufficiali (Agenzia delle Entrate, INPS, normativa su addizionali regionali/comunali) e annotarle in `docs/fonti/` prima di scrivere codice — è una delle competenze valutate dal task.
2. **Assunzioni**: ogni semplificazione non esplicitamente data dal task va scritta in `docs/assunzioni.md` con la motivazione.
3. **Implementazione**: logica di calcolo in `src/calculator/`, con test in `tests/` che verificano almeno un caso noto (es. una RAL di riferimento con netto atteso calcolato a mano dalle fonti).
4. **UI**: form con input RAL, bottone "calcola", output di netto annuale/mensile e dettaglio trattenute.
5. **Verifica in browser**: prima di considerare il lavoro concluso, testare il flusso reale (input → calcola → output) in browser, non solo con i test automatici.

## Consegna

L'esercizio richiede di inviare un link al lavoro (repo GitHub, cartella Drive, o sito live — **non allegati**) in risposta all'email di invito al task, **senza modificarne l'oggetto**, con **task@jethr.com e matteo.vertemati@jethr.com in CC**. Deadline: **5 giorni** dalla ricezione del messaggio con queste istruzioni (ricevuto 2026-08-25 → scadenza indicativa 2026-08-30). Questo è un passo che l'utente esegue manualmente via email — non è compito di una sessione di Claude Code inviare l'email.
