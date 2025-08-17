# Tennis Ball Tapper 🎾

A fun and addictive mobile-friendly tennis ball tapping game built with HTML5 Canvas and JavaScript!

## 🎮 Game Features

- **Vertical screen layout** - Perfect for mobile devices
- **Realistic physics** - Ball bounces with gravity and momentum
- **Touch controls** - Smooth finger/drag controls for mobile
- **Mouse support** - Works great on desktop too
- **Score tracking** - Current score and best score persistence
- **Bright, modern design** - Beautiful gradient backgrounds and smooth animations
- **Responsive design** - Adapts to different screen sizes

## 🎯 How to Play

1. **Start the game** by clicking the "Start Game" button
2. **Control the racquet** by dragging your finger (mobile) or clicking and dragging (desktop)
3. **Keep the ball in the air** by positioning the racquet under the falling ball
4. **Score points** every time the racquet successfully hits the ball
5. **Don't let the ball hit the bottom** - that's game over!
6. **Beat your best score** - your high score is automatically saved

## 🚀 How to Run

### Option 1: Simple Local Server
1. Open a terminal/command prompt
2. Navigate to the game directory
3. Run a simple HTTP server:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
   - **Node.js**: `npx http-server`
4. Open your browser and go to `http://localhost:8000`

### Option 2: Live Server Extension (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File Opening
- Simply double-click `index.html` to open in your browser
- Note: Some features may not work properly due to browser security restrictions

## 📱 Mobile Optimization

The game is specifically designed for mobile devices:
- Touch-friendly controls
- Responsive canvas sizing
- Optimized for vertical orientation
- Smooth 60fps gameplay
- Local storage for score persistence

## 🎨 Game Design

- **Tennis Ball**: Bright yellow with realistic seams and bounce physics
- **Tennis Racquet**: Yellow frame with red handle and string pattern
- **Background**: Beautiful sky-to-grass gradient
- **UI**: Clean, modern score display with glass-morphism effects

## 🔧 Technical Details

- **HTML5 Canvas** for smooth graphics rendering
- **JavaScript ES6+** for game logic
- **CSS3** for modern styling and animations
- **Local Storage** for persistent high scores
- **RequestAnimationFrame** for optimal performance
- **Touch and mouse event handling** for cross-platform compatibility

## 🎯 Game Mechanics

- **Physics**: Realistic gravity, bounce, and friction
- **Collision Detection**: Precise ball-racquet collision
- **Scoring**: 1 point per successful hit
- **Difficulty**: Ball gains horizontal movement for added challenge
- **Responsiveness**: Smooth racquet movement with touch/mouse input

## 🌟 Future Enhancements

Potential features to add:
- Sound effects and background music
- Power-ups and special balls
- Multiple difficulty levels
- Particle effects and animations
- Leaderboards and achievements
- Different ball and racquet skins

## 📄 Files

- `index.html` - Main game page
- `style.css` - Game styling and layout
- `game.js` - Core game logic and mechanics
- `README.md` - This documentation

## 🎮 Enjoy Playing!

Have fun keeping that tennis ball in the air! Challenge your friends to beat your high score and see who can become the ultimate Tennis Ball Tapper champion! 🏆



