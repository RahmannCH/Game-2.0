class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // We will generate procedural textures so the game works 100% even without external assets.
        // If you place actual images in assets/images/, you can load them here using this.load.image()
        this.generateProceduralAssets();
    }

    create() {
        this.scene.start('FarmScene');
    }

    generateProceduralAssets() {
        let g = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Player Idle
        g.fillStyle(0xffffff, 1);
        g.fillRoundedRect(0, 0, 32, 32, 16);
        g.fillStyle(0x000000, 1);
        g.fillCircle(10, 12, 3);
        g.fillCircle(22, 12, 3);
        g.generateTexture('player_idle', 32, 32);
        g.clear();

        // Player Walk
        g.fillStyle(0xdddddd, 1);
        g.fillRoundedRect(0, 2, 32, 30, 16);
        g.fillStyle(0x000000, 1);
        g.fillCircle(10, 14, 3);
        g.fillCircle(22, 14, 3);
        g.generateTexture('player_walk', 32, 32);
        g.clear();

        // Crop Base
        g.fillStyle(0xffffff, 1);
        g.beginPath();
        g.moveTo(16, 0);
        g.lineTo(32, 16);
        g.lineTo(16, 32);
        g.lineTo(0, 16);
        g.closePath();
        g.fillPath();
        g.generateTexture('crop_base', 32, 32);
        g.clear();

        // Farm Tile
        g.fillStyle(0x5c4033, 1);
        g.fillRect(0, 0, 64, 64);
        g.lineStyle(2, 0x3e2723, 1);
        g.strokeRect(0, 0, 64, 64);
        g.fillStyle(0x4a3020, 1);
        g.fillRect(10, 10, 10, 10);
        g.fillRect(40, 30, 8, 8);
        g.generateTexture('tile_farm', 64, 64);
        g.clear();

        // Shop Tile
        g.fillStyle(0x8b4513, 1);
        g.fillRect(0, 0, 64, 64);
        g.lineStyle(2, 0x5c4033, 1);
        g.moveTo(0, 16); g.lineTo(64, 16);
        g.moveTo(0, 32); g.lineTo(64, 32);
        g.moveTo(0, 48); g.lineTo(64, 48);
        g.strokePath();
        g.generateTexture('tile_wood', 64, 64);
        g.clear();

        // Ghost
        g.fillStyle(0xffffff, 1);
        g.fillRect(0, 0, 64, 64);
        g.generateTexture('ghost_cursor', 64, 64);
        g.clear();

        this.generateAudioSynthesizers();
    }

    generateAudioSynthesizers() {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // Simple synthetic sound creator for guaranteed 0-error audio
        const createSound = (key, freqs, type, duration) => {
            if (!this.sys.game.device.audio.webAudio) return;
            const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * duration, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) {
                const t = i / audioCtx.sampleRate;
                let wave = 0;
                if (type === 'sine') wave = Math.sin(2 * Math.PI * freqs[0] * t);
                else if (type === 'noise') wave = Math.random() * 2 - 1;
                data[i] = wave * Math.exp(-3 * t / duration); // decay
            }
            this.cache.audio.add(key, buffer);
        };

        createSound('sfx_plant', [300], 'noise', 0.2);
        createSound('sfx_harvest', [800], 'sine', 0.3);
        createSound('sfx_grow', [500], 'sine', 0.4);
    }
}

window.BootScene = BootScene;
