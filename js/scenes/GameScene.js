class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.choices = [];
        this.exampleTexts = [];
        this.currentQuestionIndex = 0;
        this.maxQuestions = 10; // Number of questions per session
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Reset game state
        gameState.score = 0;
        gameState.correctAnswers = 0;
        gameState.totalQuestions = 0;
        this.currentQuestionIndex = 0;
        
        // Create UI elements
        this.createUI();
        
        // Start the game
        this.nextQuestion();
    }
    
    createUI() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Title based on game mode
        let titleText;
        if (gameState.gameMode === 'random') {
            titleText = 'Random Words Mode';
        } else {
            titleText = `List ${gameState.currentList + 1}`;
        }
        
        this.add.text(width / 2, 30, titleText, {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        // Score text - moved up for better spacing
        this.scoreText = this.add.text(width - 40, 15, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000'
        });
        this.scoreText.setOrigin(1, 0);
        
        // Question counter
        this.questionCounter = this.add.text(40, 30, 'Question: 1/' + this.maxQuestions, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000'
        });
        
        // Question text - moved up closer to title
        this.questionText = this.add.text(width / 2, 80, '', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
            fontStyle: 'bold'
        });
        this.questionText.setOrigin(0.5);
        
        // Stem word display - moved up
        this.stemText = this.add.text(width / 2, 130, '', {
            fontFamily: 'Arial',
            fontSize: '52px',
            color: '#000000',
            fontStyle: 'bold'
        });
        this.stemText.setOrigin(0.5);
        
        // Origin text - moved up
        this.originText = this.add.text(width / 2, 180, '', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontStyle: 'italic'
        });
        this.originText.setOrigin(0.5);
        
        // Answer choices - moved up
        this.choices = [];
        const startY = 240;
        const padding = 90;
        
        for (let i = 0; i < 4; i++) {
            const choice = this.add.rectangle(width / 2, startY + i * padding, 650, 55, 0xffffff);
            choice.setStrokeStyle(2, 0x000000);
            choice.setInteractive();
            
            const choiceText = this.add.text(width / 2, startY + i * padding, '', {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#000000'
            });
            choiceText.setOrigin(0.5);
            
            choice.on('pointerover', () => {
                choice.setFillStyle(0xf0f0f0);
            });
            
            choice.on('pointerout', () => {
                choice.setFillStyle(0xffffff);
            });
            
            this.choices.push({ rect: choice, text: choiceText });
        }
        
        // Example words section - moved down to avoid overlap
        this.exampleContainer = this.add.container(width / 2, 680);
        this.exampleContainer.setAlpha(0);
        
        // Add a background for the examples section - removed border
        this.exampleBackground = this.add.rectangle(0, 50, 700, 280, 0xffffff, 0.7);
        this.exampleContainer.add(this.exampleBackground);
        
        this.exampleTitle = this.add.text(0, -90, 'Example Words:', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontStyle: 'bold'
        });
        this.exampleTitle.setOrigin(0.5, 0);
        
        this.exampleContainer.add(this.exampleTitle);
        
        // Menu button - moved down to avoid overlapping with score
        this.menuButton = this.add.rectangle(width - 80, 70, 120, 40);
        this.menuButton.setStrokeStyle(2, 0x000000);
        
        this.menuButtonText = this.add.text(width - 80, 70, 'Menu', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            fontWeight: 'bold'
        });
        this.menuButtonText.setOrigin(0.5);
        
        this.menuButton.setInteractive();
        this.menuButton.on('pointerover', () => {
            this.menuButton.setFillStyle(0xf0f0f0);
        });
        this.menuButton.on('pointerout', () => {
            this.menuButton.setFillStyle(0xffffff);
        });
        this.menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
        
        // Next button (initially hidden) - moved down to align with new menu button position
        this.nextButton = this.add.rectangle(width - 80, 130, 120, 40, 0xffffff);
        this.nextButton.setStrokeStyle(2, 0x000000);
        this.nextButton.setAlpha(0);
        
        this.nextButtonText = this.add.text(width - 80, 130, 'Next', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            fontWeight: 'bold'
        });
        this.nextButtonText.setOrigin(0.5);
        this.nextButtonText.setAlpha(0);
        
        this.nextButton.setInteractive();
        this.nextButton.on('pointerover', () => {
            this.nextButton.setFillStyle(0xf0f0f0);
        });
        this.nextButton.on('pointerout', () => {
            this.nextButton.setFillStyle(0xffffff);
        });
        this.nextButton.on('pointerdown', () => {
            this.hideExamples();
            this.nextQuestion();
        });
    }
    
    nextQuestion() {
        // Hide next button
        this.nextButton.setAlpha(0);
        this.nextButtonText.setAlpha(0);
        this.nextButton.disableInteractive();
        
        // Clear visual indicators from previous question
        this.choices.forEach(choice => {
            // Reset choice background color
            choice.rect.setFillStyle(0xffffff);
            
            // Remove checkmarks and X marks if they exist
            if (choice.checkmark) {
                choice.checkmark.destroy();
                choice.checkmark = null;
            }
            if (choice.redX) {
                choice.redX.destroy();
                choice.redX = null;
            }
        });
        
        // Check if we've reached the maximum number of questions
        if (this.currentQuestionIndex >= this.maxQuestions) {
            this.showGameOver();
            return;
        }
        
        // Update question counter
        this.currentQuestionIndex++;
        this.questionCounter.setText('Question: ' + this.currentQuestionIndex + '/' + this.maxQuestions);
        
        // Get a stem word based on the game mode
        if (gameState.gameMode === 'random') {
            // Random mode: select a random list and then a random stem from that list
            const randomListIndex = Phaser.Math.Between(0, gameState.stemWords.lists.length - 1);
            const randomList = gameState.stemWords.lists[randomListIndex];
            const randomStemIndex = Phaser.Math.Between(0, randomList.stems.length - 1);
            gameState.currentStem = randomList.stems[randomStemIndex];
        } else {
            // List mode: select a random stem from the current list
            const currentList = gameState.stemWords.lists[gameState.currentList];
            const randomStemIndex = Phaser.Math.Between(0, currentList.stems.length - 1);
            gameState.currentStem = currentList.stems[randomStemIndex];
        }
        
        // Set question text
        this.questionText.setText('What does this stem word mean?');
        this.stemText.setText(gameState.currentStem.stem);
        this.originText.setText('Origin: ' + gameState.currentStem.origin);
        
        // Generate answer choices
        this.generateChoices();
        
        // Enable interaction with choices
        this.choices.forEach(choice => {
            choice.rect.setInteractive();
        });
    }
    
    generateChoices() {
        // Get the correct definition
        const correctDefinition = gameState.currentStem.definition;
        
        // Get 3 random incorrect definitions
        const allDefinitions = this.getAllDefinitions();
        const incorrectDefinitions = this.getRandomIncorrectDefinitions(allDefinitions, correctDefinition, 3);
        
        // Combine and shuffle all choices
        const allChoices = [correctDefinition, ...incorrectDefinitions];
        Phaser.Utils.Array.Shuffle(allChoices);
        
        // Store the index of the correct answer
        this.correctChoiceIndex = allChoices.indexOf(correctDefinition);
        
        // Set the text for each choice
        for (let i = 0; i < this.choices.length; i++) {
            this.choices[i].text.setText(allChoices[i]);
            
            // Set up the click handler for this choice
            this.choices[i].rect.off('pointerdown'); // Remove any existing handlers
            this.choices[i].rect.on('pointerdown', () => {
                this.checkAnswer(i);
            });
        }
    }
    
    getAllDefinitions() {
        // Collect all definitions from all lists
        const definitions = [];
        gameState.stemWords.lists.forEach(list => {
            list.stems.forEach(stem => {
                definitions.push(stem.definition);
            });
        });
        return definitions;
    }
    
    getRandomIncorrectDefinitions(allDefinitions, correctDefinition, count) {
        // Filter out the correct definition
        const incorrectDefinitions = allDefinitions.filter(def => def !== correctDefinition);
        
        // Shuffle the array
        Phaser.Utils.Array.Shuffle(incorrectDefinitions);
        
        // Return the requested number of definitions
        return incorrectDefinitions.slice(0, count);
    }
    
    checkAnswer(choiceIndex) {
        // Disable further choices
        this.choices.forEach(choice => {
            choice.rect.disableInteractive();
        });
        
        // Increment total questions
        gameState.totalQuestions++;
        
        // Check if the answer is correct
        if (choiceIndex === this.correctChoiceIndex) {
            // Correct answer
            gameState.score += 10;
            gameState.correctAnswers++;
            this.scoreText.setText('Score: ' + gameState.score);
            
            // Highlight the correct answer in light gray
            this.choices[choiceIndex].rect.setFillStyle(0xd0d0d0);
            
            // Add green checkmark to correct answer
            const checkmark = this.add.text(
                this.choices[choiceIndex].rect.x + 280, 
                this.choices[choiceIndex].rect.y, 
                '✓', 
                {
                    fontFamily: 'Arial',
                    fontSize: '32px',
                    color: '#00AA00',
                    fontStyle: 'bold'
                }
            );
            checkmark.setOrigin(0.5);
            this.choices[choiceIndex].checkmark = checkmark;
        } else {
            // Incorrect answer
            
            // Highlight the selected answer in darker gray
            this.choices[choiceIndex].rect.setFillStyle(0xa0a0a0);
            
            // Add red X to selected wrong answer
            const redX = this.add.text(
                this.choices[choiceIndex].rect.x + 280, 
                this.choices[choiceIndex].rect.y, 
                '✗', 
                {
                    fontFamily: 'Arial',
                    fontSize: '32px',
                    color: '#CC0000',
                    fontStyle: 'bold'
                }
            );
            redX.setOrigin(0.5);
            this.choices[choiceIndex].redX = redX;
            
            // Highlight the correct answer in light gray
            this.choices[this.correctChoiceIndex].rect.setFillStyle(0xd0d0d0);
            
            // Add green checkmark to correct answer
            const checkmark = this.add.text(
                this.choices[this.correctChoiceIndex].rect.x + 280, 
                this.choices[this.correctChoiceIndex].rect.y, 
                '✓', 
                {
                    fontFamily: 'Arial',
                    fontSize: '32px',
                    color: '#00AA00',
                    fontStyle: 'bold'
                }
            );
            checkmark.setOrigin(0.5);
            this.choices[this.correctChoiceIndex].checkmark = checkmark;
        }
        
        // Show example words
        this.showExamples();
        
        // Show next button
        this.nextButton.setAlpha(1);
        this.nextButtonText.setAlpha(1);
        this.nextButton.setInteractive();
    }
    
    showExamples() {
        const width = this.cameras.main.width;
        
        // Clear any existing examples
        this.clearExamples();
        
        // Get example words from the current stem
        const examples = gameState.currentStem.examples;
        
        // Show up to 3 examples vertically
        const maxExamples = Math.min(examples.length, 3);
        
        // Position examples vertically with only the word (no meaning)
        for (let i = 0; i < maxExamples; i++) {
            const example = examples[i];
            const yOffset = -50 + (i * 40); // Moved down 10 pixels from -60 to -50
            
            // Show only the word without the meaning
            const exampleText = this.add.text(0, yOffset, example.word, {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: 650, useAdvancedWrap: true }
            });
            exampleText.setOrigin(0.5, 0.5);
            
            // Make the word clickable to open the search link
            exampleText.setInteractive();
            exampleText.on('pointerover', () => {
                exampleText.setStyle({ 
                    color: '#0000FF'
                });
            });
            exampleText.on('pointerout', () => {
                exampleText.setStyle({ 
                    color: '#000000'
                });
            });
            exampleText.on('pointerdown', () => {
                // Open the search link in a new tab
                window.open(example.search_link, '_blank');
            });
            
            // Add to container
            this.exampleContainer.add(exampleText);
            
            // Store for later cleanup
            this.exampleTexts.push(exampleText);
        }
        
        // Show the examples container
        this.exampleContainer.setAlpha(1);
    }
    
    clearExamples() {
        // Remove all example texts
        this.exampleTexts.forEach(text => {
            text.destroy();
        });
        this.exampleTexts = [];
    }
    
    hideExamples() {
        // Hide the examples container
        this.exampleContainer.setAlpha(0);
    }
    
    showGameOver() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Clear the screen
        this.choices.forEach(choice => {
            choice.rect.setAlpha(0);
            choice.text.setAlpha(0);
        });
        
        this.questionText.setAlpha(0);
        this.stemText.setAlpha(0);
        this.originText.setAlpha(0);
        this.hideExamples();
        
        // Show game over message
        const gameOverText = this.add.text(width / 2, height / 3, 'Game Over!', {
            fontFamily: 'Arial',
            fontSize: '56px',
            color: '#000000',
            fontStyle: 'bold'
        });
        gameOverText.setOrigin(0.5);
        
        // Show final score
        const scoreText = this.add.text(width / 2, height / 3 + 80, `Final Score: ${gameState.score}`, {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#000000'
        });
        scoreText.setOrigin(0.5);
        
        // Show accuracy
        const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100);
        const accuracyText = this.add.text(width / 2, height / 3 + 130, `Accuracy: ${accuracy}%`, {
            fontFamily: 'Arial',
            fontSize: '36px',
            color: '#000000'
        });
        accuracyText.setOrigin(0.5);
        
        // Play again button
        const playAgainButton = this.add.rectangle(width / 2, height / 3 + 210, 200, 60, 0xffffff);
        playAgainButton.setStrokeStyle(2, 0x000000);
        
        const playAgainText = this.add.text(width / 2, height / 3 + 210, 'Play Again', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontWeight: 'bold'
        });
        playAgainText.setOrigin(0.5);
        
        playAgainButton.setInteractive();
        playAgainButton.on('pointerover', () => {
            playAgainButton.setFillStyle(0xf0f0f0);
        });
        playAgainButton.on('pointerout', () => {
            playAgainButton.setFillStyle(0xffffff);
        });
        playAgainButton.on('pointerdown', () => {
            this.scene.restart();
        });
        
        // Menu button
        const menuButton = this.add.rectangle(width / 2, height / 3 + 280, 200, 60, 0xffffff);
        menuButton.setStrokeStyle(2, 0x000000);
        
        const menuText = this.add.text(width / 2, height / 3 + 280, 'Main Menu', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontWeight: 'bold'
        });
        menuText.setOrigin(0.5);
        
        menuButton.setInteractive();
        menuButton.on('pointerover', () => {
            menuButton.setFillStyle(0xf0f0f0);
        });
        menuButton.on('pointerout', () => {
            menuButton.setFillStyle(0xffffff);
        });
        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
