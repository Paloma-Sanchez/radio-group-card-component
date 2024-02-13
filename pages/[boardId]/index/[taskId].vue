<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
const route = useRoute();
const board = boardStore.board;

onBeforeMount( () => {
    boardStore.getSelectedTaskAndIndexes(route.params.taskId);
});

const task = computed(()=> boardStore.selectedTask.task);
const taskIndex = computed(()=> boardStore.selectedTask.taskIndex);
const columnIndex = computed(()=> boardStore.selectedTask.columnIndex);

</script>
<template>
  <div class="c-task-detail flex justify-center -top-full left-8 w-screen">
    <div 
        v-if="boardStore.board !== null"
        class="w-[768px] mt-28 h-3/4"
    >
       <BoardTaskDetail 
        :task="task" 
        :taskIndex="taskIndex" 
        :columnIndex="columnIndex" 
      />
    </div>
</div>
</template>
