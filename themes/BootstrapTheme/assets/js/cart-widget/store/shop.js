import { computed, ref } from 'vue'
import LocaleRouter from '../../common/routing/LocaleRouter'

const state = ref({
    locale: LocaleRouter.getLocale(),
    currency: '',
})

export default () => {
    /**
     *
     */
    const getLocale = computed(() => state.value.locale)

    /**
     *
     */
    const getCurrency = computed(() => state.value.currency)

    /**
     *
     * @param curr
     * @returns {string}
     */
    const fetchCurrency = (curr = '') => state.value.currency = curr

    return {
        getLocale,
        fetchCurrency,
        getCurrency,
    }
}
