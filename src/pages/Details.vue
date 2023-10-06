<script setup>
import { useRoute } from 'vue-router'
import BarChart from '../components/BarChart.vue';
import RadarChart from '../components/RadarChart.vue';
import { reactive, toRefs, computed, ref, onMounted, watch } from 'vue'

const state = reactive({
    pokemon: null,
    stats: computed(() => filterStats()),
    types: computed(() => filterTypes())
})

function filterStats() {
    if (state.pokemon) {
        return state.pokemon.stats.map(stat => stat.base_stat)
    }
}
function filterTypes() {
    if (state.pokemon) {
        return state.pokemon.types.map(type => type.type.name)
    }
}
function filterAbility() {
    if (state.pokemon) {
        return state.pokemon.ability.map(type => ability.name)
    }
}
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const route = useRoute()
const { pokemon, stats, types, ability } = toRefs(state)

const getData = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then(res => res.json())
        .then(data => {
            state.pokemon = data
        })
}

watch(route, () => {
    getData()
})

function getTypeColor(type) {
        const typeColors = {
            'water': 'bg-blue-500',
            'fire': 'bg-red-500',
            'grass': 'bg-green-500',
            'electric': 'bg-yellow-500',
            'ice': 'bg-cyan-500',
            'fighting': 'bg-orange-500',
            'poison': 'bg-purple-500',
            'ground': 'bg-brown-800',
            'flying': 'bg-indigo-500',
            'psychic': 'bg-pink-500',
            'bug': 'bg-lime-500',
            'rock': 'bg-gray-500',
            'ghost': 'bg-indigo-800',
            'steel': 'bg-gray-400',
            'dragon': 'bg-indigo-900',
            'dark': 'bg-gray-900',
            'fairy': 'bg-pink-300',
            'normal': 'bg-gray-300',
        };

        return typeColors[type.toLowerCase()] || 'bg-gray-300';
    }


onMounted(() => {
    getData()
})

const isBarChart = ref(true)

const changeChart = () => {
    isBarChart.value = !isBarChart.value
}

</script>
<template>
    <div>
        <div v-if="pokemon">
            <div class="w-4/6 bg-red-100 mx-auto rounded-xl p-10 shadow-xl">

                <h1 class="font-black md:text-3x1 text-xl text-red-900">{{ capitalizeFirstLetter(pokemon.name) }}</h1>

                <span v-for="type in types" :key="type"
                    :class="['py-1 px-2 shadow-md rounded-full text-black font-semibold mr-2 mt-3', getTypeColor(type)]">
                    {{ capitalizeFirstLetter(type) }}
                </span>



                <div class="flex flex-wrap">
                    <div class="flex-1 grid place-items-center">
                        <img class="w-40 h-48" :src="pokemon.sprites.front_default" :alt="`Imagen de ${pokemon.name}`">
                    </div>
                    <div class="flex-1">
                        <button @click="changeChart()">{{ isBarChart ? 'Radar' : 'Bar' }}</button>
                        <component :is="isBarChart ? BarChart : RadarChart" :stats="stats" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>No hay datos Disponibles</h1>
        </div>
    </div>
</template>
