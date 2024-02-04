<script setup>
import { useBoardStore } from '../stores/boardStore';
const boardStore = useBoardStore();
const board = computed(() => boardStore.board);
const route = useRoute();
const boardLoading = computed(() => boardStore.boardLoading);
onBeforeMount(async() => await boardStore.loadSelectedBoard(route.params.boardId));
</script>
<template>
    <div 
        v-if="!boardLoading && board !== null"  
        :style="{backgroundImage: `url('${board.url}')`}"
        class="c-board-id absolute h-full top-0 left-8 rounded"    
    >
        <BoardTopBar :board="board"/>
        <Board :board="board"/>
    </div>
    
</template>