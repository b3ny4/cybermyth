# CyberMyth


## Bauen und Erweitern

## Dependencies (Bauen)

Die Anwendung wurde mit dem Node Package Manager (npm) gebaut. Alle Abhängigkeiten, die zum Bauen verwendet werden können lokal (im ordner `./node_modules/`) mit folgendem Befehl installiert werden.

```
npm install
```

Anschließend kann das Projekt mit dem Folgenden Befehl gebaut werden.

```
npm run build
```

Das ganze erstellt einen ordner `dist`, der alle Frontend Dateien enthält, die benötigt werden.

## Struktur (Erweitern)

Im Rahmen dieser Aufgabe habe ich mich zum ersten mal näher mit TypeScript und Webpack auseinandergesetzt, um das "Bauen" der Anwendung möglichst einfach zu gestalten.

Der Quellcode der App liegt in `src` und ist TypeScript. Die Fragen liegen im text format in `src/questions`.