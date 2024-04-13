let overlayHTML = `
  <div id="overlay">
    <h1>Select Game Mode</h1>
    <button id="easy" class='difficulty-button'>Easy</button>
    <button id="normal" class='difficulty-button'>Normal</button>
    <button id="hard" class='difficulty-button'>Hard</button>
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
  } else if (gameMode === "easy") {
    gameContainer.classList.add("easy-mode");
  } else {
    gameContainer.classList.remove("easy-mode", "hard-mode");
  }

  // Remove the overlay
  document.getElementById("overlay").classList.add("hidden");

  // Show the game container
  document.querySelector(".memory-game").classList.remove("hidden");
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

  // Shuffle the cardsData array
  cardsData.sort(() => Math.random() - 0.5);

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
    let icon1 = document.createElement("i");
    icon1.classList.add("fas", cardsData[i]);
    front1.appendChild(icon1);
    card1.appendChild(front1);
    card1.appendChild(back1);

    let front2 = document.createElement("div");
    let back2 = document.createElement("div");
    front2.classList.add("front-face");
    back2.classList.add("back-face");
    let icon2 = document.createElement("i");
    icon2.classList.add("fas", cardsData[i]);
    front2.appendChild(icon2);
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
  });
}

let difficultyButtons = document.querySelectorAll(".difficulty-button");
difficultyButtons.forEach((button) => {
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
});
