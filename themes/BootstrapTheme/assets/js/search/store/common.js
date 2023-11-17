import { ref, computed } from 'vue'

const state = ref({
    searchLogoObject: {},
    modalInfoIsOpened: false,
    modalResultsIsOpened: false,
})


export default () => {
    /**
     *
     * @param obj
     * @returns {{}}
     */
    const fetchSearchLogoObject = (obj = {}) => state.value.searchLogoObject = { ...obj }

    /**
     *
     */
    const getSearchLogoObject = computed(() => state.value.searchLogoObject)

    /**
     *
     */
    const modalInfoIsOpened = computed(() => state.value.modalInfoIsOpened)

    /**
     *
     * @param bool
     */
    const setModalInfoIsOpened = (bool) => state.value.modalInfoIsOpened = bool


    /**
     *
     */
    const modalResultsIsOpened = computed(() => state.value.modalResultsIsOpened)

    /**
     *
     * @param bool
     */
    const setModalResultsIsOpened = (bool) => state.value.modalResultsIsOpened = bool

    return {
        fetchSearchLogoObject,
        getSearchLogoObject,
        modalInfoIsOpened,
        setModalInfoIsOpened,
        modalResultsIsOpened,
        setModalResultsIsOpened,
    }
}
