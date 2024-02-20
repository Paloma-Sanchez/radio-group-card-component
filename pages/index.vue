<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const allBoards = computed(()=>boardStore.boards); 
const highlightedBoards = computed(()=>boardStore.getStarredBoards); 
const highlightActive = computed(()=>boardStore.highlightsActive);
const boards = ref({});

onMounted(async() => {
    await boardStore.loadBoards();
    boards.value = boardStore.boards;
});


watch([highlightActive, allBoards],()=>{
    if(!highlightActive.value){
        boards.value=allBoards.value;
    }else{
        boards.value=highlightedBoards.value;
    };
});



definePageMeta({
    layout:"landing"
});
</script>

<template>
    <div class="c-preview-index pl-4 w-full mt-10">
       
        <h1 class="text-2xl font-title font-medium text-gray-300/90 mb-6 pt-2">
            Your boards
        </h1>
        <BoardPreviewList
            :boards="boards"
        />
    </div>
    
</template>