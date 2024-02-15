<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const route = useRoute();
let boards = {};

onMounted(() => {
    boardStore.loadBoards();
});

if(1===1){
    console.log('route', route);
    boards=computed(() => boardStore.boards);
}else{
    boards= boardStore.getStarredBoards;
};

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