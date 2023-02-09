/**
 * Creates a new Gene
 * @class Gene
 * @classdesc Holds the proper formatting for Genes 
 * @param {Number} [up]  - How far Bolt will move up, used in Bolt.move() and Bolt.geneMix() 
 * @param {Number} [right]  - How far Bolt will move right, used in Bolt.move() and Bolt.geneMix()
 * @param {Number} [down]  - How far Bolt will move down, used in Bolt.move() and Bolt.geneMix()
 * @param {Number} [left]  - How far Bolt will move left, used in Bolt.move() and Bolt.geneMix()
 * @param {Array} [color]  - The RGB values of the Bolt, used in Bolt.show()
 * @param {Number} [radius]  - The radius of the Bolt drawn, used in Bolt.show()
 * 
 * @author Reginald Robinson <ddrbnsn@gmail.com> 
 */
class Gene {
    constructor({
        up = random(GENERANRANGE),
        right = random(GENERANRANGE),
        down = random(GENERANRANGE),
        left = random(GENERANRANGE),
        color = [random(255 - BRIGHTNESS),
            random(255 - BRIGHTNESS),
            random(255 - BRIGHTNESS)
        ],
        radius = STARTINGRADIUS
    } = {}) {
        this.up = up
        this.right = right
        this.down = down
        this.left = left
        this.color = color
        this.radius = radius
    }
}