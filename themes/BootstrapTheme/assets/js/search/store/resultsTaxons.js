import { ref, computed } from 'vue'
import LocaleRouter from '../../common/routing/LocaleRouter'
import { ROUTES_CATALOG } from '../../common/routing/routes'
import { isTablet } from '../../common/utils/viewport'

const state = ref({
    taxonsHighlighted: [],
    resultsTaxons: [],
    limitResultsDisplayed: isTablet() ? 3 : 4,
    taxonsLoaded: false,
})


export default () => {
    /**
     *
     * @param taxonsHighlighted
     */
    const fetchTaxonsHighlighted = (taxonsHighlighted) => state.value.taxonsHighlighted = taxonsHighlighted

    /**
     *
     */
    const getTaxonsHighlighted = computed(() => state.value.taxonsHighlighted)

    /**
     *
     */
    const getResultsTaxons = computed(() => state.value.resultsTaxons.slice(0, state.value.limitResultsDisplayed))

    /**
     *
     * @param data
     * @returns {*[]}
     */
    const setResultsTaxons = (data = []) => state.value.resultsTaxons = data

    /**
     *
     */
    const taxonsLoaded = computed(() => state.value.taxonsLoaded)

    /**
     *
     * @param bool
     */
    const setTaxonsLoaded = (bool) => state.value.taxonsLoaded = bool

    /**
     *
     * @param slug
     */
    const urlTaxonBySlug = (slug) => LocaleRouter.generate(ROUTES_CATALOG.PRODUCT_INDEX, {
        '_locale': LocaleRouter.getLocale(),
        'slug': slug,
    })

    return {
        fetchTaxonsHighlighted,
        getTaxonsHighlighted,
        getResultsTaxons,
        setResultsTaxons,
        taxonsLoaded,
        setTaxonsLoaded,
        urlTaxonBySlug,
    }
}
