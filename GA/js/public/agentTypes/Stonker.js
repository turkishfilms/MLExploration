class Stonker {
    constructor({ availableMoney = 10000, availableStocks = [], chromosome = new StonkerChromosome() } = {}) {
        this.availableMoney = availableMoney
        this.availableStocks = availableStocks
        this.chromosome = chromosome
        this.chromosomeType = StonkerChromosome
        this.score = 0
    }
    /**
     * Activates every step of the handler
     */
    step = () => {
        
        const stockData = this.getStockData(date)
    }

    getStockData = (date) =>{
        let data = []
        
        return data
    }

    chooseAction = (availableMoney, availableStocks, data) => {

    }

    buy = () => {

    }

    sell = () => {

    }

}