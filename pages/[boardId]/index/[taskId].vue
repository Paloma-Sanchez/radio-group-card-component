<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
const route = useRoute();
console.log('firstboard', boardStore.board);
/*onMounted(() => {
    if(boardStore.board === null){
        boardStore.loadSelectedBoard('e1fc641b-0e18-4256-bed7-d7cd91d4c1ac');
    };
    console.log('board', boardStore.board);
});*/
const task = computed(() => {
  return boardStore.getSelectedTask(route.params.taskId);
});
</script>
<template>
  <div class="c-task-detail flex justify-center -top-full left-8">
    <div 
        v-if="boardStore.board !== null"
        class="w-[768px] bg-white mt-10"
    >
        <h3>{{task.name}}</h3>
        <p>is in </p>
        <h4>Description</h4>
        <p>{{ task.description }}</p>
    </div>
</div>
</template>
