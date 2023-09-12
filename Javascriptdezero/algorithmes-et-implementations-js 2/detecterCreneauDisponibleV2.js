const input = ["3", "08:30-09:52", "10:45-14:47", "15:12-15:59"];

detecterCreneauDisponibleV2();

function detecterCreneauDisponibleV2() {
  const debutJournee = "07:59";
  const finJournee = "18:00";

  // Sur la première ligne du fichier d'entrée on lit le nombre de créneaux
  const nombreCreneaux = Number(input[0]);

  // Il faut N+1 tests
  const nombreDeTestsAFaire = nombreCreneaux + 1;

  // On connaît le nombre de tests à effectuer
  for (let position = 1; position <= nombreDeTestsAFaire; position++) {
    // Pour le 1er test on utilise debutJournee
    if (position === 1) {
      debut = debutJournee;
    } else {
      debut = lireHoraireFinDeCreneau(position - 1);
    }

    // Pour le dernier test, il faut utiliser finJournee !
    if (position === nombreDeTestsAFaire) {
      fin = finJournee;
    } else {
      fin = lireHoraireDebutDeCreneau(position);
    }

    if (dureeTrou(debut, fin) >= 60) {
      afficherReponse(debut);
      return;
    }
  }
}

function lireHoraireDebutDeCreneau(position) {
  return input[position].split('-')[0];
}

function lireHoraireFinDeCreneau(position) {
  return input[position].split('-')[1];
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
