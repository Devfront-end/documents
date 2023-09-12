const ampoule = document.getElementById('ampoule');

ampoule.addEventListener('mouseenter', () => {
  ampoule.classList.add('active');
});

ampoule.addEventListener('mouseleave', () => {
  ampoule.classList.remove('active');
});
