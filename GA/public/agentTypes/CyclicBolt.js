/**Creates a CyclicBolt
 * @class
 * @classdesc a boltthat move only in one direction per step and cycles through 
 *  directions
 * 
 * @function move - Cyclically moves according to genes direction 
 */
class CyclicBolt extends Bolt {
    constructor({ options } = {}) {
        const {
            x,
            y,
            genes = new cyclicBoltGene()
        } = options
        super({
            x: x,
            y: y,
            genes,
            genes
        })
    }

    /**Moves bolt according to direction 
     * @function
     * 
     * @param {Number} dir - 0 is up, 1 is rihgt, 2 is down, three is left
     */
    move(dir = 0) {
        switch (this.direction) {
            case 0:
                this.y += this.genes.up
                break
            case 1:
                this.x += this.genes.right
                break
            case 2:
                this.y += this.genes.down
                break
            case 3:
                this.x += this.genes.left
                break
        }
    }
}