let riotAPI = 'https://ddragon.leagueoflegends.com/cdn/14.19.1/data/en_US/champion.json'
const imageTag = document.getElementById('characterImg');

let getLeagueChampions = async () => {
  let arrChamp = []
  let response = await axios.get(riotAPI)
    .then(res => { return res.data.data })
    .catch(err => { return err })
  Object.keys(response).forEach(item => {
    arrChamp.push({
      name: item.toLowerCase(),
      image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item}_0.jpg`
    })
  })
  return arrChamp
}

let renderInfo = async () => {
  let champion = await getLeagueChampions()


  // console.log(champion)
  champion.forEach(item => {
    let elementTag = document.createElement('div')
    elementTag.className = 'champion-box'
    elementTag.id = `${item.name}`
    elementTag.innerHTML = `<img class="champion" src="${item.image}" alt="champion">`
    imageTag.appendChild(elementTag) 
  })
}

renderInfo()