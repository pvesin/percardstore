import './app/fontawesome';
import { default as Scripts } from './modules/load-scripts'
import { VM_CART_WIDGET, VM_SEARCHBAR } from './common/constants/vueInstances'
import axios from 'axios'
import Translator from 'bazinga-translator'
import Routing from '../../../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js'

(async () => {
    let translationData = [];
    let routingData     = [];
    window.Translator   = Translator;
    window.Routing      = Routing;

    try {
        await Promise.all([
            new Promise((resolve) => {
                axios.get('/js/fos_js_routes.json').then(({ data }) => {
                    routingData = data;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                axios.get(`/${ document.body.dataset.locale }/translations/messages.json?locales=${ document.body.dataset.locale }`)
                    .then(({ data }) => {
                        translationData = data;
                        resolve();
                    });
            }),
        ]);
        window.Routing.setRoutingData(routingData);
        window.Translator.fromJSON(translationData);
    } catch (e) {
        // TODO: handle fail
    }

    await Scripts({
        params: {
            // slider: [GLIDE_REFS],
        },
        additionalScripts: [
            {
                module: () => import ('./app/asdoria-sylius-quote-request-plugin/shop-add-to-quote'),
                element: document.querySelectorAll('.sylius-autocomplete.dropdown'),
            },
            {
                module: () => import ('./app/asdoria-sylius-quote-request-plugin/shop-quote-request'),
                element: document.querySelectorAll('.sylius-autocomplete.dropdown'),
            },
            {
                module: () => import ('./app/add-to-cart'),
                element: document.querySelectorAll('form.js-form-add-to-cart'),
            },
            {
                module: () => import ('./app/animation-number'),
                element: document.querySelectorAll('.js-animation-number'),
            },
            {
                module: () => import ('./app/form-errors-checker'),
                element: document.querySelector('#form-errors'),
            },
            {
                module: () => import ('./app/menu'),
                element: document.querySelector('.js-menu'),
            },
            {
                module: () => import ('./app/toggle-wishlist'),
                element: document.querySelectorAll('.js-wishlist-action'),
            },
            {
                module: () => import ('./cart-widget'),
                element: VM_CART_WIDGET
            },
            {
                module: () => import ('./search'),
                element: VM_SEARCHBAR
            },
        ]
    })
})()
