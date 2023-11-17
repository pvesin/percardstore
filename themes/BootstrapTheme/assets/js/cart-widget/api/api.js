import axios from 'axios'
import LocaleRouter from '../../common/routing/LocaleRouter';
import { ROUTES_AJAX } from '../../common/routing/routes'

/**
 *
 * @returns {Promise<any>}
 */
export const ApiFetchProductsInCart = async () => {
    const res = await axios.get(LocaleRouter.generate(ROUTES_AJAX.CART_SUMMARY_AJAX,{'_locale': LocaleRouter.getLocale()}))

    return res.data
}
