function extraireHeures(horaire) {
  return Number(horaire.split(':')[0]);
}

function extraireMinutes(horaire) {
  return Number(horaire.split(':')[1]);
}

function convertirMinEnHoraire(totalMinutes) {
  const heures = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${heures}:${minutes}`;
}

function afficherReponse(horaire) {
  const heures = extraireHeures(horaire);
  const minutes = extraireMinutes(horaire);

  // Astuce : on transforme tout en minutes pour faire 
  // les calculs sur les horaires
  let horaireDebutMin = heures * 60 + minutes;

  // On veut obtenir "09:53" car "09:52" fait partie du
  // créneau impossible
  horaireDebutMin = horaireDebutMin + 1;

  // On calcule l'horaire de fin, on veut "10:52"
  let horaireFinMin = horaireDebutMin + 59;

  // Il faudra reconvertir tout ça au format HH:MM
  const horaireDebut = convertirMinEnHoraire(horaireDebutMin);
  const horaireFin = convertirMinEnHoraire(horaireFinMin);

  // On affiche le résultat avec le bon format "09:53-
  // 10:52" grâce à une concaténation
  console.log(horaireDebut + '-' + horaireFin);
}
