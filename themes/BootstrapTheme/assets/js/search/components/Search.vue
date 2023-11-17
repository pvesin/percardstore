<template>
    <div v-click-outside="() => setSearchIsOpened(false)">
        <div @click="openSearch" class="bg-gray-200 transition-fast rounded py-2 px-2 flex-flow-centerY flex-nowrap">
            <i class="z-2 Icon-search text-primary cursor-pointer me-3"></i>
            <input type="text"
                   class="flex-1 bg-transparent border-0 outline-none"
                   :placeholder="Translator.trans('sylius.search.placeholder')">
        </div>

        <Transition name="Animation-transform-opacity">
            <div v-show="searchIsOpened"
                 class="z-6 position-fixed top-0 start-0 end-0 bg-white pt-4 shadow">
                <div class="flex-flow-between align-items-center px-4 pb-4">
                    <a href="/" :class="{'flex-flow-center mb-4 w-100': isTablet()}">
                        <img :src="getSearchLogoObject.path" :alt="getSearchLogoObject.name" class="w-20">
                    </a>

                    <SearchBar/>

                    <div
                        class="w-8 h-8 rounded-circle flex-flow-center bg-gray-200 transition-fast cursor-pointer"
                        @click="onClickClose">
                        <i class="fas fa-close fs-2 text-primary fw-bold"></i>
                    </div>
                </div>

                <Results/>
            </div>
        </Transition>
    </div>

    <Transition name="Animation-opacity">
        <div v-show="searchIsOpened" class="z-5 position-fixed inset-0 backdrop-blur-sm backdrop-brightness-95"></div>
    </Transition>
</template>

<script setup>
import useStore from '../store/store'
import Results from './Results'
import SearchBar from './Search/SearchBar'
import { isTablet } from '../../common/utils/viewport'

const Translator = window.Translator

const props = defineProps({
    domInstance: Object,
    searchLogoObject: Object,
})

const { searchLogoObject } = props

const { searchIsOpened, setSearchIsOpened }          = useStore.search()
const { fetchSearchLogoObject, getSearchLogoObject } = useStore.common()

fetchSearchLogoObject(searchLogoObject)

/**
 *
 * @param event
 */
const openSearch = (event) => {
    setSearchIsOpened(true)

    const inputSearch = document.querySelector('.js-input-search')
    if (!inputSearch) return

    setTimeout(() => {
        inputSearch.focus()
    }, 250)
}

/**
 *
 * @param event
 */
const onClickClose = (event) => {
    setSearchIsOpened(false)
}
</script>
