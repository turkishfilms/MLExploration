/**stepCount
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

let width, height, sim, sim2, sim3

function setup() {
    width = windowWidth
    height = windowHeight
    createCanvas(width, height);
    noStroke()
    background(0)
    // sim()
    // const con = config()
    // sim2()

    simthree(configVecc())


}

const simthree = (con) => {

    sim3 = new GeneticHandler({
        popSize: 300,
        episodeLength: 100,
        epochLength: 10000,
        chromosomeType: VectorBoltChromosome,
        hull: VectorBolt,
        selectionFx: con.selection,
        finaleFx: con.finale,
        scoringFx: con.scoring,
        chromosomeMixingFx: con.chromosomemix,
    })
}


const configVecc = () => {

    const mut = (vChromosome) => {
        for (const gene in vChromosome) {
            if (random() <= 1 / Object.keys(vChromosome).length) {
                vChromosome[gene] += random(-1,1)
            }
        }
    }

/**Mutates a chrom
 * @function
 * @description Mutates one gene in a chromosome
 */
const mut2 = (vChromosome) =>{
    const chromLen = Object.keys(vChromosome).length
    const gNumber = floor(random(chromLen))
    const gene = Object.keys(vChromosome)[gNumber]
    vChromosome[gene] += random(-1,1)
    return vChromosome
}

    const chromosomeMixer = (pop) => {
        const mixedAgents = []
        pop.forEach(agent => {
            mixedAgents.push(new VectorBolt({
                chromosome: mut2(agent.chromosomeMix(pop[floor(random(pop.length))]))
            }))
        })
        return mixedAgents
    }
/**Selects a percentage of an array 
 * @function
 * @description parameterized selection of top people. 
 * @param {Number} p - the reciprocal of the ratio of selction size (eg 1/2 -> p = 2)
*/
const selectionP = (p) =>{
    return pop.sort((a,b) => a.score - b.score)
                .splice(0, floor(pop.length / p))
}

    return {
        selection: (pop) => {
            return pop.sort((b,a) => a.score - b.score)
                .splice(0, floor(pop.length / 2))
        },
        finale: () => console.log("BOOOOOOG"),
        chromosomemix: chromosomeMixer,
        scoring: (agent) => agent.score = -agent.y
    }
}

function draw() {
    background(0)
    sim3.step()
}


const simtwo = () => {
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

const simone = () => {
    sim = new GeneticHandler({
        popSize: 10,
        episodeLength: 120,
        epochLength: 1000,
        chromosomeType: simpleBoltChromosome,
        hull: Bolt,
        selectionFx: topHalf,
        finaleFx: finfin,
        scoringFx: scoringMe,
        chromosomeMixingFx: chromosomeMixer,
    })
}

const config = () => {
    const topHalf = (pop) => {
        return pop.sort((b, a) => a.score - b.score)
            .splice(0, floor(pop.length / 2))
    }

    const finfin = () => console.log("BOOOOOOG")

    const chromosomeMixer = (pop) => {
        const mixedAgents = []
        pop.forEach(agent => {
            mixedAgents.push(new CyclicBolt({
                chromosome: agent.chromosomeMix(pop[floor(random(pop.length))])
            }))
        })
        return mixedAgents
    }

    const scoringMe = (agent) => agent.score = -agent.y

    return {
        selection: topHalf,
        finale: finfin,
        chromosomemix: chromosomeMixer,
        scoring: scoringMe
    }
}

const vectorBoltStuff = () => {

    const hull = {
        angle: 0,
        speed: 0,
        x: 0,
        y: 0,
        angIsInc: 0,
        move: () => {
            this.x = cos(angle) * speed
            this.y = sin(angle) * speed
        },
        show: () => {
            fill(chromosome.color[0], )
            ellipse(x, y, chromosome.r)
        },
        updateAng: () => {
            if (angIsInc) this.angle += angDelta
            else angle -= angDelta
            if (ang >= chromosome.angmax || ang <= chromosome.angmin) angIsInc *= -1
        },
        chromosomeMix: (vecbol) => {
            const avg = (a, b) => (a + b) / 2
            return new vecBoltChromosome({
                angMin: avg(angmin, vecbol.angmin),
                angMax: avg(angMax, vecbol.angmax),
                angdelta: avg(angdelta, vecbol.angdelta),
            })
        }
    }

    const chromosome = {
        movement: {
            angMin: 0,
            angMax: 0,
            angDelta: 0
        },
        looks: {
            radius: 0,
            color: 0
        }
    }
    const scoringFx = () => {}
    const chromosomeMixingFx = () => {}
    const selectionFx = (pop) => {
        return pop.sort((b, a) => a.score - b.score).splice(0, floor(pop.length / 2))
    }
    const finaleFx = () => console.log("BOOOOOOG")
    return { scoringFx, finaleFx, selectionFx, chromosomeMixingFx }
}