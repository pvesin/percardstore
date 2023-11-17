class InputNumber {
    constructor (quantityContainer) {
        this.input     = quantityContainer.querySelector('.js-input-number')
        this.decrement = quantityContainer.querySelector('[data-input-number-operator="-"]')
        this.increment = quantityContainer.querySelector('[data-input-number-operator="+"]')
    }

    /**
     *
     */
    onChange () {
        this.input.addEventListener('change', (event) => {
            this.input.value = event.target.value
            this.input.setAttribute('value', this.input.value)
        })
    }

    /**
     *
     */
    onClick () {
        [this.increment, this.decrement].forEach(trigger => {
            trigger.addEventListener('click', () => {
                const { inputNumberOperator } = trigger.dataset

                this.input.value === this.minQty(this.input) ?
                    ( inputNumberOperator === '+' ? this.input.value++ : null )
                    : ( inputNumberOperator === '+' ? this.input.value++ : this.input.value-- )

                this.input.setAttribute('value', this.input.value)
            })
        })
    }

    /**
     *
     * @param input
     * @returns {*|number}
     */
    minQty (input) {
        return input.getAttribute('min') || 0
    }

    /**
     *
     */
    init () {
        if (!this.input) return;

        this.onChange()
        this.onClick()
    }
}

export default () => {
    const quantityContainers = document.querySelectorAll('.js-input-number-container');

    [...quantityContainers].forEach(quantityContainer => {
        const instanceInputNumber = new InputNumber(quantityContainer)
        instanceInputNumber.init()
    })
}
