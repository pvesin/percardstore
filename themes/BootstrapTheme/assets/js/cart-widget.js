import { createApp } from 'vue'
import { VM_CART_WIDGET } from './common/constants/vueInstances'
import Main from './cart-widget/components/Main'
import { clickOut } from './common/vue/directives'
import { ApiFetchProductsInCart } from './cart-widget/api/api'

export default () => {
    if (!VM_CART_WIDGET) return

    const routeCart = VM_CART_WIDGET.dataset.routeCart !== undefined ? VM_CART_WIDGET.dataset.routeCart : null
    const currency  = VM_CART_WIDGET.dataset.currency !== undefined ? VM_CART_WIDGET.dataset.currency : '€'

    ApiFetchProductsInCart().then(data => {
        createApp(Main, {
            data,
            routeCart,
            currency,
        })
            .directive('click-outside', clickOut)
            .mount(VM_CART_WIDGET)
    })
}
