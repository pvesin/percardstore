<template>
    <div class="position-relative d-flex align-items-center text-uppercase" :class="{'text-white' : !isTablet()}">
        <i class="Icon-cart fs-2"></i>
        <span class="Cart-badge fs-7 position-absolute top-0 start-0 translate-middle bg-white border border-primary rounded-circle text-primary lh-1 flex-flow-center">
            {{ getTotalQuantity }}
        </span>
    </div>
</template>

<script setup>
import useStore from '../store/store'
import { isTablet } from '../../common/utils/viewport'

const { getTotalQuantity } = useStore.products()
</script>
