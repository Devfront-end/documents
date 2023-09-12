function compterOccurencesSerie(serie, chiffre) {
    const regex = new RegExp(`(?<!\\d)${chiffre}(?!\\d)`, 'g');
    return (serie.match(regex) || []).length;
}

const serieChiffresTexte = `25  27  35  40  45  7  11
15  20  31  44  48  1  3
8  9  33  35  40  3  6
4  6  10  13  34  3  5
3  5  9  32  43  6  10
23  25  30  44  47  9  12
2  9  23  32  40  6  7
16  17  34  35  44  5  10`;

const serieChiffres = serieChiffresTexte.split(/\s+/).map(Number);

const chiffresRecherches = Array.from({ length: 50 }, (_, i) => i + 1);
const chiffresMultiples = [];
const chiffresQuatreOccurrences = [];

for (const chiffre of chiffresRecherches) {
    const nombreOccurrences = compterOccurencesSerie(serieChiffresTexte, chiffre);
    if (nombreOccurrences > 1) {
        chiffresMultiples.push({ chiffre, occurrences: nombreOccurrences });
    }
    if (nombreOccurrences === 4) {
        chiffresQuatreOccurrences.push(chiffre);
    }
}

const resultatsElement = document.getElementById("resultats");

for (const { chiffre, occurrences } of chiffresMultiples) {
    const resultatParChiffre = document.createElement("p");
    resultatParChiffre.textContent = `Le chiffre ${chiffre} apparaît ${occurrences} fois dans la série.`;
    resultatsElement.appendChild(resultatParChiffre);
}

const tableElement = document.createElement("table");
tableElement.style.borderCollapse = "collapse";

const chiffresPlusDeTroisOccurrences = chiffresRecherches.filter(chiffre => compterOccurencesSerie(serieChiffresTexte, chiffre) > 3);

for (const chiffre of chiffresPlusDeTroisOccurrences) {
    const nombreOccurrences = compterOccurencesSerie(serieChiffresTexte, chiffre);
    const rowElement = document.createElement("tr");
    const chiffreElement = document.createElement("td");
    chiffreElement.textContent = chiffre;
    chiffreElement.style.border = "1px solid black";
    rowElement.appendChild(chiffreElement);
    const occurrencesElement = document.createElement("td");
    occurrencesElement.textContent = nombreOccurrences;
    occurrencesElement.style.border = "1px solid white";
    occurrencesElement.style.backgroundColor = "blue";
    rowElement.appendChild(occurrencesElement);
    tableElement.appendChild(rowElement);
}

resultatsElement.appendChild(tableElement);


