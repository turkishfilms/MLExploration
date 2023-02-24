/**
 * Creats a gh2
 * @class
 * @classdesc Creates a GeneticHandler with bolt functions and Chromosome
 *  types
 * 
 * @param {Object} config - Holds each following number.
 * @param {Number} config.episodeLength 
 * @param {Number} config.epochLength 
 * @param {Number} config.popSize 
 * 
 * 
 * @param {Object} fxs - Holds each following function.
 * @param {Function} fxs.scoringFx - This function scores agents.
 * @param {Function} fxs.selectionFx - This function picks survivors.
 * @param {Function} fxs.finaleFx - This function runs at end of epoch.
 * @param {Function} fxs.chromosomeMixingFx - This function organizes the chromosome
 *  mixing process.
 * @param {Function} fxs.chromosomeMutationFx - This function mutates chromosomes.
 * 
 */

class BoltHandler extends GeneticHandler {
    constructor({ config, fxs } = {}) {
        super({
            popSize:config.popSize,
            chromosomeType: simpleBoltChromosome,
            hull: Bolt,
            episodeLength:config.episodeLength,
            epochLength: config.epochLength,
            selectionFx: fxs.selectionFx,
            scoringFx: fxs.scoringFx,
            chromosomeMixingFx: fxs.chromosomeMixingFx,
            finaleFx: fxs.finaleFx,
            
        })
        this.stepCustomFx = stepCustomFx
    }

    // this.drawLines()
        // this.displayStats()

        //bolt specific functions
    drawLines = () => {
        stroke(255, 0, 0)
        this.drawMaxScoreLine()
        stroke(0, 0, 255)
        this.drawCurrentLeaderLine()
        noStroke()
    }

    drawMaxScoreLine = () => {
        let y = 0
        if (this.topScorers.length != 0) y = this.topScorers.sort((a, b) => b.score - a.score)[0].score
        line(0, y, width, y)
    }

    drawCurrentLeaderLine = () => {
        const y = this.pop.sort((a, b) => a.y - b.y)[0].y
        line(0, y, width, y)
    }
}