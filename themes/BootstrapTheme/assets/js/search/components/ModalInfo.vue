<template>
    <div class="absolute bottom-100 right-0 w-60 p-1 bg-white rounded border border-orange-500 text-orange-500">
        <p>{{ Translator.transChoice('sylius.ui.search.warning', getMinChar, { minChar: getMinChar }) }}</p>
        <div
            class="absolute -top-1 -right-1 w-4 h-4 flex-flow-center rounded-full border border-orange-500 bg-white cursor-pointer">
            <i class="Icon-close-light text-xs" @click="modalInfoIsOpened = false"></i>
        </div>
    </div>
</template>

<script>
import useStore from '../store/store'

export default {
    name: 'ModalInfo',
    setup() {
        const { getMinChar } = useStore.search()
        const { modalInfoIsOpened } = useStore.common()

        return {
            modalInfoIsOpened,
            getMinChar,
            Translator,
        }
    }
}
</script>
