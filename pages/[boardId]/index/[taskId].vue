<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
const route = useRoute();

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
  <div class="c-task-detail flex justify-center -top-full left-8 w-screen">
    <div 
        v-if="boardStore.board !== null"
        class="w-[768px] mt-28 h-3/4"
    >
       <BoardTaskDetail :task="task"/>
    </div>
</div>
</template>
