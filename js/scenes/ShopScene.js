class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#4682b4');
        this.add.tileSprite(0, 0, 4000, 4000, 'tile_wood').setOrigin(0,0).setDepth(-1);

        this.player = new Player(this, 400, 300);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(1.5);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D');

        // NPC / Stall
        const stall = this.add.rectangle(400, 200, 120, 80, 0x8b4513).setDepth(200);
        this.add.rectangle(400, 180, 140, 20, 0x1e90ff).setDepth(200); // Awning
        this.add.text(400, 200, 'SEED SHOP', { font: 'bold 16px Arial', fill: '#fff' }).setOrigin(0.5).setDepth(201);

        window.signalBus.on('teleport', (loc) => this.teleport(loc));
    }

    update() {
        this.player.update(this.cursors, this.keys);
        
        this.children.list.forEach(c => {
            if (c.y !== undefined && c.depth > -1 && c.depth < 200) {
                c.setDepth(c.y);
            }
        });
    }

    teleport(loc) {
        if (loc === 'SHOP') return;
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.time.delayedCall(300, () => {
            if (loc === 'FARM') this.scene.start('FarmScene');
            if (loc === 'MARKET') this.scene.start('MarketScene');
        });
    }
}

window.ShopScene = ShopScene;
