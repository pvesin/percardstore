import $ from 'jquery'
import debounce from '../../common/utils/debounce'
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

$.fn.extend({
    productVariantAutoComplete () {
        this.each((idx, el) => {
            const element           = $(el)
            const criteriaName      = element.data('criteria-name')
            const autocompleteInput = element.find('input.autocomplete')
            const dropdownInput     = element.find('input.dropdown-toggle')
            const dropdownImage     = element.find('img.dropdown-image')
            const url               = element.data('url')
            const loadEditUrl       = element.data('load-edit-url')
            const menuElement       = element.find('div.dropdown-menu')

            let abortController
            const dropdown = new Dropdown(element)

            if (!dropdownInput.length) return

            if (autocompleteInput.val()) {
                ApiFetchProductVariantsByCodes(loadEditUrl, autocompleteInput.val()).then(data => {
                    dropdownInput.val(data[0]['descriptor'])
                    dropdownImage.attr("src", data[0]['image'])
                })
            }

            dropdownInput[0].addEventListener('keydown', debounce(() => {
                menuElement.empty()
                if (!!abortController) {
                    abortController.abort()
                    abortController = null
                }
                abortController = new AbortController()
                ApiFetchProductVariantsByPhrase(url, criteriaName, dropdownInput.val(), abortController).then(data => {
                    data.forEach((item) => {
                        menuElement.append(
                            $(`<div class="item cursor-pointer" data-value="${ item['code'] }" data-slug="${ item['slug'] }">
                                    <img class="rounded-circle" style="width: 2.5rem;" src="${ item['image'] }">
                                    <span>${ item['descriptor'] }</span>
                                </div>`).on('click', () => {
                                autocompleteInput.val(item['code'])
                                dropdownInput.val(item['descriptor'])
                                dropdownImage.attr("src", item['image'])
                            })
                        )
                    })
                })
            }, 1000))

            dropdownInput[0].addEventListener('click', () => {
                if (autocompleteInput.val()) {
                    autocompleteInput.removeAttr('value')
                    dropdownInput.val('')
                    dropdownImage.removeAttr('src')
                }
            })
        })
    },
})