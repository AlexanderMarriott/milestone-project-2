const { createPairs, shuffleCards, addEventListeners } = require("./script"); // assuming these functions are exported from script.js

describe("Memory Card Game", () => {
  let cardsData;
  let gameContainer;
  let cards;

  beforeEach(() => {
    // Initialize variables before each test
    cardsData = ["fa-dog", "fa-cat", "fa-fish"];
    gameContainer = document.createElement("div");
    cards = [];
  });

  test("createPairs should create a card with the correct attributes", () => {
    const card = createCard(cardsData[0], 0);
    expect(card).toHaveClass("memory-card");
    expect(card.dataset.pair).toBe("0");
  });

  test("shuffleCards should shuffle the cards array", () => {
    cards = cardsData.map((data, i) => createCard(data, i));
    const originalOrder = [...cards];
    shuffleCards(cards);
    y;
    expect(cards).not.toEqual(originalOrder);
  });

  test("addEventListeners should add click event listeners to cards", () => {
    cards = cardsData.map((data, i) => createCard(data, i));
    addEventListeners(cards);
    const mockCallback = jest.fn();
    cards[0].addEventListener("click", mockCallback);
    cards[0].click();
    expect(mockCallback).toHaveBeenCalled();
  });
});
