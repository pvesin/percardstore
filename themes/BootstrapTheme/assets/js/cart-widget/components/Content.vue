<template>
    <div class="z-max position-fixed top-0 end-0 bottom-0 mw-450 w-100 flex-column bg-white p-4 shadow text-black" :class="{ 'd-flex' : modalIsOpened }">
        <Transition name="Animation-fade">
            <div v-show="transitionLoaded" class="flex-flow-between">
                <p class="fw-bold mb-3 fs-3 text-center">
                    {{ Translator.trans('sylius.cart.my_cart') }}
                </p>
                <span @click="setModalIsOpened(false)">
                    <i class="fas fa-close fs-3 cursor-pointer"></i>
                </span>
            </div>
        </Transition>

        <Transition name="Animation-fade">
            <p v-show="!getProducts.length && transitionLoaded" class="mt-3">
                {{ Translator.trans('sylius.cart.your_cart_is_currently_empty') }}
            </p>
        </Transition>

        <Transition name="Animation-fade">
            <ul v-show="getProducts.length && transitionLoaded"
                class="mh-cart-widget overflow-y-auto mb-4 border-bottom">
                <li v-for="(product, index) in getProducts" :key="index" class="flex-flow-centerY py-4">
                    <Product :product="product"/>
                </li>
            </ul>
        </Transition>


        <Transition name="Animation-fade">
            <div v-show="getProducts.length && transitionLoaded" class="flex-1 flex-column justify-content-end" :class="{ 'd-flex' : getProducts.length && transitionLoaded }">
                <div class="flex-flow-between mb-2">
                    <span>{{ Translator.trans('sylius.cart.delivery') }}</span>
                    <span>{{ formatNumberToString(getAdjustmentsTotal, 100) + ' ' + getCurrency }}</span>
                </div>

                <div class="flex-flow-between align-items-center mb-4 fw-bold">
                    <span>{{ Translator.trans('sylius.ui.total') }}</span>
                    <span class="fs-4">{{ formatNumberToString(getTotal, 100) + ' ' + getCurrency }}</span>
                </div>

                <div class="flex-flow-center">
                    <a :href="getCartUrl" class="Button Button--base border border-black border-2 w-100">
                        {{ Translator.trans('sylius.cart.my_cart') }}
                    </a>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import useStore from '../store/store'
import formatNumberToString from '../../common/utils/formatNumberToString'
import Product from './Content/Product'
import { ref, watch } from 'vue'

const Translator = window.Translator

const { getProducts, getTotal, getAdjustmentsTotal }           = useStore.products()
const { getCartUrl, loading, setModalIsOpened, modalIsOpened } = useStore.cart()
const { getLocale, getCurrency }                               = useStore.shop()

const transitionLoaded = ref(false)

watch(() => modalIsOpened.value, (newV) => {
    if (newV) {
        setTimeout(() => {
            transitionLoaded.value = true
        }, 300)
    }

    if (!newV) {
        transitionLoaded.value = false
    }
})
</script>
