const startBtn = document.querySelector('.startBtn');
const restartBtn = document.querySelector('.restart');
const scoreDiv = document.querySelector('header');
const validate = document.querySelector('.validate');
const startScreen = document.querySelector('.startScreen')
const gameScreen = document.querySelector('.gameScreen')
const resultScreen = document.querySelector('.resultScreen')
const loadingScreen = document.querySelector('.loadingScreen')
const isGoodTxt = document.querySelector('#isGood')
const cityTxt = document.querySelector('#city')
const place = document.querySelector('#location')
const country = document.querySelector('#country')
const continent = document.querySelector('#continent')
const scoreCounterTxt = document.querySelector('#scoreCounter')
const weatherTxt = document.querySelector('#weather')
const cards = document.querySelectorAll('.card')

let randomPlace = "Paris"
let finalAnswer = "Clear"
const api_key = [PUT_API_KEY_HERE];
let score = 0;
let rounds = 0;

startBtn.addEventListener('click', ()=>{startGame()});
restartBtn.addEventListener('click', ()=>{startGame()});
validate.addEventListener('click', ()=>{showResponse(randomPlace,finalAnswer)});

cards.forEach(card => {
    let answer = card.querySelector('h2').innerHTML
    card.addEventListener('click', () => {
        finalAnswer = answer;
        validate.classList.remove('hidden')
    }) 
});


function startGame(){
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden')
    validate.classList.add('hidden')
    

    fetch('https://restcountries.eu/rest/v2/all')
    .then(data => {
        return data.json()
    })
    .then(res => {
        let i = Math.floor(Math.random() * 250);
        randomPlace = res[i].capital
        place.innerHTML = randomPlace
        country.innerHTML = res[i].name
        continent.innerHTML = res[i].region

    })
    .catch(err => {
        console.error(err)
    })
}

function showResponse(city,response) {
    gameScreen.classList.add('hidden');
    loadingScreen.classList.remove('hidden')
    scoreDiv.classList.remove('hidden')
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key)
    .then(data => {
        return data.json();
    })
    .then(res => {

        resultScreen.classList.remove('hidden')
        loadingScreen.classList.add('hidden')

        weather = res.weather[0].main
        isGoodTxt.innerHTML = (response === weather) ? "Congrats !" : "Nope !"
        cityTxt.innerHTML = res.name
        weatherTxt.innerHTML = weather

        if (response === weather){
            score++
        } 
        rounds++
        scoreCounterTxt.innerHTML = score+" / "+rounds
    })
    .catch(err => {
        console.error(err);
    });

    
}
