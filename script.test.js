// Test Case 1: Valid Input
createPairs(4);
// Expected Output: No errors should be logged to the console
// Test Case 1: Valid Input
createPairs(4);
// Expected Output: No errors should be logged to the console

// Test Case 2: Invalid Input
createPairs(-2);
// Expected Output: "Invalid number of pairs: -2" should be logged to the console

// Test Case 3: Insufficient Cards Data
cardsData.length = 2;
createPairs(4);
// Expected Output: "Insufficient cards data or colors" should be logged to the console

// Test Case 4: Game Mode - Easy
startGame("easy");
// Expected Output: The game should start in easy mode, with 3 pairs of cards

// Test Case 5: Game Mode - Normal
startGame("normal");
// Expected Output: The game should start in normal mode, with 6 pairs of cards

// Test Case 6: Game Mode - Hard
startGame("hard");
// Expected Output: The game should start in hard mode, with 12 pairs of cards

// Test Case 7: Game Over - Game Won
gameOver(true);
// Expected Output: A congratulations message should be displayed with options to play again or exit

// Test Case 8: Game Over - Game Lost
gameOver(false);
// Expected Output: A game over message should be displayed with an option to exit
