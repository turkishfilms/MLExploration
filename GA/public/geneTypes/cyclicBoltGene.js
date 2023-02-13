/**Creates a cyclic bolt gene
 * @class
 * @classdesc bolt gene but has a gene for which direction to go on next step
 * @param {Number } direction - Initial "direction of the gene"
 * this was a bad idea, the direction component can just be donw in the
 *  CyclicBolt hull. No point in extednign the boltgene
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