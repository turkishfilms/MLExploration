/**Creates vector bolt choromse 
 * @class
 * @classdesc chromomse for vecotr bolt
 * 
 */

class VectorBoltChromosome {
    constructor({
        angMin = random(0, PI),
        angMax = random(PI, TWO_PI),
        angDelta = random(0, TWO_PI),
        color = [random(255), random(255), random(255)],
        radius = 2 + random() * 10
    } = {}) {
        this.angMin = angMin
        this.angMax = angMax
        this.angDelta = angDelta
        this.color = color
        this.radius = radius
    }
}