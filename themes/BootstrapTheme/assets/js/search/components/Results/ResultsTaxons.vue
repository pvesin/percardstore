<template>
    <div class="col-12 col-lg-3 d-flex flex-column align-items-start text-primary">
        <p class="mb-2 pb-1 fw-bold border-bottom">{{ Translator.trans('sylius.search.suggestions') }}</p>

        <ul v-if="getResultsTaxons.length" class="d-flex flex-column border-bottom">
            <li v-for="(taxon, index) in getResultsTaxons" :key="index">
                <ResultsTaxon :taxon="taxon"/>
            </li>
        </ul>

        <p v-if="!getResultsTaxons.length && getResultsProducts.length">
            {{ Translator.trans('sylius.search.no_taxon') }}
        </p>
    </div>
</template>

<script setup>
import useStore from '../../store/store'
import ResultsTaxon from './ResultsTaxon.vue'

const Translator = window.Translator

const { getResultsProducts } = useStore.resultsProducts()

const { getResultsTaxons } = useStore.resultsTaxons()
</script>
