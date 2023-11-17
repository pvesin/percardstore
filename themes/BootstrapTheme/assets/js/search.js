import { createApp } from 'vue'
import { VM_SEARCHBAR } from './common/constants/vueInstances'
import Search from './search/components/Search'
import { clickOut } from './common/vue/directives'

export default () => {
    const searchLogoObject  = VM_SEARCHBAR.dataset?.searchLogo ? JSON.parse(VM_SEARCHBAR.dataset.searchLogo) : {}

    if (!VM_SEARCHBAR) return

    createApp(Search, { searchLogoObject })
        .directive('click-outside', clickOut)
        .mount(VM_SEARCHBAR)
};
