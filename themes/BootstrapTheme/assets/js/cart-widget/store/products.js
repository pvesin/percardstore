import { computed, reactive } from 'vue'

const state = reactive({
    allData: {},
    products: [],
})

export default () => {
    /**
     *
     * @returns {Promise<T>}
     */
    const fetchProductInCart = (data) => {
        state.allData = data
        state.products = state.allData.items
    }

    /**
     *
     */
    const getAllData = computed(() => state.allData)

    /**
     *
     */
    const getProducts = computed(() => state.products)

    /**
     *
     */
    const getTotalQuantity = computed(() =>
        getProducts.value.reduce((acc, { quantity }) => {
            return acc + quantity
        }, 0)
    )

    /**
     *
     */
    const getTotal = computed(() => state.allData.total)

    /**
     *
     */
    const getAdjustmentsTotal = computed(() => state.allData.adjustmentsTotal)


    return {
        getAllData,
        fetchProductInCart,
        getProducts,
        getTotalQuantity,
        getTotal,
        getAdjustmentsTotal,
    }
}
