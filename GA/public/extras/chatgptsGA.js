const populationSize = 100;
const mutationRate = 0.1;

class Chromosome {
    constructor(genes) {
        this.genes = genes;
        this.fitness = 0;
    }

    calculateFitness() {
        let total = 0;
        for (let i = 0; i < this.genes.length; i++) {
            total += this.genes[i];
        }
        this.fitness = total;
    }
}

class Population {
    constructor(size) {
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

    sortChromosomes() {
        this.chromosomes.sort((a, b) => b.fitness - a.fitness);
    }

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

    crossover(parent1, parent2) {
        let child = new Chromosome([]);
        let crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
        for (let i = 0; i < parent1.genes.length; i++) {
            if (i < crossoverPoint) {
                child.genes[i] = parent1.genes[i];
            } else {
                child.genes[i] = parent2.genes[i];
            }
        }
        child.calculateFitness();
        return child;
    }

    mutate(chromosome) {
        for (let i = 0; i < chromosome.genes.length; i++) {
            if (Math.random() < mutationRate) {
                chromosome.genes[i] = Math.floor(Math.random() * 10);
            }
        }
        chromosome.calculateFitness();
        return chromosome;
    }
}