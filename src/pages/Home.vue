<script setup>
import { reactive, toRefs, computed} from 'vue'

const state = reactive({
    pokemons: [],
    name:'',
    filterPokemon:computed(() => searchPokemon())
})

function searchPokemon(){
    return state.pokemons.filter(pokemon => pokemon.name.includes(state.name.toLowerCase()))
};
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const {  name, filterPokemon } = toRefs(state)

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(res => res.json())
    .then(data => {
        data.results.forEach((element, index) => {
            const pokemon = {
                ...element,
                index: index + 1
            }
            state.pokemons.push(pokemon)
        })
    })

</script>

<template>
    <div class="div">
        <div class="grid grid-cols-6 gap-1">
            <div class="col-span-1">
                <input type="text" class="mb-3 p-2 border-black-500 border-2 w-100"
                placeholder="Nombre del Pokemon" v-model="name">
                <ul class="overflow-y-auto max-h-96">
                    <li v-for="pokemon in filterPokemon" :key="pokemon.index"
                        class="p-2 rounded hover:text-red-400 hover-bg-red-100">
                        <span class="text-sm font-normal text-gray-500">#{{ pokemon.index }}  </span>
                        <router-link :to="`/details/${pokemon.index}`"> {{capitalizeFirstLetter( pokemon.name )}}</router-link>
                    </li>
                </ul>
            </div>

            <div class="col-span-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

