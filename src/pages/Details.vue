<script setup>
import { useRoute } from 'vue-router'
import BarChart from '../components/BarChart.vue';
import RadarChart from '../components/RadarChart.vue';
import { reactive, toRefs, computed, ref, onMounted, watch } from 'vue'
import { getTypeColor } from '../components/TypeColor.js'

const state = reactive({
    pokemon: null,
    stats: computed(() => filterStats()),
    types: computed(() => filterTypes()),
    abilities: [],
    movesDetails: [],
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

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatString(input) {
    const words = input.split('-');
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const result = formattedWords.join(' ');
    return result;
}

const route = useRoute()
const { pokemon, stats, types, abilities, movesDetails } = toRefs(state)

const getData = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
        const data = await response.json();

        state.pokemon = data;

        const abilities = data.abilities.map((ability) => ability.ability.name);
        state.abilities = abilities;

        const movesDetailsPromises = data.moves.map(async (move) => {
            const moveResponse = await fetch(move.move.url);
            const moveData = await moveResponse.json();
            return {
                type: moveData.type.name,
                category: moveData.damage_class.name,
                name: moveData.name,
                power: moveData.power || '-',
                pp: moveData.pp,
            };
        });

        const movesDetails = await Promise.all(movesDetailsPromises);
        state.movesDetails = movesDetails;
    } catch (error) {
        console.error('Error al obtener los datos del Pokémon:', error);
    }
};


watch(route, () => {
    getData()
})

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
                        <img class="w-40 h-48" :src="pokemon.sprites.back_default" :alt="`Imagen de ${pokemon.name}`">
                    </div>
                    <div class="flex-1">
                        <button class="py-1 px-2 shadow-md rounded-full text-black font-semibold mr-2 mt-3 bg-blue-400"
                            @click="changeChart()">
                            {{ isBarChart ? 'Switch to Radar' : 'Switch to Bar' }}</button>
                        <component :is="isBarChart ? BarChart : RadarChart" :stats="stats" />
                    </div>
                </div>

                <div class="mt-4">
                    <h2 class="text-lg font-semibold">Abilities:</h2>
                    <ul>
                        <li v-for="ability in abilities" :key="ability">
                            # {{ formatString(ability) }}
                        </li>
                    </ul>
                </div>
                <div class="mt-4">
                    <h2 class="text-lg font-semibold">Moves:</h2>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-black">
                        <thead class="thead-inverse">
                            <tr>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Name</th>
                                <th>Power</th>
                                <th>PP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="move in movesDetails" :key="move.name">
                                <td>{{ formatString(move.type) }}</td>
                                <td>{{ formatString(move.category) }}</td>
                                <td>{{ formatString(move.name) }}</td>
                                <td>{{ move.power }}</td>
                                <td>{{ move.pp }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>No hay datos Disponibles</h1>
        </div>
    </div>
</template>
