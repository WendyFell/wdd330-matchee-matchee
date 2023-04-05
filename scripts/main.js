const BaseUrl = "https://pokeapi.co/api/v2/pokemon/";
// const BaseUrl = "https://wendyfell.github.io/wdd330-matcheematchee/data/mom-ancestors.json"
const game = document.getElementById("game");


let isPaused = false;
let firstPick;
let matches; 

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
    female: "green",
    male: "purple"
};


const loadCard = async () => {
    const randomIds = new Set(); // Set is object data structure that makes sure there are no duplicates. 
    while(randomIds.size < 8){
        const randomNumber = Math.ceil(Math.random() * 8); 
        randomIds.add(randomNumber);
    }
    
    const promises = [ ...randomIds].map( id => fetch(BaseUrl + id)); // Map function gives us the array. Then gets each id from the url
    const responses = await Promise.all(promises); // Take the promises and put them in Promise.all
    // console.log(responses);
    return await Promise.all(responses.map(res => res.json())); // Convert the result and get array of each  
    
}

const displayCard = (picture) => {
    picture.sort( _ => Math.random() - 0.5); // Sorting both sets into a random order. The _ indicates the parameter, not referencing the individual item. 
    const pictureHTML = picture.map(picture => {
        const type = picture.types[0]?.type?.name || "normal";
        const color = colors[type];
        return `
            <div class="card" style="background-color:${color}" onclick="clickCard(event)" data-picturename="${picture.name}">
                <div class="front"></div>
                <div class="back rotated" style="background-color:${color}">
                    <img src="${picture.sprites.front_default}" alt="${picture.name}"}>
                    <h2>${picture.name}</h2>
                </div>
            </div>
        `
    }).join("");
    game.innerHTML = pictureHTML;
}

function clickCard(event) {
    const pictureCard = event.currentTarget;
    const [front, back] = getFrontAndBackFromCard(pictureCard);
  
    if (front.classList.contains("rotated") || isPaused) return;
    
    isPaused = true;
   
    rotateElements([front, back])
   
    if (!firstPick) {
        firstPick = pictureCard;
        isPaused = false;
        // Do I need to use localstorage?
        // let currentNumber = 0;
        // const numberElement = document.querySelector(".moves");
        // currentNumber += 1;
        // numberElement.textContent = currentNumber;
    } else {
        const secondPictureName = pictureCard.dataset.picturename;
        const firstPictureName = firstPick.dataset.picturename;
        if (firstPictureName != secondPictureName) {
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick);
            setTimeout (() => {
                rotateElements([front, back, firstFront, firstBack]);
                firstPick = null;
                isPaused = false;
            }, 500);  
        } else {
            matches ++;
            if (matches == 8) {
                console.log("winner");
            } 
            firstPick = null;
            isPaused = false;
        }
    }
}


function rotateElements(elements) {
    if (typeof elements != "object" || !elements.length) return;
    elements.forEach(element => element.classList.toggle("rotated"));
}

function getFrontAndBackFromCard(card) {
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    return [front, back];
}

const resetGame = () => {
    game.innerHTML = "";
    isPaused = true;
    firstPick = null;
    matches = 0;
    setTimeout(async () => {
        const picture = await loadCard();
        displayCard([ ...picture, ...picture]); // Get two iterations of each image
        isPaused = false;
    })
}



resetGame();