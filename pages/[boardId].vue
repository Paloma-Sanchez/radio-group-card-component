<script setup>
import { useBoardStore } from '../stores/boardStore';
const boardStore = useBoardStore();
const board = computed(() => boardStore.board);
const route = useRoute();
const boardLoading = computed(() => boardStore.boardLoading);
const maskIsVisible = computed(() => boardStore.maskIsVisible);

onBeforeMount(async() => await boardStore.loadSelectedBoard(route.params.boardId));
</script>
<template>
    <div 
        v-if="!boardLoading && board !== null"  
        :style="{backgroundImage: `url('${board.url}')`}"
        class="c-board-id absolute h-full top-0 left-8 rounded"    
    >
        <div 
            v-if="maskIsVisible"
            class="c-mask w-full h-full relative bg-slate-600/70 backdrop-blur-sm z-10"
            @click="()=>boardStore.toggleMaskVisibility()"
        >
        </div>
        <BoardTopBar :board="board"/>
        <Board :board="board"/>
    </div>
    
</template>