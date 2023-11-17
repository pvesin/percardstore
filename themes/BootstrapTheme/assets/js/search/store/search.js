import { computed, ref } from 'vue'
import { ApiFetchProducts, ApiFetchProductsByTaxon, ApiFetchTaxons } from '../api/api'
import useStore from './store'
import LocaleRouter from '../../common/routing/LocaleRouter'
import { ROUTES_CATALOG, ROUTES_PRODUCTS } from '../../common/routing/routes'
import { isTablet } from '../../common/utils/viewport'

const state = ref({
    searchIsOpened: false,
    currentValue: '',
    queries: [],
    minChar: 3,
    fullLink: '',
    currentTaxon: {},
    currentSlug: '',
})

const abortControllerProduct         = ref(null)
const abortControllerTaxon           = ref(null)
const abortControllerProductsByTaxon = ref(null)

export default () => {
    const {
              getResultsProducts,
              setResultsProducts,
              setProductsLoaded,
              setResultsProductsBySearch,
              setTotalResultsProducts,
              addResultsProductsByTaxon,
              getTotalResultsProducts,
              setTotalResultsProductsBySearch,
          }                                     = useStore.resultsProducts()
    const { setResultsTaxons, setTaxonsLoaded } = useStore.resultsTaxons()

    /**
     *
     */
    const searchIsOpened = computed(() => state.value.searchIsOpened)

    /**
     *
     * @param bool
     */
    const setSearchIsOpened = (bool) => state.value.searchIsOpened = bool

    /**
     *
     */
    const getCurrentValue = computed(() => state.value.currentValue)

    /**
     *
     * @param str
     */
    const setCurrentValue = (str) => state.value.currentValue = str

    /**
     *
     */
    const getQueries = computed(() => state.value.queries)

    /**
     *
     * @param str
     * @returns {number}
     */
    const addQuery = (str) => state.value.queries.push(str)

    /**
     *
     * @param arr
     */
    const setQuery = (arr) => state.value.queries = arr

    /**
     *
     * @param str
     */
    const removeQuery = (str) => state.value.queries.splice(state.value.queries.indexOf(str), 1)

    /**
     *
     */
    const getMinChar = computed(() => state.value.minChar)

    /**
     *
     */
    const getCurrentTaxon = computed(() => state.value.currentTaxon)

    /**
     *
     * @param obj
     * @returns {*}
     */
    const setCurrentTaxon = (obj = {}) => state.value.currentTaxon = obj

    /**
     *
     */
    const getCurrentSlug = computed(() => getCurrentTaxon.value.slug)

    /**
     *
     * @param str
     */
    const setCurrentSlug = (str) => getCurrentTaxon.value.slug = str

    /**
     *
     */
    const getFullLink = computed(() => {
        if (getCurrentSlug.value) {
            return LocaleRouter.generate(ROUTES_CATALOG.PRODUCT_INDEX, {
                '_locale': LocaleRouter.getLocale(),
                'slug': getCurrentSlug.value,
                'criteria[search_value]': getQueries.value.length ? getQueries.value.join(',') : ''
            })
        }

        return LocaleRouter.generate(ROUTES_PRODUCTS.SYLIUS_SHOP_PRODUCT_SEARCH,
            {
                '_locale': LocaleRouter.getLocale(),
                'criteria[search_value]': getQueries.value.length ? getQueries.value.join(',') : ''
            }
        )
    })

    /**
     *
     * @returns {Promise<* | void>}
     */
    const fetchProducts = () => {
        if (!!abortControllerProduct.value) {
            abortControllerProduct.value.abort()
            abortControllerProduct.value = null
        }

        abortControllerProduct.value = new AbortController()

        return ApiFetchProducts({
            queries: getQueries.value, routeParams: { limit: isTablet() ? 4 : 5 }
        }, abortControllerProduct.value).then(({ total, _embedded: { items } }) => {
            setResultsProducts(items)
            setResultsProductsBySearch(getResultsProducts.value)
            setTotalResultsProducts(total)
            setTotalResultsProductsBySearch(getTotalResultsProducts.value)
            setProductsLoaded(true)
        }).catch(err => console.log(err))
    }

    /**
     *
     * @returns {Promise<* | void>}
     */
    const fetchTaxons = () => {
        if (!!abortControllerTaxon.value) {
            abortControllerTaxon.value.abort()
            abortControllerTaxon.value = null
        }

        abortControllerTaxon.value = new AbortController()

        return ApiFetchTaxons({
            queries: getQueries.value, routeParams: { limit: isTablet() ? 4 : 5 }
        }, abortControllerTaxon.value).then(data => {
            const dataTransformed = data.map(taxon => taxon.translations[LocaleRouter.getLocale()]).filter(taxon => taxon)
            setResultsTaxons(dataTransformed)
            setTaxonsLoaded(true)
        }).catch(err => console.log(err))
    }

    /**
     *
     * @param slug
     * @param queries
     * @returns {Promise<any>}
     */
    const fetchProductsByTaxon = ({ slug }) => {
        if (!!abortControllerProductsByTaxon.value) {
            abortControllerProductsByTaxon.value.abort()
            abortControllerProductsByTaxon.value = null
        }

        abortControllerProductsByTaxon.value = new AbortController()

        return ApiFetchProductsByTaxon({ slug, queries: getQueries.value }, abortControllerProductsByTaxon.value)
            .then(({ total, _embedded: { items } }) => {
                addResultsProductsByTaxon({ slug, items, totalProducts: total })
            })
            .catch(err => console.log(err))
    }

    return {
        searchIsOpened,
        setSearchIsOpened,
        getQueries,
        addQuery,
        setQuery,
        removeQuery,
        getCurrentValue,
        setCurrentValue,
        getMinChar,
        getCurrentTaxon,
        setCurrentTaxon,
        getCurrentSlug,
        setCurrentSlug,
        getFullLink,
        fetchProducts,
        fetchTaxons,
        fetchProductsByTaxon,
    }
}
