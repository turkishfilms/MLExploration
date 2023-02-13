/**Creates a vecotr bolt
 * @class
 * @classdesc like a bolt but polar, icccyyyy 
 */
class VectorBolt {

    constructor({
        angle = PI + HALF_PI, //up
        speed = 2,
        x = random(width),
        y = height - STARTINGLINE,
        angIsInc = 0,
        chromosomeType = VectorBoltChromosome,
        chromosome = new VectorBoltChromosome()
    } = {}) {
        this.angle = angle
        this.speed = speed
        this.x = x
        this.y = y
        this.angIsInc = angIsInc
        this.chromosome = chromosome
        this.chromosomeType = chromosomeType
        this.score = 0
    }

    step = () => {
        this.move()
        this.show()
    }

    move = () => {
        this.updateAng()
        this.x += cos(this.angle) * this.speed
        this.y += sin(this.angle) * this.speed
    }

    show = () => {
        noStroke()
        fill(this.chromosome.color[0],
            this.chromosome.color[1],
            this.chromosome.color[2], )
        ellipse(this.x, this.y, this.chromosome.radius)
        stroke(255)
        // strokeWeight(3)
        line(this.x, this.y, this.x + cos(this.angle) * this.speed * 5, this.y + sin(this.angle) * this.speed * 5)
    }

    updateAng = () => {
        const ranDelta = random(0, this.chromosome.angDelta)
        // if (this == sim3.pop[0]) console.log(ranDelta,this.chromosome.angDelta)
        if (this.angIsInc == 1) this.angle += ranDelta
        else this.angle -= ranDelta
        if (this.angle >= this.chromosome.angMax ||
            this.angle <= this.chromosome.angMin) this.angIsInc *= -1
    }

    chromosomeMix = (vectorBolt) => {
        const avg = (a, b) => (a + b) / 2
        return new VectorBoltChromosome({
            angMin: avg(this.angMin, vectorBolt.angMin),
            angMax: avg(this.angMax, vectorBolt.angMax),
            angDelta: avg(this.angDelta, vectorBolt.angDelta),
        })
    }
}