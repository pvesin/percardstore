<template>
    <teleport to=".vm-cart-widget-mobile-teleported" :disabled="!isTablet()">
        <div class="mx-1 position-relative lh-1">
            <div @click="setModalIsOpened(true)"
                 class="cursor-pointer transition-fast d-block">
                <Quantity/>
            </div>

            <teleport to=".vm-cart-widget-modal">
                <Transition name="Animation-translateX-byRight">
                    <Content v-show="modalIsOpened"/>
                </Transition>

                <Transition name="Animation-opacity">
                    <div v-show="modalIsOpened"
                         @click="setModalIsOpened(false)"
                         class="zindex-modal-backdrop position-fixed inset-0 bg-white-75"></div>
                </Transition>
            </teleport>
        </div>
    </teleport>
</template>

<script setup>
import useStore from '../store/store'
import Quantity from './Quantity'
import Content from './Content'
import EventBus from '../../common/utils/eventBusVanilla'
import EVENTS from '../../common/constants/events'
import { ApiFetchProductsInCart } from '../api/api'
import { isTablet } from '../../common/utils/viewport'

const Translator = window.Translator

const props = defineProps({
    routeCart: String,
    currency: String,
    data: Object,
})

const { routeCart, currency, data } = props

const { fetchProductInCart } = useStore.products()
const { fetchCurrency }      = useStore.shop()

const { modalIsOpened, setModalIsOpened, fetchCartUrl } = useStore.cart()

fetchProductInCart(data)
fetchCartUrl(routeCart)
fetchCurrency(currency)

EventBus.addEventListener(EVENTS.ADDED_TO_CART, () => {
    ApiFetchProductsInCart().then(data => {
        fetchProductInCart(data)
        setModalIsOpened(true)
    })
})
</script>
