import axios from 'axios'
import LocaleRouter from '../common/routing/LocaleRouter'

const CLASS_LIKED = 'js-liked'

const toggleWishlist = (buttonAction) => {
    buttonAction.addEventListener('click', () => {
        const icon = buttonAction.querySelector('.js-wishlist-icon')
        const productId = buttonAction.dataset.productId

        if (!icon || productId === undefined) return

        if (icon.classList.contains(CLASS_LIKED)) {
            icon.classList.remove(CLASS_LIKED)

            axios.post(LocaleRouter.generate('bitbag_sylius_wishlist_plugin_shop_wishlist_remove_product', {
                '_locale': LocaleRouter.getLocale(),
                productId: Number(productId),
            })).catch(err => console.log(err))

            return
        }

        icon.classList.add(CLASS_LIKED)

        axios.post(LocaleRouter.generate('bitbag_sylius_wishlist_plugin_shop_wishlist_add_product', {
            '_locale': LocaleRouter.getLocale(),
            productId: Number(productId),
        })).catch(err => console.log(err))
    })
}

export default () => {
    const buttonsAction = document.querySelectorAll('.js-wishlist-action');

    [...buttonsAction].forEach(buttonAction => {
        toggleWishlist(buttonAction)
    })
}
