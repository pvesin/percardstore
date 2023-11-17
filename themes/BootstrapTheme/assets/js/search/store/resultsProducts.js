import { ref, computed } from 'vue'
import { isTablet } from '../../common/utils/viewport'

const state = ref({
    resultsProducts: [],
    resultsProductsBySearch: [],
    resultsProductsByTaxon: [],
    productsLoaded: false,
    limitResultsDisplayed: isTablet() ? 4 : 5,
    totalResultsProducts: 0,
    totalResultsProductsBySearch: 0,
})


export default () => {
    /**
     *
     */
    const getResultsProducts = computed(() => state.value.resultsProducts)

    /**
     *
     */
    const getResultsProductsFiltered = computed(() => state.value.resultsProducts.slice(0, state.value.limitResultsDisplayed))

    /**
     *
     * @param data
     * @returns {*[]}
     */
    const setResultsProducts = (data = []) => state.value.resultsProducts = data

    /**
     *
     */
    const getResultsProductsBySearch = computed(() => state.value.resultsProductsBySearch)

    /**
     *
     * @param data
     * @returns {*[]}
     */
    const setResultsProductsBySearch = (data = []) => state.value.resultsProductsBySearch = data

    /**
     *
     */
    const getResultsProductsByTaxon = computed(() => state.value.resultsProductsByTaxon)

    /**
     *
     */
    const getSlugsOfResultsProductsByTaxon = computed(() => state.value.resultsProductsByTaxon.map(obj => obj.slug))

    /**
     *
     * @param obj
     * @returns {number}
     */
    const addResultsProductsByTaxon = (obj = {}) => state.value.resultsProductsByTaxon.push({ ...obj })

    /**
     *
     * @returns {*[]}
     */
    const emptyResultsProductsByTaxon = () => state.value.resultsProductsByTaxon = []

    /**
     *
     */
    const getLimitResultsDisplayed = computed(() => state.value.limitResultsDisplayed)

    /**
     *
     */
    const productsLoaded = computed(() => state.value.productsLoaded)

    /**
     *
     * @param bool
     */
    const setProductsLoaded = (bool) => state.value.productsLoaded = bool

    /**
     *
     */
    const getTotalResultsProducts = computed(() => state.value.totalResultsProducts)

    /**
     *
     * @param int
     */
    const setTotalResultsProducts = (int) => state.value.totalResultsProducts = int


    /**
     *
     */
    const getTotalResultsProductsBySearch = computed(() => state.value.totalResultsProductsBySearch)

    /**
     *
     * @param int
     */
    const setTotalResultsProductsBySearch = (int) => state.value.totalResultsProductsBySearch = int

    return {
        getResultsProducts,
        getResultsProductsFiltered,
        setResultsProducts,
        getResultsProductsBySearch,
        setResultsProductsBySearch,
        getSlugsOfResultsProductsByTaxon,
        getResultsProductsByTaxon,
        addResultsProductsByTaxon,
        emptyResultsProductsByTaxon,
        getLimitResultsDisplayed,
        productsLoaded,
        setProductsLoaded,
        getTotalResultsProducts,
        setTotalResultsProducts,
        getTotalResultsProductsBySearch,
        setTotalResultsProductsBySearch,
    }
}
