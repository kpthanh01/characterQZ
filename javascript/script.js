let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
const inputTag = document.getElementById('guess')
const characterTag = document.getElementById('characterImg')
const scoreTag = document.getElementById('score')
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
    let championImgTag = document.createElement('img')
    championImgTag.setAttribute('src', `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item}_0.jpg`)
    championImgTag.setAttribute('alt', 'champion')
    championImgTag.className = 'champion'
    championImgTag.id = `${item.toLowerCase()}`

    iconCardTag.setAttribute('src', '/assets/leagueIcon.jpg')
    iconCardTag.setAttribute('alt', 'championHiddenIcon')
    iconCardTag.className = 'hidden-champion-icon'
    iconCardTag.id = `${item.toLowerCase()}-HiddenIcon`

    characterTag.appendChild(championImgTag)
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
      championIdTag.style.display = 'inline'
      scoreTag.innerText = `${counter}/${totalCharacter}`
    }
  })
  if (counter === totalCharacter) {
    console.log('won quiz')
  }
}

// Timer function

renderInfo()

inputTag.addEventListener('input', userGuess)

