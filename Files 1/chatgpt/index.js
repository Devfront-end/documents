// Sélectionner les éléments du DOM
const contactButton = document.querySelector('.contact-button')
const popup = document.querySelector('.popup')
const closeButton = document.querySelector('.close-button')
const loginForm = document.querySelector('.login-form')

// Gérer l'affichage de la pop-up
contactButton.addEventListener('click', () => {
  popup.style.display = 'block'
})

closeButton.addEventListener('click', () => {
  popup.style.display = 'none'
})

// Gérer la soumission du formulaire de connexion
loginForm.addEventListener('submit', (event) => {
  event.preventDefault()

  // Ici, vous pouvez ajouter la logique pour vérifier les informations de connexion

  // Réinitialiser le formulaire
  loginForm.reset()

  // Cacher la pop-up
  popup.style.display = 'none'
})
