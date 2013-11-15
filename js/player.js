var player = function() {
	var x,y;
	var vx = 0, vy = 0;
	var currentAI;
	var friction = 1.5;
	var trail = [];
	var hasHitWall = false;
	var gridSize;

	var init = function(gSize) {
		gridSize = gSize;
		vx = 0;
		vy = 0;
		this.trail.length = 0;
	}

	var setAI = function(ai){
		this.trail.length = 0;
		this.x = ai.x;
		this.y = ai.y;
		this.currentAI = ai;
	}

	var getAI = function() {
		this.currentAI.x = this.x;
		this.currentAI.y = this.y;
		return this.currentAI;
	}
	var update = function(gridSize) {
		this.trail.push([this.x, this.y]);
		if (this.trail.length >= 5) this.trail.shift();

		if(input.right) {
            if (vx <= gridSize / 10) vx += (Math.abs(vx) + 1) / friction;
		}
        else if(input.left) {
            if (vx >= -gridSize / 10) vx -= (Math.abs(vx) + 1) / friction;
        }

        if(input.up){
            if (vy >= -gridSize / 10) vy -= (Math.abs(vy) + 1) / friction;
        }
        else if(input.down) {
            if (vy <= gridSize / 10) vy += (Math.abs(vy) + 1) / friction;
        }
        if(!input.right && !input.left && !input.up && !input.down) {
        	vx = vx / friction;
        	vy = vy / friction;
        }

		this.x += vx;
		this.y += vy;
	}

	var onCollide = function(tile){

	}

	var hitWall = function() {
		this.hasHitWall = true;
		this.x = this.trail[1][0] || this.x;
		this.y = this.trail[1][1] || this.y;
		vx *= -0.7;
		vy *= -0.7;
	}

	var getVelocity = function() {
		return {
			x:vx,
			y:vy,
		}
	}

	return {
		x: x,
		y: y,
		color: "rgb(109, 207, 246)",//"rgba(0, 10, 200, 0.4)",
		trail: trail,
		hasHitWall: hasHitWall,
		onCollide: onCollide,
		getVelocity: getVelocity,
		init: init,
		setAI: setAI,
		getAI: getAI, 
		update: update,
		hitWall: hitWall,
	}
}();