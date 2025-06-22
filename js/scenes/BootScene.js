class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load JSON data
        this.load.json('stemWords', 'reorganized_stem_words_fixed.json');
    }

    create() {
        // Store the stem words data in the game state
        gameState.stemWords = this.cache.json.get('stemWords');
        
        // Proceed to the preload scene
        this.scene.start('PreloadScene');
    }
}
