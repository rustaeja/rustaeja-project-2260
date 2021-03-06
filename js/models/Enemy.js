var Enemy = enchant.Class.create(enchant.Sprite, {
	initialize:function(enemyMetaData, scene, callback) {
		var game = enchant.Game.instance;

		Sprite.call(this, enemyMetaData.width, enemyMetaData.height);
		this.image = game.assets[enemyMetaData.path];
		this.frameCount = 0;
        this.width = enemyMetaData.width;
        this.height = enemyMetaData.height;
		this.dx = 0;
		this.dy = 0;
        this.dir = enemyMetaData.dir;
		this.dead = false; // false
		this.scene = scene;
        this.callback = callback;		
        this.randomizeSize(enemyMetaData.minScale, enemyMetaData.maxScale);
	},

	randomizeSize:function(minScale, maxScale) {
		var randomScale = (Math.random() * (maxScale - minScale)) + minScale;
		this.scale(randomScale, randomScale);
	},

	move:function(topLimit) {
		var game = enchant.Game.instance;
		if (this.frameCount <= 0) {
			var randomSpeed = Math.floor(Math.random()*6 - 3);
            if (this.dir === "vertical") {
                this.y += randomSpeed;
                this.dx = 0;
                this.dy = randomSpeed;
            } else if (this.dir === "horizontal") {
                this.x += randomSpeed;
                this.dx = randomSpeed;
                this.dy = 0;
			} else if (this.dir ==="fly") {
				
            } else {
				var xDif = this.scene.player.getScaledX() - this.x;
				var yDif = this.scene.player.getScaledY() - this.y;
				// too far, don't chase
				if (Math.abs(xDif) > game.width || 
					Math.abs(yDif) > game.height ||
					Math.abs(this.scaleX) <= Math.abs(this.scene.player.scaleX)) {
					var randomSpeed2 = Math.floor(Math.random()*6 - 3);
					this.x += randomSpeed;
					this.y += randomSpeed2;
					this.dx = randomSpeed;
					this.dy = randomSpeed2;
				// chasing
				} else {
					var randomAcceleration = Math.random();
					var xSpeed = Math.floor(Math.sqrt(Math.abs(xDif * randomAcceleration)) % 3) + 1;
					var ySpeed = Math.floor(Math.sqrt(Math.abs(yDif * randomAcceleration)) % 3) + 1;
					if (xDif < 0) {
						xSpeed = -xSpeed;
					}
					if (yDif < 0) {
						ySpeed = -ySpeed;
					}
					this.x += xSpeed;
					this.y += ySpeed;
					this.dx = xSpeed;
					this.dy = ySpeed;
				}
            }
			this.frameCount = Math.floor(Math.random()*20);
		} else {
			this.frameCount = this.frameCount - 1;
			this.x += this.dx;
			this.y += this.dy;
		}

		if (this.y < topLimit) {
			this.y = topLimit;
		}

		if (this.x > (game.width + game.width) || this.x < -game.width) {
            this.kill();
		} else if (this.y > (game.height + 100)) {
            this.kill();
		}
	},

    kill:function() {
        this.dead = true;
        this.callback(this);
    },

	randomizePosition:function(topLimit) {
		var game = enchant.Game.instance;
        
        if (this.dir === "vertical") {
            var random = Math.floor(Math.random() * game.width);
            this.x = random;
            this.y = game.height;	// don't spawn from the top
        } 
        else {
            var random = Math.floor(Math.random() * (game.height - topLimit));
            this.y = random + topLimit;
			
			// Randomize Left or Right to enter from
			var randomEnter = Math.floor(Math.random()*2);

            if (randomEnter === 0) {
                // Enemy spawn from left
				this.scaleX = -this.scaleX;
                this.x = -game.width/2; // idk why this works, should be whats below
				//-(this.width * Math.abs(this.scaleX));
            } 
            else {
                // Enemy spawn from right
                this.x = game.width;
            }
        }
	}
});
