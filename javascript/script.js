let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
let overWatchAPI = 'https://overfast-api.tekrop.fr/heroes'
const inputTag = document.getElementById('guess')
const characterTag = document.getElementById('characterImg')
const scoreTag = document.getElementById('score')
const winnerTag = document.querySelector('.notification')
const revealAnswersTag = document.querySelector('.reveal-answers')
const quizTitleTag = document.querySelector('.quiz-title')
let currentQuiz = 'league'
let leagueChampions = []
let pokemonList = []
let overwatchList = []
let counter = 0
let totalCharacter = 0;

let renderInfo = async () => {
  switch (currentQuiz) {
    case 'pokemon':
      await getPokemon()
      break
    case 'overwatch':
      await getOverwatch()
      break
    default:
      await getLeagueChampions()
  }
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
    championContainer.innerHTML = `<img class='champion' id='${item.toLowerCase()}' src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item}_0.jpg' alt='champion'><div class='champion-name'>${item}</div>`
    iconCardTag.innerHTML = `<img class='hidden-champion-icon' id='${item.toLowerCase()}-HiddenIcon' src='/assets/leagueIcon.jpg' alt='championHiddenIcon'>`

    characterTag.appendChild(championContainer)
    characterTag.appendChild(iconCardTag)
    leagueChampions.push(item.toLowerCase())
  })
  quizTitleTag.setAttribute('src', '/assets/leagueTitle.png')
  totalCharacter = leagueChampions.length
  scoreTag.innerText = `0/${totalCharacter}`
}

let getPokemon = async () => {
  let pokemonData = []
  for (let i = 1; i < 152; i++) {
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => { return res.data })
      .catch(err => { return err })
    pokemonData.push(response)
  }
  pokemonList = pokemonData
  pokemonData.forEach(item => {
    let iconCardTag = document.createElement('img')
    let pokemonContainer = document.createElement('img')
    pokemonContainer.id = `portrait-${item.name}`
    pokemonContainer.classList.add(`pokemon`)
    pokemonContainer.setAttribute('src', `${item.sprites.front_default}`)
    iconCardTag.id = `${item.name}-HiddenIcon`
    iconCardTag.classList.add(`hidden-pokemon-icon`)
    iconCardTag.setAttribute('src', `/assets/pokeball.png`)

    characterTag.appendChild(pokemonContainer)
    characterTag.appendChild(iconCardTag)
  })
  quizTitleTag.setAttribute('src', '/assets/pokemonTitle.png')
  totalCharacter = pokemonList.length
  scoreTag.innerText = `0/${totalCharacter}`
}

let getOverwatch = async () => {
  let response = await axios.get(overWatchAPI)
    .then(res => { return res.data })
    .catch(err => { return err })
  overwatchList = response
  overwatchList.forEach(item => {
    let iconCardTag = document.createElement('div')
    let championContainer = document.createElement('img')
    championContainer.id = `portrait-${item.name.toLowerCase()}`
    championContainer.classList.add(`overwatch`)
    championContainer.setAttribute('src', `${item.portrait}`)
    iconCardTag.classList.add('hidden-portrait')
    iconCardTag.id = `${item.name.toLowerCase()}-HiddenIcon`
    iconCardTag.innerHTML = `<img class="hidden-overwatch-icon" src="/assets/overwatch.png" alt="overwatchIcon">`

    characterTag.appendChild(championContainer)
    characterTag.appendChild(iconCardTag)
  })
  quizTitleTag.setAttribute('src', '/assets/overwatchTitle.png')
  totalCharacter = overwatchList.length
  scoreTag.innerText = `0/${totalCharacter}`
}

let userGuess = (event) => {
  let guess = event.target.value.toLowerCase()

  if (currentQuiz == 'league') {
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
  } else if (currentQuiz == 'pokemon') {
    pokemonList.forEach((item, index) => {
      let iconIdTag = document.getElementById(`${item.name}-HiddenIcon`)
      let portrait = document.getElementById(`portrait-${item.name}`)
      if (item.name === guess) {
        console.log(item)
        let audio = new Audio(item.cries.latest)
        audio.volume = 0.05
        audio.play()
        counter++
        pokemonList.splice(index, 1)
        inputTag.value = ''
        iconIdTag.style.display = 'none'
        portrait.style.display = 'inline'
        scoreTag.innerText = `${counter}/${totalCharacter}`
      }
    })
    if (counter === totalCharacter) {
      winnerTag.style.display = 'flex'
      inputTag.disabled = true
    }
  } else if (currentQuiz == 'overwatch') {
    overwatchList.forEach((item, index) => {
      let iconIdTag = document.getElementById(`${item.name.toLowerCase()}-HiddenIcon`)
      let portrait = document.getElementById(`portrait-${item.name.toLowerCase()}`)
      console.log(item)
      if (item.name.toLowerCase() === guess) {
        console.log(item)
        counter++
        overwatchList.splice(index, 1)
        inputTag.value = ''
        iconIdTag.style.display = 'none'
        portrait.style.display = 'inline'
        scoreTag.innerText = `${counter}/${totalCharacter}`
      }
    })
    if (counter === totalCharacter) {
      winnerTag.style.display = 'flex'
      inputTag.disabled = true
    }
  }
}

let giveUp = () => {
  inputTag.disabled = true
  if (currentQuiz == 'league') {
    leagueChampions.forEach(characterName => {
      let iconIdTag = document.getElementById(`${characterName}-HiddenIcon`)
      let portrait = document.getElementById(`portrait-${characterName}`)
      portrait.classList.add('error')

      iconIdTag.style.display = 'none'
      portrait.style.display = 'block'
    })
  } else if (currentQuiz == 'pokemon') {
    pokemonList.forEach(item => {
      let iconIdTag = document.getElementById(`${item.name}-HiddenIcon`)
      let portrait = document.getElementById(`portrait-${item.name}`)

      iconIdTag.style.display = 'none'
      portrait.style.display = 'block'
    })
  } else if (currentQuiz == 'overwatch') {
    overwatchList.forEach(item => {
      let iconIdTag = document.getElementById(`${item.name.toLowerCase()}-HiddenIcon`)
      let portrait = document.getElementById(`portrait-${item.name.toLowerCase()}`)

      iconIdTag.style.display = 'none'
      portrait.style.display = 'block'
    })
  }

}

let resetGame = () => {
  leagueChampions = []
  pokemonList = []
  counter = 0
  totalCharacter = 0

  characterTag.innerHTML = ''
  inputTag.disabled = false

  renderInfo()
}

let switchQuiz = (quiz) => {
  currentQuiz = quiz
  resetGame()
}


let clickOff = () => {
  winnerTag.style.display = 'none'
}


// Event Listeners and Initial Render of the Game
renderInfo()

inputTag.addEventListener('input', userGuess)
