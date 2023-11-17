<template>
    <div
        class="flex-flow-between px-3 py-1 mw-575 w-100 rounded bg-gray-200 transition-fast flex-1">
        <input type="text"
               @input="onChangeBefore($event); onChange($event);"
               :value="getCurrentValue"
               @keyup.enter="goToPage"
               :placeholder="Translator.trans('sylius.search.placeholder')"
               class="js-input-search flex-1 border-0 outline-none bg-transparent me-2"
               tabindex="0"
               style="min-width: 160px;">
        <a :href="getFullLink">
            <i class="Icon-search text-primary cursor-pointer"></i>
        </a>
    </div>
</template>

<script setup>
import debounce from '../../../common/utils/debounce'
import useStore from '../../store/store'

const Translator = window.Translator

const {
          setCurrentValue,
          getCurrentValue,
          getQueries,
          setQuery,
          setCurrentSlug,
          getMinChar,
          getFullLink,
          fetchProducts,
          fetchTaxons,
      } = useStore.search()

const { setResultsTaxons, setTaxonsLoaded } = useStore.resultsTaxons()

const {
          getResultsProducts,
          setResultsProducts,
          emptyResultsProductsByTaxon,
          setProductsLoaded,
          setTotalResultsProducts,
      } = useStore.resultsProducts()

const { setModalResultsIsOpened } = useStore.common()

/**
 *
 * @param event
 */
const onChangeBefore = (event) => {
    setCurrentValue(event.target.value)

    if (getCurrentValue.value.length < getMinChar.value && !getQueries.value.length) return

    if (getCurrentValue.value.length < getMinChar.value && getQueries.value.length) {
        setQuery([])
        setResultsProducts([])
        setResultsTaxons([])
        emptyResultsProductsByTaxon()
        setCurrentSlug('')
        setTotalResultsProducts(0)
        setTaxonsLoaded(true)
        setProductsLoaded(true)

        return
    }

    setQuery(getCurrentValue.value.trim().split(' '))

    setModalResultsIsOpened(true)

    if (getCurrentValue.value.length < getMinChar.value) {
        setTaxonsLoaded(true)
        setProductsLoaded(true)

        return
    }

    setTaxonsLoaded(false)
    setProductsLoaded(false)
    emptyResultsProductsByTaxon()
    setCurrentSlug('')
}

/**
 *
 * @param event
 */
const onChange = debounce((event) => {
    if (getQueries.value.length && !getResultsProducts.value.length) {
        setTaxonsLoaded(false)
        setProductsLoaded(false)

        fetchProducts()
        fetchTaxons()

        return
    }

    if (getCurrentValue.value.length < getMinChar.value) return

    fetchProducts()
    fetchTaxons()
}, 1000)

/**
 *
 */
const goToPage = () => {
    location.assign(getFullLink.value);
}
</script>
