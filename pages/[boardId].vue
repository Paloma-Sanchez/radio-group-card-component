<script setup>
import { useBoardStore } from '../stores/boardStore';
const boardStore = useBoardStore();
const board = computed(() => boardStore.board);
const route = useRoute();

onMounted(() => boardStore.loadSelectedBoard(route.params.boardId))
</script>
<template>
    <pre>{{ board }}</pre>
    <h3>hellow</h3>
</template>