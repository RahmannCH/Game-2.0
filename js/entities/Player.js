class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setDepth(100);
        
        // Adjust hitbox
        this.body.setSize(20, 20);
        this.body.setOffset(6, 12);

        this.speed = 250;
        this.createAnimations(scene);
    }

    createAnimations(scene) {
        if (!scene.anims.exists('walk_down')) {
            scene.anims.create({
                key: 'walk_down',
                frames: [ { key: 'player_idle' }, { key: 'player_walk' } ],
                frameRate: 6,
                repeat: -1
            });
        }
        if (!scene.anims.exists('idle')) {
            scene.anims.create({
                key: 'idle',
                frames: [ { key: 'player_idle' } ],
                frameRate: 1,
                repeat: -1
            });
        }
    }

    update(cursors, keys) {
        let vx = 0;
        let vy = 0;

        if (keys.A.isDown || cursors.left.isDown) vx = -this.speed;
        else if (keys.D.isDown || cursors.right.isDown) vx = this.speed;

        if (keys.W.isDown || cursors.up.isDown) vy = -this.speed;
        else if (keys.S.isDown || cursors.down.isDown) vy = this.speed;

        this.setVelocity(vx, vy);

        if (vx !== 0 || vy !== 0) {
            this.play('walk_down', true);
            if (vx < 0) this.setFlipX(true);
            else if (vx > 0) this.setFlipX(false);
        } else {
            this.play('idle', true);
        }
    }
}

window.Player = Player;
