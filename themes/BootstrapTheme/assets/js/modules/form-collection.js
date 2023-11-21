/**
 * Collection Form plugin
 *
 * @param element
 * @constructor
 */
class CollectionForm {
    constructor (element) {
        this.addItem         = this.addItem.bind(this)
        this.updateItem      = this.updateItem.bind(this)
        this.deleteItem      = this.deleteItem.bind(this)
        this.updatePrototype = this.updatePrototype.bind(this)

        this.$element   = element
        this.$list      = this.$element.querySelector('[data-form-collection="list"]')
        this.count      = this.$list.children.length
        this.lastChoice = null

        const addCollectionButton = this.$element.querySelector('[data-form-collection="add"]')
        if (addCollectionButton) {
            addCollectionButton.addEventListener('click', this.addItem)
        }

        const deleteCollectionButtons = this.$element.querySelectorAll('[data-form-collection="delete"]');
        [...deleteCollectionButtons].forEach(deleteCollectionButton => {
            deleteCollectionButton.addEventListener('click', this.deleteItem)
        })

        const updateCollectionButton = this.$element.querySelector('[data-form-collection="update"]')
        if (updateCollectionButton) {
            updateCollectionButton.addEventListener('change', this.updateItem)
        }

        const updatePrototypeButton = document.querySelector('[data-form-prototype="update"]')
        if (updatePrototypeButton) {
            updatePrototypeButton.addEventListener('change', this.updatePrototype)
        }

        document.addEventListener('collection-form-add', (event) => {
            const addedElement  = event.detail[0]
            const collection = addedElement.closest('[data-form-type="collection"]')
            CollectionFormPlugin(collection)

            addedElement.querySelector('[data-form-collection="delete"]').addEventListener('click', this.deleteItem)

            document.dispatchEvent(new CustomEvent('dom-node-inserted', { detail: [addedElement] }))
        })
    }

    /**
     * Add a item to the collection.
     * @param event
     */
    addItem (event) {
        event.preventDefault()

        let { prototype, prototypeName } = this.$element.dataset
        const prototypeNameValue         = new RegExp(prototypeName, 'g')

        prototype = prototype.replace(prototypeNameValue, this.count)

        this.$list.insertAdjacentHTML('beforeend', prototype)
        this.count = this.count + 1

        document.dispatchEvent(new CustomEvent('collection-form-add', { detail: [this.$list.lastElementChild] }))
    }

    /**
     * Update item from the collection
     */
    updateItem (event) {
        event.preventDefault()
        const $element   = event.currentTarget
        const url        = $element.dataset.formUrl
        const value      = $element.value
        const $container = $element.closest('[data-form-collection="item"]')
        const index      = $container.dataset.formCollectionIndex
        const position   = $container.dataset.formCollectionIndex

        if (url) {
            fetch(url, { id: value, position })
                .then((res) => {
                    return res.text()
                })
                .then((body) => {
                    $container.innerHTML = body
                })
        } else {
            let $prototype    = this.$element.querySelector(`[data-form-prototype="${ value }"]`)
            let prototypeName = new RegExp($prototype.dataset.subprototypeName, 'g')

            let prototype = $prototype.value.replace(prototypeName, index)

            const parent = $container.parentNode
            parent.replaceChild(prototype, $container)
        }
        document.dispatchEvent(new CustomEvent('collection-form-update', { detail: [event.currentTarget] }))
    }

    /**
     * Delete item from the collection
     * @param event
     */
    deleteItem (event) {
        event.preventDefault()

        event.currentTarget
            .closest('[data-form-collection="item"]')
            .remove()

        document.dispatchEvent(new CustomEvent('collection-form-delete', { detail: [event.currentTarget] }))
    }

    /**
     * Update the prototype
     * @param event
     */
    updatePrototype (event) {
        const $target     = event.currentTarget
        let prototypeName = $target.value

        if ($target.dataset.formPrototypePrefix !== undefined) {
            prototypeName = $target.dataset.formPrototypePrefix + prototypeName
        }

        if (this.lastChoice !== null && this.lastChoice !== prototypeName) {
            this.$list.innerHTML = ''
        }

        this.lastChoice = prototypeName

        const prototypeValue = this.$element.querySelector(`[data-form-prototype="${ prototypeName }"]`).value
        this.$element.data('prototype', prototypeValue)
    }
}

const CollectionFormPlugin = (element) => {
    const { collectionForm } = element.dataset
    if (!collectionForm) {
        element.setAttribute('data-collection-form', new CollectionForm(element))
    }
}

export default () => {
    const formCollections = document.querySelectorAll('[data-form-type="collection"]');
    [...formCollections].forEach(formCollection => {
        CollectionFormPlugin(formCollection)
    })
}
