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
    console.log('highlight',highlightActive.value);
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
    <div class="c-preview-index pl-4 w-full">
       
        <h1 class="text-2xl mb-6">Your boards</h1>
        <BoardPreviewList
            :boards="boards"
        />
    </div>
    
</template>