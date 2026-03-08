/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
addGamesToPage(GAMES_JSON)
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        let newElement = document.createElement("div");
        newElement.classList.add("game-card"); 

        const display = `
            <img class="game-img" src= ${element.img}>
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <p> pledged: ${element.pledged}</p>
            <p> goal: ${element.goal}</p>
            <p> backers: ${element.backers}</p>
        `
        newElement.innerHTML = display;
        gamesContainer.append(newElement);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


const totalContributions = GAMES_JSON.reduce((total, games) => {return total + games.backers}, 0)
const dispContributions = `
    <p>${totalContributions.toLocaleString()}<\p>
`
contributionsCard.innerHTML = dispContributions;

const raisedCard = document.getElementById("total-raised");
const totalAmount = GAMES_JSON.reduce((total, games) => {return total + games.pledged}, 0)
const dispAmount = `
    <p>$${totalAmount.toLocaleString()}<\p>
`
raisedCard.innerHTML = dispAmount;

const gamesCard = document.getElementById("num-games");
const totalGame= GAMES_JSON.reduce((total, games) => {return total + 1}, 0)
const dispTotal = `
    <p>${totalGame.toLocaleString()}<\p>
`
gamesCard.innerHTML = dispTotal


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((games) => {return games.goal > games.pledged;}); 
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((games) => {return games.goal <= games.pledged;}); 

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.reduce((total, games) => {return total + (games.goal > games.pledged)}, 0)

// create a string that explains the number of unfunded games using the ternary operator
const displMsg = `
    A total of $${totalAmount.toLocaleString()} has been raised for ${totalGame.toLocaleString()} games. Currently, ${unfunded} ${unfunded == 1 ? "game" : "games"}
    remains unfunded. ${unfunded == 0 ? "Thankyou for all of your support!" : "We need your help to fund these amazing games!"}
`

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.append(displMsg);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame] = sortedGames;
const {
  name: fName,
  description: fDesc,
  pledged: fPl,
  goal: fGoal,
  backers: fBkrs,
  img: fImg
} = { ...firstGame };

const {
  name: sName,
  description: sDesc,
  pledged: sPl,
  goal: sGoal,
  backers: sBkrs,
  img: sImg
} = { ...secondGame };

// create a new element to hold the name of the top pledge game, then append it to the correct element
let first = document.createElement("div");
first.classList.add("game-card");
first.classList.add("leaderboard")
const fDisplay = `
    <img class="game-img" src= ${fImg}>
    <h3>${fName}</h3>
    <p>${fDesc}</p>
    <p> pledged: ${fPl}</p>
    <p> goal: ${fGoal}</p>
    <p> backers: ${fBkrs}</p>
`
first.innerHTML = fDisplay;
firstGameContainer.append(first);

// do the same for the runner up item

let second = document.createElement("div");
second.classList.add("game-card");
second.classList.add("leaderboard")
const sDisplay = `
    <img class="game-img" src= ${sImg}>
    <h3>${sName}</h3>
    <p>${sDesc}</p>
    <p> pledged: ${sPl}</p>
    <p> goal: ${sGoal}</p>
    <p> backers: ${sBkrs}</p>
`
second.innerHTML = sDisplay;
secondGameContainer.append(second);