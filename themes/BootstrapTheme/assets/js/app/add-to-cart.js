import axios from 'axios'
import { checkErrors } from './form-errors-checker'
import reloadCaptcha from '../modules/reload-recaptcha'
import EventBus from '../common/utils/eventBusVanilla'
import EVENTS from '../common/constants/events'

const CSS_CLASSES = {
    LOADER_WHITE: ['Loader', 'Loader--primary'],
    TRIGGER_BUTTON_LOADING: ['cursor-not-allowed', 'bg-white', 'text-primary']
}

export default () => {
    const forms = document.querySelectorAll('form.js-form-add-to-cart');
    [...forms].forEach(form => {
        init(form)
    })
}

/**
 *
 */
const init = (form) => {
    const triggerButton = form.querySelector('.js-add-to-cart-add_to_cart_immediately')

    if (!triggerButton) return

    triggerButton.addEventListener('click', e => {
            e.stopPropagation()
            e.preventDefault()

            const span = triggerButton.querySelector('.js-span-add-to-cart')
            const spanText = span ? span.innerHTML : ''
            if (span) {
                span.innerHTML = ''
                span.classList.add(...CSS_CLASSES.LOADER_WHITE)
            }

            triggerButton.disabled = true
            triggerButton.classList.add(...CSS_CLASSES.TRIGGER_BUTTON_LOADING)

            const formData = new FormData(form)

            const action = triggerButton.dataset.action || form.action

            const productQuantity = +formData.get('sylius_add_to_cart[cartItem][quantity]')

            form.querySelectorAll('input[type="file"]').forEach(i => {
                formData.append(i.name, i.files[0])
            })

            axios.post(action,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            ).then((response) => {
                EventBus.dispatchEvent(EVENTS.ADDED_TO_CART)
                if (span) {
                    span.classList.remove(...CSS_CLASSES.LOADER_WHITE)
                    span.innerHTML = Translator.trans('sylius.cart.item_added')
                }
            }).catch(({ response: { data } }) => {
                triggerButton.disabled = false
                triggerButton.classList.remove(...CSS_CLASSES.TRIGGER_BUTTON_LOADING)
                if (span) {
                    span.classList.remove(...CSS_CLASSES.LOADER_WHITE)
                    span.innerHTML = spanText
                }

                checkErrors({ response: data.errors ?? {}, form })
                reloadCaptcha()
            })
        }
    )
}
