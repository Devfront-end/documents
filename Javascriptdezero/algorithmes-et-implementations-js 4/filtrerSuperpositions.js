let creneaux = ["08:30-12:00", "09:30-10:00", "09:15-12:00"];

console.log("Avant filtrage : " + creneaux);
creneaux = filtrerSuperpositions(creneaux);
console.log("Après filtrage : " + creneaux);

function filtrerSuperpositions(creneaux) {
  const creneauxSansSuperpositions = [];

  // On récupère le nombre de créneaux à filtrer
  const nombreCreneaux = creneaux.length;

  // Le 1er créneau est forcément bon, on l'ajoute donc à notre liste
  creneauxSansSuperpositions.push(creneaux[0]);

  // On initialise l'horaire de fin de référence à celui du 1er créneau
  let horaireFinReference = lireHoraireFinDeCreneau(creneaux[0]);

  // On commence la boucle à partir de 1 car on veut comparer le 2ème
  // créneau avec le 1er
  for (let position = 1; position <= nombreCreneaux - 1; position++) {
    horaireFin = lireHoraireFinDeCreneau(creneaux[position]);

    // Si on n'est PAS dans le cas particulier
    if (dureeTrou(horaireFinReference, horaireFin) >= -1) {
      // On ajoute ce créneau à notre nouvelle liste
      creneauxSansSuperpositions.push(creneaux[position]);

      // On utilise ce créneau valide comme nouvelle 
      // référence pour la prochaine comparaison
      horaireFinReference = lireHoraireFinDeCreneau(creneaux[position]);
    }
  }

  // On retourne tous les créneaux valides filtrés
  return creneauxSansSuperpositions;
}

function lireHoraireFinDeCreneau(creneau) {
  return creneau.split('-')[1];
}

function dureeTrou(horaireDebut, horaireFin) {
  // Ex.: horaireDebut vaut "08:15"
  const heuresDebut = extraireHeures(horaireDebut);
  const minutesDebut = extraireMinutes(horaireDebut);

  // Ex.: horaireFin vaut "08:30"
  const heuresFin = extraireHeures(horaireFin);
  const minutesFin = extraireMinutes(horaireFin);

  // On calcule la durée du créneau en minutes
  let duree = (heuresFin - heuresDebut) * 60 + (minutesFin - minutesDebut);

  // On calcule la durée du trou à l'intérieur de ce créneau
  duree = duree - 2;

  // On ajuste la durée pour correspondre aux contraintes de l'énoncé
  return duree + 1;
}

function extraireHeures(horaire) {
  return Number(horaire.split(':')[0]);
}

function extraireMinutes(horaire) {
  return Number(horaire.split(':')[1]);
}