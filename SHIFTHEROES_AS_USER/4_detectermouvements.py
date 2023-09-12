import requests
import time

headers = {
    'Authorization': 'Bearer c79e6698149daea0cfb2a358280ec4c9',
}

print("On attend qu'un nouveau planning soit disponible...")

# 1 - Récupérer la liste des plannings
vieille_liste_plannings = requests.get('https://shiftheroes.fr/api/v1/plannings?type=daily', headers=headers).json()
nouvelle_liste_plannings = requests.get('https://shiftheroes.fr/api/v1/plannings?type=daily', headers=headers).json()

# 2 -Attendre qu'un nouveau créneau soit disponible
while vieille_liste_plannings == nouvelle_liste_plannings:
    time.sleep(1)
    print(",", end="", flush=True)
    nouvelle_liste_plannings = requests.get('https://shiftheroes.fr/api/v1/plannings?type=daily', headers=headers).json()

print("Un nouveau planning est disponible !")

# 3 - Récupérer les créneaux du nouveau planning
planning_id = nouvelle_liste_plannings[0]['id']
liste_creneaux = requests.get('https://shiftheroes.fr/api/v1/plannings/' + planning_id + '/shifts', headers=headers).json()