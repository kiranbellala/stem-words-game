class ListSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ListSelectScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Title
        const titleText = this.add.text(width / 2, 60, 'Select a Word List', {
            fontFamily: 'Arial',
            fontSize: '38px',
            color: '#000000',
            fontStyle: 'bold'
        });
        titleText.setOrigin(0.5);
        
        // Back button
        const backButton = this.add.rectangle(120, 60, 100, 40, 0xffffff);
        backButton.setStrokeStyle(2, 0x000000);
        
        const backText = this.add.text(120, 60, 'Back', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            fontWeight: 'bold'
        });
        backText.setOrigin(0.5);
        
        backButton.setInteractive();
        backButton.on('pointerover', () => {
            backButton.setFillStyle(0xf0f0f0);
        });
        backButton.on('pointerout', () => {
            backButton.setFillStyle(0xffffff);
        });
        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
        
        // Create list buttons - 5 columns x 4 rows with more space
        const startX = width * 0.15;
        const startY = 150;
        const buttonWidth = 120;
        const buttonHeight = 120;
        const padding = 30;
        
        for (let i = 0; i < 20; i++) {
            const col = i % 5;
            const row = Math.floor(i / 5);
            
            const x = startX + col * (buttonWidth + padding);
            const y = startY + row * (buttonHeight + padding);
            
            this.createListButton(x, y, i + 1);
        }
    }
    
    createListButton(x, y, listNumber) {
        const button = this.add.rectangle(x, y, 100, 60, 0xffffff);
        button.setStrokeStyle(2, 0x000000);
        
        const buttonText = this.add.text(x, y, `List ${listNumber}`, {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            fontWeight: 'bold'
        });
        buttonText.setOrigin(0.5);
        
        button.setInteractive();
        
        button.on('pointerover', () => {
            button.setFillStyle(0xf0f0f0);
        });
        
        button.on('pointerout', () => {
            button.setFillStyle(0xffffff);
        });
        
        button.on('pointerdown', () => {
            gameState.currentList = listNumber - 1; // Arrays are 0-indexed
            this.scene.start('GameScene');
        });
        
        return { button, text: buttonText };
    }
}
