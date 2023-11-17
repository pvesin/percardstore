import axios from 'axios'
import LocaleRouter from '../../common/routing/LocaleRouter'
import { ROUTES_AJAX } from '../../common/routing/routes'

export const ApiFetchProducts = async ({ queries = [], routeParams = {} }, abortController = null) => {
    const defaultParams = {}

    if (!!abortController) {
        defaultParams.signal = abortController.signal
    }

    const res = await axios.get(LocaleRouter.generate(ROUTES_AJAX.SEARCH_PRODUCTS, {
        '_locale': LocaleRouter.getLocale(),
        'criteria[search_value]': queries.join(',') || null,
        ...routeParams,
    }), { ...defaultParams })

    return res.data
}

export const ApiFetchTaxons = async ({ queries = [], routeParams = {} }, abortController = null) => {
    const defaultParams = {}

    if (!!abortController) {
        defaultParams.signal = abortController.signal
    }

    const res = await axios.get(LocaleRouter.generate(ROUTES_AJAX.SEARCH_TAXON_BY_NAME_PHRASE, {
        '_locale': LocaleRouter.getLocale(),
        'phrase': queries.join('%') || null,
        ...routeParams,
    }), { ...defaultParams })

    return res.data
}

export const ApiFetchProductsByTaxon = async ({ queries = [], slug }, abortController = null) => {
    const defaultParams = {}

    if (!!abortController) {
        defaultParams.signal = abortController.signal
    }

    const res = await axios.get(LocaleRouter.generate(ROUTES_AJAX.SEARCH_PRODUCT_BY_TAXON, {
        '_locale': LocaleRouter.getLocale(),
        'slug': slug,
        'criteria[search_value]': queries.join(',') || null,
    }), { ...defaultParams })

    return res.data
}
