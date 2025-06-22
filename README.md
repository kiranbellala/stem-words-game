# Stem Words Game

An interactive educational game to help students learn stem words and their meanings. Players are presented with stem words and must choose the correct definition from multiple choice options.

## Features

- **Multiple Game Modes**: Choose from specific stem word lists or random mode
- **Interactive Learning**: Visual feedback with green checkmarks for correct answers and red X marks for incorrect ones
- **Example Words**: After each question, see real words that use the stem (clickable for more information)
- **Score Tracking**: Keep track of your progress with scoring and accuracy statistics
- **Responsive Design**: Clean, user-friendly interface built with Phaser.js

## How to Play

1. Choose a game mode from the main menu:
   - Select a specific stem word list (1-20)
   - Choose random mode for mixed practice
2. Answer multiple choice questions about stem word meanings
3. Get immediate feedback with visual indicators
4. Learn from example words that use each stem
5. Track your score and accuracy

## Getting Started

### Prerequisites
- A modern web browser
- Python 3 (for local development server)

### Running the Game

1. Clone this repository
2. Navigate to the project directory
3. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`

## Project Structure

```
stem-words-game/
├── index.html              # Main game file
├── js/                     # Game JavaScript files
│   ├── scenes/            # Phaser.js game scenes
│   ├── config.js          # Game configuration
│   └── main.js            # Main game initialization
├── assets/                # Game assets (CSS, images)
├── reorganized_stem_words_fixed.json  # Game data
├── scripts/               # Development scripts and unused files
└── README.md              # This file
```

## Technologies Used

- **Phaser.js 3.60.0** - Game framework
- **HTML5/CSS3** - Structure and styling
- **JavaScript ES6** - Game logic
- **JSON** - Data storage for stem words and definitions

## Contributing

Feel free to contribute to this project by:
- Adding new stem word lists
- Improving the user interface
- Adding new game modes
- Fixing bugs or improving performance

## License

This project is open source and available under the [MIT License](LICENSE).
