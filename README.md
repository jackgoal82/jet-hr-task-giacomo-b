# Calcolatore RAL → Netto

Prototipo realizzato per l'esercizio "Product Builder @ Jet HR": una pagina web che, data una RAL (retribuzione annua lorda), calcola il netto annuale e mensile di un dipendente e mostra il dettaglio di tutte le trattenute (contributi INPS, IRPEF, detrazioni, cuneo fiscale, addizionali regionale e comunale).

**Sito live:** https://jackgoal82.github.io/jet-hr-task-giacomo-b/

## Il caso simulato

Impiegato assunto a tempo indeterminato, residente a Milano, senza altri redditi o agevolazioni particolari — le tre ipotesi date dal task. Ogni altra semplificazione fatta per costruire il prototipo (aliquote, soglie, scelte quando le fonti non erano concordi) è documentata e motivata, non lasciata implicita nel codice.

## Come capire la logica di calcolo

Non serve leggere il codice per capire come si arriva dal numero in input al numero in output:

- [`docs/metodologia.md`](docs/metodologia.md) — il percorso di calcolo raccontato in prosa, dalla RAL al netto, passo per passo
- [`docs/assunzioni.md`](docs/assunzioni.md) — ogni assunzione e semplificazione, con la motivazione
- [`docs/fonti/`](docs/fonti/) — le fonti consultate per IRPEF, INPS, addizionali e cuneo fiscale, con i link originali
- [`docs/task.md`](docs/task.md) — copia integrale del testo del task ricevuto

## Stack e struttura

Vite + TypeScript, senza framework UI — per restare semplice e per intero sotto controllo, coerentemente con l'indicazione del task di non affidarsi a tool che generano codice "scatola nera".

```
src/
  calculator/   # logica di calcolo pura (RAL -> netto), un file per voce fiscale
  ui/           # form, rendering dei risultati
tests/          # test della logica di calcolo, verificati anche a mano dalle fonti
docs/           # metodologia, assunzioni, fonti di ricerca
```

## Sviluppo locale

```bash
npm install
npm run dev      # sviluppo, con reload automatico
npm test         # test della logica di calcolo
npm run build    # build di produzione in dist/
```

Il deploy su GitHub Pages è automatico (GitHub Actions, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) a ogni push su `main`: build, test, pubblicazione.
