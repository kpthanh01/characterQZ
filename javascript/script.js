let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
let pokemonListAPI = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
const inputTag = document.getElementById('guess')
const characterTag = document.getElementById('characterImg')
const scoreTag = document.getElementById('score')
const winnerTag = document.querySelector('.notification')
const revealAnswersTag = document.querySelector('.reveal-answers')
let currentQuiz = 'league'
let leagueChampions = []
let pokemonList = []
let counter = 0
let totalCharacter = 0;

let renderInfo = async () => {
  switch(currentQuiz) {
    case 'pokemon':
      await getPokemon()
      break

    default:
      await getLeagueChampions()
  }
  // await getLeagueChampions()
  // await getPokemon()
}

let getLeagueChampions = async () => {
  let response = await axios.get(riotAPI)
    .then(res => { return res.data.data })
    .catch(err => { return err })
  Object.keys(response).forEach(item => {
    let iconCardTag = document.createElement('div')
    let championContainer = document.createElement('div')
    championContainer.id = `portrait-${item.toLowerCase()}`
    championContainer.classList.add(`portrait`)
    championContainer.innerHTML = `<img class='champion' id='${item.toLowerCase()}' src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item}_0.jpg' alt 'champion'><div class='champion-name'>${item}</div>`
    iconCardTag.innerHTML = `<img class='hidden-champion-icon' id='${item.toLowerCase()}-HiddenIcon' src='/assets/leagueIcon.jpg' alt 'championHiddenIcon'>`

    characterTag.appendChild(championContainer)
    characterTag.appendChild(iconCardTag)
    leagueChampions.push(item.toLowerCase())
  })
  totalCharacter = leagueChampions.length
  scoreTag.innerText = `0/${leagueChampions.length}`
}

let getPokemon = async () => {

  let response = await axios.get(pokemonListAPI)
    .then(res => { return res.data.results })
    .catch(err => { return err })

  response.forEach(async (item, index) => {
    let pokemonData = {
      id: '',
      name: '',
      sprite: '',
    }
    let currentPokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
      .then(res => { return res.data })
      .catch(err => { return err })
    pokemonData.id = currentPokemonData.id
    pokemonData.name = item.name;
    pokemonData.sprite = currentPokemonData.sprites.front_default

    pokemonList.push(pokemonData)
  })
  // Object.keys(response).forEach(item => {
  //   let iconCardTag = document.createElement('div')
  //   let championContainer = document.createElement('div')
  //   championContainer.id = `portrait-${item.toLowerCase()}`
  //   championContainer.classList.add(`portrait`)
  //   championContainer.innerHTML = `<img class='champion' id='${item.toLowerCase()}' src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item}_0.jpg' alt 'champion'><div class='champion-name'>${item}</div>`
  //   iconCardTag.innerHTML = `<img class='hidden-champion-icon' id='${item.toLowerCase()}-HiddenIcon' src='/assets/leagueIcon.jpg' alt 'championHiddenIcon'>`

  //   characterTag.appendChild(championContainer)
  //   characterTag.appendChild(iconCardTag)
  //   leagueChampions.push(item.toLowerCase())
  // })
  // totalCharacter = leagueChampions.length
  // scoreTag.innerText = `0/${leagueChampions.length}`
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

renderInfo()
// window.addEventListener('load', () => {
//   getLeagueChampions()
//   getPokemon()
// })

inputTag.addEventListener('input', userGuess)

window.addEventListener("scroll", changeScroll, false)