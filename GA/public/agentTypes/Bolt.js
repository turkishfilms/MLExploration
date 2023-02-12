/*
*TODONE Color Brightness
*TODONE Get sorted
*TODONE Gene Mixing
*TODONE Random Mutation 

TODO: Radius change based on score
TODO: color cahange based on genes
TODO: add age to the gene how man episode/steps
TODO: add apisode count on initiation birthday 
 */

/**Creates a Bolt
 * @class
 * @classdesc Bolt - Object used as agent for Genetic Algorithm 
 * 
 * @function move - Moves Bolt in 2d space
 * @function scoring - Calculates Bolts score and updates Bolt.score
 * @function geneMix 
 * @function mutate - Takes a Gene and modifes it
 * @function show - Draws Bolt on screen  
 * 
 * 
 * 
 */
class Bolt {
    constructor({
        x = random(width),
        y = height - STARTINGLINE,
        genes = new simpleBoltGene(),
    } = {}) {
        this.x = x
        this.y = y
        this.genes = genes
        this.score = 0
        this.speedDamp = 0.09
    }

    step(){
        this.move()
        this.show()
    }
    move() {
        this.y += -(this.genes.up - this.genes.down) * this.speedDamp
        this.x += (this.genes.right - this.genes.left) * this.speedDamp
    }

    /**
     * @function 
     * @param { Bolt } - The Bolt to have this Bolts Gene mixed with.
     * 
     * The chosenGenes array holds the results of NUMEDITABLEGENES number of 
     * coin flips
     * 
     * The newGenesArr holds a gene correspoding to either this Bolt or to the 
     * bolt passed in, for NUMEDITABLEGENES number of genes 
     * 
     * The mutatedGenes array holds the genes after they've been mutated
     * 
     * The newGene object collects the mutated genes into the proper gene format.
     * 
     * @returns {Gene} - New mixed and mutated Gene 
     */
    geneMix(bolt) {
        const chosenGenes = []
        for (let i = 0; i < NUMEDITABLEGENES; i++) {
            chosenGenes.push(random() > 0.5 ? 1 : 0)
        }
        const newGenesArr = [
            chosenGenes[0] ? this.genes.up : bolt.genes.up,
            chosenGenes[1] ? this.genes.right : bolt.genes.right,
            chosenGenes[2] ? this.genes.down : bolt.genes.down,
            chosenGenes[3] ? this.genes.left : bolt.genes.left,
        ]
        const mutatedGenes = this.mutate(newGenesArr)
        const newGene = new Gene({
            up: mutatedGenes[0],
            right: mutatedGenes[1],
            down: mutatedGenes[2],
            left: mutatedGenes[3],
            color: [random(255), random(255), random(255)],
            radius: STARTINGRADIUS
        })
        return newGene
    }

    mutate(gene) {
        const muted = floor(random(5))
        const mutAmt = random(4)
        const mutSign = random() > 0.5 ? 1 : -1
        gene[muted] += mutAmt * mutSign
        return gene
    }

    show() {
        const col = this.genes.color
        fill(col[0] + BRIGHTNESS, col[1] + BRIGHTNESS, col[2] + BRIGHTNESS)
        ellipse(this.x, this.y, this.genes.radius)
    }
}