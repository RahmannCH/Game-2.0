# Tycoon 2.0 - Advanced Farm Simulator

A feature-rich farm simulation game built with [Phaser 3](https://phaser.io/) and vanilla JavaScript. Build your dream farm, grow crops, manage your economy, and experience the challenges of running a successful agricultural business.

![Game Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Phaser](https://img.shields.io/badge/phaser-3.60.0-orange)

## Features

- **Dynamic Farm Management**: Plant, grow, and harvest crops with realistic crop cycles
- **Economy System**: Earn money from sales, manage expenses, and expand your farm
- **Interactive Gameplay**: Click-based farming with smooth animations
- **Sound Effects**: Immersive audio for digging, harvesting, and game events
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progressive Expansion**: Unlock new crops and farm areas as you progress
- **Persistent State**: Game saves local progress (in development)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RahmannCH/Game-2.0.git
   cd Game-2.0
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The game will be available at `http://localhost:8080`

### Local Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload (port 8080) |
| `npm start` | Alias for `npm run dev` |
| `npm run serve` | Run server on port 3000 |
| `npm run preview` | Preview the build on port 3000 |
| `npm run build` | (Static site - no build step needed) |

## Project Structure

```
Tycoon-2.0/
├── index.html                 # Main HTML entry point
├── package.json              # Project dependencies and scripts
├── vercel.json              # Vercel deployment configuration
├── .env.production          # Production environment variables
│
├── js/                       # Game source code
│   ├── main.js             # Game initialization and setup
│   ├── GameScene.js        # Main game scene logic
│   ├── EconomyManager.js   # Currency and economy system
│   ├── SeedData.js         # Crop and seed definitions
│   ├── PalmTree.js         # Palm tree game object
│   └── SignalBus.js        # Event/signal management
│
├── css/                      # Stylesheets
│   └── style.css           # Main game styles
│
├── assets/                   # Game assets
│   ├── images/
│   │   └── player_spritesheet.png.png
│   └── audio/
│       ├── harvest.wav
│       ├── digging-up-the-soil-and-paus6qav.wav
│       └── se_5g4kq4lb7fojfqzk.wav
│
├── Documentation/
│   ├── QUICK_START.md       # 5-minute deployment guide
│   ├── DEPLOYMENT.md        # Full deployment documentation
│   ├── CUSTOM_DOMAIN_SETUP.md  # Domain configuration guide
│   └── PRODUCTION_CHECKLIST.md # Pre-launch verification
│
└── .vercel/                  # Vercel project configuration
```

## Game Controls

- **Click on Soil**: Start digging/farming
- **Click on Crops**: Harvest grown crops
- **Click on Shop Items**: Purchase seeds or farm upgrades
- **Monitor Resources**: Track money, crops, and farm stats in the UI

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Phaser 3** | Game framework and rendering |
| **JavaScript (ES6+)** | Game logic and mechanics |
| **HTML5** | Game container and semantic markup |
| **CSS3** | Styling and responsive layout |
| **WebGL/Canvas** | Rendering with hardware acceleration |

## Deployment

### Quick Deploy to Vercel

For a complete deployment guide with custom domain setup, see [QUICK_START.md](QUICK_START.md).

**Basic Deployment:**

```bash
# Push to production-deployment branch
git push origin production-deployment

# Then either:
# 1. Use Vercel Dashboard: https://vercel.com/dashboard
# 2. Or use Vercel CLI: vercel deploy
```

### Custom Domain Setup

To configure a custom domain (e.g., yourgame.com), follow [CUSTOM_DOMAIN_SETUP.md](CUSTOM_DOMAIN_SETUP.md).

### Production Features

- ✅ Optimized caching (1-year immutable assets, smart HTML caching)
- ✅ Security headers (XSS, clickjacking, content-type protection)
- ✅ HTTPS/SSL (automatic via Vercel)
- ✅ Global CDN distribution
- ✅ Performance monitoring
- ✅ Custom domain support

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed information.

## Architecture

### Game Scene Structure

```
GameScene (Main Game Logic)
├── Physics System (if needed for interactions)
├── Input Handler (Click detection)
├── Graphics Rendering (Sprites, text, UI)
├── Sound Manager (Audio playback)
├── EconomyManager (Currency system)
└── SignalBus (Event system)
```

### Key Systems

**Economy Manager**: Handles currency, transactions, and financial operations
**Signal Bus**: Event-driven communication between game systems
**Seed Data**: Defines crop properties, growth times, and harvest values
**Game Scene**: Main game loop, user input, and rendering

## Development Workflow

### Creating Features

1. Add new game objects in `GameScene.js`
2. Register events in `SignalBus.js`
3. Update economy if needed in `EconomyManager.js`
4. Test locally with `npm run dev`
5. Commit changes to `production-deployment` branch

### Adding New Crops

1. Define crop in `SeedData.js` with growth time and value
2. Add crop spawning logic in `GameScene.js`
3. Update UI to show new crop
4. Test the crop cycle

### Adding Sound Effects

1. Place audio file in `assets/audio/`
2. Load in `GameScene.js`: `this.sound.add('key', { file: 'path' })`
3. Play on game events

## Performance Optimization

- **Asset Caching**: 1-year cache on images, scripts, styles
- **Lazy Loading**: Load non-essential assets on demand
- **WebGL Rendering**: Hardware-accelerated graphics
- **Audio Compression**: Optimized WAV files for smaller download

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | WebGL, modern APIs |
| Firefox | ✅ Full | WebGL, modern APIs |
| Safari | ✅ Full | iOS 12+ recommended |
| Mobile Browsers | ✅ Full | Touch-optimized |

## Troubleshooting

### Game Not Loading

- Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Check console for errors: `F12` → Console tab
- Verify all assets are loading in Network tab

### Performance Issues

- Close background applications
- Reduce browser tabs open
- Try a different browser
- Check system GPU drivers are updated

### Sound Not Playing

- Verify audio files exist in assets folder
- Check browser volume settings
- Some browsers require user interaction before playing audio

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support & Resources

- **Phaser Documentation**: https://photonstorm.github.io/phaser3-docs/
- **GitHub Issues**: https://github.com/RahmannCH/Game-2.0/issues
- **Deployment Help**: See DEPLOYMENT.md and QUICK_START.md

## Author

**RahmannCH** - Game Developer

- GitHub: https://github.com/RahmannCH
- Repository: https://github.com/RahmannCH/Game-2.0

## Roadmap

- [ ] Player profile & achievements system
- [ ] Multiplayer/co-op farming
- [ ] Advanced weather system
- [ ] Animal husbandry (chickens, cows, etc.)
- [ ] Crop pests and disease system
- [ ] Trading system with NPCs
- [ ] Mobile app version
- [ ] Leaderboard system

## Changelog

### v1.0.0 - Initial Release
- Core farming mechanics
- Crop system with growth cycles
- Economy system with currency
- Sound effects and animations
- Production deployment ready
- Custom domain support

---

**Last Updated**: May 8, 2026  
**Build**: Vercel Deployment Ready
