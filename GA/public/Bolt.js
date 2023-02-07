/**
Color Brightness
Get sorted
Gene Mixing
Random Mutation 
Radius change based on score
color cahange based on genes
add age to the gene how man episode/steps
add apisode count on initiation birthday 
 */


class Bolt {
    constructor({ x = random(width), y = STARTINGLINE, genes = { "up": random(GENERANRANGE), "right": random(GENERANRANGE), "down": random(GENERANRANGE), "left": random(GENERANRANGE), "color": [random(255), random(255), random(255)], "radius": STARTINGRADIUS }, score = STARTINGSCORE } = {}) {
        this.x = x
        this.y = y
        this.genes = genes
        this.score = score
    }

    move() {
        this.y += (this.genes.up - this.genes.down) * stepSize
        this.x += (this.genes.right - this.genes.left) * stepSize
    }

    scoring() {
        this.score = this.y
    }

    geneMix(guy) {
        chosenGenes = []
        for (let i = 0; i < NUMEDITABLEGENES; i++) chosenGenes.push(random() > 0.5 ? 1 : 0)
        newGenes = [chosenGenes ? this.up : guy.up, chosenGenes ? this.rigth : guy.right, chosenGenes ? this.down : guy.down, chosenGenes ? this.left : guy.left, ]
        newGene = { "up": newGenes[0], "right": newGenes[1], "down": newGenes[2], "left": newGenes[3], "color": [random(255), random(255), random(255)], "radius": STARTINGRADIUS }
        return newGene
    }

    show() {
        fill(this.genes.color)
        ellipse(this.x, this.y, this.radius)
    }
}