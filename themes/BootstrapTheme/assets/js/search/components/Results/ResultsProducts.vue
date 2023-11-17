<template>
    <div class="col-12 col-lg-9 d-flex flex-column mb-4 text-primary">
        <p class="mb-2 pb-1 fw-bold border-bottom">
            <span v-if="getCurrentSlug">
                {{ Translator.transChoice('sylius.search.products_of_taxon', getCurrentTaxon.name, { taxonName: getCurrentTaxon.name}) }}
            </span>
            <span v-else>{{ Translator.trans('sylius.ui.products') }}</span>
            <span> ({{ getTotalResultsProducts }})</span>
        </p>

        <template v-if="getResultsProducts.length">
            <ul class="d-flex flex-wrap mb-4">
                <li v-for="(product, index) in getResultsProductsFiltered"
                    :key="index"
                    class="Card-product Card-product--search mb-2">
                    <a :href="productUrl(product.slug)">
                        <Transition name="Animation-opacity">
                            <img :src="imagePath(product.images[0].path)" :alt="product.name" class="mb-4">
                        </Transition>
                        <p class="line-clamp-3">{{ product.name }}</p>
                    </a>
                </li>
            </ul>

            <div class="flex-flow-center">
                <a :href="getFullLink" class="Button Button--primary text-center w-100 mw-320">
                    {{ Translator.trans('sylius.shop.see_all_products') }}
                </a>
            </div>
        </template>

        <p v-if="getResultsTaxons.length && !getResultsProducts.length">
            {{ Translator.trans('sylius.search.no_product') }}
        </p>
    </div>
</template>

<script>
import useStore from '../../store/store'
import { IMAGE_PLACEHOLDER_400x300 } from '../../../common/constants/image-placeholder'
import Router from '../../../common/routing/Router'
import { ROUTES_CATALOG, ROUTES_LIIP } from '../../../common/routing/routes'
import { LIIP_FILTERS } from '../../../common/constants/liip-imagine'
import LocaleRouter from '../../../common/routing/LocaleRouter'

export default {
    name: 'ResultsProducts',
    setup () {
        const { getResultsProducts, getResultsProductsFiltered, getTotalResultsProducts } = useStore.resultsProducts()
        const { getResultsTaxons }                                                        = useStore.resultsTaxons()
        const { getFullLink, getCurrentTaxon, getCurrentSlug }                            = useStore.search()

        /**
         *
         * @param path
         * @returns {*|string}
         */
        const imagePath = (path) => {
            return path ? Router.generate(ROUTES_LIIP.IMAGINE_FILTER, {
                path: path || null,
                filter: LIIP_FILTERS.SYLIUS_SHOP_PRODUCT_THUMBNAIL
            }) : IMAGE_PLACEHOLDER_400x300
        }

        /**
         *
         * @param slug
         * @returns {*}
         */
        const productUrl = (slug) => {
            return LocaleRouter.generate(ROUTES_CATALOG.PRODUCT_SHOW, {
                '_locale': LocaleRouter.getLocale(),
                slug: slug,
            })
        }

        return {
            getResultsProducts,
            getTotalResultsProducts,
            getResultsProductsFiltered,
            getResultsTaxons,
            getCurrentTaxon,
            getCurrentSlug,
            getFullLink,
            imagePath,
            productUrl,
            Translator,
        }
    }
}
</script>
