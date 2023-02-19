/**
 * A chromosome in the population.
 * @class
 */
class Chromosome {
    /**
     * Creates a new chromosome with the given genes.
     * @constructor
     * @param {Array<number>} genes - The genes of the chromosome.
     */
    constructor(genes) {
        /**
         * The genes of the chromosome.
         * @type {Array<number>}
         */
        this.genes = genes;
        /**
         * The fitness of the chromosome.
         * @type {number}
         */
        this.fitness = 0;
    }

    /**
     * Calculates the fitness of the chromosome.
     */
    calculateFitness() {
        let total = 0;
        for (let i = 0; i < this.genes.length; i++) {
            total += this.genes[i];
        }
        this.fitness = total;
    }
}

/**
 * A population of chromosomes.
 * @class
 */
class Population {
    /**
     * Creates a new population with the given size.
     * @constructor
     * @param {number} size - The size of the population.
     */
    constructor(size) {
        /**
         * The chromosomes in the population.
         * @type {Array<Chromosome>}
         */
        this.chromosomes = [];
        for (let i = 0; i < size; i++) {
            let genes = [];
            for (let j = 0; j < 10; j++) {
                genes[j] = Math.floor(Math.random() * 10);
            }
            let chromosome = new Chromosome(genes);
            chromosome.calculateFitness();
            this.chromosomes[i] = chromosome;
        }
    }

    /**
     * Sorts the chromosomes in the population by fitness.
     */
    sortChromosomes() {
        this.chromosomes.sort((a, b) => b.fitness - a.fitness);
    }

    /**
     * Evolves the population by performing selection, crossover, and mutation.
     */
    evolve() {
        let newPopulation = [];
        for (let i = 0; i < this.chromosomes.length; i++) {
            let parent1 = this.selectParent();
            let parent2 = this.selectParent();
            let child = this.crossover(parent1, parent2);
            child = this.mutate(child);
            newPopulation[i] = child;
        }
        this.chromosomes = newPopulation;
    }

    /**
     * Selects a parent chromosome for crossover based on fitness.
     * @returns {Chromosome} The selected parent chromosome.
     */
    selectParent() {
        let randomNumber = Math.random();
        let runningSum = 0;
        for (let i = 0; i < this.chromosomes.length; i++) {
            runningSum += this.chromosomes[i].fitness;
            if (runningSum >= randomNumber) {
                return this.chromosomes[i];
            }
        }
        return this.chromosomes[this.chromosomes.length - 1];
    }

    /**
     * Performs crossover between two parent chromosomes to produce a child chromosome.
     * @param {Chromosome} parent1 - The first parent chromosome.
     * @param {Chromosome} parent2 - The second parent chromosome.
     * @returns {Chromosome} The child chromosome produced by crossover.
     */
    crossover(parent1, parent2) {
        let child = new Chromosome([]);
        let crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
        for (let i = 0; i < parent1.genes.length; i) {}
    }
}