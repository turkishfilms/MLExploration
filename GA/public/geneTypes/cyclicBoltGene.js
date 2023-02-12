/**Creates a cyclic bolt gene
 * @class
 * @classdesc bolt gene but has a gene for which direction to go on next step
 * @param {Number } direction - Initial "direction of the gene"
 */

class cyclicBoltGene extends simpleBoltGene {
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