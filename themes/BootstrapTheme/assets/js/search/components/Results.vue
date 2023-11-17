<template>
    <transition name="Animation-fade">
        <div v-if="getResultsTaxons.length || getCurrentValue"
             class="row text-black bg-white mt-4 px-4 pb-4"
             @mouseleave="onMouseLeave">
            <template v-if="getCurrentValue.length >= getMinChar">
                <ResultsTaxons v-if="taxonsLoaded"/>

                <div v-if="!taxonsLoaded" class="col-12 col-lg-3">
                    <div class="Loader-block h-32 w-100 mb-3"></div>
                </div>

                <ResultsProducts v-if="productsLoaded"/>

                <div v-if="!productsLoaded" class="col-12 col-lg-9">
                    <div class="d-flex flex-wrap">
                        <div v-for="i in getLimitResultsDisplayed"
                             :key="i"
                             class="w-50 w-sm-25 w-lg-1/5 px-2 mb-3 mb-sm-0">
                            <div class="Loader-block h-32"></div>
                        </div>
                    </div>
                </div>
            </template>

            <div v-else class="w-100 mx-4 p-4 bg-gray-100">
                <p>
                    {{ Translator.trans('sylius.search.no_result') }}.
                    {{ Translator.transChoice('sylius.search.warning', getMinChar, { minChar: getMinChar }) }}
                </p>
            </div>
        </div>
    </transition>
</template>

<script setup>
import useStore from '../store/store'
import ResultsProducts from './Results/ResultsProducts'
import ResultsTaxons from './Results/ResultsTaxons'

const Translator = window.Translator

const { taxonsLoaded, getResultsTaxons }               = useStore.resultsTaxons()
const { getMinChar, getCurrentValue, setCurrentTaxon } = useStore.search()

const {
          productsLoaded,
          getLimitResultsDisplayed,
          setResultsProducts,
          getTotalResultsProductsBySearch,
          setTotalResultsProducts,
          getResultsProductsBySearch
      } = useStore.resultsProducts()

/**
 *
 * @param event
 */
const onMouseLeave = (event) => {
    setResultsProducts(getResultsProductsBySearch.value)
    setTotalResultsProducts(getTotalResultsProductsBySearch.value)
    setCurrentTaxon({})
}
</script>
