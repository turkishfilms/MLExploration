/**
 * Creats a gh2
 * @class
 * @classdesc creates a genetic handler with bolt functions and gene
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
 * @param {Function} fxs.geneMixingFx - This function organizes the gene
 *  mixing process.
 * @param {Function} fxs.geneMutationFx - This function mutates genes.
 * 
 */

class BoltHandler extends GeneticHandler {
    constructor({ config, fxs } = {}) {
        super({
            popSize:config.popSize,
            geneType: simpleBoltGene,
            hull: Bolt,
            episodeLength:config.episodeLength,
            epochLength: config.epochLength,
            selectionFx: fxs.selectionFx,
            scoringFx: fxs.scoringFx,
            geneMixingFx: fxs.geneMixingFx,
            finaleFx: fxs.finaleFx,
        })
        
    }
}