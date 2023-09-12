/**
 * Vous pouvez voir l'implémentation en JavaScript
 * de chaque ligne de l'algorithme.
 * 
 * On pourrait rendre plus compact ce code mais je 
 * le laisse comme ça pour une meilleure lisibilité 
 * pour les débutants.
 */
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

console.log(dureeTrou("08:15", "08:30"));