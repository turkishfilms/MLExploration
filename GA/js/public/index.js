/**stepCount
 * TODONE
 * TODONE implement step counter for episode
 * TODONE sorting bolts
 * TODONE doing mixing
 * TODONE setup next episode
 * TODONE history of best per episode
 * visuals ? timer/stepCount
 * buttons/UI
//  * Save best
 */


const GENERANRANGE = 5,
    STARTINGLINE = 50,
    STARTINGRADIUS = 10,
    BRIGHTNESS = 125,
    NUMEDITABLEGENES = 4

let width, height, sim
let unpaused = true,
    shouldShow = true,
    shouldMove = true

function setup() {
    width = windowWidth
    height = windowHeight
    createCanvas(width, height);
    noStroke()
    background(0)
    // frameRate(5)
    // sim = simthree(configVecc())
    // sim = agentReplay(vecgang,configVecc())
    // sim = vforvector()
    sim = new StockHandler(stockConfig())
}

const agentReplay = (agentList, ok) => {
    const winners = agentList.slice()
    let winnerPop = []
    winners.forEach(winner => winnerPop.push(new VectorBolt({ chromosome: winner.chromosome })))

    return new GeneticHandler({
        popSize: winners.length,
        chromosomeType: VectorBoltChromosome,
        hull: VectorBolt,
        episodeLength: 1000,
        epochLength: 20,
        selectionFx: ok.selectionFx,
        scoringFx: ok.scoringFx,
        chromosomeMixingFx: ok.chromosomeMixingFx,
        finaleFx: ok.finaleFx,
        pop: winnerPop,
    })
}

const stockConfig = () =>{
    return {
        hey:0,
        you:1,
        there:2
    }
}

const vforvector = () => new GeneticHandler({
    popSize: 100,
    chromosomeType: VectorBoltChromosome,
    hull: VectorBolt,
    episodeLength: 200,
    epochLength: 100
})

const simthree = (con) => {
    return new GeneticHandler({
        popSize: 100,
        episodeLength: 150,
        epochLength: 10000,
        chromosomeType: VectorBoltChromosome,
        hull: VectorBolt,
        selectionFx: con.selectionFx,
        finaleFx: con.finaleFx,
        scoringFx: con.scoringFx,
        chromosomeMixingFx: con.chromosomeMixingFx,
    })
}

const configVecc = () => {
    /**Mutates a chromosome
     * 
     * @function 
     * there is a 1/chromosme length chnace any one gene gets mutated and it is mutated by an amount between -1 and 1
     */
    const mut = (vChromosome) => {
        for (const gene in vChromosome) {
            if (random() <= 1 / Object.keys(vChromosome).length) {
                vChromosome[gene] += random(-1, 1)
            }
        }
    }

    /**Mutates a Chromosome
     * @function
     * @description Mutates one gene in a chromosome
     * @issue Potential problemtaic implemntation leadds to adding a 
     *  number to color whihc is an array
     */
    const mut2 = (vChromosome) => {
        const chromLen = Object.keys(vChromosome).length
        const gene = Object.keys(vChromosome)[floor(random(chromLen))]
        vChromosome[gene] += random(-1, 1)
        return vChromosome
    }

    /**Selects a percentage of an array 
     * @function
     * @description parameterized selection of top people. 
     * @param {Number} p - the reciprocal of the ratio of selction size (eg 1/2 -> p = 2)
     */
    const selectionP = (p) => {
        return pop.sort((a, b) => a.score - b.score)
            .splice(0, floor(pop.length / p))
    }

    return {
        selectionFx: (pop) => {
            return pop.sort((b, a) => a.score - b.score)
                .splice(0, floor(pop.length / 2))
        },
        finaleFx: () => console.log("BOOOOOOG"),
        chromosomeMixingFx: (pop) => {
            const mixedAgents = []
            pop.forEach(agent => {
                mixedAgents.push(new VectorBolt({
                    chromosome: mut2(agent.chromosomeMix(pop[floor(random(pop.length))]))
                }))
            })
            return mixedAgents
        },
        scoringFx: (agent) => agent.score = -agent.y
    }
}

function draw() {
    background(0)
    if (unpaused) sim.step({ show: shouldShow, move: shouldMove })
}

const simtwo = () => {

    const config = () => {
        return {
            selection: (pop) => {
                return pop.sort((b, a) => a.score - b.score)
                    .splice(0, floor(pop.length / 2))
            },
            finale: () => console.log("BOOOOOOG"),
            chromosomemix: (pop) => {
                const mixedAgents = []
                pop.forEach(agent => {
                    mixedAgents.push(new CyclicBolt({
                        chromosome: agent.chromosomeMix(pop[floor(random(pop.length))])
                    }))
                })
                return mixedAgents
            },
            scoring: (agent) => agent.score = -agent.y
        }
    }
    const con = config()
    sim2 = new GeneticHandler({
        popSize: 1000,
        episodeLength: 120,
        epochLength: 1000,
        chromosomeType: simpleBoltChromosome,
        hull: CyclicBolt,
        selectionFx: con.selection,
        finaleFx: con.finale,
        scoringFx: con.scoring,
        chromosomeMixingFx: con.chromosomemix,
    })
}