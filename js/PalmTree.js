class PalmTree extends Phaser.GameObjects.Container {
    constructor(scene, x, y, variant) {
        super(scene, x, y);
        scene.add.existing(this);
        
        this.variant = variant;
        this.data = window.SeedData.VARIANT[variant];
        this.stage = 0; // 0: Seed, stages-1: Fruiting
        
        // Visual
        this.visual = scene.add.sprite(0, 0, 'atlas', 'seed');
        this.add(this.visual);
        
        // Progress Bar
        this.progressBg = scene.add.rectangle(0, -25, 30, 4, 0x000000, 0.5);
        this.progressBar = scene.add.rectangle(-15, -25, 0, 4, 0x00ff00, 1);
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

        // Tween for progress bar
        this.scene.tweens.add({
            targets: this.progressBar,
            width: 30,
            duration: stageTime,
            onComplete: () => {
                if (this.stage < this.data.stages - 1) {
                    this.progressBar.width = 0;
                    if (this.stage < this.data.stages - 2) this.startGrowthTween(stageTime);
                }
            }
        });
    }

    startGrowthTween(duration) {
        this.scene.tweens.add({
            targets: this.progressBar,
            width: 30,
            duration: duration,
            onComplete: () => {
                if (this.stage < this.data.stages - 1) {
                    this.progressBar.width = 0;
                    this.startGrowthTween(duration);
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
        }
    }

    updateVisual() {
        const scaleBase = 0.3;
        const scaleStep = 0.2;
        const scale = scaleBase + (this.stage * scaleStep);
        this.visual.setScale(scale);
        
        // Procedural Coloring based on stage
        if (this.stage === this.data.stages - 1) {
            this.visual.setTint(0xffd700); // Fruiting (Gold)
        } else if (this.stage === 0) {
            this.visual.setTint(0x8b4513); // Seed (Brown)
        } else {
            this.visual.setTint(0x228b22); // Growing (Forest Green)
        }
    }

    onClicked() {
        if (this.stage === this.data.stages - 1) {
            window.signalBus.emit('add-to-harvest', this.variant);
            this.destroy();
        }
    }
}

window.PalmTree = PalmTree;
