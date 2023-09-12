const sun = document.querySelector('.sun')
const planets = document.querySelectorAll('.planet')

const radius = 200 // Radius of the planet orbits

const planetData = [
  { name: 'planet1', speed: 0.01 },
  { name: 'planet2', speed: 0.015 },
  { name: 'planet3', speed: 0.02 },
  { name: 'planet4', speed: 0.025 },
  { name: 'planet5', speed: 0.03 },
  { name: 'planet6', speed: 0.035 },
  { name: 'planet7', speed: 0.04 },
  { name: 'planet8', speed: 0.045 },
  { name: 'planet9', speed: 0.05 },
  { name: 'planet10', speed: 0.055 },
]

let angles = Array.from({ length: planets.length }, () => 0)

function positionPlanets() {
  const totalPlanets = planets.length
  const angleIncrement = (2 * Math.PI) / totalPlanets

  planets.forEach((planet, index) => {
    const planetAngle = angles[index] + index * angleIncrement
    const x = Math.cos(planetAngle) * radius
    const y = Math.sin(planetAngle) * radius

    planet.style.transform = `translate(${x}px, ${y}px)`
  })
}

function animatePlanets() {
  planetData.forEach((data, index) => {
    angles[index] += data.speed
  })

  positionPlanets()

  requestAnimationFrame(animatePlanets)
}

animatePlanets()
