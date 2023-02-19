/**Creates a cyclic bolt chromosome
 * @class
 * @classdesc bolt chromosome but has a gene for which direction to go on next step
 * @param {Number } direction - Initial "direction of the chromose"
 * this was a bad idea, the direction component can just be donw in the
 *  CyclicBolt hull. No point in extednign the simpleBoltChromosome
 * @description Super Deprecated waste of time
 */

class cyclicBoltChromosome extends simpleBoltChromosome {
    constructor({ direction = floor(random(5)), ...options } = {}) {
        const { up, left, down, right, color, radius } = options
        super({
            up: up,
            left: left,
            down: down,
            right: right,
            color: color,
            radius: radius
        })
        this.direction = direction
    }

}