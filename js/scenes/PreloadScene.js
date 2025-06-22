class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        // Loading progress text
        const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000'
        });
        loadingText.setOrigin(0.5);
        
        // Loading progress
        this.load.on('progress', (value) => {
            loadingText.setText(`Loading... ${Math.floor(value * 100)}%`);
        });
        
        // When loading completes
        this.load.on('complete', () => {
            loadingText.destroy();
        });
        
        // No assets to load - using simple rectangles for buttons
    }

    create() {
        // Proceed to the menu scene
        this.scene.start('MenuScene');
    }
}
