const input = ["3", "1 10:45-14:47", "1 12:12-13:59", "1 08:30-11:52"];

detecterCreneauDisponibleV5();

function detecterCreneauDisponibleV5() {
  const debutJournee = "07:59";
  const finJournee = "18:00";

  const creneauxSemaine = [
    [], // lundi
    [], // mardi
    [], // mercredi
    [], // jeudi
    [], // vendredi
  ];

  // On récupère juste les créneaux pour les trier
  // Soit les cases 1 à nombreCreneaux du tableau input
  const nombreCreneaux = Number(input[0]);

  // On lit les créneaux à partir de la 2ème ligne d'input (indice 1)
  for (let position = 1; position <= nombreCreneaux; position++) {
    // On extrait le numéro du jour qu'on utilisera comme indice
    const numeroDuJour = extraireNumeroJour(input[position]);

    // On extrait le créneau
    const creneau = extraireCreneau(input[position]);

    // On n'oublie pas de soustraire 1 au numéro du jour pour obtenir
    // le bon indice
    const indiceDuJour = numeroDuJour - 1;

    // On ajoute ce créneau dans la bonne case correspondant à son jour
    creneauxSemaine[indiceDuJour].push(creneau);
  }

  // On lit les créneaux de chaque jour dans notre tableau creneauxSemaine
  for (let indiceDuJour = 0; indiceDuJour <= creneauxSemaine.length - 1; indiceDuJour++) {
    let creneaux = creneauxSemaine[indiceDuJour];

    // On ne traite que les jours avec des créneaux
    if (creneaux.length > 0) {
      // On trie par ordre chronologique
      creneaux.sort(fonctionDeTriChronologique);

      // On filtre les superpositions
      creneaux = filtrerSuperpositions(creneaux);

      // Il faut calculer les N+1 tests après le filtrage
      nombreDeTestsAFaire = creneaux.length + 1;

      // On connaît le nombre de tests à effectuer
      for (let position = 0; position <= nombreDeTestsAFaire - 1; position++) {
        // Pour le 1er test on utilise debutJournee
        if (position === 0) {
          debut = debutJournee;
        } else {
          debut = lireHoraireFinDeCreneau(creneaux[position - 1]);
        }

        // Pour le dernier test, il faut utiliser finJournee !
        if (position === nombreDeTestsAFaire - 1) {
          fin = finJournee;
        } else {
          fin = lireHoraireDebutDeCreneau(creneaux[position]);
        }

        if (dureeTrou(debut, fin) >= 60) {
          afficherReponse(indiceDuJour, debut);
          return;
        }
      }
    }
  }
}

function filtrerSuperpositions(creneaux) {
  const creneauxSansSuperpositions = [];

  // On récupère le nombre de créneaux à filtrer
  const nombreCreneaux = creneaux.length;

  // Le 1er créneau est forcément bon, on l'ajoute donc à notre liste
  creneauxSansSuperpositions.push(creneaux[0]);

  // On initialise l'horaire de fin de référence à celui du 1er créneau
  let horaireFinReference = lireHoraireFinDeCreneau(creneaux[0]);

  // On commence la boucle à partir de 1 car on veut comparer le 2ème créneau avec le 1er
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

function fonctionDeTriChronologique(creneau1, creneau2) {
  // creneau1 vaut par exemple "10:45-14:47"
  // creneau2 vaut par exemple "08:30-09:52"

  // On récupère juste l'horaire de début des créneaux
  const horaireDebut1 = lireHoraireDebutDeCreneau(creneau1);
  const horaireDebut2 = lireHoraireDebutDeCreneau(creneau2);

  const heuresDebut1 = extraireHeures(horaireDebut1);
  const heuresDebut2 = extraireHeures(horaireDebut2);

  if (heuresDebut1 === heuresDebut2) {
    // On compare les minutes
    const minutesDebut1 = extraireMinutes(horaireDebut1);
    const minutesDebut2 = extraireMinutes(horaireDebut2);

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
  return +horaire.split(':')[0];
}

function extraireMinutes(horaire) {
  return +horaire.split(':')[1];
}

function convertirMinEnHoraire(totalMinutes) {
  const heures = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${heures}:${minutes}`;
}

function extraireNumeroJour(ligne) {
  return ligne.split(' ')[0];
}

function extraireCreneau(ligne) {
  return ligne.split(' ')[1];
}

function afficherReponse(indiceDuJour, horaire) {
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

  // Le numéro du jour est l'indice du jour + 1
  const numeroDuJour = indiceDuJour + 1;

  // On affiche le résultat avec le bon format "09:53-
  // 10:52" grâce à une concaténation
  console.log(numeroDuJour + ' ' + horaireDebut + '-' + horaireFin);
}
