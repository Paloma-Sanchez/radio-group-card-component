<script setup>
import { useBoardStore } from "~/stores/boardStore";
const boardStore = useBoardStore();
const route = useRoute();
const board = computed(() =>boardStore.board);

onBeforeMount( async() => {
    if(board.value === null){
      await boardStore.loadSelectedBoard(route.params.boardId);
      boardStore.getSelectedTaskAndIndexes(route.params.taskId);
    }else{
      boardStore.getSelectedTaskAndIndexes(route.params.taskId);
    }
});

const task = computed(()=> boardStore.selectedTask.task);
const taskIndex = computed(()=> boardStore.selectedTask.taskIndex);
const columnIndex = computed(()=> boardStore.selectedTask.columnIndex);

</script>
<template>
    <div 
        class="c-task-detail-taskid w-[768px]  relative top-28 left-8  h-3/4"
        v-if="board && task"
    >
       <BoardTaskDetail 
        :task="task" 
        :taskIndex="taskIndex" 
        :columnIndex="columnIndex" 
      />
    </div>
</template>
