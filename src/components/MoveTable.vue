<script setup>
import { defineProps, computed } from 'vue'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import { formatString } from './formatString';

const props = defineProps({
    moves: Array
})

DataTable.use(DataTablesCore);

const columns = [
    { data: 'type' },
    { data: 'category' },
    { data: 'name' },
    { data: 'power' },
    { data: 'pp' },
];

const formattedMoves = computed(() => {
    return props.moves.map((move) => ({
        type: formatString(move.type),
        category: formatString(move.category),
        name: formatString(move.name),
        power: move.power,
        pp: move.pp,
    }));
});

</script>

<template>
    <div class="mt-4">
        <h2 class="text-lg font-semibold">Moves:</h2>

        <DataTable :columns="columns" :data="formattedMoves" class="table table-hover table-striped">
            <thead class="thead-inverse">
                <tr>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Power</th>
                    <th>PP</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<style>
@import 'datatables.net-dt';
</style>