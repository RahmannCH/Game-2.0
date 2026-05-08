class FarmScene extends Phaser.Scene {
    constructor() {
        super('FarmScene');
        this.gridSize = 64;
    }

    create() {
        this.cameras.main.setBackgroundColor('#2e8b57');
        this.add.tileSprite(0, 0, 4000, 4000, 'tile_farm').setOrigin(0,0).setDepth(-1);

        this.player = new Player(this, 400, 300);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5);

        this.ghost = this.add.sprite(0, 0, 'ghost_cursor');
        this.ghost.setAlpha(0.3);
        this.ghost.setTint(0x00ff00);
        this.ghost.setDepth(50);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE');

        this.input.on('pointermove', this.updateGhost, this);
        this.input.on('pointerdown', this.handleInteraction, this);

        window.signalBus.on('teleport', (loc) => this.teleport(loc));
    }

    update() {
        this.player.update(this.cursors, this.keys);

        if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
            this.tryPlant(this.player.x, this.player.y);
        }

        const gx = Math.floor(this.player.x / this.gridSize) * this.gridSize + this.gridSize/2;
        const gy = Math.floor(this.player.y / this.gridSize) * this.gridSize + this.gridSize/2;
        this.ghost.setPosition(gx, gy);

        // Y-Sort
        this.children.list.forEach(c => {
            if (c.y !== undefined && c !== this.ghost && c.depth > -1) {
                c.setDepth(c.y);
            }
        });
    }

    updateGhost(pointer) {
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const gx = Math.floor(worldPoint.x / this.gridSize) * this.gridSize + this.gridSize/2;
        const gy = Math.floor(worldPoint.y / this.gridSize) * this.gridSize + this.gridSize/2;
        this.ghost.setPosition(gx, gy);
    }

    handleInteraction(pointer) {
        if (pointer.rightButtonDown()) return;
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        this.tryPlant(worldPoint.x, worldPoint.y);
    }

    tryPlant(x, y) {
        const gx = Math.floor(x / this.gridSize) * this.gridSize + this.gridSize/2;
        const gy = Math.floor(y / this.gridSize) * this.gridSize + this.gridSize/2;

        const existing = this.children.list.find(c => c instanceof Crop && c.x === gx && c.y === gy);
        if (existing) return;

        if (window.economyManager.useSeed()) {
            new Crop(this, gx, gy, window.economyManager.selectedSeed);
            if (this.sys.game.device.audio.webAudio) {
                this.sound.play('sfx_plant', { volume: 0.5 });
            }
            
            // Dirt particle effect
            const particles = this.add.particles(gx, gy, 'crop_base', {
                speed: { min: 20, max: 60 },
                angle: { min: 240, max: 300 },
                scale: { start: 0.2, end: 0 },
                tint: 0x5c4033,
                lifespan: 400,
                quantity: 5
            });
            this.time.delayedCall(400, () => particles.destroy());
        }
    }

    teleport(loc) {
        if (loc === 'FARM') return;
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.time.delayedCall(300, () => {
            if (loc === 'SHOP') this.scene.start('ShopScene');
            if (loc === 'MARKET') this.scene.start('MarketScene');
        });
    }
}

window.FarmScene = FarmScene;
