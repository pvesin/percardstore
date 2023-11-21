import debounce from '../../common/utils/debounce'
import { default as clickOut } from '../../common/utils/clickOut'
import { Dropdown } from 'bootstrap'

const ApiFetchProductVariantsByPhrase = async (url, criteriaName, searchValue = '', abortController = null) => {
    const params = {}

    if (!!abortController) {
        params.signal = abortController.signal
    }

    const res = await fetch(window.location.origin + url + '?' + criteriaName + '=' + searchValue, params)

    return await res.json()
}

const ApiFetchProductVariantsByCodes = async (url, codes = '') => {
    const res = await fetch(window.location.origin + url + '?code[]=' + codes)

    return await res.json()
}

export const productVariantAutoComplete = (elements) => {
    [...elements].forEach((el) => {
        const element           = el
        const criteriaName      = element.dataset.criteriaName
        const autocompleteInput = element.querySelector('input.autocomplete')
        const dropdownInput     = element.querySelector('input.dropdown-toggle')
        const dropdownImage     = element.querySelector('img.dropdown-image')
        const url               = element.dataset.url
        const loadEditUrl       = element.dataset.loadEditUrl
        const menuElement       = element.querySelector('div.dropdown-menu')

        let currentProduct = null

        let abortController
        const dropdown = new Dropdown(element)

        if (!dropdownInput) return

        if (autocompleteInput.value) {
            ApiFetchProductVariantsByCodes(loadEditUrl, autocompleteInput.value).then(data => {
                dropdownInput.value = data[0]['descriptor']
                dropdownImage.setAttribute('src', data[0]['image'])

                currentProduct = {
                    code: autocompleteInput.value,
                    descriptor: data[0]['descriptor'],
                    image: data[0]['image']
                }
            })
        }

        dropdownInput.addEventListener('keydown', debounce(() => {
            menuElement.innerHTML = ''
            menuElement.insertAdjacentHTML('beforeend', '<span class=\'Loader d-block mx-auto\'></span>')
            if (!!abortController) {
                abortController.abort()
                abortController = null
            }
            abortController = new AbortController()
            ApiFetchProductVariantsByPhrase(url, criteriaName, dropdownInput.value, abortController).then(data => {
                menuElement.innerHTML = ''
                if (!data.length) {
                    menuElement.inneHTML = Translator.trans('sylius.search.no_result')
                    return
                }

                data.forEach((item) => {
                    const dom = document.createElement('div')
                    dom.classList.add('item', 'cursor-pointer')
                    dom.setAttribute('data-value', item['code'])
                    dom.setAttribute('data-slug', item['slug'])

                    const content = `<img class="rounded-circle" style="width: 2.5rem;" src="${ item['image'] }">
                                    <span>${ item['descriptor'] }</span>`
                    dom.insertAdjacentHTML('beforeend', content)

                    dom.addEventListener('click', () => {
                        autocompleteInput.value = item['code']
                        dropdownInput.value     = item['descriptor']
                        dropdownImage.setAttribute('src', item['image'])

                        currentProduct = {
                            code: item['code'],
                            descriptor: item['descriptor'],
                            image: item['image']
                        }
                    })

                    menuElement.append(dom)
                })
            })
        }, 1000))

        dropdownInput.addEventListener('click', () => {
            if (autocompleteInput.value) {
                autocompleteInput.removeAttribute('value')
                dropdownInput.value = ''
                dropdownImage.removeAttribute('src')
            }
        })

        clickOut(dropdownInput, () => {
            if (!currentProduct) return

            autocompleteInput.value = currentProduct['code']
            dropdownInput.value     = currentProduct['descriptor']
            dropdownImage.setAttribute('src', currentProduct['image'])
        })
    })
}
