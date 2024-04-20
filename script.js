const cardsData = [
  "fa-dog",
  "fa-cat",
  "fa-crow",
  "fa-dove",
  "fa-dragon",
  "fa-horse",
  "fa-hippo",
  "fa-fish",
  "fa-frog",
  "fa-kiwi-bird",
  "fa-otter",
  "fa-spider",
];

const colors = [
  "red",
  "yellow",
  "purple",
  "pink",
  "orange",
  "cyan",
  "magenta",
  "teal",
  "coral",
];

let overlayHTML = `
  <div id="overlay">
    <h1>Select Game Mode</h1>
    <p>Hover over each difficulty to see description.</p>
    <button id="easy" class='difficulty-button' title='Easy mode: match 3 pairs. Pairs have different background colors.' aria-label='Easy mode: match 3 pairs. Pairs have different background colors.'>Easy</button>
    <button id="normal" class='difficulty-button' title='Normal mode: Match 6 pairs. Pairs have different background colors.' aria-label='Normal mode: Match 6 pairs. Pairs have different background colors.'>Normal</button>
    <button id="hard" class='difficulty-button' title='Hard mode: Match 12 pairs. Pairs have the same background colors.' aria-label='Hard mode: Match 12 pairs. Pairs have the same background colors.'>Hard</button>
  </div>
`;

// Append the overlay to the body
document.body.insertAdjacentHTML("beforeend", overlayHTML);

// Add event listeners to the buttons
let easyButton = document.getElementById("easy");
let normalButton = document.getElementById("normal");
let hardButton = document.getElementById("hard");

if (!easyButton || !normalButton || !hardButton) {
  console.error("Difficulty buttons not found");
} else {
  easyButton.addEventListener("click", () => startGame("easy"));
  normalButton.addEventListener("click", () => startGame("normal"));
  hardButton.addEventListener("click", () => startGame("hard"));
}

function startGame(mode) {
  // Set the game mode
  gameMode = mode;

  // Add or remove the "hard-mode" class based on the game mode
  let gameContainer = document.querySelector(".memory-game");
  if (gameContainer) {
    if (gameMode === "hard") {
      gameContainer.classList.add("hard-mode");
    } else if (gameMode === "easy") {
      gameContainer.classList.add("easy-mode");
    } else {
      gameContainer.classList.remove("easy-mode", "hard-mode");
    }
  }

  // Remove the overlay
  let overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }

  // Show the game container
  if (gameContainer) {
    gameContainer.classList.remove("hidden");
  }

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
      console.error(`Unexpected game mode: ${gameMode}`);
      pairs = 3;
  }

  createPairs(pairs);
}

// Define gameContainer in the global scope
let gameContainer = document.querySelector(".memory-game");

function createPairs(pairs) {
  if (!Number.isInteger(pairs) || pairs <= 0) {
    console.error(`Invalid number of pairs: ${pairs}`);
    return;
  }

  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;

  // Check if cardsData and colors exist and have the correct length
  if (
    !cardsData ||
    !colors ||
    cardsData.length < pairs ||
    colors.length < pairs
  ) {
    console.error("Insufficient cards data or colors");
    return;
  }
  // Shuffle the cardsData and colors array
  cardsData.sort(() => Math.random() - 0.5);
  colors.sort(() => Math.random() - 0.5);

  for (let i = 0; i < pairs; i++) {
    // create two cards for each pair
    let card1 = document.createElement("div");
    let card2 = document.createElement("div");
    card1.classList.add("memory-card");
    card2.classList.add("memory-card");
    // sets data attribute
    card1.dataset.pair = i;
    card2.dataset.pair = i;

    // Add ARIA attributes
    card1.setAttribute("role", "button");
    card1.setAttribute("aria-label", `Memory card for pair ${i + 1}`);
    card2.setAttribute("role", "button");
    card2.setAttribute("aria-label", `Memory card for pair ${i + 1}`);

    if (!colors[i]) {
      console.error(`Color not found for pair ${i + 1}`);
    } else {
      if (gameMode === "hard") {
        card1.style.backgroundColor = colors[0];
        card2.style.backgroundColor = colors[0];
      } else {
        card1.style.backgroundColor = colors[i];
        card2.style.backgroundColor = colors[i];
      }
    }

    // create a front and a back for each card
    let front1 = document.createElement("div");
    let back1 = document.createElement("div");
    front1.classList.add("front-face");
    back1.classList.add("back-face");

    if (!cardsData[i]) {
      console.error(`Icon not found for pair ${i + 1}`);
    } else {
      let icon1 = document.createElement("i");
      icon1.classList.add("fas", cardsData[i]);
      front1.appendChild(icon1);
    }
    card1.appendChild(front1);
    card1.appendChild(back1);

    let front2 = document.createElement("div");
    let back2 = document.createElement("div");
    front2.classList.add("front-face");
    back2.classList.add("back-face");

    if (!cardsData[i]) {
      console.error(`Icon not found for pair ${i + 1}`);
    } else {
      let icon2 = document.createElement("i");
      icon2.classList.add("fas", cardsData[i]);
      front2.appendChild(icon2);
    }

    card2.appendChild(front2);
    card2.appendChild(back2);

    // Check if game container exists
    if (!gameContainer) {
      console.error("Game container not found");
    } else {
      gameContainer.appendChild(card1);
      gameContainer.appendChild(card2);
    }

    cards.push(card1, card2);
  }

  // Shuffles cards
  if (!cards || cards.length < pairs * 2) {
    console.error("Insufficient cards");
  } else {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  // add event listeners and append cards to the game container
  cards.forEach((card) => {
    if (!card) {
      console.error("Card not found");
    } else {
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
                Swal.fire({
                  title: "Game over, you won!",
                  text: "Do you want to play again or Exit?",
                  showDenyButton: true,
                  confirmButtonText: "Play again",
                  denyButtonText: "Exit",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    // User clicked "Play again", reset the game
                    gameContainer.innerHTML = "";
                    createPairs(pairs);
                  } else if (result.isDenied) {
                    // User clicked "Return to start", refresh the page
                    location.reload();
                  }
                });
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
    }
  });

  let difficultyButtons = document.querySelectorAll(".difficulty-button");
  difficultyButtons.forEach((button) => {
    if (!button) {
      console.error("Difficulty button not found");
    } else {
      button.addEventListener("click", function () {
        // Hide the overlay
        document.getElementById("overlay").classList.add("hidden");

        // Clear the game container
        gameContainer.innerHTML = "";

        // Get the number of pairs for the selected difficulty
        let pairs = this.dataset.pairs;

        // Start the game
        createPairs(pairs);
      });
    }
  });
}
