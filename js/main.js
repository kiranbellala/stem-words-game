// Global game state
const gameState = {
    score: 0,
    currentList: null,
    gameMode: null, // 'random' or 'list'
    stemWords: null,
    currentStem: null,
    correctAnswers: 0,
    totalQuestions: 0
};

// Initialize the game when all scripts are loaded
window.onload = function() {
    const game = new Phaser.Game(config);
};
