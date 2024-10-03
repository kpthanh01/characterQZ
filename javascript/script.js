let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
let pokemonListAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
const inputTag = document.getElementById('guess')
const characterTag = document.getElementById('characterImg')
const scoreTag = document.getElementById('score')
const winnerTag = document.querySelector('.notification')
const revealAnswersTag = document.querySelector('.reveal-answers')
let currentQuiz = 'pokemon'
let leagueChampions = []
let pokemonList = []
let counter = 0
let totalCharacter = 0;

let getLeagueChampions = async () => {
  let response = await axios.get(riotAPI)
    .then(res => { return res.data.data })
    .catch(err => { return err })
  Object.keys(response).forEach(item => {
    let iconCardTag = document.createElement('div')
    let championContainer = document.createElement('div')
    championContainer.id = `portrait-${item.toLowerCase()}`
    championContainer.classList.add(`portrait`)
    championContainer.innerHTML = `<img class='champion' id='${item.toLowerCase()}' src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item}_0.jpg' alt='champion'><div class='champion-name'>${item}</div>`
    iconCardTag.innerHTML = `<img class='hidden-champion-icon' id='${item.toLowerCase()}-HiddenIcon' src='/assets/leagueIcon.jpg' alt='championHiddenIcon'>`

    characterTag.appendChild(championContainer)
    characterTag.appendChild(iconCardTag)
    leagueChampions.push(item.toLowerCase())
  })
  totalCharacter = leagueChampions.length
  scoreTag.innerText = `0/${totalCharacter}`
}

let getPokemon = async () => {
  let pokemonData = []
  for(let i=1; i<152; i++) {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(res => {return res.data})
    .catch(err => {return err})
    pokemonData.push(response)
  }
  pokemonList = pokemonData
  console.log(pokemonList)
  pokemonData.forEach(item => {
    console.log(item)
    let iconCardTag = document.createElement('div')
    let pokemonContainer = document.createElement('div')
    pokemonContainer.id = `portrait-${item.name}`
    pokemonContainer.classList.add(`pokemon-portrait`)
    pokemonContainer.innerHTML = `<img class='pokemon' id='${item.name}' src='${item.sprites.front_default}' alt='pokemon'>`
    iconCardTag.innerHTML = `<img class='hidden-pokemon-icon' id='${item.name}-HiddenIcon' src='/assets/pokeball.png' alt='pokemonball'>`

    characterTag.appendChild(pokemonContainer)
    characterTag.appendChild(iconCardTag)
  })
  totalCharacter = pokemonList.length
  scoreTag.innerText = `0/${totalCharacter}`
}

let userGuess = (event) => {
  let guess = event.target.value
  leagueChampions.forEach((characterName, index) => {
    let championIdTag = document.getElementById(characterName)
    let iconIdTag = document.getElementById(`${characterName}-HiddenIcon`)
    let portrait = document.getElementById(`portrait-${characterName}`)
    if (characterName === guess) {
      counter++
      leagueChampions.splice(index, 1)
      inputTag.value = ''
      iconIdTag.style.display = 'none'
      portrait.style.display = 'block'
      championIdTag.scrollIntoView({ behavior: "smooth", block: "end" })
      scoreTag.innerText = `${counter}/${totalCharacter}`
    }
  })
  if (counter === totalCharacter) {
    winnerTag.style.display = 'flex'
    inputTag.disabled = true
  }
}

let clickOff = () => {
  winnerTag.style.display = 'none'
}

let giveUp = () => {
  inputTag.disabled = true
  leagueChampions.forEach(characterName => {
    let iconIdTag = document.getElementById(`${characterName}-HiddenIcon`)
    let portrait = document.getElementById(`portrait-${characterName}`)
    let answers = document.createElement('p')
    portrait.classList.add('error')
    answers.innerText = characterName

    iconIdTag.style.display = 'none'
    portrait.style.display = 'block'
  })
}

let resetGame = () => {
  leagueChampions = []
  counter = 0
  totalCharacter = 0

  characterTag.innerHTML = ''
  inputTag.disabled = false
  // renderInfo()
  getLeagueChampions()
}

let changeScroll = () => {
  let inputContainer = document.querySelector('.pinned-container')
  this.scrollY > 100 ? inputContainer.classList.add('pinned-fixed') : inputContainer.classList.remove('pinned-fixed')
}

let switchQuiz = () => {

}

let renderInfo = async () => {
  switch (currentQuiz) {
    case "pokemon":
      await getPokemon()
      break

    default:
      await getLeagueChampions()
  }
}

renderInfo()

inputTag.addEventListener('input', userGuess)

window.addEventListener("scroll", changeScroll, false)