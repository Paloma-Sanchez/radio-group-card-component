<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const boards = computed(() => boardStore.boards);

onMounted(() => {
    boardStore.loadBoards();
});
</script>
<template>
    <div class="c-preview-list grid  gap-3 grid-cols-4 sm:grid-cols-2 w-11/12 border-solid border-slate-900">
        <BoardPreview v-for="board in boards" 
            :board="board"
            class="border-orange-500"
            />
    </div>
</template>