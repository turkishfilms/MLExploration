class StockHandler extends GeneticHandler {
    constructor({ stockData = [], sentimentNews = [], economicNews = [], ...options } = {}) {
        const {
            popSize,
            chromosomeType,
            hull,
            episodeLength,
            epochLength,
            selectionFx,
            scoringFx,
            chromosomeMixingFx,
            finaleFx,
            pop: [],
        } = options
        super({
            popSize: popSize,
            chromosomeType: chromosomeType,
            hull: hull,
            episodeLength: episodeLength,
            epochLength: epochLength,
            selectionFx: selectionFx,
            scoringFx: scoringFx,
            chromosomeMixingFx: chromosomeMixingFx,
            finaleFx: finaleFx,
            pop: pop,
        })
        this.stockData = stockData
        this.sentimentNews = sentimentNews
        this.economicNews = economicNews
    }
}