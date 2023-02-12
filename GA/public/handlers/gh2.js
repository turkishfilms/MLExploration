/**
 * Creates a new Genetic Sim Handler
 * @class
 * @classdesc A Handler for various Genetic Algorithms
 * 
 * @param { Number } popSize - Size of population of Genes.
 * @param { Number } episodeLength -  How many steps per episode.
 * @param { Number } epochLength - How many episodes per epoch.
 * @param
 * Potentially User Supplied
 * 
 * Gene Prototype X
 * Selection Function
 * Scoring Function
 * Gene mixing function
 * Finale function
 */

class GeneticHandler {
    constructor({
        popSize = 0,
        geneType,
        hull,
        episodeLength = 0,
        epochLength = 0,
        selectionFx,
        scoringFx,
        geneMixingFx,
        finaleFx,
    } = {}) {
        this.popSize = popSize
        this.geneType = geneType
        this.episodeLength = episodeLength
        this.epochLength = epochLength
        this.episodeCounter = 0
        this.epochCounter = 0
        this.stepCounter = 0
        this.topScorers = []
        this.pop = []
        this.hull = new hull()
        this.selectionFx = selectionFx
        this.scoringFx = scoringFx
        this.geneMixingFx = geneMixingFx
        this.finaleFx = finaleFx
        console.log("Welcome to GASIM1 Where we GAs you up!")
        this.initPop()
    }


    /**
     * Initalizes population (pop)
     * @function
     * 
     */
    initPop = () => {
        for (let i = 0; i < this.popSize; i++) {
            this.addAgent(new this.geneType())
        }
    }

    /**
     * Accessor for this.pop
     * @param {geneType} agent The new agent to be added 
     * 
     */
    addAgent = (agent) => {
        if (typeof agent == this.geneType) {
            this.pop.push(agent)
        }
    }

    /**
     * Advances the sim one step
     * Checks for episode conclusion
     */
    step = () => {
        this.pop.forEach(gene => new this.hull({genes:gene}).step())
        this.incrementStepCount()
        if (this.didFinishEpisode()) {
            this.endEpisode()
            if (this.didFinishEpoch()) this.finaleFx()
            else this.startEpisode()
        }
    }
    /** Adds topScorer to this.topScorers
     * @param {Object} topScorer - The MVP of the last episode.
     * @param {Number} topScorer.episode - The episode he championed.
     * @param {Gene} topScorer.genes - The Gene responsible.
     * @param {Number} topScorer.score - The high score achieved.
     */
    addTopScorer(topScorer) { this.topScorers.push(topScorer) }
    didFinishEpisode = () => this.stepCounter >= this.episodeLength
    didFinishEpoch = () => this.episodeCounter >= this.epochLength
    incrementStepCount = () => this.stepCounter++
    incrementEpisodeCount = () => this.episodeCounter++
    setStepCounter = (count) => this.stepCounter = count
    finale = () => console.log("BOOOOOOG")
    scoreAgents = () => this.pop.forEach(agent => this.scoringFx(agent))
    setPop = (newPop) => this.pop = newPop

    startEpisode = () => {
        this.setStepCounter(0)
        this.incrementEpisodeCount()
    }

/**
     * End of episode
     * 
     * @issue survivors can be any assortment including bottom half of pop so that 
     *        means that topScorer may not be top of the batch just top of survivors
     */
    endEpisode = () => {
        this.scoreAgents()
        const survivors = this.selectionFx(this.pop) //
        const topSurvivor = {
            "episode": this.episodeCounter,
            "genes": survivors[0].genes,
            "score": survivors[0].score
        }
        this.addTopScorer(topSurvivor)
        const nexGeneration = this.geneMixingFx(survivors)
        survivors.forEach(agent => {
            nexGeneration.push(new this.hull({ genes: agent.genes }))
        })
        this.setPop(nexGeneration)
    }

    darwin = (pop) => {
        return pop.sort((a, b) => a.score - b.score).splice(this.popSize / 2)
    }

    /**
     * 
     * @param { Array } pop - A population to be mixed
     * @returns  { Array } - A mixed population
     */
    geneMixing = (pop) => {
        const mixedAgents = []
        pop.forEach(agent => {
            mixedAgents.push(new hull({
                genes: agent.geneMix(pop[floor(random(pop.length))])
            }))
        })
        return mixedAgents
    }
}