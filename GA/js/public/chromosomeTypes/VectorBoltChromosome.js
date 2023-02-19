/**Creates vector bolt choromse 
 * @class
 * @classdesc chromomse for vecotr bolt
 * 
 */

class VectorBoltChromosome {
    constructor({
        angMin = random(TWO_PI),
        angMax = random(TWO_PI),
        angDelta = random(TWO_PI),
        color = [BRIGHTNESS + random(255), BRIGHTNESS + random(255), BRIGHTNESS + random(255)],
        radius = 2 + random() * 10
    } = {}) {
        this.angMin = angMin
        this.angMax = angMax
        this.angDelta = angDelta
        this.color = color
        this.radius = radius
    }
}