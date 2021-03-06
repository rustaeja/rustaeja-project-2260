var Player = enchant.Class.create(enchant.Sprite, {
	initialize: function(spritePath, spriteWidth, spriteHeight, scale, posX, posY, movementSpeed, gravity, frameCount) {
		var gameInstance = enchant.Game.instance;

		Sprite.call(this, spriteWidth, spriteHeight);
        this.originX = this.width/2;
        this.originY = this.height/2;
		this.image = gameInstance.assets[spritePath];
		this.movementSpeed = movementSpeed;
		this.frameCount = frameCount;
		this.x = posX - this.originX;
		this.y = posY - this.originY;
		this.gravity = gravity;
        this.scale(scale, scale);
	},


	onenterframe: function() {
        framesToWait = 3;
		this.frame = Math.floor(this.age / framesToWait) % this.frameCount;
		if (this.y + this.gravity + this.height*this.scaleX < enchant.Game.instance.height) {
			this.y = this.y + this.gravity;
		}
	},

	look: function(direction) {
		if (direction === "left" && this.scaleX < 0) {
			this.scaleX *= -1;
		}
		else if (direction === "right" && this.scaleX > 0) {
			this.scaleX *= -1;
		}
	},

	grow: function() {
        if (Math.abs(this.scaleY) < 0.8) {
            var scaleBy = 1.1;
	    	this.scale(scaleBy, scaleBy);
		    this.movementSpeed *= scaleBy; 
        }
	},

    kill: function() {
        window.alert("Game Over");
    },

    getScaledX: function() {
        return this.x + this.originX;
    },

    getScaledY: function() {
        return this.y + this.originY;
    },

    getScaledHeight: function() {
        return this.height*this.scaleY;
    }


});
