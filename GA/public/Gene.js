/**This holds the proper formatiing for Genes 
 * @constructor
 * @param {number} up - How far Bolt will move up, used in Bolt.move() and Bolt.geneMix()
 * @param {number} right - How far Bolt will move right, used in Bolt.move() and Bolt.geneMix()
 * @param {number} down - How far Bolt will move down, used in Bolt.move() and Bolt.geneMix()
 * @param {number} left - How far Bolt will move left, used in Bolt.move() and Bolt.geneMix()
 * @param {Array} color - The RGB values of the Bolt, used in Bolt.show()
 * @param {number} radius - The radius of the Bolt drawn, used in Bolt.show()
 */
class Gene {
    constructor({
        up = 0,
        right = 0,
        down = 0,
        left = 0,
        color = [0, 0, 0],
        radius = 0
    } = {}) {
        this.up = up
        this.right = right
        this.down = down
        this.left = left
        this.color = color
        this.radius = radius
    }
}