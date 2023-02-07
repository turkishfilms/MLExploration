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
    stepSize = 0.05,
    bolts = [],
    champions = [],
    episodeCounter = 0,
    episodeLength = 150,
    stepCounter = 0

function setup() {
    width = windowWidth
    height = windowHeight
    createCanvas(width, height);
    noStroke()
    background(0)
    for (let i = 0; i < numBolts; i++) bolts.push(new Bolt())

}

const newEpisodeStuff = () => {
    bolts.forEach(bolt => bolt.scoring())
    const sortedBolts = sortBolts(bolts)
    champions.push({ "episode": episodeCounter, "genes": sortedBolts[0].genes })
    const elites = sortedBolts.splice(numBolts / 2)
    const newBolts = geneMixing(elites)
    elites.forEach(elite => newBolts.push(new Bolt({ genes: elite.genes })))
    // bolts = []
    bolts = newBolts
    // console.log(elites[0].score)
    stepCounter = 0
    episodeCounter++
}

const sortBolts = (a) => {
    a.sort((a, b) => {
        return a.score - b.score;
    });
    return a
}

const geneMixing = (bolts) => {
    // take in n bolts
    const boltsL = bolts.length,
        mixedBolts = []
    bolts.forEach(bolt => {
        mixedBolts.push(new Bolt({ genes: bolt.geneMix(bolts[floor(random(boltsL))]) }))
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