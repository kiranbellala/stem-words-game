class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Title
        const titleText = this.add.text(width / 2, height / 4 - 20, 'Stem Words Game', {
            fontFamily: 'Arial',
            fontSize: '56px',
            color: '#000000',
            fontStyle: 'bold'
        });
        titleText.setOrigin(0.5);
        
        // Subtitle
        const subtitleText = this.add.text(width / 2, height / 4 + 50, 'Learn Latin, Greek, Old English and Germanic roots', {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000'
        });
        subtitleText.setOrigin(0.5);
        
        // Create buttons with more space between them
        this.createButton(width / 2, height / 2 + 60, 'Random Words Mode', () => {
            gameState.gameMode = 'random';
            this.scene.start('GameScene');
        });
        
        this.createButton(width / 2, height / 2 + 150, 'Learn by List', () => {
            gameState.gameMode = 'list';
            this.scene.start('ListSelectScene');
        });
    }
    
    createButton(x, y, text, callback) {
        // Create simple rectangle button
        const button = this.add.rectangle(x, y, 400, 60, 0xffffff);
        button.setStrokeStyle(2, 0x000000);
        
        const buttonText = this.add.text(x, y, text, {
            fontFamily: 'Arial',
            fontSize: '26px',
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
            callback();
        });
        
        return { button, text: buttonText };
    }
}
