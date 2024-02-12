<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const board = boardStore.board;
const props = defineProps({
    task:{
        type:Object,
        required:true
    }
})
</script>

<template>
    <div class="h-full bg-sky-800 rounded p-6 text-sky-100 ">
        <h3 
            class="font-semibold "
        >
            {{task.name}}
        </h3>
        <p class="text-sm font-light mb-6">is in {{ board.name }} </p>
        <h4 class="font-semibold mb-2">
            Description
        </h4>
        <p v-if="task.description">
            {{ task.description }}
        </p>
        <UInput 
            v-else 
            color="sky" 
            variant="outline" 
            placeholder="Add a description"
        />
    </div>
</template>