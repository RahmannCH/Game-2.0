const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    pixelArt: true, // Forces crisp pixel art rendering
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, FarmScene, ShopScene, MarketScene]
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

// Navigation Binding
document.getElementById('nav-shop').addEventListener('click', () => {
    window.signalBus.emit('teleport', 'SHOP');
});

document.getElementById('nav-farm').addEventListener('click', () => {
    window.signalBus.emit('teleport', 'FARM');
});

document.getElementById('nav-market').addEventListener('click', () => {
    window.signalBus.emit('teleport', 'MARKET');
});
