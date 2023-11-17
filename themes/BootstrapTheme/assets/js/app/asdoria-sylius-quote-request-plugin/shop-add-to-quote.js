export default () => {
    const addToQuoteButtons = document.querySelectorAll('.js-asdoria-shop-quote-request-add-to-quote')
    addToQuoteButtons.forEach(addToQuote => {
        addToQuote.addEventListener('click', (event) => {

            const ele                 = event.currentTarget
            const { action, redirect, csrfToken } = ele.dataset
            const form                            = ele.closest('form')

            const addToCartFormData = new FormData(form)
            let addToQuoteFormData  = new FormData()

            for (const key of addToCartFormData.keys()) {
                addToQuoteFormData.append(
                    key.replace('sylius_add_to_cart', 'asdoria_add_to_quote'),
                    addToCartFormData.get(key)
                )
            }

            addToQuoteFormData.append('asdoria_add_to_quote[_token]', csrfToken)

            fetch(action,
                {
                    body: addToQuoteFormData,
                    method: 'post'
                })
                .then((response) => window.location.href = redirect)
            event.preventDefault()
            event.stopPropagation()
        })
    })
}
