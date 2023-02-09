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
    STARTINGLINE = 333,
    STARTINGRADIUS = 10,
    STARTINGSCORE = 0,
    BRIGHTNESS = 125,
    NUMEDITABLEGENES = 4

let width, height, numBolts = 1000,
    bolts = [],
    champions = [],
    episodeCounter = 0,
    episodeLength = 150,
    stepCounter = 0,
    sim

function setup() {
    width = windowWidth
    height = windowHeight
    createCanvas(width, height);
    noStroke()
    background(0)
    sim = new GeneticHandler({ popSize: 1000, episodeLength: 150, geneType: new Bolt() })
}



function draw() {
    background(0)
    // sim.step()

}