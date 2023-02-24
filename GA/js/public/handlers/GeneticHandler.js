/**
 * Creates a new Genetic Sim Handler
 * @class
 * @classdesc A Handler for various Genetic Algorithms
 * 
 * @param { Number } popSize - Size of population of Chromosomes.
 * @param { Number } episodeLength -  How many steps per episode.
 * @param { Number } epochLength - How many episodes per epoch.
 * @param
 * Potentially User Supplied
 * 
 * Chromosome Prototype X
 * Selection Function
 * Scoring Function
 * Chromosome mixing function
 * Finale function
 */

class GeneticHandler {
    constructor({
        popSize = 0,
        chromosomeType,
        hull,
        episodeLength = 0,
        epochLength = 0,
        selectionFx,
        scoringFx,
        chromosomeMixingFx,
        finaleFx,
        pop = [],
    } = {}) {
        this.popSize = popSize
        this.chromosomeType = chromosomeType
        this.episodeLength = episodeLength
        this.epochLength = epochLength
        this.episodeCounter = 0
        this.epochCounter = 0
        this.stepCounter = 0
        this.topScorers = []
        this.pop = pop
        this.hull = hull
        this.builtInFxs = {
            scoring: { yValNeg: (agent) => agent.score = -agent.y },
            selection: {
                topHalf: (pop) => {
                    return pop.sort((b, a) => a.score - b.score)
                        .splice(0, floor(pop.length / 2))
                },
            },
            chromosomeMixing: {
                oneRandomPairEach: (pop) => {
                    const mixedAgents = []
                    pop.forEach(agent => {
                        mixedAgents.push(new this.hull({
                            chromosome: agent.chromosomeMix(pop[floor(random(pop.length))])
                        }))
                    })
                    return mixedAgents
                },
            },
            final: { boog: () => console.log("BOOOOOOG"), },
            geneMixing: {
                avg: (a, b) => {
                    const avgg = (a, b) => (a + b) / 2
                    const newGene = {}
                    genes = Object.keys(this.chromosomeType)
                    genes.forEach(gene => {
                        newGene[gene] = avgg(a.gene, b.gene)
                    })
                    return new this.chromosomeType(newGene)
                }
            },
            stats: {
                mean: (pop) => {
                    let tot = 0
                    pop.forEach(a => tot += a.score)
                    const m = tot / pop.length
                    return m
                }
            }
        }
        this.selectionFx = selectionFx || this.builtInFxs.selection.topHalf /**@issue how will a user access the builtins when making a new instance */
        this.scoringFx = scoringFx || this.builtInFxs.scoring.yValNeg /**@issue how will a user access the builtins when making a new instance */
        this.chromosomeMixingFx = chromosomeMixingFx || this.builtInFxs.chromosomeMixing.oneRandomPairEach /**@issue how will a user access the builtins when making a new instance */
        this.finaleFx = finaleFx || this.builtInFxs.final.boog /**@issue how will a user access the builtins when making a new instance */
        this.stepFx = 0

        console.log("Welcome to GASIM1 Where we GAs you up!")
        if (pop.length < 1) this.initPop(hull)
    }


    /**
     * Initalizes population (pop)
     * @function
     * @desc fills this.pop with default this.hull() agents
     */
    initPop = () => {
        for (let i = 0; i < this.popSize; i++) this.addAgent(new this.hull())
    }

    /**
     * Accessor for this.pop
     * @param {hull} agent The new agent to be added 
     * 
     */
    addAgent = (agent) => this.pop.push(agent)

    /**
     * Advances the sim one step
     * Checks for episode conclusion
     */
    step = (should) => {
        this.pop.forEach(agent => agent.step(should))
        this.scoreAgents()
        this.handleCount()
    }

    handleCount = () => {
        this.incrementStepCount()
        if (this.didFinishEpisode()) {
            this.endEpisode()
            if (this.didFinishEpoch()) this.finaleFx()
            else this.startEpisode()
        }
    }


    displayStats = () => {
        const curHighScore = this.pop.sort((a, b) => a.score - b.score)[0].score
        let highScore = curHighScore
        if (this.topScorers.length > 1) highScore = this.topScorers.sort((a, b) => a.score - b.score)[0]

        text(`${this.stepCounter} steps / ${this.episodeLength}`, 20, 60)
        text(`${this.episodeCounter}/${this.epochLength}`, 20, 80)
        text(`Highscore: ${highScore}`, 20, 20)
        text(`Current Highest: ${curHighScore}`, 20, 40)
    }

    /** Adds topScorer to this.topScorers
     * @param {Object} topScorer - The MVP of the last episode.
     * @param {Number} topScorer.episode - The episode he championed.
     * @param {Chromosome} topScorer.chromosome - The chromosome responsible.
     * @param {Number} topScorer.score - The high score achieved.
     */
    addTopScorer = (topScorer) => this.topScorers.push(topScorer)
    setPop = (newPop) => this.pop = newPop
    setStepCounter = (count) => this.stepCounter = count

    didFinishEpisode = () => this.stepCounter >= this.episodeLength
    didFinishEpoch = () => this.episodeCounter >= this.epochLength
    incrementStepCount = () => this.stepCounter++
    incrementEpisodeCount = () => this.episodeCounter++
    scoreAgents = () => this.pop.forEach(agent => this.scoringFx(agent))


    startEpisode = () => {
        this.setStepCounter(0)
        this.incrementEpisodeCount()
    }

    makeNextGen = () => {

    }

    topSurvivorify = (agent) => {
        return {
            "episode": this.episodeCounter,
            "chromosome": agent.chromosome,
            "score": agent.score
        }
    }
    /**
     * End of episode
     * 
     * @issue survivors can be any assortment, including bottom half of pop, so that 
     *        means that topScorer may not be top of the batch just top of survivors
     */
    endEpisode = () => {
        background(0)
        const survivors = this.selectionFx(this.pop)
        // console.log(survivors)
        this.addTopScorer(this.topSurvivorify(survivors[0]))
        const nexGeneration = this.chromosomeMixingFx(survivors)
        survivors.forEach(agent => {
            nexGeneration.push(new this.hull({ chromosome: agent.chromosome }))
        })
        this.setPop(nexGeneration)
    }
}