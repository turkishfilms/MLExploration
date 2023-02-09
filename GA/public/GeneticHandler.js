/**
 * Creates a new Genetic Sim Handler
 * @class
 * @classdesc A Handler for various Genetic Algorithms
 * 
 * @param 
 * @param
 * @param
 * @param
 * 
 */

class GeneticHandler {
    constructor({
        popSize = 0,
        geneType = Gene,
        episodeLength = 0,
        epochLength = 0,
    } = {}) {
        this.popSize = popSize
        this.geneType = geneType
        this.episodeLength = episodeLength
        this.epochLength = epochLength
        this.episodeCounter = 0
        this.epochCounter = 0
        topScorers = []
        pop = []
        this.initPop()
    }

    /**
     * Initalizes population (pop)
     * @function
     * 
     */
    initPop = () => {
        for (let i = 0; i < this.popSize; i++) this.addAgent(new Bolt())
    }

    /**
     * Accessor for this.pop
     * @param {typeof geneType} agent The new agent to be added 
     * 
     */
    addAgent = (agent) => this.pop.push(agent)

    /**
     * Advances the sim one step
     * Checks for episode conclusion
     */
    step = () => {
        pop.forEach(agent => agent.step())
        this.incrementStepCount()
        if (this.didFinishEpisode()) {
            this.endEpisode()
            if (this.didFinishEpoch()) this.finale()
            else this.startEpisode()
        }
    }

    didFinishEpisode = () => this.stepCounter >= this.episodeLength
    didFinishEpoch = () => this.episodeCounter >= this.epochLength
    incrementStepCount = () => this.stepCounter++
    incrementEpisodeCount = () => this.episodeCounter++
    setStepCounter = (count) => this.stepCounter = count
    finale = () => console.log("BOOOOOOG")

    startEpisode = () => {
        this.setStepCounter(0)
        this.incrementEpisodeCount()
    }

    /**
     * 
     * 
     * @issue survivors can be any assortment including bottom half of pop so that 
     *        means that topScorer may not be top of the batch just top of survivors
     */
    endEpisode = () => {
        pop.forEach(agent => agent.scoring())
        const survivors = darwin(pop)
        const topSurvivor = {
            "episode": episodeCounter,
            "genes": survivors[0].genes,
            "score": survivors[0].score
        }
        this.addTopScorer(topSurvivor)

        const nexGeneration = this.geneMixing(survivors)
        survivors.forEach(elite => newBolts.push(new Bolt({ genes: survivors.genes })))
        // bolts = []
        bolts = newBolts
        // console.log(survivors[0].score)

    }

    darwin = (pop) => {
        return pop.sort((a, b) => a.score - b.score).splice(this.popSize / 2)
    }


    /** Adds topScorer to this.topScorers
     * @param {Object} topScorer - The MVP of the last episode.
     * @param {Number} topScorer.episode - The episode he championed.
     * @param {Gene} topScorer.genes - The Gene responsible.
     * @param {Number} topScorer.score - The high score achieved.
     */
    addTopScorer(topScorer) { this.topScorers.push(topScorer) }


    geneMixing = (bolts) => {
        // take in n bolts
        const boltsL = bolts.length,
            mixedBolts = []
        bolts.forEach(bolt => {
            mixedBolts.push(new Bolt({ genes: bolt.geneMix(bolts[floor(random(boltsL))]) }))
        })
        return mixedBolts
        // return an array of n mixed up and mutated bolts
    }
}