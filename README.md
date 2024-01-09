# CyberMyth


## Bauen und Erweitern

### Bauen

Die Anwendung wurde mit dem Node Package Manager (npm) gebaut. Alle Abhängigkeiten, die zum Bauen verwendet werden können lokal (im ordner `./node_modules/`) mit folgendem Befehl installiert werden.

```
npm install
```

Anschließend kann das Projekt mit dem Folgenden Befehl gebaut werden.

```
npm run build
```

Das ganze erstellt einen ordner `dist`, der alle Frontend Dateien enthält, die benötigt werden.

### Erweitern

Im Rahmen dieser Aufgabe habe ich mich zum ersten mal näher mit TypeScript und Webpack auseinandergesetzt, um das "Bauen" der Anwendung möglichst einfach zu gestalten.

Der Quellcode der App liegt in `src` und ist TypeScript. Die Fragen liegen im text format in `src/questions/*`. Custom loader in `utils/*Parser` sorgen dafür, dass der Inhalt des ordner `src/questions` automatisch interpretiert und in das Projekt eingebaut wird.

`enabled.ls` ist eine Liste and Fragepackete, die eingebaut werden solln. Dateien, die auf `.qs` enden bilden die Fragepack. Die grobe Struktur von Fragen sollte recht selbsterklärend sein und ist in `example2.qs` dargestellt. `example.qs` enthält einige Beispiel Fragen, die mit zusätzlichen Packeten erweitert werden können.