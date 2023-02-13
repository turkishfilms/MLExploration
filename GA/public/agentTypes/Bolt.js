/*
*TODONE Color Brightness
*TODONE Get sorted
*TODONE chromosome Mixing
*TODONE Random Mutation 

TODO: Radius change based on score
TODO: color cahange based on chromosomes
TODO: add age to the chromosome how man episode/steps
TODO: add apisode count on initiation birthday 
 */

/**Creates a Bolt
 * @class
 * @classdesc Bolt - Object used as agent for Genetic Algorithm 
 * 
 * @function move - Moves Bolt in 2d space
 * @function scoring - Calculates Bolts score and updates Bolt.score
 * @function chromosomeMix 
 * @function mutate - Takes a chromosome and modifes it
 * @function show - Draws Bolt on screen  
 * 
 * 
 * 
 */
class Bolt {
    constructor({
        x = random(width),
        y = height - STARTINGLINE,
        chromosome = new simpleBoltChromosome(),
        chromosomeType = simpleBoltChromosome,
        speedDamp = 0.09,
    } = {}) {
        this.x = x
        this.y = y
        this.chromosome = chromosome
        this.chromosomeType = chromosomeType
        this.score = 0
        this.speedDamp = speedDamp
    }

    step(){
        this.move()
        this.show()
    }
    move() {
        this.y += -(this.chromosome.up - this.chromosome.down) * this.speedDamp
        this.x += (this.chromosome.right - this.chromosome.left) * this.speedDamp
    }

    /**
     * @function 
     * @param { Bolt } - The Bolt to have this Bolts chromosome mixed with.
     * 
     * The chosenGenes array holds the results of NUMEDITABLEGENES number of 
     * coin flips
     * 
     * The newGenesArr holds a gene correspoding to either this Bolt or to the 
     * bolt passed in, for NUMEDITABLEGENES number of genes 
     * 
     * The mutatedGenes array holds the genes after they've been mutated
     * 
     * The newGene object collects the mutated genes into the proper Chromosom format.
     * 
     * @returns {Chromosome} - New mixed and mutated Chromosome 
     */
    chromosomeMix(bolt) {
        const chosenGenes = []
        for (let i = 0; i < NUMEDITABLEGENES; i++) {
            chosenGenes.push(random() > 0.5 ? 1 : 0)
        }
        const newGenesArr = [
            chosenGenes[0] ? this.chromosome.up : bolt.chromosome.up,
            chosenGenes[1] ? this.chromosome.right : bolt.chromosome.right,
            chosenGenes[2] ? this.chromosome.down : bolt.chromosome.down,
            chosenGenes[3] ? this.chromosome.left : bolt.chromosome.left,
        ]
        const mutatedGenes = this.mutate(newGenesArr)
        const newChromosome = new this.chromosomeType({
            up: mutatedGenes[0],
            right: mutatedGenes[1],
            down: mutatedGenes[2],
            left: mutatedGenes[3],
            color: [random(255), random(255), random(255)],
            radius: STARTINGRADIUS
        })
        return newChromosome
    }

    mutate(chromosome) {
        const muted = floor(random(5))
        const mutAmt = random(4)
        const mutSign = random() > 0.5 ? 1 : -1
        chromosome[muted] += mutAmt * mutSign
        return chromosome
    }

    show() {
        const col = this.chromosome.color
        fill(col[0] + BRIGHTNESS, col[1] + BRIGHTNESS, col[2] + BRIGHTNESS)
        ellipse(this.x, this.y, this.chromosome.radius)
    }
}