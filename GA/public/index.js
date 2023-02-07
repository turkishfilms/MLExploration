/**
 * implement step counter for episode
 * sorting bolts
 * doing mixing
 * setup next episode
 * history of best per episode
 * visuals ? timer/stepCount
 * buttons/UI
//  * Save best
 */



const GENERANRANGE = 5,
    STARTINGLINE = 20,
    STARTINGRADIUS = 10,
    STARTINGSCORE = 0,
    BRIGHTNESS = 125,
    NUMEDITABLEGENES = 4

let width, height, numBolts = 1000,
    stepSize = 5,
    bolts = [],
    champions = [],
    episodeCounter = 0,
    episodeLength = 1000,
    stepCounter = 0

function setup() {
    width = width
    height = height
    createCanvas(width, height);
    background(0)
    for (let i = 0; i < numBolts; i++) bolts.push(new Bolt())


}

const newEpisodeStuff = () => {
    bolts.forEach(bolt => bolt.scoring())
    const sortedBolts = sortBolts()
    champions.push({ "episode": episodeCounter, "genes": sortedBolts[0].genes })
    const elites = sortedBolts.slice(50)
    const newBolts = geneMixing(elites)
    elites.forEach(elite => newBolts.push(new Bolt({ genes: elite.genes })))
    bolts = newBolts

}

const sortBolts = (a) => {
    bolts.sort((a, b) => {
        return a.score - b.score;
    });
}

const geneMixing = (bolts) => {
    // take in n bolts
    const boltsL = bolts.length,
        mixedBolts = []
    bolts.forEach(bolt => {
        mixedBolts.push(new Guy({ genes: bolt.geneMix(bolts[floor(random(boltsL))]) }))
    })
    return mixedBolts
    // return an array of n mixed up and mutated bolts
}


function draw() {
    background(0)
    bolts.forEach(bolt => {
        bolt.move()
        bolt.show()
    })
    stepCounter++
    if (stepCounter >= episodeLength) {
        newEpisodeStuff()
    }
}