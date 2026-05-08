class Crop extends Phaser.GameObjects.Container {
    constructor(scene, x, y, variant) {
        super(scene, x, y);
        scene.add.existing(this);
        
        this.variant = variant;
        this.data = window.SeedData.VARIANT[variant];
        this.stage = 0; 
        
        this.visual = scene.add.sprite(0, 0, 'crop_base');
        this.add(this.visual);
        
        this.progressBg = scene.add.rectangle(0, -25, 30, 6, 0x000000, 0.6);
        this.progressBar = scene.add.rectangle(-15, -25, 0, 6, 0x00ff00, 1);
        this.progressBar.setOrigin(0, 0.5);
        this.add(this.progressBg);
        this.add(this.progressBar);

        this.setInteractive(new Phaser.Geom.Rectangle(-16, -16, 32, 32), Phaser.Geom.Rectangle.Contains);
        this.on('pointerdown', this.onClicked, this);

        this.startGrowth();
        this.updateVisual();
    }

    startGrowth() {
        const stageTime = this.data.growthTime / (this.data.stages - 1);
        this.growthTimer = this.scene.time.addEvent({
            delay: stageTime,
            callback: this.nextStage,
            callbackScope: this,
            repeat: this.data.stages - 2
        });

        this.startGrowthTween(stageTime);
    }

    startGrowthTween(duration) {
        this.scene.tweens.add({
            targets: this.progressBar,
            width: 30,
            duration: duration,
            onComplete: () => {
                if (this.stage < this.data.stages - 1) {
                    this.progressBar.width = 0;
                    if (this.stage < this.data.stages - 2) this.startGrowthTween(duration);
                }
            }
        });
    }

    nextStage() {
        this.stage++;
        this.updateVisual();
        if (this.stage >= this.data.stages - 1) {
            this.progressBar.setVisible(false);
            this.progressBg.setVisible(false);
            if (this.scene.sys.game.device.audio.webAudio) {
                this.scene.sound.play('sfx_grow', { volume: 0.5 });
            }
        }
    }

    updateVisual() {
        const scaleBase = 0.4;
        const scaleStep = 0.6 / (this.data.stages - 1);
        const scale = scaleBase + (this.stage * scaleStep);
        this.visual.setScale(scale);
        
        if (this.stage === this.data.stages - 1) {
            this.visual.setTint(this.data.colors.fruit);
            this.visual.y = -5;
            this.scene.tweens.add({
                targets: this.visual,
                y: -10,
                yoyo: true,
                repeat: -1,
                duration: 800,
                ease: 'Sine.easeInOut'
            });
        } else if (this.stage === 0) {
            this.visual.setTint(this.data.colors.seed);
        } else {
            this.visual.setTint(this.data.colors.grow);
        }
    }

    onClicked() {
        if (this.stage === this.data.stages - 1) {
            window.signalBus.emit('add-to-harvest', this.variant);
            if (this.scene.sys.game.device.audio.webAudio) {
                this.scene.sound.play('sfx_harvest', { volume: 0.8 });
            }
            
            // Pop effect
            const pop = this.scene.add.text(this.x, this.y - 20, '+1', { font: 'bold 20px Arial', fill: '#fff', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
            this.scene.tweens.add({
                targets: pop,
                y: this.y - 50,
                alpha: 0,
                duration: 1000,
                onComplete: () => pop.destroy()
            });

            this.destroy();
        }
    }
}

window.Crop = Crop;
