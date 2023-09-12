const input = [
  "4",
  "1 11:30-12:00",
  "2 10:45-13:30",
  "2 09:15-15:00",
  "1 09:30-10:00",
];

const creneauxSemaine = [
  [], // lundi
  [], // mardi
  [], // mercredi
  [], // jeudi
  [], // vendredi
];

// Sur la première ligne du fichier d'entrée on lit le nombre de créneaux
const nombreCreneaux = input[0];

// On lit les créneaux à partir de la 2ème ligne d'input (indice 1)
for (let position = 1; position <= nombreCreneaux; position++) {
  // On extrait le numéro du jour qu'on utilisera comme indice
  numeroDuJour = extraireNumeroJour(input[position]);

  // On extrait le créneau
  creneau = extraireCreneau(input[position]);

  // On n'oublie pas de soustraire 1 au numéro du jour pour obtenir
  // le bon indice
  const indiceDuJour = numeroDuJour - 1

  // On ajoute ce créneau dans la bonne case correspondant à son jour
  creneauxSemaine[indiceDuJour].push(creneau);
}

console.log(creneauxSemaine);

function extraireNumeroJour(ligne) {
  return +ligne.split(' ')[0];
}

function extraireCreneau(ligne) {
  return ligne.split(' ')[1];
}