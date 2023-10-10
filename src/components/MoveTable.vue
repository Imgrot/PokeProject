<script setup>
import { defineProps } from 'vue'
import { formatString } from './formatString.js'
import DataTable from 'datatables.net-vue3';

const props = defineProps({
    moves: Array
})


</script>

<template>
    <div class="mt-4">
        <h2 class="text-lg font-semibold">Moves:</h2>
        <Datatable class="w-full text-sm text-left text-gray-500 dark:text-black">
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
                <tr v-for="move in moves" :key="move.name">
                    <td>{{ formatString(move.type) }}</td>
                    <td>{{ formatString(move.category) }}</td>
                    <td>{{ formatString(move.name) }}</td>
                    <td>{{ move.power }}</td>
                    <td>{{ move.pp }}</td>
                </tr>
            </tbody>
        </Datatable>
    </div>
</template>

