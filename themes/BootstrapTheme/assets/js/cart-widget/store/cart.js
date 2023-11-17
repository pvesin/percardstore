import { computed, ref } from 'vue'

const state = ref({
    modalIsOpened: false,
    url: '',
    loading: false,
})

export default () => {
    /**
     *
     */
    const modalIsOpened = computed(() => state.value.modalIsOpened)

    /**
     *
     * @param bool
     */
    const setModalIsOpened = (bool) => state.value.modalIsOpened = bool

    /**
     *
     * @param url
     * @returns {string}
     */
    const fetchCartUrl = (url = '') => state.value.url = url

    /**
     *
     */
    const getCartUrl = computed(() => state.value.url)


    /**
     *
     */
    const loading = computed(() => state.value.loading)

    /**
     *
     * @param bool
     * @returns {UnwrapRef<boolean>}
     */
    const setLoading = (bool) => state.value.loading = bool

    return {
        modalIsOpened,
        setModalIsOpened,
        fetchCartUrl,
        getCartUrl,
        loading,
        setLoading,
    }
}
