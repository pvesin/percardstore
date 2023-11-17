<template>
    <a :href="urlTaxonBySlug(taxon.slug)"
       @mouseenter="onMouseEnter"
       @click="onClick"
       class="transition-fast py-2 d-block lh-1"
       :class="[getCurrentSlug === taxon.slug ? 'bg-primary text-white px-2' : 'text-gray-800']">
                    <span v-for="(part, index) in getTaxonNameSplit"
                          :key="index"
                          :class="{'fw-bold' : getCurrentValue.includes(part) }">{{ part }}</span>
    </a>
</template>

<script setup>
import useStore from '../../store/store'
import { computed } from 'vue'
import { isTablet } from '../../../common/utils/viewport'

const { setCurrentTaxon, getCurrentSlug, getCurrentValue, fetchProductsByTaxon } = useStore.search()
const { urlTaxonBySlug }                                                         = useStore.resultsTaxons()

const {
          getResultsProducts,
          setResultsProducts,
          setProductsLoaded,
          getResultsProductsByTaxon,
          getSlugsOfResultsProductsByTaxon,
          setTotalResultsProducts
      } = useStore.resultsProducts()

const props = defineProps({
    taxon: Object
})

const { taxon } = props

const process = () => {
    const currentResultsProductsByTaxon = computed(() => getResultsProductsByTaxon.value.find(obj => obj.slug === taxon.slug))

    if (!getSlugsOfResultsProductsByTaxon.value.includes(taxon.slug)) {
        setProductsLoaded(false)

        fetchProductsByTaxon({ slug: taxon.slug })
            .then(() => {
                if (!currentResultsProductsByTaxon.value?.slug) return

                if (currentResultsProductsByTaxon.value.slug === getCurrentSlug.value) {
                    setResultsProducts(currentResultsProductsByTaxon.value.items)
                    setTotalResultsProducts(currentResultsProductsByTaxon.value.totalProducts)
                }

                setProductsLoaded(true)
            })
            .catch(err => console.log(err))

        return
    }

    setResultsProducts(currentResultsProductsByTaxon.value.items)
    setTotalResultsProducts(currentResultsProductsByTaxon.value.totalProducts)
}

/**
 *
 * @param event
 */
const onClick = (event) => {
    event.preventDefault()
    setCurrentTaxon(taxon)

    if (!isTablet()) return

    process()
}

/**
 *
 */
const onMouseEnter = () => {
    setCurrentTaxon(taxon)

    if (isTablet()) return

    process()
}

const getTaxonNameSplit = computed(() => {
    const regex = new RegExp('(' + getCurrentValue.value.toLowerCase().split(' ').join('|') + ')+', 'g')
    return taxon.name.toLowerCase().split(regex).filter(part => part)
})
</script>
