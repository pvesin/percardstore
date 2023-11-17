<template>
    <template v-if="!loading">
        <a :href="product.variant.slug" class="me-4" style="width: 4rem;">
            <img :src="product.variant.image" :alt="product.variant.translations[getLocale].name">
        </a>
        <div class="d-flex flex-column align-items-start flex-1">
            <a :href="product.variant.slug" class="mb-2 pb-1 has-underline">
                {{ product.variant.translations[getLocale].name }}
            </a>
            <p class="mb-2 pb-1">{{ Translator.trans('sylius.ui.quantity') }}: {{ product.quantity }}</p>
            <p class="fw-bold mb-2">{{ formatNumberToString(product.total, 100) + ' ' + getCurrency }}</p>
            <button @click="removeProduct($event, product.id)"
                    class="Button text-gray-600 fs-5 has-underline has-underline--invert pb-1">
                {{ Translator.trans('sylius.ui.delete') }}
            </button>
        </div>
    </template>

    <div v-else class="Loader-block w-100" style="height: 137px;"></div>

</template>

<script setup>
import axios from 'axios'
import LocaleRouter from '../../../common/routing/LocaleRouter'
import { ROUTES_AJAX } from '../../../common/routing/routes'
import useStore from '../../store/store'
import formatNumberToString from '../../../common/utils/formatNumberToString'
import { ref, toRefs } from 'vue'
import { ApiFetchProductsInCart } from '../../api/api'

const Translator = window.Translator

const props = defineProps({
    product: Object,
})

const { product } = toRefs(props)

const { fetchProductInCart }     = useStore.products()
const { getLocale, getCurrency } = useStore.shop()

const loading = ref(false)

/**
 *
 * @param event
 * @param productId
 */
const removeProduct = (event, productId) => {
    loading.value = true

    axios.delete(LocaleRouter.generate(ROUTES_AJAX.CART_REMOVE_ITEM, {
        '_locale': getLocale.value,
        'id': productId,
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
        .then(res => {
            ApiFetchProductsInCart().then(data => {
                fetchProductInCart(data)
                loading.value = false
            })
        })
        .catch(err => {
            console.log(err)
            loading.value = false
        })
}
</script>
