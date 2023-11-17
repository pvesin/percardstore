export default (params) => [
    {
        module: () => import ('./form-collection'),
        element: document.querySelectorAll('[data-form-type="collection"]'),
        name: 'form-collection',
    },
    {
        module: () => import ('./input-number'),
        element: document.querySelector('.js-input-number-container'),
        name: 'input-number',
    },
    {
        module: () => import ('./lazyload'),
        element: document.querySelector('.js-lazyload'),
        name: 'lazyload',
    },
    {
        module: () => import ('./slider'),
        element:document.querySelector('.js-init-slider'),
        priority: -1,
        name: 'slider',
        params: params.slider,
    },
]
