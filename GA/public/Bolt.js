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
    constructor({ x = random(width), y = height - STARTINGLINE, genes = { "up": random(GENERANRANGE), "right": random(GENERANRANGE), "down": random(GENERANRANGE), "left": random(GENERANRANGE), "color": [random(255 - BRIGHTNESS), random(255 - BRIGHTNESS), random(255 - BRIGHTNESS)], "radius": STARTINGRADIUS }, score = STARTINGSCORE } = {}) {
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

    geneMix(bolt) {
        const chosenGenes = []
        for (let i = 0; i < NUMEDITABLEGENES; i++) chosenGenes.push(random() > 0.5 ? 1 : 0)
        // console.log(this.genes.up, chosenGenes)
        const newGenesArr = [chosenGenes[0] ? this.genes.up : bolt.genes.up, chosenGenes[1] ? this.genes.right : bolt.genes.right, chosenGenes[2] ? this.genes.down : bolt.genes.down, chosenGenes[3] ? this.genes.left : bolt.genes.left, ]
        const newGenes = this.mutate(newGenesArr)

        const newGene = { up: newGenes[0], right: newGenes[1], down: newGenes[2], left: newGenes[3], color: [random(255), random(255), random(255)], radius: STARTINGRADIUS }
        return newGene
    }

    mutate(gene) {
        // console.log(gene)
        const muted = floor(random(5))
        const mutAmt = random(4)
        const mutSign = random() > 0.5 ? 1 : -1
        gene[muted] += mutAmt * mutSign
        // console.log(gene, "!")
        return gene
    }

    show() {
        fill(this.genes.color[0] + BRIGHTNESS, this.genes.color[1] + BRIGHTNESS, this.genes.color[2] + BRIGHTNESS)
        ellipse(this.x, this.y, this.genes.radius)
    }
}