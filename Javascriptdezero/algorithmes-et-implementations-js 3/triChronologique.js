input = [
  "2",
  "10:45-14:47",
  "08:30-09:52",
];

const creneaux = input.slice(1);
// Le tableau est trié en place
creneaux.sort(fonctionDeTriChronologique);
console.log(creneaux);

function fonctionDeTriChronologique(creneau1, creneau2) {
  // creneau1 vaut par exemple "10:45-14:47"
  // creneau2 vaut par exemple "08:30-09:52"

  // On récupère juste l'horaire de début des créneaux
  horaireDebut1 = lireHoraireDebutDeCreneau(creneau1);
  horaireDebut2 = lireHoraireDebutDeCreneau(creneau2);

  heuresDebut1 = extraireHeures(horaireDebut1);
  heuresDebut2 = extraireHeures(horaireDebut2);

  if (heuresDebut1 === heuresDebut2) {
    // On compare les minutes
    minutesDebut1 = extraireMinutes(horaireDebut1);
    minutesDebut2 = extraireMinutes(horaireDebut2);

    // Utiliser une soustraction permet de renvoyer une 
    // valeur négative, positive ou nulle comme demandé
    return (minutesDebut1 - minutesDebut2);
  }

  // Utiliser une soustraction permet de renvoyer une
  // valeur négative, positive ou nulle comme demandé
  return (heuresDebut1 - heuresDebut2);
}

function lireHoraireDebutDeCreneau(creneau) {
  return creneau.split('-')[0];
}

function lireHoraireFinDeCreneau(creneau) {
  return creneau.split('-')[1];
}

function extraireHeures(horaire) {
  return +horaire.split(':')[0];
}

function extraireMinutes(horaire) {
  return +horaire.split(':')[1];
}
