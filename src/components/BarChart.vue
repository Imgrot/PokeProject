<script setup>
import { computed } from 'vue'
const props = defineProps({
    stats: Array
})
const options = {
    chart: {
        id: 'Stats-Chart'
    },
    xaxis: {
        categories: ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE']
    }
}

const series = computed(() => {
    return [
        {
            name: 'Stat',
            data: props.stats
        }
    ]
})

</script>

<template>
    <div>
        <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </div>
</template>