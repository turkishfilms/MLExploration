/**Creates a CyclicBolt
 * @class
 * @classdesc a boltthat move only in one direction per step and cycles through 
 *  directions
 * 
 * @function move - Cyclically moves according to chromosomes direction 
 */
class CyclicBolt extends Bolt {
    constructor({ chromosome = new simpleBoltChromosome(), stepSize = 0.5 } = {}) {
        super({
            chromosome: chromosome,
            chromosomeType: simpleBoltChromosome,
            speedDamp: stepSize
        })
        this.direction = floor(random(5))
    }

    /**Moves bolt according to direction 
     * @function
     * 
     * @param {Number} dir - 0 is up, 1 is rihgt, 2 is down, three is left
     */
    move(dir = 0) {
        switch (this.direction) {
            case 0:
                this.y += this.chromosome.up
                break;
            case 1:
                this.x += this.chromosome.right
                break;
            case 2:
                this.y += this.chromosome.down
                break;
            case 3:
                this.x += this.chromosome.left
                break;
        }
        this.direction = (this.direction + 1) % 4
    }
}