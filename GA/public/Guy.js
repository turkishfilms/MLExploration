class Guy {
    constructor({ x = random(width), y = STARTINGLINE, genes = { "up": random(GENERANRANGE), "right": random(GENERANRANGE), "down": random(GENERANRANGE), "left": random(GENERANRANGE),"color":[random(255),random(255),random(255)],"radius":STARTINGRADIUS }, score = STARTINGSCORE } = {}) {
        this.x = x
        this.y = y
        this.genes = genes
        this.score = score
    }

    move() {
        this.y += (this.genes.up - this.genes.down) * stepSize
        this.x += (this.genes.right - this.genes.left) * stepSize
    }

    score(){
        this.score = this.y
    }

    show(){
        ellipse(this.x,this.y,this.radius)
    }
}