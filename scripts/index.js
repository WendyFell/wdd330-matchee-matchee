const canvas = document.querySelector(".myCanvas");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Create a linear gradient
// The start gradient point is at x=20, y=0
// The end gradient point is at x=220, y=0
// const gradient = ctx.createLinearGradient(20, 0, 220, 0);
const gradient = ctx.createLinearGradient(0, 0, width, height);

// Add three color stops
gradient.addColorStop(0, "green");
gradient.addColorStop(0.5, "cyan");
gradient.addColorStop(1, "blue");

// Set the fill style and draw a rectangle
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Define card images
const cardImages = [
    'images/pexels-aleksey-kuprikov-3493806.jpg',
    'images/pexels-dajana-reçi-15336154.jpg',    
    'images/pexels-glyson-thomas-2468816.jpg',    
    'images/pexels-gunther-z-5561853.jpg',    
    'images/pexels-jonas-togo-3533013.jpg',    
    'images/pexels-matteo-belli-7343372.jpg',    
    'images/pexels-roberto-garrido-6754326.jpg',    
    'images/pexels-valdemaras-d-4780731.jpg',
];
console.log(cardImages); 

// Load card back image
const cardBackImage = new Image();
cardBackImage.src = 'images/6230255.jpg';

cardBackImage.onload = function() {
    // Shuffle cards
    const shuffledCards = shuffleCards(cardImages.concat(cardImages));

    // Draw cards
    const cardWidth = 100;
    const cardHeight = 100;
    const padding = 10;
    const columns = 4;
    const rows = 4;

    const cards = [];

    let firstCard = null;
    let secondCard = null;
    
    for (let i = 0; i < columns * rows; i++) {
        const cardX = (i % columns) * (cardWidth + padding);
        const cardY = Math.floor(i / columns) * (cardHeight + padding);
        const card = {
            image: shuffledCards[i],
            x: cardX,
            y: cardY,
            width: cardWidth,
            height: cardHeight,
            revealed: false,
        };
        cards.push(card);
        ctx.drawImage(cardBackImage, cardX, cardY, cardWidth, cardHeight);
    }

    // Add click event listener
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        for (const card of cards) {
            if (
                mouseX >= card.x &&
                mouseX < card.x + card.width &&
                mouseY >= card.y &&
                mouseY < card.y + card.height &&
                !card.revealed
            ) {
                card.revealed = true;
                const cardImage = new Image();
                cardImage.src = card.image;
                cardImage.onload = function() {
                    ctx.drawImage(cardImage, card.x, card.y, card.width, card.height);
                };
                if (firstCard === null) {
                    firstCard = card;
                } else {
                    secondCard = card;
                    if (firstCard.image === secondCard.image) {
                        // Cards match, keep revealed
                        firstCard = null;
                        secondCard = null;
                    } else {
                        // Cards don't match, hide after delay
                        setTimeout(function() {
                            ctx.drawImage(cardBackImage, firstCard.x, firstCard.y, firstCard.width, firstCard.height);
                            ctx.drawImage(cardBackImage, secondCard.x, secondCard.y, secondCard.width, secondCard.height);
                            firstCard.revealed = false;
                            secondCard.revealed = false;
                            firstCard = null;
                            secondCard = null;
                        }, 1000);
                    }
                }
            }
        }
    });
};

// randomly place images 
function shuffleCards(cards) {
    const shuffled = cards.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};


