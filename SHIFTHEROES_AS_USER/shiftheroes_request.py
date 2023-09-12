
import requests
import time

# Set your API authorization header
headers = {
    'Authorization': 'Bearer cf6cd6a6b86b55e1f20f0b57495b9562',
}

# Define the maximum number of reservations you want to make
max_reservations = 14

# Define the maximum waiting time in seconds
max_waiting_time = 10

# Record the start time
start_time = time.time()

while True:
    # Check if the maximum waiting time has been reached
    if time.time() - start_time > max_waiting_time:
        print("Timeout: Maximum waiting time reached.")
        break

    # Make a request to check for a new planning
    nouvelle_liste = requests.get('https://shiftheroes.fr/api/v1/plannings?type=daily', headers=headers).json()

    if 'id' in nouvelle_liste[0]:
        print("Un nouveau planning est disponible!")
        print("Planning ID:", nouvelle_liste[0]['id'])

        # Fetch the time slots for the new planning
        liste_creneaux = requests.get('https://shiftheroes.fr/api/v1/plannings/' + nouvelle_liste[0]["id"] + '/shifts', headers=headers).json()

        # Iterate through the time slots and make reservations
        reservations_made = 0

        for creneau in liste_creneaux:
            if reservations_made >= max_reservations:
                break  # Stop making reservations once the limit is reached

            try:
                response = requests.post('https://shiftheroes.fr/api/v1/plannings/' + nouvelle_liste[0]['id'] + '/shifts/' + creneau["id"] + '/reservations', headers=headers)
                response.raise_for_status()  # Raise an exception if the response status code is not in the 2xx range
                print("Réservation effectuée pour le créneau ID:", creneau["id"])
                reservations_made += 1
            except requests.exceptions.RequestException as e:
                print("Erreur lors de la réservation pour le créneau ID:", creneau["id"], e)

        # Check if the required number of reservations has been made
        if reservations_made >= max_reservations:
            print("Réservation effectuée.")
            break

    # Wait for a short interval before checking again
    time.sleep(1)

print("Done.")