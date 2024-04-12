let overlayHTML = `
  <div id="overlay">
    <h1>Select Game Mode</h1>
    <button id="easy">Easy</button>
    <button id="normal">Normal</button>
    <button id="hard">Hard</button>
  </div>
`;

// Append the overlay to the body
document.body.insertAdjacentHTML("beforeend", overlayHTML);

// Add event listeners to the buttons
document
  .getElementById("easy")
  .addEventListener("click", () => startGame("easy"));
document
  .getElementById("normal")
  .addEventListener("click", () => startGame("normal"));
document
  .getElementById("hard")
  .addEventListener("click", () => startGame("hard"));

function startGame(mode) {
  // Set the game mode
  gameMode = mode;

  // Add or remove the "hard-mode" class based on the game mode
  let gameContainer = document.querySelector(".memory-game");
  if (gameMode === "hard") {
    gameContainer.classList.add("hard-mode");
  } else {
    gameContainer.classList.remove("hard-mode");
  }

  // Remove the overlay
  document.getElementById("overlay").style.display = "none";

  // Start the game
  let pairs;
  switch (gameMode) {
    case "easy":
      pairs = 3;
      break;
    case "normal":
      pairs = 6;
      break;
    case "hard":
      pairs = 12;
      break;
    default:
      pairs = 3;
  }

  createPairs(pairs);
}

function createPairs(pairs) {
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  const cardsData = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ];

  for (let i = 0; i < pairs; i++) {
    // create two cards for each pair
    let card1 = document.createElement("div");
    let card2 = document.createElement("div");
    card1.classList.add("memory-card");
    card2.classList.add("memory-card");
    // sets data attribute
    card1.dataset.pair = i;
    card2.dataset.pair = i;

    // create a front and a back for each card
    let front1 = document.createElement("div");
    let back1 = document.createElement("div");
    front1.classList.add("front-face");
    back1.classList.add("back-face");
    front1.textContent = cardsData[i]; // test content front face
    card1.appendChild(front1);
    card1.appendChild(back1);

    let front2 = document.createElement("div");
    let back2 = document.createElement("div");
    front2.classList.add("front-face");
    back2.classList.add("back-face");
    front2.textContent = cardsData[i]; // add some content to the front face
    card2.appendChild(front2);
    card2.appendChild(back2);

    cards.push(card1, card2);
  }

  // Shuffles cards
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // add event listeners and append cards to the game container
  let gameContainer = document.querySelector(".memory-game");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      if (flippedCards.length < 2 && !card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          if (flippedCards[0].dataset.pair === flippedCards[1].dataset.pair) {
            // The cards match
            matchedPairs++;
            flippedCards = [];
            if (matchedPairs === pairs) {
              // All pairs have been matched, end the game
              console.log("Game over, you won!");
            }
          } else {
            // The cards don't match, flip them back after a delay
            setTimeout(() => {
              flippedCards.forEach((card) => {
                card.classList.remove("is-flipped");
              });
              flippedCards = [];
            }, 1000);
          }
        }
      }
    });
    gameContainer.appendChild(card);
  });
}
