
/*
*TODO:DEcide how availble stocks will be stored that is solid (mostly exstensible), all it needs is the amount of the stock
*TODO:decide if hull should have memory, or where shuold tx histriy be stored
*TODO:decidde ow genes should work
*TODO:decide data structure for stock data
*TODO: date is just integer days since fixed dataum (ie 2000)
*/










/**
 * @param {Number} availableMoney - How Rich?
 * @param {Number} availableStocks - How Rich?
 */


class Stonker {
    constructor({ availableMoney = 10000, availableStocks = [], chromosome = new StonkerChromosome() } = {}) {
        this.availableMoney = availableMoney
        this.availableStocks = availableStocks
        this.chromosome = chromosome
        this.chromosomeType = StonkerChromosome
        this.score = 0
        this.name = random(100000)
    }
    /**
     * Activates every step of the handler
     * @param {Object} envData - Holds date data 
     */
    step = (envData) => {
        const date = envData.date
        const stockData = this.getStockData(date)

    }

    /**
     * Searches global STOCKDATA for that days data
     * @param {Number} date 
     * @returns {Object} that days stock data 
     */
    getStockData = (date) => {
        let data = []

        return data
    }

    chooseAction = (availableMoney, availableStocks, data) => {

    }

    buy = (stock, date) => {
        if (this.availableMoney >= stock.date.price) {
            this.availableMoney -= stock.date.price
            this.availableStocks.push(stock)
            console.log(`"${this.name}" bought: ${stock.name}`)
        }

    }

    sell = (stock,date) => {
        if (this.availableStocks.includes(stock)) {
            this.availableMoney += stock.date.price
            this.availableStocks.remove(stock)
            console.log(`"${this.name}" bought: ${stock.name}`)
        }
    }

}