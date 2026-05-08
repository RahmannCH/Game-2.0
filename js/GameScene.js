class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.gridSize = 32;
        this.location = 'FARM'; // FARM, SHOP, MARKET
    }

    preload() {
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Player
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(0, 0, 24, 32);
        graphics.generateTexture('player', 24, 32);
        graphics.clear();

        // Generic Seed
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(16, 16, 8);
        graphics.generateTexture('seed', 32, 32);
        graphics.clear();
        
        // Farm Grid
        graphics.lineStyle(1, 0x444444, 0.5);
        graphics.strokeRect(0, 0, 32, 32);
        graphics.generateTexture('grid', 32, 32);
    }

    create() {
        this.createFarm();
        
        // Player setup
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(100);

        // Ghost setup
        this.ghost = this.add.sprite(0, 0, 'seed');
        this.ghost.setAlpha(0.5);
        this.ghost.setTint(0x00ff00);
        this.ghost.setVisible(false);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE');

        this.input.on('pointermove', (p) => this.updateGhost(p));
        this.input.on('pointerdown', (p) => this.handleInteraction(p));

        // Signal listeners
        window.signalBus.on('system-msg', (msg) => this.showSystemLog(msg));
        window.signalBus.on('teleport', (loc) => this.teleport(loc));
    }

    createFarm() {
        this.location = 'FARM';
        this.add.tileSprite(0, 0, 2000, 2000, 'grid').setOrigin(0,0).setDepth(-1);
        this.cameras.main.setBackgroundColor('#2e8b57');
    }

    update() {
        const speed = 250;
        let vx = 0, vy = 0;

        if (this.keys.A.isDown || this.cursors.left.isDown) vx = -speed;
        else if (this.keys.D.isDown || this.cursors.right.isDown) vx = speed;

        if (this.keys.W.isDown || this.cursors.up.isDown) vy = -speed;
        else if (this.keys.S.isDown || this.cursors.down.isDown) vy = speed;

        this.player.setVelocity(vx, vy);
        if (vx !== 0) this.player.setFlipX(vx < 0);

        // Interaction with Space
        if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            this.tryPlantAtPlayer();
        }

        // Snap Ghost to nearest grid of player
        this.ghost.setVisible(this.location === 'FARM');
        if (this.location === 'FARM') {
            const gx = Math.floor(this.player.x / 32) * 32 + 16;
            const gy = Math.floor(this.player.y / 32) * 32 + 16;
            this.ghost.setPosition(gx, gy);
        }
    }

    updateGhost(pointer) {
        if (this.location !== 'FARM') return;
        const gx = Math.floor(pointer.worldX / 32) * 32 + 16;
        const gy = Math.floor(pointer.worldY / 32) * 32 + 16;
        this.ghost.setPosition(gx, gy);
    }

    handleInteraction(pointer) {
        if (this.location === 'FARM') {
            this.tryPlant(pointer.worldX, pointer.worldY);
        }
    }

    tryPlant(x, y) {
        const gx = Math.floor(x / 32) * 32 + 16;
        const gy = Math.floor(y / 32) * 32 + 16;

        const existing = this.children.list.find(c => c instanceof PalmTree && c.x === gx && c.y === gy);
        if (existing) return;

        if (window.economyManager.useSeed()) {
            new PalmTree(this, gx, gy, window.economyManager.selectedSeed);
        }
    }

    tryPlantAtPlayer() {
        this.tryPlant(this.player.x, this.player.y);
    }

    teleport(loc) {
        this.location = loc;
        window.signalBus.emit('system-msg', `Entering ${loc}...`);
        
        // Visual feedback for teleport
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.time.delayedCall(200, () => {
            this.cameras.main.fadeIn(200, 0, 0, 0);
            if (loc === 'SHOP') this.cameras.main.setBackgroundColor('#4682b4');
            else if (loc === 'MARKET') this.cameras.main.setBackgroundColor('#cd5c5c');
            else this.cameras.main.setBackgroundColor('#2e8b57');
        });
    }

    showSystemLog(msg) {
        const log = document.getElementById('system-log');
        log.innerText = msg;
        log.style.opacity = 1;
        this.time.delayedCall(3000, () => { log.style.opacity = 0.5; });
    }
}

window.GameScene = GameScene;
