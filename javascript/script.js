let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
const inputTag = document.getElementById('guess')
const imageTag = document.getElementById('characterImg')
let leagueChampions = []

let renderInfo = async () => {
  await getLeagueChampions()
}

let getLeagueChampions = async () => {
  let response = await axios.get(riotAPI)
    .then(res => { return res.data.data })
    .catch(err => { return err })
  Object.keys(response).forEach(item => {
    let elementTag = document.createElement('div')
    elementTag.className = 'champion-box'
    elementTag.id = `${item.toLowerCase()}`
    elementTag.innerHTML = `<img class="champion" src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item}_0.jpg" alt="champion">`
    imageTag.appendChild(elementTag)
    leagueChampions.push(item.toLowerCase())
  })
}

let userGuess = (event) => {
  let guess = event.target.value
  let remainingCharacters = leagueChampions
  if (guess.length > 1) {
    remainingCharacters.forEach((characterName, index) => {
      if(characterName === guess) {
        remainingCharacters.splice(index, 1)
      }
    })
  }
}

renderInfo()

inputTag.addEventListener('input', userGuess)

