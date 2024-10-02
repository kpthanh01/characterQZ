let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
let riotSquareAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${item}.png'
const inputTag = document.getElementById('guess')
const characterTag = document.getElementById('characterImg')
const scoreTag = document.getElementById('score')
const winnerTag = document.querySelector('.notification')
const revealAnswersTag = document.querySelector('.reveal-answers')
let leagueChampions = []
let counter = 0
let totalCharacter = 0;

let renderInfo = async () => {
  await getLeagueChampions()
}

let getLeagueChampions = async () => {
  let response = await axios.get(riotAPI)
    .then(res => { return res.data.data })
    .catch(err => { return err })
  Object.keys(response).forEach(item => {
    let iconCardTag = document.createElement('img')
    let championContainer = document.createElement('div')
    championContainer.id = `portrait-${item.toLowerCase()}`
    championContainer.innerHTML = `<img class='champion' id='${item.toLowerCase()}' src='https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item}_0.jpg' alt 'champion'>`

    iconCardTag.setAttribute('src', '/assets/leagueIcon.jpg')
    iconCardTag.setAttribute('alt', 'championHiddenIcon')
    iconCardTag.className = 'hidden-champion-icon'
    iconCardTag.id = `${item.toLowerCase()}-HiddenIcon`
    characterTag.appendChild(championContainer)
    characterTag.appendChild(iconCardTag)
    leagueChampions.push(item.toLowerCase())
  })
  totalCharacter = leagueChampions.length
  scoreTag.innerText = `0/${leagueChampions.length}`
}

let userGuess = (event) => {
  let guess = event.target.value
  leagueChampions.forEach((characterName, index) => {
    let championIdTag = document.getElementById(characterName)
    let iconIdTag = document.getElementById(`${characterName}-HiddenIcon`)
    if (characterName === guess) {
      counter++
      leagueChampions.splice(index, 1)
      inputTag.value = ''
      iconIdTag.style.display = 'none'
      championIdTag.style.display = 'block'
      scoreTag.innerText = `${counter}/${totalCharacter}`
    }
  })
  if (counter === totalCharacter) {
    winnerTag.style.display = 'block'
  }
}

let clickOff = () => {
  winnerTag.style.display = 'none'
}

let giveUp = () => {
  inputTag.disabled = true
  leagueChampions.forEach(characterName => {
    let championIdTag = document.getElementById(characterName)
    let iconIdTag = document.getElementById(`${characterName}-HiddenIcon`)
    let portrait = document.getElementById(`portrait-${characterName}`)
    let answers = document.createElement('p')
    console.log(portrait)
    portrait.classList.add('error')
    answers.innerText = characterName

    // revealAnswersTag.style.display = 'flex'
    // revealAnswersTag.appendChild(answers)
    iconIdTag.style.display = 'none'
    championIdTag.style.display = 'block'
  })
}

let resetGame = () => {
  leagueChampions = []
  counter = 0
  totalCharacter = 0
  revealAnswersTag.innerHTML = ''
  revealAnswersTag.style.display = 'none'
  characterTag.innerHTML = ''
  inputTag.disabled = false
  renderInfo()
}

let changeScroll = () => {
  let inputContainer = document.querySelector('.pinned-container')
  this.scrollY > 100 ? inputContainer.classList.add('pinned-fixed') : inputContainer.classList.remove('pinned-fixed')
}

renderInfo()

inputTag.addEventListener('input', userGuess)

window.addEventListener("scroll", changeScroll, false)


function test(event) {
  console.log(event)
  // let back = document.querySelector(`back${}`)
}