/**
 * TODONE
 * TODONE implement step counter for episode
 * sorting bolts
 * doing mixing
 * setup next episode
 * history of best per episode
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

function setup() {
    width = windowWidth
    height = windowHeight
    createCanvas(width, height);
    noStroke()
    background(0)
    sim = new GeneticHandler({
        popSize: 1000,
        episodeLength: 120,
        epochLength: 1000,
        geneType: Gene,
        hull: Bolt,
        selectionFx: topHalf,
        finaleFx: finfin,
        scoringFx: scoringMe,
        geneMixingFx: geneMixer,
    })
}

const topHalf = (pop) => {
    return pop.sort((b, a) => a.score - b.score).splice(0,floor(pop.length / 2))
}

const finfin = () => console.log("BOOOOOOG")

const geneMixer = (pop) => {
    const mixedAgents = []
    pop.forEach(agent => {
        mixedAgents.push(new Bolt({
            genes: agent.geneMix(pop[floor(random(pop.length))])
        }))
    })
    return mixedAgents
}

const scoringMe = (agent) => agent.score = agent.y

function draw() {
    // background(0)
    sim.step()
}