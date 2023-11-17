const CSS_CLASSES = {
    INPUT_HAS_ERRORS: 'Input-has-error',
    HIDDEN: 'd-none',
}

const defaultOptions = {
    errorsContainer: document.querySelector('#form-errors'),
    response: {},
}

export default class FormErrorsChecker {
    errorsContainer
    response
    form

    /**
     *
     * @param options
     */
    constructor (options) {
        options = { ...defaultOptions, ...options }

        this.validateConstructor(options)

        const { errorsContainer, response, form } = options

        this.errorsContainer = errorsContainer
        this.response        = response
        this.form            = form
    }

    /**
     *
     * @param options
     */
    validateConstructor (options) {
        // if (!options.errorsContainer) {
        //     throw new Error('Element `errorContainer` passed to CheckFormErrors doesn\'t exist')
        // }
        if (!options.form) {
            new Error('Element `form` passed to CheckFormErrors doesn\'t exist')
        }
    }

    /**
     *
     */
    check () {
        this.init()
        this.processErrors()
    }

    /**
     *
     */
    init () {
        if (this.errorsContainer) {
            this.errorsContainer.classList.remove(CSS_CLASSES.HIDDEN)
        }

        this.clearErrors()
    }

    /**
     *
     */
    clearErrors () {
        if (this.errorsContainer) {
            this.errorsContainer.innerHTML = ''
        }

        this.form.querySelectorAll(`[name^="${ this.getBaseFormName() }"].${CSS_CLASSES.INPUT_HAS_ERRORS}`)
            .forEach(i => i.classList.remove(CSS_CLASSES.INPUT_HAS_ERRORS))
    }

    /**
     *
     */
    processErrors () {
        const ulContainer = document.createElement('ul')

        if (!this.response.errors) {
            this.addError(ulContainer, Translator.trans('sylius.base_error', {}, 'validators'))
            this.response.errors = null;
        }

        if (this.response.errors) {
            this.response.errors.forEach(error => {
                this.addError(ulContainer, error)
            })
        }

        const errors = this.response.form?.errors ?? this.response.errors;

        this.getErrorInputName(errors ?? { children: this.response.children ?? {} }).forEach(([fieldName, errors]) => {
            this.addFieldError(`${ this.getBaseFormName() }${ fieldName }`)

            // handle not mapped fields errors
            errors.forEach(error => {
                if ([...this.response.errors ?? []].includes(error)) return;
                this.addError(ulContainer, error)
            })
        })

        if (this.errorsContainer) {
            this.errorsContainer.appendChild(ulContainer)
        }

        this.scrollToErrorContainer()
    }


    /**
     *
     * @param container    {Element}
     * @param errorMessage {string}
     */
    addError (container, errorMessage) {
        const errorElement     = document.createElement('li')
        errorElement.innerText = Translator.trans(errorMessage, {}, 'validators')
        container.appendChild(errorElement)

    }

    /**
     *
     * @param fieldName
     */
    addFieldError (fieldName) {
        const field = this.form.querySelector(`[name="${ fieldName }"]`);

        if (!field) return;

        field.classList.add(CSS_CLASSES.INPUT_HAS_ERRORS)
    }

    /**
     *
     * @param formErrors
     * @param list
     * @param name
     * @returns {*[]}
     */
    getErrorInputName (formErrors, list = [], name = '') {
        if (formErrors.errors) {
            list.push([name, formErrors.errors])
        }

        Object.entries(formErrors.children ?? {}).forEach(([fieldName, field]) => {
            this.getErrorInputName(field, list, `${ name }[${ fieldName }]`)
        })

        return list
    }

    /**
     *
     * @returns {string}
     */
    getBaseFormName () {
        const input = this.form.querySelector('input')

        const [baseFormName] = input.name.split('[')

        return baseFormName
    }

    /**
     *
     */
    scrollToErrorContainer () {
        if (this.errorsContainer) {
            window.location.href = `#${this.errorsContainer.id}`
        }
    }
}

/**
 *
 * @param options
 */
export const checkErrors = (options) => {
    const checker = new FormErrorsChecker(options)
    checker.check()
}
