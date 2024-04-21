# milestone-project-2

## Memory Card Game

This is a simple memory card game implemented in JavaScript.

## How to Play

The game starts with all cards face down. The player flips two cards over each turn. If the two cards match, they stay face up. If they don't match, they are flipped back over. The game continues until all cards are face up.

## Features

- The game supports an easy and a hard mode. In the easy mode, each pair of cards has a different color. In the hard mode, all cards have the same color.
- The game uses ARIA attributes for accessibility.
- The game includes error handling for missing game containers, missing cards, and missing icons.

## Code Overview

The JavaScript code for the game does the following:

1. Creates pairs of memory cards. Each pair of cards is created as a `div` element with a class of `memory-card` and a data attribute that identifies the pair. The cards are styled and given ARIA attributes for accessibility. Each card is also given a front and a back, and an icon is added to the front of the card if one is available. The cards are then added to the game container and stored in the `cards` array.
2. Shuffles the `cards` array using the Fisher-Yates shuffle algorithm.
3. Adds an event listener to each card. When a card is clicked, it is flipped over and added to the `flippedCards` array. If two cards have been flipped over, the game checks if they match. If they do, the `matchedPairs` counter is incremented and the `flippedCards` array is cleared. If all pairs have been matched, the game is over and the `gameOver` function is called. If the two flipped cards do not match, they are flipped back over after a delay.

## Future Improvements

- Add a timer to track how long it takes the player to match all pairs.
- Add a score system based on the number of turns taken.
- Add more levels or difficulty settings.
