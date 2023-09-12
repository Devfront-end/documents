const button = document.querySelector('.toolbox-button')
const content = document.querySelector('.toolbox-content')

button.addEventListener('click', () => {
  content.classList.toggle('show')
})
